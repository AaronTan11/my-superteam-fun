import { pgTable, text, timestamp, boolean, integer, jsonb } from "drizzle-orm/pg-core";
import { createId } from "../utils";

export const member = pgTable("member", {
  id: text("id").primaryKey().$defaultFn(createId),
  name: text("name").notNull(),
  title: text("title").notNull(),
  company: text("company"),
  photo: text("photo").notNull(),
  skills: jsonb("skills").$type<string[]>().default([]).notNull(),
  twitterHandle: text("twitter_handle"),
  isFeatured: boolean("is_featured").default(false).notNull(),
  achievements: jsonb("achievements").$type<string[]>().default([]),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
