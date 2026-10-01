/* eslint-disable @next/next/no-img-element -- static export with unoptimized images */
import type { StoreLink } from "@/features/projects/types";

const LABEL = { play: "on Google Play", appstore: "on the App Store", github: "on GitHub" } as const;

export function storeLabel(link: StoreLink, appName: string): string {
  return `${appName} ${LABEL[link.kind]}`;
}

/** Large official store badge (Google Play / App Store) or GitHub button. */
export function StoreBadge({ link, appName }: { link: StoreLink; appName: string }) {
  const common = { href: link.url, target: "_blank", rel: "noopener noreferrer", "aria-label": storeLabel(link, appName) };
  if (link.kind === "github") {
    return (
      <a {...common} className="ghbtn">
        <img src="/icons/github-white.svg" alt="" width={22} height={22} />
        View on GitHub
      </a>
    );
  }
  const play = link.kind === "play";
  return (
    <a {...common} className="obadge">
      <img src={play ? "/badges/google-play.svg" : "/badges/app-store.svg"} alt="" width={play ? 162 : 144} height={48} />
    </a>
  );
}

/** Small colour store chip for project cards. */
export function StoreChip({ link, appName }: { link: StoreLink; appName: string }) {
  const icon = { play: "/icons/play-color.svg", appstore: "/icons/appstore-color.svg", github: "/icons/github-white.svg" }[link.kind];
  const text = { play: "Google Play", appstore: "App Store", github: "GitHub" }[link.kind];
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={storeLabel(link, appName)}
      className={`chip-store ${link.kind === "github" ? "gh" : ""}`}
      onClick={(e) => e.stopPropagation()}
    >
      <img src={icon} alt="" width={16} height={16} />
      {text}
    </a>
  );
}
