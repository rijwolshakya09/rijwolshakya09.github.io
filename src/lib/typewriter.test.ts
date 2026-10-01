import { describe, expect, it } from "vitest";
import { typewriterStep, type TypeState } from "./motion";

const W = ["Hi", "Yo"] as const;
const run = (s: TypeState) => typewriterStep(s, W);

describe("typewriterStep", () => {
  it("types forward one char at a time", () => {
    expect(run({ word: 0, chars: 0, deleting: false })).toEqual({ next: { word: 0, chars: 1, deleting: false }, delayMs: 70 });
  });
  it("holds at full word then starts deleting", () => {
    expect(run({ word: 0, chars: 2, deleting: false })).toEqual({ next: { word: 0, chars: 2, deleting: true }, delayMs: 1400 });
  });
  it("deletes then advances and wraps", () => {
    expect(run({ word: 0, chars: 1, deleting: true })).toEqual({ next: { word: 0, chars: 0, deleting: true }, delayMs: 35 });
    expect(run({ word: 1, chars: 0, deleting: true })).toEqual({ next: { word: 0, chars: 0, deleting: false }, delayMs: 300 });
  });
});
