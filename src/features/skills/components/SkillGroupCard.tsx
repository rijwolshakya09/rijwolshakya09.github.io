import { TechLogo } from "@/components/ui/TechLogo";
import type { Accent, SkillGroup } from "../types";

const ACCENT: Record<Accent, string> = {
  indigo: "var(--indigo)",
  cyan: "var(--cyan)",
  fuchsia: "var(--fuchsia)",
  emerald: "var(--emerald)",
  amber: "oklch(0.77 0.16 70)",
  sky: "oklch(0.75 0.14 230)",
  rose: "oklch(0.7 0.19 10)",
  violet: "oklch(0.7 0.16 295)",
};

export function SkillGroupCard({ group }: { group: SkillGroup }) {
  return (
    <div className="glass scard h-full">
      <h3>
        <i aria-hidden="true" style={{ background: `color-mix(in oklab, ${ACCENT[group.accent]} 22%, transparent)` }}>
          {group.emoji}
        </i>
        {group.title}
      </h3>
      <ul className="flex flex-wrap">
        {group.skills.map((s) => (
          <li key={s.name} className="sk">
            {s.icon && <TechLogo name={s.icon} size={16} />}
            {s.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
