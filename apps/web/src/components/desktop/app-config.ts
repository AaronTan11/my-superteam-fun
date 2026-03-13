import type { AppType } from "./types";

export interface AppConfig {
  title: string;
  defaultSize: { width: number; height: number };
  minSize: { width: number; height: number };
  icon: string; // Lucide icon name
  gradient: string; // CSS gradient for icon background
}

export const APP_CONFIGS: Record<AppType, AppConfig> = {
  home: {
    title: "Superteam MY",
    defaultSize: { width: 900, height: 680 },
    minSize: { width: 500, height: 400 },
    icon: "Globe",
    gradient: "linear-gradient(135deg, #14F195 0%, #0EA5E9 100%)",
  },
  members: {
    title: "Members",
    defaultSize: { width: 820, height: 600 },
    minSize: { width: 450, height: 350 },
    icon: "Users",
    gradient: "linear-gradient(135deg, #6366F1 0%, #3B82F6 100%)",
  },
  events: {
    title: "Events",
    defaultSize: { width: 700, height: 550 },
    minSize: { width: 400, height: 300 },
    icon: "Calendar",
    gradient: "linear-gradient(135deg, #F97316 0%, #FBBF24 100%)",
  },
  mission: {
    title: "What We Do",
    defaultSize: { width: 750, height: 550 },
    minSize: { width: 400, height: 300 },
    icon: "Briefcase",
    gradient: "linear-gradient(135deg, #A855F7 0%, #7C3AED 100%)",
  },
  testimonials: {
    title: "Testimonials",
    defaultSize: { width: 700, height: 600 },
    minSize: { width: 400, height: 350 },
    icon: "MessageSquare",
    gradient: "linear-gradient(135deg, #EC4899 0%, #F43F5E 100%)",
  },
  faq: {
    title: "FAQ",
    defaultSize: { width: 650, height: 500 },
    minSize: { width: 400, height: 300 },
    icon: "HelpCircle",
    gradient: "linear-gradient(135deg, #06B6D4 0%, #38BDF8 100%)",
  },
  about: {
    title: "About",
    defaultSize: { width: 500, height: 450 },
    minSize: { width: 350, height: 300 },
    icon: "Info",
    gradient: "linear-gradient(135deg, #64748B 0%, #475569 100%)",
  },
};
