import { describe, expect, it } from "vitest";
import { SKILLS_DATA } from "./data/skills.data";

describe("toolkit data", () => {
  it("has exactly three groups in order", () => {
    expect(SKILLS_DATA.map((g) => g.category)).toEqual(["Mobile", "Web, backend & data", "Tools"]);
  });

  it("lists no skill twice", () => {
    const all = SKILLS_DATA.flatMap((g) => g.skills);
    expect(new Set(all).size).toBe(all.length);
  });
});
