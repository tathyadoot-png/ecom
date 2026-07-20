import { z } from "zod";

export const createReviewSchema = z.object({
  productId: z.string().min(1),

  rating: z.preprocess(
    (value) => Number(value),
    z.number().min(1).max(5)
  ),

  comment: z.string().trim().min(1),
});
