"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { STMYLogo } from "@/components/shared/stmy-logo";

type BootPhase = "logo" | "progress" | "fadeOut" | "done";

interface BootScreenProps {
  onBootComplete: () => void;
}

export function BootScreen({ onBootComplete }: BootScreenProps) {
  const [phase, setPhase] = useState<BootPhase>("logo");

  // Respect reduced motion
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      onBootComplete();
    }
  }, [onBootComplete]);

  // Phase 1 → Phase 2: logo → progress after 800ms
  useEffect(() => {
    if (phase === "logo") {
      const timer = setTimeout(() => setPhase("progress"), 800);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // Phase 2: wait for fonts + minimum time, then → fadeOut
  useEffect(() => {
    if (phase !== "progress") return;

    let fontReady = false;
    let minTimeElapsed = false;
    let cancelled = false;

    const tryAdvance = () => {
      if (!cancelled && fontReady && minTimeElapsed) {
        setPhase("fadeOut");
      }
    };

    const minTimer = setTimeout(() => {
      minTimeElapsed = true;
      tryAdvance();
    }, 1800);

    document.fonts.ready.then(() => {
      fontReady = true;
      tryAdvance();
    });

    return () => {
      cancelled = true;
      clearTimeout(minTimer);
    };
  }, [phase]);

  // Phase 3: fadeOut → done after 600ms
  useEffect(() => {
    if (phase === "fadeOut") {
      const timer = setTimeout(() => {
        setPhase("done");
        onBootComplete();
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [phase, onBootComplete]);

  if (phase === "done") return null;

  return (
    <motion.div
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
      style={{ backgroundColor: "oklch(0.04 0.02 260)" }}
      animate={{ opacity: phase === "fadeOut" ? 0 : 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* STMY Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          delay: 0.2,
        }}
      >
        <STMYLogo size={64} />
      </motion.div>

      {/* Progress bar — appears in phase 2+ */}
      <AnimatePresence>
        {(phase === "progress" || phase === "fadeOut") && (
          <motion.div
            className="mt-8 flex flex-col items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Track */}
            <div
              className="w-[200px] h-[3px] rounded-full overflow-hidden"
              style={{ backgroundColor: "oklch(1 0 0 / 10%)" }}
            >
              {/* Fill */}
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: "oklch(0.82 0.18 165)" }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration: 1.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              />
            </div>

            {/* Label */}
            <motion.p
              className="font-mono text-[10px] tracking-widest text-muted-foreground/40 uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Superteam Malaysia
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
