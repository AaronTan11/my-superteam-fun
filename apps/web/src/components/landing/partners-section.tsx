"use client";

import Container from "@/components/layout/container";
import { partners } from "@/data/partners";

export function PartnersSection() {
  const partnerList = [...partners, ...partners];

  return (
    <section className="relative py-12 md:py-16 border-t border-border">
      <Container>
        <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground text-center mb-8">
          Ecosystem Partners
        </p>
      </Container>

      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

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
              className="font-display text-base md:text-lg font-semibold uppercase tracking-[0.12em] text-muted-foreground/40 hover:text-primary hover:scale-105 transition-all duration-300 flex-shrink-0"
            >
              {partner.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
