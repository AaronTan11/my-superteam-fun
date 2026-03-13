import type { Metadata } from "next";
import { DesktopShell } from "@/components/desktop/desktop-shell";
import { WallOfLove } from "@/components/landing/wall-of-love";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Hear from Solana builders and community members about their Superteam Malaysia experience.",
};

export default function TestimonialsPage() {
  return (
    <DesktopShell initialApp="testimonials">
      <WallOfLove />
    </DesktopShell>
  );
}
