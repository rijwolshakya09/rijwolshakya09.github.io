import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { projectsByTier, PROJECTS_DATA } from "./data/projects.data";
import { ProjectCard } from "./components/ProjectCard";
import { CaseStudy } from "./components/CaseStudy";

describe("project tiers", () => {
  it("orders work as case study, featured, compact", () => {
    expect(projectsByTier("case-study").map((p) => p.id)).toEqual(["mydishhome"]);
    expect(projectsByTier("featured").map((p) => p.id)).toEqual(["bizlevate", "finance-tracker"]);
    expect(projectsByTier("compact").map((p) => p.id)).toEqual(["salesmania", "hg-hub", "rent-n-read"]);
  });
});

describe("CaseStudy", () => {
  it("shows the personal commit figures", () => {
    render(<CaseStudy project={projectsByTier("case-study")[0]} />);
    expect(screen.getByText("365")).toBeInTheDocument();
    expect(screen.getByText("189")).toBeInTheDocument();
  });
});

describe("ProjectCard", () => {
  const bizlevate = PROJECTS_DATA.find((p) => p.id === "bizlevate")!;
  const rent = PROJECTS_DATA.find((p) => p.id === "rent-n-read")!;

  it("expands inline to show highlights", async () => {
    render(<ProjectCard project={bizlevate} size="featured" />);
    const toggle = screen.getByRole("button", { name: /Show details/ });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(toggle);
    expect(screen.getByRole("button", { name: /Hide details/ })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(bizlevate.highlights[0])).toBeInTheDocument();
  });

  it("renders a GitHub link only when the project has one", async () => {
    const { unmount } = render(<ProjectCard project={bizlevate} size="featured" />);
    await userEvent.click(screen.getByRole("button", { name: /Show details/ }));
    expect(screen.queryByRole("link", { name: /GitHub/ })).not.toBeInTheDocument();
    unmount();
    render(<ProjectCard project={rent} size="compact" />);
    await userEvent.click(screen.getByRole("button", { name: /Show details/ }));
    expect(screen.getByRole("link", { name: /GitHub/ })).toHaveAttribute("href", rent.githubUrl);
  });
});
