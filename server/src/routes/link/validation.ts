import { z } from "zod";

export const createSchema = z.object({
  link: z.string().url(),
});

export type CreateSchemaType = z.infer<typeof createSchema>;

export const createOutput = z.object({
  shortLink: z.string(),
});

export type CreateOutputType = z.infer<typeof createOutput>;

export const getLinkSchema = z.string();

export type GetLinkSchemaType = z.infer<typeof getLinkSchema>;
