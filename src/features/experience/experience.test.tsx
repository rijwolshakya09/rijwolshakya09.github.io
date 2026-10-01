import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { EXPERIENCE_DATA } from "./data/experience.data";
import { ExperienceSection } from "./components/ExperienceSection";

describe("Experience changelog", () => {
  it("lists releases newest first as v3.0, v2.0, v1.0", () => {
    render(<ExperienceSection />);
    const releases = screen.getAllByRole("listitem").filter((li) => /^v\d\.\d/.test(li.textContent ?? ""));
    expect(releases.map((li) => li.textContent?.slice(0, 4))).toEqual(["v3.0", "v2.0", "v1.0"]);
  });

  it("keeps each role to at most four bullets", () => {
    for (const e of EXPERIENCE_DATA) expect(e.responsibilities.length).toBeLessThanOrEqual(4);
  });

  it("shows education with the MSc in progress", () => {
    render(<ExperienceSection />);
    const edu = screen.getByRole("region", { name: "Education" });
    expect(within(edu).getByText(/MSc Data Science/)).toBeInTheDocument();
    expect(within(edu).getByText(/present/)).toBeInTheDocument();
  });
});
