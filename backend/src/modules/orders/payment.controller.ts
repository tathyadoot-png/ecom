import crypto from "crypto";

import { Response } from "express";

import { razorpay } from "../../config/razorpay";

import { asyncHandler } from "../../utils/asyncHandler";

import { successResponse } from "../../utils/response";

import { AuthRequest } from "../../middlewares/auth.middleware";

import { Order } from "./order.model";

import { ApiError } from "../../utils/ApiError";

export const createRazorpayOrder =
  asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {
      const {
        amount,
      } = req.body;

      if (!amount) {
        throw new ApiError(
          400,
          "Amount is required"
        );
      }

      const options = {
        amount:
          amount * 100,

        currency: "INR",

        receipt: `receipt_${Date.now()}`,
      };

      const razorpayOrder =
        await razorpay.orders.create(
          options
        );

      return successResponse(
        res,
        "Razorpay order created",
        razorpayOrder
      );
    }
  );

export const verifyRazorpayPayment =
  asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {
      const {
        razorpay_order_id,

        razorpay_payment_id,

        razorpay_signature,

        orderId,
      } = req.body;

      const body =
        razorpay_order_id +
        "|" +
        razorpay_payment_id;

      const expectedSignature =
        crypto
          .createHmac(
            "sha256",
            process.env
              .RAZORPAY_KEY_SECRET as string
          )
          .update(body.toString())
          .digest("hex");

      const isAuthentic =
        expectedSignature ===
        razorpay_signature;

      if (!isAuthentic) {
        throw new ApiError(
          400,
          "Payment verification failed"
        );
      }

      const order =
        await Order.findById(
          orderId
        );

      if (!order) {
        throw new ApiError(
          404,
          "Order not found"
        );
      }

      order.paymentStatus =
        "PAID";

      order.razorpayOrderId =
        razorpay_order_id;

      order.razorpayPaymentId =
        razorpay_payment_id;

      order.razorpaySignature =
        razorpay_signature;

      order.orderStatus =
        "CONFIRMED";

      await order.save();

      return successResponse(
        res,
        "Payment verified successfully",
        order
      );
    }
  );