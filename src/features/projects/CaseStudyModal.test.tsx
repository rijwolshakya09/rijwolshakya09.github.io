import { describe, expect, it } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProjectsSection } from "./components/ProjectsSection";

describe("Case study modal", () => {
  it("opens the clicked project, not a fixed one", async () => {
    const user = userEvent.setup();
    render(<ProjectsSection />);
    const cards = screen.getAllByRole("button", { name: /^Case study/ });
    await user.click(cards[2]); // bizlevate, salesmania, finance-tracker, hg-hub, rent-n-read
    const dialog = await screen.findByRole("dialog", { name: "Finance Tracker" });
    expect(within(dialog).getByText(/personal finance app I designed and built myself/)).toBeInTheDocument();
    expect(within(dialog).queryByRole("link", { name: /App Store/ })).not.toBeInTheDocument();
  });

  it("closes on Esc, unlocks scroll and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    render(<ProjectsSection />);
    const trigger = screen.getAllByRole("button", { name: /^Case study/ })[0];
    await user.click(trigger);
    expect(await screen.findByRole("dialog", { name: "Bizlevate" })).toBeInTheDocument();
    expect(document.body.style.overflow).toBe("hidden");
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(document.body.style.overflow).toBe("");
    expect(trigger).toHaveFocus();
  });

  it("thumbnail buttons switch the shown screenshot", async () => {
    const user = userEvent.setup();
    render(<ProjectsSection />);
    await user.click(screen.getByRole("button", { name: /Full case study/ }));
    const dialog = await screen.findByRole("dialog", { name: "myDishHome" });
    await user.click(within(dialog).getByRole("button", { name: "Show screenshot 3" }));
    expect(within(dialog).getByText("3", { selector: "b" })).toBeInTheDocument();
    expect(within(dialog).getByRole("button", { name: "Show screenshot 3" })).toHaveAttribute("aria-current", "true");
  });

  it("shows an internal-release placeholder and no store links for HG HUB", async () => {
    const user = userEvent.setup();
    render(<ProjectsSection />);
    await user.click(screen.getAllByRole("button", { name: /^Case study/ })[3]);
    const dialog = await screen.findByRole("dialog", { name: "HG HUB" });
    expect(within(dialog).getAllByText(/Internal release/).length).toBeGreaterThan(0);
    expect(within(dialog).queryByRole("link")).not.toBeInTheDocument();
  });
});
