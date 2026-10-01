import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { AboutSection } from "./components/AboutSection";

describe("AboutSection", () => {
  it("tells the full story with the right numbers", () => {
    render(<AboutSection />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Building apps that people rely on");
    expect(screen.getByText(/3\+ years of professional experience/)).toBeInTheDocument();
    expect(screen.getByText(/1M\+ downloads/)).toBeInTheDocument();
    expect(screen.getByText(/growing my skills in/)).toBeInTheDocument();
    expect(screen.getByText("365+")).toBeInTheDocument();
    expect(screen.getByText("189")).toBeInTheDocument();
    expect(screen.getByText(/UTC\+5:45/)).toBeInTheDocument();
  });
});
