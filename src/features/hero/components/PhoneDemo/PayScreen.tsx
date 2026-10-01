"use client";

import { useEffect, useReducer } from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  BILL_AMOUNT,
  GATEWAYS,
  PROCESSING_MS,
  initialPaymentState,
  paymentReducer,
} from "./phoneDemo.logic";

export function PayScreen({ onAnnounce }: { onAnnounce: (message: string) => void }) {
  const [state, dispatch] = useReducer(paymentReducer, initialPaymentState);

  useEffect(() => {
    if (state.status !== "processing") return;
    const gateway = state.gateway;
    const id = window.setTimeout(() => {
      dispatch({ type: "settle" });
      onAnnounce(`Payment received via ${gateway}`);
    }, PROCESSING_MS);
    return () => window.clearTimeout(id);
  }, [state, onAnnounce]);

  if (state.status === "received") {
    return (
      <div className="flex h-full flex-col items-center justify-center text-center">
        <CheckCircle2 size={44} className="text-live" aria-hidden />
        <p className="mt-3 font-display text-xl font-extrabold">Payment received</p>
        <p className="mt-1 text-sm text-muted">
          {BILL_AMOUNT} via {state.gateway}
        </p>
        <button
          type="button"
          onClick={() => dispatch({ type: "reset" })}
          className="mt-6 min-h-12 rounded-xl px-5 text-sm font-semibold text-primary"
        >
          Pay again
        </button>
      </div>
    );
  }

  const processing = state.status === "processing";
  return (
    <div className="flex h-full flex-col">
      <p className="text-base font-semibold">Pay your bill</p>
      <p className="text-xs text-muted">Monthly TV + internet</p>
      <p className="mt-4 font-display text-3xl font-extrabold tabular-nums">{BILL_AMOUNT}</p>

      <fieldset className="mt-5" disabled={processing}>
        <legend className="mb-2 text-xs text-muted">Pay with</legend>
        <div className="flex flex-col gap-2">
          {GATEWAYS.map((g) => (
            <label
              key={g}
              className={cn(
                "flex min-h-12 cursor-pointer items-center justify-between rounded-xl bg-background px-3 text-sm",
                state.gateway === g && "ring-2 ring-primary"
              )}
            >
              {g}
              <input
                type="radio"
                name="gateway"
                value={g}
                checked={state.gateway === g}
                onChange={() => dispatch({ type: "select", gateway: g })}
                className="h-4 w-4 accent-[var(--primary)]"
              />
            </label>
          ))}
        </div>
      </fieldset>

      <button
        type="button"
        disabled={!state.gateway || processing}
        onClick={() => {
          dispatch({ type: "pay" });
          if (state.gateway) onAnnounce(`Processing payment via ${state.gateway}`);
        }}
        className="mt-auto min-h-12 rounded-xl bg-primary text-sm font-semibold text-on-primary disabled:opacity-40"
      >
        {processing ? "Processing…" : `Pay ${BILL_AMOUNT}`}
      </button>
    </div>
  );
}
