import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { GlassCard } from "./glass-card";

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  description?: string;
  lumaUrl?: string;
  imageUrl?: string;
  className?: string;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function EventCard({
  title,
  date,
  location,
  description,
  lumaUrl,
  imageUrl,
  className,
}: EventCardProps) {
  return (
    <GlassCard className={cn("overflow-hidden", className)}>
      {imageUrl ? (
        <div className="h-40 rounded-t-2xl overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="h-40 rounded-t-2xl bg-gradient-to-br from-sol-purple-dim/20 to-sol-green/10" />
      )}
      <div className="p-5">
        <p className="text-primary text-sm font-medium mb-1">
          {formatDate(date)}
        </p>
        <h3 className="font-display font-semibold text-lg text-foreground mb-2">
          {title}
        </h3>
        <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-3">
          <MapPin className="size-3.5 shrink-0" />
          <span>{location}</span>
        </div>
        {description && (
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {description}
          </p>
        )}
        {lumaUrl && (
          <a
            href={lumaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary text-sm font-medium hover:text-primary/80 transition-colors"
          >
            View on Luma &rarr;
          </a>
        )}
      </div>
    </GlassCard>
  );
}
