"use client";

import { useState, useCallback, type ReactNode } from "react";
import { DesktopProvider } from "./desktop-context";
import { Desktop } from "./desktop";
import { MenuBar } from "./menu-bar";
import { Dock } from "./dock";
import { BootScreen } from "./boot-screen";
import { MobileShell } from "@/components/mobile/mobile-shell";
import type { AppType } from "./types";

interface DesktopShellProps {
  children: ReactNode;
  initialApp?: AppType;
}

export function DesktopShell({ children, initialApp }: DesktopShellProps) {
  const [booted, setBooted] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("stmy-booted") === "true";
  });

  const handleBootComplete = useCallback(() => {
    sessionStorage.setItem("stmy-booted", "true");
    setBooted(true);
  }, []);

  return (
    <>
      {/* Mobile: iOS-style experience, hidden on desktop */}
      <div className="md:hidden">
        <MobileShell />
      </div>

      {/* SEO fallback: crawler-visible content */}
      <noscript>{children}</noscript>

      {/* Desktop: full OS metaphor, hidden on mobile */}
      <div className="hidden md:block">
        {!booted && <BootScreen onBootComplete={handleBootComplete} />}

        <DesktopProvider>
          <div className="h-screen w-screen overflow-hidden bg-background">
            <MenuBar />
            <Desktop initialApp={initialApp} />
            <Dock />
          </div>
        </DesktopProvider>
      </div>
    </>
  );
}
