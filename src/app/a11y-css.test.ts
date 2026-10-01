import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const globals = readFileSync("src/app/globals.css", "utf8");
const aurora = readFileSync("src/app/aurora.css", "utf8");

function block(selector: string): string {
  const m = globals.match(new RegExp(`${selector.replace(".", "\\.")}\\s*\\{([^}]*)\\}`));
  return m ? m[1] : "";
}
function token(scope: string, name: string): string {
  const m = block(scope).match(new RegExp(`${name}:\\s*(#[0-9a-fA-F]{6})`));
  if (!m) throw new Error(`missing ${name} in ${scope}`);
  return m[1];
}
function lum(hex: string): number {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
const ratio = (a: string, b: string) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

describe("WCAG AA contrast of accent text tokens", () => {
  for (const scope of [":root", ".light"]) {
    for (const t of ["--indigo-text", "--cyan-text", "--emerald-text", "--fuchsia-text", "--muted"]) {
      it(`${scope} ${t} on background ≥ 4.5`, () => {
        expect(ratio(token(scope, t), token(scope, "--background"))).toBeGreaterThanOrEqual(4.5);
      });
    }
    it(`${scope} white on both accent-button gradient stops ≥ 4.5`, () => {
      expect(ratio("#ffffff", token(scope, "--btn-from"))).toBeGreaterThanOrEqual(4.5);
      expect(ratio("#ffffff", token(scope, "--btn-to"))).toBeGreaterThanOrEqual(4.5);
    });
  }
});

describe("mobile touch targets and touch-safe hover", () => {
  it("bumps small interactive controls to 48px on mobile", () => {
    const mobile = aurora.slice(aurora.indexOf("@media (max-width: 768px)"));
    expect(mobile).toMatch(/\.chip-store[^{]*\{[^}]*min-height:\s*48px/);
    expect(mobile).toMatch(/\.socials\.sm \.soc[^{]*\{[^}]*width:\s*48px/);
    expect(mobile).toMatch(/\.more[\s\S]*?min-height:\s*48px/);
  });
  it("only applies pointer tilt on devices that can hover", () => {
    expect(aurora).toMatch(/@media \(hover: hover\)[\s\S]*\.pcard:hover/);
  });
});
