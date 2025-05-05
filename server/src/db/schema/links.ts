import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";

export const links = sqliteTable("links", {
  id: int().primaryKey({ autoIncrement: true }),
  link: text().notNull(),
  short_link: text().notNull().unique(),
  clicks: int().default(0),
  user_id: int().notNull(),
});
