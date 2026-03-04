import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeStripProps {
  children: ReactNode;
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
}

export function MarqueeStrip({
  children,
  speed = 30,
  direction = "left",
  pauseOnHover = false,
  className,
}: MarqueeStripProps) {
  const animationClass =
    direction === "left" ? "animate-marquee" : "animate-marquee-reverse";

  return (
    <div
      className={cn(
        "overflow-hidden",
        pauseOnHover && "[&:hover_.animate-marquee]:[animation-play-state:paused] [&:hover_.animate-marquee-reverse]:[animation-play-state:paused]",
        className
      )}
    >
      <div
        className={cn("flex shrink-0", animationClass)}
        style={
          { "--marquee-speed": `${speed}s` } as React.CSSProperties
        }
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
