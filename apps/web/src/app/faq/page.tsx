import type { Metadata } from "next";
import { DesktopShell } from "@/components/desktop/desktop-shell";
import { FaqSection } from "@/components/landing/faq-section";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about Superteam Malaysia and the Solana ecosystem.",
};

export default function FaqPage() {
  return (
    <DesktopShell initialApp="faq">
      <FaqSection />
    </DesktopShell>
  );
}
