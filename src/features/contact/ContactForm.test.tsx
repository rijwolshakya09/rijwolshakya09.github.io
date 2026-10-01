import { describe, expect, it, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "./components/ContactForm";

afterEach(() => vi.unstubAllGlobals());

async function fillValid(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText("Name"), "Ada Lovelace");
  await user.type(screen.getByLabelText("Email"), "ada@example.com");
  await user.type(screen.getByLabelText("Subject"), "Booking app");
  await user.type(screen.getByLabelText("Message"), "I need a Flutter booking app, about ten screens.");
}

describe("ContactForm", () => {
  it("shows field errors on an empty submit", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.click(screen.getByRole("button", { name: "Send message" }));
    expect(await screen.findByText("Name must be at least 2 characters")).toBeInTheDocument();
    expect(screen.getByText("Please enter a valid email address")).toBeInTheDocument();
  });

  it("shows the email fallback when Formspree fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillValid(user);
    await user.click(screen.getByRole("button", { name: "Send message" }));
    expect(await screen.findByText(/Couldn't send your message/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "shakyarijwol19@gmail.com" })).toHaveAttribute(
      "href",
      "mailto:shakyarijwol19@gmail.com"
    );
  });

  it("sends exactly one request on a double click", async () => {
    let resolve: (v: { ok: boolean }) => void = () => {};
    const fetchMock = vi.fn(() => new Promise<{ ok: boolean }>((r) => (resolve = r)));
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillValid(user);
    const send = screen.getByRole("button", { name: "Send message" });
    await user.dblClick(send);
    resolve({ ok: true });
    expect(await screen.findByText(/Message sent/)).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
