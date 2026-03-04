"use client";

import { cn } from "@/lib/utils";
import Container from "@/components/layout/container";
import { SocialLinks } from "@/components/shared/social-links";
import { buttonVariants } from "@/components/ui/button";
import { SOCIAL_LINKS } from "@/lib/constants";

export function JoinCtaSection() {
  return (
    <section className="relative py-24 md:py-32 border-t border-border overflow-hidden">
      {/* Dual gradient orbs for atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[70vw] h-[50vw] max-w-[800px] max-h-[500px] rounded-full opacity-[0.12] blur-[100px]"
          style={{
            background:
              "radial-gradient(ellipse, oklch(0.45 0.14 165), transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/4 right-[10%] w-[30vw] h-[30vw] max-w-[350px] max-h-[350px] rounded-full opacity-[0.06] blur-[80px]"
          style={{
            background:
              "radial-gradient(circle, oklch(0.50 0.20 303), transparent 70%)",
          }}
        />
      </div>

      <Container className="relative">
        <div className="flex flex-col items-center text-center">
          <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-4">
            Get Involved
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Join Superteam Malaysia
          </h2>

          <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto mt-6">
            Be part of Malaysia&apos;s fastest-growing Solana community.
            Connect, collaborate, and build the future of Web3 together.
          </p>

          <div className="mt-10">
            <a
              href={SOCIAL_LINKS.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ size: "lg" }),
                "text-sm px-12 py-3"
              )}
            >
              Join Community
            </a>
          </div>

          <div className="mt-8">
            <SocialLinks size="md" />
          </div>
        </div>
      </Container>
    </section>
  );
}
