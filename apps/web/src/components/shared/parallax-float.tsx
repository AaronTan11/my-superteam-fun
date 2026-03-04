"use client";

import { useRef, useEffect, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "motion/react";
import { cn } from "@/lib/utils";

interface ParallaxFloatProps {
  children: ReactNode;
  className?: string;
  mode?: "scroll" | "mouse";
  speed?: number;
  range?: number;
}

function ScrollParallax({
  children,
  className,
  speed = 0.2,
}: {
  children: ReactNode;
  className?: string;
  speed: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * -100, speed * 100]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div ref={ref} style={{ y: smoothY }} className={cn(className)}>
      {children}
    </motion.div>
  );
}

function MouseParallax({
  children,
  className,
  range = 20,
}: {
  children: ReactNode;
  className?: string;
  range: number;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(y, { stiffness: 50, damping: 20 });

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      const offsetX = (e.clientX / window.innerWidth - 0.5) * range * 2;
      const offsetY = (e.clientY / window.innerHeight - 0.5) * range * 2;
      x.set(offsetX);
      y.set(offsetY);
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [range, x, y]);

  return (
    <motion.div
      style={{ x: smoothX, y: smoothY }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export function ParallaxFloat({
  children,
  className,
  mode = "scroll",
  speed = 0.2,
  range = 20,
}: ParallaxFloatProps) {
  if (mode === "mouse") {
    return (
      <MouseParallax className={className} range={range}>
        {children}
      </MouseParallax>
    );
  }

  return (
    <ScrollParallax className={className} speed={speed}>
      {children}
    </ScrollParallax>
  );
}
