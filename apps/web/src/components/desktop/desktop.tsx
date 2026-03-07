"use client";

import { useEffect } from "react";
import { useDesktop } from "./desktop-context";
import { Window } from "./window";
import { AppRenderer } from "./app-renderer";
import { DesktopIcons } from "./desktop-icons";
import { KLSkyline } from "@/components/shared/kl-skyline";
import { MENU_BAR_HEIGHT, DOCK_HEIGHT } from "./types";
import { useKeyboardShortcuts } from "./use-keyboard-shortcuts";
import type { AppType } from "./types";

interface DesktopProps {
  initialApp?: AppType;
}

export function Desktop({ initialApp = "home" }: DesktopProps) {
  const { state, openApp } = useDesktop();
  useKeyboardShortcuts();

  // Open initial app on mount
  useEffect(() => {
    if (state.windows.length === 0) {
      openApp(initialApp);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // URL sync — update URL when active window changes
  useEffect(() => {
    const activeWin = state.windows.find(
      (w) => w.id === state.activeWindowId,
    );
    if (!activeWin) return;
    const path =
      activeWin.appType === "home" ? "/" : `/#${activeWin.appType}`;
    if (window.location.pathname + window.location.hash !== path) {
      window.history.replaceState(null, "", path);
    }
  }, [state.activeWindowId, state.windows]);

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{
        top: MENU_BAR_HEIGHT,
        bottom: DOCK_HEIGHT,
      }}
    >
      {/* Wallpaper */}
      <div className="absolute inset-0 bg-background" aria-hidden="true">
        {/* Base gradient — diagonal atmospheric sky */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(170deg, oklch(0.08 0.03 280) 0%, oklch(0.10 0.04 270) 30%, oklch(0.12 0.05 250) 60%, oklch(0.15 0.06 200) 100%)",
          }}
        />

        {/* Stars + STMY constellation */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1000 600"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Scattered background stars */}
          {[
            { x: 50, y: 45, r: 1, o: 0.25 },
            { x: 120, y: 80, r: 1.2, o: 0.3 },
            { x: 180, y: 30, r: 0.8, o: 0.2 },
            { x: 230, y: 120, r: 1, o: 0.15 },
            { x: 310, y: 55, r: 1.3, o: 0.35 },
            { x: 380, y: 90, r: 0.9, o: 0.2 },
            { x: 420, y: 25, r: 1.1, o: 0.3 },
            { x: 490, y: 70, r: 0.8, o: 0.18 },
            { x: 550, y: 40, r: 1.2, o: 0.25 },
            { x: 620, y: 100, r: 1, o: 0.2 },
            { x: 680, y: 35, r: 0.9, o: 0.3 },
            { x: 740, y: 85, r: 1.1, o: 0.22 },
            { x: 800, y: 50, r: 1.3, o: 0.28 },
            { x: 860, y: 110, r: 0.8, o: 0.15 },
            { x: 920, y: 60, r: 1, o: 0.2 },
            { x: 960, y: 30, r: 0.9, o: 0.25 },
            { x: 75, y: 160, r: 1, o: 0.18 },
            { x: 150, y: 200, r: 1.2, o: 0.22 },
            { x: 270, y: 180, r: 0.8, o: 0.15 },
            { x: 350, y: 220, r: 1.1, o: 0.2 },
            { x: 470, y: 150, r: 0.9, o: 0.25 },
            { x: 560, y: 190, r: 1, o: 0.18 },
            { x: 650, y: 160, r: 1.3, o: 0.22 },
            { x: 730, y: 210, r: 0.8, o: 0.15 },
            { x: 820, y: 170, r: 1.1, o: 0.2 },
            { x: 900, y: 200, r: 1, o: 0.17 },
            { x: 100, y: 280, r: 0.9, o: 0.12 },
            { x: 200, y: 260, r: 1, o: 0.15 },
            { x: 440, y: 270, r: 0.8, o: 0.12 },
            { x: 590, y: 250, r: 1.1, o: 0.14 },
            { x: 780, y: 280, r: 0.9, o: 0.1 },
            { x: 950, y: 260, r: 1, o: 0.12 },
            { x: 30, y: 140, r: 1.1, o: 0.2 },
            { x: 510, y: 115, r: 0.7, o: 0.3 },
            { x: 340, y: 15, r: 1, o: 0.35 },
            { x: 700, y: 140, r: 0.8, o: 0.18 },
            { x: 850, y: 20, r: 1.2, o: 0.32 },
            { x: 170, y: 240, r: 0.9, o: 0.14 },
            { x: 660, y: 230, r: 1, o: 0.12 },
            { x: 480, y: 10, r: 1.1, o: 0.28 },
          ].map((star, i) => (
            <circle
              key={`star-${i}`}
              cx={star.x}
              cy={star.y}
              r={star.r}
              fill="oklch(0.90 0.01 250)"
              opacity={star.o}
              className={
                i % 7 === 0 ? "animate-twinkle" : undefined
              }
              style={
                i % 7 === 0
                  ? {
                      ["--star-base-opacity" as string]: star.o,
                      animationDelay: `${(i * 1.3) % 8}s`,
                    }
                  : undefined
              }
            />
          ))}

          {/* STMY constellation — letter S */}
          <g opacity="0.35">
            <circle cx="205" cy="78" r="1.8" fill="oklch(0.82 0.05 165)" />
            <circle cx="195" cy="88" r="1.5" fill="oklch(0.82 0.05 165)" />
            <circle cx="200" cy="100" r="1.8" fill="oklch(0.82 0.05 165)" />
            <circle cx="210" cy="110" r="1.5" fill="oklch(0.82 0.05 165)" />
            <circle cx="205" cy="122" r="1.8" fill="oklch(0.82 0.05 165)" />
            <line x1="205" y1="78" x2="195" y2="88" stroke="oklch(0.80 0.04 165)" strokeWidth="0.3" opacity="0.2" />
            <line x1="195" y1="88" x2="200" y2="100" stroke="oklch(0.80 0.04 165)" strokeWidth="0.3" opacity="0.2" />
            <line x1="200" y1="100" x2="210" y2="110" stroke="oklch(0.80 0.04 165)" strokeWidth="0.3" opacity="0.2" />
            <line x1="210" y1="110" x2="205" y2="122" stroke="oklch(0.80 0.04 165)" strokeWidth="0.3" opacity="0.2" />
          </g>

          {/* STMY constellation — letter T */}
          <g opacity="0.35">
            <circle cx="240" cy="78" r="1.5" fill="oklch(0.82 0.05 165)" />
            <circle cx="252" cy="78" r="1.8" fill="oklch(0.82 0.05 165)" />
            <circle cx="264" cy="78" r="1.5" fill="oklch(0.82 0.05 165)" />
            <circle cx="252" cy="92" r="1.5" fill="oklch(0.82 0.05 165)" />
            <circle cx="252" cy="108" r="1.5" fill="oklch(0.82 0.05 165)" />
            <circle cx="252" cy="122" r="1.8" fill="oklch(0.82 0.05 165)" />
            <line x1="240" y1="78" x2="264" y2="78" stroke="oklch(0.80 0.04 165)" strokeWidth="0.3" opacity="0.2" />
            <line x1="252" y1="78" x2="252" y2="122" stroke="oklch(0.80 0.04 165)" strokeWidth="0.3" opacity="0.2" />
          </g>

          {/* STMY constellation — letter M */}
          <g opacity="0.35">
            <circle cx="285" cy="122" r="1.8" fill="oklch(0.82 0.05 165)" />
            <circle cx="285" cy="105" r="1.5" fill="oklch(0.82 0.05 165)" />
            <circle cx="287" cy="88" r="1.5" fill="oklch(0.82 0.05 165)" />
            <circle cx="297" cy="78" r="1.8" fill="oklch(0.82 0.05 165)" />
            <circle cx="305" cy="95" r="1.5" fill="oklch(0.82 0.05 165)" />
            <circle cx="313" cy="78" r="1.8" fill="oklch(0.82 0.05 165)" />
            <circle cx="323" cy="88" r="1.5" fill="oklch(0.82 0.05 165)" />
            <circle cx="325" cy="105" r="1.5" fill="oklch(0.82 0.05 165)" />
            <circle cx="325" cy="122" r="1.8" fill="oklch(0.82 0.05 165)" />
            <line x1="285" y1="122" x2="287" y2="88" stroke="oklch(0.80 0.04 165)" strokeWidth="0.3" opacity="0.2" />
            <line x1="287" y1="88" x2="297" y2="78" stroke="oklch(0.80 0.04 165)" strokeWidth="0.3" opacity="0.2" />
            <line x1="297" y1="78" x2="305" y2="95" stroke="oklch(0.80 0.04 165)" strokeWidth="0.3" opacity="0.2" />
            <line x1="305" y1="95" x2="313" y2="78" stroke="oklch(0.80 0.04 165)" strokeWidth="0.3" opacity="0.2" />
            <line x1="313" y1="78" x2="323" y2="88" stroke="oklch(0.80 0.04 165)" strokeWidth="0.3" opacity="0.2" />
            <line x1="323" y1="88" x2="325" y2="122" stroke="oklch(0.80 0.04 165)" strokeWidth="0.3" opacity="0.2" />
          </g>

          {/* STMY constellation — letter Y */}
          <g opacity="0.35">
            <circle cx="348" cy="78" r="1.8" fill="oklch(0.82 0.05 165)" />
            <circle cx="355" cy="90" r="1.5" fill="oklch(0.82 0.05 165)" />
            <circle cx="362" cy="100" r="1.8" fill="oklch(0.82 0.05 165)" />
            <circle cx="369" cy="90" r="1.5" fill="oklch(0.82 0.05 165)" />
            <circle cx="376" cy="78" r="1.8" fill="oklch(0.82 0.05 165)" />
            <circle cx="362" cy="112" r="1.5" fill="oklch(0.82 0.05 165)" />
            <circle cx="362" cy="122" r="1.8" fill="oklch(0.82 0.05 165)" />
            <line x1="348" y1="78" x2="362" y2="100" stroke="oklch(0.80 0.04 165)" strokeWidth="0.3" opacity="0.2" />
            <line x1="376" y1="78" x2="362" y2="100" stroke="oklch(0.80 0.04 165)" strokeWidth="0.3" opacity="0.2" />
            <line x1="362" y1="100" x2="362" y2="122" stroke="oklch(0.80 0.04 165)" strokeWidth="0.3" opacity="0.2" />
          </g>
        </svg>

        {/* Aurora glow — sol-purple (left) */}
        <div
          className="absolute inset-0 animate-aurora-drift"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 20% 75%, oklch(0.28 0.18 303 / 40%), transparent 70%)",
          }}
        />

        {/* Aurora glow — sol-green (right) */}
        <div
          className="absolute inset-0 animate-aurora-drift-reverse"
          style={{
            background:
              "radial-gradient(ellipse 65% 50% at 80% 70%, oklch(0.30 0.14 165 / 35%), transparent 70%)",
          }}
        />

        {/* KL Skyline — prominent silhouette */}
        <div className="absolute bottom-0 left-0 right-0 opacity-[0.45]">
          <KLSkyline className="w-full" />
        </div>

        {/* Ground glow — city light reflection */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            background:
              "linear-gradient(to top, oklch(0.25 0.08 165 / 25%) 0%, oklch(0.20 0.06 75 / 12%) 40%, transparent 100%)",
          }}
        />
      </div>

      {/* Desktop Icons */}
      <DesktopIcons />

      {/* Windows */}
      {state.windows.map((win) => (
        <Window key={win.id} state={win}>
          <AppRenderer appType={win.appType} />
        </Window>
      ))}
    </div>
  );
}
