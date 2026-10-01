import type { CoreSkill, SkillGroup } from "../types";

export const CORE_SKILLS: CoreSkill[] = [
  { name: "Flutter", icon: "flutter", level: "Primary", value: 95 },
  { name: "Dart", icon: "dart", level: "Primary", value: 92 },
  { name: "Firebase", icon: "firebase", level: "Proficient", value: 85 },
  { name: "React Native", icon: "react", level: "Beginner", value: 50 },
  { name: "React", icon: "react", level: "Beginner", value: 50 },
  { name: "Supabase", icon: "supabase", level: "Beginner", value: 50 },
  { name: "Node.js", icon: "nodedotjs", level: "Beginner", value: 50 },
  { name: "TypeScript", icon: "typescript", level: "Beginner", value: 50 },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Mobile development",
    emoji: "📱",
    accent: "indigo",
    skills: [
      { name: "Flutter", icon: "flutter" },
      { name: "Dart", icon: "dart" },
      { name: "React Native", icon: "react" },
      { name: "Android (Kotlin)" },
      { name: "iOS (Swift)" },
      { name: "Figma → Code", icon: "figma" },
    ],
  },
  { title: "State management", emoji: "🧠", accent: "cyan", skills: [{ name: "Riverpod" }, { name: "GetX" }, { name: "Redux", icon: "redux" }, { name: "Bloc" }, { name: "Provider" }] },
  { title: "Architecture", emoji: "🏛️", accent: "fuchsia", skills: [{ name: "Clean Architecture" }, { name: "MVVM" }, { name: "MVC" }, { name: "Feature-driven" }, { name: "Repository pattern" }] },
  {
    title: "Backend & APIs",
    emoji: "⚙️",
    accent: "emerald",
    skills: [{ name: "REST APIs" }, { name: "Dio" }, { name: "Node.js", icon: "nodedotjs" }, { name: "Supabase", icon: "supabase" }, { name: "Firebase", icon: "firebase" }, { name: "JWT auth" }],
  },
  {
    title: "Databases & storage",
    emoji: "🗄️",
    accent: "amber",
    skills: [{ name: "Hive" }, { name: "MySQL", icon: "mysql" }, { name: "MongoDB", icon: "mongodb" }, { name: "PostgreSQL" }, { name: "Supabase RLS" }, { name: "SharedPreferences" }],
  },
  {
    title: "Frontend",
    emoji: "🖥️",
    accent: "sky",
    skills: [{ name: "React", icon: "react" }, { name: "Next.js" }, { name: "TypeScript", icon: "typescript" }, { name: "Tailwind CSS" }, { name: "HTML5" }, { name: "CSS3" }],
  },
  {
    title: "DevOps & delivery",
    emoji: "🚀",
    accent: "rose",
    skills: [{ name: "Git", icon: "git" }, { name: "GitHub" }, { name: "GitLab" }, { name: "GitHub Actions" }, { name: "Crashlytics" }, { name: "FCM" }],
  },
  {
    title: "Developer tools",
    emoji: "🛠️",
    accent: "violet",
    skills: [{ name: "VS Code" }, { name: "Android Studio" }, { name: "Xcode" }, { name: "Figma", icon: "figma" }, { name: "Postman" }, { name: "Cloud Vision" }],
  },
];
