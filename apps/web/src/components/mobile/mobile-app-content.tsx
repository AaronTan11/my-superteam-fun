"use client";

import { lazy, Suspense } from "react";
import type { AppType } from "@/components/desktop/types";

/* ── Lazy-loaded app components (reuse desktop apps) ── */
const HomeApp = lazy(() =>
  import("@/components/desktop/apps/home-app").then((m) => ({
    default: m.HomeApp,
  })),
);
const MembersApp = lazy(() =>
  import("@/components/desktop/apps/members-app").then((m) => ({
    default: m.MembersApp,
  })),
);
const EventsApp = lazy(() =>
  import("@/components/desktop/apps/events-app").then((m) => ({
    default: m.EventsApp,
  })),
);
const MissionApp = lazy(() =>
  import("@/components/desktop/apps/mission-app").then((m) => ({
    default: m.MissionApp,
  })),
);
const TestimonialsApp = lazy(() =>
  import("@/components/desktop/apps/testimonials-app").then((m) => ({
    default: m.TestimonialsApp,
  })),
);
const FaqApp = lazy(() =>
  import("@/components/desktop/apps/faq-app").then((m) => ({
    default: m.FaqApp,
  })),
);
const AboutApp = lazy(() =>
  import("@/components/desktop/apps/about-app").then((m) => ({
    default: m.AboutApp,
  })),
);

const APPS: Record<AppType, React.LazyExoticComponent<React.ComponentType>> = {
  home: HomeApp,
  members: MembersApp,
  events: EventsApp,
  mission: MissionApp,
  testimonials: TestimonialsApp,
  faq: FaqApp,
  about: AboutApp,
};

function AppFallback() {
  return (
    <div className="flex items-center justify-center h-64">
      <div
        className="size-6 rounded-full border-2 border-primary/30 border-t-primary animate-spin"
      />
    </div>
  );
}

export function MobileAppContent({ app }: { app: AppType }) {
  const Component = APPS[app];
  return (
    <Suspense fallback={<AppFallback />}>
      <Component />
    </Suspense>
  );
}
