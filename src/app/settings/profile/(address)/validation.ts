import { z } from "zod";

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

export type AddressForm = z.infer<typeof addressFormSchema>;
