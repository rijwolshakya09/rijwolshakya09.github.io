export const TICKET_STEPS = ["Booked", "Assigned", "On the way", "Completed"] as const;
export type TicketStep = (typeof TICKET_STEPS)[number];

export const TICKET_COPY: Record<TicketStep, { announcement: string; detail: string }> = {
  Booked: { announcement: "Visit booked", detail: "We've received your request." },
  Assigned: { announcement: "Technician assigned", detail: "A technician has been assigned to your visit." },
  "On the way": { announcement: "Technician on the way", detail: "Your technician is on the way. ETA 25 min." },
  Completed: { announcement: "Visit completed", detail: "Visit completed. Thanks for your patience." },
};

export interface TicketState {
  stepIndex: number;
}
export type TicketAction = { type: "refresh" } | { type: "reset" };

export const initialTicketState: TicketState = { stepIndex: 1 };

export function isTicketComplete(state: TicketState): boolean {
  return state.stepIndex >= TICKET_STEPS.length - 1;
}

export function ticketReducer(state: TicketState, action: TicketAction): TicketState {
  switch (action.type) {
    case "refresh":
      return isTicketComplete(state) ? state : { stepIndex: state.stepIndex + 1 };
    case "reset":
      return initialTicketState;
  }
}

export const GATEWAYS = ["eSewa", "Khalti", "FonePay"] as const;
export type Gateway = (typeof GATEWAYS)[number];

export type PaymentState =
  | { status: "idle"; gateway: Gateway | null }
  | { status: "processing"; gateway: Gateway }
  | { status: "received"; gateway: Gateway };

export type PaymentAction =
  | { type: "select"; gateway: Gateway }
  | { type: "pay" }
  | { type: "settle" }
  | { type: "reset" };

export const initialPaymentState: PaymentState = { status: "idle", gateway: null };
export const PROCESSING_MS = 900;
export const BILL_AMOUNT = "Rs 1,150";

export function paymentReducer(state: PaymentState, action: PaymentAction): PaymentState {
  switch (action.type) {
    case "select":
      return state.status === "idle" ? { status: "idle", gateway: action.gateway } : state;
    case "pay":
      return state.status === "idle" && state.gateway ? { status: "processing", gateway: state.gateway } : state;
    case "settle":
      return state.status === "processing" ? { status: "received", gateway: state.gateway } : state;
    case "reset":
      return initialPaymentState;
  }
}
