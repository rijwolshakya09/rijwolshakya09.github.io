export function AuroraBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="blob" style={{ width: 440, height: 440, background: "var(--indigo)", left: -90, top: -60, animation: "driftA 14s ease-in-out infinite alternate" }} />
      <div className="blob" style={{ width: 380, height: 380, background: "var(--cyan)", right: -60, top: 140, animation: "driftB 16s ease-in-out infinite alternate" }} />
      <div className="blob" style={{ width: 320, height: 320, background: "var(--fuchsia)", left: "40%", bottom: -120, animation: "driftA 18s ease-in-out infinite alternate-reverse" }} />
      <div className="stars" />
    </div>
  );
}
