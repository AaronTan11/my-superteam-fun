import type { Metadata } from "next";
import { DesktopShell } from "@/components/desktop/desktop-shell";
import { EventsSection } from "@/components/landing/events-section";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Hackathons, workshops, and meetups for Solana builders in Malaysia. RSVP on Luma.",
};

export default function EventsPage() {
  return (
    <DesktopShell initialApp="events">
      <EventsSection />
    </DesktopShell>
  );
}
