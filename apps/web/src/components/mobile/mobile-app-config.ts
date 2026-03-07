import {
  Globe,
  Users,
  Calendar,
  Briefcase,
  MessageSquare,
  HelpCircle,
  Info,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { AppType } from "@/components/desktop/types";

export interface MobileAppConfig {
  type: AppType;
  label: string;
  icon: LucideIcon;
  color: string;
}

export const MOBILE_APPS: MobileAppConfig[] = [
  { type: "home", label: "Superteam", icon: Globe, color: "oklch(0.82 0.18 165 / 15%)" },
  { type: "members", label: "Members", icon: Users, color: "oklch(0.55 0.24 303 / 15%)" },
  { type: "events", label: "Events", icon: Calendar, color: "oklch(0.72 0.12 75 / 15%)" },
  { type: "mission", label: "What We Do", icon: Briefcase, color: "oklch(0.82 0.18 165 / 15%)" },
  { type: "testimonials", label: "Testimonials", icon: MessageSquare, color: "oklch(0.55 0.24 303 / 15%)" },
  { type: "faq", label: "FAQ", icon: HelpCircle, color: "oklch(0.60 0.18 25 / 15%)" },
  { type: "about", label: "About", icon: Info, color: "oklch(0.72 0.12 75 / 15%)" },
];

export const DOCK_APPS: AppType[] = ["home", "members", "events", "about"];

export const STATUS_BAR_HEIGHT = 44;
export const HOME_INDICATOR_HEIGHT = 34;
