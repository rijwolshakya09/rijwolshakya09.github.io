"use client";

import { useState } from "react";
import type { Project, ProjectTag } from "../types";
import { PROJECTS_DATA } from "../data/projects.data";

export function useProjectFilter() {
  const [activeTag, setActiveTag] = useState<ProjectTag | "All">("All");

  const filtered: Project[] =
    activeTag === "All"
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.tags.includes(activeTag));

  return { activeTag, setActiveTag, filtered };
}
