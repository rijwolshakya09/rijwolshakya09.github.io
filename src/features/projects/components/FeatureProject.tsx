/* eslint-disable @next/next/no-img-element -- static export with unoptimized images */
import { CountUp } from "@/components/ui/CountUp";
import { StoreBadge } from "@/components/ui/StoreBadge";
import { buttonStyles } from "@/components/ui/Button";
import type { Project } from "../types";

export function FeatureProject({ project, onOpen }: { project: Project; onOpen: (trigger: HTMLElement) => void }) {
  const [commits, features, fixes] = project.metrics;
  return (
    <article className="glass feature" aria-labelledby={`feature-${project.id}`}>
      <div>
        <div className="flex items-center gap-3.5">
          {project.icon && (
            <img src={project.icon} alt="" width={60} height={60} className="rounded-2xl shadow-[0_8px_24px_rgb(0_0_0/0.4)]" />
          )}
          <div>
            <small className="feature-eyebrow uppercase">{project.feature?.eyebrow}</small>
            <h3 id={`feature-${project.id}`} className="font-display text-3xl font-extrabold">
              {project.title}
            </h3>
          </div>
        </div>
        <p className="mt-4 text-[14.5px] leading-relaxed text-muted-2">{project.cardDescription}</p>
        <div className="metrics">
          <div>
            <CountUp to={Number(commits.value)} suffix="+" className="num" />
            {commits.label}
          </div>
          <div>
            <CountUp to={Number(features.value)} suffix="+" className="num" />
            {features.label}
          </div>
          <div>
            <CountUp to={Number(fixes.value)} suffix="+" className="num" />
            {fixes.label}
          </div>
          <div>
            <b>4</b>gateways
          </div>
        </div>
        <h4 className="mb-2 font-display text-sm">What I built</h4>
        <ul className="hl">
          {project.feature?.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
        <div className="arch">
          {project.feature?.archShort.map((a) => (
            <span key={a.label}>
              <b>{a.label}</b>
              {a.description}
            </span>
          ))}
        </div>
        <div className="stores">
          {project.stores.map((s) => (
            <StoreBadge key={s.kind} link={s} appName={project.title} />
          ))}
          <button type="button" className={buttonStyles({ variant: "glass" })} onClick={(e) => onOpen(e.currentTarget)}>
            Full case study →
          </button>
        </div>
      </div>
      <div className="phone" aria-hidden="true">
        <div className="screen">
          {project.screenshots.map((src, i) => (
            <img key={src} className="rs" src={src} alt="" width={210} height={450} loading={i === 0 ? "eager" : "lazy"} decoding="async" />
          ))}
        </div>
      </div>
    </article>
  );
}
