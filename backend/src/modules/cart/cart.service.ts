import { Cart } from "./cart.model";

import { Product } from "../products/product.model";

import { ApiError } from "../../utils/ApiError";

export const getUserCart =
  async (userId: string) => {
    let cart =
      await Cart.findOne({
        user: userId,
      }).populate({
        path: "items.product",
      });

    if (!cart) {
      cart =
        await Cart.create({
          user: userId,

          items: [],
        });

      cart =
        await cart.populate({
          path: "items.product",
        });
    }

    return cart;
  };

export const addToCart =
  async (
    userId: string,
    productId: string,
    quantity: number = 1
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

    let cart =
      await Cart.findOne({
        user: userId,
      });

    if (!cart) {
      cart =
        await Cart.create({
          user: userId,

          items: [],
        });
    }

    const existingItem =
      cart.items.find(
        (item) =>
          item.product.toString() ===
          productId
      );

    if (existingItem) {
      existingItem.quantity +=
        quantity;
    } else {
      cart.items.push({
        product: productId as any,

        quantity,
      });
    }

    await cart.save();

    return await cart.populate({
      path: "items.product",
    });
  };

export const updateCartItem =
  async (
    userId: string,
    productId: string,
    quantity: number
  ) => {
    const cart =
      await Cart.findOne({
        user: userId,
      });

    if (!cart) {
      throw new ApiError(
        404,
        "Cart not found"
      );
    }

    const item =
      cart.items.find(
        (item) =>
          item.product.toString() ===
          productId
      );

    if (!item) {
      throw new ApiError(
        404,
        "Item not found"
      );
    }

    item.quantity = quantity;

    await cart.save();

    return await cart.populate({
      path: "items.product",
    });
  };

export const removeCartItem =
  async (
    userId: string,
    productId: string
  ) => {
    const cart =
      await Cart.findOne({
        user: userId,
      });

    if (!cart) {
      throw new ApiError(
        404,
        "Cart not found"
      );
    }

    cart.items =
      cart.items.filter(
        (item) =>
          item.product.toString() !==
          productId
      );

    await cart.save();

    return await cart.populate({
      path: "items.product",
    });
  };

export const clearCart =
  async (userId: string) => {
    const cart =
      await Cart.findOne({
        user: userId,
      });

    if (!cart) {
      throw new ApiError(
        404,
        "Cart not found"
      );
    }

    cart.items = [];

    await cart.save();

    return cart;
  };