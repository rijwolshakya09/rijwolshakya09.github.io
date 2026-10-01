export type ProjectId = "mydishhome" | "bizlevate" | "salesmania" | "finance-tracker" | "hg-hub" | "rent-n-read";

export type StoreKind = "play" | "appstore" | "github";

export interface StoreLink {
  kind: StoreKind;
  url: string;
}

export interface InfoItem {
  label: string;
  value: string;
}

export interface ArchLayer {
  label: string;
  description: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface Project {
  id: ProjectId;
  title: string;
  /** Long subtitle shown in the case study, e.g. "Customer self-service app · Flutter". */
  subtitle: string;
  /** Short card subtitle, e.g. "Attendance & leave · Flutter". */
  category: string;
  tier: "feature" | "card";
  icon?: string;
  monogram?: string;
  cardDescription: string;
  cardTags: string[];
  overview: string;
  stores: StoreLink[];
  statusNote?: string;
  info: InfoItem[];
  features: string[];
  architecture: ArchLayer[];
  metrics: Metric[];
  contributions: string[];
  techStack: string[];
  screenshots: string[];
  /** Extra content for the large feature block on the page (myDishHome only). */
  feature?: {
    eyebrow: string;
    highlights: string[];
    archShort: ArchLayer[];
  };
}
