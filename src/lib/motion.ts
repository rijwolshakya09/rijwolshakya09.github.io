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

export interface TypeState {
  word: number;
  chars: number;
  deleting: boolean;
}

export function typewriterStep(s: TypeState, words: readonly string[]): { next: TypeState; delayMs: number } {
  const len = words[s.word]?.length ?? 0;
  if (!s.deleting && s.chars < len) return { next: { ...s, chars: s.chars + 1 }, delayMs: 70 };
  if (!s.deleting) return { next: { ...s, deleting: true }, delayMs: 1400 };
  if (s.chars > 0) return { next: { ...s, chars: s.chars - 1 }, delayMs: 35 };
  return { next: { word: (s.word + 1) % words.length, chars: 0, deleting: false }, delayMs: 300 };
}
