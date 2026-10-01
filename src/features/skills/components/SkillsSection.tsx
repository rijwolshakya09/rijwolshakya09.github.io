import type { CSSProperties } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CORE_SKILLS, SKILL_GROUPS } from "../data/skills.data";
import { CoreSkillCard } from "./CoreSkillCard";
import { SkillGroupCard } from "./SkillGroupCard";

export function SkillsSection() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="aurora-section">
      <div aria-hidden="true" className="blob" style={{ width: 380, height: 380, "--c": "var(--fuchsia)", right: -140, top: 120, opacity: 0.18 } as CSSProperties} />
      <SectionHeader
        id="skills-heading"
        eyebrow="Skills"
        title="My"
        highlight="toolkit"
        lead="The technologies I use to take an app from Figma to the Play Store and App Store, and the level I work at with each."
      />
      <Reveal>
        <h3 className="subh">Core technologies</h3>
      </Reveal>
      <div className="core">
        {CORE_SKILLS.map((s, i) => (
          <Reveal key={s.name} delay={(i % 4) * 80}>
            <CoreSkillCard skill={s} />
          </Reveal>
        ))}
      </div>
      <Reveal>
        <h3 className="subh mt-12">Everything I work with</h3>
      </Reveal>
      <div className="sgrid4">
        {SKILL_GROUPS.map((g, i) => (
          <Reveal key={g.title} delay={(i % 4) * 80}>
            <SkillGroupCard group={g} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
