export interface Stat {
  id: string;
  value: number;
  suffix: string;
  label: string;
}

export const stats: Stat[] = [
  { id: "members", value: 500, suffix: "+", label: "Community Members" },
  { id: "events", value: 30, suffix: "+", label: "Events Hosted" },
  { id: "projects", value: 45, suffix: "", label: "Projects Built" },
  { id: "bounties", value: 120, suffix: "+", label: "Bounties Completed" },
  { id: "reach", value: 10, suffix: "K+", label: "Community Reach" },
];
