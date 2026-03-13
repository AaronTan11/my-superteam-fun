import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";
import { createId } from "../utils";

export const partner = pgTable("partner", {
  id: text("id").primaryKey().$defaultFn(createId),
  name: text("name").notNull(),
  logoUrl: text("logo_url").default("").notNull(),
  websiteUrl: text("website_url").notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
