"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TicketScreen } from "./TicketScreen";
import { PayScreen } from "./PayScreen";
import { AlertsScreen } from "./AlertsScreen";

const TABS = [
  { id: "ticket", label: "Ticket" },
  { id: "pay", label: "Pay" },
  { id: "alerts", label: "Alerts" },
] as const;
type TabId = (typeof TABS)[number]["id"];

export function PhoneDemo() {
  const [active, setActive] = useState<TabId>("ticket");
  const [announcement, setAnnouncement] = useState("");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const select = (index: number) => {
    const wrapped = (index + TABS.length) % TABS.length;
    setActive(TABS[wrapped].id);
    tabRefs.current[wrapped]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key === "ArrowRight") select(index + 1);
    else if (e.key === "ArrowLeft") select(index - 1);
    else if (e.key === "Home") select(0);
    else if (e.key === "End") select(TABS.length - 1);
    else return;
    e.preventDefault();
  };

  return (
    <figure className="flex flex-col items-center">
      <div className="w-[260px] rounded-[36px] bg-[#14202b] p-2.5 shadow-[0_30px_60px_-24px_rgba(20,32,43,0.55)] sm:w-[280px] dark:bg-[#05090e] dark:ring-1 dark:ring-line">
        <div className="relative h-[500px] overflow-hidden rounded-[28px] bg-surface px-4 pb-4 pt-3 text-foreground sm:h-[540px]">
          <div aria-hidden className="mx-auto mb-4 h-1.5 w-16 rounded-full bg-foreground/80" />
          {TABS.map((t) => (
            <div
              key={t.id}
              id={`phone-panel-${t.id}`}
              role="tabpanel"
              aria-labelledby={`phone-tab-${t.id}`}
              hidden={active !== t.id}
              className="h-[calc(100%-1.75rem)]"
            >
              {t.id === "ticket" && <TicketScreen onAnnounce={setAnnouncement} />}
              {t.id === "pay" && <PayScreen onAnnounce={setAnnouncement} />}
              {t.id === "alerts" && <AlertsScreen onAnnounce={setAnnouncement} />}
            </div>
          ))}
        </div>
      </div>

      <div role="tablist" aria-label="Demo screens" className="mt-5 flex rounded-full border border-line bg-surface p-1">
        {TABS.map((t, i) => {
          const selected = active === t.id;
          return (
            <button
              key={t.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={`phone-tab-${t.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`phone-panel-${t.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(t.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                "relative min-h-12 min-w-20 rounded-full px-4 text-sm font-semibold transition-colors",
                selected ? "text-on-primary" : "text-muted hover:text-foreground"
              )}
            >
              {selected && (
                <motion.span
                  layoutId="phone-tab-indicator"
                  className="absolute inset-0 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  aria-hidden
                />
              )}
              <span className="relative">{t.label}</span>
            </button>
          );
        })}
      </div>

      <figcaption className="mt-3 text-center text-sm text-muted">
        Flows I built for a production billing app. Tap to try.
      </figcaption>
      <p role="status" aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </figure>
  );
}
