"use client";

import { useEffect, useRef, useState } from "react";
import {
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  label: string;
  className?: string;
  numberStyle?: React.CSSProperties;
}

export function AnimatedCounter({
  value,
  suffix = "",
  label,
  className,
  numberStyle,
}: AnimatedCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "50px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 50, damping: 30 });
  const display = useTransform(spring, (v) => Math.round(v));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return display.on("change", (v) => setDisplayValue(v));
  }, [display]);

  return (
    <div ref={ref} className={cn("text-center", className)}>
      <div
        className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground"
        style={numberStyle}
      >
        {displayValue}
        {suffix}
      </div>
      <div className="text-muted-foreground text-sm md:text-base mt-2">
        {label}
      </div>
    </div>
  );
}
