/* eslint-disable @next/next/no-img-element -- static export with unoptimized images */
export const TECH_NAMES: Record<string, string> = {
  flutter: "Flutter",
  dart: "Dart",
  firebase: "Firebase",
  react: "React",
  supabase: "Supabase",
  typescript: "TypeScript",
  git: "Git",
  figma: "Figma",
  nodedotjs: "Node.js",
  redux: "Redux",
  mongodb: "MongoDB",
  mysql: "MySQL",
};

export function TechLogo({ name, size = 22, className }: { name: string; size?: number; className?: string }) {
  return <img src={`/icons/${name}.svg`} alt="" width={size} height={size} className={className} loading="lazy" decoding="async" />;
}
