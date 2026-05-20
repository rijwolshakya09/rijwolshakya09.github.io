"use client";

import { motion } from "framer-motion";
import {
  Smartphone, Layers, Building2, Server, Database,
  Monitor, Wrench, Code2
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SKILLS_DATA } from "../data/skills.data";
import { assetPath } from "@/lib/assets";

const ICON_MAP: Record<string, React.ElementType> = {
  smartphone: Smartphone,
  layers: Layers,
  building2: Building2,
  server: Server,
  database: Database,
  monitor: Monitor,
  wrench: Wrench,
  code2: Code2,
};

/* Map skill names to local SVG icons */
const SKILL_ICON: Record<string, string> = {
  Flutter: assetPath("/icons/flutter.svg"),
  Dart: assetPath("/icons/dart.svg"),
  React: assetPath("/icons/react.svg"),
  "React Native": assetPath("/icons/react.svg"),
  Firebase: assetPath("/icons/firebase.svg"),
  TypeScript: assetPath("/icons/typescript.svg"),
  "Node.js": assetPath("/icons/nodedotjs.svg"),
  Git: assetPath("/icons/git.svg"),
  Figma: assetPath("/icons/figma.svg"),
  Supabase: assetPath("/icons/supabase.svg"),
  "React Redux": assetPath("/icons/redux.svg"),
  Redux: assetPath("/icons/redux.svg"),
  MongoDB: assetPath("/icons/mongodb.svg"),
  MySQL: assetPath("/icons/mysql.svg"),
};

const PRIMARY_SKILLS = [
  { name: "Flutter", icon: assetPath("/icons/flutter.svg"), label: "Primary" },
  { name: "Dart", icon: assetPath("/icons/dart.svg"), label: "Primary" },
  { name: "React Native", icon: assetPath("/icons/react.svg"), label: "Proficient" },
  { name: "Firebase", icon: assetPath("/icons/firebase.svg"), label: "Proficient" },
  { name: "TypeScript", icon: assetPath("/icons/typescript.svg"), label: "Proficient" },
  { name: "Node.js", icon: assetPath("/icons/nodedotjs.svg"), label: "Growing" },
  { name: "Figma", icon: assetPath("/icons/figma.svg"), label: "Proficient" },
  { name: "Git", icon: assetPath("/icons/git.svg"), label: "Proficient" },
];

export function SkillsSection() {
  const reduced = useReducedMotion();

  return (
    <section id="skills" className="section" aria-labelledby="skills-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Skills"
          title="Technical Expertise"
          description="Full-stack mobile developer with depth in Flutter and breadth across modern web and backend technologies."
        />

        {/* Primary tech infographic */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted text-center">Core Technologies</p>
          <div className="grid grid-cols-4 gap-4 sm:grid-cols-8">
            {PRIMARY_SKILLS.map(({ name, icon, label }) => (
              <motion.div
                key={name}
                whileHover={reduced ? {} : { scale: 1.08, y: -4 }}
                transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-surface shadow-sm transition-all duration-200 group-hover:border-primary/40 group-hover:shadow-md group-hover:shadow-primary/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={icon} alt={name} width={30} height={30} className="h-7 w-7 object-contain" loading="lazy" />
                </div>
                <p className="text-xs font-medium text-foreground text-center leading-tight">{name}</p>
                <span className={`text-[10px] font-medium ${
                  label === "Primary" ? "text-primary" :
                  label === "Proficient" ? "text-accent" : "text-muted"
                }`}>
                  {label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <div className="mb-10 flex items-center gap-4">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs font-semibold uppercase tracking-widest text-muted">All Skills</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Skill groups grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SKILLS_DATA.map((group, i) => {
            const Icon = ICON_MAP[group.icon] ?? Code2;
            return (
              <motion.div
                key={group.category}
                initial={reduced ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring" as const,
                  stiffness: 100,
                  damping: 18,
                  delay: reduced ? 0 : i * 0.07,
                }}
              >
                <GlassCard className="h-full p-5">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <Icon size={18} className="text-primary" aria-hidden />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground">{group.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2" role="list" aria-label={`${group.category} skills`}>
                    {group.skills.map((skill) => (
                      <div key={skill} className="flex items-center gap-1.5" role="listitem">
                        {SKILL_ICON[skill] && (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={SKILL_ICON[skill]}
                            alt=""
                            width={14}
                            height={14}
                            className="h-3.5 w-3.5 object-contain"
                            aria-hidden
                            loading="lazy"
                          />
                        )}
                        <Badge variant="muted">{skill}</Badge>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
