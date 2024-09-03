import { z } from "zod";

export const userAuthSchema = z.object({
  email: z.string().email(),
});

export type FormData = z.infer<typeof userAuthSchema>;
