import { z } from "zod";
import { eq, asc } from "drizzle-orm";
import { db } from "@my-superteam-fun/db";
import { member } from "@my-superteam-fun/db/schema";
import { publicProcedure, editorProcedure, router } from "../index";

export const membersRouter = router({
  list: publicProcedure.query(async () => {
    return db.select().from(member).orderBy(asc(member.sortOrder), asc(member.name));
  }),

  getById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
    const [result] = await db.select().from(member).where(eq(member.id, input.id));
    return result ?? null;
  }),

  create: editorProcedure
    .input(
      z.object({
        name: z.string().min(1),
        title: z.string().min(1),
        company: z.string().optional(),
        photo: z.string().min(1),
        skills: z.array(z.string()).default([]),
        twitterHandle: z.string().optional(),
        isFeatured: z.boolean().default(false),
        achievements: z.array(z.string()).default([]),
        sortOrder: z.number().int().default(0),
      }),
    )
    .mutation(async ({ input }) => {
      const [created] = await db.insert(member).values(input).returning();
      return created;
    }),

  update: editorProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).optional(),
        title: z.string().min(1).optional(),
        company: z.string().nullable().optional(),
        photo: z.string().min(1).optional(),
        skills: z.array(z.string()).optional(),
        twitterHandle: z.string().nullable().optional(),
        isFeatured: z.boolean().optional(),
        achievements: z.array(z.string()).optional(),
        sortOrder: z.number().int().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      const [updated] = await db.update(member).set(data).where(eq(member.id, id)).returning();
      return updated;
    }),

  delete: editorProcedure.input(z.object({ id: z.string() })).mutation(async ({ input }) => {
    await db.delete(member).where(eq(member.id, input.id));
    return { success: true };
  }),
});
