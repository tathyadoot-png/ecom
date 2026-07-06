import { Product, ProductStatus } from "./product.model";

import { Category } from "./category.model";

import { ApiError } from "../../utils/ApiError";

import {
  Store,
  StoreStatus,
} from "../store/store.model";

export const createProduct = async (
  data: any,
  userId: string
) => {

  // Check category

  const category =
    await Category.findById(
      data.category
    );

  if (!category) {
    throw new ApiError(
      404,
      "Category not found"
    );
  }

  // Check slug uniqueness

  const existingProduct =
    await Product.findOne({
      slug: data.slug,
    });

  if (existingProduct) {
    throw new ApiError(
      400,
      "Product slug already exists"
    );
  }

  // Check store

const store =
  await Store.findOne({
    owner: userId,
  });

if (!store) {
  throw new ApiError(
    404,
    "Store not found"
  );
}

if (
  store.status !==
  StoreStatus.APPROVED
) {
  throw new ApiError(
    403,
    "Your store is not approved yet"
  );
}

  const product =
    await Product.create({
      ...data,

      createdBy:
        userId,

      storeId:
        store._id,

      // Vendor products should go to draft first

      status:
        ProductStatus.PENDING,
    });

  return product;
};

export const getProducts = async (query: any) => {

  const page = Number(query.page) || 1;

  const limit = Number(query.limit) || 12;

  const skip = (page - 1) * limit;

  const search = query.search || "";

  const category = query.category || "";

  const featured = query.featured;

  let sortOption: any = {};

  switch (query.sort) {

    case "price_asc":
      sortOption = {
        price: 1,
      };
      break;

    case "price_desc":
      sortOption = {
        price: -1,
      };
      break;

    default:
      sortOption = {
        createdAt: -1,
      };

  }

  const filter: any = {

    isActive: true,

    status: ProductStatus.APPROVED,

  };

  if (search) {

    filter.$text = {

      $search: search,

    };

  }

  if (category) {

    filter.category = category;

  }

  if (featured === "true") {

    filter.featured = true;

  }

  const products = await Product.find(filter)

    .populate(
      "category",
      "name slug image"
    )

    .populate({

      path: "storeId",

      select: "name slug owner",

      populate: {

        path: "owner",

        select: "name avatar",

      },

    })

    .sort(sortOption)

    .skip(skip)

    .limit(limit);

  const total =
    await Product.countDocuments(filter);

  return {

    products,

    pagination: {

      total,

      page,

      limit,

      totalPages:
        Math.ceil(total / limit),

    },

  };

};

export const getSingleProduct = async (slug: string) => {
  const product = await Product.findOne({
    slug,

    isActive: true,

    status: ProductStatus.APPROVED,
  }).populate("category", "name slug");

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return product;
};

export const updateProduct = async (
  productId: string,
  data: any,
  userId?: string,
  role?: string
) => {

  const product =
    await Product.findById(
      productId
    );

  if (!product) {
    throw new ApiError(
      404,
      "Product not found"
    );
  }

  // Vendor can edit only own product

  if (
    role === "VENDOR"
  ) {

    const store =
      await Store.findOne({
        owner: userId,
      });

    if (
      !store ||
      product.storeId?.toString() !==
        store._id.toString()
    ) {
      throw new ApiError(
        403,
        "You can only edit your own products"
      );
    }
  }

  // Slug uniqueness

  if (
    data.slug &&
    data.slug !==
      product.slug
  ) {

    const existingSlug =
      await Product.findOne({
        slug: data.slug,
      });

    if (existingSlug) {
      throw new ApiError(
        400,
        "Slug already exists"
      );
    }
  }

  const updatedProduct =
    await Product.findByIdAndUpdate(
      productId,
      data,
      {
        new: true,
      }
    );

  return updatedProduct;
};


export const getProductById =
  async (
     productId: string,
    userId?: string,
    role?: string
  ) => {
    const product =
      await Product.findById(
        productId
      ).populate(
  "category",
  "name slug"
)
.populate({
  path: "storeId",

  select:
    "name slug status owner",

  populate: {
    path: "owner",

    select:
      "name email role avatar",
  },
});

    if (!product) {
      throw new ApiError(
        404,
        "Product not found"
      );
    }

    if (
  role === "VENDOR"
) {
  const store =
    await Store.findOne({
      owner: userId,
    });

  if (
    !store ||
    product.storeId?._id.toString() !==
      store._id.toString()
  ) {
    throw new ApiError(
      403,
      "Access denied"
    );
  }
}

    return product;
  };


export const deleteProduct = async (productId: string) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  

  await Product.findByIdAndDelete(productId);

  return true;
};


export const getVendorProducts =
  async (
    userId: string
  ) => {
    const store =
      await Store.findOne({
        owner: userId,
      });

    if (!store) {
      throw new ApiError(
        404,
        "Store not found"
      );
    }

if (
  store.status !==
  "APPROVED"
) {
  throw new ApiError(
    403,
    "Store is not approved yet"
  );
}

    const products =
      await Product.find({
        storeId: store._id,
      })

        .populate(
          "category",
          "name slug"
        )

        .sort({
          createdAt: -1,
        });

    return products;
  };

export const updateProductStatus =
  async (
    productId: string,
    status: ProductStatus
  ) => {

    const product =
      await Product.findById(
        productId
      );

    if (!product) {
      throw new ApiError(
        404,
        "Product not found"
      );
    }

    product.status =
      status;

    await product.save();

    return product;
  };
export const getAllProductsAdmin =
  async () => {

    return Product.find()

      .populate(
        "category",
        "name slug"
      )

      .populate({
        path: "storeId",

        select:
          "name slug status owner",

        populate: {
          path: "owner",

          select:
            "name email role avatar",
        },
      })

      .sort({
        createdAt: -1,
      });
  };