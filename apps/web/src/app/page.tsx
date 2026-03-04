import { HeroSection } from "@/components/landing/hero-section";
import { PartnersSection } from "@/components/landing/partners-section";
import { MissionSection } from "@/components/landing/mission-section";
import { MembersSpotlight } from "@/components/landing/members-spotlight";
import { EventsSection } from "@/components/landing/events-section";
import { WallOfLove } from "@/components/landing/wall-of-love";
import { FaqSection } from "@/components/landing/faq-section";
import { JoinCtaSection } from "@/components/landing/join-cta-section";

function SectionDivider() {
  return (
    <div
      className="h-px w-full"
      style={{
        background:
          "linear-gradient(to right, transparent, oklch(0.82 0.18 165 / 12%) 30%, oklch(0.55 0.24 303 / 12%) 70%, transparent)",
      }}
      aria-hidden="true"
    />
  );
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <PartnersSection />
      <SectionDivider />
      <MissionSection />
      <SectionDivider />
      <MembersSpotlight />
      <SectionDivider />
      <EventsSection />
      <SectionDivider />
      <WallOfLove />
      <SectionDivider />
      <FaqSection />
      <JoinCtaSection />
    </>
  );
}
