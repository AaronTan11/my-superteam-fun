import { cn } from "@/lib/utils";

interface STMYLogoProps {
  size?: number;
  className?: string;
}

export function STMYLogo({ size = 32, className }: STMYLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-label="Superteam Malaysia logo"
    >
      {/* Navy rounded square background */}
      <rect width="64" height="64" rx="14" fill="#1a1a3e" />

      {/* "s" letterform — left side */}
      <path
        d="M12 22h14c2.2 0 4 1.8 4 4v2c0 2.2-1.8 4-4 4H16c-2.2 0-4 1.8-4 4v2c0 2.2 1.8 4 4 4h14"
        stroke="white"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* "t" letterform — right side */}
      <path
        d="M38 18v24M34 26h12"
        stroke="white"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Malaysian flag circle — bottom right */}
      <circle cx="52" cy="52" r="10" fill="#003DA5" />
      {/* Red stripes */}
      <rect x="42" y="48" width="20" height="2.5" fill="#CC0001" rx="0" clipPath="url(#flag-clip)" />
      <rect x="42" y="53" width="20" height="2.5" fill="#CC0001" rx="0" clipPath="url(#flag-clip)" />
      {/* White stripes */}
      <rect x="42" y="50.5" width="20" height="2.5" fill="white" rx="0" clipPath="url(#flag-clip)" />
      <rect x="42" y="45.5" width="20" height="2.5" fill="white" rx="0" clipPath="url(#flag-clip)" />
      <rect x="42" y="55.5" width="20" height="2.5" fill="white" rx="0" clipPath="url(#flag-clip)" />
      {/* Blue canton */}
      <rect x="42" y="42" width="10" height="8" fill="#003DA5" clipPath="url(#flag-clip)" />
      {/* Crescent + star (simplified) */}
      <circle cx="46.5" cy="46" r="2.5" fill="#FCD116" clipPath="url(#flag-clip)" />
      <circle cx="47.2" cy="46" r="2" fill="#003DA5" clipPath="url(#flag-clip)" />
      <polygon points="49.5,45 50,46 51,46 50.2,46.6 50.5,47.5 49.5,46.9 48.5,47.5 48.8,46.6 48,46 49,46" fill="#FCD116" clipPath="url(#flag-clip)" />

      <defs>
        <clipPath id="flag-clip">
          <circle cx="52" cy="52" r="10" />
        </clipPath>
      </defs>
    </svg>
  );
}
