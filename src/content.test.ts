import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { PROJECTS_DATA } from "@/features/projects/data/projects.data";
import { EXPERIENCE_DATA } from "@/features/experience/data/experience.data";

const BANNED = ["1,065", "1,000+", "65+ fix", "29 feature branches", "29 active feature branches", "2+ years"];

function filesUnder(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return filesUnder(p);
    return /\.(ts|tsx|mjs)$/.test(p) && !p.endsWith(".test.ts") ? [p] : [];
  });
}

describe("myDishHome figures are personal", () => {
  const dish = PROJECTS_DATA.find((p) => p.id === "mydishhome");
  const metric = (label: string) => dish?.metrics.find((m) => m.label === label)?.value;

  it("shows my own commit counts", () => {
    expect(metric("Commits")).toBe("365");
    expect(metric("Features")).toBe("189");
    expect(metric("Fixes")).toBe("89");
    expect(metric("Refactors")).toBe("29");
  });

  it("drops the team-wide branch count", () => {
    expect(dish?.metrics.some((m) => /branch/i.test(m.label))).toBe(false);
  });

  it("states the personal count in the current role", () => {
    const current = EXPERIENCE_DATA.find((e) => e.current);
    expect(current?.responsibilities.some((r) => r.includes("365 commits"))).toBe(true);
  });
});

describe("no stale figures anywhere in source", () => {
  const files = [...filesUnder(join(process.cwd(), "src")), ...filesUnder(join(process.cwd(), "scripts"))];
  for (const banned of BANNED) {
    it(`never contains "${banned}"`, () => {
      const hits = files.filter((f) => readFileSync(f, "utf8").includes(banned));
      expect(hits).toEqual([]);
    });
  }
});
