"use client";

import { motion } from "motion/react";
import Container from "@/components/layout/container";
import { MemberAvatar } from "@/components/shared/member-avatar";
import { testimonials } from "@/data/testimonials";

export function WallOfLove() {
  return (
    <section className="relative py-16 md:py-24" style={{ background: "oklch(0.10 0.02 260)" }}>
      <Container className="relative">
        <div className="mb-12">
          <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-3">
            Testimonials
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            What Builders Say
          </h2>
        </div>

        <motion.div
          className="columns-1 md:columns-2 lg:columns-3 gap-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
        >
          {testimonials.slice(0, 6).map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="break-inside-avoid mb-4"
              variants={{
                hidden: { opacity: 0, y: 12 },
                show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
              }}
            >
              <div className="group/card relative rounded-xl border border-border bg-card p-6 hover:border-border-visible hover:bg-surface-card-hover transition-all duration-300 overflow-hidden">
                {/* Top accent line — hidden by default, reveals on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, oklch(0.82 0.18 165 / 40%) 30%, oklch(0.55 0.24 303 / 40%) 70%, transparent)",
                  }}
                  aria-hidden="true"
                />

                {/* Large decorative quotation mark */}
                <span
                  className="absolute top-3 right-4 font-display text-6xl leading-none text-primary/[0.06] select-none pointer-events-none"
                  aria-hidden="true"
                >
                  &rdquo;
                </span>

                <p className="relative text-foreground/85 text-sm leading-relaxed mb-5">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                <div className="relative flex items-center gap-3">
                  <MemberAvatar name={testimonial.author} size="sm" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {testimonial.author}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
