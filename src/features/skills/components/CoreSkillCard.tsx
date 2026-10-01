"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { usePointerVars } from "@/hooks/usePointerVars";
import { TechLogo } from "@/components/ui/TechLogo";
import { cn } from "@/lib/utils";
import type { CoreSkill } from "../types";

export function CoreSkillCard({ skill }: { skill: CoreSkill }) {
  const card = usePointerVars<HTMLDivElement>();
  const ring = useRef<HTMLSpanElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ring.current;
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
    <div ref={card} className="glass tile cc">
      <span
        ref={ring}
        className="ring2"
        data-on={on}
        style={{ "--v": skill.value } as CSSProperties}
        role="meter"
        aria-label={`${skill.name} proficiency`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={skill.value}
      >
        <TechLogo name={skill.icon} size={38} />
      </span>
      <b>{skill.name}</b>
      <em className={cn("lv", skill.level === "Primary" && "p", skill.level === "Beginner" && "g")}>{skill.level}</em>
    </div>
  );
}
