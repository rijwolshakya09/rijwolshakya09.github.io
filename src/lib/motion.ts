export function countUpValue(to: number, t: number): number {
  const c = Math.min(1, Math.max(0, t));
  return Math.round(to * (1 - Math.pow(1 - c, 3)));
}

export function showcaseIndex(progress: number, count: number): number {
  if (count <= 0) return 0;
  const p = Math.min(1, Math.max(0, progress));
  return Math.min(count - 1, Math.floor(p * count * 0.999));
}

const ktm = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Kathmandu",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

export function formatKathmanduTime(d: Date): string {
  return ktm.format(d);
}
