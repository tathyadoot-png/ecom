import { z } from "zod";

// Deliberately whitelists only the fields a vendor may set on their own
// store. Fields like `status`, `owner`, `slug`, `featured` and
// `verified` are intentionally excluded so they can never be injected
// through these endpoints — `featured`/`verified` are admin-only
// curation signals (see updateStoreFlagsController).
const socialLinksSchema = z
  .object({
    instagram: z.string().trim().url().optional().or(z.literal("")),
    facebook: z.string().trim().url().optional().or(z.literal("")),
    youtube: z.string().trim().url().optional().or(z.literal("")),
    website: z.string().trim().url().optional().or(z.literal("")),
  })
  .partial();

const artisanProfileFields = {
  craft: z.string().trim().optional(),
  subCraft: z.string().trim().optional(),
  shortQuote: z.string().trim().max(200).optional(),
  story: z.string().trim().optional(),
  craftPhilosophy: z.string().trim().optional(),
  yearsOfExperience: z.number().int().min(0).max(100).optional(),
  generation: z.number().int().min(1).max(20).optional(),
  inheritedFrom: z.string().trim().optional(),
  specialization: z.string().trim().optional(),
  state: z.string().trim().optional(),
  city: z.string().trim().optional(),
  village: z.string().trim().optional(),
  gallery: z.array(z.string()).optional(),
  introVideo: z.string().trim().url().optional().or(z.literal("")),
  socialLinks: socialLinksSchema.optional(),
  googleMap: z.string().trim().optional(),
  customOrders: z.boolean().optional(),
  leadTime: z.string().trim().optional(),
};

export const createStoreSchema = z.object({
  name: z.string().trim().min(2),

  description: z.string().trim().optional(),

  ...artisanProfileFields,
});

export const updateStoreSchema = z.object({
  name: z.string().trim().min(2).optional(),

  description: z.string().trim().optional(),

  ...artisanProfileFields,
});

export const updateStoreFlagsSchema = z.object({
  featured: z.boolean().optional(),
  verified: z.boolean().optional(),
  displayOrder: z.number().int().min(0).optional(),
});
