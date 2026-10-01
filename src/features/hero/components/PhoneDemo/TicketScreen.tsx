"use client";

import { useReducer } from "react";
import { cn } from "@/lib/utils";
import {
  TICKET_COPY,
  TICKET_STEPS,
  initialTicketState,
  isTicketComplete,
  ticketReducer,
} from "./phoneDemo.logic";

export function TicketScreen({ onAnnounce }: { onAnnounce: (message: string) => void }) {
  const [state, dispatch] = useReducer(ticketReducer, initialTicketState);
  const step = TICKET_STEPS[state.stepIndex];
  const done = isTicketComplete(state);

  const refresh = () => {
    const next = ticketReducer(state, { type: "refresh" });
    dispatch({ type: "refresh" });
    onAnnounce(TICKET_COPY[TICKET_STEPS[next.stepIndex]].announcement);
  };

  return (
    <div className="flex h-full flex-col">
      <p className="text-base font-semibold">Technician visit</p>
      <p className="text-xs text-muted">Ticket #48213 · Set-top box not powering on</p>

      <ol className="mt-5 flex gap-1" aria-label="Visit progress">
        {TICKET_STEPS.map((s, i) => (
          <li key={s} className="flex-1">
            <span
              className={cn(
                "block h-1.5 rounded-full",
                i < state.stepIndex || done ? "bg-live" : i === state.stepIndex ? "bg-primary" : "bg-line"
              )}
            />
            <span className="sr-only">
              {s}
              {i < state.stepIndex || (done && i === state.stepIndex) ? " (done)" : i === state.stepIndex ? " (current)" : ""}
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-xs text-muted">
        Step {state.stepIndex + 1} of {TICKET_STEPS.length}
      </p>

      <div className="mt-4 rounded-2xl bg-background p-4">
        <p className="font-display text-xl font-extrabold">{step}</p>
        <p className="mt-1 text-sm text-muted">{TICKET_COPY[step].detail}</p>
      </div>

      <div className="mt-auto flex flex-col gap-2">
        <button
          type="button"
          onClick={refresh}
          disabled={done}
          className="min-h-12 rounded-xl bg-primary text-sm font-semibold text-on-primary disabled:opacity-40"
        >
          Refresh status
        </button>
        {done && (
          <button
            type="button"
            onClick={() => {
              dispatch({ type: "reset" });
              onAnnounce("Demo reset");
            }}
            className="min-h-12 rounded-xl text-sm font-semibold text-primary"
          >
            Start over
          </button>
        )}
      </div>
    </div>
  );
}
