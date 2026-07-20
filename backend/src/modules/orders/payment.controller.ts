import crypto from "crypto";

import { Request, Response } from "express";

import { razorpay } from "../../config/razorpay";

import { asyncHandler } from "../../utils/asyncHandler";

import { successResponse } from "../../utils/response";

import { AuthRequest } from "../../middlewares/auth.middleware";

import { Order, OrderStatus, PaymentStatus } from "./order.model";

import { ApiError } from "../../utils/ApiError";

import {
  createRazorpayOrderSchema,
  verifyRazorpayPaymentSchema,
} from "./payment.validation";

interface WebhookRequest extends Request {
  rawBody?: Buffer;
}

export const createRazorpayOrder =
  asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {
      const {
        amount,
        orderId,
      } =
        createRazorpayOrderSchema.parse(
          req.body
        );

      let order = null;

      if (orderId) {
        order =
          await Order.findById(
            orderId
          );

        if (!order) {
          throw new ApiError(
            404,
            "Order not found"
          );
        }

        if (
          order.user.toString() !==
          req.user._id.toString()
        ) {
          throw new ApiError(
            403,
            "You are not allowed to pay for this order"
          );
        }
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

      // Link the Razorpay order to our order as soon as it exists,
      // so a webhook that arrives before /verify still has a match.
      if (order) {
        order.razorpayOrderId =
          razorpayOrder.id;

        await order.save();
      }

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
      } =
        verifyRazorpayPaymentSchema.parse(
          req.body
        );

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

      if (
        order.user.toString() !==
        req.user._id.toString()
      ) {
        throw new ApiError(
          403,
          "You are not allowed to verify this order"
        );
      }

      // Idempotent: the webhook may have already confirmed this
      // payment before the client's /verify call landed.
      if (
        order.paymentStatus ===
        PaymentStatus.PAID
      ) {
        return successResponse(
          res,
          "Payment already verified",
          order
        );
      }

      order.paymentStatus =
        PaymentStatus.PAID;

      order.razorpayOrderId =
        razorpay_order_id;

      order.razorpayPaymentId =
        razorpay_payment_id;

      order.razorpaySignature =
        razorpay_signature;

      order.orderStatus =
        OrderStatus.CONFIRMED;

      await order.save();

      return successResponse(
        res,
        "Payment verified successfully",
        order
      );
    }
  );

export const razorpayWebhook =
  asyncHandler(
    async (
      req: WebhookRequest,
      res: Response
    ) => {
      const signature =
        req.headers[
          "x-razorpay-signature"
        ] as string;

      if (
        !signature ||
        !req.rawBody
      ) {
        throw new ApiError(
          400,
          "Missing webhook signature"
        );
      }

      const expectedSignature =
        crypto
          .createHmac(
            "sha256",
            process.env
              .RAZORPAY_WEBHOOK_SECRET as string
          )
          .update(req.rawBody)
          .digest("hex");

      if (
        expectedSignature !==
        signature
      ) {
        throw new ApiError(
          400,
          "Invalid webhook signature"
        );
      }

      const event =
        req.body?.event as string;

      const paymentEntity =
        req.body?.payload?.payment
          ?.entity;

      if (
        !paymentEntity?.order_id
      ) {
        return successResponse(
          res,
          "Webhook received"
        );
      }

      const order =
        await Order.findOne({
          razorpayOrderId:
            paymentEntity.order_id,
        });

      if (!order) {
        return successResponse(
          res,
          "Webhook received (no matching order)"
        );
      }

      // Idempotency guard: a payment already marked PAID or FAILED
      // is a terminal state, so repeated webhook deliveries for the
      // same event are safe no-ops.
      if (
        order.paymentStatus !==
        PaymentStatus.PENDING
      ) {
        return successResponse(
          res,
          "Webhook already processed"
        );
      }

      if (event === "payment.captured") {
        order.paymentStatus =
          PaymentStatus.PAID;

        order.razorpayPaymentId =
          paymentEntity.id;

        order.orderStatus =
          OrderStatus.CONFIRMED;

        await order.save();
      } else if (
        event === "payment.failed"
      ) {
        order.paymentStatus =
          PaymentStatus.FAILED;

        order.razorpayPaymentId =
          paymentEntity.id;

        await order.save();
      }

      return successResponse(
        res,
        "Webhook processed"
      );
    }
  );
