"use client";

import { useRef, type CSSProperties } from "react";
import { motion, useScroll } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export interface TimelineItem {
  id: string;
  period: string;
  title: string;
  org: string;
  bullets: string[];
  tags?: string[];
}

export function Timeline({ items, tone }: { items: TimelineItem[]; tone: "cyan" | "fuchsia" }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });

  return (
    <div ref={ref} className="tl" style={{ "--tone": `var(--${tone})` } as CSSProperties}>
      <div className="line" aria-hidden="true">
        <motion.i style={{ scaleY: scrollYProgress }} />
      </div>
      <ol>
        {items.map((item, i) => (
          <Reveal as="li" key={item.id} className={cn("glass job", i % 2 === 1 && "r")}>
            <span className="dot" aria-hidden="true" />
            <small>{item.period}</small>
            <h3>{item.title}</h3>
            <div className="co">{item.org}</div>
            <ul>
              {item.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            {item.tags && (
              <div className="tags">
                {item.tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
