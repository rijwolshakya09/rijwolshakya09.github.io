import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { CORE_SKILLS, SKILL_GROUPS } from "./data/skills.data";
import { SkillsSection } from "./components/SkillsSection";

describe("skills", () => {
  it("rates the five beginner skills at half", () => {
    const beginners = CORE_SKILLS.filter((s) => s.level === "Beginner").map((s) => [s.name, s.value]);
    expect(beginners).toEqual([["React Native", 50], ["React", 50], ["Supabase", 50], ["Node.js", 50], ["TypeScript", 50]]);
    expect(CORE_SKILLS.find((s) => s.name === "Flutter")).toMatchObject({ level: "Primary", value: 95 });
  });
  it("has the eight detailed groups", () => {
    expect(SKILL_GROUPS.map((g) => g.title)).toEqual([
      "Mobile development", "State management", "Architecture", "Backend & APIs",
      "Databases & storage", "Frontend", "DevOps & delivery", "Developer tools",
    ]);
  });
  it("renders proficiency rings with accessible values", () => {
    render(<SkillsSection />);
    expect(screen.getByRole("meter", { name: "React Native proficiency" })).toHaveAttribute("aria-valuenow", "50");
    expect(screen.getAllByText("Beginner")).toHaveLength(5);
  });
});
