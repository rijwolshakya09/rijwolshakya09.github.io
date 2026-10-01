import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";

const read = (p: string) => (existsSync(p) ? readFileSync(p, "utf8") : "");
const css = read("src/app/globals.css") + read("src/app/aurora.css");

describe("theme tokens", () => {
  it("defines every token for dark and light", () => {
    for (const t of ["--background", "--foreground", "--muted", "--muted-2", "--indigo", "--cyan", "--fuchsia", "--emerald", "--glass-bg", "--glass-border"]) {
      expect(css).toMatch(new RegExp(`:root[^}]*${t}:`));
      expect(css).toMatch(new RegExp(`\\.light[^}]*${t}:`));
    }
  });
  it("stops all keyframe animation under reduced motion", () => {
    expect(css).toMatch(/prefers-reduced-motion:\s*reduce[\s\S]*animation:\s*none\s*!important/);
  });
  it("aurora.css exists and contains no literal hex colours outside the brand allow-list", () => {
    const aurora = read("src/app/aurora.css");
    expect(aurora.length).toBeGreaterThan(1000);
    const allowed = new Set(["#24292f", "#32383f", "#0a66c2", "#000", "#fff", "#ffffff"]);
    const hexes = (aurora.match(/#[0-9a-fA-F]{3,8}\b/g) ?? []).filter((h) => !allowed.has(h.toLowerCase()));
    expect(hexes).toEqual([]);
  });
});
