import { Response } from "express";

import { AuthRequest } from "../../middlewares/auth.middleware";

import { asyncHandler } from "../../utils/asyncHandler";

import { successResponse } from "../../utils/response";

import {
  addToWishlistService,
  getWishlistService,
  removeFromWishlistService,
} from "./wishlist.service";

export const getWishlist =
  asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {
      const wishlist =
        await getWishlistService(
          req.user._id
        );

      return successResponse(
        res,
        "Wishlist fetched successfully",
        wishlist
      );
    }
  );

export const addToWishlist =
  asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {
      const wishlist =
        await addToWishlistService(
          req.user._id,
          req.params.productId as string
        );

      return successResponse(
        res,
        "Added to wishlist",
        wishlist
      );
    }
  );

export const removeFromWishlist =
  asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {
      const wishlist =
        await removeFromWishlistService(
          req.user._id,
          req.params.productId as string
        );

      return successResponse(
        res,
        "Removed from wishlist",
        wishlist
      );
    }
  );