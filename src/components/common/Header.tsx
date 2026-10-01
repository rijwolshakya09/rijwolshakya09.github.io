"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { CV_PATH, NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1));

export function Header() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  const dir = useScrollDirection();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    sheetRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    // The sheet is md:hidden — if the viewport grows (e.g. tablet rotation), close it so scroll isn't stuck locked.
    const desktop = window.matchMedia("(min-width: 768px)");
    const onViewportChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    desktop.addEventListener("change", onViewportChange);
    return () => {
      document.body.style.overflow = "";
      desktop.removeEventListener("change", onViewportChange);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    toggleRef.current?.focus();
  };

  const onSheetKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
      return;
    }
    if (e.key !== "Tab" || !sheetRef.current) return;
    const items = sheetRef.current.querySelectorAll<HTMLElement>("a, button");
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <motion.header
      className="fixed inset-x-0 top-3.5 z-50 flex justify-center px-4"
      animate={{ y: dir === "down" && !open ? -96 : 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
    >
      <div className="nav-pill">
        <a href="#hero" className="grad mr-2 font-display text-base font-extrabold" aria-label="RS, back to top">
          RS
        </a>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center">
            {NAV_LINKS.map((l) => {
              const isActive = active === l.href.slice(1);
              return (
                <li key={l.href}>
                  <a href={l.href} aria-current={isActive ? "true" : undefined} className="nav-link isolate">
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="nav-active"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        aria-hidden
                      />
                    )}
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <a href={CV_PATH} download className="nav-link hidden md:inline-flex">
          CV ↓
        </a>
        <ThemeToggle />
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="flex h-12 w-12 items-center justify-center rounded-full text-foreground md:hidden"
        >
          <Menu size={20} aria-hidden />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
              aria-hidden
            />
            <motion.div
              key="sheet"
              ref={sheetRef}
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              onKeyDown={onSheetKeyDown}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className={cn("sheet fixed inset-x-0 bottom-0 z-50 rounded-t-3xl px-4 pb-8 pt-4 md:hidden")}
            >
              <ul className="flex flex-col">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} onClick={() => setOpen(false)} className="flex min-h-14 items-center rounded-xl px-3 font-display text-2xl font-extrabold">
                      {l.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a href={CV_PATH} download className="grad flex min-h-14 items-center rounded-xl px-3 text-lg font-bold">
                    Download CV
                  </a>
                </li>
              </ul>
              <button
                type="button"
                onClick={close}
                aria-label="Close menu"
                className="absolute right-3 top-3 flex h-12 w-12 items-center justify-center rounded-full"
              >
                <X size={20} aria-hidden />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
