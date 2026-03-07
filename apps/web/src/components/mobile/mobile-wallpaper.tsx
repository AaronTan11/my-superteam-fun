"use client";

import { KLSkyline } from "@/components/shared/kl-skyline";

export function MobileWallpaper() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      {/* Base gradient — portrait-tuned sky */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(170deg, oklch(0.08 0.03 280) 0%, oklch(0.10 0.04 270) 30%, oklch(0.12 0.05 250) 60%, oklch(0.15 0.06 200) 100%)",
        }}
      />

      {/* Aurora glow — sol-purple (left) */}
      <div
        className="absolute inset-0 animate-aurora-drift"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 30% 80%, oklch(0.28 0.18 303 / 35%), transparent 70%)",
        }}
      />

      {/* Aurora glow — sol-green (right) */}
      <div
        className="absolute inset-0 animate-aurora-drift-reverse"
        style={{
          background:
            "radial-gradient(ellipse 75% 35% at 70% 75%, oklch(0.30 0.14 165 / 30%), transparent 70%)",
        }}
      />

      {/* KL Skyline at bottom */}
      <div className="absolute bottom-0 left-0 right-0 opacity-[0.35]">
        <KLSkyline className="w-full" />
      </div>

      {/* Ground glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24"
        style={{
          background:
            "linear-gradient(to top, oklch(0.25 0.08 165 / 20%) 0%, oklch(0.20 0.06 75 / 10%) 40%, transparent 100%)",
        }}
      />
    </div>
  );
}
