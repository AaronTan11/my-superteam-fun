import { cn } from "@/lib/utils";
import { SOCIAL_LINKS } from "@/lib/constants";

type SocialSize = "sm" | "md";

interface SocialLinksProps {
  className?: string;
  size?: SocialSize;
}

const sizeConfig: Record<SocialSize, { icon: string; gap: string }> = {
  sm: { icon: "size-4", gap: "gap-3" },
  md: { icon: "size-5", gap: "gap-4" },
};

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm4.962 8.138c-.182 1.898-1.07 5.622-1.513 7.467-.188.78-.557 1.041-.914 1.067-.777.054-1.367-.513-2.12-1.006-.177-.116-3.168-2.09-3.605-2.436-.328-.26-.738-.557-.154-1.091.143-.131 2.652-2.588 3.43-3.37.23-.232 0-.53-.272-.295-1.053.91-3.486 2.943-4.32 3.56-.318.234-.694.345-1.12.338-.472-.009-.843-.12-1.182-.239-.495-.171-.882-.305-.808-.71.03-.168.407-.34 1.13-.514 3.698-1.587 6.164-2.634 7.396-3.14 3.523-1.45 4.254-1.703 4.73-1.712.105-.002.34.024.492.147.128.103.163.242.18.34.017.1.037.327.02.505z" />
    </svg>
  );
}

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
    </svg>
  );
}

const socialItems = [
  { name: "Twitter", href: SOCIAL_LINKS.twitter, Icon: TwitterIcon },
  { name: "Telegram", href: SOCIAL_LINKS.telegram, Icon: TelegramIcon },
  { name: "Discord", href: SOCIAL_LINKS.discord, Icon: DiscordIcon },
] as const;

export function SocialLinks({ className, size = "md" }: SocialLinksProps) {
  const { icon, gap } = sizeConfig[size];

  return (
    <div className={cn("flex items-center", gap, className)}>
      {socialItems.map(({ name, href, Icon }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={name}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <Icon className={icon} />
        </a>
      ))}
    </div>
  );
}
