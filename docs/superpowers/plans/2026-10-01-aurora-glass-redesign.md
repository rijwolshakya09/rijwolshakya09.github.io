# Aurora Glass Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the portfolio's visual layer to match the approved Aurora Glass v10 mockup. That means a rich, animated, glass design with your photo, real app logos, screenshots, store badges, detailed case studies and a detailed toolkit. All of it stays a static export and keeps the `rijwol.com.np` setup.

**Architecture:**
- **Infrastructure kept** from local `master`: tests, domain/SEO files, contact hook, header behaviour, theme toggle fix.
- **Visual layer replaced.**
- **Styling split:**
  - Complex effects (glass, aurora, ring/orbit, marquee, showcase, badges) are ported from the mockup's `<style>` block into `@layer components` in `src/app/aurora.css`, with every literal colour swapped for theme tokens.
  - Layout uses Tailwind utilities.
- **Data** is typed per feature, and the mockup's `P` object becomes `projects.data.ts`.

**Tech Stack:** Next.js 16 (static export, React Compiler), React 19, TypeScript strict, Tailwind v4, Framer Motion 12, next-themes, zod + react-hook-form, Vitest + Testing Library.

**Spec:** `docs/superpowers/specs/2026-10-01-aurora-glass-redesign-design.md`.
**Visual source of truth:** `docs/superpowers/specs/aurora-glass-mockup/index.html` (v10). This plan refers to it as **M**, with line numbers. Lines 3–212 are the `<style>` block; the markup is at 221–375, and the `P` project data is at 403–452.

## Global Constraints

- **No server runtime:** `output: "export"`; metadata routes use `export const dynamic = "force-static"`.
- **Code rules:** no `useMemo` / `useCallback` (React Compiler); no `any`; `"use client"` only on interactive components; `cn()` for conditional classes.
- **Colours** only via the CSS tokens from spec §3 (dark default, light via the toggle). No literal hex in components, except the brand colours named in the spec: GitHub `#24292f`, LinkedIn `#0a66c2`, and the official badges.
- **Fonts:** Sora (display, 600/800) and Manrope (body, 400/500/700) via `next/font/google`.
- **myDishHome figures** are personal, 365 / 189 / 89 / 29. The string `1,065` must never appear, and neither must `1,000+` or `2+ years` (`src/content.test.ts` stays).
- **Skill levels:** React Native, React, Supabase, Node.js and TypeScript are **Beginner** at value **50**. Flutter 95 and Dart 92 are Primary; Firebase 85 is Proficient.
- **Store links** exactly as in spec §6. Finance Tracker is Play-only; HG HUB has none; Rent-N-Read links to GitHub.
- **Social links:**
  - GitHub `https://github.com/rijwolshakya09`
  - LinkedIn `https://linkedin.com/in/rijwol-shakya-79411a217/`
  - `mailto:shakyarijwol19@gmail.com`
  - These appear in the hero, contact and footer.
- **Nothing hidden without JS:** no content may be server-rendered at `opacity:0`. Hero motion is transform-only.
- **Reduced motion:** every CSS keyframe stops under `prefers-reduced-motion: reduce`; Framer animations go through `MotionConfig reducedMotion="user"`.
- **Touch targets** ≥ 48px; visible cyan focus ring.
- **Never push or merge to `master`** without the user's approval.

## Review Focus

1. **Opening each project's case study shows *that* project.** The mockup bug was that every card opened Bizlevate. Pinned in Task 8.
2. **Modal on mobile (≤ 640px):** the showcase stacks above the content and swipes horizontally with snap; the page behind doesn't scroll; Esc and the ✕ close it and return focus. Pinned in Task 8.
3. **Light theme:** glass text stays readable (AA), no dark-only literal colours leak, badges stay visible. Pinned in Task 1 (token test) and Task 12 (visual pass).
4. **Below-the-fold content with slow or no JS stays visible** (`Reveal` SSR). Pinned in Task 1.
5. **External links** (store badges, socials) open in a new tab with `noopener` and have accessible names. Pinned in Tasks 3, 7 and 11.

---

## File map

| Path | Action | Responsibility |
|---|---|---|
| `public/apps/<id>/{icon.png,shot-N.webp}`, `public/badges/*`, `public/icons/*` | add | app images, official badges, tech logos (spec §6) |
| `src/app/globals.css` | rewrite | Aurora tokens (dark + light), `@theme inline`, base, reduced-motion kill switch |
| `src/app/aurora.css` | new | `@layer components` ported from M lines 3–212 |
| `src/app/layout.tsx` | modify | Sora/Manrope fonts, import `aurora.css` |
| `src/components/common/Providers.tsx` | modify | `defaultTheme="dark"`, `enableSystem={false}` |
| `src/components/ui/{GlassCard,SectionHeader,Reveal,CountUp,StoreBadge,StoreChip,SocialButtons,TechLogo,Marquee}.tsx` | new | shared primitives |
| `src/components/ui/Button.tsx` | modify | `gradient` / `glass` variants |
| `src/components/common/{Header,Footer,ScrollProgress,AuroraBackground}.tsx` | rewrite/new | chrome |
| `src/hooks/{useScrollDirection,usePointerVars}.ts` | new | hide-on-scroll header; pointer CSS vars for tilt/glow |
| `src/lib/motion.ts` | new | pure helpers: `typewriterStep`, `showcaseIndex`, `formatKathmanduTime`, `countUpValue` |
| `src/features/hero/*` | rewrite | `HeroSection`, `PhotoOrbit`, `TypingRoles` |
| `src/features/about/*` | new | `AboutSection`, `LiveClock`, `CommitBars` |
| `src/features/projects/*` | rewrite | types, data, `ProjectsSection`, `FeatureProject`, `ProjectCard`, `CaseStudyModal`, `PhoneShowcase` |
| `src/features/experience/*` | rewrite | data (full bullets), `ExperienceSection`, `Timeline` |
| `src/features/skills/*` | rewrite | `CORE_SKILLS`, `SKILL_GROUPS`, `SkillsSection`, `CoreSkillCard`, `SkillGroupCard` |
| `src/features/contact/components/*` | rewrite | `ContactSection` (cards + socials), `ContactForm` (floating labels); hook/types kept |
| Delete | — | `features/hero/components/PhoneDemo/`, `components/ui/{SectionTitle,Chip}.tsx`, `features/projects/components/CaseStudy.tsx` |

---

### Task 1: Assets, tokens, fonts, primitives (`Reveal`, `GlassCard`, `SectionHeader`, `CountUp`, `Button`)

**Files:**
- Add: `public/apps/**`, `public/badges/**`, `public/icons/**`
- Rewrite: `src/app/globals.css`
- Create: `src/app/aurora.css`
- Modify: `src/app/layout.tsx`, `src/components/common/Providers.tsx`, `src/components/ui/Button.tsx`
- Create: `src/components/ui/{GlassCard,SectionHeader,Reveal,CountUp}.tsx`, `src/lib/motion.ts`
- Test: `src/components/ui/Reveal.test.tsx`, `src/lib/motion.test.ts`, `src/app/tokens.test.ts`

**Interfaces (produces):**
- `GlassCard({ as?, className?, interactive?, children })`. With `interactive`, it adds the pointer-glow border via the `usePointerVars` hook from Task 3; until then it's a no-op.
- `SectionHeader({ id, eyebrow, title, highlight, lead?, center? })` renders `<span class="eyebrow">✦ {eyebrow}</span><h2 id={id}>{title} <span class="grad">{highlight}</span></h2><p class="lead">`.
- `Reveal({ children, delay?: number, className?, as? })`: the server HTML is fully visible; after mount, only elements below the viewport animate in.
- `CountUp({ to: number, suffix?: string, className? })`: renders `to+suffix` on the server, counts up from 0 when it enters view, and jumps straight to the final value under reduced motion.
- `buttonStyles({ variant: "gradient" | "glass" | "primary" | "outline" | "ghost", size })`.
- In `motion.ts`:
  - `countUpValue(to: number, t: number): number` (easeOutCubic, t ∈ [0,1], rounded)
  - `showcaseIndex(progress: number, count: number): number`
  - `formatKathmanduTime(d: Date): string` ("HH:MM")
  - `typewriterStep(state, words)` (see Task 4 for its type)

- [ ] **Step 1: Copy the assets**

