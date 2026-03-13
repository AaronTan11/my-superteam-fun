import { z } from "zod";
import { eq, asc } from "drizzle-orm";
import { db } from "@my-superteam-fun/db";
import { stat } from "@my-superteam-fun/db/schema";
import { publicProcedure, editorProcedure, router } from "../index";

export const statsRouter = router({
  list: publicProcedure.query(async () => {
    return db.select().from(stat).orderBy(asc(stat.sortOrder));
  }),

  update: editorProcedure
    .input(
      z.object({
        id: z.string(),
        value: z.number().int().optional(),
        suffix: z.string().optional(),
        label: z.string().min(1).optional(),
        sortOrder: z.number().int().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      const [updated] = await db.update(stat).set(data).where(eq(stat.id, id)).returning();
      return updated;
    }),
});
