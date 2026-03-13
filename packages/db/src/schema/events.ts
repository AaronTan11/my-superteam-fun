import { pgTable, text, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { createId } from "../utils";

export const event = pgTable("event", {
  id: text("id").primaryKey().$defaultFn(createId),
  title: text("title").notNull(),
  date: timestamp("date", { withTimezone: true }).notNull(),
  location: text("location").notNull(),
  description: text("description").notNull(),
  lumaUrl: text("luma_url"),
  isPast: boolean("is_past").default(false).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
