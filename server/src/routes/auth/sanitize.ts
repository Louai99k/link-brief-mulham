import bcrypt from "bcryptjs";

import type { SignInInputType, SignUpInputType } from "./validation.js";

export const sanitizeSignUpInput = async (input: SignUpInputType) => {
  return {
    email: input.email.toLowerCase(),
    password: await bcrypt.hash(input.password, 10),
  };
};

export const sanitizeSignInInput = (input: SignInInputType) => {
  return {
    email: input.email.toLowerCase(),
  };
};
