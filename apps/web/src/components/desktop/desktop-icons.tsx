"use client";

import { useState, useCallback } from "react";
import {
  Globe,
  Users,
  Calendar,
  Briefcase,
  MessageSquare,
  HelpCircle,
  Info,
} from "lucide-react";
import { useDesktop } from "./desktop-context";
import type { AppType } from "./types";
import type { LucideIcon } from "lucide-react";

const DESKTOP_APPS: { appType: AppType; label: string; icon: LucideIcon }[] = [
  { appType: "home", label: "Superteam MY", icon: Globe },
  { appType: "members", label: "Members", icon: Users },
  { appType: "events", label: "Events", icon: Calendar },
  { appType: "mission", label: "What We Do", icon: Briefcase },
  { appType: "testimonials", label: "Testimonials", icon: MessageSquare },
  { appType: "faq", label: "FAQ", icon: HelpCircle },
  { appType: "about", label: "About", icon: Info },
];

const GRID_PADDING_RIGHT = 20;
const GRID_PADDING_TOP = 16;
const CELL_HEIGHT = 92;
const CELL_WIDTH = 84;

function DesktopIcon({
  appType,
  label,
  icon: Icon,
  isSelected,
  onClick,
  onDoubleClick,
}: {
  appType: AppType;
  label: string;
  icon: LucideIcon;
  isSelected: boolean;
  onClick: (appType: AppType) => void;
  onDoubleClick: (appType: AppType) => void;
}) {
  return (
    <button
      className={`flex flex-col items-center gap-1 p-1.5 rounded-lg select-none cursor-default transition-colors duration-100 ${
        isSelected ? "bg-primary/15" : "hover:bg-white/[0.04]"
      }`}
      style={{ width: CELL_WIDTH }}
      onClick={(e) => {
        e.stopPropagation();
        onClick(appType);
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onDoubleClick(appType);
      }}
    >
      <div
        className={`size-12 rounded-[14px] flex items-center justify-center border transition-all duration-150 ${
          isSelected ? "border-primary/30 scale-105" : "border-white/[0.10] hover:scale-105"
        }`}
        style={{
          backgroundColor: "oklch(0.16 0.02 260 / 55%)",
          backdropFilter: "blur(20px) saturate(1.2)",
          WebkitBackdropFilter: "blur(20px) saturate(1.2)",
          boxShadow: "0 2px 8px oklch(0 0 0 / 20%), inset 0 1px 0 oklch(1 0 0 / 6%)",
        }}
      >
        <Icon className="size-6 text-foreground/80" strokeWidth={1.5} />
      </div>
      <span
        className={`text-[11px] font-mono leading-tight text-center max-w-full px-1 rounded line-clamp-2 ${
          isSelected
            ? "bg-primary/25 text-foreground"
            : "text-foreground/80"
        }`}
        style={{ textShadow: "0 1px 3px oklch(0.04 0.02 260 / 80%)" }}
      >
        {label}
      </span>
    </button>
  );
}

export function DesktopIcons() {
  const { openApp } = useDesktop();
  const [selectedIcon, setSelectedIcon] = useState<AppType | null>(null);

  const handleIconClick = useCallback((appType: AppType) => {
    setSelectedIcon(appType);
  }, []);

  const handleIconDoubleClick = useCallback(
    (appType: AppType) => {
      openApp(appType);
      setSelectedIcon(null);
    },
    [openApp],
  );

  const handleDesktopClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        setSelectedIcon(null);
      }
    },
    [],
  );

  return (
    <div className="absolute inset-0 z-[1]" onClick={handleDesktopClick}>
      <div
        className="absolute top-0 right-0 flex flex-col flex-wrap-reverse items-end content-end"
        style={{
          paddingRight: GRID_PADDING_RIGHT,
          paddingTop: GRID_PADDING_TOP,
          height: "100%",
          gap: 4,
        }}
      >
        {DESKTOP_APPS.map((app) => (
          <div key={app.appType} style={{ height: CELL_HEIGHT }}>
            <DesktopIcon
              appType={app.appType}
              label={app.label}
              icon={app.icon}
              isSelected={selectedIcon === app.appType}
              onClick={handleIconClick}
              onDoubleClick={handleIconDoubleClick}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
