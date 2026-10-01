import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";

vi.mock("next-themes", () => ({ useTheme: () => ({ resolvedTheme: "light", setTheme: vi.fn() }) }));

import Home from "./page";

describe("Home", () => {
  it("renders every section in order", () => {
    const { container } = render(<Home />);
    const ids = [...container.querySelectorAll("main section[id]")].map((s) => s.id);
    expect(ids).toEqual(["hero", "about", "work", "experience", "skills", "contact"]);
  });
});
