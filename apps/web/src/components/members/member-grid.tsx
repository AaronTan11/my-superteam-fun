"use client";

import { StaggerContainer, StaggerItem } from "@/components/shared/stagger-children";
import { MemberCard } from "./member-card";
import type { Member } from "@/data/members";

interface MemberGridProps {
  members: Member[];
}

export function MemberGrid({ members }: MemberGridProps) {
  if (members.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground text-sm">
          No members found matching your criteria.
        </p>
      </div>
    );
  }

  return (
    <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {members.map((member) => (
        <StaggerItem key={member.id}>
          <MemberCard member={member} />
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}
