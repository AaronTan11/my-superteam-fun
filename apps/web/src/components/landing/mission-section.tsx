"use client";

import { type LucideIcon, Users, Calendar, Wallet, Briefcase, GraduationCap, Globe } from "lucide-react";
import { motion } from "motion/react";
import Container from "@/components/layout/container";

interface Pillar {
  title: string;
  description: string;
  icon: LucideIcon;
  span?: "1" | "2";
  className?: string;
}

const pillars: Pillar[] = [
  {
    title: "Builder Support",
    description:
      "Mentorship, technical guidance, and hands-on support for developers building on Solana. We connect you with ecosystem experts and provide the resources you need to ship.",
    icon: Users,
    span: "2",
  },
  {
    title: "Events & Hackathons",
    description:
      "Regular meetups, workshops, hackathons, and demo days across Malaysia.",
    icon: Calendar,
  },
  {
    title: "Grants & Funding",
    description:
      "Access to Solana ecosystem grants and funding opportunities for promising projects.",
    icon: Wallet,
  },
  {
    title: "Jobs & Bounties",
    description:
      "Paid bounties and job opportunities with top Solana projects worldwide.",
    icon: Briefcase,
  },
  {
    title: "Education",
    description:
      "Workshops, bootcamps, and resources to skill up in blockchain development. From Rust fundamentals to advanced Solana program architecture.",
    icon: GraduationCap,
    className: "md:row-span-2",
  },
  {
    title: "Ecosystem",
    description:
      "Connections to the global Superteam network and Solana ecosystem partners. Tap into a worldwide community of builders, investors, and protocols.",
    icon: Globe,
    span: "2",
  },
];

export function MissionSection() {
  return (
    <section id="mission" className="relative py-16 md:py-24" style={{ background: "oklch(0.10 0.02 260)" }}>
      <Container>
        <div className="mb-12">
          <p className="font-mono text-xs text-muted-foreground mb-3 tracking-widest uppercase">
            What We Do
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Empowering Malaysia&apos;s Solana Ecosystem
          </h2>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[minmax(180px,auto)]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.08 } },
          }}
        >
          {pillars.map((pillar) => (
            <motion.div
              key={pillar.title}
              className={`${pillar.className ?? ""} ${pillar.span === "2" ? "md:col-span-2" : ""}`}
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
              }}
            >
              <div
                className="group/card relative h-full rounded-xl border border-border bg-card p-6 hover:border-border-visible hover:bg-surface-card-hover transition-all duration-300 cursor-default overflow-hidden"
              >
                {/* Top accent line — reveals on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(to right, oklch(0.82 0.18 165 / 50%), oklch(0.55 0.24 303 / 30%) 80%, transparent)",
                  }}
                  aria-hidden="true"
                />
                <div className="size-9 rounded-lg flex items-center justify-center bg-primary/10 mb-4">
                  <pillar.icon className="size-4.5 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">
                  {pillar.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
