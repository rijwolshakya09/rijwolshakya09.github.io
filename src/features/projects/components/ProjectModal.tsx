"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Layers, GitCommit, Zap, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { Project } from "../types";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const reduced = useReducedMotion();

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            aria-hidden
          />

          {/* Modal */}
          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} case study`}
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: 40 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 max-h-[90vh] overflow-y-auto rounded-3xl glass p-6 md:p-8"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">{project.title}</h2>
                <p className="mt-1 text-sm text-muted">{project.subtitle}</p>
                <p className="mt-3 text-sm text-muted leading-relaxed">{project.description}</p>
              </div>
              <button
                onClick={onClose}
                className="shrink-0 flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted hover:text-foreground hover:border-primary transition-all min-w-[48px] min-h-[48px]"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Tech badges */}
            <div className="flex flex-wrap gap-2 mb-6" aria-label="Tech stack">
              {project.techStack.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>

            {/* Architecture */}
            <section aria-labelledby="arch-heading" className="mb-6">
              <h3 id="arch-heading" className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
                <Layers size={16} className="text-primary" aria-hidden />
                System Architecture — {project.architecture}
              </h3>
              <div className="space-y-3">
                {project.archLayers.map((layer) => (
                  <div key={layer.label} className="rounded-xl border border-border bg-surface-muted p-4">
                    <p className="text-xs font-bold text-primary uppercase tracking-wide mb-1">{layer.label}</p>
                    <p className="text-sm text-muted">{layer.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Metrics */}
            <section aria-labelledby="metrics-heading" className="mb-6">
              <h3 id="metrics-heading" className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
                <GitCommit size={16} className="text-primary" aria-hidden />
                Key Git Contributions & Metrics
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {project.metrics.map((m) => (
                  <div key={m.label} className="rounded-xl border border-border bg-surface-muted p-3 text-center">
                    <p className="text-xl font-bold gradient-text">{m.value}</p>
                    <p className="mt-1 text-xs text-muted">{m.label}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Highlights */}
            <section aria-labelledby="highlights-heading">
              <h3 id="highlights-heading" className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
                <Zap size={16} className="text-primary" aria-hidden />
                Performance Optimizations & Key Features
              </h3>
              <ul className="space-y-2">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm text-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    {h}
                  </li>
                ))}
              </ul>
            </section>

            {/* GitHub link */}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                aria-label={`View ${project.title} on GitHub`}
              >
                <ExternalLink size={14} />
                View on GitHub
              </a>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
