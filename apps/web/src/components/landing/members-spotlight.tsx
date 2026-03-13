"use client";

import Link from "next/link";
import { motion } from "motion/react";
import Container from "@/components/layout/container";
import { MemberAvatar } from "@/components/shared/member-avatar";
import { members } from "@/data/members";

const spotlightMembers = members.filter((m) => m.isFeatured);

export function MembersSpotlight() {
  return (
    <section className="relative py-16 md:py-24">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Heading */}
          <div className="lg:col-span-4">
            <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-3">
              Community
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
              Our members are{" "}
              <span className="text-primary">builders</span>, founders, and
              influential creators.
            </h2>
            <p className="text-muted-foreground text-sm mt-4 leading-relaxed">
              A curated network of developers, designers, and operators driving
              Solana adoption across Malaysia.
            </p>
            <div className="mt-6">
              <Link
                href="/members"
                className="text-sm text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1.5 group/link font-medium"
              >
                See All Members
                <span className="group-hover/link:translate-x-0.5 transition-transform">
                  &rarr;
                </span>
              </Link>
            </div>
          </div>

          {/* Right: Member cards */}
          <motion.div
            className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.08 } },
            }}
          >
            {spotlightMembers.map((member) => (
              <motion.div
                key={member.id}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.35 },
                  },
                }}
              >
                <div className="group/card relative rounded-xl border border-border bg-card p-4 hover:border-border-visible hover:bg-surface-card-hover transition-all duration-300 group cursor-default overflow-hidden">
                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"
                    style={{
                      background:
                        "linear-gradient(to right, oklch(0.82 0.18 165 / 40%), oklch(0.55 0.24 303 / 40%) 70%, transparent)",
                    }}
                    aria-hidden="true"
                  />
                  <div className="flex items-center gap-3">
                    <MemberAvatar name={member.name} photo={member.photo || undefined} size="md" />
                    <div className="min-w-0">
                      <h3 className="font-display font-semibold text-sm group-hover:text-primary transition-colors truncate">
                        {member.name}
                      </h3>
                      <p className="text-muted-foreground text-xs mt-0.5 truncate">
                        {member.title}
                      </p>
                      {member.company && (
                        <p className="text-muted-foreground/60 text-[11px] truncate">
                          {member.company}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
