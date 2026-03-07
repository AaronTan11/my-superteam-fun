"use client";

import { lazy, Suspense } from "react";
import type { AppType } from "./types";

const HomeApp = lazy(() =>
  import("./apps/home-app").then((m) => ({ default: m.HomeApp })),
);
const MembersApp = lazy(() =>
  import("./apps/members-app").then((m) => ({ default: m.MembersApp })),
);
const EventsApp = lazy(() =>
  import("./apps/events-app").then((m) => ({ default: m.EventsApp })),
);
const MissionApp = lazy(() =>
  import("./apps/mission-app").then((m) => ({ default: m.MissionApp })),
);
const TestimonialsApp = lazy(() =>
  import("./apps/testimonials-app").then((m) => ({
    default: m.TestimonialsApp,
  })),
);
const FaqApp = lazy(() =>
  import("./apps/faq-app").then((m) => ({ default: m.FaqApp })),
);
const AboutApp = lazy(() =>
  import("./apps/about-app").then((m) => ({ default: m.AboutApp })),
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
    <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
      Loading...
    </div>
  );
}

export function AppRenderer({ appType }: { appType: AppType }) {
  const Component = APPS[appType];
  return (
    <Suspense fallback={<AppFallback />}>
      <Component />
    </Suspense>
  );
}
