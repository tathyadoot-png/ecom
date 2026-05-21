import { z } from "zod";

export const createOrderSchema =
  z.object({
    items: z
      .array(
        z.object({
          productId:
            z.string(),

          quantity:
            z.number().min(1),
        })
      )
      .min(1),

    shippingAddress:
      z.object({
        fullName:
          z.string().min(2),

        phone:
          z.string().min(10),

        address:
          z.string().min(5),

        city:
          z.string().min(2),

        state:
          z.string().min(2),

        country:
          z.string().min(2),

        postalCode:
          z.string().min(4),
      }),

    paymentMethod:
      z.enum([
        "COD",
        "RAZORPAY",
      ]),
  });