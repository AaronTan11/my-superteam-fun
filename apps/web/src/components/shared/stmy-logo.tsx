import { cn } from "@/lib/utils";

interface STMYLogoProps {
  size?: number;
  className?: string;
  variant?: "white" | "black";
}

export function STMYLogo({
  size = 32,
  className,
  variant = "white",
}: STMYLogoProps) {
  return (
    <img
      src={`/images/brand/logomark-${variant}.png`}
      alt="Superteam Malaysia logo"
      width={size}
      height={size}
      className={cn("shrink-0 object-contain", className)}
    />
  );
}
