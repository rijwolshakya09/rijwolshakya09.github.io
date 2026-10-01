"use client";

import type { CSSProperties } from "react";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CARD_PROJECTS, FEATURE_PROJECT, getProject } from "../data/projects.data";
import type { ProjectId } from "../types";
import { FeatureProject } from "./FeatureProject";
import { ProjectCard } from "./ProjectCard";
import dynamic from "next/dynamic";

// Loaded on demand: keeps the modal (and its showcase) out of the initial bundle.
const CaseStudyModal = dynamic(() => import("./CaseStudyModal").then((m) => m.CaseStudyModal), { ssr: false });

export function ProjectsSection() {
  const [openId, setOpenId] = useState<ProjectId | null>(null);
  const [trigger, setTrigger] = useState<HTMLElement | null>(null);

  const open = (id: ProjectId) => (el: HTMLElement) => {
    setTrigger(el);
    setOpenId(id);
  };

  const storeCards = CARD_PROJECTS.filter((p) => p.screenshots.length > 0);
  const otherCards = CARD_PROJECTS.filter((p) => p.screenshots.length === 0);

  return (
    <section id="work" aria-labelledby="work-heading" className="aurora-section">
      <div aria-hidden="true" className="blob" style={{ width: 420, height: 420, "--c": "var(--indigo)", left: -160, top: 200, opacity: 0.22 } as CSSProperties} />
      <SectionHeader
        id="work-heading"
        eyebrow="Featured work"
        title="Projects I've"
        highlight="shipped"
        lead="Production apps live on the Play Store and App Store, plus open-source and full-stack side projects."
      />
      <Reveal>
        <FeatureProject project={FEATURE_PROJECT} onOpen={open(FEATURE_PROJECT.id)} />
      </Reveal>
      <div className="pgrid">
        {storeCards.map((p, i) => (
          <Reveal key={p.id} delay={i * 80}>
            <ProjectCard project={p} onOpen={open(p.id)} />
          </Reveal>
        ))}
      </div>
      <div className="pgrid two">
        {otherCards.map((p, i) => (
          <Reveal key={p.id} delay={i * 80}>
            <ProjectCard project={p} onOpen={open(p.id)} />
          </Reveal>
        ))}
      </div>
      <AnimatePresence>
        {openId && (
          <CaseStudyModal key={openId} project={getProject(openId)} onClose={() => setOpenId(null)} returnFocusTo={trigger} />
        )}
      </AnimatePresence>
    </section>
  );
}
