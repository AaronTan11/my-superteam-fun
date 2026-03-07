"use client";

import { motion } from "motion/react";
import { ChevronLeft } from "lucide-react";
import { useMobile } from "./mobile-context";
import { MobileAppContent } from "./mobile-app-content";
import { STATUS_BAR_HEIGHT, HOME_INDICATOR_HEIGHT } from "./mobile-app-config";
import type { AppType } from "@/components/desktop/types";

interface AppViewProps {
  app: AppType;
  origin: { x: number; y: number } | null;
}

export function AppView({ app, origin }: AppViewProps) {
  const { closeApp } = useMobile();

  // Default origin to center of screen if not provided
  const ox = origin?.x ?? (typeof window !== "undefined" ? window.innerWidth / 2 : 200);
  const oy = origin?.y ?? (typeof window !== "undefined" ? window.innerHeight / 2 : 400);

  return (
    <motion.div
      className="absolute inset-0 bg-card overflow-y-auto overflow-x-hidden scrollbar-thin"
      style={{
        paddingTop: STATUS_BAR_HEIGHT,
        paddingBottom: HOME_INDICATOR_HEIGHT,
      }}
      initial={{
        clipPath: `circle(0% at ${ox}px ${oy}px)`,
        opacity: 0.5,
      }}
      animate={{
        clipPath: `circle(150% at ${ox}px ${oy}px)`,
        opacity: 1,
      }}
      exit={{
        clipPath: `circle(0% at ${ox}px ${oy}px)`,
        opacity: 0,
      }}
      transition={{
        duration: 0.4,
        ease: [0.32, 0.72, 0, 1],
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.4}
      onDragEnd={(_, info) => {
        if (info.offset.x > 100 && info.velocity.x > 200) {
          closeApp();
        }
      }}
    >
      {/* Back button */}
      <button
        onClick={closeApp}
        className="fixed z-50 flex items-center gap-0.5 text-primary text-sm font-medium active:opacity-60 transition-opacity"
        style={{
          top: STATUS_BAR_HEIGHT + 8,
          left: 12,
        }}
      >
        <ChevronLeft className="size-5" />
        Back
      </button>

      {/* App content */}
      <div className="pt-8">
        <MobileAppContent app={app} />
      </div>
    </motion.div>
  );
}
