"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EXPERIENCE_DATA } from "../data/experience.data";
import { EDUCATION_DATA } from "../data/education.data";
import { Timeline, type TimelineItem } from "./Timeline";

const TABS = [
  { id: "work", label: "Experience" },
  { id: "edu", label: "Education" },
] as const;
type TabId = (typeof TABS)[number]["id"];

const WORK: TimelineItem[] = EXPERIENCE_DATA.map((e) => ({
  id: e.id,
  period: e.period,
  title: e.role,
  org: `${e.company} · ${e.location}`,
  bullets: e.responsibilities,
  tags: e.tags,
}));

const EDU: TimelineItem[] = EDUCATION_DATA.map((e) => ({
  id: e.id,
  period: e.period,
  title: e.degree,
  org: e.institution,
  bullets: [e.focus],
}));

export function ExperienceSection() {
  const [tab, setTab] = useState<TabId>("work");
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const select = (i: number) => {
    const n = (i + TABS.length) % TABS.length;
    setTab(TABS[n].id);
    refs.current[n]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key === "ArrowRight") select(i + 1);
    else if (e.key === "ArrowLeft") select(i - 1);
    else if (e.key === "Home") select(0);
    else if (e.key === "End") select(TABS.length - 1);
    else return;
    e.preventDefault();
  };

  return (
    <section id="experience" aria-labelledby="experience-heading" className="aurora-section">
      <SectionHeader id="experience-heading" eyebrow="Experience" title="Where I've" highlight="worked" lead="Where I've worked and what I've studied." center />
      <div className="text-center">
        <div role="tablist" aria-label="Experience or education" className="tabs isolate">
          {TABS.map((t, i) => {
            const selected = tab === t.id;
            return (
              <button
                key={t.id}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                id={`tab-${t.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`panel-${t.id}`}
                tabIndex={selected ? 0 : -1}
                className="tb"
                onClick={() => setTab(t.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
              >
                {selected && (
                  <motion.span layoutId="exp-tab" className="tabpill" transition={{ type: "spring", stiffness: 420, damping: 28 }} aria-hidden />
                )}
                {t.label}
              </button>
            );
          })}
        </div>
      </div>
      <div id="panel-work" role="tabpanel" aria-labelledby="tab-work" hidden={tab !== "work"}>
        <Timeline items={WORK} tone="cyan" />
      </div>
      <div id="panel-edu" role="tabpanel" aria-labelledby="tab-edu" hidden={tab !== "edu"}>
        <Timeline items={EDU} tone="fuchsia" />
      </div>
    </section>
  );
}
