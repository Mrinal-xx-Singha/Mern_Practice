const { z } = require("zod");

// Register Schema
const registerSchema = z.object({
  username: z
    .string({ message: "Username is required" })
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username cannot exceed 30 characters"),

  email: z
    .email("Please provide a valid email address")
    .trim()
    .toLowerCase(),

  password: z
    .string({ message: "Password is required" })
    .min(6, "Password must be at least 6 characters"),

  // SECURITY: Only allow 'user' or 'employer' during sign-up (prevents self-assigned admin)
  role: z
    .enum(["user", "employer"], {
      message: "Role must be either 'user' or 'employer'",
    })
    .default("user")
    .optional(),
});

// Login Schema
const loginSchema = z.object({
  email: z
    .email("Please provide a valid email address")
    .trim()
    .toLowerCase(),

  password: z
    .string({ message: "Password is required" })
    .min(1, "Password cannot be empty"),
});

// Demo login schema
const demoLoginSchema = z.object({
    role: z.enum(['user', 'employer', "admin"], { error: "Invalid demo role" }).default("user").optional()
})




module.exports = {
    registerSchema,
    loginSchema,
    demoLoginSchema
}