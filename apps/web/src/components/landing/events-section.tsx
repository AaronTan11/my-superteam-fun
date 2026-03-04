"use client";

import { motion } from "motion/react";
import { MapPin, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Container from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { events } from "@/data/events";
import { LUMA_URL } from "@/lib/constants";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return {
    month: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    day: d.getDate(),
    full: d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  };
}

const upcomingEvents = events.filter((e) => !e.isPast);
const featuredEvent = upcomingEvents[0];
const timelineEvents = upcomingEvents.slice(1);

export function EventsSection() {
  return (
    <section id="events" className="relative py-16 md:py-24">
      <Container className="relative">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-3">
              Events
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Where We Gather
            </h2>
          </div>
          <a
            href={LUMA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 transition-colors text-sm font-medium font-mono shrink-0"
          >
            View All on Luma &rarr;
          </a>
        </div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          {/* Featured Event */}
          {featuredEvent && (
            <div className="lg:col-span-7">
              <div className="h-full overflow-hidden rounded-xl border border-border bg-card group hover:border-border-visible transition-colors relative">
                {/* Header area */}
                <div className="relative h-28 border-b border-border overflow-hidden bg-gradient-to-br from-primary/[0.08] via-sol-purple/[0.06] to-transparent">
                  <span className="absolute top-4 left-4 font-mono text-xs text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
                    NEXT EVENT
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <p className="font-mono text-sm text-muted-foreground mb-2">
                    {formatDate(featuredEvent.date).full}
                  </p>
                  <h3 className="font-display text-2xl md:text-3xl font-bold mb-3">
                    {featuredEvent.title}
                  </h3>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                    <MapPin className="size-4 shrink-0" />
                    <span>{featuredEvent.location}</span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {featuredEvent.description}
                  </p>
                  {featuredEvent.lumaUrl && (
                    <a
                      href={featuredEvent.lumaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        buttonVariants({ size: "lg" }),
                        "text-sm px-8"
                      )}
                    >
                      RSVP on Luma
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Timeline */}
          <div className="lg:col-span-5">
            <div className="mb-4">
              <h3 className="font-display text-lg font-semibold">Upcoming</h3>
            </div>
            <div className="relative flex flex-col">
              {timelineEvents.map((event, i) => {
                const date = formatDate(event.date);
                return (
                  <a
                    key={event.id}
                    href={event.lumaUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "group flex items-center gap-4 py-4 transition-colors relative",
                      i < timelineEvents.length - 1 &&
                        "border-b border-border",
                      "hover:bg-card/50 -mx-3 px-3 rounded-lg"
                    )}
                  >
                    {/* Date badge */}
                    <div className="flex flex-col items-center justify-center size-14 shrink-0 rounded-lg bg-card border border-border group-hover:border-primary/25 transition-colors relative z-10">
                      <span className="font-mono text-[10px] text-muted-foreground leading-none tracking-wider">
                        {date.month}
                      </span>
                      <span className="font-display text-xl font-bold leading-tight">
                        {date.day}
                      </span>
                    </div>

                    {/* Event info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-semibold text-sm group-hover:text-primary transition-colors truncate">
                        {event.title}
                      </p>
                      <div className="flex items-center gap-1.5 text-muted-foreground text-xs mt-1">
                        <MapPin className="size-3 shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>

                    {/* Arrow */}
                    <ArrowUpRight className="size-4 text-muted-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-primary transition-all shrink-0" />
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
