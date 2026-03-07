"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ChevronUp } from "lucide-react";
import { useMobile } from "./mobile-context";
import { MobileWallpaper } from "./mobile-wallpaper";
import { STMYLogo } from "@/components/shared/stmy-logo";
import { STATUS_BAR_HEIGHT } from "./mobile-app-config";

export function LockScreen() {
  const { unlock } = useMobile();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 10_000);
    return () => clearInterval(interval);
  }, []);

  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
  });

  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center"
      style={{ paddingTop: STATUS_BAR_HEIGHT }}
      initial={{ y: 0, opacity: 1 }}
      exit={{ y: "-100%", opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.2}
      onDragEnd={(_, info) => {
        if (info.offset.y < -100) {
          unlock();
        }
      }}
    >
      {/* Wallpaper */}
      <MobileWallpaper />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center pt-[25vh]">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
        >
          <STMYLogo size={36} />
        </motion.div>

        {/* Time */}
        <motion.p
          className="font-display text-7xl font-bold text-foreground mt-4 tabular-nums"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {timeStr}
        </motion.p>

        {/* Date */}
        <motion.p
          className="text-base text-foreground/60 mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {dateStr}
        </motion.p>
      </div>

      {/* Swipe up hint */}
      <div className="relative z-10 mt-auto mb-16 flex flex-col items-center gap-2">
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronUp className="size-5 text-foreground/30" />
        </motion.div>
        <p className="text-xs text-foreground/30 font-mono tracking-wider uppercase">
          Swipe up to open
        </p>
      </div>
    </motion.div>
  );
}
