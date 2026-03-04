"use client";

import { type ElementType } from "react";
import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  mode?: "word" | "character";
  className?: string;
  delay?: number;
  staggerSpeed?: number;
  once?: boolean;
}

const containerVariants: Variants = {
  hidden: {},
  visible: (custom: { delay: number; staggerSpeed: number }) => ({
    transition: {
      staggerChildren: custom.staggerSpeed,
      delayChildren: custom.delay,
    },
  }),
};

const wordVariants: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 30,
    },
  },
};

export function TextReveal({
  text,
  as: Tag = "h2",
  mode = "word",
  className,
  delay = 0,
  staggerSpeed = 0.04,
  once = true,
}: TextRevealProps) {
  const MotionTag = motion.create(Tag as ElementType);
  const units = mode === "word" ? text.split(" ") : text.split("");

  return (
    <MotionTag
      className={cn(className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      custom={{ delay, staggerSpeed }}
    >
      {units.map((unit, i) => (
        <span key={`${unit}-${i}`} className="inline-block overflow-hidden">
          <motion.span className="inline-block" variants={wordVariants}>
            {unit}
          </motion.span>
          {mode === "word" && i < units.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </MotionTag>
  );
}
