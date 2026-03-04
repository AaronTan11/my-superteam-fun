import { cn } from "@/lib/utils";

interface SkillBadgeProps {
  skill: string;
  className?: string;
}

const skillColorMap: Record<string, string> = {
  Rust: "text-sol-green border-sol-green/30 bg-sol-green/10",
  Backend: "text-sol-green border-sol-green/30 bg-sol-green/10",
  Frontend: "text-sol-purple border-sol-purple/30 bg-sol-purple/10",
  Design: "text-coral border-coral/30 bg-coral/10",
  Content: "text-warm border-warm/30 bg-warm/10",
  Growth: "text-warm border-warm/30 bg-warm/10",
  Product: "text-sol-green-deep border-sol-green-deep/30 bg-sol-green-deep/10",
  Community: "text-sol-purple-light border-sol-purple-light/30 bg-sol-purple-light/10",
  "Core Team": "text-sol-green border-sol-green/30 bg-sol-green/10",
};

const defaultColor = "text-muted-foreground border-muted/30 bg-muted/10";

export function SkillBadge({ skill, className }: SkillBadgeProps) {
  const colorClasses = skillColorMap[skill] ?? defaultColor;

  return (
    <span
      className={cn(
        "text-xs px-2.5 py-0.5 rounded-full border inline-block",
        colorClasses,
        className
      )}
    >
      {skill}
    </span>
  );
}
