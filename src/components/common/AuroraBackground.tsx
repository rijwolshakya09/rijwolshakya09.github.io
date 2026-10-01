import type { CSSProperties } from "react";
export function AuroraBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 overflow-hidden">
      <div className="blob" style={{ width: 440, height: 440, "--c": "var(--indigo)", left: -90, top: -60, animation: "driftA 14s ease-in-out infinite alternate" } as CSSProperties} />
      <div className="blob" style={{ width: 380, height: 380, "--c": "var(--cyan)", right: -60, top: 140, animation: "driftB 16s ease-in-out infinite alternate" } as CSSProperties} />
      <div className="blob" style={{ width: 320, height: 320, "--c": "var(--fuchsia)", left: "40%", bottom: -120, animation: "driftA 18s ease-in-out infinite alternate-reverse" } as CSSProperties} />
      <div className="stars" />
    </div>
  );
}
