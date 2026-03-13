import { z } from "zod";
import { eq, asc } from "drizzle-orm";
import { db } from "@my-superteam-fun/db";
import { testimonial } from "@my-superteam-fun/db/schema";
import { publicProcedure, editorProcedure, router } from "../index";

export const testimonialsRouter = router({
  list: publicProcedure.query(async () => {
    return db.select().from(testimonial).orderBy(asc(testimonial.sortOrder));
  }),

  create: editorProcedure
    .input(
      z.object({
        text: z.string().min(1),
        author: z.string().min(1),
        role: z.string().min(1),
        twitterHandle: z.string().optional(),
        sortOrder: z.number().int().default(0),
      }),
    )
    .mutation(async ({ input }) => {
      const [created] = await db.insert(testimonial).values(input).returning();
      return created;
    }),

  update: editorProcedure
    .input(
      z.object({
        id: z.string(),
        text: z.string().min(1).optional(),
        author: z.string().min(1).optional(),
        role: z.string().min(1).optional(),
        twitterHandle: z.string().nullable().optional(),
        sortOrder: z.number().int().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      const [updated] = await db
        .update(testimonial)
        .set(data)
        .where(eq(testimonial.id, id))
        .returning();
      return updated;
    }),

  delete: editorProcedure.input(z.object({ id: z.string() })).mutation(async ({ input }) => {
    await db.delete(testimonial).where(eq(testimonial.id, input.id));
    return { success: true };
  }),
});
