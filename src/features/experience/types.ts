export interface ExperienceEntry {
  id: string;
  version: string;
  role: string;
  company: string;
  location: string;
  period: string;
  current: boolean;
  responsibilities: string[];
  tags: string[];
}

export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  period: string;
  current: boolean;
}
