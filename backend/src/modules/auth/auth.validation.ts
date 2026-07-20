import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2),

  email: z.string().email(),

  password: z.string().min(6),
});

export const loginSchema = z.object({
  email: z.string().email(),

  password: z.string().min(6),
});

export const updateProfileSchema = z.object({
  name: z.string().trim().min(2).optional(),

  fullName: z.string().trim().optional(),

  phone: z.string().trim().optional(),

  address: z.string().trim().optional(),

  city: z.string().trim().optional(),

  state: z.string().trim().optional(),

  country: z.string().trim().optional(),

  postalCode: z.string().trim().optional(),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(6),

  newPassword: z.string().min(6),
});