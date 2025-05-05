import jwt from "jsonwebtoken";

import type { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone";

const getTokenPayload = (token: string) =>
  new Promise<{ id: number }>((res, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, tokenPayload) => {
      if (err) {
        return reject(err);
      }
      res(tokenPayload as any);
    });
  });

export const createContext = async ({ req }: CreateHTTPContextOptions) => {
  const token = req.headers["token"];

  if (typeof token !== "string") {
    return {
      isAuth: false,
      user: null,
    };
  }

  try {
    const tokenPayload = await getTokenPayload(token);

    return {
      isAuth: true,
      user: {
        id: tokenPayload.id,
      },
    };
  } catch (e) {
    return {
      isAuth: false,
      user: null,
    };
  }
};

export type ContextType = Awaited<ReturnType<typeof createContext>>;
