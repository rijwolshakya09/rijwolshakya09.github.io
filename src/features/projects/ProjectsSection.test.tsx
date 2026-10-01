import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectsSection } from "./components/ProjectsSection";

vi.mock("./components/CaseStudyModal", () => ({ CaseStudyModal: () => null }));

describe("ProjectsSection", () => {
  it("shows myDishHome as the feature with official store badges", () => {
    render(<ProjectsSection />);
    const play = screen.getByRole("link", { name: "myDishHome on Google Play" });
    expect(play).toHaveAttribute("href", "https://play.google.com/store/apps/details?id=com.shirantech.dishhome");
    expect(play).toHaveAttribute("target", "_blank");
    expect(play).toHaveAttribute("rel", "noopener noreferrer");
    expect(play.querySelector("img")).toHaveAttribute("src", "/badges/google-play.svg");
    expect(screen.getByRole("link", { name: "myDishHome on the App Store" })).toBeInTheDocument();
  });
  it("renders five project cards with real icons and the right store chips", () => {
    render(<ProjectsSection />);
    for (const t of ["Bizlevate", "SalesMania", "Finance Tracker", "HG HUB", "Rent-N-Read"]) {
      expect(screen.getByRole("heading", { level: 3, name: t })).toBeInTheDocument();
    }
    expect(screen.queryByRole("link", { name: "Finance Tracker on the App Store" })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Finance Tracker on Google Play" })).toBeInTheDocument();
    expect(screen.getByText("Internal release")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Rent-N-Read on GitHub" })).toHaveAttribute("href", "https://github.com/Ak-tsuki");
  });
});
