import { router } from "@/trpc.js";
import { authRouter } from "./auth/route.js";
import { linkRouter } from "./link/route.js";

export const appRouter = router({
  auth: authRouter,
  link: linkRouter,
});

export type AppRouter = typeof appRouter;