```bash
S=docs/superpowers/specs/aurora-glass-mockup
mkdir -p public/apps/{mydishhome,bizlevate,salesmania,finance-tracker} public/badges public/icons
for id in mydishhome bizlevate salesmania; do cp $S/app-$id-icon.png public/apps/$id/icon.png; for i in 1 2 3 4; do cp $S/app-$id-shot$i.webp public/apps/$id/shot-$i.webp; done; done
cp $S/app-finance-icon.png public/apps/finance-tracker/icon.png
for i in 1 2 3; do cwebp -quiet -q 82 $S/app-finance-shot$i.png -o public/apps/finance-tracker/shot-$i.webp 2>/dev/null || npx --yes sharp-cli -i $S/app-finance-shot$i.png -o public/apps/finance-tracker/shot-$i.webp -f webp; done
cp $S/badge-play.svg public/badges/google-play.svg; cp $S/badge-appstore.svg public/badges/app-store.svg
for n in flutter dart firebase react supabase typescript git figma nodedotjs redux mongodb mysql; do cp $S/ic-$n.svg public/icons/$n.svg; done
cp $S/ic-play-color.svg public/icons/play-color.svg; cp $S/ic-appstore-color.svg public/icons/appstore-color.svg; cp $S/ic-github-white.svg public/icons/github-white.svg
ls -R public/apps public/badges | head -40
```

Expected: 4 app folders. Each has `icon.png` and its screenshots (myDishHome, Bizlevate and SalesMania have 4; Finance Tracker has 3). There are 2 badges and 15 icons.

- [ ] **Step 2: Write the failing tests**

`src/lib/motion.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { countUpValue, showcaseIndex, formatKathmanduTime } from "./motion";

describe("countUpValue", () => {
  it("starts at 0, ends exactly at target, eases out", () => {
    expect(countUpValue(365, 0)).toBe(0);
    expect(countUpValue(365, 1)).toBe(365);
    expect(countUpValue(365, 0.5)).toBeGreaterThan(365 / 2);
  });
  it("clamps t outside [0,1]", () => {
    expect(countUpValue(89, -1)).toBe(0);
    expect(countUpValue(89, 2)).toBe(89);
  });
});

describe("showcaseIndex", () => {
  it("maps scroll progress to a screenshot index", () => {
    expect(showcaseIndex(0, 4)).toBe(0);
    expect(showcaseIndex(0.3, 4)).toBe(1);
    expect(showcaseIndex(1, 4)).toBe(3);
  });
  it("clamps and handles empty galleries", () => {
    expect(showcaseIndex(1.5, 4)).toBe(3);
    expect(showcaseIndex(-0.2, 4)).toBe(0);
    expect(showcaseIndex(0.5, 0)).toBe(0);
  });
});

describe("formatKathmanduTime", () => {
  it("formats in Asia/Kathmandu (UTC+5:45)", () => {
    expect(formatKathmanduTime(new Date("2026-10-01T00:00:00Z"))).toBe("05:45");
    expect(formatKathmanduTime(new Date("2026-10-01T18:30:00Z"))).toBe("00:15");
  });
});
```

`src/components/ui/Reveal.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { renderToString } from "react-dom/server";
import { Reveal } from "./Reveal";

describe("Reveal", () => {
  it("server-renders content fully visible (no opacity:0)", () => {
    const html = renderToString(<Reveal><p>Hello</p></Reveal>);
    expect(html).toContain("Hello");
    expect(html).not.toMatch(/opacity:\s*0[;"]/);
  });
});
```

`src/app/tokens.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const css = readFileSync("src/app/globals.css", "utf8") + readFileSync("src/app/aurora.css", "utf8");

describe("theme tokens", () => {
  it("defines every token for dark and light", () => {
    for (const t of ["--background", "--foreground", "--muted", "--muted-2", "--indigo", "--cyan", "--fuchsia", "--emerald", "--glass-bg", "--glass-border"]) {
      expect(css).toMatch(new RegExp(`:root[^}]*${t}:`));
      expect(css).toMatch(new RegExp(`\\.light[^}]*${t}:`));
    }
  });
  it("stops all keyframe animation under reduced motion", () => {
    expect(css).toMatch(/prefers-reduced-motion:\s*reduce[\s\S]*animation:\s*none\s*!important/);
  });
  it("aurora.css contains no literal hex colours outside the brand allow-list", () => {
    const aurora = readFileSync("src/app/aurora.css", "utf8");
    const allowed = new Set(["#24292f", "#32383f", "#0a66c2", "#000", "#fff", "#ffffff"]);
    const hexes = (aurora.match(/#[0-9a-fA-F]{3,8}\b/g) ?? []).filter((h) => !allowed.has(h.toLowerCase()));
    expect(hexes).toEqual([]);
  });
});
```

- [ ] **Step 3: Run the tests and watch them fail**

Run: `npm test -- motion Reveal tokens`
Expected: FAIL. The `./motion` and `./Reveal` imports don't resolve, and `aurora.css` is missing.

- [ ] **Step 4: Implement `src/lib/motion.ts`**

```ts
export function countUpValue(to: number, t: number): number {
  const c = Math.min(1, Math.max(0, t));
  return Math.round(to * (1 - Math.pow(1 - c, 3)));
}

export function showcaseIndex(progress: number, count: number): number {
  if (count <= 0) return 0;
  const p = Math.min(1, Math.max(0, progress));
  return Math.min(count - 1, Math.floor(p * count * 0.999));
}

const ktm = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kathmandu", hour: "2-digit", minute: "2-digit", hour12: false });
export function formatKathmanduTime(d: Date): string {
  return ktm.format(d);
}
```

- [ ] **Step 5: Rewrite `src/app/globals.css`**

The `.light` class is set by next-themes on `<html>`. Dark values live in `:root` so the first paint is dark.

```css
@import "tailwindcss";
@import "./aurora.css";

@custom-variant dark (&:where(.dark, .dark *));
@custom-variant light (&:where(.light, .light *));

:root {
  --background: #070b1a; --foreground: #e7ecff; --muted: #9aa5c8; --muted-2: #b6bfdc;
  --indigo: #6366f1; --cyan: #22d3ee; --fuchsia: #e879f9; --emerald: #10b981;
  --glass-bg: linear-gradient(160deg, #ffffff12, #ffffff05); --glass-border: #ffffff1a;
  --glass-solid: #0c1230f2; --chip-bg: #ffffff0b; --chip-border: #ffffff14; --dot: #ffffff22;
  --grad: linear-gradient(90deg, var(--indigo), var(--cyan), var(--fuchsia), var(--indigo));
  color-scheme: dark;
}
.light {
  --background: #f5f6ff; --foreground: #0f1430; --muted: #4f5878; --muted-2: #3d4566;
  --indigo: #4f46e5; --cyan: #0891b2; --fuchsia: #c026d3; --emerald: #059669;
  --glass-bg: linear-gradient(160deg, #ffffffcc, #ffffff99); --glass-border: #0f143014;
  --glass-solid: #ffffffee; --chip-bg: #0f14300a; --chip-border: #0f143014; --dot: #0f14301a;
  color-scheme: light;
}

@theme inline {
  --color-background: var(--background); --color-foreground: var(--foreground);
  --color-muted: var(--muted); --color-muted-2: var(--muted-2);
  --color-indigo: var(--indigo); --color-cyan: var(--cyan); --color-fuchsia: var(--fuchsia); --color-emerald: var(--emerald);
  --font-sans: var(--font-manrope), ui-sans-serif, system-ui, sans-serif;
  --font-display: var(--font-sora), ui-sans-serif, system-ui, sans-serif;
}

html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }
body { background: var(--background); color: var(--foreground); font-family: var(--font-sans); overflow-x: hidden; }
section[id] { scroll-margin-top: 6rem; }
::selection { background: var(--indigo); color: #fff; }
:focus-visible { outline: 2px solid var(--cyan); outline-offset: 3px; border-radius: 6px; }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation: none !important; transition-duration: 0.01ms !important; }
}
```

- [ ] **Step 6: Create `src/app/aurora.css`**

Port **M lines 3–212** into a single `@layer components { … }` block, applying all of the following:

