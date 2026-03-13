"use client";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { KLSkyline } from "@/components/shared/kl-skyline";
import { SOCIAL_LINKS } from "@/lib/constants";
import { stats } from "@/data/stats";
import { partners } from "@/data/partners";

function HomeHero() {
  return (
    <div className="relative px-6 py-12 md:py-16 overflow-hidden">
      {/* KL Skyline as subtle background */}
      <div className="absolute bottom-0 left-0 right-0 opacity-[0.08] pointer-events-none">
        <KLSkyline className="w-full" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
          Solana &middot; Malaysia
        </p>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight mb-4">
          Where builders shape{" "}
          <span
            className="inline-block"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.82 0.18 165), oklch(0.60 0.22 303))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Solana&apos;s future
          </span>{" "}
          in Malaysia.
        </h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto leading-relaxed mb-6">
          Connect with developers, designers, and operators building the next
          wave of Web3 in Southeast Asia.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={SOCIAL_LINKS.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ size: "lg" }), "text-sm px-8")}
          >
            Join Community
          </a>
          <a
            href="#events"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "text-sm px-8 border-border text-foreground hover:bg-secondary",
            )}
          >
            Upcoming Events
          </a>
        </div>
      </div>
    </div>
  );
}

function HomePartners() {
  const partnerList = [...partners, ...partners];
  return (
    <div className="relative py-8 border-t border-border">
      <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground text-center mb-6">
        Ecosystem Partners
      </p>
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-card to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-card to-transparent pointer-events-none" />
        <div
          className="flex gap-8 sm:gap-14 animate-marquee whitespace-nowrap"
          style={{ "--marquee-speed": "40s" } as React.CSSProperties}
        >
          {partnerList.map((partner, i) => (
            <a
              key={`p-${i}`}
              href={partner.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground/40 hover:text-primary hover:scale-110 hover:drop-shadow-[0_0_8px_oklch(0.82_0.18_165/0.5)] transition-all duration-300 flex-shrink-0"
            >
              {partner.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function HomeStats() {
  return (
    <div className="border-t border-border">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 py-4 px-6">
        {stats.map((stat, i) => (
          <div
            key={stat.id}
            className={cn(
              "text-center relative",
              i < stats.length - 1 && "md:border-r md:border-border/50",
            )}
          >
            <AnimatedCounter
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              numberStyle={{ fontSize: "1.25rem", lineHeight: "1.2" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function HomeApp() {
  return (
    <div className="flex flex-col min-h-full">
      <HomeHero />
      <HomePartners />
      <HomeStats />
    </div>
  );
}
