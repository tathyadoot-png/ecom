import { Response } from "express";

import { AuthRequest } from "../../middlewares/auth.middleware";

import { asyncHandler } from "../../utils/asyncHandler";

import { successResponse } from "../../utils/response";

import {
  createReviewService,
  getProductReviewsService,
  getAllReviewsService,
  deleteReviewService,
} from "./review.service";

import { createReviewSchema } from "./review.validation";



export const createReview =
  asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {
      const {
        productId,
        rating,
        comment,
      } =
        createReviewSchema.parse(
          req.body
        );

      await createReviewService(
        req.user._id,
        productId,
        rating,
        comment
      );

      return successResponse(
        res,
        "Review added successfully"
      );
    }
  );

export const getProductReviews =
  asyncHandler(
    async (
      req,
      res: Response
    ) => {
      const reviews =
        await getProductReviewsService(
          req.params.productId as string
        );

      return successResponse(
        res,
        "Reviews fetched successfully",
        reviews
      );
    }
  );

  export const getAllReviewsAdmin =
  asyncHandler(
    async (
      req, 
      res: Response
    ) => {
      const reviews =
        await getAllReviewsService();

      return successResponse(
        res,
        "Reviews fetched successfully",
        reviews
      );
    }
  );

export const deleteReview =
  asyncHandler(
    async (
      req,
      res: Response
    ) => {
      await deleteReviewService(
        req.params.id as string
      );

      return successResponse(
        res,
        "Review deleted successfully"
      );
    }
  );