import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";
import { createId } from "../utils";

export const stat = pgTable("stat", {
  id: text("id").primaryKey().$defaultFn(createId),
  value: integer("value").notNull(),
  suffix: text("suffix").default("").notNull(),
  label: text("label").notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
