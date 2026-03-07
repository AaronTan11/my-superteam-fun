"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef, type ReactNode } from "react";
import {
  Globe,
  Users,
  Calendar,
  Briefcase,
  MessageSquare,
  HelpCircle,
  Info,
} from "lucide-react";
import { useDesktop } from "./desktop-context";
import { SOCIAL_LINKS } from "@/lib/constants";
import type { AppType } from "./types";
import type { LucideIcon } from "lucide-react";

/* ── Magnification constants ── */
const BASE_ICON_SIZE = 48;
const MAX_ICON_SIZE = 72;
const MAGNIFICATION_DISTANCE = 150;

/* ── App & link data ── */
const DOCK_APPS: { appType: AppType; label: string; icon: LucideIcon }[] = [
  { appType: "home", label: "Home", icon: Globe },
  { appType: "members", label: "Members", icon: Users },
  { appType: "events", label: "Events", icon: Calendar },
  { appType: "mission", label: "What We Do", icon: Briefcase },
  { appType: "testimonials", label: "Testimonials", icon: MessageSquare },
  { appType: "faq", label: "FAQ", icon: HelpCircle },
  { appType: "about", label: "About", icon: Info },
];

const EXTERNAL_LINKS = [
  { href: SOCIAL_LINKS.twitter, label: "X" },
  { href: SOCIAL_LINKS.telegram, label: "Telegram" },
  { href: SOCIAL_LINKS.discord, label: "Discord" },
];

/* ── Fish-eye magnification hook ── */
function useDockMagnification(
  mouseX: MotionValue<number>,
  ref: React.RefObject<HTMLDivElement | null>,
  isHoveringRef: React.RefObject<boolean>,
) {
  const size = useTransform(mouseX, (mx) => {
    if (!isHoveringRef.current || !ref.current) return BASE_ICON_SIZE;

    const rect = ref.current.getBoundingClientRect();
    const iconCenterX = rect.left + rect.width / 2;
    const distance = Math.abs(mx - iconCenterX);

    if (distance > MAGNIFICATION_DISTANCE) return BASE_ICON_SIZE;

    // Cosine falloff: 1.0 at center → 0.0 at MAGNIFICATION_DISTANCE
    const falloff = Math.cos(
      (distance / MAGNIFICATION_DISTANCE) * (Math.PI / 2),
    );
    return BASE_ICON_SIZE + (MAX_ICON_SIZE - BASE_ICON_SIZE) * falloff;
  });

  return useSpring(size, { stiffness: 170, damping: 26, mass: 0.1 });
}

/* ── Unified dock icon ── */
function DockIcon({
  mouseX,
  isHoveringRef,
  children,
  label,
  onClick,
  href,
  isActive,
  isOpen,
}: {
  mouseX: MotionValue<number>;
  isHoveringRef: React.RefObject<boolean>;
  children: ReactNode;
  label: string;
  onClick?: () => void;
  href?: string;
  isActive?: boolean;
  isOpen?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const springSize = useDockMagnification(mouseX, ref, isHoveringRef);

  // Scale the inner icon content proportionally
  const iconScale = useTransform(springSize, (s) => s / BASE_ICON_SIZE);

  const buttonClasses = `w-full h-full rounded-xl flex items-center justify-center transition-colors ${
    isActive
      ? "bg-primary/20 border border-primary/30"
      : "bg-white/[0.06] border border-white/[0.08] hover:bg-white/[0.10]"
  }`;

  return (
    <div ref={ref} className="relative flex flex-col items-center group">
      <motion.div
        style={{ width: springSize, height: springSize }}
        className="flex items-center justify-center"
      >
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses}
            aria-label={label}
          >
            <motion.div style={{ scale: iconScale }}>{children}</motion.div>
          </a>
        ) : (
          <button onClick={onClick} className={buttonClasses} aria-label={label}>
            <motion.div style={{ scale: iconScale }}>{children}</motion.div>
          </button>
        )}
      </motion.div>

      {/* Active indicator dot */}
      {isOpen && (
        <div className="absolute -bottom-1.5 size-1 rounded-full bg-primary" />
      )}

      {/* Tooltip */}
      <div
        className="absolute left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{ bottom: "calc(100% + 6px)" }}
      >
        <div className="bg-popover border border-border rounded px-2 py-0.5 text-[10px] font-mono text-popover-foreground whitespace-nowrap">
          {label}
        </div>
      </div>
    </div>
  );
}

/* ── App icon wrapper (reads desktop state) ── */
function DockAppItem({
  appType,
  label,
  icon: Icon,
  mouseX,
  isHoveringRef,
}: {
  appType: AppType;
  label: string;
  icon: LucideIcon;
  mouseX: MotionValue<number>;
  isHoveringRef: React.RefObject<boolean>;
}) {
  const { state, openApp } = useDesktop();
  const isOpen = state.windows.some((w) => w.appType === appType);
  const isActive =
    state.windows.find((w) => w.id === state.activeWindowId)?.appType ===
    appType;

  return (
    <DockIcon
      mouseX={mouseX}
      isHoveringRef={isHoveringRef}
      label={label}
      onClick={() => openApp(appType)}
      isActive={isActive}
      isOpen={isOpen}
    >
      <Icon className="size-5" strokeWidth={1.5} />
    </DockIcon>
  );
}

/* ── Dock ── */
export function Dock() {
  const mouseX = useMotionValue(0);
  const isHoveringRef = useRef(false);

  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-[9000]">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseEnter={() => {
          isHoveringRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveringRef.current = false;
          mouseX.set(-1000);
        }}
        className="flex items-end gap-1 px-3 py-2 backdrop-blur-xl border rounded-2xl"
        style={{
          backgroundColor: "oklch(0.14 0.02 260 / 60%)",
          borderColor: "oklch(1 0 0 / 15%)",
          boxShadow:
            "0 8px 32px oklch(0 0 0 / 30%), inset 0 1px 0 oklch(1 0 0 / 5%)",
        }}
      >
        {/* App icons */}
        {DOCK_APPS.map((app) => (
          <DockAppItem
            key={app.appType}
            mouseX={mouseX}
            isHoveringRef={isHoveringRef}
            {...app}
          />
        ))}

        {/* Separator */}
        <div className="w-px bg-border mx-1 self-center" style={{ height: 32 }} />

        {/* External links */}
        {EXTERNAL_LINKS.map((link) => (
          <DockIcon
            key={link.href}
            mouseX={mouseX}
            isHoveringRef={isHoveringRef}
            label={link.label}
            href={link.href}
          >
            <span className="text-xs font-mono font-bold text-muted-foreground">
              {link.label.charAt(0)}
            </span>
          </DockIcon>
        ))}
      </motion.div>
    </div>
  );
}
