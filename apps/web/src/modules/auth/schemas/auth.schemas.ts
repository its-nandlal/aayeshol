import { z } from "zod";

// =============================================
//              Sign Up Schema
// =============================================
export const signUpUserSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, { message: "Name must be at least 2 characters" })
      .max(50, { message: "Name cannot exceed 50 characters" })
      .regex(/^[a-zA-Z\s'-]+$/, {
        message: "Name can only contain letters, spaces, hyphens, and apostrophes",
      }),

    lastname: z
      .string()
      .trim()
      .max(50, { message: "Last name cannot exceed 50 characters" })
      .regex(/^[a-zA-Z\s'-]*$/, {
        message: "Last name can only contain letters, spaces, hyphens, and apostrophes",
      })
      .optional(),

    email: z
      .string()
      .trim()
      .toLowerCase()
      .email({ message: "Please enter a valid email address" })
      .max(255, { message: "Email cannot exceed 255 characters" }),

    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .max(128, { message: "Password cannot exceed 128 characters" })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password must contain at least one special character",
      }),

    // Optional: confirm password field (frontend form में इस्तेमाल के लिए)
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // error confirmPassword field पर दिखेगा
  });

// =============================================
//              Sign In Schema
// =============================================
export const signInUserSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email({ message: "Please enter a valid email address" }),

  password: z.string().min(1, { message: "Password is required" }),
});

// =============================================
//              Type Exports (TypeScript के लिए)
// =============================================
export type SignUpInput = z.infer<typeof signUpUserSchema>;
export type SignInInput = z.infer<typeof signInUserSchema>;