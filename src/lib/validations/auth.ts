import { z } from "zod";

export const userAuthSchema = z.object({
  email: z.string().trim().email({
    message: "Invalid email address",
  }),
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

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);

export const addressFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(20, "Name is too long"),
  addressLine1: z
    .string()
    .min(3, "Address line 1 is too short")
    .max(40, "Address line 1 is too long"),
  addressLine2: z.string().max(40, "Address line 2 is too long").optional(),
  country: z
    .string()
    .min(1, "Country is required")
    .max(56, "Country name is too long"),
  city: z.string().min(1, "City is required").max(40, "City is too long"),
  postalCode: z
    .string()
    .min(1, "Postal code is required")
    .max(12, "Postal code is too long"),
  phone: z
    .string()
    .regex(phoneRegex, { message: "Phone number must be a valid number" })
    .refine((val) => !isNaN(Number(val)), {
      message: "Phone number must be a valid number",
    }),
});

export const userFormSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters long")
    .max(16, "Username must be at most 16 characters long"),
  dateOfBirth: z.date({ required_error: "A date of birth is required." }),
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(20, "First name is too long"),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(20, "Last name is too long"),
});

export type UserForm = z.infer<typeof userFormSchema>;

export type AddressForm = z.infer<typeof addressFormSchema>;
