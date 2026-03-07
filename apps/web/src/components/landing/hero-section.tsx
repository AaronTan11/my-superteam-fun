"use client";

import { useRef, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Container from "@/components/layout/container";
import { KLSkyline } from "@/components/shared/kl-skyline";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { SOCIAL_LINKS } from "@/lib/constants";
import { stats } from "@/data/stats";
import { useDeviceTier } from "@/hooks/use-device-tier";
import { scrollState } from "@/components/three/skyline-scene";

const HeroCanvas = dynamic(
  () => import("@/components/three/hero-canvas").then((m) => m.HeroCanvas),
  { ssr: false }
);

/* ─── Sky gradient: dusk → night ─── */
function skyGradient(t: number): string {
  // t: 0 = dusk, 1 = night
  const duskBottom = `oklch(0.22 0.08 40 / ${1 - t * 0.7})`;
  const duskMid = `oklch(0.16 0.06 280 / ${1 - t * 0.6})`;
  const nightBottom = `oklch(0.08 0.02 260 / ${0.3 + t * 0.7})`;
  const nightTop = `oklch(0.04 0.02 260 / ${0.5 + t * 0.5})`;

  if (t < 0.5) {
    // Dusk: warm at bottom → cool at top
    return `linear-gradient(to top, ${duskBottom} 0%, ${duskMid} 40%, oklch(0.10 0.04 260 / 80%) 70%, oklch(0.06 0.02 260 / 95%) 100%)`;
  }
  // Night: dark everywhere
  return `linear-gradient(to top, ${nightBottom} 0%, oklch(0.06 0.02 260 / 85%) 30%, ${nightTop} 100%)`;
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const tier = useDeviceTier();
  const show3D = tier !== "low";

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Pipe scroll progress to Three.js scene via shared state
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    scrollState.progress = v;
  });

  /* ─── Act 1: Label (visible immediately, fades 20–30%) ─── */
  const labelOpacity = useTransform(scrollYProgress, [0, 0.01, 0.20, 0.30], [0.8, 1, 1, 0]);

  /* ─── Act 2: Headline (visible 15–60%) ─── */
  const headlineOpacity = useTransform(scrollYProgress, [0.12, 0.22, 0.55, 0.65], [0, 1, 1, 0]);
  const headlineY = useTransform(scrollYProgress, [0.12, 0.25], [50, 0]);

  /* ─── Act 3: CTA (visible 55–100%) ─── */
  const subtitleOpacity = useTransform(scrollYProgress, [0.50, 0.62], [0, 1]);
  const ctaOpacity = useTransform(scrollYProgress, [0.55, 0.68], [0, 1]);
  const statsOpacity = useTransform(scrollYProgress, [0.68, 0.80], [0, 1]);

  /* ─── Sky gradient driven by scroll ─── */
  const skyRef = useRef<HTMLDivElement>(null);
  const updateSky = useCallback(() => {
    if (skyRef.current) {
      const tod = Math.min(1, scrollState.progress * 1.5);
      skyRef.current.style.background = skyGradient(tod);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", updateSky);
    updateSky();
    return unsubscribe;
  }, [scrollYProgress, updateSky]);

  /* ─── Overlay opacity: stronger in night, lighter in dusk ─── */
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.5, 0.7]);

  return (
    <section ref={sectionRef} className="relative h-[400vh]">
      {/* Sticky viewport — everything stays pinned while section scrolls */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Layer 0: Sky gradient — behind everything */}
        <div
          ref={skyRef}
          className="absolute inset-0"
          aria-hidden="true"
        />

        {/* Layer 1: 3D Canvas — transparent bg renders on top of sky */}
        <div className="absolute inset-0">
          {show3D ? (
            <HeroCanvas className="w-full h-full" />
          ) : (
            <div className="absolute bottom-0 left-0 right-0 h-[60%]">
              <KLSkyline className="w-full h-full" />
            </div>
          )}
        </div>

        {/* Atmospheric gradient orbs */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          aria-hidden="true"
        >
          <div
            className="absolute top-[8%] left-[5%] w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] rounded-full opacity-[0.08] blur-[120px]"
            style={{
              background:
                "radial-gradient(circle, oklch(0.55 0.24 303), transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-[15%] right-[5%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full opacity-[0.06] blur-[120px]"
            style={{
              background:
                "radial-gradient(circle, oklch(0.65 0.18 165), transparent 70%)",
            }}
          />
        </div>

        {/* Gradient overlay for text readability — intensifies as scene gets brighter */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-[2]"
          style={{
            opacity: overlayOpacity,
            background: [
              "linear-gradient(to bottom,",
              "oklch(0.08 0.02 260 / 95%) 0%,",
              "oklch(0.08 0.02 260 / 70%) 12%,",
              "oklch(0.08 0.02 260 / 35%) 25%,",
              "oklch(0.08 0.02 260 / 8%) 40%,",
              "oklch(0.08 0.02 260 / 2%) 55%,",
              "oklch(0.08 0.02 260 / 5%) 75%,",
              "oklch(0.08 0.02 260 / 30%) 90%,",
              "oklch(0.08 0.02 260 / 60%) 100%)",
            ].join(" "),
          }}
          aria-hidden="true"
        />

        {/* Cinematic vignette */}
        <div
          className="absolute inset-0 pointer-events-none z-[2]"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 50% 45%, transparent 40%, oklch(0.04 0.02 260 / 55%) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Text readability backdrop — larger, stronger */}
        <div
          className="absolute inset-0 pointer-events-none z-[3]"
          style={{
            background: [
              "radial-gradient(ellipse 70% 45% at 50% 42%, oklch(0.04 0.02 260 / 65%) 0%, transparent 100%)",
            ].join(""),
          }}
          aria-hidden="true"
        />

        {/* ═══ Content: 3-Act text transitions (stacked absolute) ═══ */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Text area — acts stacked absolutely so they overlap */}
          <div className="flex-1 relative">

            {/* Act 1: Location label — centered */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center px-4"
              style={{ opacity: labelOpacity }}
            >
              <p className="font-mono text-[11px] tracking-[0.25em] text-primary/50 uppercase">
                Solana &middot; Malaysia
              </p>
            </motion.div>

            {/* Act 2: Main headline — centered */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center px-4"
              style={{ opacity: headlineOpacity, y: headlineY }}
            >
              <h1
                className="font-display text-[2.75rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold max-w-5xl mx-auto leading-[1.05] tracking-tight text-center"
                style={{
                  textShadow:
                    "0 4px 60px oklch(0.04 0.02 260), 0 0 120px oklch(0.04 0.02 260 / 80%)",
                }}
              >
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
            </motion.div>

            {/* Act 3: Subtitle + CTA — centered */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center px-4 gap-6"
              style={{ opacity: ctaOpacity }}
            >
              <p
                className="text-base md:text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed text-center"
                style={{ textShadow: "0 2px 30px oklch(0.04 0.02 260)" }}
              >
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
                    "text-sm px-8 border-white/15 text-foreground hover:bg-white/5 backdrop-blur-sm"
                  )}
                >
                  Upcoming Events
                </a>
              </div>
            </motion.div>
          </div>

          {/* Stats bar — fades in at Act 3 */}
          <motion.div
            className="border-t border-white/[0.08] backdrop-blur-md bg-background/40"
            style={{ opacity: statsOpacity }}
          >
            <Container>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 py-4">
                {stats.map((stat, i) => (
                  <div
                    key={stat.id}
                    className={cn(
                      "text-center relative",
                      i < stats.length - 1 &&
                        "md:border-r md:border-white/[0.06]"
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
            </Container>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
