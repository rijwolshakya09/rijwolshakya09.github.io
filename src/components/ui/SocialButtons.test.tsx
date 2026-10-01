import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SocialButtons } from "./SocialButtons";

describe("SocialButtons", () => {
  it("links GitHub, LinkedIn and email with accessible names", () => {
    render(<SocialButtons />);
    const gh = screen.getByRole("link", { name: "GitHub profile" });
    expect(gh).toHaveAttribute("href", "https://github.com/rijwolshakya09");
    expect(gh).toHaveAttribute("rel", "noopener noreferrer");
    expect(gh).toHaveAttribute("target", "_blank");
    expect(screen.getByRole("link", { name: "LinkedIn profile" })).toHaveAttribute("href", "https://linkedin.com/in/rijwol-shakya-79411a217/");
    expect(screen.getByRole("link", { name: "Email Rijwol" })).toHaveAttribute("href", "mailto:shakyarijwol19@gmail.com");
  });
});
