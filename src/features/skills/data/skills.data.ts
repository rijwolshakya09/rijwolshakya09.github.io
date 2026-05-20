import type { SkillGroup } from "../types";

export const SKILLS_DATA: SkillGroup[] = [
  {
    category: "Mobile Development",
    icon: "smartphone",
    skills: ["Flutter", "Dart", "React Native", "Android (Kotlin)", "iOS (Swift)", "Figma → Code"],
  },
  {
    category: "State Management",
    icon: "layers",
    skills: ["Flutter Riverpod", "GetX", "React Redux", "Bloc", "Provider"],
  },
  {
    category: "Architecture Patterns",
    icon: "building2",
    skills: ["Clean Architecture", "MVVM", "MVC", "Feature-Driven Design", "Repository Pattern"],
  },
  {
    category: "Backend & APIs",
    icon: "server",
    skills: ["REST APIs", "Dio (HTTP)", "Node.js", "Supabase", "Firebase", "JWT Auth"],
  },
  {
    category: "Databases & Storage",
    icon: "database",
    skills: ["Hive (NoSQL)", "MySQL", "MongoDB", "PostgreSQL", "Supabase RLS", "SharedPreferences"],
  },
  {
    category: "Frontend",
    icon: "monitor",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5", "CSS3"],
  },
  {
    category: "DevOps & Tools",
    icon: "wrench",
    skills: ["Git", "GitHub", "GitLab", "GitHub Actions", "Firebase Crashlytics", "FCM"],
  },
  {
    category: "Developer Tools",
    icon: "code2",
    skills: ["VS Code", "Android Studio", "Xcode", "Figma", "Postman", "Google Cloud Vision"],
  },
];
