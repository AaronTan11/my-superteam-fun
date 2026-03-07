import type { AppType } from "./types";

export interface AppConfig {
  title: string;
  defaultSize: { width: number; height: number };
  minSize: { width: number; height: number };
  icon: string; // Lucide icon name
}

export const APP_CONFIGS: Record<AppType, AppConfig> = {
  home: {
    title: "Superteam MY",
    defaultSize: { width: 900, height: 680 },
    minSize: { width: 500, height: 400 },
    icon: "Globe",
  },
  members: {
    title: "Members",
    defaultSize: { width: 820, height: 600 },
    minSize: { width: 450, height: 350 },
    icon: "Users",
  },
  events: {
    title: "Events",
    defaultSize: { width: 700, height: 550 },
    minSize: { width: 400, height: 300 },
    icon: "Calendar",
  },
  mission: {
    title: "What We Do",
    defaultSize: { width: 750, height: 550 },
    minSize: { width: 400, height: 300 },
    icon: "Briefcase",
  },
  testimonials: {
    title: "Testimonials",
    defaultSize: { width: 700, height: 600 },
    minSize: { width: 400, height: 350 },
    icon: "MessageSquare",
  },
  faq: {
    title: "FAQ",
    defaultSize: { width: 650, height: 500 },
    minSize: { width: 400, height: 300 },
    icon: "HelpCircle",
  },
  about: {
    title: "About",
    defaultSize: { width: 500, height: 450 },
    minSize: { width: 350, height: 300 },
    icon: "Info",
  },
};
