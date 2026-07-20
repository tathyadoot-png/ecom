import { Response } from "express";

import { AuthRequest } from "../../middlewares/auth.middleware";

import { asyncHandler } from "../../utils/asyncHandler";

import { successResponse } from "../../utils/response";

import {
  addToCart,
  clearCart,
  getUserCart,
  removeCartItem,
  updateCartItem,
} from "./cart.service";

import {
  addToCartSchema,
  updateCartItemSchema,
} from "./cart.validation";

export const getCart =
  asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {
      const cart =
        await getUserCart(
          req.user._id
        );

      return successResponse(
        res,
        "Cart fetched successfully",
        cart
      );
    }
  );

export const addItem =
  asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {
      const {
        productId,
        quantity,
      } =
        addToCartSchema.parse(
          req.body
        );

      const cart =
        await addToCart(
          req.user._id,
          productId,
          quantity
        );

      return successResponse(
        res,
        "Item added to cart",
        cart
      );
    }
  );

export const updateItem =
  asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {
      const {
        quantity,
      } =
        updateCartItemSchema.parse(
          req.body
        );

      const cart =
        await updateCartItem(
          req.user._id,
          req.params.productId as string,
          quantity
        );

      return successResponse(
        res,
        "Cart updated",
        cart
      );
    }
  );

export const removeItem =
  asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {
      const cart =
        await removeCartItem(
          req.user._id,
          req.params.productId as string
        );

      return successResponse(
        res,
        "Item removed",
        cart
      );
    }
  );

export const clear =
  asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {
      const cart =
        await clearCart(
          req.user._id
        );

      return successResponse(
        res,
        "Cart cleared",
        cart
      );
    }
  );