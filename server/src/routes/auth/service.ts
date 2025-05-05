import db from "@/db/database.js";
import { users } from "@/db/schema/users.js";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { sanitizeSignInInput, sanitizeSignUpInput } from "./sanitize.js";
import jwt from "jsonwebtoken";

import {
  validatePassword,
  type SignInInputType,
  type SignUpInputType,
} from "./validation.js";

export const signUp = async (input: SignUpInputType) => {
  const sanitizedInput = await sanitizeSignUpInput(input);

  const conflictingUsers = await db
    .select()
    .from(users)
    .where(eq(users.email, sanitizedInput.email));

  if (conflictingUsers.length > 0) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "User with the same email already exists",
    });
  }

  const [newUser] = await db.insert(users).values(sanitizedInput).returning();

  return {
    id: newUser.id,
  };
};

export const signIn = async (input: SignInInputType) => {
  const sanitizedInput = sanitizeSignInInput(input);

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, sanitizedInput.email));

  if (!user) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "User Not Found",
    });
  }

  const validPassword = await validatePassword(input.password, user.password);

  if (!validPassword) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Invalid Password",
    });
  }

  const jwtPayload = {
    id: user.id,
  };
  const jwtOptions = {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  };

  const jwtToken = jwt.sign(jwtPayload, process.env.JWT_SECRET, jwtOptions);

  return {
    user: {
      id: user.id,
      email: user.email,
    },
    jwt: jwtToken,
  };
};
