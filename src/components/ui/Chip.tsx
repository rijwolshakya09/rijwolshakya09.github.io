import type { ReactNode } from "react";

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-lg border border-line px-2.5 py-1 text-sm text-muted">
      {children}
    </span>
  );
}
