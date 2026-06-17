import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.email(),
    password: z.string().min(6).max(24),
    confirmPassword: z.string().min(6).max(24),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
