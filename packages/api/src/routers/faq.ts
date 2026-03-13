import { z } from "zod";
import { eq, asc } from "drizzle-orm";
import { db } from "@my-superteam-fun/db";
import { faqItem } from "@my-superteam-fun/db/schema";
import { publicProcedure, editorProcedure, router } from "../index";

export const faqRouter = router({
  list: publicProcedure.query(async () => {
    return db.select().from(faqItem).orderBy(asc(faqItem.sortOrder));
  }),

  create: editorProcedure
    .input(
      z.object({
        question: z.string().min(1),
        answer: z.string().min(1),
        sortOrder: z.number().int().default(0),
      }),
    )
    .mutation(async ({ input }) => {
      const [created] = await db.insert(faqItem).values(input).returning();
      return created;
    }),

  update: editorProcedure
    .input(
      z.object({
        id: z.string(),
        question: z.string().min(1).optional(),
        answer: z.string().min(1).optional(),
        sortOrder: z.number().int().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      const [updated] = await db.update(faqItem).set(data).where(eq(faqItem.id, id)).returning();
      return updated;
    }),

  delete: editorProcedure.input(z.object({ id: z.string() })).mutation(async ({ input }) => {
    await db.delete(faqItem).where(eq(faqItem.id, input.id));
    return { success: true };
  }),
});
