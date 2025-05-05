import { t } from "@/trpc.js";
import { TRPCError } from "@trpc/server";

export const authProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.isAuth || !ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Unauthorized access",
    });
  }

  return next({
    ctx: {
      isAuth: true,
      user: {
        id: ctx.user.id,
      },
    },
  });
});
