import { z } from "zod";
import { eq, asc, desc } from "drizzle-orm";
import { db } from "@my-superteam-fun/db";
import { event } from "@my-superteam-fun/db/schema";
import { publicProcedure, editorProcedure, router } from "../index";

export const eventsRouter = router({
  list: publicProcedure.query(async () => {
    return db.select().from(event).orderBy(desc(event.date));
  }),

  upcoming: publicProcedure.query(async () => {
    const all = await db.select().from(event).orderBy(asc(event.date));
    return all.filter((e) => !e.isPast);
  }),

  past: publicProcedure.query(async () => {
    const all = await db.select().from(event).orderBy(desc(event.date));
    return all.filter((e) => e.isPast);
  }),

  getById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
    const [result] = await db.select().from(event).where(eq(event.id, input.id));
    return result ?? null;
  }),

  create: editorProcedure
    .input(
      z.object({
        title: z.string().min(1),
        date: z.string().datetime(),
        location: z.string().min(1),
        description: z.string().min(1),
        lumaUrl: z.string().optional(),
        isPast: z.boolean().default(false),
        sortOrder: z.number().int().default(0),
      }),
    )
    .mutation(async ({ input }) => {
      const [created] = await db
        .insert(event)
        .values({ ...input, date: new Date(input.date) })
        .returning();
      return created;
    }),

  update: editorProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().min(1).optional(),
        date: z.string().datetime().optional(),
        location: z.string().min(1).optional(),
        description: z.string().min(1).optional(),
        lumaUrl: z.string().nullable().optional(),
        isPast: z.boolean().optional(),
        sortOrder: z.number().int().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const { id, date, ...rest } = input;
      const data = date ? { ...rest, date: new Date(date) } : rest;
      const [updated] = await db.update(event).set(data).where(eq(event.id, id)).returning();
      return updated;
    }),

  delete: editorProcedure.input(z.object({ id: z.string() })).mutation(async ({ input }) => {
    await db.delete(event).where(eq(event.id, input.id));
    return { success: true };
  }),
});
