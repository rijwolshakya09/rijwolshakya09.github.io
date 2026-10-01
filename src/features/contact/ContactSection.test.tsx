import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactSection } from "./components/ContactSection";

describe("ContactSection", () => {
  it("offers email, phone, location, GitHub and LinkedIn", () => {
    render(<ContactSection />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Let's build something great");
    expect(screen.getByRole("link", { name: /shakyarijwol19@gmail.com/ })).toHaveAttribute("href", "mailto:shakyarijwol19@gmail.com");
    expect(screen.getByRole("link", { name: /\+977-9861291534/ })).toHaveAttribute("href", "tel:+977-9861291534");
    expect(screen.getByText(/remote worldwide/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /@rijwolshakya09/ })).toHaveAttribute("href", "https://github.com/rijwolshakya09");
    expect(screen.getByRole("link", { name: /LinkedIn/ })).toHaveAttribute("href", "https://linkedin.com/in/rijwol-shakya-79411a217/");
  });
});
