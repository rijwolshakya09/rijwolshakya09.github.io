import { describe, expect, it } from "vitest";
import { PROJECTS, getProject, FEATURE_PROJECT, CARD_PROJECTS } from "./data/projects.data";

const url = (id: Parameters<typeof getProject>[0], kind: string) => getProject(id).stores.find((s) => s.kind === kind)?.url;

describe("projects data", () => {
  it("has all six projects in order with one feature", () => {
    expect(PROJECTS.map((p) => p.id)).toEqual(["mydishhome", "bizlevate", "salesmania", "finance-tracker", "hg-hub", "rent-n-read"]);
    expect(FEATURE_PROJECT.id).toBe("mydishhome");
    expect(CARD_PROJECTS).toHaveLength(5);
  });
  it("links the real store listings", () => {
    expect(url("mydishhome", "play")).toBe("https://play.google.com/store/apps/details?id=com.shirantech.dishhome");
    expect(url("mydishhome", "appstore")).toBe("https://apps.apple.com/np/app/mydishhome/id1396471022");
    expect(url("bizlevate", "play")).toBe("https://play.google.com/store/apps/details?id=com.ispl.bizlevate");
    expect(url("bizlevate", "appstore")).toBe("https://apps.apple.com/np/app/bizlevate/id6760984023");
    expect(url("salesmania", "play")).toBe("https://play.google.com/store/apps/details?id=com.ispl.ps360flutter");
    expect(url("salesmania", "appstore")).toBe("https://apps.apple.com/np/app/salesmaniahd/id6760572812");
    expect(url("finance-tracker", "play")).toBe("https://play.google.com/store/apps/details?id=com.rijwolshakya.financetracker");
    expect(url("finance-tracker", "appstore")).toBeUndefined();
    expect(getProject("hg-hub").stores).toEqual([]);
    expect(url("rent-n-read", "github")).toBe("https://github.com/Ak-tsuki");
  });
  it("has full case-study content for every project", () => {
    for (const p of PROJECTS) {
      expect(p.overview.length).toBeGreaterThan(120);
      expect(p.info.length).toBeGreaterThanOrEqual(6);
      expect(p.features.length).toBeGreaterThanOrEqual(4);
      expect(p.architecture).toHaveLength(3);
      expect(p.metrics).toHaveLength(4);
      expect(p.contributions.length).toBeGreaterThanOrEqual(3);
    }
  });
  it("points at real screenshot files", () => {
    expect(getProject("mydishhome").screenshots).toEqual([1, 2, 3, 4].map((i) => `/apps/mydishhome/shot-${i}.webp`));
    expect(getProject("finance-tracker").screenshots).toHaveLength(3);
    expect(getProject("hg-hub").screenshots).toEqual([]);
  });
  it("keeps personal myDishHome figures", () => {
    expect(getProject("mydishhome").metrics.map((m) => m.value)).toEqual(["365", "189", "89", "29"]);
  });
});
