"use client";

import { useQuery } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";
import { Users, Calendar, Handshake, MessageSquareQuote, HelpCircle, BarChart3 } from "lucide-react";
import Link from "next/link";

const cards = [
  { label: "Members", icon: Users, href: "/admin/members", key: "members" as const },
  { label: "Events", icon: Calendar, href: "/admin/events", key: "events" as const },
  { label: "Partners", icon: Handshake, href: "/admin/partners", key: "partners" as const },
  { label: "Testimonials", icon: MessageSquareQuote, href: "/admin/testimonials", key: "testimonials" as const },
  { label: "FAQ", icon: HelpCircle, href: "/admin/faq", key: "faq" as const },
  { label: "Stats", icon: BarChart3, href: "/admin/stats", key: "stats" as const },
];

export default function AdminDashboard() {
  const members = useQuery(trpc.members.list.queryOptions());
  const events = useQuery(trpc.events.list.queryOptions());
  const partners = useQuery(trpc.partners.list.queryOptions());
  const testimonials = useQuery(trpc.testimonials.list.queryOptions());
  const faq = useQuery(trpc.faq.list.queryOptions());
  const stats = useQuery(trpc.stats.list.queryOptions());

  const counts: Record<string, number | undefined> = {
    members: members.data?.length,
    events: events.data?.length,
    partners: partners.data?.length,
    testimonials: testimonials.data?.length,
    faq: faq.data?.length,
    stats: stats.data?.length,
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">Manage your Superteam Malaysia content.</p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.key}
            href={card.href as "/admin"}
            className="group rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/30"
          >
            <div className="flex items-center justify-between">
              <card.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
              <span className="font-display text-2xl font-bold">
                {counts[card.key] ?? "—"}
              </span>
            </div>
            <p className="mt-2 text-sm font-medium">{card.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
