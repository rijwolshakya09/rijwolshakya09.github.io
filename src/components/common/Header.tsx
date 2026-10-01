"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Container } from "@/components/ui/Container";
import { buttonStyles } from "@/components/ui/Button";
import { useActiveSection } from "@/hooks/useActiveSection";
import { CV_PATH, NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1));

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    sheetRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    return () => {
      document.body.style.overflow = "";
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
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors",
        scrolled ? "border-line bg-background" : "border-transparent bg-transparent"
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        <a href="#hero" className="flex min-h-12 items-center font-display text-lg font-extrabold">
          Rijwol Shakya
        </a>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={active === l.href.slice(1) ? "true" : undefined}
                  className={cn(
                    "flex min-h-12 items-center rounded-full px-4 text-sm font-medium transition-colors",
                    active === l.href.slice(1) ? "text-primary" : "text-muted hover:text-foreground"
                  )}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <a href={CV_PATH} download className={buttonStyles({ variant: "outline", size: "sm", className: "hidden md:inline-flex" })}>
            CV
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
      </Container>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              className="fixed inset-0 z-40 bg-foreground/40 md:hidden"
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
              className="fixed inset-x-0 bottom-0 z-50 rounded-t-3xl border-t border-line bg-surface px-4 pb-8 pt-4 md:hidden"
            >
              <ul className="flex flex-col">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex min-h-14 items-center rounded-xl px-3 font-display text-2xl font-extrabold"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a href={CV_PATH} download className="flex min-h-14 items-center rounded-xl px-3 text-lg font-semibold text-primary">
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
    </header>
  );
}
