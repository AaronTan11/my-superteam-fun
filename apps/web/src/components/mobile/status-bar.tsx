"use client";

import { useState, useEffect } from "react";
import { Wifi, Signal, BatteryFull } from "lucide-react";

export function StatusBar() {
  const [time, setTime] = useState(() => formatTime(new Date()));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(formatTime(new Date()));
    }, 10_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed top-0 inset-x-0 z-[9999] flex items-center justify-between px-6 backdrop-blur-md"
      style={{
        height: 44,
        backgroundColor: "oklch(0.08 0.02 260 / 30%)",
      }}
    >
      {/* Left: Time */}
      <span className="font-mono text-xs font-semibold text-foreground/90">
        {time}
      </span>

      {/* Center: Dynamic Island pill */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-2 rounded-full bg-black"
        style={{ width: 120, height: 32, borderRadius: 16 }}
      />

      {/* Right: Status icons */}
      <div className="flex items-center gap-1.5">
        <Signal className="size-3.5 text-foreground/70" strokeWidth={2} />
        <Wifi className="size-3.5 text-foreground/70" strokeWidth={2} />
        <BatteryFull className="size-4 text-foreground/70" strokeWidth={2} />
      </div>
    </div>
  );
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
