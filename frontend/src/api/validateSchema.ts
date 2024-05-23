import { z } from "zod";

export const signupSchema = z.object({
  username: z.string().nonempty("Username is required"),
  phoneNumber: z
    .string()
    .regex(/^225\d{10}$/, "PhoneNumber must be in the format 225XXXXXXXXXX"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const LoginSchema = z.object({
  phoneNumber: z
    .string()
    .regex(/^225\d{10}$/, "PhoneNumber must be in the format 225XXXXXXXXXX"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
