import { Router } from "express";

import {
  addItem,
  clear,
  getCart,
  removeItem,
  updateItem,
} from "./cart.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/", getCart);

router.post("/", addItem);

router.patch(
  "/:productId",
  updateItem
);

router.delete(
  "/:productId",
  removeItem
);

router.delete("/", clear);

export default router;