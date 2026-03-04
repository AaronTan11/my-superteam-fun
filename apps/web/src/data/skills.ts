export interface SkillCategory {
  id: string;
  label: string;
  value: string;
}

export const skillCategories: SkillCategory[] = [
  { id: "all", label: "All", value: "all" },
  { id: "core", label: "Core Team", value: "Core Team" },
  { id: "rust", label: "Rust", value: "Rust" },
  { id: "frontend", label: "Frontend", value: "Frontend" },
  { id: "backend", label: "Backend", value: "Backend" },
  { id: "design", label: "Design", value: "Design" },
  { id: "content", label: "Content", value: "Content" },
  { id: "growth", label: "Growth", value: "Growth" },
  { id: "product", label: "Product", value: "Product" },
  { id: "community", label: "Community", value: "Community" },
];
