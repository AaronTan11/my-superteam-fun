"use client";

import { Suspense } from "react";
import { Tweet } from "react-tweet";

const TWEET_IDS = [
  "1755818270022889805", // Launch day
  "1829470110177955925", // Ecosystem Market Map
  "1815375677832708371", // Startup Village — 60 founders
  "1788192338147504161", // Startup Village intro
  "1776140876458119255", // Solana Hackfest crowd
  "2032084401878888734", // Network State pre-accelerator
  "1977576570253689290", // Colosseum workshop — Pinocchio
  "1802557979352506652", // Melaka trip
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

export function TestimonialsApp() {
  return (
    <div className="p-6">
      <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-2">
        Community
      </p>
      <h2 className="font-display text-2xl font-bold mb-6">Wall of Love</h2>
      <div className="columns-1 sm:columns-2 gap-4 space-y-4 [&_article]:!m-0 [&_.react-tweet-theme]:!m-0 [&_article]:break-inside-avoid">
        {TWEET_IDS.map((id) => (
          <div key={id} className="break-inside-avoid mb-4">
            <Suspense fallback={<TweetFallback />}>
              <Tweet id={id} />
            </Suspense>
          </div>
        ))}
      </div>
    </div>
  );
}
