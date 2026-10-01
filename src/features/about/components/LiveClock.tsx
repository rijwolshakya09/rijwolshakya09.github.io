"use client";

import { useEffect, useState } from "react";
import { formatKathmanduTime } from "@/lib/motion";

/** Server renders a placeholder (build time ≠ visit time); the real time is set after mount to avoid a hydration mismatch. */
export function LiveClock() {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const update = () => setTime(formatKathmanduTime(new Date()));
    update();
    const id = window.setInterval(update, 10_000);
    return () => window.clearInterval(id);
  }, []);

  return <time className="clock">{time}</time>;
}
