import type { Project } from "../types";

export function CaseStudy({ project }: { project: Project }) {
  const headingId = `case-${project.id}`;
  return (
    <article
      aria-labelledby={headingId}
      className="grid gap-10 rounded-2xl border border-line bg-surface p-6 md:p-10 lg:grid-cols-[1.3fr_1fr]"
    >
      <div>
        <p className="text-sm text-muted">{project.subtitle}</p>
        <h3 id={headingId} className="mt-1 font-display text-3xl font-extrabold tracking-[-0.02em] md:text-4xl">
          {project.title}
        </h3>
        <p className="mt-4 max-w-[60ch] leading-relaxed">{project.description}</p>
        <h4 className="mt-8 font-semibold">What I built</h4>
        <ul className="mt-3 max-w-[64ch] list-disc space-y-2 pl-5 text-muted marker:text-primary">
          {project.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted">Architecture: {project.architecture}</p>
      </div>
      <div className="self-start">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-6">
          {project.metrics.map((m) => (
            <div key={m.label}>
              <dt className="text-sm text-muted">{m.label}</dt>
              <dd className="font-display text-3xl font-extrabold tabular-nums">{m.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-sm text-muted">
          Counts are my own commits to the app&apos;s repository, merge commits excluded.
        </p>
      </div>
    </article>
  );
}
