import { publicProcedure, protectedProcedure, router } from "../index";
import { membersRouter } from "./members";
import { eventsRouter } from "./events";
import { partnersRouter } from "./partners";
import { testimonialsRouter } from "./testimonials";
import { faqRouter } from "./faq";
import { statsRouter } from "./stats";
import { adminRouter } from "./admin";

export const appRouter = router({
  healthCheck: publicProcedure.query(() => {
    return "OK";
  }),
  privateData: protectedProcedure.query(({ ctx }) => {
    return {
      message: "This is private",
      user: ctx.session.user,
    };
  }),
  members: membersRouter,
  events: eventsRouter,
  partners: partnersRouter,
  testimonials: testimonialsRouter,
  faq: faqRouter,
  stats: statsRouter,
  admin: adminRouter,
});
export type AppRouter = typeof appRouter;
