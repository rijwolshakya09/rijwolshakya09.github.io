import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EXPERIENCE_DATA } from "./data/experience.data";
import { ExperienceSection } from "./components/ExperienceSection";

describe("ExperienceSection", () => {
  it("shows detailed CV-style roles by default", () => {
    render(<ExperienceSection />);
    expect(EXPERIENCE_DATA.map((e) => e.responsibilities.length)).toEqual([6, 6, 3]);
    expect(screen.getByRole("tab", { name: "Experience" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("Mobile Application Developer")).toBeInTheDocument();
    expect(screen.getByText(/365 commits of my own/)).toBeInTheDocument();
  });
  it("switches to Education by click and arrow key", async () => {
    const user = userEvent.setup();
    render(<ExperienceSection />);
    await user.click(screen.getByRole("tab", { name: "Education" }));
    expect(screen.getByText(/MSc Data Science/)).toBeVisible();
    screen.getByRole("tab", { name: "Education" }).focus();
    await user.keyboard("{ArrowLeft}");
    expect(screen.getByRole("tab", { name: "Experience" })).toHaveAttribute("aria-selected", "true");
  });
});
