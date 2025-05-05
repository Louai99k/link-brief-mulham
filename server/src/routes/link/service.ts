import * as crypto from "crypto";
import db from "@/db/database.js";
import { links } from "@/db/schema/links.js";
import { eq } from "drizzle-orm";

import type { CreateSchemaType } from "./validation.js";
import { TRPCError } from "@trpc/server";

export const createLink = async (input: CreateSchemaType, userId: number) => {
  const shortLink = crypto.randomBytes(6).toString("hex");

  await db.insert(links).values({
    link: input.link,
    short_link: shortLink,
    user_id: userId,
    clicks: 0,
  });

  return {
    shortLink,
  };
};

export const getLinks = async (userId: number) => {
  const linkRows = await db
    .select()
    .from(links)
    .where(eq(links.user_id, userId));

  return linkRows;
};

export const getLink = async (shortLink: string) => {
  const [link] = await db
    .select()
    .from(links)
    .where(eq(links.short_link, shortLink));

  if (!link) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Link not found",
    });
  }

  await db
    .update(links)
    .set({
      clicks: link.clicks! + 1,
    })
    .where(eq(links.id, link.id));

  return link;
};
