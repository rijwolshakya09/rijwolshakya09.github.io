import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { HeroSection } from "./HeroSection";

describe("HeroSection", () => {
  it("leads with the headline, availability, and both CTAs", () => {
    render(<HeroSection />);
    expect(
      screen.getByRole("heading", { level: 1, name: "I build the mobile apps people pay their bills with." })
    ).toBeInTheDocument();
    expect(screen.getByText(/Available for remote Flutter roles/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "See my work" })).toHaveAttribute("href", "#work");
    expect(screen.getByRole("link", { name: "Download CV" })).toHaveAttribute("href", "/Rijwol_Shakya_CV.pdf");
    expect(screen.getByText(/3\+ years/)).toBeInTheDocument();
  });

  it("keeps the phone visible in server HTML so it works without JavaScript", () => {
    const html = renderToString(<HeroSection />);
    expect(html).toContain("Refresh status");
    expect(html).not.toMatch(/opacity:\s*0[;"]/);
  });
});
