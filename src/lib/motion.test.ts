import { describe, expect, it } from "vitest";
import { countUpValue, showcaseIndex, formatKathmanduTime } from "./motion";

describe("countUpValue", () => {
  it("starts at 0, ends exactly at target, eases out", () => {
    expect(countUpValue(365, 0)).toBe(0);
    expect(countUpValue(365, 1)).toBe(365);
    expect(countUpValue(365, 0.5)).toBeGreaterThan(365 / 2);
  });
  it("clamps t outside [0,1]", () => {
    expect(countUpValue(89, -1)).toBe(0);
    expect(countUpValue(89, 2)).toBe(89);
  });
});

describe("showcaseIndex", () => {
  it("maps scroll progress to a screenshot index", () => {
    expect(showcaseIndex(0, 4)).toBe(0);
    expect(showcaseIndex(0.3, 4)).toBe(1);
    expect(showcaseIndex(1, 4)).toBe(3);
  });
  it("clamps and handles empty galleries", () => {
    expect(showcaseIndex(1.5, 4)).toBe(3);
    expect(showcaseIndex(-0.2, 4)).toBe(0);
    expect(showcaseIndex(0.5, 0)).toBe(0);
  });
});

describe("formatKathmanduTime", () => {
  it("formats in Asia/Kathmandu (UTC+5:45)", () => {
    expect(formatKathmanduTime(new Date("2026-10-01T00:00:00Z"))).toBe("05:45");
    expect(formatKathmanduTime(new Date("2026-10-01T18:30:00Z"))).toBe("00:15");
  });
});
