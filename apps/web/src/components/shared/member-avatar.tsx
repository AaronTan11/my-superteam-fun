"use client";

import { cn } from "@/lib/utils";

const PALETTE = [
  "oklch(0.45 0.22 303)", // solana purple (deep)
  "oklch(0.55 0.15 165)", // solana green (muted)
  "oklch(0.55 0.12 75)",  // warm amber
  "oklch(0.45 0.18 25)",  // coral
  "oklch(0.38 0.20 303)", // darker purple
  "oklch(0.50 0.14 165)", // teal-green
];

function hashName(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0]![0]!.toUpperCase();
  return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
}

interface MemberAvatarProps {
  name: string;
  photo?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-20 sm:size-24 md:size-28 text-xl md:text-2xl",
};

export function MemberAvatar({
  name,
  photo,
  size = "md",
  className,
}: MemberAvatarProps) {
  const initials = getInitials(name);
  const color = PALETTE[hashName(name) % PALETTE.length]!;

  if (photo) {
    return (
      <img
        src={photo}
        alt={name}
        className={cn(
          "rounded-full object-cover select-none shrink-0",
          sizeClasses[size],
          className
        )}
        style={{ backgroundColor: color }}
      />
    );
  }

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center font-display font-semibold text-white/90 select-none shrink-0",
        sizeClasses[size],
        className
      )}
      style={{ backgroundColor: color }}
      aria-label={name}
    >
      {initials}
    </div>
  );
}
