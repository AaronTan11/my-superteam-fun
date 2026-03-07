"use client";

import { events } from "@/data/events";
import { Calendar, MapPin, ExternalLink } from "lucide-react";

export function EventsApp() {
  const upcoming = events.filter((e) => !e.isPast);
  const past = events.filter((e) => e.isPast);

  return (
    <div className="p-6">
      <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-2">
        Schedule
      </p>
      <h2 className="font-display text-2xl font-bold mb-6">Events</h2>

      {upcoming.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xs font-mono uppercase tracking-widest text-primary mb-3">
            Upcoming
          </h3>
          <div className="space-y-3">
            {upcoming.map((event) => (
              <a
                key={event.id}
                href={event.lumaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 rounded-lg border border-border hover:border-primary/30 transition-colors group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-display text-sm font-semibold group-hover:text-primary transition-colors">
                      {event.title}
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="size-3" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="size-3" />
                        {event.location}
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="size-3.5 text-muted-foreground/50 shrink-0 mt-1" />
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {past.length > 0 && (
        <div>
          <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
            Past
          </h3>
          <div className="space-y-2">
            {past.map((event) => (
              <div
                key={event.id}
                className="p-3 rounded-lg border border-border/50 opacity-60"
              >
                <p className="text-sm font-medium">{event.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {event.date} · {event.location}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
