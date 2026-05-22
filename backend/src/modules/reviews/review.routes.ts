import express from "express";

import {
  createReview,
  getProductReviews,
    getAllReviewsAdmin,
  deleteReview,
} from "./review.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { roleMiddleware } from "../../middlewares/role.middleware";
const router =
  express.Router();

router.post(
  "/",
  authMiddleware,
  createReview
);

router.get(
  "/:productId",
  getProductReviews
);

router.get(
  "/admin/all",
  authMiddleware,
  roleMiddleware(
    "ADMIN",
    "SUPER_ADMIN"
  ),
  getAllReviewsAdmin
);

router.delete(
  "/admin/:id",
  authMiddleware,
  roleMiddleware(
    "ADMIN",
    "SUPER_ADMIN"
  ),
  deleteReview
);

export default router;