import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("next-themes", () => ({ useTheme: () => ({ resolvedTheme: "light", setTheme: vi.fn() }) }));

import { Header } from "./Header";

describe("Header mobile menu", () => {
  it("opens a dialog, locks scroll, and closes on Esc with focus restored", async () => {
    const user = userEvent.setup();
    render(<Header />);
    const toggle = screen.getByRole("button", { name: "Open menu" });
    await user.click(toggle);

    const dialog = screen.getByRole("dialog", { name: "Menu" });
    expect(dialog).toBeInTheDocument();
    expect(document.body.style.overflow).toBe("hidden");
    await waitFor(() => expect(screen.getAllByRole("link", { name: "Work" }).at(-1)).toHaveFocus());

    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(document.body.style.overflow).toBe("");
    expect(screen.getByRole("button", { name: "Open menu" })).toHaveFocus();
  });

  it("lists Work, Experience and Contact as in-page links", () => {
    render(<Header />);
    expect(screen.getAllByRole("link", { name: "Work" })[0]).toHaveAttribute("href", "#work");
    expect(screen.getAllByRole("link", { name: "Experience" })[0]).toHaveAttribute("href", "#experience");
    expect(screen.getAllByRole("link", { name: "Contact" })[0]).toHaveAttribute("href", "#contact");
  });
});
