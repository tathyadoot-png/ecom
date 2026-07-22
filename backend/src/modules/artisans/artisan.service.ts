import { Store, StoreStatus } from "../store/store.model";
import { Product, ProductStatus } from "../products/product.model";
import { User } from "../auth/auth.model";
import { ApiError } from "../../utils/ApiError";

// Every public artisan route reads through the existing Store model —
// no new entity. This module only adds a public-facing surface on top
// of it; the vendor/admin routes in ../store are untouched.

// Deliberately excludes internal fields (status, isActive, owner
// email, __v) — a public visitor should never see anything beyond
// what an artisan has actually chosen to share.
const PUBLIC_STORE_SELECT =
  "name slug logo banner coverImage portraitImage description story craft " +
  "subCraft shortQuote craftPhilosophy yearsOfExperience generation " +
  "inheritedFrom specialization state city village gallery introVideo " +
  "socialLinks googleMap customOrders leadTime featured verified " +
  "displayOrder seo owner createdAt";

const PUBLIC_FILTER = {
  status: StoreStatus.APPROVED,
  isActive: true,
};

const PRODUCT_FILTER_FOR_STORE = (storeId: any) => ({
  storeId,
  isActive: true,
  status: ProductStatus.APPROVED,
});

// A live count, not a denormalized field — no product create/update/
// delete path has to remember to keep a counter in sync, and it can
// never drift out of date.
const attachProductCounts = async (artisans: any[]) => {
  if (artisans.length === 0) return artisans;

  const counts = await Product.aggregate([
    {
      $match: {
        storeId: { $in: artisans.map((a) => a._id) },
        isActive: true,
        status: ProductStatus.APPROVED,
      },
    },
    { $group: { _id: "$storeId", count: { $sum: 1 } } },
  ]);

  const countMap = new Map(counts.map((c) => [c._id.toString(), c.count]));

  return artisans.map((artisan) => ({
    ...artisan.toObject(),
    productCount: countMap.get(artisan._id.toString()) || 0,
  }));
};

// Directory-specific sort options (Phase 8B) — Newest/Experience/
// Alphabetical/Display Order. Falls back to the same displayOrder+
// createdAt used everywhere else on an unrecognized value.
const SORT_OPTIONS: Record<string, Record<string, 1 | -1>> = {
  newest: { createdAt: -1 },
  experience: { yearsOfExperience: -1, createdAt: -1 },
  alphabetical: { name: 1 },
  displayOrder: { displayOrder: 1, createdAt: -1 },
};

export const getPublicArtisans = async (query: any) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 12;
  const skip = (page - 1) * limit;

  const filter: any = { ...PUBLIC_FILTER };

  if (query.state) {
    filter.state = query.state;
  }

  if (query.craft) {
    filter.craft = query.craft;
  }

  if (query.search) {
    const search = { $regex: query.search, $options: "i" };
    // "Artisan Name" as shown on every card is the owner's name, not
    // the store name — Store.name (e.g. "the mask") and owner.name
    // (e.g. "tanish", the person actually displayed) are different
    // fields, so a search purely on Store fields would silently fail
    // to find an artisan by the exact name printed on their own card.
    const matchingOwners = await User.find({ name: search }).select("_id");
    filter.$or = [
      { name: search },
      { craft: search },
      { city: search },
      { state: search },
      { owner: { $in: matchingOwners.map((u) => u._id) } },
    ];
  }

  if (query.featured === "true") {
    filter.featured = true;
  }

  if (query.verified === "true") {
    filter.verified = true;
  }

  if (query.customOrders === "true") {
    filter.customOrders = true;
  }

  if (query.experienceMin) {
    filter.yearsOfExperience = { $gte: Number(query.experienceMin) };
  }

  const sort = SORT_OPTIONS[query.sort as string] || SORT_OPTIONS.displayOrder;

  const artisans = await Store.find(filter)
    .select(PUBLIC_STORE_SELECT)
    .populate("owner", "name avatar")
    .sort(sort)
    .skip(skip)
    .limit(limit);

  const total = await Store.countDocuments(filter);

  return {
    artisans: await attachProductCounts(artisans),
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getPublicArtisanBySlug = async (slug: string) => {
  const artisan = await Store.findOne({ slug, ...PUBLIC_FILTER })
    .select(PUBLIC_STORE_SELECT)
    .populate("owner", "name avatar");

  if (!artisan) {
    throw new ApiError(404, "Artisan not found");
  }

  const productCount = await Product.countDocuments(
    PRODUCT_FILTER_FOR_STORE(artisan._id)
  );

  return { ...artisan.toObject(), productCount };
};

export const getArtisanProducts = async (slug: string, query: any) => {
  const artisan = await Store.findOne({ slug, ...PUBLIC_FILTER });

  if (!artisan) {
    throw new ApiError(404, "Artisan not found");
  }

  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 12;
  const skip = (page - 1) * limit;

  const filter = PRODUCT_FILTER_FOR_STORE(artisan._id);

  const products = await Product.find(filter)
    .populate("category", "name slug")
    .populate({
      path: "storeId",
      select: "name slug owner logo description",
      populate: {
        path: "owner",
        select: "name avatar",
      },
    })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Product.countDocuments(filter);

  return {
    artisan: {
      name: artisan.name,
      slug: artisan.slug,
    },
    products,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getFeaturedArtisans = async (limitParam?: number) => {
  const limit = limitParam || 8;

  const artisans = await Store.find({ ...PUBLIC_FILTER, featured: true })
    .select(PUBLIC_STORE_SELECT)
    .populate("owner", "name avatar")
    .sort({ displayOrder: 1, createdAt: -1 })
    .limit(limit);

  return attachProductCounts(artisans);
};

// Featured only — an admin curation signal. If nobody has been marked
// featured yet, this returns an empty list on purpose; the frontend
// simply doesn't render the homepage section rather than falling back
// to an arbitrary, uncurated selection of artisans.
export const getHomepageArtisans = async (limitParam?: number) => {
  const limit = limitParam || 4;

  return getFeaturedArtisans(limit);
};
