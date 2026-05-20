import { z } from "zod";

export const createProductSchema =
  z.object({
    title: z
      .string()
      .min(2),

    slug: z.string(),

    description:
      z.string(),

    shortDescription:
      z.string().optional(),

    category:
      z.string(),

    price: z.preprocess(
      (value) =>
        Number(value),
      z.number()
    ),

    salePrice:
      z.preprocess(
        (value) =>
          value
            ? Number(value)
            : undefined,
        z.number().optional()
      ),

    stock: z.preprocess(
      (value) =>
        Number(value),
      z.number()
    ),

    images: z
      .array(z.string())
      .optional(),

    featured:
      z.preprocess(
        (value) =>
          value === "on",
        z.boolean()
      ),

    isActive:
      z.preprocess(
        (value) =>
          value === "on",
        z.boolean()
      ),

    status: z.enum([
      "draft",
      "published",
    ]),
  });