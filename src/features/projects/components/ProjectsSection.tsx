"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitCommit, Layers, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProjectModal } from "./ProjectModal";
import { useProjectFilter } from "../hooks/useProjectFilter";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ALL_PROJECT_TAGS } from "../data/projects.data";
import type { Project, ProjectTag } from "../types";

const ALL_FILTER_TAGS: Array<ProjectTag | "All"> = ["All", ...ALL_PROJECT_TAGS];

export function ProjectsSection() {
  const [selected, setSelected] = useState<Project | null>(null);
  const { activeTag, setActiveTag, filtered } = useProjectFilter();
  const reduced = useReducedMotion();

  return (
    <section id="projects" className="section" aria-labelledby="projects-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Projects"
          title="Engineering Case Studies"
          description="Real-world apps mined from git history — architecture breakdowns, commit metrics, and key technical decisions."
        />

        {/* Filter Bar */}
        <div
          className="mb-10 flex flex-wrap justify-center gap-2"
          role="group"
          aria-label="Filter projects by technology"
        >
          {ALL_FILTER_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              aria-pressed={activeTag === tag}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 min-h-[48px] ${
                activeTag === tag
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "border border-border bg-surface-muted text-muted hover:border-primary hover:text-primary"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={reduced ? false : { opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 200, damping: 24, delay: reduced ? 0 : i * 0.05 }}
              >
                <GlassCard
                  hover
                  className="flex h-full flex-col p-6"
                  onClick={() => setSelected(project)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${project.title} case study`}
                  onKeyDown={(e) => e.key === "Enter" && setSelected(project)}
                >
                  {/* Featured badge */}
                  {project.featured && (
                    <span className="mb-3 self-start rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent border border-accent/20">
                      Featured
                    </span>
                  )}

                  {/* Title */}
                  <h3 className="text-lg font-bold text-foreground">{project.title}</h3>
                  <p className="mt-1 text-xs font-medium text-primary">{project.subtitle}</p>
                  <p className="mt-3 text-sm text-muted leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Key metrics preview */}
                  <div className="mt-4 flex flex-wrap gap-3">
                    {project.metrics.slice(0, 2).map((m) => (
                      <div key={m.label} className="flex items-center gap-1.5 text-xs">
                        {m.label.toLowerCase().includes("commit") ? (
                          <GitCommit size={12} className="text-primary" aria-hidden />
                        ) : (
                          <Layers size={12} className="text-accent" aria-hidden />
                        )}
                        <span className="font-semibold text-foreground">{m.value}</span>
                        <span className="text-muted">{m.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
                    {project.tags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="mt-auto pt-4 flex items-center gap-1 text-xs font-medium text-primary">
                    View Case Study <ArrowRight size={14} aria-hidden />
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* GitHub CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.open("https://github.com/rijwolshakya09", "_blank")}
            aria-label="View more projects on GitHub"
          >
            View All on GitHub
          </Button>
        </motion.div>
      </div>

      {/* Modal */}
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
