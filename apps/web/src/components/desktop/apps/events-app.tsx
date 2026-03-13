"use client";

import { ExternalLink } from "lucide-react";

export function EventsApp() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-6 pb-0">
        <div>
          <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-2">
            Schedule
          </p>
          <h2 className="font-display text-2xl font-bold">Events</h2>
        </div>
        <a
          href="https://lu.ma/superteammy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-primary/80 transition-colors text-xs font-mono flex items-center gap-1"
        >
          View on Luma
          <ExternalLink className="size-3" />
        </a>
      </div>
      <div className="flex-1 p-6 pt-4">
        <iframe
          src="https://lu.ma/embed/calendar/cal-sZfiZHfUS5piycU/events"
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen
          aria-hidden="false"
          tabIndex={0}
          className="bg-white rounded-lg border border-border"
          style={{ minHeight: "400px" }}
        />
      </div>
    </div>
  );
}
