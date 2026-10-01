"use client";

/* eslint-disable @next/next/no-img-element -- static export with unoptimized images */
import { usePointerVars } from "@/hooks/usePointerVars";
import { StoreChip } from "@/components/ui/StoreBadge";
import type { Project } from "../types";
import { ProjectIcon } from "./ProjectIcon";

export function ProjectCard({ project, onOpen }: { project: Project; onOpen: (trigger: HTMLElement) => void }) {
  const ref = usePointerVars<HTMLElement>();
  return (
    <article ref={ref} className="glass pcard">
      <div className="phead">
        <ProjectIcon project={project} />
        <div>
          <h3>{project.title}</h3>
          <small>{project.category}</small>
        </div>
      </div>
      <p>{project.cardDescription}</p>
      {project.screenshots.length > 0 && (
        <div className="minis" aria-hidden="true">
          {project.screenshots.slice(0, 3).map((src) => (
            <img key={src} src={src} alt="" width={90} height={190} loading="lazy" decoding="async" />
          ))}
        </div>
      )}
      <div>
        {project.cardTags.map((t) => (
          <span key={t} className="tag">
            {t}
          </span>
        ))}
      </div>
      <div className="pfoot">
        {project.stores.map((s) => (
          <StoreChip key={s.kind} link={s} appName={project.title} />
        ))}
        {project.statusNote && <span className="status-chip">{project.statusNote}</span>}
        <button type="button" className="more" onClick={(e) => onOpen(e.currentTarget)} aria-label={`Case study: ${project.title}`}>
          Case study →
        </button>
      </div>
    </article>
  );
}
