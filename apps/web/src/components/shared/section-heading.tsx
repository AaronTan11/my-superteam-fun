import { cn } from "@/lib/utils";
import { GradientText, type GradientVariant } from "./gradient-text";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  gradient?: GradientVariant;
}

export function SectionHeading({
  title,
  subtitle,
  className,
  gradient,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-12 md:mb-16 text-center", className)}>
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
        {gradient ? (
          <GradientText variant={gradient}>{title}</GradientText>
        ) : (
          title
        )}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
