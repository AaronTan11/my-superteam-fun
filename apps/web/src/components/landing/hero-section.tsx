"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Container from "@/components/layout/container";
import { KLSkyline } from "@/components/shared/kl-skyline";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { SOCIAL_LINKS } from "@/lib/constants";
import { stats } from "@/data/stats";
import { useDeviceTier } from "@/hooks/use-device-tier";

const HeroCanvas = dynamic(
  () => import("@/components/three/hero-canvas").then((m) => m.HeroCanvas),
  { ssr: false }
);

export function HeroSection() {
  const tier = useDeviceTier();
  const show3D = tier !== "low";

  return (
    <section className="relative h-screen min-h-[640px] max-h-[1200px] overflow-hidden">
      {/* 3D KL Skyline — fills entire hero as immersive background */}
      <div className="absolute inset-0">
        {show3D ? (
          <HeroCanvas className="w-full h-full" />
        ) : (
          <div className="absolute bottom-0 left-0 right-0 h-[60%]">
            <KLSkyline className="w-full h-full" />
          </div>
        )}
      </div>

      {/* Atmospheric gradient orbs — adds depth and color */}
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

      {/* Gradient overlay — dark at top for text, transparent in middle for buildings */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background: [
            "linear-gradient(to bottom,",
            "oklch(0.08 0.02 260 / 90%) 0%,",
            "oklch(0.08 0.02 260 / 65%) 10%,",
            "oklch(0.08 0.02 260 / 40%) 20%,",
            "oklch(0.08 0.02 260 / 18%) 35%,",
            "oklch(0.08 0.02 260 / 5%) 50%,",
            "oklch(0.08 0.02 260 / 3%) 65%,",
            "oklch(0.08 0.02 260 / 5%) 75%,",
            "oklch(0.08 0.02 260 / 30%) 88%,",
            "oklch(0.08 0.02 260 / 60%) 100%)",
          ].join(" "),
        }}
        aria-hidden="true"
      />

      {/* Horizon glow — cinematic light where skyline meets ground */}
      <div
        className="absolute left-0 right-0 z-[2] h-px pointer-events-none"
        style={{
          bottom: "28%",
          background:
            "linear-gradient(to right, transparent 10%, oklch(0.82 0.18 165 / 15%) 30%, oklch(0.55 0.24 303 / 15%) 70%, transparent 90%)",
          boxShadow:
            "0 0 40px 15px oklch(0.50 0.20 303 / 6%), 0 0 80px 30px oklch(0.60 0.15 165 / 4%)",
        }}
        aria-hidden="true"
      />

      {/* Perspective ground grid — sci-fi depth below skyline */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[35%] z-[1] pointer-events-none"
        style={{
          backgroundImage: [
            "linear-gradient(oklch(0.82 0.18 165 / 3%) 1px, transparent 1px)",
            "linear-gradient(90deg, oklch(0.82 0.18 165 / 3%) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "80px 80px",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.12) 50%, rgba(0,0,0,0.25) 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.12) 50%, rgba(0,0,0,0.25) 100%)",
          transform: "perspective(600px) rotateX(55deg)",
          transformOrigin: "bottom center",
        }}
        aria-hidden="true"
      />

      {/* Cinematic vignette — darker edges, focus center */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 45%, transparent 40%, oklch(0.04 0.02 260 / 55%) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Text readability vignette — subtle dark ellipse behind headline area */}
      <div
        className="absolute inset-0 pointer-events-none z-[3]"
        style={{
          background:
            "radial-gradient(ellipse 55% 30% at 50% 38%, oklch(0.06 0.02 260 / 50%) 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Content layer */}
      <div className="relative z-10 flex flex-col h-full">
        <Container className="flex-1 flex flex-col items-center pt-24 md:pt-32 lg:pt-36 pb-8">
          <motion.p
            className="font-mono text-[11px] tracking-[0.25em] text-primary/50 mb-5 uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Solana &middot; Malaysia
          </motion.p>

          <motion.h1
            className="font-display text-[2.75rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold max-w-5xl mx-auto leading-[1.05] tracking-tight text-center"
            style={{
              textShadow:
                "0 4px 60px oklch(0.04 0.02 260), 0 0 120px oklch(0.04 0.02 260 / 80%)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
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
          </motion.h1>

          <motion.p
            className="text-base md:text-lg text-muted-foreground max-w-lg mx-auto mt-6 leading-relaxed text-center"
            style={{
              textShadow: "0 2px 30px oklch(0.04 0.02 260)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            Connect with developers, designers, and operators building the next
            wave of Web3 in Southeast Asia.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 justify-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
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
          </motion.div>
        </Container>

        {/* Stats bar — pinned to hero bottom */}
        <motion.div
          className="border-t border-white/[0.08] backdrop-blur-md bg-background/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
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
    </section>
  );
}
