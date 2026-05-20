export type ProjectTag = "Flutter" | "React Native" | "React" | "Node.js" | "JavaScript";

export interface ArchLayer {
  label: string;
  description: string;
}

export interface CommitMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: ProjectTag[];
  techStack: string[];
  architecture: string;
  archLayers: ArchLayer[];
  metrics: CommitMetric[];
  highlights: string[];
  featured: boolean;
  githubUrl?: string;
}
