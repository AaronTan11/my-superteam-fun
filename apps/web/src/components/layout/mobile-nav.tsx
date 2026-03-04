"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { cn } from "@/lib/utils";
import { navLinks } from "@/data/navigation";
import { SOCIAL_LINKS } from "@/lib/constants";
import { buttonVariants } from "@/components/ui/button";
import { STMYLogo } from "@/components/shared/stmy-logo";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileNav({ open, onClose }: MobileNavProps) {
  // Prevent body scrolling when mobile nav is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Top bar: Logo + Close */}
          <div className="flex items-center justify-between px-6 py-4">
            <Link href="/" onClick={onClose} className="flex items-center gap-2.5 font-display text-lg font-bold">
              <STMYLogo size={28} />
              <span>
                <span className="text-foreground">Superteam</span>
                <span className="text-primary">&nbsp;MY</span>
              </span>
            </Link>
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Close navigation"
            >
              <X className="size-6" />
            </button>
          </div>

          {/* Navigation links */}
          <nav className="flex flex-col items-center justify-center gap-8 pt-16">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="font-display text-3xl font-bold text-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{
                duration: 0.3,
                delay: navLinks.length * 0.08 + 0.1,
                ease: "easeOut",
              }}
              className="pt-8"
            >
              <a
                href={SOCIAL_LINKS.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ size: "lg" }))}
              >
                Join Community
              </a>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
