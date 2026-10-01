import { TechLogo } from "./TechLogo";

export function Marquee({ items }: { items: { icon: string; name: string }[] }) {
  return (
    <div className="marq">
      <ul className="sr-only" aria-label="Tech stack">
        {items.map((i) => (
          <li key={i.icon}>{i.name}</li>
        ))}
      </ul>
      <div className="track" aria-hidden="true">
        {[...items, ...items].map((i, n) => (
          <span key={`${i.icon}-${n}`}>
            <TechLogo name={i.icon} />
            {i.name}
          </span>
        ))}
      </div>
    </div>
  );
}
