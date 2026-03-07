"use client";

import { testimonials } from "@/data/testimonials";
import { MemberAvatar } from "@/components/shared/member-avatar";

export function TestimonialsApp() {
  return (
    <div className="p-6">
      <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-2">
        Community
      </p>
      <h2 className="font-display text-2xl font-bold mb-6">
        What Builders Say
      </h2>
      <div className="columns-1 sm:columns-2 gap-4 space-y-4">
        {testimonials.slice(0, 6).map((t) => (
          <div
            key={t.id}
            className="break-inside-avoid p-4 rounded-lg border border-border"
          >
            <p className="text-sm text-foreground/85 leading-relaxed mb-3">
              &ldquo;{t.text}&rdquo;
            </p>
            <div className="flex items-center gap-2">
              <MemberAvatar name={t.author} size="sm" />
              <div>
                <p className="text-xs font-semibold">{t.author}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
