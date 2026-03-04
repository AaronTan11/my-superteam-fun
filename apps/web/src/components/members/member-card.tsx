import { GlassCard } from "@/components/shared/glass-card";
import { SkillBadge } from "@/components/shared/skill-badge";
import { MemberAvatar } from "@/components/shared/member-avatar";
import type { Member } from "@/data/members";

interface MemberCardProps {
  member: Member;
}

export function MemberCard({ member }: MemberCardProps) {
  return (
    <GlassCard className="p-5">
      <div className="flex items-start gap-4 mb-4">
        <MemberAvatar name={member.name} size="md" className="size-14 text-base" />
        <div className="min-w-0">
          <h3 className="font-display font-semibold text-sm truncate">
            {member.name}
          </h3>
          <p className="text-muted-foreground text-xs">{member.title}</p>
          {member.company && (
            <p className="text-muted-foreground/70 text-xs">{member.company}</p>
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {member.skills.map((skill) => (
          <SkillBadge key={skill} skill={skill} />
        ))}
      </div>
      {member.achievements && member.achievements.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {member.achievements.map((achievement) => (
            <span
              key={achievement}
              className="text-[10px] px-2 py-0.5 rounded-full border border-warm/20 bg-warm/5 text-warm-light"
            >
              {achievement}
            </span>
          ))}
        </div>
      )}
      {member.twitterHandle && (
        <a
          href={`https://x.com/${member.twitterHandle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground text-xs transition-colors"
        >
          @{member.twitterHandle}
        </a>
      )}
    </GlassCard>
  );
}
