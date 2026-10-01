"use client";

import { useEffect, useRef } from "react";

/** Writes pointer position into CSS vars: --x/--y (px) and --px/--py (-0.5..0.5) for glow and tilt effects. */
export function usePointerVars<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const b = el.getBoundingClientRect();
        el.style.setProperty("--x", `${e.clientX - b.left}px`);
        el.style.setProperty("--y", `${e.clientY - b.top}px`);
        el.style.setProperty("--px", `${(e.clientX - b.left) / b.width - 0.5}`);
        el.style.setProperty("--py", `${(e.clientY - b.top) / b.height - 0.5}`);
      });
    };
    const onLeave = () => {
      el.style.setProperty("--px", "0");
      el.style.setProperty("--py", "0");
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return ref;
}
