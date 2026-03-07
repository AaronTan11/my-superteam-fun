"use client";

import { useEffect } from "react";
import { useDesktop } from "./desktop-context";
import type { AppType } from "./types";

const APP_ORDER: AppType[] = [
  "home",
  "members",
  "events",
  "mission",
  "testimonials",
  "faq",
  "about",
];

export function useKeyboardShortcuts() {
  const { state, openApp, closeWindow, minimizeWindow, toggleMaximize, focusWindow } =
    useDesktop();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const isMod = e.metaKey || e.ctrlKey;
      if (!isMod) return;

      const activeWin = state.windows.find(
        (w) => w.id === state.activeWindowId,
      );

      // Cmd+W — close active window
      if (e.key === "w") {
        e.preventDefault();
        if (activeWin) closeWindow(activeWin.id);
        return;
      }

      // Cmd+M — minimize active window
      if (e.key === "m" && e.metaKey) {
        e.preventDefault();
        if (activeWin) minimizeWindow(activeWin.id);
        return;
      }

      // Cmd+` — cycle windows
      if (e.key === "`") {
        e.preventDefault();
        const nonMinimized = state.windows.filter((w) => !w.isMinimized);
        if (nonMinimized.length < 2) return;
        const currentIdx = nonMinimized.findIndex(
          (w) => w.id === state.activeWindowId,
        );
        const nextIdx = (currentIdx + 1) % nonMinimized.length;
        focusWindow(nonMinimized[nextIdx]!.id);
        return;
      }

      // Cmd+1-7 — open/focus app by index
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= 7) {
        e.preventDefault();
        openApp(APP_ORDER[num - 1]!);
        return;
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      const activeWin = state.windows.find(
        (w) => w.id === state.activeWindowId,
      );
      if (activeWin?.isMaximized) {
        toggleMaximize(activeWin.id);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [state, openApp, closeWindow, minimizeWindow, toggleMaximize, focusWindow]);
}
