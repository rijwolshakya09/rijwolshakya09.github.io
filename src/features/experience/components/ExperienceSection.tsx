"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Chip } from "@/components/ui/Chip";
import { EXPERIENCE_DATA } from "../data/experience.data";
import { EDUCATION_DATA } from "../data/education.data";

export function ExperienceSection() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="py-20 md:py-28">
      <Container>
        <SectionTitle id="experience-heading" title="Experience" intro="Each role, logged like a release." />

        <div className="relative">
          <motion.span
            aria-hidden
            className="absolute bottom-0 left-[9.25rem] top-0 hidden w-px origin-top bg-line md:block"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />
          <ol>
            {EXPERIENCE_DATA.map((e) => (
              <li key={e.id} className="grid gap-3 border-t border-line py-8 md:grid-cols-[8rem_1fr] md:gap-10">
                <div>
                  <p className="font-display text-2xl font-extrabold tabular-nums text-primary">{e.version}</p>
                  <p className="text-sm text-muted">{e.period}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    {e.role}, {e.company}
                    {e.current && (
                      <span className="ml-3 inline-flex items-center gap-1.5 align-middle text-sm font-medium text-muted">
                        <span className="h-2 w-2 rounded-full bg-live" aria-hidden />
                        Current
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-muted">{e.location}</p>
                  <ul className="mt-4 max-w-[68ch] list-disc space-y-2 pl-5 marker:text-primary">
                    {e.responsibilities.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                  <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
                    {e.tags.map((t) => (
                      <li key={t}>
                        <Chip>{t}</Chip>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <section aria-labelledby="education-heading" className="mt-12 border-t border-line pt-8">
          <h3 id="education-heading" className="font-display text-2xl font-extrabold">
            Education
          </h3>
          <ul className="mt-4 space-y-3">
            {EDUCATION_DATA.map((ed) => (
              <li key={ed.id} className="grid gap-1 md:grid-cols-[1fr_auto] md:gap-6">
                <span>
                  <span className="font-semibold">{ed.degree}</span>
                  <span className="text-muted">, {ed.institution}</span>
                </span>
                <span className="text-sm text-muted">{ed.period}</span>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </section>
  );
}
