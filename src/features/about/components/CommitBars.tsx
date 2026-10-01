"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const BARS = [
  { label: "feat", value: 189, width: "62%", fill: "linear-gradient(90deg, var(--indigo), color-mix(in oklab, var(--indigo) 60%, white))" },
  { label: "fix", value: 89, width: "29%", fill: "linear-gradient(90deg, var(--cyan), color-mix(in oklab, var(--cyan) 60%, white))" },
  { label: "refactor", value: 29, width: "10%", fill: "linear-gradient(90deg, var(--fuchsia), color-mix(in oklab, var(--fuchsia) 60%, white))" },
];

export function CommitBars() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setOn(true);
        io.disconnect();
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="bars" data-on={on}>
      {BARS.map((b) => (
        <div key={b.label}>
          <span>{b.label}</span>
          <i>
            <em style={{ "--w": b.width, background: b.fill } as CSSProperties} />
          </i>
          <b>{b.value}</b>
        </div>
      ))}
    </div>
  );
}
