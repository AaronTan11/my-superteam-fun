import type { Metadata } from "next";
import { DesktopShell } from "@/components/desktop/desktop-shell";
import { MissionSection } from "@/components/landing/mission-section";

export const metadata: Metadata = {
  title: "What We Do",
  description:
    "Builder support, grants, education, and ecosystem growth for Solana in Malaysia.",
};

export default function MissionPage() {
  return (
    <DesktopShell initialApp="mission">
      <MissionSection />
    </DesktopShell>
  );
}
