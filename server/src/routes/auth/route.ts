import { t } from "@/trpc.js";
import { signIn, signUp } from "./service.js";
import {
  signUpOutput,
  signUpSchema,
  signInSchema,
  signInOutput,
} from "./validation.js";

export const authRouter = t.router({
  signUp: t.procedure
    .input(signUpSchema)
    .output(signUpOutput)
    .mutation(async ({ input }) => {
      return signUp(input);
    }),
  signIn: t.procedure
    .input(signInSchema)
    .output(signInOutput)
    .mutation(({ input }) => {
      return signIn(input);
    }),
});
