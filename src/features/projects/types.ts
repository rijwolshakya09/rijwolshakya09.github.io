export type ProjectTier = "case-study" | "featured" | "compact";

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  techStack: string[];
  architecture: string;
  metrics: ProjectMetric[];
  highlights: string[];
  tier: ProjectTier;
  githubUrl?: string;
}
