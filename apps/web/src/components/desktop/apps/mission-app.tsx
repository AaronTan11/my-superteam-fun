"use client";

import {
  Code2,
  Calendar,
  Coins,
  Briefcase,
  GraduationCap,
  Network,
} from "lucide-react";

const pillars = [
  {
    icon: Code2,
    title: "Builder Support",
    description:
      "Technical mentorship, code reviews, and resources for Solana developers at every skill level.",
  },
  {
    icon: Calendar,
    title: "Events & Meetups",
    description:
      "Regular hackathons, workshops, and community gatherings across Malaysia.",
  },
  {
    icon: Coins,
    title: "Grants & Bounties",
    description:
      "Funding opportunities for projects that grow the Solana ecosystem in Malaysia.",
  },
  {
    icon: Briefcase,
    title: "Jobs & Talent",
    description:
      "Connect talented builders with Solana projects and companies hiring in the region.",
  },
  {
    icon: GraduationCap,
    title: "Education",
    description:
      "Structured learning paths from Solana basics to advanced program development.",
  },
  {
    icon: Network,
    title: "Ecosystem Growth",
    description:
      "Partnerships with protocols, VCs, and ecosystem players to grow Solana in Malaysia.",
  },
];

export function MissionApp() {
  return (
    <div className="p-6">
      <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-2">
        Mission
      </p>
      <h2 className="font-display text-2xl font-bold mb-6">What We Do</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {pillars.map((pillar) => (
          <div
            key={pillar.title}
            className="p-4 rounded-lg border border-border hover:border-border-visible transition-colors"
          >
            <pillar.icon className="size-5 text-primary mb-2" />
            <h3 className="font-display text-sm font-semibold mb-1">
              {pillar.title}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {pillar.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
