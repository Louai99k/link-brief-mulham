import bcrypt from "bcryptjs";
import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, "Password should be at least 8 characters long"),
    passwordConfirm: z.string(),
  })
  .refine(
    ({ passwordConfirm, password }) => password === passwordConfirm,
    "Passwords don't match",
  );

export type SignUpInputType = z.infer<typeof signUpSchema>;

export const signUpOutput = z.object({
  id: z.number(),
});

export type SignUpOutputType = z.infer<typeof signUpOutput>;

export const signInSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type SignInInputType = z.infer<typeof signInSchema>;

export const signInOutput = z.object({
  user: z.object({
    id: z.number(),
    email: z.string().email(),
  }),
  jwt: z.string(),
});

export type SignInOutputType = z.infer<typeof signInOutput>;

export const validatePassword = async (
  password: string,
  passwordHash: string,
) => {
  return bcrypt.compare(password, passwordHash);
};
