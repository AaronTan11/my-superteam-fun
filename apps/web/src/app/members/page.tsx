import type { Metadata } from "next";
import SectionWrapper from "@/components/layout/section-wrapper";
import { SectionHeading } from "@/components/shared/section-heading";
import { MemberFilters } from "@/components/members/member-filters";

export const metadata: Metadata = {
  title: "Members",
  description:
    "Meet the talented builders, developers, designers, and community leaders of Superteam Malaysia.",
};

export default function MembersPage() {
  return (
    <SectionWrapper className="pt-32 md:pt-40 relative">
      <SectionHeading
        title="Our Members"
        subtitle="The builders, creators, and leaders powering Solana in Malaysia"
        gradient="malaysia"
      />
      <MemberFilters />
    </SectionWrapper>
  );
}
