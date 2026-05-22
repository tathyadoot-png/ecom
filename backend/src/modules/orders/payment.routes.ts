import express from "express";

import {
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "./payment.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";

const router =
  express.Router();

router.post(
  "/create-order",
  authMiddleware,
  createRazorpayOrder
);

router.post(
  "/verify",
  authMiddleware,
  verifyRazorpayPayment
);

export default router;