import { z } from "zod";

export const userAuthSchema = z.object({
  email: z.string().trim().email({
    message: "Invalid email address",
  }),
});

export type FormData = z.infer<typeof userAuthSchema>;
