import { type ReactNode, type ElementType } from "react";
import { cn } from "@/lib/utils";

export type GradientVariant = "sol" | "green" | "warm" | "cool" | "malaysia";

interface GradientTextProps {
  children: ReactNode;
  variant: GradientVariant;
  className?: string;
  as?: ElementType;
}

const gradientMap: Record<GradientVariant, string> = {
  sol: "bg-gradient-to-r from-sol-purple to-sol-green",
  green: "bg-gradient-to-r from-sol-green to-sol-green-light",
  warm: "bg-gradient-to-r from-warm to-coral",
  cool: "bg-gradient-to-r from-sol-green-deep to-sol-green",
  malaysia: "bg-gradient-to-r from-sol-purple via-coral to-warm",
};

export function GradientText({
  children,
  variant,
  className,
  as: Component = "span",
}: GradientTextProps) {
  const Tag = Component as "span";
  return (
    <Tag
      className={cn(
        "bg-clip-text text-transparent",
        gradientMap[variant],
        className
      )}
    >
      {children}
    </Tag>
  );
}
