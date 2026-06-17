import { z } from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6).max(24),
});

export type LoginFormData = z.infer<typeof loginSchema>;
