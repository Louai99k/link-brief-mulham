import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: int().primaryKey({ autoIncrement: true }),
  email: text().unique().notNull(),
  password: text().notNull(),
});