1. **Drop page-wrapper rules.** Remove the `.site`, `.site *` and `.site section` selectors. Keep `section` padding as `.aurora-section { position:relative; padding: 90px 56px }` with a mobile override `@media (max-width: 768px) { .aurora-section { padding: 64px 16px } }`.
2. **Swap literal colours for tokens**, using this mapping:

   | Mockup literal | Token |
   |---|---|
   | `#070b1a` | `var(--background)` |
   | `#e7ecff` / `#fff` (as text) | `var(--foreground)` |
   | `#9aa5c8`, `#8f9bc4`, `#7c87ad` | `var(--muted)` |
   | `#b6bfdc`, `#c7d0f0` | `var(--muted-2)` |
   | `#6366f1`, `#818cf8`, `#a5b4fc` | `var(--indigo)` |
   | `#22d3ee`, `#67e8f9` | `var(--cyan)` |
   | `#e879f9`, `#d946ef`, `#f0abfc` | `var(--fuchsia)` |
   | `#10b981`, `#6ee7b7` | `var(--emerald)` |
   | `linear-gradient(160deg,#ffffff12,#ffffff05)` | `var(--glass-bg)` |
   | `#ffffff1a` / `#ffffff14` / `#ffffff1f` borders | `var(--glass-border)` |
   | `#ffffff0b` / `#ffffff08` / `#ffffff0d` fills | `var(--chip-bg)` |
   | `#0c1230f2` / `#0f1530cc` / `#0d1330` | `var(--glass-solid)` |
   | `#ffffff22` dots | `var(--dot)` |
   | translucent tints like `#6366f11f`, `#22d3ee33` | `color-mix(in oklab, var(--indigo) 12%, transparent)` and the like |

   Brand colours stay literal: `#24292f`, `#32383f`, `#0a66c2`, `#000` (badge chips). The `.tokens.test` checks this.
3. **Fonts:** replace `font-family:Sora` with `font-family:var(--font-display)`, and `Manrope` with `var(--font-sans)`.
4. **Keep every keyframe:**
   - `driftA`, `driftB`, `spin`, `bob`, `marq`, `ping`, `blink`, `shine`
   - `float3d`, `cycle4`, `pop`, `fadeIn`
   - plus `@property --p` and the `.ring2` rules
5. **Reveal classes:** add `.reveal-armed { opacity:0; transform:translateY(40px) scale(.98) }` and `.reveal-armed.in { opacity:1; transform:none; transition: opacity .8s cubic-bezier(.2,.8,.2,1), transform .8s cubic-bezier(.2,.8,.2,1) }`. **Do not** port the mockup's `.reveal` default `opacity:0`.
6. **Mobile rules** (≤ 768px):
   - `.hgrid`, `.bento`, `.feature`, `.pgrid`, `.pgrid.two`, `.cgrid`, `.mgrid`, `.info-row` → 1 column
   - `.core`, `.sgrid4` → 2 columns
   - `.job` → `width:100%`, with the dots on the left and the line at `left:8px`
   - `.photoWrap` → 240px
   - `.orbit` → `inset:-40px`
   - badges → smaller (`font-size:10px`, `b` 16px)
   - `.bento` → `grid-auto-rows:auto`, and the `.tall2` span is removed
7. **Modal mobile rules** (≤ 640px):
   - `.mgrid` → stack, with `.showcase` `position:static`, `order:-1`
   - `.sc-phone` → hidden
   - `.sc-rail` → becomes the horizontal swipe carousel: `flex-direction:row; overflow-x:auto; scroll-snap-type:x mandatory; margin-top:0`, `.sc-th img { width: 70vw; max-width:260px }`, `scroll-snap-align:center`
   - `.x` → `position:fixed; top:12px; right:12px`

- [ ] **Step 7: Update the fonts in `src/app/layout.tsx`**

```tsx
import { Sora, Manrope } from "next/font/google";
const sora = Sora({ variable: "--font-sora", subsets: ["latin"], weight: ["600", "800"], display: "swap" });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], weight: ["400", "500", "700"], display: "swap" });
// <html className={`${sora.variable} ${manrope.variable} h-full antialiased`} ...>
```

Remove the Bricolage / Schibsted imports. Keep `metadata` as it is.

- [ ] **Step 8: Update `Providers.tsx`**

Use `<ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} themes={["dark","light"]} disableTransitionOnChange>`. Keep the `MotionConfig reducedMotion="user"` wrapper.

- [ ] **Step 9: Create the primitives**

`src/components/ui/Reveal.tsx`:

```tsx
"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({ children, delay = 0, className, as: Tag = "div" }: { children: ReactNode; delay?: number; className?: string; as?: ElementType }) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<"static" | "armed" | "in">("static");

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return; // already on screen: stay visible
    setState("armed");
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setState("in"); io.disconnect(); }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} style={state === "static" ? undefined : { transitionDelay: `${delay}ms` }}
      className={cn(state !== "static" && "reveal-armed", state === "in" && "in", className)}>
      {children}
    </Tag>
  );
}
```

`src/components/ui/CountUp.tsx`:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { countUpValue } from "@/lib/motion";

export function CountUp({ to, suffix = "", className }: { to: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setValue(0);
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = (now - start) / 1200;
        setValue(countUpValue(to, t));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);

  return <span ref={ref} className={className}>{value}{suffix}</span>;
}
```

`src/components/ui/GlassCard.tsx`:

```tsx
import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function GlassCard({ as: Tag = "div", className, children }: { as?: ElementType; className?: string; children: ReactNode }) {
  return <Tag className={cn("glass", className)}>{children}</Tag>;
}
```

The `interactive` glow arrives in Task 3 through a `GlowCard` client wrapper.

`src/components/ui/SectionHeader.tsx`:

```tsx
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

export function SectionHeader({ id, eyebrow, title, highlight, lead, center }: { id: string; eyebrow: string; title: string; highlight: string; lead?: string; center?: boolean }) {
  return (
    <div className={cn(center && "text-center")}>
      <Reveal><span className="eyebrow">✦ {eyebrow}</span></Reveal>
      <Reveal delay={80}><h2 id={id} className="sec">{title} <span className="grad">{highlight}</span></h2></Reveal>
      {lead && <Reveal delay={160}><p className={cn("lead", center && "mx-auto")}>{lead}</p></Reveal>}
    </div>
  );
}
```

In `Button.tsx`, add two variants to `buttonStyles`:
- `gradient`: maps to the mockup's `.btn.b1`
- `glass`: maps to `.btn.b2`

Use the class names `"btn b1"` and `"btn b2"` from `aurora.css` with `min-h-12`. Keep the existing variants for compatibility.

- [ ] **Step 10: Run the tests**

Run: `npm test -- motion Reveal tokens`
Expected: PASS.

Run: `npx tsc --noEmit && npm run build`
Expected: both pass. The old sections may look odd with the new tokens; that's expected until they're replaced.

- [ ] **Step 11: Commit**

```bash
git add -A public/apps public/badges public/icons src/app src/components/ui src/components/common/Providers.tsx src/lib/motion.ts src/lib/motion.test.ts
git commit -m "feat: aurora tokens, fonts, assets and core UI primitives"
```

---

### Task 2: Typewriter logic

**Files:**
- Modify: `src/lib/motion.ts`
- Test: `src/lib/typewriter.test.ts`

**Interfaces (produces):** `interface TypeState { word: number; chars: number; deleting: boolean }` and `typewriterStep(s: TypeState, words: readonly string[]): { next: TypeState; delayMs: number }`. The delays are 70ms per typed char, 1400ms hold at the full word, 35ms per deleted char, and 300ms before the next word.

- [ ] **Step 1: Write the failing test**

```ts
import { describe, expect, it } from "vitest";
import { typewriterStep, type TypeState } from "./motion";

const W = ["Hi", "Yo"] as const;
const run = (s: TypeState) => typewriterStep(s, W);

describe("typewriterStep", () => {
  it("types forward one char at a time", () => {
    expect(run({ word: 0, chars: 0, deleting: false })).toEqual({ next: { word: 0, chars: 1, deleting: false }, delayMs: 70 });
  });
  it("holds at full word then starts deleting", () => {
    expect(run({ word: 0, chars: 2, deleting: false })).toEqual({ next: { word: 0, chars: 2, deleting: true }, delayMs: 1400 });
  });
  it("deletes then advances and wraps", () => {
    expect(run({ word: 0, chars: 1, deleting: true })).toEqual({ next: { word: 0, chars: 0, deleting: true }, delayMs: 35 });
    expect(run({ word: 1, chars: 0, deleting: true })).toEqual({ next: { word: 0, chars: 0, deleting: false }, delayMs: 300 });
  });
});
```

- [ ] **Step 2: Run it**

Run: `npm test -- typewriter`
Expected: FAIL, because `typewriterStep` isn't exported.

- [ ] **Step 3: Add the implementation to `motion.ts`**

```ts
export interface TypeState { word: number; chars: number; deleting: boolean }

