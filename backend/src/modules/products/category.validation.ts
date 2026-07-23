import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(2),

  slug: z.string().min(2),

  image: z.string().optional(),

  description: z.string().optional(),

  featured: z
    .union([
      z.boolean(),
      z.string(),
    ])
    .optional(),

 displayOrder: z
  .union([
    z.number(),
    z.string(),
  ])
  .optional(),
  
  parentCategory: z
    .string()
    .optional(),
});


export const updateCategorySchema = z.object({
  name: z.string().min(2),

  slug: z.string().min(2),

  image: z.string().optional(),

  description: z.string().optional(),

  featured: z
    .union([z.boolean(), z.string()])
    .optional(),

  displayOrder: z
    .union([z.number(), z.string()])
    .optional(),

  parentCategory: z.string().optional(),

  isActive: z
    .union([z.boolean(), z.string()])
    .optional(),
});