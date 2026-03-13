import type { Metadata } from "next";
import { DesktopShell } from "@/components/desktop/desktop-shell";
import { MembersSpotlight } from "@/components/landing/members-spotlight";

export const metadata: Metadata = {
  title: "Members",
  description:
    "Meet the talented builders, developers, designers, and community leaders of Superteam Malaysia.",
};

export default function MembersPage() {
  return (
    <DesktopShell initialApp="members">
      <MembersSpotlight />
    </DesktopShell>
  );
}
