import express from "express";

import { authMiddleware } from "../../middlewares/auth.middleware";

import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "./wishlist.controller";

const router =
  express.Router();

router.get(
  "/",
  authMiddleware,
  getWishlist
);

router.post(
  "/:productId",
  authMiddleware,
  addToWishlist
);

router.delete(
  "/:productId",
  authMiddleware,
  removeFromWishlist
);

export default router;