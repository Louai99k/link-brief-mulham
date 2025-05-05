import { authProcedure } from "@/procedures/auth-procedure.js";
import { t } from "@/trpc.js";
import { createLink, getLink, getLinks } from "./service.js";
import { createOutput, createSchema, getLinkSchema } from "./validation.js";

export const linkRouter = t.router({
  create: authProcedure
    .input(createSchema)
    .output(createOutput)
    .mutation(async ({ input, ctx }) => {
      return createLink(input, ctx.user.id);
    }),
  getLinks: authProcedure.query(async ({ ctx }) => {
    return getLinks(ctx.user.id);
  }),
  getLink: t.procedure
    .input(getLinkSchema)
    .query(async ({ input: shortLink }) => {
      return getLink(shortLink);
    }),
});