export function typewriterStep(s: TypeState, words: readonly string[]): { next: TypeState; delayMs: number } {
  const len = words[s.word]?.length ?? 0;
  if (!s.deleting && s.chars < len) return { next: { ...s, chars: s.chars + 1 }, delayMs: 70 };
  if (!s.deleting) return { next: { ...s, deleting: true }, delayMs: 1400 };
  if (s.chars > 0) return { next: { ...s, chars: s.chars - 1 }, delayMs: 35 };
  return { next: { word: (s.word + 1) % words.length, chars: 0, deleting: false }, delayMs: 300 };
}
```

- [ ] **Step 4: Run it**

Run: `npm test -- typewriter`
Expected: PASS.

- [ ] **Step 5: Commit**

`git add src/lib && git commit -m "feat: typewriter step logic"`

---

### Task 3: Global chrome (progress bar, aurora background, glass header, footer, social buttons, glow/tilt hooks)

**Files:**
- Create:
  - `src/components/common/ScrollProgress.tsx`
  - `src/components/common/AuroraBackground.tsx`
  - `src/components/ui/SocialButtons.tsx`
  - `src/components/ui/GlowCard.tsx`
  - `src/hooks/usePointerVars.ts`
  - `src/hooks/useScrollDirection.ts`
- Rewrite: `src/components/common/Header.tsx`, `src/components/common/Footer.tsx`
- Modify: `src/lib/constants.ts` (`NAV_LINKS`)
- Delete: `src/components/common/SocialLinks.tsx`
- Test: update `src/components/common/Header.test.tsx`; add `src/components/ui/SocialButtons.test.tsx`

**Interfaces (produces):**
- `NAV_LINKS` = About `#about`, Work `#work`, Experience `#experience`, Skills `#skills`, Contact `#contact`.
- `SocialButtons({ size?: "md" | "sm", className? })` renders the GitHub, LinkedIn and Email `<a>` elements with:
  - `aria-label`s "GitHub profile", "LinkedIn profile" and "Email Rijwol"
  - classes `soc gh|li|ml`
  - external links with `target="_blank" rel="noopener noreferrer"`
- `usePointerVars<T extends HTMLElement>(): RefObject<T | null>` sets `--x` / `--y` on `pointermove`, throttled with rAF.
- `GlowCard({ className, children, as? })` is the client component that adds `.tile` glow via `usePointerVars`.
- `useScrollDirection(): "up" | "down"`.

- [ ] **Step 1: Write the failing tests**

`src/components/ui/SocialButtons.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SocialButtons } from "./SocialButtons";

describe("SocialButtons", () => {
  it("links GitHub, LinkedIn and email with accessible names", () => {
    render(<SocialButtons />);
    const gh = screen.getByRole("link", { name: "GitHub profile" });
    expect(gh).toHaveAttribute("href", "https://github.com/rijwolshakya09");
    expect(gh).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.getByRole("link", { name: "LinkedIn profile" })).toHaveAttribute("href", "https://linkedin.com/in/rijwol-shakya-79411a217/");
    expect(screen.getByRole("link", { name: "Email Rijwol" })).toHaveAttribute("href", "mailto:shakyarijwol19@gmail.com");
  });
});
```

In `Header.test.tsx`:
- Keep both existing tests.
- Change the second test to expect the 5 links: About `#about`, Work `#work`, Experience `#experience`, Skills `#skills`, Contact `#contact`.
- Add:

```tsx
  it("renders the scroll progress bar hidden from assistive tech", () => {
    const { container } = render(<><ScrollProgress /><Header /></>);
    expect(container.querySelector("[data-progress]")).toHaveAttribute("aria-hidden", "true");
  });
```

(Add `import { ScrollProgress } from "./ScrollProgress";` at the top.)

- [ ] **Step 2: Run them**

Run: `npm test -- SocialButtons Header`
Expected: FAIL, because the modules are missing and there are only 3 nav links.

- [ ] **Step 3: Implement**

`src/hooks/usePointerVars.ts`:

```ts
"use client";
import { useEffect, useRef } from "react";

export function usePointerVars<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const b = el.getBoundingClientRect();
        el.style.setProperty("--x", `${e.clientX - b.left}px`);
        el.style.setProperty("--y", `${e.clientY - b.top}px`);
        el.style.setProperty("--px", `${(e.clientX - b.left) / b.width - 0.5}`);
        el.style.setProperty("--py", `${(e.clientY - b.top) / b.height - 0.5}`);
      });
    };
    const onLeave = () => { el.style.setProperty("--px", "0"); el.style.setProperty("--py", "0"); };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => { el.removeEventListener("pointermove", onMove); el.removeEventListener("pointerleave", onLeave); cancelAnimationFrame(raf); };
  }, []);
  return ref;
}
```

`src/hooks/useScrollDirection.ts`:

```ts
"use client";
import { useEffect, useState } from "react";

export function useScrollDirection(): "up" | "down" {
  const [dir, setDir] = useState<"up" | "down">("up");
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) > 6) { setDir(y > last && y > 120 ? "down" : "up"); last = y; }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return dir;
}
```

`src/components/ui/GlowCard.tsx`:

```tsx
"use client";
import type { ElementType, ReactNode } from "react";
import { usePointerVars } from "@/hooks/usePointerVars";
import { cn } from "@/lib/utils";

export function GlowCard({ as: Tag = "div", className, children }: { as?: ElementType; className?: string; children: ReactNode }) {
  const ref = usePointerVars<HTMLDivElement>();
  return <Tag ref={ref} className={cn("glass tile", className)}>{children}</Tag>;
}
```

`src/components/common/ScrollProgress.tsx`:

```tsx
"use client";
import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return <motion.div data-progress aria-hidden="true" className="progress-bar" style={{ scaleX }} />;
}
```

Add `.progress-bar` to `aurora.css`:

```css
.progress-bar { position:fixed; inset:0 0 auto 0; height:4px; z-index:60; transform-origin:left; background:var(--grad); box-shadow:0 0 12px color-mix(in oklab, var(--cyan) 70%, transparent); }
```

The modal uses `z-index:1000`.

`src/components/common/AuroraBackground.tsx`: a server component that renders `aria-hidden` decoration — three `.blob` divs (the inline sizes, colours and animations from M lines 223–226, with colours set to `var(--indigo)` / `var(--cyan)` / `var(--fuchsia)`) and `<div class="stars"/>`. It's placed absolutely inside the hero.

`src/components/ui/SocialButtons.tsx`: a server component. Use the inline GitHub / LinkedIn / Mail SVG paths from **M** (the `.socials` markup in the hero), with `SOCIAL_LINKS` from constants; `size="sm"` adds `sm` to the wrapper (`<div className={cn("socials", size === "sm" && "sm", className)}>`).

`src/components/common/Header.tsx`:
- Keep all the existing behaviour: scroll state, the mobile sheet with focus trap, Esc, scroll lock, and closing at the 768px matchMedia breakpoint.
- Restyle the desktop bar to M's `.nav` glass pill:
  - centred, `position:fixed; top:14px; left:50%; translate:-50% 0`
  - the `RS` monogram in `.grad`
  - links with `aria-current`
  - an active `motion.span layoutId="nav-pill"` behind the active link
  - `ThemeToggle` and the CV link
- Hide on scroll down: wrap in `motion.header animate={{ y: dir === "down" && !open ? -90 : 0 }}`.
- The mobile sheet keeps its structure and gets the `glass` styling (`background:var(--glass-solid)`).

`src/components/common/Footer.tsx`:

```tsx
import { SocialButtons } from "@/components/ui/SocialButtons";
import { SITE_METADATA } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="ft">
      <span>© {new Date().getFullYear()} {SITE_METADATA.name}</span>
      <SocialButtons size="sm" />
      <span>Designed &amp; built with Next.js</span>
    </footer>
  );
}
```

Port `footer.ft` from M with `flex-wrap:wrap; gap:16px`, and on mobile switch it to `flex-direction:column`.

Then delete `src/components/common/SocialLinks.tsx`, and grep for and remove any imports of it (the hero is rewritten in Task 4).

- [ ] **Step 4: Run the tests**

Run: `npm test -- SocialButtons Header`
Expected: PASS (4 Header tests, 1 SocialButtons test).

- [ ] **Step 5: Commit**

`git add -A src && git commit -m "feat: glass header, gradient scroll progress bar, aurora background, social buttons"`

---

### Task 4: Hero

**Files:**
- Rewrite: `src/features/hero/components/HeroSection.tsx`
- Create: `src/features/hero/components/{PhotoOrbit,TypingRoles}.tsx`, `src/components/ui/{Marquee,TechLogo}.tsx`
- Delete: `src/features/hero/components/PhoneDemo/`
- Test: rewrite `src/features/hero/components/HeroSection.test.tsx`

