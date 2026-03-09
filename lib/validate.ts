import { imageOptimizer } from "next/dist/server/image-optimizer";
import * as z from "zod";

export const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(5, "Password must be at least 5 characters long"),
    confirmPassword: z
      .string()
      .min(1, "Confirm Password is required")
      .min(5, "Confirm Password must be at least 5 characters long"),
  })

  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type SignupSchema = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(5, "Password must be at least 5 characters long"),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export type formActionState = {
  success: boolean;
  errors?: Record<string, string[]>;
};

export const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(5, "Password must be at least 8 characters long"),
});

export type profileSchema = z.infer<typeof profileSchema>;

export type profileActionState = {
  success: boolean;
  errors: Record<string, string[]>;
};

export const userCreateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(5, "Password must be at least 8 characters long"),
  role: z.string(),
  img: z.file(),
});

export type userCreateSchema = z.infer<typeof signupSchema>;

export const updateCreateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(5, "Password must be at least 8 characters long"),
  role: z.string(),
});

export const postCreateSchema = z.object({
  title: z.string().min(2, "Name must be at least 2 characters long"),
  content: z.string().min(10, "Content must be at least 10 characters long"),
  img: z.file(),
});

export type PostCreateSchema = z.infer<typeof postCreateSchema>;

export type postCreateActionState = {
  success: boolean;
  errors: Record<string, string[]>;
};

export const postUpdateSchema = z.object({
  title: z.string().min(2, "Name must be at least 2 characters long"),
  content: z.string().min(10, "Content must be at least 10 characters long"),
  file: z.file().optional().nullable(),
});

export type PostUpdateSchema = z.infer<typeof postUpdateSchema>;

export const createCommentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  text: z.string().min(5, "Content must be at least 5 characters long"),
});

export const replyCommentSchema = z.object({
  text: z.string().min(2, "Name must be at least 2 characters long"),
});

export const answerReplySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  commentText: z.string().min(2, "Name must be at least 2 characters long"),
});
