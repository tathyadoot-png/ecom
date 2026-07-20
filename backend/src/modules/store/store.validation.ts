import { z } from "zod";

// Deliberately whitelists only the fields a vendor may set on their own
// store. Fields like `status`, `owner` and `slug` are intentionally
// excluded so they can never be injected through this endpoint.
export const createStoreSchema = z.object({
  name: z.string().trim().min(2),

  description: z.string().trim().optional(),
});

export const updateStoreSchema = z.object({
  name: z.string().trim().min(2).optional(),

  description: z.string().trim().optional(),
});
