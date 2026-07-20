import { z } from "zod";

export const createRazorpayOrderSchema = z.object({
  amount: z.number().positive(),

  orderId: z.string().optional(),
});

export const verifyRazorpayPaymentSchema = z.object({
  razorpay_order_id: z.string().min(1),

  razorpay_payment_id: z.string().min(1),

  razorpay_signature: z.string().min(1),

  orderId: z.string().min(1),
});
