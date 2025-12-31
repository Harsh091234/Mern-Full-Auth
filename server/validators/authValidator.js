import {z} from "zod";

//schemas

export const signupSchema = z.object({
    name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(30, "Name must be at most 30 characters")
    .regex(/^[A-Za-z_]+$/, "Name can contain only letters and underscores"),

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
