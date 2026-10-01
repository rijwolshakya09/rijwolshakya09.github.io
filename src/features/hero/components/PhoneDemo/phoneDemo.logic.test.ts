import { describe, expect, it } from "vitest";
import {
  TICKET_STEPS,
  initialTicketState,
  ticketReducer,
  isTicketComplete,
  initialPaymentState,
  paymentReducer,
  type PaymentState,
} from "./phoneDemo.logic";

describe("ticketReducer", () => {
  it("starts at Assigned", () => {
    expect(TICKET_STEPS[initialTicketState.stepIndex]).toBe("Assigned");
  });

  it("advances one step per refresh and stops at Completed", () => {
    let s = initialTicketState;
    s = ticketReducer(s, { type: "refresh" });
    expect(TICKET_STEPS[s.stepIndex]).toBe("On the way");
    s = ticketReducer(s, { type: "refresh" });
    expect(isTicketComplete(s)).toBe(true);
    const again = ticketReducer(s, { type: "refresh" });
    expect(again).toBe(s);
  });

  it("reset returns to the initial step", () => {
    const done = { stepIndex: TICKET_STEPS.length - 1 };
    expect(ticketReducer(done, { type: "reset" })).toEqual(initialTicketState);
  });
});

describe("paymentReducer", () => {
  it("rejects pay without a gateway", () => {
    expect(paymentReducer(initialPaymentState, { type: "pay" })).toBe(initialPaymentState);
  });

  it("goes idle → processing → received → idle", () => {
    let s: PaymentState = paymentReducer(initialPaymentState, { type: "select", gateway: "Khalti" });
    expect(s).toEqual({ status: "idle", gateway: "Khalti" });
    s = paymentReducer(s, { type: "pay" });
    expect(s).toEqual({ status: "processing", gateway: "Khalti" });
    s = paymentReducer(s, { type: "settle" });
    expect(s).toEqual({ status: "received", gateway: "Khalti" });
    s = paymentReducer(s, { type: "reset" });
    expect(s).toEqual(initialPaymentState);
  });

  it("ignores a second pay while processing (double tap)", () => {
    const processing: PaymentState = { status: "processing", gateway: "eSewa" };
    expect(paymentReducer(processing, { type: "pay" })).toBe(processing);
  });

  it("ignores gateway changes while processing and settle while idle", () => {
    const processing: PaymentState = { status: "processing", gateway: "eSewa" };
    expect(paymentReducer(processing, { type: "select", gateway: "Khalti" })).toBe(processing);
    expect(paymentReducer(initialPaymentState, { type: "settle" })).toBe(initialPaymentState);
  });
});
