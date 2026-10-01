"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Chip } from "@/components/ui/Chip";
import { GithubIcon } from "@/components/ui/SocialIcons";
import { cn } from "@/lib/utils";
import type { Project } from "../types";

export function ProjectCard({ project, size }: { project: Project; size: "featured" | "compact" }) {
  const [open, setOpen] = useState(false);
  const panelId = `${project.id}-details`;

  return (
    <article className={cn("rounded-2xl border border-line bg-surface", size === "featured" ? "p-6 md:p-8" : "p-5")}>
      <h3 className={cn("font-display font-extrabold tracking-[-0.015em]", size === "featured" ? "text-2xl" : "text-xl")}>
        {project.title}
      </h3>
      <p className="mt-1 text-sm text-muted">{project.subtitle}</p>
      {size === "featured" && <p className="mt-4 max-w-[60ch] leading-relaxed">{project.description}</p>}

      <button
        type="button"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => setOpen(!open)}
        className="mt-4 inline-flex min-h-12 items-center gap-1.5 text-sm font-semibold text-primary"
      >
        {open ? "Hide details" : "Show details"}
        <ChevronDown size={16} aria-hidden className={cn("transition-transform", open && "rotate-180")} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="details"
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="overflow-hidden"
          >
            <div className="pt-2">
              {size === "compact" && <p className="mb-4 leading-relaxed">{project.description}</p>}
              <ul className="list-disc space-y-2 pl-5 text-sm text-muted marker:text-primary">
                {project.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tech stack">
                {project.techStack.map((t) => (
                  <li key={t}>
                    <Chip>{t}</Chip>
                  </li>
                ))}
              </ul>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex min-h-12 items-center gap-2 text-sm font-semibold text-primary"
                >
                  <GithubIcon width={16} height={16} />
                  View on GitHub
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
