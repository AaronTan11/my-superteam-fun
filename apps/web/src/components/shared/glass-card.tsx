import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div
      className={cn(
        "bg-card border border-border rounded-xl transition-all duration-200",
        "hover:border-border-visible hover:bg-surface-card-hover",
        className
      )}
    >
      {children}
    </div>
  );
}
