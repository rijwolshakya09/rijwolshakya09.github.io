import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { HeroSection } from "./HeroSection";

describe("HeroSection", () => {
  it("greets, shows the photo, CTAs and socials", () => {
    render(<HeroSection />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Hi, I'm Rijwol Shakya");
    expect(screen.getByRole("img", { name: "Rijwol Shakya" })).toHaveAttribute("src", expect.stringContaining("/images/avatar.png"));
    expect(screen.getByRole("link", { name: /View my work/ })).toHaveAttribute("href", "#work");
    expect(screen.getByRole("link", { name: /Download CV/ })).toHaveAttribute("href", "/Rijwol_Shakya_CV.pdf");
    expect(screen.getByRole("link", { name: "GitHub profile" })).toBeInTheDocument();
    expect(screen.getByText("Open to remote Flutter roles")).toBeInTheDocument();
    expect(screen.getByText("365+")).toBeInTheDocument();
  });

  it("lists the tech stack for screen readers once", () => {
    render(<HeroSection />);
    expect(screen.getByRole("list", { name: "Tech stack" })).toHaveTextContent("Flutter");
  });

  it("server HTML never hides hero content with opacity:0", () => {
    expect(renderToString(<HeroSection />)).not.toMatch(/opacity:\s*0[;"]/);
  });
});
