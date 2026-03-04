"use client";

import { useState, useMemo, useCallback } from "react";
import { Search } from "lucide-react";
import { members } from "@/data/members";
import { skillCategories } from "@/data/skills";
import { MemberGrid } from "./member-grid";

export function MemberFilters() {
  const [search, setSearch] = useState("");
  const [activeSkill, setActiveSkill] = useState("all");

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const matchesSearch =
        search === "" ||
        member.name.toLowerCase().includes(search.toLowerCase()) ||
        member.title.toLowerCase().includes(search.toLowerCase()) ||
        (member.company?.toLowerCase().includes(search.toLowerCase()) ?? false);

      const matchesSkill =
        activeSkill === "all" || member.skills.includes(activeSkill);

      return matchesSearch && matchesSkill;
    });
  }, [search, activeSkill]);

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    []
  );

  return (
    <div>
      <div className="mb-8 space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search members..."
            value={search}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {skillCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveSkill(category.value)}
              className={`text-xs px-3.5 py-1.5 rounded-full border transition-all ${
                activeSkill === category.value
                  ? "bg-primary/15 border-primary/40 text-primary"
                  : "bg-card border-border text-muted-foreground hover:text-foreground hover:border-border-visible"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
      <p className="text-muted-foreground text-xs mb-6">
        {filteredMembers.length}{" "}
        {filteredMembers.length === 1 ? "member" : "members"} found
      </p>
      <MemberGrid members={filteredMembers} />
    </div>
  );
}
