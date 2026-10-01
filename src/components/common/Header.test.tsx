import { describe, expect, it, vi } from "vitest";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("next-themes", () => ({ useTheme: () => ({ resolvedTheme: "light", setTheme: vi.fn() }) }));

import { Header } from "./Header";
import { ScrollProgress } from "./ScrollProgress";

describe("Header mobile menu", () => {
  it("opens a dialog, locks scroll, and closes on Esc with focus restored", async () => {
    const user = userEvent.setup();
    render(<Header />);
    const toggle = screen.getByRole("button", { name: "Open menu" });
    await user.click(toggle);

    const dialog = screen.getByRole("dialog", { name: "Menu" });
    expect(dialog).toBeInTheDocument();
    expect(document.body.style.overflow).toBe("hidden");
    await waitFor(() => expect(screen.getAllByRole("link", { name: "About" }).at(-1)).toHaveFocus());

    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(document.body.style.overflow).toBe("");
    expect(screen.getByRole("button", { name: "Open menu" })).toHaveFocus();
  });

  it("lists every section as an in-page link", () => {
    render(<Header />);
    for (const [name, href] of [["About", "#about"], ["Work", "#work"], ["Experience", "#experience"], ["Skills", "#skills"], ["Contact", "#contact"]]) {
      expect(screen.getAllByRole("link", { name })[0]).toHaveAttribute("href", href);
    }
  });

  it("renders the scroll progress bar hidden from assistive tech", () => {
    const { container } = render(<><ScrollProgress /><Header /></>);
    expect(container.querySelector("[data-progress]")).toHaveAttribute("aria-hidden", "true");
  });

  it("closes and unlocks scroll when the viewport grows past the mobile breakpoint", async () => {
    let onDesktop: ((e: MediaQueryListEvent) => void) | null = null;
    const original = window.matchMedia;
    window.matchMedia = ((query: string) =>
      ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: (_type: string, l: (e: MediaQueryListEvent) => void) => {
          if (query === "(min-width: 768px)") onDesktop = l;
        },
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
      }) as unknown as MediaQueryList) as typeof window.matchMedia;

    try {
      const user = userEvent.setup();
      render(<Header />);
      await user.click(screen.getByRole("button", { name: "Open menu" }));
      expect(document.body.style.overflow).toBe("hidden");

      act(() => onDesktop?.({ matches: true } as MediaQueryListEvent));

      await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
      expect(document.body.style.overflow).toBe("");
    } finally {
      window.matchMedia = original;
    }
  });
});
