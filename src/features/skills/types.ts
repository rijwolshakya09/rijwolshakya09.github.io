export type SkillLevel = "Primary" | "Proficient" | "Beginner";

export interface CoreSkill {
  name: string;
  icon: string;
  level: SkillLevel;
  value: number;
}

export type Accent = "indigo" | "cyan" | "fuchsia" | "emerald" | "amber" | "sky" | "rose" | "violet";

export interface SkillGroup {
  title: string;
  emoji: string;
  accent: Accent;
  skills: { name: string; icon?: string }[];
}
