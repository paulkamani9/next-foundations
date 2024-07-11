import * as z from "zod";

// Login form input validation
export const LoginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .min(1, "Please enter your password")
    .max(100, "Password must be less than 100 characters"),
});

// Register form input validation
export const RegisterSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email" }),
    name: z
      .string()
      .min(1, "Please enter your name")
      .max(50, "Name must be less than 50 characters"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(
        /^(?=.*[A-Za-z])(?=.*[0-9!@#$%^&*]).*$/,
        "Password must contain at least one letter and one number or special character"
      )
      .max(100, "Password must be less than 100 characters"),
    confirmPassword: z.string({ message: "Please confirm your password." }),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Must match with password",
    path: ["confirmPassword"],
  });

// Reset password form input validation
export const ResetSchema = z.object({
  email: z.string().email({ message: "Please provide your email address" }),
});

// Password reset form input validation
export const PasswordResetSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password must contain at least 6 characters")
      .regex(
        /^(?=.*[A-Za-z])(?=.*[0-9!@#$%^&*]).*$/,
        "Password must contain at least one letter and one number or special character"
      ),
    confirmPassword: z.string({ message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Must match with password",
    path: ["confirmPassword"],
  });

// Name schema for validating name input
export const NameSchema = z.object({
  name: z.optional(z.string().min(1, { message: "Please provide your name" })),
});
