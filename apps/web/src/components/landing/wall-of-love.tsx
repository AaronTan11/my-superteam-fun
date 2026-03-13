"use client";

import { Suspense } from "react";
import { motion } from "motion/react";
import { Tweet } from "react-tweet";
import Container from "@/components/layout/container";

const TWEET_IDS = [
  "1755818270022889805", // Launch day
  "1829470110177955925", // Ecosystem Market Map
  "1815375677832708371", // Startup Village — 60 founders
  "1788192338147504161", // Startup Village intro
  "1776140876458119255", // Solana Hackfest crowd
  "2032084401878888734", // Network State pre-accelerator
];

function TweetFallback() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 animate-pulse">
      <div className="h-4 bg-muted rounded w-3/4 mb-3" />
      <div className="h-4 bg-muted rounded w-1/2 mb-3" />
      <div className="h-4 bg-muted rounded w-2/3" />
    </div>
  );
}

export function WallOfLove() {
  return (
    <section
      className="relative py-16 md:py-24"
      style={{ background: "oklch(0.10 0.02 260)" }}
    >
      <Container className="relative">
        <div className="mb-12">
          <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-3">
            Testimonials
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Wall of Love
          </h2>
        </div>

        <motion.div
          className="columns-1 md:columns-2 lg:columns-3 gap-4 [&_article]:!m-0 [&_.react-tweet-theme]:!m-0 [&_article]:break-inside-avoid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
        >
          {TWEET_IDS.map((id) => (
            <motion.div
              key={id}
              className="break-inside-avoid mb-4"
              variants={{
                hidden: { opacity: 0, y: 12 },
                show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
              }}
            >
              <Suspense fallback={<TweetFallback />}>
                <Tweet id={id} />
              </Suspense>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
