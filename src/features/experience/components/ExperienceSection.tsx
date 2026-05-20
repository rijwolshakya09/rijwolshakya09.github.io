"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EXPERIENCE_DATA } from "../data/experience.data";

export function ExperienceSection() {
  const reduced = useReducedMotion();

  return (
    <section id="experience" className="section" aria-labelledby="experience-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Experience"
          title="Work History"
          description="2+ years building production mobile apps across two companies in Kathmandu."
        />

        <div className="relative mx-auto max-w-3xl">
          {/* Timeline vertical line */}
          <div
            className="absolute left-6 top-0 bottom-0 w-px bg-linear-to-b from-primary via-accent to-transparent md:left-8"
            aria-hidden
          />

          <ol className="space-y-8" aria-label="Work experience list">
            {EXPERIENCE_DATA.map((exp, i) => (
              <motion.li
                key={exp.id}
                initial={reduced ? false : { opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 80,
                  damping: 18,
                  delay: reduced ? 0 : i * 0.1,
                }}
                className="relative pl-16 md:pl-20"
              >
                {/* Timeline dot */}
                <div
                  className={`absolute left-3.5 top-5 flex h-5 w-5 items-center justify-center rounded-full border-2 md:left-5.5 ${
                    exp.current
                      ? "border-primary bg-primary"
                      : "border-primary bg-background"
                  }`}
                  aria-hidden
                >
                  {exp.current && (
                    <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                  )}
                </div>

                <GlassCard className="p-6 md:p-8">
                  {/* Header */}
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{exp.role}</h3>
                      <p className="mt-0.5 text-base font-semibold text-primary">{exp.company}</p>
                    </div>
                    {exp.current && (
                      <span className="self-start rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-600 dark:text-green-400 shrink-0">
                        Current
                      </span>
                    )}
                  </div>

                  {/* Meta */}
                  <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} aria-hidden /> {exp.period}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={12} aria-hidden /> {exp.location}
                    </span>
                  </div>

                  {/* Responsibilities */}
                  <ul className="mt-5 space-y-2" aria-label="Responsibilities">
                    {exp.responsibilities.map((r, j) => (
                      <li key={j} className="flex gap-3 text-sm text-muted leading-relaxed">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                        {r}
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="mt-5 flex flex-wrap gap-2" aria-label="Technologies used">
                    {exp.tags.map((tag) => (
                      <Badge key={tag} variant="muted">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </GlassCard>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
