import { Product, ProductStatus } from "./product.model";

import { Category } from "./category.model";

import { ApiError } from "../../utils/ApiError";

import { Store } from "../store/store.model";

export const createProduct = async (data: any, userId: string) => {
  // Check category
  const category = await Category.findById(data.category);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  // Check slug uniqueness
  const existingProduct = await Product.findOne({
    slug: data.slug,
  });

  if (existingProduct) {
    throw new ApiError(400, "Product slug already exists");
  }

const store =
  await Store.findOne({
    owner: userId,
  });

const product =
  await Product.create({
    ...data,

        status:
      ProductStatus.PENDING,
    createdBy: userId,

    storeId:
      store?._id || null,
  });
  return product;
};

export const getProducts = async (query: any) => {
  const page = Number(query.page) || 1;

  const limit = Number(query.limit) || 10;

  const skip = (page - 1) * limit;

  const search = query.search || "";

  const category = query.category || "";

  const featured = query.featured;

  let sortOption = {};

  // Sorting
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

  // Search
  if (search) {
    filter.$text = {
      $search: search,
    };
  }

  // Category filter
  if (category) {
    filter.category = category;
  }

  // Featured filter
  if (featured === "true") {
    filter.featured = true;
  }

  const products = await Product.find(filter)

    .populate("category", "name slug")

    .sort(sortOption)

    .skip(skip)

    .limit(limit);

  const total = await Product.countDocuments(filter);

  return {
    products,

    pagination: {
      total,

      page,

      limit,

      totalPages: Math.ceil(total / limit),
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

export const updateProduct = async (productId: string, data: any) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  // Slug uniqueness check
  if (data.slug && data.slug !== product.slug) {
    const existingSlug = await Product.findOne({
      slug: data.slug,
    });

    if (existingSlug) {
      throw new ApiError(400, "Slug already exists");
    }
  }

  const updatedProduct = await Product.findByIdAndUpdate(productId, data, {
    returnDocument: "after",
  });

  return updatedProduct;
};



export const getProductById =
  async (
    productId: string
  ) => {
    const product =
      await Product.findById(
        productId
      ).populate(
        "category",
        "name slug"
      );

    if (!product) {
      throw new ApiError(
        404,
        "Product not found"
      );
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

  