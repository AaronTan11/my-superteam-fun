"use client";

import { useState, useEffect } from "react";
import { useDesktop } from "./desktop-context";
import { STMYLogo } from "@/components/shared/stmy-logo";
import { Wifi, Battery } from "lucide-react";

function Clock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    function update() {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
      );
    }
    update();
    const interval = setInterval(update, 10_000);
    return () => clearInterval(interval);
  }, []);

  return <span>{time}</span>;
}

export function MenuBar() {
  const { state } = useDesktop();
  const activeWindow = state.windows.find(
    (w) => w.id === state.activeWindowId,
  );

  return (
    <div
      className="fixed top-0 inset-x-0 h-7 z-[9999] flex items-center justify-between px-4 backdrop-blur-xl border-b select-none"
      style={{
        backgroundColor: "oklch(0.10 0.02 260 / 65%)",
        borderColor: "oklch(1 0 0 / 8%)",
      }}
    >
      {/* Left: Logo + app name */}
      <div className="flex items-center gap-3">
        <STMYLogo size={14} />
        <span className="font-display text-xs font-bold">
          {activeWindow?.title ?? "Superteam MY"}
        </span>
        <div className="hidden md:flex items-center gap-3 ml-2 text-[11px] text-foreground/40">
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>Window</span>
        </div>
      </div>

      {/* Right: Status items */}
      <div className="flex items-center gap-3 text-[10px] font-mono text-muted-foreground">
        <Wifi className="size-3 opacity-60" />
        <Battery className="size-3 opacity-60" />
        <span>
          {new Date().toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          })}
        </span>
        <Clock />
      </div>
    </div>
  );
}
