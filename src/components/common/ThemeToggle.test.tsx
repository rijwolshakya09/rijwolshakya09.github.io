import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockTheme = vi.hoisted(() => ({ resolvedTheme: "dark", setTheme: vi.fn() }));
vi.mock("next-themes", () => ({
  useTheme: () => ({ theme: "system", resolvedTheme: mockTheme.resolvedTheme, setTheme: mockTheme.setTheme }),
}));

import { ThemeToggle } from "./ThemeToggle";

const setTheme = mockTheme.setTheme;

describe("ThemeToggle", () => {
  beforeEach(() => setTheme.mockClear());

  it("switches to light when the system theme resolves to dark", async () => {
    mockTheme.resolvedTheme = "dark";
    render(<ThemeToggle />);
    await userEvent.click(screen.getByRole("button", { name: "Switch to light mode" }));
    expect(setTheme).toHaveBeenCalledWith("light");
  });

  it("switches to dark when the system theme resolves to light", async () => {
    mockTheme.resolvedTheme = "light";
    render(<ThemeToggle />);
    await userEvent.click(screen.getByRole("button", { name: "Switch to dark mode" }));
    expect(setTheme).toHaveBeenCalledWith("dark");
  });
});
