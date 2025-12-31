import { z } from "zod";

//schemas

export const signupSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Name must be at least 3 characters")
        .max(30, "Name must be at most 30 characters")
        .regex(
            /^(?!.*\s{2,})[A-Za-z_\s]+$/,
            "Name can contain only letters, single spaces, and underscores"
        ),


    email: z
        .string()
        .email("Invalid email address")
        .min(6, "Email must be at least 6 characters")
        .max(50, "Email must be at most 50 characters")
        .regex(
            /^[a-zA-Z0-9.@]+$/,
            "Email can contain only letters, numbers, '.' and '@'"
        ),
    password: z
        .string({ required_error: "Password is required" })
        .min(6, "Password must be at least 6 characters")
        .max(64, "Password must be at most 64 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
            "Password must contain uppercase, lowercase, number, and special character"
        ),
    deviceId: z.string().optional(),

})

export const loginSchema = z.object({
    email: z
        .string()
        .email("Invalid email address")
        .min(6, "Email must be at least 6 characters")
        .max(50, "Email must be at most 50 characters")
        .regex(
            /^[a-zA-Z0-9.@]+$/,
            "Email can contain only letters, numbers, '.' and '@'"
        ),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(64, "Password must be at most 64 characters"),
    deviceId: z.string().optional(),
})

export const verifyEmailSchema = z.object({
    code: z
        .string({ required_error: "Verification code is required" })
        .trim()
        .regex(/^\d{6}$/, "Verification code must be exactly 6 digits"),
});

export const forgotPasswordSchema = z.object({
    email: z
        .string()
        .email("Invalid email address")
        .min(6, "Email must be at least 6 characters")
        .max(50, "Email must be at most 50 characters")
        .regex(
            /^[a-zA-Z0-9.@]+$/,
            "Email can contain only letters, numbers, '.' and '@'"
        ),
});

export const resetPasswordSchema = z.object({
    password: z
        .string({ required_error: "Password is required" })
        .min(6, "Password must be at least 6 characters")
        .max(64, "Password must be at most 64 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
            "Password must contain uppercase, lowercase, number, and special character"
        ),
});