import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(3, "Username must contain at least 3 characters")
    .max(50, "Username must contain at most 50 characters"),
  password: z
    .string()
    .min(6, "Password must contain at least 3 characters")
    .max(50, "Password must contain at most 50 characters"),
});

export const registerSchema = z
  .object({
    email: z.string().email(),
    fullName: z.string().min(3, "Full name must contain at least 6 characters"),
    passwordConfirm: z
      .string()
      .min(6, "Password Confirm must contain at least 6 characters")
      .max(50, "Password Confirm must contain at most 50 characters"),
  })
  .merge(loginSchema)
  .refine((data) => data.passwordConfirm === data.password, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
  });

export const emailSchema = z.object({
  email: z.string().email(),
});

export const otpSchema = z.object({
  otp: z.string().min(6, "OTP must contain at least 6 characters"),
});
