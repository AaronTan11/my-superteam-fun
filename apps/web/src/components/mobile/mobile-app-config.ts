import {
  Users,
  Calendar,
  Briefcase,
  MessageSquare,
  HelpCircle,
  Info,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { AppType } from "@/components/desktop/types";
import { APP_CONFIGS } from "@/components/desktop/app-config";

export interface MobileAppConfig {
  type: AppType;
  label: string;
  icon: LucideIcon | null; // null = use STMY logomark
  gradient: string;
}

export const MOBILE_APPS: MobileAppConfig[] = [
  { type: "home", label: "Superteam", icon: null, gradient: APP_CONFIGS.home.gradient },
  { type: "members", label: "Members", icon: Users, gradient: APP_CONFIGS.members.gradient },
  { type: "events", label: "Events", icon: Calendar, gradient: APP_CONFIGS.events.gradient },
  { type: "mission", label: "What We Do", icon: Briefcase, gradient: APP_CONFIGS.mission.gradient },
  { type: "testimonials", label: "Testimonials", icon: MessageSquare, gradient: APP_CONFIGS.testimonials.gradient },
  { type: "faq", label: "FAQ", icon: HelpCircle, gradient: APP_CONFIGS.faq.gradient },
  { type: "about", label: "About", icon: Info, gradient: APP_CONFIGS.about.gradient },
];

export const DOCK_APPS: AppType[] = ["home", "members", "events", "about"];

export const STATUS_BAR_HEIGHT = 44;
export const HOME_INDICATOR_HEIGHT = 34;
