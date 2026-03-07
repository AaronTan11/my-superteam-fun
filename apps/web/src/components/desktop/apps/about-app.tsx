"use client";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { SocialLinks } from "@/components/shared/social-links";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { SOCIAL_LINKS } from "@/lib/constants";
import { stats } from "@/data/stats";

export function AboutApp() {
  return (
    <div className="p-6 flex flex-col items-center text-center">
      <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-2">
        About
      </p>
      <h2 className="font-display text-2xl font-bold mb-3">
        Superteam Malaysia
      </h2>
      <p className="text-sm text-muted-foreground max-w-sm leading-relaxed mb-6">
        Malaysia&apos;s home for Solana builders. Connect, collaborate, and grow
        with developers, designers, and operators building the next wave of Web3
        in Southeast Asia.
      </p>

      <a
        href={SOCIAL_LINKS.telegram}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(buttonVariants({ size: "lg" }), "text-sm px-8 mb-6")}
      >
        Join Community
      </a>

      <SocialLinks className="mb-8" />

      <div className="grid grid-cols-2 gap-4 w-full border-t border-border pt-6">
        {stats.slice(0, 4).map((stat) => (
          <div key={stat.id} className="text-center">
            <AnimatedCounter
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              numberStyle={{ fontSize: "1.1rem", lineHeight: "1.2" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
