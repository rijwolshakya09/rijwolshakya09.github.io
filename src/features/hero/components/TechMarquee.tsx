"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { assetPath } from "@/lib/assets";

const TECH_STACK = [
  { name: "Flutter", icon: assetPath("/icons/flutter.svg"), color: "#02569B" },
  { name: "Dart", icon: assetPath("/icons/dart.svg"), color: "#0175C2" },
  { name: "React", icon: assetPath("/icons/react.svg"), color: "#61DAFB" },
  { name: "Firebase", icon: assetPath("/icons/firebase.svg"), color: "#FFCA28" },
  { name: "TypeScript", icon: assetPath("/icons/typescript.svg"), color: "#3178C6" },
  { name: "Node.js", icon: assetPath("/icons/nodedotjs.svg"), color: "#339933" },
  { name: "Git", icon: assetPath("/icons/git.svg"), color: "#F05032" },
  { name: "Figma", icon: assetPath("/icons/figma.svg"), color: "#F24E1E" },
  { name: "Supabase", icon: assetPath("/icons/supabase.svg"), color: "#3FCF8E" },
  { name: "Redux", icon: assetPath("/icons/redux.svg"), color: "#764ABC" },
  { name: "MongoDB", icon: assetPath("/icons/mongodb.svg"), color: "#47A248" },
  { name: "MySQL", icon: assetPath("/icons/mysql.svg"), color: "#4479A1" },
];

function TechPill({ name, icon }: { name: string; icon: string }) {
  return (
    <div className="flex shrink-0 items-center gap-2.5 rounded-full border border-border bg-surface px-5 py-2.5 shadow-sm mx-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={icon}
        alt={name}
        width={20}
        height={20}
        className="h-5 w-5 object-contain"
        loading="lazy"
      />
      <span className="text-sm font-medium text-foreground whitespace-nowrap">{name}</span>
    </div>
  );
}

export function TechMarquee() {
  const reduced = useReducedMotion();
  const doubled = [...TECH_STACK, ...TECH_STACK];

  return (
    <section aria-label="Technology stack" className="relative overflow-hidden border-y border-border bg-surface-muted/50 py-5">
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-24 bg-linear-to-r from-surface-muted/50 to-transparent" aria-hidden />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-24 bg-linear-to-l from-surface-muted/50 to-transparent" aria-hidden />

      <div
        className={reduced ? "flex overflow-hidden" : "flex"}
        style={
          reduced
            ? {}
            : {
                animation: "marquee 30s linear infinite",
              }
        }
      >
        {doubled.map((tech, i) => (
          <TechPill key={`${tech.name}-${i}`} name={tech.name} icon={tech.icon} />
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
