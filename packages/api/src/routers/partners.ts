import { z } from "zod";
import { eq, asc } from "drizzle-orm";
import { db } from "@my-superteam-fun/db";
import { partner } from "@my-superteam-fun/db/schema";
import { publicProcedure, editorProcedure, router } from "../index";

export const partnersRouter = router({
  list: publicProcedure.query(async () => {
    return db.select().from(partner).orderBy(asc(partner.sortOrder), asc(partner.name));
  }),

  create: editorProcedure
    .input(
      z.object({
        name: z.string().min(1),
        logoUrl: z.string().default(""),
        websiteUrl: z.string().url(),
        sortOrder: z.number().int().default(0),
      }),
    )
    .mutation(async ({ input }) => {
      const [created] = await db.insert(partner).values(input).returning();
      return created;
    }),

  update: editorProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).optional(),
        logoUrl: z.string().optional(),
        websiteUrl: z.string().url().optional(),
        sortOrder: z.number().int().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      const [updated] = await db.update(partner).set(data).where(eq(partner.id, id)).returning();
      return updated;
    }),

  delete: editorProcedure.input(z.object({ id: z.string() })).mutation(async ({ input }) => {
    await db.delete(partner).where(eq(partner.id, input.id));
    return { success: true };
  }),
});
