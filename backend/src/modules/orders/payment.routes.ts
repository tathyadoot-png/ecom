import express from "express";

import {
  createRazorpayOrder,
  razorpayWebhook,
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

// Called directly by Razorpay's servers, not by the frontend.
// Authenticated by webhook signature, not by the user's cookie.
router.post(
  "/webhook",
  razorpayWebhook
);

export default router;