**Interfaces (produces):**
- `TypingRoles({ words: readonly string[] })`: the visible text is `aria-hidden`, with an `sr-only` "Flutter developer".
- `Marquee({ items: { icon: string; name: string }[] })`: the visible track is `aria-hidden` and duplicated; an `sr-only` `<ul>` holds the names.
- `TechLogo({ name, size? })` renders `<img src={`/icons/${name}.svg`} alt="" width height>`.
- `HERO_ROLES = ["Flutter Developer","Mobile Engineer","Clean Architecture fan","UI craftsman"] as const`.
- `TECH_MARQUEE`: the 12 icons from Task 1.

- [ ] **Step 1: Write the failing test (replace the file)**

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { HeroSection } from "./HeroSection";

describe("HeroSection", () => {
  it("greets, shows the photo, CTAs and socials", () => {
    render(<HeroSection />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Hi, I'm Rijwol Shakya");
    expect(screen.getByRole("img", { name: "Rijwol Shakya" })).toHaveAttribute("src", expect.stringContaining("/images/avatar.png"));
    expect(screen.getByRole("link", { name: /View my work/ })).toHaveAttribute("href", "#work");
    expect(screen.getByRole("link", { name: /Download CV/ })).toHaveAttribute("href", "/Rijwol_Shakya_CV.pdf");
    expect(screen.getByRole("link", { name: "GitHub profile" })).toBeInTheDocument();
    expect(screen.getByText("Open to remote Flutter roles")).toBeInTheDocument();
    expect(screen.getByText("365+")).toBeInTheDocument();
  });

  it("lists the tech stack for screen readers once", () => {
    render(<HeroSection />);
    expect(screen.getByRole("list", { name: "Tech stack" })).toHaveTextContent("Flutter");
  });

  it("server HTML never hides hero content with opacity:0", () => {
    expect(renderToString(<HeroSection />)).not.toMatch(/opacity:\s*0[;"]/);
  });
});
```

- [ ] **Step 2: Run it**

Run: `npm test -- HeroSection`
Expected: FAIL, because the old h1 doesn't match.

- [ ] **Step 3: Implement**

Port M's `<!-- HERO -->` markup (lines 221–246 in the v10 file) into components, keeping all class names:
- `HeroSection` (`"use client"` for motion):
  - `<section id="hero" aria-labelledby="hero-heading" className="aurora-section hero">`
  - `<AuroraBackground/>`
  - `.hgrid` with the left column: pill, `h1#hero-heading` "Hi, I'm Rijwol" `<br/>` `<span className="grad">Shakya</span>`, `<TypingRoles/>`, paragraph, `.ctas` (gradient "View my work →" → `#work`, glass "Download CV ↓" → `CV_PATH` with `download`), `<SocialButtons/>`
  - `<PhotoOrbit/>` on the right
  - then `<Marquee/>`
  - Wrap the left column children in `motion.div` with variants `{ hidden: { y: 24 }, show: { y: 0 } }` and `staggerChildren: 0.08`, using **transform only**.
- `PhotoOrbit`:
  - `.photoWrap` with `.orbit` (Flutter / Dart / Firebase logos)
  - `.ring`
  - `<img className="photo" src="/images/avatar.png" alt="Rijwol Shakya" width={330} height={330} fetchPriority="high"/>` — the mockup used a background-image, so add `.photo{object-fit:cover}`
  - three `.badge` divs, `aria-hidden`, with `365+`, `3+ yrs`, `4`
  - `motion.div initial={{ scale: 0.92 }} animate={{ scale: 1 }}` with spring stiffness 120 / damping 18
- `TypingRoles`: `useState<TypeState>` driven by `setTimeout(typewriterStep)`; under reduced motion it shows `words[0]`. Render `<div className="type" aria-hidden="true"><span>{text}</span><span className="caret"/></div><span className="sr-only">Flutter developer</span>`.
- The `.marq` spacing (`margin-top:110px`) comes from Task 1's CSS.

Delete the PhoneDemo folder: `git rm -r src/features/hero/components/PhoneDemo`.

- [ ] **Step 4: Run the tests**

Run: `npm test -- HeroSection && npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 5: Commit**

`git add -A src && git commit -m "feat: aurora hero with photo orbit, typing roles, socials and tech marquee"`

---

### Task 5: About bento

**Files:**
- Create: `src/features/about/components/{AboutSection,LiveClock,CommitBars}.tsx`, `src/features/about/about.test.tsx`

**Interfaces (consumes):** `GlowCard`, `CountUp`, `SectionHeader`, `formatKathmanduTime`.

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { AboutSection } from "./components/AboutSection";

describe("AboutSection", () => {
  it("tells the full story with the right numbers", () => {
    render(<AboutSection />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Building apps that people rely on");
    expect(screen.getByText(/3\+ years of professional experience/)).toBeInTheDocument();
    expect(screen.getByText(/1M\+ downloads/)).toBeInTheDocument();
    expect(screen.getByText(/growing my skills in/)).toBeInTheDocument();
    expect(screen.getByText("365+")).toBeInTheDocument();
    expect(screen.getByText("189")).toBeInTheDocument();
    expect(screen.getByText(/UTC\+5:45/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run it**

Run: `npm test -- about`
Expected: FAIL, because the module is missing.

- [ ] **Step 3: Implement**

Port M's `<!-- ABOUT -->` markup:
- `section#about.aurora-section` containing `<SectionHeader id="about-heading" eyebrow="About me" title="Building apps that" highlight="people rely on" lead="A quick look at who I am, what I'm doing now, and the numbers behind it."/>`.
- `.bento` with 7 `GlowCard`s, using the exact copy from spec §4.2: "Who I am" `tall2` with 3 paragraphs and `<b>` emphasis, plus the CountUp tiles for 365, 3 and 6.
- `LiveClock` (client): `useState(formatKathmanduTime(new Date()))` with `setInterval` every 10s.
  - Render it in `<time>`.
  - To avoid a hydration mismatch, render `"--:--"` on the server and set the value in `useEffect`. Note this in the code comment.
- `CommitBars`: three rows (feat 189 `--w:62%`, fix 89 `29%`, refactor 29 `10%`), with the width animating once the `Reveal` parent gets `.in`.
  - Port the `.bars` CSS so that it uses `.in .bars i em` **or** a `data-on` attribute that `CommitBars` sets through IntersectionObserver.
  - Under reduced motion, show full width immediately.

- [ ] **Step 4: Run the tests**

Run: `npm test -- about && npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 5: Commit**

`git add -A src/features/about && git commit -m "feat: about bento with live clock, count-ups and commit bars"`

---

### Task 6: Projects data model

**Files:**
- Rewrite: `src/features/projects/types.ts`, `src/features/projects/data/projects.data.ts`
- Test: replace `src/features/projects/projects.test.tsx` with `src/features/projects/projects.data.test.ts`

**Interfaces (produces):** the `Project` and related types exactly as in spec §6, plus `PROJECTS: Project[]` (order: mydishhome, bizlevate, salesmania, finance-tracker, hg-hub, rent-n-read), `getProject(id): Project`, `FEATURE_PROJECT` and `CARD_PROJECTS`.

- [ ] **Step 1: Write the failing test**

```ts
import { describe, expect, it } from "vitest";
import { PROJECTS, getProject, FEATURE_PROJECT, CARD_PROJECTS } from "./data/projects.data";

const url = (id: Parameters<typeof getProject>[0], kind: string) => getProject(id).stores.find((s) => s.kind === kind)?.url;

describe("projects data", () => {
  it("has all six projects in order with one feature", () => {
    expect(PROJECTS.map((p) => p.id)).toEqual(["mydishhome", "bizlevate", "salesmania", "finance-tracker", "hg-hub", "rent-n-read"]);
    expect(FEATURE_PROJECT.id).toBe("mydishhome");
    expect(CARD_PROJECTS).toHaveLength(5);
  });
  it("links the real store listings", () => {
    expect(url("mydishhome", "play")).toBe("https://play.google.com/store/apps/details?id=com.shirantech.dishhome");
    expect(url("mydishhome", "appstore")).toBe("https://apps.apple.com/np/app/mydishhome/id1396471022");
    expect(url("bizlevate", "play")).toBe("https://play.google.com/store/apps/details?id=com.ispl.bizlevate");
    expect(url("bizlevate", "appstore")).toBe("https://apps.apple.com/np/app/bizlevate/id6760984023");
    expect(url("salesmania", "play")).toBe("https://play.google.com/store/apps/details?id=com.ispl.ps360flutter");
    expect(url("salesmania", "appstore")).toBe("https://apps.apple.com/np/app/salesmaniahd/id6760572812");
    expect(url("finance-tracker", "play")).toBe("https://play.google.com/store/apps/details?id=com.rijwolshakya.financetracker");
    expect(url("finance-tracker", "appstore")).toBeUndefined();
    expect(getProject("hg-hub").stores).toEqual([]);
    expect(url("rent-n-read", "github")).toBe("https://github.com/Ak-tsuki");
  });
  it("has full case-study content for every project", () => {
    for (const p of PROJECTS) {
      expect(p.overview.length).toBeGreaterThan(120);
      expect(p.info.length).toBeGreaterThanOrEqual(6);
      expect(p.features.length).toBeGreaterThanOrEqual(4);
      expect(p.architecture).toHaveLength(3);
      expect(p.metrics).toHaveLength(4);
      expect(p.contributions.length).toBeGreaterThanOrEqual(3);
    }
  });
  it("points at real screenshot files", () => {
    expect(getProject("mydishhome").screenshots).toEqual([1, 2, 3, 4].map((i) => `/apps/mydishhome/shot-${i}.webp`));
    expect(getProject("finance-tracker").screenshots).toHaveLength(3);
    expect(getProject("hg-hub").screenshots).toEqual([]);
  });
  it("keeps personal myDishHome figures", () => {
    expect(getProject("mydishhome").metrics.map((m) => m.value)).toEqual(["365", "189", "89", "29"]);
  });
});
```

- [ ] **Step 2: Run it**

Run: `npm test -- projects.data`
Expected: FAIL, because the exports are missing.

- [ ] **Step 3: Implement**

- Write `types.ts` exactly as in spec §6 (`id` as a union type).
- Write `projects.data.ts` by **transcribing M's `P` object (lines 403–452) verbatim** into typed `Project` entries:
  - `name` → `title`; `sub` → `subtitle`; `info` pairs → `{label, value}`; `arch` pairs → `{label, description}`; `metrics` pairs → `{value, label}`; `did` → `contributions`; `stack` → `techStack`
  - `icon` → `/apps/<id>/icon.png`, or `undefined` with `monogram` set for hg-hub ("HG") and rent-n-read ("RR")
  - `screenshots` → `/apps/<id>/shot-N.webp`
  - `stores` → the spec §6 URLs
  - `statusNote: "Internal release"` for hg-hub
  - `tier`: `"feature"` for mydishhome, `"card"` for the rest
  - `cardDescription`, `category` and `cardTags` come from the card markup in M lines 269–300
- Keep the git provenance comment above myDishHome's `metrics`.
- Fix the myDishHome Minimum OS value to `"iOS 15.0 · Android 5.0+"`; Play says Android 5.0+ per the search earlier.

Delete `src/features/projects/projects.test.tsx` and `src/features/projects/components/CaseStudy.tsx` (`ProjectCard` / `ProjectsSection` are rewritten in Task 7). If `tsc` complains in between, Task 7 resolves it in the same branch. Run only the data test here.

- [ ] **Step 4: Run it**

Run: `npm test -- projects.data src/content.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

`git add -A src/features/projects && git commit -m "feat: full projects data with store links, case-study content and screenshots"`

---

### Task 7: Work section (feature block, cards, store badges and chips)

**Files:**
- Create: `src/components/ui/{StoreBadge,StoreChip}.tsx`, `src/features/projects/components/{FeatureProject,ProjectCard}.tsx`
- Rewrite: `src/features/projects/components/ProjectsSection.tsx`
- Test: `src/features/projects/ProjectsSection.test.tsx`

**Interfaces (produces):**
- `StoreBadge({ link: StoreLink, appName: string })`:
  - `play` → `<a className="obadge" href target=_blank rel aria-label={`${appName} on Google Play`}><img src="/badges/google-play.svg" alt="" height=48 width=162/></a>`
  - `appstore` → `/badges/app-store.svg` (width 144)
  - `github` → `.ghbtn` "View on GitHub"
- `StoreChip({ link, appName })` → `.chip-store play|ios|gh` with a colour icon and its label.
- `ProjectCard({ project, onOpen })`.
- `FeatureProject({ project, onOpen })`.
- `ProjectsSection` (client) owns `openId: Project["id"] | null` and renders `<CaseStudyModal>` (Task 8; until then, render nothing when the id is null).

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectsSection } from "./components/ProjectsSection";

vi.mock("./components/CaseStudyModal", () => ({ CaseStudyModal: () => null }));

describe("ProjectsSection", () => {
  it("shows myDishHome as the feature with official store badges", () => {
    render(<ProjectsSection />);
    const play = screen.getByRole("link", { name: "myDishHome on Google Play" });
    expect(play).toHaveAttribute("href", "https://play.google.com/store/apps/details?id=com.shirantech.dishhome");
    expect(play).toHaveAttribute("target", "_blank");
    expect(play).toHaveAttribute("rel", "noopener noreferrer");
    expect(play.querySelector("img")).toHaveAttribute("src", "/badges/google-play.svg");
    expect(screen.getByRole("link", { name: "myDishHome on the App Store" })).toBeInTheDocument();
  });
  it("renders five project cards with real icons and the right store chips", () => {
    render(<ProjectsSection />);
    for (const t of ["Bizlevate", "SalesMania", "Finance Tracker", "HG HUB", "Rent-N-Read"]) {
      expect(screen.getByRole("heading", { level: 3, name: t })).toBeInTheDocument();
    }
    expect(screen.queryByRole("link", { name: "Finance Tracker on the App Store" })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Finance Tracker on Google Play" })).toBeInTheDocument();
    expect(screen.getByText("Internal release")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Rent-N-Read on GitHub" })).toHaveAttribute("href", "https://github.com/Ak-tsuki");
  });
});
```

- [ ] **Step 2: Run it**

Run: `npm test -- ProjectsSection`
Expected: FAIL.

- [ ] **Step 3: Implement**

Port M's `<!-- WORK -->` markup and CSS:
- **`FeatureProject`:**
  - `.feature` is clickable through a "Full case study →" `<button>`. Don't make the whole `div` clickable, because it contains links.
  - It has the icon, eyebrow, title, description, `.metrics` with `CountUp` for 365 / 189 / 89 plus a static 4, the `.hl` list, the `.arch` tiles, `StoreBadge`s and the button.
  - On the right is the `.phone` with `.screen.real` holding 4 `<img className="rs">` (`alt="myDishHome screenshot N"`, `loading="lazy"`, width 230, height 470).
- **`ProjectCard`:**
  - A `GlowCard`-style `.pcard` with a pointer tilt. Use `usePointerVars`, and set the CSS `transform: perspective(800px) rotateY(calc(var(--px,0)*12deg)) rotateX(calc(var(--py,0)*-12deg))` in `aurora.css` under `.pcard:hover`.
  - Contents: `.phead` (icon img 48×48, or the `.ico` monogram), `h3`, `small`, description, `.minis` (first 3 screenshots, `alt=""`, `loading="lazy"`), tags, then `.pfoot` with `StoreChip`s or the `statusNote` chip, plus a `<button className="more">Case study →</button>` calling `onOpen(id)`.
  - StoreChip links must stop propagation.
- **`ProjectsSection`:** `section#work.aurora-section`, `SectionHeader` ("Featured work" / "Projects I've" / "shipped"), `FeatureProject`, then `.pgrid` with the 3 store cards and `.pgrid.two` with hg-hub and rent-n-read, and `{openId && <CaseStudyModal …/>}`.
- **Accessible names:**
  - StoreChip and StoreBadge use `aria-label` `${appName} on Google Play`, `${appName} on the App Store` and `${appName} on GitHub`.
  - Inside StoreBadge the `<img>` has `alt=""` (decorative); the link's `aria-label` carries the name, and the test reads the img via `querySelector`.

- [ ] **Step 4: Run the tests**

Run: `npm test -- ProjectsSection && npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 5: Commit**

`git add -A src && git commit -m "feat: work section with feature app, tilt cards and official store badges"`

---

### Task 8: Case study modal and phone showcase

**Files:**
- Create: `src/features/projects/components/{CaseStudyModal,PhoneShowcase}.tsx`
- Test: `src/features/projects/CaseStudyModal.test.tsx`

**Interfaces:**
- `CaseStudyModal({ project: Project; onClose: () => void; returnFocusTo: HTMLElement | null })`
- `PhoneShowcase({ project: Project; scrollRoot: RefObject<HTMLElement | null> })`
- Consumes `showcaseIndex`.

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, expect, it } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProjectsSection } from "./components/ProjectsSection";

describe("Case study modal", () => {
  it("opens the clicked project, not a fixed one", async () => {
    const user = userEvent.setup();
    render(<ProjectsSection />);
    const cards = screen.getAllByRole("button", { name: /^Case study/ });
    await user.click(cards[2]); // Finance Tracker card (bizlevate, salesmania, finance-tracker, hg-hub, rent-n-read)
    const dialog = await screen.findByRole("dialog", { name: "Finance Tracker" });
    expect(within(dialog).getByText(/personal finance app I designed and built myself/)).toBeInTheDocument();
    expect(within(dialog).queryByRole("link", { name: /App Store/ })).not.toBeInTheDocument();
  });

  it("closes on Esc, unlocks scroll and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    render(<ProjectsSection />);
    const trigger = screen.getAllByRole("button", { name: /^Case study/ })[0];
    await user.click(trigger);
    expect(await screen.findByRole("dialog", { name: "Bizlevate" })).toBeInTheDocument();
    expect(document.body.style.overflow).toBe("hidden");
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(document.body.style.overflow).toBe("");
    expect(trigger).toHaveFocus();
  });

  it("thumbnail buttons switch the shown screenshot", async () => {
    const user = userEvent.setup();
    render(<ProjectsSection />);
    await user.click(screen.getByRole("button", { name: /Full case study/ }));
    const dialog = await screen.findByRole("dialog", { name: "myDishHome" });
    await user.click(within(dialog).getByRole("button", { name: "Show screenshot 3" }));
    expect(within(dialog).getByText("3", { selector: "b" })).toBeInTheDocument();
    expect(within(dialog).getByRole("button", { name: "Show screenshot 3" })).toHaveAttribute("aria-current", "true");
  });

  it("shows an internal-release placeholder and no store links for HG HUB", async () => {
    const user = userEvent.setup();
    render(<ProjectsSection />);
    await user.click(screen.getAllByRole("button", { name: /^Case study/ })[3]);
    const dialog = await screen.findByRole("dialog", { name: "HG HUB" });
    expect(within(dialog).getByText(/Internal release/)).toBeInTheDocument();
    expect(within(dialog).queryByRole("link")).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run it**

Run: `npm test -- CaseStudyModal`
Expected: FAIL.

- [ ] **Step 3: Implement**

**`CaseStudyModal`** (client):
- Render with `createPortal` into `document.body`, using the classes from M: `.modal` (fixed) → `motion.div.mbox` (`role="dialog" aria-modal="true" aria-labelledby="cs-title"`) → `.x` close button `aria-label="Close case study"` → `.mgrid` with the left column and `<PhoneShowcase/>`.
- **Left column, per M's `render()` template:** `.phead` with `h3#cs-title`, then `.stores` of `StoreBadge`s, then the Overview, App information `.info-grid`, Key features `.hl.two-col`, Architecture `.arch`, Key metrics `.metrics`, What I did `.hl` and Tech stack tags sections.
- **Behaviour** (copy the patterns from `Header.tsx`):
  - set `document.body.style.overflow="hidden"` on mount and reset it on unmount
  - focus the close button on mount
  - Tab trap within `.mbox`
  - Esc → `onClose`
  - backdrop click (`e.target === e.currentTarget`) → `onClose`
  - on unmount, `returnFocusTo?.focus()`
- **Animation:** `AnimatePresence` in `ProjectsSection` around `{openId && …}`. The backdrop fades `opacity 0→1`; the box springs `scale .92→1, y 20→0`.

**`PhoneShowcase`** (client):
- `const [i, setI] = useState(0)`, plus a `manualUntil` ref.
- On `scrollRoot.current` scroll: `setI(showcaseIndex(scrollTop / (scrollHeight - clientHeight), shots.length))`, unless `Date.now() < manualUntil`.
- Markup:
  - `.showcase` containing `.sc-phone` (tilted with `usePointerVars` on the wrapper; `transform: rotateY(calc(var(--px,0)*14deg - 8deg)) rotateX(calc(var(--py,0)*-10deg + 4deg))`), `.sc-notch`, and every `img.sc-img` (`on` when active, `alt={`${title} screenshot ${n}`}`), `.sc-glare`
  - `.sc-rail`: buttons with `aria-label={`Show screenshot ${n}`}`, `aria-current={active ? "true" : undefined}` and an `img` with `alt=""`
  - `.sc-count`: `<b>{i+1}</b> / {n}<span>Scroll to explore</span>`
- With no screenshots, render `.noshots` with the monogram and `statusNote`, or "Source code on GitHub".

Then wire `ProjectsSection`:
- A `triggerRef` stores `document.activeElement` when a card's button is clicked.
- `onOpen` sets `openId`; `onClose` sets `null`.
- Pass `returnFocusTo={triggerRef.current}`.

- [ ] **Step 4: Run the tests**

Run: `npm test -- CaseStudyModal ProjectsSection && npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 5: Commit**

`git add -A src/features/projects && git commit -m "feat: per-project case study modal with scroll-synced phone showcase"`

---

### Task 9: Experience and Education

**Files:**
- Rewrite: `src/features/experience/{types.ts,data/experience.data.ts,data/education.data.ts,components/ExperienceSection.tsx}`
- Create: `src/features/experience/components/Timeline.tsx`
- Test: rewrite `src/features/experience/experience.test.tsx`

**Interfaces:**
- `ExperienceEntry` without `version`.
- `EducationEntry` plus `focus: string`.
- `Timeline({ items: TimelineItem[]; tone: "cyan" | "fuchsia" })`, where `TimelineItem = { id; period; title; org; bullets: string[]; tags?: string[] }`.

- [ ] **Step 1: Write the failing test (replace the file)**

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EXPERIENCE_DATA } from "./data/experience.data";
import { ExperienceSection } from "./components/ExperienceSection";

describe("ExperienceSection", () => {
  it("shows detailed CV-style roles by default", () => {
    render(<ExperienceSection />);
    expect(EXPERIENCE_DATA.map((e) => e.responsibilities.length)).toEqual([6, 6, 3]);
    expect(screen.getByRole("tab", { name: "Experience" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("Mobile Application Developer")).toBeInTheDocument();
    expect(screen.getByText(/365 commits of my own/)).toBeInTheDocument();
  });
  it("switches to Education by click and arrow key", async () => {
    const user = userEvent.setup();
    render(<ExperienceSection />);
    await user.click(screen.getByRole("tab", { name: "Education" }));
    expect(screen.getByText(/MSc Data Science/)).toBeVisible();
    screen.getByRole("tab", { name: "Education" }).focus();
    await user.keyboard("{ArrowLeft}");
    expect(screen.getByRole("tab", { name: "Experience" })).toHaveAttribute("aria-selected", "true");
  });
});
```

- [ ] **Step 2: Run it**

Run: `npm test -- experience`
Expected: FAIL.

- [ ] **Step 3: Implement**

**Data:**
- Use the 6 / 6 / 3 bullets **verbatim from M's experience markup** (the `<!-- EXPERIENCE -->` jobs).
- Locations: "Karyabinayak, Nepal" and "Hattisar, Nepal".
- Tags are as in M.
- Remove `version` from the type and data.
- `education.data.ts` gets `focus`:
  - MSc: "Machine learning, data analysis and intelligent systems"
  - BSc: "Software engineering, mobile and web development"

**`ExperienceSection`** (client):
- `section#experience.aurora-section`, with a centred `SectionHeader` ("Experience" / "Where I've" / "worked" / "Where I've worked and what I've studied.").
- `.tabs` `role="tablist"` with two `role="tab"` buttons, `aria-controls` and arrow-key handling (copy the PhoneDemo keyboard pattern from git history, `phoneDemo` `onKeyDown`). The `motion.span layoutId="exp-tab"` pill gets the `.tabpill` styling.
- Two `role="tabpanel"` panels using `hidden`.

**`Timeline`:**
- `.tl` with `.line > motion.i` whose `scaleY` comes from `useScroll({ target: ref, offset: ["start 75%", "end 60%"] })`.
- `.job` cards alternate `r`, and each card is wrapped in `Reveal`.
- For education, `tone="fuchsia"` sets the dots and dates to `var(--fuchsia)`.

- [ ] **Step 4: Run the tests**

Run: `npm test -- experience && npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 5: Commit**

`git add -A src/features/experience && git commit -m "feat: detailed experience timeline with education tab"`

---

### Task 10: Skills

**Files:**
- Rewrite: `src/features/skills/{types.ts,data/skills.data.ts,components/SkillsSection.tsx}`
- Create: `src/features/skills/components/{CoreSkillCard,SkillGroupCard}.tsx`
- Test: rewrite `src/features/skills/skills.test.ts` as `skills.test.tsx`

**Interfaces:**
- `CoreSkill = { name: string; icon: string; level: "Primary" | "Proficient" | "Beginner"; value: number }`
- `SkillGroup = { title: string; emoji: string; accent: "indigo" | "cyan" | "fuchsia" | "emerald" | "amber" | "sky" | "rose" | "violet"; skills: { name: string; icon?: string }[] }`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { CORE_SKILLS, SKILL_GROUPS } from "./data/skills.data";
import { SkillsSection } from "./components/SkillsSection";

describe("skills", () => {
  it("rates the five beginner skills at half", () => {
    const beginners = CORE_SKILLS.filter((s) => s.level === "Beginner").map((s) => [s.name, s.value]);
    expect(beginners).toEqual([["React Native", 50], ["React", 50], ["Supabase", 50], ["Node.js", 50], ["TypeScript", 50]]);
    expect(CORE_SKILLS.find((s) => s.name === "Flutter")).toMatchObject({ level: "Primary", value: 95 });
  });
  it("has the eight detailed groups", () => {
    expect(SKILL_GROUPS.map((g) => g.title)).toEqual([
      "Mobile development", "State management", "Architecture", "Backend & APIs",
      "Databases & storage", "Frontend", "DevOps & delivery", "Developer tools",
    ]);
  });
  it("renders proficiency rings with accessible values", () => {
    render(<SkillsSection />);
    expect(screen.getByRole("meter", { name: "React Native proficiency" })).toHaveAttribute("aria-valuenow", "50");
    expect(screen.getAllByText("Beginner")).toHaveLength(5);
  });
});
```

- [ ] **Step 2: Run it**

Run: `npm test -- skills`
Expected: FAIL.

- [ ] **Step 3: Implement**

- **Data:** use the values from spec §4.6, and the group contents verbatim from M's `<!-- SKILLS -->` markup, with icons where M has `<img>`.
- **`CoreSkillCard`:**
  - `GlowCard.cc` containing `<span className="ring2" style={{"--v": value}} role="meter" aria-label={`${name} proficiency`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={value}>`, the `TechLogo`, `<b>`, and the `.lv` pill (`p` for Primary, `g` for Beginner).
  - The ring fills when it enters view: add the `in` class through IntersectionObserver; under reduced motion it's `in` immediately.
  - Cast the style with `as React.CSSProperties`.
- **`SkillGroupCard`:** `.scard` with `h3` (emoji tile coloured by the accent token through a `color-mix` style) and `.sk` chips.
- **`SkillsSection`:** `section#skills.aurora-section`, `SectionHeader`, `h3.subh` "Core technologies", `.core`, `h3.subh` "Everything I work with", `.sgrid4`.

- [ ] **Step 4: Run the tests**

Run: `npm test -- skills && npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 5: Commit**

`git add -A src/features/skills && git commit -m "feat: detailed toolkit with proficiency rings and eight skill groups"`

---

### Task 11: Contact

**Files:**
- Rewrite: `src/features/contact/components/{ContactSection,ContactForm}.tsx` (the hook and types stay unchanged)
- Test: keep `src/features/contact/ContactForm.test.tsx`; add `src/features/contact/ContactSection.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactSection } from "./components/ContactSection";

describe("ContactSection", () => {
  it("offers email, phone, location, GitHub and LinkedIn", () => {
    render(<ContactSection />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Let's build something great");
    expect(screen.getByRole("link", { name: /shakyarijwol19@gmail.com/ })).toHaveAttribute("href", "mailto:shakyarijwol19@gmail.com");
    expect(screen.getByRole("link", { name: /\+977-9861291534/ })).toHaveAttribute("href", "tel:+977-9861291534");
    expect(screen.getByText(/remote worldwide/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /@rijwolshakya09/ })).toHaveAttribute("href", "https://github.com/rijwolshakya09");
    expect(screen.getByRole("link", { name: /LinkedIn/ })).toHaveAttribute("href", "https://linkedin.com/in/rijwol-shakya-79411a217/");
  });
});
```

- [ ] **Step 2: Run it**

Run: `npm test -- ContactSection`
Expected: FAIL, because the heading text differs.

- [ ] **Step 3: Implement**

Port M's `<!-- CONTACT -->` markup:
- `section#contact.aurora-section`, with a centred `SectionHeader` ("Contact" / "Let's build" / "something great" / "Hiring for a Flutter role or need an app built? My inbox is open.").
- `.cgrid` with three `.info` cards (Email and Phone as links), plus `.info-row` with the GitHub and LinkedIn `.soc-card` links (`target="_blank" rel="noopener noreferrer"`).
- On the right, `.form` holding `ContactForm`.

**`ContactForm`:**
- Keep the existing logic, labels and states.
- Switch to floating labels: put the `<input placeholder=" ">` **before** the `<label>`, inside `.field`.
- `getByLabelText("Name")` must still work, so the label text stays Name / Email / Subject / Message, and the "What do you want built?" field is **removed from the UI**. The schema default `project: ""` stays.
- The submit button uses `buttonStyles({ variant: "gradient" })` with the label "Send message"; the existing tests query `/Send message/`, so update `ContactForm.test.tsx` from `{ name: "Send message" }` to `{ name: /Send message/ }` if an icon is added.

- [ ] **Step 4: Run the tests**

Run: `npm test -- Contact && npx tsc --noEmit`
Expected: PASS. All 3 existing ContactForm tests plus the new one.

- [ ] **Step 5: Commit**

`git add -A src/features/contact && git commit -m "feat: glass contact section with socials and floating-label form"`

---

### Task 12: Compose the page, clean up, docs, verify

**Files:**
- Modify: `src/app/page.tsx`, `src/app/page.test.tsx`, `AGENTS.md`, `PORTFOLIO_LOG.md`
- Delete: `src/components/ui/{SectionTitle,Chip}.tsx` and any orphan

- [ ] **Step 1: Update `page.test.tsx` (it fails first)**

Expect `["hero","about","work","experience","skills","contact"]` as the order of `main section[id]`.

Run: `npm test -- page.test`
Expected: FAIL.

- [ ] **Step 2: Compose `page.tsx`**

The order is: skip link → `<ScrollProgress/>` → `<Header/>` → `<main id="main-content">` containing `HeroSection`, `AboutSection`, `ProjectsSection`, `ExperienceSection`, `SkillsSection` and `ContactSection` → `<Footer/>`.

Then delete the orphans:

```bash
grep -rln "SectionTitle\|ui/Chip\|PhoneDemo\|CaseStudy\"\|SocialLinks" src || true
git rm -q src/components/ui/SectionTitle.tsx src/components/ui/Chip.tsx
```

Run: `npm test && npm run lint && npx tsc --noEmit && npm run build`
Expected: all pass. `out/CNAME`, `out/sitemap.xml` and `out/robots.txt` exist, and `ls out/apps/*/` lists the images.

- [ ] **Step 3: Update `AGENTS.md`**

- Replace the "Design tokens" bullet with: Aurora Glass tokens in `globals.css` (`background, foreground, muted, muted-2, indigo, cyan, fuchsia, emerald, glass-bg, glass-border`), dark default plus light; glassmorphism, aurora gradients and gradient text are the design language; complex effects live in `src/app/aurora.css` (`@layer components`); the visual reference is `docs/superpowers/specs/aurora-glass-mockup/`.
- Replace the "Motion budget" bullet with: rich motion is intended (scroll reveals, count-ups, tilt, orbit, marquee, timeline draw), with transform/opacity only; no content is hidden in server HTML; every keyframe stops under reduced motion.
- Fix the Tests example path to `src/lib/motion.ts`.

- [ ] **Step 4: `PORTFOLIO_LOG.md` session entry**

Add a "Session 4 — 2026-10-01: Aurora Glass" entry covering: why (Pocket was rejected), the spec, the mockup, the store links, the assets, and the DNS status (now active on Cloudflare; GitHub custom domain to be saved).

- [ ] **Step 5: Visual and Lighthouse verification**

- Serve with `npx --yes serve@14 out -l 4173`.
- Use Chrome headless screenshots, and Lighthouse with `--preset=desktop` and the default mobile preset for real device emulation.
- Compare each section against M:
  - 1280 dark, 1280 light, and 375 mobile (Lighthouse final-screenshot)
  - the case-study modal open: behaviour is covered by the Task 8 tests; check the visuals by opening it manually in Chrome
- Lighthouse targets:
  - mobile simulated: Accessibility 100, SEO 100, Performance ≥ 90
  - devtools throttling: Performance ≥ 95
- If performance falls short: add `loading="lazy"` / `decoding="async"` on all below-fold images, and pause the marquee and blobs off-screen (`animation-play-state:paused` while the IntersectionObserver reports them not visible).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: compose Aurora Glass page; docs and cleanup"
```

Stop. Do not merge or push. Report to the user.
