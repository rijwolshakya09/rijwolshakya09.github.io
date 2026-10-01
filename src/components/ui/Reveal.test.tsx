import { describe, expect, it } from "vitest";
import { renderToString } from "react-dom/server";
import { Reveal } from "./Reveal";

describe("Reveal", () => {
  it("server-renders content fully visible (no opacity:0)", () => {
    const html = renderToString(<Reveal><p>Hello</p></Reveal>);
    expect(html).toContain("Hello");
    expect(html).not.toMatch(/opacity:\s*0[;"]/);
  });
});
