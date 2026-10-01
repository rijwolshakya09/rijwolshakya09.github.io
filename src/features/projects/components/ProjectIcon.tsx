/* eslint-disable @next/next/no-img-element -- static export with unoptimized images */
import type { Project } from "../types";

export function ProjectIcon({ project, size = 48 }: { project: Project; size?: number }) {
  if (project.icon) {
    return <img src={project.icon} alt="" width={size} height={size} style={{ width: size, height: size }} />;
  }
  return (
    <div className="ico" style={{ width: size, height: size }} aria-hidden="true">
      {project.monogram}
    </div>
  );
}
