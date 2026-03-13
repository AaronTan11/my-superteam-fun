"use client";

import { useState, useCallback, useRef } from "react";
import { motion, type PanInfo } from "motion/react";
import {
  Users,
  Calendar,
  Briefcase,
  MessageSquare,
  HelpCircle,
  Info,
} from "lucide-react";
import { useDesktop } from "./desktop-context";
import { APP_CONFIGS } from "./app-config";
import type { AppType } from "./types";
import type { LucideIcon } from "lucide-react";

const DESKTOP_APPS: { appType: AppType; label: string; icon: LucideIcon | null }[] = [
  { appType: "home", label: "Superteam MY", icon: null },
  { appType: "members", label: "Members", icon: Users },
  { appType: "events", label: "Events", icon: Calendar },
  { appType: "mission", label: "What We Do", icon: Briefcase },
  { appType: "testimonials", label: "Testimonials", icon: MessageSquare },
  { appType: "faq", label: "FAQ", icon: HelpCircle },
  { appType: "about", label: "About", icon: Info },
];

const CELL_HEIGHT = 92;
const CELL_WIDTH = 84;
const GRID_PADDING_RIGHT = 20;
const GRID_PADDING_TOP = 16;

function DesktopIcon({
  appType,
  label,
  icon: Icon,
  isSelected,
  isDragging,
  onClick,
  onDoubleClick,
}: {
  appType: AppType;
  label: string;
  icon: LucideIcon | null;
  isSelected: boolean;
  isDragging: boolean;
  onClick: (appType: AppType) => void;
  onDoubleClick: (appType: AppType) => void;
}) {
  const config = APP_CONFIGS[appType];

  return (
    <div
      className={`flex flex-col items-center gap-1 p-1.5 rounded-lg select-none ${
        isDragging ? "cursor-grabbing" : "cursor-default"
      } ${isSelected ? "bg-primary/15" : ""}`}
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
        className={`size-12 rounded-[14px] flex items-center justify-center border transition-all duration-150 overflow-hidden ${
          isSelected
            ? "border-white/30 scale-105"
            : "border-white/[0.15] hover:scale-105"
        }`}
        style={{
          background: config.gradient,
          boxShadow:
            "0 2px 10px oklch(0 0 0 / 30%), inset 0 1px 0 oklch(1 0 0 / 20%)",
        }}
      >
        {Icon ? (
          <Icon className="size-6 text-white drop-shadow-sm" strokeWidth={1.8} />
        ) : (
          <img
            src="/images/brand/logomark-white.png"
            alt=""
            className="size-8 object-contain"
          />
        )}
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
    </div>
  );
}

type Offsets = Record<AppType, { dx: number; dy: number }>;

export function DesktopIcons() {
  const { openApp } = useDesktop();
  const [selectedIcon, setSelectedIcon] = useState<AppType | null>(null);
  const [draggingIcon, setDraggingIcon] = useState<AppType | null>(null);
  const [offsets, setOffsets] = useState<Offsets>(() => {
    const o = {} as Offsets;
    for (const app of DESKTOP_APPS) {
      o[app.appType] = { dx: 0, dy: 0 };
    }
    return o;
  });
  const containerRef = useRef<HTMLDivElement>(null);

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

  const handleDragEnd = useCallback(
    (appType: AppType, _: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      setDraggingIcon(null);
      setOffsets((prev) => ({
        ...prev,
        [appType]: {
          dx: prev[appType].dx + info.offset.x,
          dy: prev[appType].dy + info.offset.y,
        },
      }));
    },
    [],
  );

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-[1]"
      onClick={handleDesktopClick}
    >
      {DESKTOP_APPS.map((app, i) => {
        const offset = offsets[app.appType];
        return (
          <motion.div
            key={app.appType}
            drag
            dragMomentum={false}
            dragElastic={0}
            dragConstraints={containerRef}
            onDragStart={() => setDraggingIcon(app.appType)}
            onDragEnd={(e, info) => handleDragEnd(app.appType, e, info)}
            className="absolute"
            style={{
              right: GRID_PADDING_RIGHT,
              top: GRID_PADDING_TOP + i * CELL_HEIGHT,
              x: offset.dx,
              y: offset.dy,
              zIndex: draggingIcon === app.appType ? 10 : 1,
            }}
            whileDrag={{ scale: 1.08 }}
          >
            <DesktopIcon
              appType={app.appType}
              label={app.label}
              icon={app.icon}
              isSelected={selectedIcon === app.appType}
              isDragging={draggingIcon === app.appType}
              onClick={handleIconClick}
              onDoubleClick={handleIconDoubleClick}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
