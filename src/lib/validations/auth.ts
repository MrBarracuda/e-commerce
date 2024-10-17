import { z } from "zod";

export const userAuthSchema = z.object({
  email: z.string().email(),
});

export const updateUserSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .optional(),
  phone: z.string().min(9, "Phone number must be at least 9 digits").optional(),
  dateOfBirth: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Invalid date format")
    .optional(),
});

export type FormData = z.infer<typeof userAuthSchema>;

export const $EditAddress = z.object({
  name: z.string().min(1, "Name is required").max(255, "Name is too long"),
  country: z
    .string()
    .min(1, "Country is required")
    .max(255, "Country is too long"),
  city: z.string().min(1, "City is required").max(255, "City is too long"),
  street: z
    .string()
    .min(1, "Street is required")
    .max(255, "Street is too long"),
  postalCode: z
    .string()
    .min(1, "Postal code is required")
    .max(20, "Postal code is too long"),
});
