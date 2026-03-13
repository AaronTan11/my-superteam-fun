import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";
import { createId } from "../utils";

export const faqItem = pgTable("faq_item", {
  id: text("id").primaryKey().$defaultFn(createId),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
