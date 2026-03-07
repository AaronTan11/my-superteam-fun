"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { useMobile } from "./mobile-context";
import { MobileWallpaper } from "./mobile-wallpaper";
import {
  MOBILE_APPS,
  DOCK_APPS,
  STATUS_BAR_HEIGHT,
  HOME_INDICATOR_HEIGHT,
} from "./mobile-app-config";
import type { MobileAppConfig } from "./mobile-app-config";
import type { AppType } from "@/components/desktop/types";

/* ── App Icon ── */
function AppIcon({
  app,
  onTap,
}: {
  app: MobileAppConfig;
  onTap: (origin: { x: number; y: number }) => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const handleTap = () => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    onTap({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
  };

  const Icon = app.icon;

  return (
    <button
      ref={ref}
      onClick={handleTap}
      className="flex flex-col items-center gap-1 active:scale-90 transition-transform duration-150"
    >
      <div
        className="size-[60px] rounded-[14px] flex items-center justify-center border border-white/10"
        style={{
          backgroundColor: app.color,
          backdropFilter: "blur(20px) saturate(1.2)",
          WebkitBackdropFilter: "blur(20px) saturate(1.2)",
          boxShadow:
            "0 2px 8px oklch(0 0 0 / 20%), inset 0 1px 0 oklch(1 0 0 / 6%)",
        }}
      >
        <Icon className="size-7 text-foreground/80" strokeWidth={1.5} />
      </div>
      <span className="text-[11px] text-foreground/70 leading-tight">
        {app.label}
      </span>
    </button>
  );
}

/* ── Home Screen ── */
export function HomeScreen() {
  const { openApp } = useMobile();

  const handleOpenApp = (app: AppType, origin: { x: number; y: number }) => {
    openApp(app, origin);
  };

  // Separate grid apps (not in dock) from dock apps
  const gridApps = MOBILE_APPS.filter(
    (app) => !DOCK_APPS.includes(app.type),
  );
  const dockApps = MOBILE_APPS.filter((app) =>
    DOCK_APPS.includes(app.type),
  ).sort((a, b) => DOCK_APPS.indexOf(a.type) - DOCK_APPS.indexOf(b.type));

  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Wallpaper */}
      <MobileWallpaper />

      {/* App icon grid */}
      <div
        className="relative z-10 px-6"
        style={{
          paddingTop: STATUS_BAR_HEIGHT + 24,
          paddingBottom: HOME_INDICATOR_HEIGHT + 100, // room for dock
        }}
      >
        <div className="grid grid-cols-4 gap-y-6 gap-x-4 justify-items-center">
          {gridApps.map((app, i) => (
            <motion.div
              key={app.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
            >
              <AppIcon
                app={app}
                onTap={(origin) => handleOpenApp(app.type, origin)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom dock */}
      <div
        className="fixed left-4 right-4 z-[8000] flex justify-center"
        style={{ bottom: HOME_INDICATOR_HEIGHT + 8 }}
      >
        <div
          className="flex justify-around items-center gap-4 px-6 py-3 rounded-2xl backdrop-blur-xl"
          style={{
            backgroundColor: "oklch(0.14 0.02 260 / 60%)",
            border: "1px solid oklch(1 0 0 / 15%)",
            boxShadow:
              "0 8px 32px oklch(0 0 0 / 30%), inset 0 1px 0 oklch(1 0 0 / 5%)",
          }}
        >
          {dockApps.map((app) => (
            <AppIcon
              key={app.type}
              app={app}
              onTap={(origin) => handleOpenApp(app.type, origin)}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
