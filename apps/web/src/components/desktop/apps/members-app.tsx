"use client";

import { members } from "@/data/members";
import { MemberAvatar } from "@/components/shared/member-avatar";
import { SkillBadge } from "@/components/shared/skill-badge";

export function MembersApp() {
  return (
    <div className="p-6">
      <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-2">
        Directory
      </p>
      <h2 className="font-display text-2xl font-bold mb-6">Members</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {members.map((member) => (
          <div
            key={member.id}
            className="flex items-start gap-3 p-3 rounded-lg border border-border hover:border-border-visible transition-colors"
          >
            <MemberAvatar name={member.name} size="md" />
            <div className="min-w-0">
              <p className="font-display text-sm font-semibold truncate">
                {member.name}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {member.title}
                {member.company ? ` · ${member.company}` : ""}
              </p>
              <div className="flex flex-wrap gap-1 mt-1.5">
                {member.skills.slice(0, 3).map((skill) => (
                  <SkillBadge key={skill} skill={skill} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
