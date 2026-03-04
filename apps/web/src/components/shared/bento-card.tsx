"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  span?: "1" | "2";
  featured?: boolean;
}

export function BentoCard({
  children,
  className,
  span = "1",
  featured = false,
}: BentoCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl border border-border bg-card transition-colors duration-300",
        "hover:border-border-visible",
        span === "2" && "md:col-span-2",
        featured && "bg-card border-border-visible",
        className
      )}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}
