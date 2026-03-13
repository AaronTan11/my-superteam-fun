import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "@my-superteam-fun/db";
import { user } from "@my-superteam-fun/db/schema";
import { adminProcedure, router } from "../index";

export const adminRouter = router({
  getUsers: adminProcedure.query(async () => {
    return db
      .select({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      })
      .from(user);
  }),

  setUserRole: adminProcedure
    .input(
      z.object({
        userId: z.string(),
        role: z.enum(["admin", "editor", "user"]),
      }),
    )
    .mutation(async ({ input }) => {
      const [updated] = await db
        .update(user)
        .set({ role: input.role })
        .where(eq(user.id, input.userId))
        .returning();
      return updated;
    }),
});
