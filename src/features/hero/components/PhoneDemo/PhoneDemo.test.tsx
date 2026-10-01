import { describe, expect, it, vi, afterEach } from "vitest";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PhoneDemo } from "./PhoneDemo";

afterEach(() => vi.useRealTimers());

describe("PhoneDemo", () => {
  it("shows the Ticket screen first and switches tabs on click", async () => {
    render(<PhoneDemo />);
    const ticket = screen.getByRole("tab", { name: "Ticket" });
    expect(ticket).toHaveAttribute("aria-selected", "true");
    await userEvent.click(screen.getByRole("tab", { name: "Pay" }));
    expect(screen.getByRole("tab", { name: "Pay" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel", { name: "Pay" })).toBeVisible();
  });

  it("moves between tabs with arrow keys", async () => {
    render(<PhoneDemo />);
    screen.getByRole("tab", { name: "Ticket" }).focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Pay" })).toHaveFocus();
    expect(screen.getByRole("tab", { name: "Pay" })).toHaveAttribute("aria-selected", "true");
    await userEvent.keyboard("{ArrowLeft}{ArrowLeft}");
    expect(screen.getByRole("tab", { name: "Alerts" })).toHaveFocus();
  });

  it("advances the ticket and announces it", async () => {
    render(<PhoneDemo />);
    await userEvent.click(screen.getByRole("button", { name: "Refresh status" }));
    expect(screen.getByRole("status")).toHaveTextContent("Technician on the way");
    await userEvent.click(screen.getByRole("button", { name: "Refresh status" }));
    expect(screen.getByRole("button", { name: "Refresh status" })).toBeDisabled();
  });

  it("pays once, announces, and survives a tab switch mid-payment", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<PhoneDemo />);
    await user.click(screen.getByRole("tab", { name: "Pay" }));
    const pay = screen.getByRole("button", { name: /^Pay Rs/ });
    expect(pay).toBeDisabled();
    await user.click(screen.getByRole("radio", { name: "Khalti" }));
    await user.click(pay);
    expect(screen.getByRole("button", { name: "Processing…" })).toBeDisabled();
    await user.click(screen.getByRole("tab", { name: "Alerts" }));
    await act(async () => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByRole("status")).toHaveTextContent("Payment received via Khalti");
    await user.click(screen.getByRole("tab", { name: "Pay" }));
    expect(screen.getAllByText("Payment received")).toHaveLength(1);
  });

  it("never shows DishHome branding", () => {
    const { container } = render(<PhoneDemo />);
    expect(container.textContent ?? "").not.toMatch(/dish/i);
  });
});
