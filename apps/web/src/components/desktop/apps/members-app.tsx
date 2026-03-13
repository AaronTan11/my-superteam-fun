"use client";

import { useMemo, useState } from "react";
import { Search, Users } from "lucide-react";
import { members } from "@/data/members";
import { skillCategories } from "@/data/skills";
import { MemberAvatar } from "@/components/shared/member-avatar";
import { SkillBadge } from "@/components/shared/skill-badge";
import { cn } from "@/lib/utils";

function XLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const skillBorderColors: Record<string, string> = {
  "Core Team": "border-l-sol-green",
  Rust: "border-l-sol-green",
  Backend: "border-l-sol-green",
  Product: "border-l-sol-green",
  Frontend: "border-l-sol-purple",
  Community: "border-l-sol-purple",
  Design: "border-l-coral",
  Content: "border-l-warm",
  Growth: "border-l-warm",
};

export function MembersApp() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return members.filter((m) => {
      const matchesSearch =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.title.toLowerCase().includes(q) ||
        (m.company && m.company.toLowerCase().includes(q));
      const matchesFilter =
        activeFilter === "all" || m.skills.includes(activeFilter);
      return matchesSearch && matchesFilter;
    });
  }, [search, activeFilter]);

  const borderColor = (skills: string[]): string => {
    for (const skill of skills) {
      if (skillBorderColors[skill]) return skillBorderColors[skill]!;
    }
    return "border-l-border";
  };

  return (
    <div className="p-6">
      <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-2">
        Directory
      </p>
      <h2 className="font-display text-2xl font-bold mb-5">Members</h2>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, role, or company..."
          className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 transition-colors"
        />
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-4">
        {skillCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveFilter(cat.value)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium border whitespace-nowrap transition-colors",
              activeFilter === cat.value
                ? "bg-primary/15 border-primary/40 text-primary"
                : "bg-transparent border-border text-muted-foreground hover:border-border-visible"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-xs text-muted-foreground mb-4">
        {filtered.length} member{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Grid or Empty state */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Users className="size-10 text-muted-foreground/40 mb-3" />
          <p className="text-sm font-medium text-muted-foreground">
            No members found
          </p>
          <p className="text-xs text-muted-foreground/60 mt-1">
            Try adjusting your search or filters
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filtered.map((member) => (
            <div
              key={member.id}
              className={cn(
                "p-4 rounded-lg border border-border border-l-2 hover:border-border-visible hover:-translate-y-px transition-all duration-200",
                borderColor(member.skills)
              )}
            >
              {/* Top row: avatar + info + twitter */}
              <div className="flex items-start gap-3">
                <MemberAvatar
                  name={member.name}
                  photo={member.photo || undefined}
                  size="md"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-display text-sm font-semibold truncate">
                      {member.name}
                    </p>
                    {member.twitterHandle && (
                      <a
                        href={`https://x.com/${member.twitterHandle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors shrink-0"
                        title={`@${member.twitterHandle}`}
                      >
                        <XLogo className="size-3" />
                        <span className="text-[11px] hidden sm:inline">
                          @{member.twitterHandle}
                        </span>
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {member.title}
                    {member.company ? ` · ${member.company}` : ""}
                  </p>
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1 mt-3">
                {member.skills.map((skill) => (
                  <SkillBadge key={skill} skill={skill} />
                ))}
              </div>

              {/* Achievements */}
              {member.achievements && member.achievements.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
