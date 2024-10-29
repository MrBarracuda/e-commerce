import { z } from "zod";

export const userFormSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters long")
    .max(16, "Username must be at most 16 characters long"),
  birthDate: z.date({ required_error: "A date of birth is required." }),
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
