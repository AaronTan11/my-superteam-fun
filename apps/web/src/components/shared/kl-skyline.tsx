"use client";

import { motion } from "motion/react";

export function KLSkyline({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 320"
      preserveAspectRatio="xMidYMax meet"
      className={className}
      width="100%"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Blue → Teal gradient for main skyline */}
        <linearGradient id="skyline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--color-sol-purple)" />
          <stop offset="50%" stopColor="var(--color-sol-green)" />
          <stop offset="100%" stopColor="var(--color-sol-green-deep)" />
        </linearGradient>

        {/* Glow filter for key buildings */}
        <filter id="skyline-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Stronger glow for Petronas */}
        <filter id="petronas-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Ground reflection gradient */}
        <linearGradient id="ground-glow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--color-sol-purple)" stopOpacity="0.12" />
          <stop offset="100%" stopColor="var(--color-sol-purple)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* ── Ground glow reflection ── */}
      <rect x="0" y="295" width="1200" height="25" fill="url(#ground-glow)" />

      {/* ── Far-left buildings ── */}
      <path
        d="M30 300 V240 H60 V300"
        stroke="url(#skyline-gradient)"
        strokeWidth="1"
        fill="url(#skyline-gradient)"
        fillOpacity="0.04"
        opacity="0.4"
      />
      <path
        d="M65 300 V220 H100 V300"
        stroke="url(#skyline-gradient)"
        strokeWidth="1"
        fill="url(#skyline-gradient)"
        fillOpacity="0.05"
        opacity="0.4"
      />
      <path
        d="M105 300 V250 H130 V300"
        stroke="url(#skyline-gradient)"
        strokeWidth="1"
        fill="url(#skyline-gradient)"
        fillOpacity="0.03"
        opacity="0.3"
      />
      <path
        d="M135 300 V230 H170 V300"
        stroke="url(#skyline-gradient)"
        strokeWidth="1"
        fill="url(#skyline-gradient)"
        fillOpacity="0.04"
        opacity="0.35"
      />

      {/* ── Mosque dome (left area) ── */}
      <path
        d="M185 300 V240 H230 V300 M195 240 Q207.5 215 220 240"
        stroke="url(#skyline-gradient)"
        strokeWidth="1"
        opacity="0.5"
      />
      {/* Minaret */}
      <path
        d="M237 300 V225 L240 218 L243 225 V300"
        stroke="url(#skyline-gradient)"
        strokeWidth="1"
        opacity="0.45"
      />

      {/* ── Mid-rise cluster left ── */}
      <path
        d="M255 300 V210 H290 V300"
        stroke="url(#skyline-gradient)"
        strokeWidth="1"
        fill="url(#skyline-gradient)"
        fillOpacity="0.04"
        opacity="0.35"
      />
      <path
        d="M295 300 V235 H320 V300"
        stroke="url(#skyline-gradient)"
        strokeWidth="1"
        fill="url(#skyline-gradient)"
        fillOpacity="0.03"
        opacity="0.3"
      />

      {/* ── KL Tower (tall needle/antenna) ── */}
      <motion.path
        d="M360 300 V180 H380 V300 M362 180 H378 L375 165 H365 L362 150 H378 M370 150 V100 L371 85 L370 70 M369 85 H371"
        stroke="url(#skyline-gradient)"
        strokeWidth="1.5"
        filter="url(#skyline-glow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
      />
      {/* KL Tower fill */}
      <path
        d="M360 300 V180 H380 V300 Z"
        fill="url(#skyline-gradient)"
        fillOpacity="0.06"
      />

      {/* ── Buildings between KL Tower and Petronas ── */}
      <path
        d="M400 300 V220 H430 V300"
        stroke="url(#skyline-gradient)"
        strokeWidth="1"
        fill="url(#skyline-gradient)"
        fillOpacity="0.04"
        opacity="0.35"
      />
      <path
        d="M435 300 V200 H465 V300"
        stroke="url(#skyline-gradient)"
        strokeWidth="1"
        fill="url(#skyline-gradient)"
        fillOpacity="0.05"
        opacity="0.4"
      />
      <path
        d="M470 300 V240 H495 V300"
        stroke="url(#skyline-gradient)"
        strokeWidth="1"
        fill="url(#skyline-gradient)"
        fillOpacity="0.03"
        opacity="0.3"
      />

      {/* ── Petronas Twin Towers (center, tallest, iconic) ── */}
      <motion.path
        d={[
          "M520 300 V160",
          "H525 V140",
          "H530 V125",
          "H535 V115",
          "L540 50",
          "L545 115",
          "H550 V125",
          "H555 V140",
          "H560 V160",
          "V300",
          "M560 195 H620",
          "M620 300 V160",
          "H625 V140",
          "H630 V125",
          "H635 V115",
          "L640 50",
          "L645 115",
          "H650 V125",
          "H655 V140",
          "H660 V160",
          "V300",
          "M560 190 H620",
          "M522 200 H558",
          "M525 170 H555",
          "M622 200 H658",
          "M625 170 H655",
        ].join(" ")}
        stroke="url(#skyline-gradient)"
        strokeWidth="2"
        filter="url(#petronas-glow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
      />
      {/* Petronas fill — left tower */}
      <path
        d="M520 300 V160 H525 V140 H530 V125 H535 V115 L540 50 L545 115 H550 V125 H555 V140 H560 V160 V300 Z"
        fill="url(#skyline-gradient)"
        fillOpacity="0.08"
      />
      {/* Petronas fill — right tower */}
      <path
        d="M620 300 V160 H625 V140 H630 V125 H635 V115 L640 50 L645 115 H650 V125 H655 V140 H660 V160 V300 Z"
        fill="url(#skyline-gradient)"
        fillOpacity="0.08"
      />

      {/* ── Window lights on Petronas (animated dots) ── */}
      {[
        { cx: 535, cy: 160, delay: 0 },
        { cx: 545, cy: 175, delay: 1.2 },
        { cx: 530, cy: 190, delay: 2.5 },
        { cx: 550, cy: 210, delay: 0.8 },
        { cx: 540, cy: 240, delay: 3.0 },
        { cx: 535, cy: 265, delay: 1.8 },
        { cx: 635, cy: 160, delay: 0.5 },
        { cx: 645, cy: 175, delay: 2.0 },
        { cx: 630, cy: 195, delay: 1.5 },
        { cx: 650, cy: 215, delay: 3.2 },
        { cx: 640, cy: 245, delay: 0.3 },
        { cx: 645, cy: 270, delay: 2.2 },
      ].map((light, i) => (
        <motion.circle
          key={`window-${i}`}
          cx={light.cx}
          cy={light.cy}
          r="1"
          fill="var(--color-sol-purple-light)"
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: light.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* ── Buildings between Petronas and Merdeka 118 ── */}
      <path
        d="M680 300 V210 H710 V300"
        stroke="url(#skyline-gradient)"
        strokeWidth="1"
        fill="url(#skyline-gradient)"
        fillOpacity="0.04"
        opacity="0.35"
      />
      <path
        d="M715 300 V240 H740 V300"
        stroke="url(#skyline-gradient)"
        strokeWidth="1"
        fill="url(#skyline-gradient)"
        fillOpacity="0.03"
        opacity="0.3"
      />
      <path
        d="M745 300 V195 H775 V300"
        stroke="url(#skyline-gradient)"
        strokeWidth="1"
        fill="url(#skyline-gradient)"
        fillOpacity="0.05"
        opacity="0.35"
      />

      {/* ── Merdeka 118 (very tall single tower, right side) ── */}
      <motion.path
        d="M810 300 V110 H815 V85 L822.5 40 L830 85 H835 V110 V300 M812 180 H833 M812 150 H833 M812 220 H833"
        stroke="url(#skyline-gradient)"
        strokeWidth="1.5"
        filter="url(#skyline-glow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.7 }}
      />
      {/* Merdeka 118 fill */}
      <path
        d="M810 300 V110 H815 V85 L822.5 40 L830 85 H835 V110 V300 Z"
        fill="url(#skyline-gradient)"
        fillOpacity="0.07"
      />
      {/* Merdeka window lights */}
      {[
        { cx: 822, cy: 120, delay: 1.0 },
        { cx: 822, cy: 160, delay: 2.5 },
        { cx: 822, cy: 200, delay: 0.7 },
        { cx: 822, cy: 250, delay: 1.8 },
      ].map((light, i) => (
        <motion.circle
          key={`merdeka-${i}`}
          cx={light.cx}
          cy={light.cy}
          r="0.8"
          fill="var(--color-sol-purple-light)"
          animate={{ opacity: [0.15, 0.7, 0.15] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: light.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* ── Right-side building cluster ── */}
      <motion.path
        d={[
          "M860 300 V230 H890 V300",
          "M895 300 V210 H925 V300",
          "M930 300 V250 H955 V300",
          "M960 300 V225 H990 V300",
          "M995 300 V245 H1020 V300",
          "M1025 300 V260 H1055 V300",
          "M1060 300 V235 H1090 V300",
          "M1095 300 V255 H1120 V300",
          "M1125 300 V270 H1155 V300",
          "M1160 300 V250 H1185 V300",
        ].join(" ")}
        stroke="url(#skyline-gradient)"
        strokeWidth="1"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.35 }}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.9 }}
      />
      {/* Right cluster fills */}
      {[
        "M860 300 V230 H890 V300 Z",
        "M895 300 V210 H925 V300 Z",
        "M960 300 V225 H990 V300 Z",
        "M1060 300 V235 H1090 V300 Z",
      ].map((d, i) => (
        <path
          key={`fill-${i}`}
          d={d}
          fill="url(#skyline-gradient)"
          fillOpacity="0.03"
        />
      ))}

      {/* ── Scattered window lights on right cluster ── */}
      {[
        { cx: 875, cy: 260, delay: 0.5 },
        { cx: 910, cy: 240, delay: 2.0 },
        { cx: 975, cy: 255, delay: 1.3 },
        { cx: 1075, cy: 260, delay: 2.8 },
      ].map((light, i) => (
        <motion.circle
          key={`right-${i}`}
          cx={light.cx}
          cy={light.cy}
          r="0.7"
          fill="var(--color-sol-green)"
          animate={{ opacity: [0.1, 0.6, 0.1] }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            delay: light.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  );
}
