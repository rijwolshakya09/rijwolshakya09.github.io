import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

export function SectionHeader({
  id,
  eyebrow,
  title,
  highlight,
  lead,
  center,
}: {
  id: string;
  eyebrow: string;
  title: string;
  highlight: string;
  lead?: string;
  center?: boolean;
}) {
  return (
    <div className={cn(center && "text-center")}>
      <Reveal>
        <span className="eyebrow">✦ {eyebrow}</span>
      </Reveal>
      <Reveal delay={80}>
        <h2 id={id} className="sec">
          {title} <span className="grad">{highlight}</span>
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={160}>
          <p className={cn("lead", center && "mx-auto")}>{lead}</p>
        </Reveal>
      )}
    </div>
  );
}
