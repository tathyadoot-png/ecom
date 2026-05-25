import { Wishlist } from "./wishlist.model";

import { Product } from "../products/product.model";

import { ApiError } from "../../utils/ApiError";

export const getWishlistService =
  async (userId: string) => {
    let wishlist =
      await Wishlist.findOne({
        user: userId,
      }).populate(
        "products"
      );

    if (!wishlist) {
      wishlist =
        await Wishlist.create({
          user: userId,

          products: [],
        });
    }

    return wishlist;
  };

export const addToWishlistService =
  async (
    userId: string,
    productId: string
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

    let wishlist =
      await Wishlist.findOne({
        user: userId,
      });

    if (!wishlist) {
      wishlist =
        await Wishlist.create({
          user: userId,

          products: [],
        });
    }

    const alreadyExists =
      wishlist.products.some(
        (id) =>
          id.toString() ===
          productId
      );

    if (!alreadyExists) {
      wishlist.products.push(
        productId as any
      );

      await wishlist.save();
    }

    return wishlist;
  };

export const removeFromWishlistService =
  async (
    userId: string,
    productId: string
  ) => {
    const wishlist =
      await Wishlist.findOne({
        user: userId,
      });

    if (!wishlist) {
      throw new ApiError(
        404,
        "Wishlist not found"
      );
    }

    wishlist.products =
      wishlist.products.filter(
        (id) =>
          id.toString() !==
          productId
      );

    await wishlist.save();

    return wishlist;
  };