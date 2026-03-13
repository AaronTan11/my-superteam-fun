import type { Metadata } from "next";
import { DesktopShell } from "@/components/desktop/desktop-shell";
import { JoinCtaSection } from "@/components/landing/join-cta-section";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Superteam Malaysia — the home for Solana builders in Malaysia.",
};

export default function AboutPage() {
  return (
    <DesktopShell initialApp="about">
      <JoinCtaSection />
    </DesktopShell>
  );
}
