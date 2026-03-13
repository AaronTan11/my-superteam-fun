import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";
import { createId } from "../utils";

export const testimonial = pgTable("testimonial", {
  id: text("id").primaryKey().$defaultFn(createId),
  text: text("text").notNull(),
  author: text("author").notNull(),
  role: text("role").notNull(),
  twitterHandle: text("twitter_handle"),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
