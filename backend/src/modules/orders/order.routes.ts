import express from "express";

import {
  create,
  getMine,
  getOne,
} from "./order.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";

const router =
  express.Router();

router.post(
  "/",
  authMiddleware,
  create
);

router.get(
  "/my-orders",
  authMiddleware,
  getMine
);

router.get(
  "/:id",
  authMiddleware,
  getOne
);

export default router;