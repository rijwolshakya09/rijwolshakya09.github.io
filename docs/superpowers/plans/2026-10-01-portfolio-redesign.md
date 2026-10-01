# Portfolio Redesign + rijwol.com.np Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the portfolio's glassmorphism UI with the "Pocket" design: a tappable phone hero, a changelog-style Experience section, and a two-path Contact section. Correct the myDishHome commit figures to personal ones, and prepare the site to be served at `rijwol.com.np`.

**Architecture:** This rebuilds the visual layer in place on branch `redesign`. Data, lib, hooks, and contact logic are kept and adjusted. Sections stay inside `src/features/*`, and shared primitives live in `src/components/{ui,common}`. The site remains a static export (`output: "export"`) deployed by the existing GitHub Pages workflow.

**Tech Stack:** Next.js 16 (App Router, static export, React Compiler), React 19, TypeScript strict, Tailwind CSS v4, Framer Motion 12, next-themes, react-hook-form + zod 4, Vitest + Testing Library (new).

**Spec:** `docs/superpowers/specs/2026-10-01-portfolio-redesign-design.md`

## Global Constraints

- Static export only. No server runtime, no `headers()` or `cookies()`, and no dynamic server APIs. Metadata routes must use `export const dynamic = "force-static"`.
- No `useMemo` or `useCallback` (the React Compiler handles memoization). No `any`.
- Use `cn()` from `src/lib/utils.ts` for conditional classes. Add `"use client"` only to components that handle interaction or animation.
- Colors come only from the tokens in `globals.css`: `background, surface, foreground, muted, primary, on-primary, line, live`. Never use raw hex values in components (the one exception is the phone frame, see Task 4).
- Type: Bricolage Grotesque (`font-display`, weight 800) for headlines and version numbers, and Schibsted Grotesk (`font-sans`) for body text. Do not use all-caps labels, monospace labels, or a single accent-colored word inside a headline.
- `live` green is used only for dots and completed steps, never for text.
- Motion: one load moment (hero headline and phone), user-driven motion everywhere else, and the changelog rule as the only scroll reveal. Hover scale is exactly `1.02`. `MotionConfig reducedMotion="user"` is applied globally.
- Interactive targets must be at least 48×48px (`min-h-12`, plus `min-w-12` for icon buttons).
- myDishHome personal figures are **365 commits, 189 features, 89 fixes, 29 refactors**. The strings `1,065`, `1,000+`, `65+ fix`, `29 feature branches`, `29 active feature branches`, and `2+ years` must not appear in `src/` or `scripts/`.
- Years of experience is written as **3+ years** (first role Feb 2023).
- The phone demo is unbranded: it must never contain "Dish" or "DishHome", a logo, or DishHome colors.
- Site URL: `https://rijwol.com.np`.
- Never push or merge to `master` without the user's approval. A push to `master` deploys the site.

## Review Focus

1. **Double-tapping Pay during processing.** The user expects a single receipt and a single announcement. Pinned in Task 3 (reducer ignores `pay` while processing) and Task 4 (button disabled).
2. **Switching tabs in the middle of a payment, then coming back.** The user expects the receipt to be there, with no lost state and no stray timer errors. Pinned in Task 4: panels stay mounted and are hidden with the `hidden` attribute.
3. **Theme toggle when the theme is "system" and the OS is dark.** One click should switch to light mode. The old code compared `theme === "dark"`, so with the system theme the first click did nothing. Pinned in Task 2.
4. **Mobile menu: Esc and focus.** Esc should close the sheet and return focus to the menu button, and page scroll should be locked while it is open. Pinned in Task 6.
5. **Double-clicking "Send message".** The user expects exactly one Formspree request. Pinned in Task 10 with a ref guard.

---

## File map

| Path | Status | Responsibility |
|---|---|---|
| `vitest.config.mts`, `vitest.setup.ts` | new | Test runner, jsdom, `@` alias, matchMedia and IntersectionObserver stubs |
| `src/app/globals.css` | rewrite | Tokens (light and dark), `@theme inline`, class-based `dark` variant, base styles |
| `src/app/layout.tsx` | modify | Fonts, metadata, canonical URL |
| `src/app/page.tsx` | modify | Section composition |
| `src/app/sitemap.ts`, `src/app/robots.ts` | new | Static SEO routes |
| `public/CNAME` | new | Custom domain for GitHub Pages |
| `src/lib/constants.ts` | modify | URL, copy, nav, CV path |
| `src/lib/formspree.ts` | modify | Real Formspree endpoint |
| `src/components/common/Providers.tsx` | modify | `MotionConfig` wrapper, system theme |
| `src/components/common/ThemeToggle.tsx` | rewrite | Uses `resolvedTheme`; `useSyncExternalStore` mounted guard |
| `src/components/common/Header.tsx` | rewrite | Sticky header and accessible bottom sheet |
| `src/components/common/Footer.tsx` | rewrite | Footer |
| `src/components/common/SocialLinks.tsx` | new | GitHub, LinkedIn, and email icon links (48px) |
| `src/components/ui/Container.tsx` | new | Max-width container |
| `src/components/ui/SectionTitle.tsx` | new | Section `h2` with optional intro paragraph |
| `src/components/ui/Chip.tsx` | new | Tech chip |
| `src/components/ui/Button.tsx` | modify | Adds `buttonStyles()` for anchors; restyled |
| `src/features/hero/components/PhoneDemo/*` | new | Phone demo: logic, three screens, tab shell |
| `src/features/hero/components/HeroSection.tsx` | rewrite | Hero |
| `src/features/projects/*` | modify/new | `tier` field, `CaseStudy`, `ProjectCard`, section |
| `src/features/experience/*` | modify | `version` field, education data, changelog section |
| `src/features/skills/*` | modify | Three groups, chip rows |
| `src/features/contact/*` | modify/new | Schema in `types.ts`, `ContactForm`, two-path section |
| `scripts/generate-og.mjs` | rewrite | New-palette OG image |
| Deleted | — | `features/about/`, `TechMarquee`, `ScrollProgress`, `ProjectModal`, `useProjectFilter`, `GlassCard`, `Badge`, `SectionHeading`, `useScrollDirection`, `public/{file,globe,next,vercel,window}.svg`, `public/icons/` |

Notes found while planning, which the tasks fix:
- `globals.css` has no class-based `dark` variant. Tailwind v4 defaults `dark:` to the OS media query, so `dark:` utilities ignore the theme toggle. Task 2 adds the variant.
- `FORMSPREE_ENDPOINT` in `src/lib/formspree.ts` holds an invalid value, and the hook hardcodes `https://formspree.io/f/xykvegga` instead. Task 10 makes the constant hold that real ID and uses it.
- The Finance Tracker GitHub repo returns 404 (it is private), so it gets no `githubUrl`.
- The OG image still says "1,065+", "29 feature branches", and the old `/my-portfolio` URL. Task 12 fixes this.

---

### Task 1: Test harness + commit-figure corrections

**Files:**
- Modify: `package.json` (devDeps, `test` script)
- Create: `vitest.config.mts`, `vitest.setup.ts`
- Modify: `src/features/projects/data/projects.data.ts` (myDishHome `metrics`, first highlight)
- Modify: `src/features/experience/data/experience.data.ts` (dish-media bullets 1 and 5)
- Modify: `src/lib/constants.ts` (`SITE_METADATA.description`)
- Test: `src/content.test.ts`

**Interfaces:**
- Produces: `npm test` (runs `vitest run`); the test setup file; the corrected metric labels `"Commits" | "Features" | "Fixes" | "Refactors" | "Payment gateways" | "Active"`.

- [ ] **Step 1: Install test dependencies**

```bash
npm i -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/user-event @testing-library/jest-dom
npm pkg set scripts.test="vitest run"
```

- [ ] **Step 2: Create `vitest.config.mts`**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    css: false,
  },
});
```

- [ ] **Step 3: Create `vitest.setup.ts`**

```ts
import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => cleanup());

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string): MediaQueryList =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList,
});

class StubIntersectionObserver {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds: number[] = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}
window.IntersectionObserver = StubIntersectionObserver as unknown as typeof IntersectionObserver;
```

- [ ] **Step 4: Write the failing test `src/content.test.ts`**

```ts
import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { PROJECTS_DATA } from "@/features/projects/data/projects.data";
import { EXPERIENCE_DATA } from "@/features/experience/data/experience.data";

const BANNED = ["1,065", "1,000+", "65+ fix", "29 feature branches", "29 active feature branches", "2+ years"];

function filesUnder(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return filesUnder(p);
    return /\.(ts|tsx|mjs)$/.test(p) && !p.endsWith(".test.ts") ? [p] : [];
  });
}

describe("myDishHome figures are personal", () => {
  const dish = PROJECTS_DATA.find((p) => p.id === "mydishhome");
  const metric = (label: string) => dish?.metrics.find((m) => m.label === label)?.value;

  it("shows my own commit counts", () => {
    expect(metric("Commits")).toBe("365");
    expect(metric("Features")).toBe("189");
    expect(metric("Fixes")).toBe("89");
    expect(metric("Refactors")).toBe("29");
  });

  it("drops the team-wide branch count", () => {
    expect(dish?.metrics.some((m) => /branch/i.test(m.label))).toBe(false);
  });

  it("states the personal count in the current role", () => {
    const current = EXPERIENCE_DATA.find((e) => e.current);
    expect(current?.responsibilities.some((r) => r.includes("365 commits"))).toBe(true);
  });
});

describe("no stale figures anywhere in source", () => {
  const files = [...filesUnder(join(process.cwd(), "src")), ...filesUnder(join(process.cwd(), "scripts"))];
  for (const banned of BANNED) {
    it(`never contains "${banned}"`, () => {
      const hits = files.filter((f) => readFileSync(f, "utf8").includes(banned));
      expect(hits).toEqual([]);
    });
  }
});
```

- [ ] **Step 5: Run it to confirm it fails**

Run: `npm test -- src/content.test.ts`
Expected: FAIL. `metric("Commits")` is `undefined`, and the banned-string checks list `projects.data.ts`, `experience.data.ts`, `constants.ts`, the old Hero, About, and `scripts/generate-og.mjs`.

The checks on `HeroSection.tsx`, `AboutSection.tsx`, and `scripts/generate-og.mjs` stay red until Tasks 5, 11, and 12. For now, mark those three checks as **expected failures**: add `"src/features/hero/components/HeroSection.tsx"`, `"src/features/about/components/AboutSection.tsx"`, and `"scripts/generate-og.mjs"` to a `PENDING` array, and filter them out of `hits`. Put this comment above the array: `// Removed as Tasks 5, 11, 12 land — the array must be empty at the end.`

```ts
// Removed as Tasks 5, 11, 12 land — the array must be empty at the end.
const PENDING = [
  "src/features/hero/components/HeroSection.tsx",
  "src/features/about/components/AboutSection.tsx",
  "scripts/generate-og.mjs",
];
// inside the loop:
const hits = files
  .filter((f) => !PENDING.some((p) => f.endsWith(p)))
  .filter((f) => readFileSync(f, "utf8").includes(banned));
```

- [ ] **Step 6: Fix the myDishHome data in `projects.data.ts`**

Replace the `metrics` array of `id: "mydishhome"` with:

```ts
    // Personal figures from dmn-customer-mobile-app, all refs, merge commits excluded (measured 2026-10-01):
    //   git rev-list --all --no-merges --author='rijwol.shakya@dishhome.com.np' --count
    //   git log --all --no-merges --author='rijwol.shakya@dishhome.com.np' --format=%s | grep -ciE '^feat(\(.*\))?!?:'
    //   (same grep with fix / refactor)
    metrics: [
      { label: "Commits", value: "365" },
      { label: "Features", value: "189" },
      { label: "Fixes", value: "89" },
      { label: "Refactors", value: "29" },
      { label: "Payment gateways", value: "4" },
      { label: "Active", value: "Since Jan 2026" },
    ],
```

Replace the first `highlights` entry with:
`"Integrated four payment gateways — eSewa, Khalti, FonePay and GetPay — with intent-based flows and in-app checkout.",`

- [ ] **Step 7: Fix `experience.data.ts` (dish-media entry)**

- Bullet 1 becomes: `"Building and maintaining myDishHome, a production Flutter app serving DishHome subscribers across Nepal, where I've authored 365 commits — 189 features and 89 fixes.",`
- Bullet 5 becomes: `"Configured Firebase Crashlytics for real-time crash monitoring and drove systematic bug triage across 89 fix commits.",`

- [ ] **Step 8: Fix `SITE_METADATA.description` in `src/lib/constants.ts`**

```ts
  description:
    "Flutter developer in Kathmandu with 3+ years building production Android and iOS apps — payments, real-time tracking and rich push — with Clean Architecture, GetX, Riverpod and Firebase.",
```

- [ ] **Step 9: Run the tests**

Run: `npm test`
Expected: PASS (the pending files are filtered out).

- [ ] **Step 10: Commit**

```bash
git add package.json package-lock.json vitest.config.mts vitest.setup.ts src/content.test.ts src/features/projects/data/projects.data.ts src/features/experience/data/experience.data.ts src/lib/constants.ts
git commit -m "fix: show personal myDishHome commit figures; add vitest"
```

---

### Task 2: Visual foundation (tokens, fonts, primitives, theme toggle)

**Files:**
- Rewrite: `src/app/globals.css`
- Modify: `src/app/layout.tsx` (fonts only; metadata is changed in Task 12)
- Modify: `src/components/common/Providers.tsx`
- Rewrite: `src/components/common/ThemeToggle.tsx`
- Modify: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Container.tsx`, `src/components/ui/SectionTitle.tsx`, `src/components/ui/Chip.tsx`, `src/components/common/SocialLinks.tsx`
- Test: `src/components/common/ThemeToggle.test.tsx`

**Interfaces:**
- Produces:
  - `Container({ className?, children })`
  - `SectionTitle({ id: string; title: string; intro?: string })` renders an `h2` with that `id`
  - `Chip({ children })`
  - `buttonStyles(opts?: { variant?: "primary" | "outline" | "ghost"; size?: "sm" | "md" | "lg"; className?: string }): string`
  - `Button` (same props as today)
  - `SocialLinks({ className?, include?: Array<"github" | "linkedin" | "email"> })`
  - `ThemeToggle({ className? })`
  - Tailwind utilities: `bg-background bg-surface text-foreground text-muted bg-primary text-primary text-on-primary border-line bg-live font-display font-sans`
- Legacy aliases kept until Task 11: `surface-muted`, `border`, `accent`, `primary-hover`, `.glass`, `.gradient-text`, `.section`.

- [ ] **Step 1: Write the failing test `src/components/common/ThemeToggle.test.tsx`**

```tsx
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockTheme = vi.hoisted(() => ({ resolvedTheme: "dark", setTheme: vi.fn() }));
vi.mock("next-themes", () => ({
  useTheme: () => ({ theme: "system", resolvedTheme: mockTheme.resolvedTheme, setTheme: mockTheme.setTheme }),
}));

import { ThemeToggle } from "./ThemeToggle";

const setTheme = mockTheme.setTheme;

describe("ThemeToggle", () => {
  beforeEach(() => setTheme.mockClear());

  it("switches to light when the system theme resolves to dark", async () => {
    mockTheme.resolvedTheme = "dark";
    render(<ThemeToggle />);
    await userEvent.click(screen.getByRole("button", { name: "Switch to light mode" }));
    expect(setTheme).toHaveBeenCalledWith("light");
  });

  it("switches to dark when the system theme resolves to light", async () => {
    mockTheme.resolvedTheme = "light";
    render(<ThemeToggle />);
    await userEvent.click(screen.getByRole("button", { name: "Switch to dark mode" }));
    expect(setTheme).toHaveBeenCalledWith("dark");
  });
});
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `npm test -- ThemeToggle`
Expected: FAIL. There is no button named "Switch to light mode", because the current label is "Toggle dark mode".

- [ ] **Step 3: Rewrite `ThemeToggle.tsx`**

```tsx
"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const subscribe = () => () => {};

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  if (!mounted) return <div className="h-12 w-12" aria-hidden />;

  const isDark = resolvedTheme === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "flex h-12 w-12 items-center justify-center rounded-full text-muted transition-colors hover:text-foreground",
        className
      )}
    >
      {isDark ? <Sun size={18} aria-hidden /> : <Moon size={18} aria-hidden />}
    </button>
  );
}
```

- [ ] **Step 4: Run the test**

Run: `npm test -- ThemeToggle`
Expected: PASS.

- [ ] **Step 5: Rewrite `src/app/globals.css`**

```css
@import "tailwindcss";

/* Class-based dark mode (next-themes sets .dark on <html>) */
@custom-variant dark (&:where(.dark, .dark *));

:root {
  --background: #eef1f4;
  --surface: #ffffff;
  --foreground: #14202b;
  --muted: #4a5866;
  --primary: #2f5bff;
  --on-primary: #ffffff;
  --line: #d5dbe3;
  --live: #16b67a;

  /* Legacy aliases for old components — removed in Task 11 */
  --surface-muted: var(--surface);
  --border: var(--line);
  --accent: var(--primary);
  --primary-hover: var(--primary);
}

.dark {
  --background: #0f1a26;
  --surface: #172433;
  --foreground: #e6ecf2;
  --muted: #a9b6c4;
  --primary: #7c9bff;
  --on-primary: #0f1a26;
  --line: #263445;
  --live: #34d399;
}

@theme inline {
  --color-background: var(--background);
  --color-surface: var(--surface);
  --color-foreground: var(--foreground);
  --color-muted: var(--muted);
  --color-primary: var(--primary);
  --color-on-primary: var(--on-primary);
  --color-line: var(--line);
  --color-live: var(--live);
  --font-sans: var(--font-schibsted), ui-sans-serif, system-ui, sans-serif;
  --font-display: var(--font-bricolage), ui-sans-serif, system-ui, sans-serif;

  /* Legacy — removed in Task 11 */
  --color-surface-muted: var(--surface-muted);
  --color-border: var(--border);
  --color-accent: var(--accent);
  --color-primary-hover: var(--primary-hover);
}

html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-sans);
}

section[id] {
  scroll-margin-top: 5rem;
}

::selection {
  background: var(--primary);
  color: var(--on-primary);
}

:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 3px;
}

/* ── Legacy (old components) — removed in Task 11 ── */
.glass {
  background: var(--surface);
  border: 1px solid var(--line);
}
.gradient-text {
  color: var(--primary);
}
.section {
  padding-top: 5rem;
  padding-bottom: 5rem;
}
```

- [ ] **Step 6: Swap the fonts in `src/app/layout.tsx`**

Replace the `Geist` / `Geist_Mono` imports and constants with the following, and set `<html className={`${bricolage.variable} ${schibsted.variable} h-full antialiased`}>`:

```tsx
import { Bricolage_Grotesque, Schibsted_Grotesk } from "next/font/google";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["500", "800"],
  display: "swap",
});

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});
```

- [ ] **Step 7: Update `Providers.tsx`**

```tsx
"use client";

import { ThemeProvider } from "next-themes";
import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeProvider>
  );
}
```

- [ ] **Step 8: Update `Button.tsx`**

Keep the existing props. Add an exported `buttonStyles` and use it inside `Button`:

```tsx
import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: { variant?: Variant; size?: Size; className?: string } = {}): string {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-[transform,background-color,color,border-color] duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none motion-reduce:hover:scale-100",
    variant === "primary" && "bg-primary text-on-primary",
    variant === "outline" && "border-[1.5px] border-foreground text-foreground hover:bg-foreground hover:text-background",
    variant === "ghost" && "text-foreground hover:bg-surface",
    size === "sm" && "min-h-12 px-4 text-sm",
    size === "md" && "min-h-12 px-5 text-sm",
    size === "lg" && "min-h-14 px-7 text-base",
    className
  );
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={buttonStyles({ variant, size, className })} {...props} />
  )
);

Button.displayName = "Button";
export { Button };
```

- [ ] **Step 9: Create the primitives**

`src/components/ui/Container.tsx`:
```tsx
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1120px] px-4 md:px-6 lg:px-8", className)}>{children}</div>;
}
```

`src/components/ui/SectionTitle.tsx`:
```tsx
export function SectionTitle({ id, title, intro }: { id: string; title: string; intro?: string }) {
  return (
    <div className="mb-10 max-w-[60ch] md:mb-14">
      <h2 id={id} className="font-display text-3xl font-extrabold tracking-[-0.02em] md:text-5xl">
        {title}
      </h2>
      {intro && <p className="mt-3 text-lg text-muted">{intro}</p>}
    </div>
  );
}
```

`src/components/ui/Chip.tsx`:
```tsx
import type { ReactNode } from "react";

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-lg border border-line px-2.5 py-1 text-sm text-muted">
      {children}
    </span>
  );
}
```

`src/components/common/SocialLinks.tsx`:
```tsx
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { SOCIAL_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

type Kind = "github" | "linkedin" | "email";

const LINK = "flex h-12 w-12 items-center justify-center rounded-full text-muted transition-colors hover:text-foreground";

export function SocialLinks({
  className,
  include = ["github", "linkedin", "email"],
}: {
  className?: string;
  include?: Kind[];
}) {
  return (
    <ul className={cn("flex items-center gap-1", className)}>
      {include.includes("github") && (
        <li>
          <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className={LINK}>
            <GithubIcon width={18} height={18} />
          </a>
        </li>
      )}
      {include.includes("linkedin") && (
        <li>
          <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className={LINK}>
            <LinkedinIcon width={18} height={18} />
          </a>
        </li>
      )}
      {include.includes("email") && (
        <li>
          <a href={SOCIAL_LINKS.email} aria-label="Email me" className={LINK}>
            <Mail size={18} aria-hidden />
          </a>
        </li>
      )}
    </ul>
  );
}
```

- [ ] **Step 10: Verify the build**

Run: `npm test && npx tsc --noEmit && npm run build`
Expected: all pass. The old sections still render, using the legacy aliases.

- [ ] **Step 11: Commit**

```bash
git add -A src/app/globals.css src/app/layout.tsx src/components
git commit -m "feat: new design tokens, fonts and UI primitives; fix theme toggle for system theme"
```

---

### Task 3: Phone demo logic (pure reducers)

**Files:**
- Create: `src/features/hero/components/PhoneDemo/phoneDemo.logic.ts`
- Test: `src/features/hero/components/PhoneDemo/phoneDemo.logic.test.ts`

**Interfaces:**
- Produces (all exported):
  - `TICKET_STEPS = ["Booked", "Assigned", "On the way", "Completed"] as const`, `type TicketStep`
  - `TICKET_COPY: Record<TicketStep, { announcement: string; detail: string }>`
  - `interface TicketState { stepIndex: number }`, `type TicketAction = { type: "refresh" } | { type: "reset" }`
  - `initialTicketState: TicketState` (stepIndex 1), `ticketReducer(state, action): TicketState`, `isTicketComplete(state): boolean`
  - `GATEWAYS = ["eSewa", "Khalti", "FonePay"] as const`, `type Gateway`
  - `type PaymentState = { status: "idle"; gateway: Gateway | null } | { status: "processing"; gateway: Gateway } | { status: "received"; gateway: Gateway }`
  - `type PaymentAction = { type: "select"; gateway: Gateway } | { type: "pay" } | { type: "settle" } | { type: "reset" }`
  - `initialPaymentState`, `paymentReducer(state, action): PaymentState`
  - `PROCESSING_MS = 900`, `BILL_AMOUNT = "Rs 1,150"`

- [ ] **Step 1: Write the failing test**

```ts
import { describe, expect, it } from "vitest";
import {
  TICKET_STEPS,
  initialTicketState,
  ticketReducer,
  isTicketComplete,
  initialPaymentState,
  paymentReducer,
  type PaymentState,
} from "./phoneDemo.logic";

describe("ticketReducer", () => {
  it("starts at Assigned", () => {
    expect(TICKET_STEPS[initialTicketState.stepIndex]).toBe("Assigned");
  });

  it("advances one step per refresh and stops at Completed", () => {
    let s = initialTicketState;
    s = ticketReducer(s, { type: "refresh" });
    expect(TICKET_STEPS[s.stepIndex]).toBe("On the way");
    s = ticketReducer(s, { type: "refresh" });
    expect(isTicketComplete(s)).toBe(true);
    const again = ticketReducer(s, { type: "refresh" });
    expect(again).toBe(s);
  });

  it("reset returns to the initial step", () => {
    const done = { stepIndex: TICKET_STEPS.length - 1 };
    expect(ticketReducer(done, { type: "reset" })).toEqual(initialTicketState);
  });
});

describe("paymentReducer", () => {
  it("rejects pay without a gateway", () => {
    expect(paymentReducer(initialPaymentState, { type: "pay" })).toBe(initialPaymentState);
  });

  it("goes idle → processing → received → idle", () => {
    let s: PaymentState = paymentReducer(initialPaymentState, { type: "select", gateway: "Khalti" });
    expect(s).toEqual({ status: "idle", gateway: "Khalti" });
    s = paymentReducer(s, { type: "pay" });
    expect(s).toEqual({ status: "processing", gateway: "Khalti" });
    s = paymentReducer(s, { type: "settle" });
    expect(s).toEqual({ status: "received", gateway: "Khalti" });
    s = paymentReducer(s, { type: "reset" });
    expect(s).toEqual(initialPaymentState);
  });

  it("ignores a second pay while processing (double tap)", () => {
    const processing: PaymentState = { status: "processing", gateway: "eSewa" };
    expect(paymentReducer(processing, { type: "pay" })).toBe(processing);
  });

  it("ignores gateway changes while processing and settle while idle", () => {
    const processing: PaymentState = { status: "processing", gateway: "eSewa" };
    expect(paymentReducer(processing, { type: "select", gateway: "Khalti" })).toBe(processing);
    expect(paymentReducer(initialPaymentState, { type: "settle" })).toBe(initialPaymentState);
  });
});
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `npm test -- phoneDemo.logic`
Expected: FAIL with "Failed to resolve import ./phoneDemo.logic".

- [ ] **Step 3: Implement `phoneDemo.logic.ts`**

```ts
export const TICKET_STEPS = ["Booked", "Assigned", "On the way", "Completed"] as const;
export type TicketStep = (typeof TICKET_STEPS)[number];

export const TICKET_COPY: Record<TicketStep, { announcement: string; detail: string }> = {
  Booked: { announcement: "Visit booked", detail: "We've received your request." },
  Assigned: { announcement: "Technician assigned", detail: "A technician has been assigned to your visit." },
  "On the way": { announcement: "Technician on the way", detail: "Your technician is on the way. ETA 25 min." },
  Completed: { announcement: "Visit completed", detail: "Visit completed. Thanks for your patience." },
};

export interface TicketState {
  stepIndex: number;
}
export type TicketAction = { type: "refresh" } | { type: "reset" };

export const initialTicketState: TicketState = { stepIndex: 1 };

export function isTicketComplete(state: TicketState): boolean {
  return state.stepIndex >= TICKET_STEPS.length - 1;
}

export function ticketReducer(state: TicketState, action: TicketAction): TicketState {
  switch (action.type) {
    case "refresh":
      return isTicketComplete(state) ? state : { stepIndex: state.stepIndex + 1 };
    case "reset":
      return initialTicketState;
  }
}

export const GATEWAYS = ["eSewa", "Khalti", "FonePay"] as const;
export type Gateway = (typeof GATEWAYS)[number];

export type PaymentState =
  | { status: "idle"; gateway: Gateway | null }
  | { status: "processing"; gateway: Gateway }
  | { status: "received"; gateway: Gateway };

export type PaymentAction =
  | { type: "select"; gateway: Gateway }
  | { type: "pay" }
  | { type: "settle" }
  | { type: "reset" };

export const initialPaymentState: PaymentState = { status: "idle", gateway: null };
export const PROCESSING_MS = 900;
export const BILL_AMOUNT = "Rs 1,150";

export function paymentReducer(state: PaymentState, action: PaymentAction): PaymentState {
  switch (action.type) {
    case "select":
      return state.status === "idle" ? { status: "idle", gateway: action.gateway } : state;
    case "pay":
      return state.status === "idle" && state.gateway ? { status: "processing", gateway: state.gateway } : state;
    case "settle":
      return state.status === "processing" ? { status: "received", gateway: state.gateway } : state;
    case "reset":
      return initialPaymentState;
  }
}
```

- [ ] **Step 4: Run the test**

Run: `npm test -- phoneDemo.logic`
Expected: PASS (8 tests).

- [ ] **Step 5: Commit**

```bash
git add src/features/hero/components/PhoneDemo
git commit -m "feat: phone demo ticket and payment reducers"
```

---

### Task 4: Phone demo UI

**Files:**
- Create in `src/features/hero/components/PhoneDemo/`: `TicketScreen.tsx`, `PayScreen.tsx`, `AlertsScreen.tsx`, `PhoneDemo.tsx`
- Test: `src/features/hero/components/PhoneDemo/PhoneDemo.test.tsx`

**Interfaces:**
- Consumes: everything from Task 3.
- Produces: `PhoneDemo()` (no props; a client component). Each screen takes `{ onAnnounce: (message: string) => void }`.
- Exception: the phone frame uses the fixed hex `#14202b` (light) and `#05090e` (dark), because the frame represents hardware and must not invert with the theme.

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, expect, it, vi, afterEach } from "vitest";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PhoneDemo } from "./PhoneDemo";

afterEach(() => vi.useRealTimers());

describe("PhoneDemo", () => {
  it("shows the Ticket screen first and switches tabs on click", async () => {
    render(<PhoneDemo />);
    const ticket = screen.getByRole("tab", { name: "Ticket" });
    expect(ticket).toHaveAttribute("aria-selected", "true");
    await userEvent.click(screen.getByRole("tab", { name: "Pay" }));
    expect(screen.getByRole("tab", { name: "Pay" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel", { name: "Pay" })).toBeVisible();
  });

  it("moves between tabs with arrow keys", async () => {
    render(<PhoneDemo />);
    screen.getByRole("tab", { name: "Ticket" }).focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Pay" })).toHaveFocus();
    expect(screen.getByRole("tab", { name: "Pay" })).toHaveAttribute("aria-selected", "true");
    await userEvent.keyboard("{ArrowLeft}{ArrowLeft}");
    expect(screen.getByRole("tab", { name: "Alerts" })).toHaveFocus();
  });

  it("advances the ticket and announces it", async () => {
    render(<PhoneDemo />);
    await userEvent.click(screen.getByRole("button", { name: "Refresh status" }));
    expect(screen.getByRole("status")).toHaveTextContent("Technician on the way");
    await userEvent.click(screen.getByRole("button", { name: "Refresh status" }));
    expect(screen.getByRole("button", { name: "Refresh status" })).toBeDisabled();
  });

  it("pays once, announces, and survives a tab switch mid-payment", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<PhoneDemo />);
    await user.click(screen.getByRole("tab", { name: "Pay" }));
    const pay = screen.getByRole("button", { name: /^Pay Rs/ });
    expect(pay).toBeDisabled();
    await user.click(screen.getByRole("radio", { name: "Khalti" }));
    await user.click(pay);
    expect(screen.getByRole("button", { name: "Processing…" })).toBeDisabled();
    await user.click(screen.getByRole("tab", { name: "Alerts" }));
    await act(async () => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByRole("status")).toHaveTextContent("Payment received via Khalti");
    await user.click(screen.getByRole("tab", { name: "Pay" }));
    expect(screen.getAllByText("Payment received")).toHaveLength(1);
  });

  it("never shows DishHome branding", () => {
    const { container } = render(<PhoneDemo />);
    expect(container.textContent ?? "").not.toMatch(/dish/i);
  });
});
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `npm test -- PhoneDemo.test`
Expected: FAIL with "Failed to resolve import ./PhoneDemo".

- [ ] **Step 3: Implement `TicketScreen.tsx`**

```tsx
"use client";

import { useReducer } from "react";
import { cn } from "@/lib/utils";
import {
  TICKET_COPY,
  TICKET_STEPS,
  initialTicketState,
  isTicketComplete,
  ticketReducer,
} from "./phoneDemo.logic";

export function TicketScreen({ onAnnounce }: { onAnnounce: (message: string) => void }) {
  const [state, dispatch] = useReducer(ticketReducer, initialTicketState);
  const step = TICKET_STEPS[state.stepIndex];
  const done = isTicketComplete(state);

  const refresh = () => {
    const next = ticketReducer(state, { type: "refresh" });
    dispatch({ type: "refresh" });
    onAnnounce(TICKET_COPY[TICKET_STEPS[next.stepIndex]].announcement);
  };

  return (
    <div className="flex h-full flex-col">
      <p className="text-base font-semibold">Technician visit</p>
      <p className="text-xs text-muted">Ticket #48213 · Set-top box not powering on</p>

      <ol className="mt-5 flex gap-1" aria-label="Visit progress">
        {TICKET_STEPS.map((s, i) => (
          <li key={s} className="flex-1">
            <span
              className={cn(
                "block h-1.5 rounded-full",
                i < state.stepIndex || done ? "bg-live" : i === state.stepIndex ? "bg-primary" : "bg-line"
              )}
            />
            <span className="sr-only">
              {s}
              {i < state.stepIndex || (done && i === state.stepIndex) ? " (done)" : i === state.stepIndex ? " (current)" : ""}
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-xs text-muted">
        Step {state.stepIndex + 1} of {TICKET_STEPS.length}
      </p>

      <div className="mt-4 rounded-2xl bg-background p-4">
        <p className="font-display text-xl font-extrabold">{step}</p>
        <p className="mt-1 text-sm text-muted">{TICKET_COPY[step].detail}</p>
      </div>

      <div className="mt-auto flex flex-col gap-2">
        <button
          type="button"
          onClick={refresh}
          disabled={done}
          className="min-h-12 rounded-xl bg-primary text-sm font-semibold text-on-primary disabled:opacity-40"
        >
          Refresh status
        </button>
        {done && (
          <button
            type="button"
            onClick={() => {
              dispatch({ type: "reset" });
              onAnnounce("Demo reset");
            }}
            className="min-h-12 rounded-xl text-sm font-semibold text-primary"
          >
            Start over
          </button>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Implement `PayScreen.tsx`**

```tsx
"use client";

import { useEffect, useReducer } from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  BILL_AMOUNT,
  GATEWAYS,
  PROCESSING_MS,
  initialPaymentState,
  paymentReducer,
} from "./phoneDemo.logic";

export function PayScreen({ onAnnounce }: { onAnnounce: (message: string) => void }) {
  const [state, dispatch] = useReducer(paymentReducer, initialPaymentState);

  useEffect(() => {
    if (state.status !== "processing") return;
    const gateway = state.gateway;
    const id = window.setTimeout(() => {
      dispatch({ type: "settle" });
      onAnnounce(`Payment received via ${gateway}`);
    }, PROCESSING_MS);
    return () => window.clearTimeout(id);
  }, [state, onAnnounce]);

  if (state.status === "received") {
    return (
      <div className="flex h-full flex-col items-center justify-center text-center">
        <CheckCircle2 size={44} className="text-live" aria-hidden />
        <p className="mt-3 font-display text-xl font-extrabold">Payment received</p>
        <p className="mt-1 text-sm text-muted">
          {BILL_AMOUNT} via {state.gateway}
        </p>
        <button
          type="button"
          onClick={() => dispatch({ type: "reset" })}
          className="mt-6 min-h-12 rounded-xl px-5 text-sm font-semibold text-primary"
        >
          Pay again
        </button>
      </div>
    );
  }

  const processing = state.status === "processing";
  return (
    <div className="flex h-full flex-col">
      <p className="text-base font-semibold">Pay your bill</p>
      <p className="text-xs text-muted">Monthly TV + internet</p>
      <p className="mt-4 font-display text-3xl font-extrabold tabular-nums">{BILL_AMOUNT}</p>

      <fieldset className="mt-5" disabled={processing}>
        <legend className="mb-2 text-xs text-muted">Pay with</legend>
        <div className="flex flex-col gap-2">
          {GATEWAYS.map((g) => (
            <label
              key={g}
              className={cn(
                "flex min-h-12 cursor-pointer items-center justify-between rounded-xl bg-background px-3 text-sm",
                state.gateway === g && "ring-2 ring-primary"
              )}
            >
              {g}
              <input
                type="radio"
                name="gateway"
                value={g}
                checked={state.gateway === g}
                onChange={() => dispatch({ type: "select", gateway: g })}
                className="h-4 w-4 accent-[var(--primary)]"
              />
            </label>
          ))}
        </div>
      </fieldset>

      <button
        type="button"
        disabled={!state.gateway || processing}
        onClick={() => {
          dispatch({ type: "pay" });
          if (state.gateway) onAnnounce(`Processing payment via ${state.gateway}`);
        }}
        className="mt-auto min-h-12 rounded-xl bg-primary text-sm font-semibold text-on-primary disabled:opacity-40"
      >
        {processing ? "Processing…" : `Pay ${BILL_AMOUNT}`}
      </button>
    </div>
  );
}
```

- [ ] **Step 5: Implement `AlertsScreen.tsx`**

```tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Tv } from "lucide-react";

export function AlertsScreen({ onAnnounce }: { onAnnounce: (message: string) => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-full flex-col">
      <p className="text-center font-display text-5xl font-extrabold tabular-nums">9:41</p>
      <p className="text-center text-xs text-muted">Thursday, 1 October</p>

      <motion.button
        layout
        type="button"
        aria-expanded={open}
        onClick={() => {
          setOpen(!open);
          onAnnounce(open ? "Notification collapsed" : "Notification expanded");
        }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        className="mt-6 w-full rounded-2xl bg-background p-3 text-left"
      >
        <motion.div layout="position" className="flex items-start gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-on-primary">
            <Tv size={16} aria-hidden />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-xs text-muted">Your provider · now</span>
            <span className="block text-sm font-semibold">Your new channel pack is live</span>
            <span className="block text-xs text-muted">{open ? "Tap to collapse" : "Tap to see what's included"}</span>
          </span>
          {!open && <span aria-hidden className="h-10 w-10 shrink-0 rounded-lg bg-primary/25" />}
        </motion.div>
        {open && (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3 grid aspect-video place-items-center rounded-xl bg-primary/20"
            aria-label="Notification image: channel pack preview"
            role="img"
          >
            <span className="grid h-3/5 w-3/4 grid-cols-3 gap-1.5" aria-hidden>
              {Array.from({ length: 6 }, (_, i) => (
                <span key={i} className="rounded-md bg-primary/40" />
              ))}
            </span>
          </motion.div>
        )}
      </motion.button>
      <p className="mt-auto text-center text-xs text-muted">Rich push with an image attachment</p>
    </div>
  );
}
```

- [ ] **Step 6: Implement `PhoneDemo.tsx`**

```tsx
"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TicketScreen } from "./TicketScreen";
import { PayScreen } from "./PayScreen";
import { AlertsScreen } from "./AlertsScreen";

const TABS = [
  { id: "ticket", label: "Ticket" },
  { id: "pay", label: "Pay" },
  { id: "alerts", label: "Alerts" },
] as const;
type TabId = (typeof TABS)[number]["id"];

export function PhoneDemo() {
  const [active, setActive] = useState<TabId>("ticket");
  const [announcement, setAnnouncement] = useState("");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const select = (index: number) => {
    const wrapped = (index + TABS.length) % TABS.length;
    setActive(TABS[wrapped].id);
    tabRefs.current[wrapped]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key === "ArrowRight") select(index + 1);
    else if (e.key === "ArrowLeft") select(index - 1);
    else if (e.key === "Home") select(0);
    else if (e.key === "End") select(TABS.length - 1);
    else return;
    e.preventDefault();
  };

  return (
    <figure className="flex flex-col items-center">
      <div className="w-[260px] rounded-[36px] bg-[#14202b] p-2.5 shadow-[0_30px_60px_-24px_rgba(20,32,43,0.55)] sm:w-[280px] dark:bg-[#05090e] dark:ring-1 dark:ring-line">
        <div className="relative h-[500px] overflow-hidden rounded-[28px] bg-surface px-4 pb-4 pt-3 text-foreground sm:h-[540px]">
          <div aria-hidden className="mx-auto mb-4 h-1.5 w-16 rounded-full bg-foreground/80" />
          {TABS.map((t) => (
            <div
              key={t.id}
              id={`phone-panel-${t.id}`}
              role="tabpanel"
              aria-labelledby={`phone-tab-${t.id}`}
              hidden={active !== t.id}
              className="h-[calc(100%-1.75rem)]"
            >
              {t.id === "ticket" && <TicketScreen onAnnounce={setAnnouncement} />}
              {t.id === "pay" && <PayScreen onAnnounce={setAnnouncement} />}
              {t.id === "alerts" && <AlertsScreen onAnnounce={setAnnouncement} />}
            </div>
          ))}
        </div>
      </div>

      <div role="tablist" aria-label="Demo screens" className="mt-5 flex rounded-full border border-line bg-surface p-1">
        {TABS.map((t, i) => {
          const selected = active === t.id;
          return (
            <button
              key={t.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={`phone-tab-${t.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`phone-panel-${t.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(t.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                "relative min-h-12 min-w-20 rounded-full px-4 text-sm font-semibold transition-colors",
                selected ? "text-on-primary" : "text-muted hover:text-foreground"
              )}
            >
              {selected && (
                <motion.span
                  layoutId="phone-tab-indicator"
                  className="absolute inset-0 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  aria-hidden
                />
              )}
              <span className="relative">{t.label}</span>
            </button>
          );
        })}
      </div>

      <figcaption className="mt-3 text-center text-sm text-muted">
        Flows I built for a production billing app. Tap to try.
      </figcaption>
      <p role="status" aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </figure>
  );
}
```

Note: `onAnnounce={setAnnouncement}` passes a stable state setter, so the `PayScreen` effect does not re-run on every render.

- [ ] **Step 7: Run the tests**

Run: `npm test -- PhoneDemo`
Expected: PASS (5 UI tests plus 8 logic tests).

- [ ] **Step 8: Commit**

```bash
git add src/features/hero/components/PhoneDemo
git commit -m "feat: interactive unbranded phone demo (ticket, pay, alerts)"
```

---

### Task 5: Hero section

**Files:**
- Rewrite: `src/features/hero/components/HeroSection.tsx`
- Modify: `src/lib/constants.ts` (add `AVAILABILITY`, `CV_PATH`)
- Modify: `src/app/page.tsx` (remove `TechMarquee` and `ScrollProgress` usage)
- Delete: `src/features/hero/components/TechMarquee.tsx`, `src/components/common/ScrollProgress.tsx`
- Modify: `src/content.test.ts` (remove `HeroSection.tsx` from `PENDING`)
- Test: `src/features/hero/components/HeroSection.test.tsx`

**Interfaces:**
- Consumes: `PhoneDemo`, `Container`, `buttonStyles`, `SocialLinks`.
- Produces: `CV_PATH = "/Rijwol_Shakya_CV.pdf"`, `AVAILABILITY = "Available for remote Flutter roles · Kathmandu, UTC+5:45"`. The section is `<section id="hero">`.

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroSection } from "./HeroSection";

describe("HeroSection", () => {
  it("leads with the headline, availability, and both CTAs", () => {
    render(<HeroSection />);
    expect(
      screen.getByRole("heading", { level: 1, name: "I build the mobile apps people pay their bills with." })
    ).toBeInTheDocument();
    expect(screen.getByText(/Available for remote Flutter roles/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "See my work" })).toHaveAttribute("href", "#work");
    expect(screen.getByRole("link", { name: "Download CV" })).toHaveAttribute("href", "/Rijwol_Shakya_CV.pdf");
    expect(screen.getByText(/3\+ years/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `npm test -- HeroSection`
Expected: FAIL. No `h1` with that name exists (the current one is "Rijwol Shakya").

- [ ] **Step 3: Add the constants to `src/lib/constants.ts`**

```ts
export const CV_PATH = "/Rijwol_Shakya_CV.pdf";
export const AVAILABILITY = "Available for remote Flutter roles · Kathmandu, UTC+5:45";
```

- [ ] **Step 4: Rewrite `HeroSection.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { buttonStyles } from "@/components/ui/Button";
import { SocialLinks } from "@/components/common/SocialLinks";
import { PhoneDemo } from "./PhoneDemo/PhoneDemo";
import { AVAILABILITY, CV_PATH } from "@/lib/constants";

export function HeroSection() {
  return (
    <section id="hero" aria-labelledby="hero-heading" className="pb-20 pt-10 md:pb-28 md:pt-16">
      <Container className="grid items-center gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-10">
        <div>
          <p className="flex items-center gap-2 text-sm font-medium">
            <span className="h-2 w-2 rounded-full bg-live" aria-hidden />
            {AVAILABILITY}
          </p>
          {/* Transform only — no opacity, so the LCP headline paints immediately */}
          <motion.h1
            id="hero-heading"
            initial={{ y: 18 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 140, damping: 22 }}
            className="mt-5 max-w-[14ch] font-display text-5xl font-extrabold leading-[0.98] tracking-[-0.025em] sm:text-6xl lg:text-7xl"
          >
            I build the mobile apps people pay their bills with.
          </motion.h1>
          <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-muted">
            Flutter developer in Kathmandu with 3+ years shipping production Android and iOS apps. Today I build a
            self-service app that subscribers across Nepal use to pay bills and track technician visits.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#work" className={buttonStyles({ size: "lg" })}>
              See my work
            </a>
            <a href={CV_PATH} download className={buttonStyles({ variant: "outline", size: "lg" })}>
              Download CV
            </a>
            <SocialLinks include={["github", "linkedin"]} className="ml-1" />
          </div>
        </div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.25 }}
        >
          <PhoneDemo />
        </motion.div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 5: Update `src/app/page.tsx` and delete the marquee and progress bar**

Remove the `TechMarquee` and `ScrollProgress` imports and their JSX, then:

```bash
git rm src/features/hero/components/TechMarquee.tsx src/components/common/ScrollProgress.tsx
```

Remove `"src/features/hero/components/HeroSection.tsx"` from `PENDING` in `src/content.test.ts`.

- [ ] **Step 6: Run the tests and the build**

Run: `npm test && npx tsc --noEmit && npm run build`
Expected: all pass.

- [ ] **Step 7: Commit**

```bash
git add -A src
git commit -m "feat: new hero with phone demo; remove marquee and scroll progress"
```

---

### Task 6: Header and Footer

**Files:**
- Rewrite: `src/components/common/Header.tsx`, `src/components/common/Footer.tsx`
- Modify: `src/lib/constants.ts` (`NAV_LINKS`)
- Delete: `src/hooks/useScrollDirection.ts`
- Test: `src/components/common/Header.test.tsx`

**Interfaces:**
- Consumes: `ThemeToggle`, `buttonStyles`, `Container`, `SocialLinks`, `useActiveSection` (unchanged), `CV_PATH`.
- Produces: `NAV_LINKS = [{ label: "Work", href: "#work" }, { label: "Experience", href: "#experience" }, { label: "Contact", href: "#contact" }] as const`.

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("next-themes", () => ({ useTheme: () => ({ resolvedTheme: "light", setTheme: vi.fn() }) }));

import { Header } from "./Header";

describe("Header mobile menu", () => {
  it("opens a dialog, locks scroll, and closes on Esc with focus restored", async () => {
    const user = userEvent.setup();
    render(<Header />);
    const toggle = screen.getByRole("button", { name: "Open menu" });
    await user.click(toggle);

    const dialog = screen.getByRole("dialog", { name: "Menu" });
    expect(dialog).toBeInTheDocument();
    expect(document.body.style.overflow).toBe("hidden");
    await waitFor(() => expect(screen.getAllByRole("link", { name: "Work" }).at(-1)).toHaveFocus());

    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(document.body.style.overflow).toBe("");
    expect(screen.getByRole("button", { name: "Open menu" })).toHaveFocus();
  });

  it("lists Work, Experience and Contact as in-page links", () => {
    render(<Header />);
    expect(screen.getAllByRole("link", { name: "Work" })[0]).toHaveAttribute("href", "#work");
    expect(screen.getAllByRole("link", { name: "Experience" })[0]).toHaveAttribute("href", "#experience");
    expect(screen.getAllByRole("link", { name: "Contact" })[0]).toHaveAttribute("href", "#contact");
  });
});
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `npm test -- Header.test`
Expected: FAIL. There is no "Menu" dialog, and the nav items are buttons rather than links.

- [ ] **Step 3: Update `NAV_LINKS` in `constants.ts`**

```ts
export const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
] as const;
```

- [ ] **Step 4: Rewrite `Header.tsx`**

```tsx
"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Container } from "@/components/ui/Container";
import { buttonStyles } from "@/components/ui/Button";
import { useActiveSection } from "@/hooks/useActiveSection";
import { CV_PATH, NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1));

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    sheetRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    toggleRef.current?.focus();
  };

  const onSheetKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
      return;
    }
    if (e.key !== "Tab" || !sheetRef.current) return;
    const items = sheetRef.current.querySelectorAll<HTMLElement>("a, button");
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors",
        scrolled ? "border-line bg-background" : "border-transparent bg-transparent"
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        <a href="#hero" className="flex min-h-12 items-center font-display text-lg font-extrabold">
          Rijwol Shakya
        </a>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={active === l.href.slice(1) ? "true" : undefined}
                  className={cn(
                    "flex min-h-12 items-center rounded-full px-4 text-sm font-medium transition-colors",
                    active === l.href.slice(1) ? "text-primary" : "text-muted hover:text-foreground"
                  )}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <a href={CV_PATH} download className={buttonStyles({ variant: "outline", size: "sm", className: "hidden md:inline-flex" })}>
            CV
          </a>
          <ThemeToggle />
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="flex h-12 w-12 items-center justify-center rounded-full text-foreground md:hidden"
          >
            <Menu size={20} aria-hidden />
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              className="fixed inset-0 z-40 bg-foreground/40 md:hidden"
              aria-hidden
            />
            <motion.div
              key="sheet"
              ref={sheetRef}
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              onKeyDown={onSheetKeyDown}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed inset-x-0 bottom-0 z-50 rounded-t-3xl border-t border-line bg-surface px-4 pb-8 pt-4 md:hidden"
            >
              <ul className="flex flex-col">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex min-h-14 items-center rounded-xl px-3 font-display text-2xl font-extrabold"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a href={CV_PATH} download className="flex min-h-14 items-center rounded-xl px-3 text-lg font-semibold text-primary">
                    Download CV
                  </a>
                </li>
              </ul>
              <button
                type="button"
                onClick={close}
                aria-label="Close menu"
                className="absolute right-3 top-3 flex h-12 w-12 items-center justify-center rounded-full"
              >
                <X size={20} aria-hidden />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
```

- [ ] **Step 5: Rewrite `Footer.tsx`**

```tsx
import { Container } from "@/components/ui/Container";
import { SocialLinks } from "./SocialLinks";
import { SITE_METADATA } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <Container className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {SITE_METADATA.name}. Built with Next.js, hosted on GitHub Pages.
        </p>
        <SocialLinks />
      </Container>
    </footer>
  );
}
```

- [ ] **Step 6: Delete the unused hook**

```bash
git rm src/hooks/useScrollDirection.ts
```

- [ ] **Step 7: Run the tests and the build**

Run: `npm test && npx tsc --noEmit && npm run build`
Expected: all pass.

- [ ] **Step 8: Commit**

```bash
git add -A src
git commit -m "feat: sticky header with accessible bottom-sheet menu; new footer"
```

---

### Task 7: Selected work (case study + expandable cards)

**Files:**
- Modify: `src/features/projects/types.ts`, `src/features/projects/data/projects.data.ts`
- Create: `src/features/projects/components/CaseStudy.tsx`, `src/features/projects/components/ProjectCard.tsx`
- Rewrite: `src/features/projects/components/ProjectsSection.tsx`
- Delete: `src/features/projects/components/ProjectModal.tsx`, `src/features/projects/hooks/useProjectFilter.ts`
- Test: `src/features/projects/projects.test.tsx`

**Interfaces:**
- Produces:
  - `type ProjectTier = "case-study" | "featured" | "compact"`
  - `interface ProjectMetric { label: string; value: string }`
  - `interface Project { id; title; subtitle; description; techStack: string[]; architecture: string; metrics: ProjectMetric[]; highlights: string[]; tier: ProjectTier; githubUrl?: string }` (the fields `tags`, `archLayers`, and `featured` are removed)
  - `projectsByTier(tier: ProjectTier): Project[]`
  - `CaseStudy({ project })`, `ProjectCard({ project, size: "featured" | "compact" })`
  - The section is `<section id="work">`.

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { projectsByTier, PROJECTS_DATA } from "./data/projects.data";
import { ProjectCard } from "./components/ProjectCard";
import { CaseStudy } from "./components/CaseStudy";

describe("project tiers", () => {
  it("orders work as case study, featured, compact", () => {
    expect(projectsByTier("case-study").map((p) => p.id)).toEqual(["mydishhome"]);
    expect(projectsByTier("featured").map((p) => p.id)).toEqual(["bizlevate", "finance-tracker"]);
    expect(projectsByTier("compact").map((p) => p.id)).toEqual(["salesmania", "hg-hub", "rent-n-read"]);
  });
});

describe("CaseStudy", () => {
  it("shows the personal commit figures", () => {
    render(<CaseStudy project={projectsByTier("case-study")[0]} />);
    expect(screen.getByText("365")).toBeInTheDocument();
    expect(screen.getByText("189")).toBeInTheDocument();
  });
});

describe("ProjectCard", () => {
  const bizlevate = PROJECTS_DATA.find((p) => p.id === "bizlevate")!;
  const rent = PROJECTS_DATA.find((p) => p.id === "rent-n-read")!;

  it("expands inline to show highlights", async () => {
    render(<ProjectCard project={bizlevate} size="featured" />);
    const toggle = screen.getByRole("button", { name: /Show details/ });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(toggle);
    expect(screen.getByRole("button", { name: /Hide details/ })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(bizlevate.highlights[0])).toBeInTheDocument();
  });

  it("renders a GitHub link only when the project has one", async () => {
    const { unmount } = render(<ProjectCard project={bizlevate} size="featured" />);
    await userEvent.click(screen.getByRole("button", { name: /Show details/ }));
    expect(screen.queryByRole("link", { name: /GitHub/ })).not.toBeInTheDocument();
    unmount();
    render(<ProjectCard project={rent} size="compact" />);
    await userEvent.click(screen.getByRole("button", { name: /Show details/ }));
    expect(screen.getByRole("link", { name: /GitHub/ })).toHaveAttribute("href", rent.githubUrl);
  });
});
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `npm test -- projects.test`
Expected: FAIL. `projectsByTier` is not exported.

- [ ] **Step 3: Replace `src/features/projects/types.ts`**

```ts
export type ProjectTier = "case-study" | "featured" | "compact";

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  techStack: string[];
  architecture: string;
  metrics: ProjectMetric[];
  highlights: string[];
  tier: ProjectTier;
  githubUrl?: string;
}
```

- [ ] **Step 4: Update `projects.data.ts`**

For every project, delete the `tags` and `archLayers` properties and replace `featured: …` with `tier`:
- mydishhome: `tier: "case-study"`
- bizlevate: `tier: "featured"`
- salesmania: `tier: "compact"`
- hg-hub: `tier: "compact"`
- finance-tracker: `tier: "featured"`
- rent-n-read: `tier: "compact"`

Keep the array order as is (mydishhome, bizlevate, salesmania, hg-hub, finance-tracker, rent-n-read); `projectsByTier` preserves it. Then replace the two exports at the bottom with:

```ts
export function projectsByTier(tier: ProjectTier): Project[] {
  return PROJECTS_DATA.filter((p) => p.tier === tier);
}
```

Change the import to `import type { Project, ProjectTier } from "../types";`. Leave the myDishHome `metrics` and the comment from Task 1 untouched.

- [ ] **Step 5: Create `CaseStudy.tsx`**

```tsx
import type { Project } from "../types";

export function CaseStudy({ project }: { project: Project }) {
  const headingId = `case-${project.id}`;
  return (
    <article
      aria-labelledby={headingId}
      className="grid gap-10 rounded-2xl border border-line bg-surface p-6 md:p-10 lg:grid-cols-[1.3fr_1fr]"
    >
      <div>
        <p className="text-sm text-muted">{project.subtitle}</p>
        <h3 id={headingId} className="mt-1 font-display text-3xl font-extrabold tracking-[-0.02em] md:text-4xl">
          {project.title}
        </h3>
        <p className="mt-4 max-w-[60ch] leading-relaxed">{project.description}</p>
        <h4 className="mt-8 font-semibold">What I built</h4>
        <ul className="mt-3 max-w-[64ch] list-disc space-y-2 pl-5 text-muted marker:text-primary">
          {project.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted">Architecture: {project.architecture}</p>
      </div>
      <div className="self-start">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-6">
          {project.metrics.map((m) => (
            <div key={m.label}>
              <dt className="text-sm text-muted">{m.label}</dt>
              <dd className="font-display text-3xl font-extrabold tabular-nums">{m.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-sm text-muted">
          Counts are my own commits to the app&apos;s repository, merge commits excluded.
        </p>
      </div>
    </article>
  );
}
```

- [ ] **Step 6: Create `ProjectCard.tsx`**

```tsx
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Chip } from "@/components/ui/Chip";
import { GithubIcon } from "@/components/ui/SocialIcons";
import { cn } from "@/lib/utils";
import type { Project } from "../types";

export function ProjectCard({ project, size }: { project: Project; size: "featured" | "compact" }) {
  const [open, setOpen] = useState(false);
  const panelId = `${project.id}-details`;

  return (
    <article className={cn("rounded-2xl border border-line bg-surface", size === "featured" ? "p-6 md:p-8" : "p-5")}>
      <h3 className={cn("font-display font-extrabold tracking-[-0.015em]", size === "featured" ? "text-2xl" : "text-xl")}>
        {project.title}
      </h3>
      <p className="mt-1 text-sm text-muted">{project.subtitle}</p>
      {size === "featured" && <p className="mt-4 max-w-[60ch] leading-relaxed">{project.description}</p>}

      <button
        type="button"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => setOpen(!open)}
        className="mt-4 inline-flex min-h-12 items-center gap-1.5 text-sm font-semibold text-primary"
      >
        {open ? "Hide details" : "Show details"}
        <ChevronDown size={16} aria-hidden className={cn("transition-transform", open && "rotate-180")} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="details"
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="overflow-hidden"
          >
            <div className="pt-2">
              {size === "compact" && <p className="mb-4 leading-relaxed">{project.description}</p>}
              <ul className="list-disc space-y-2 pl-5 text-sm text-muted marker:text-primary">
                {project.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tech stack">
                {project.techStack.map((t) => (
                  <li key={t}>
                    <Chip>{t}</Chip>
                  </li>
                ))}
              </ul>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex min-h-12 items-center gap-2 text-sm font-semibold text-primary"
                >
                  <GithubIcon width={16} height={16} />
                  View on GitHub
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
```

- [ ] **Step 7: Rewrite `ProjectsSection.tsx` and delete the modal and filter**

```tsx
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CaseStudy } from "./CaseStudy";
import { ProjectCard } from "./ProjectCard";
import { projectsByTier } from "../data/projects.data";

export function ProjectsSection() {
  const [caseStudy] = projectsByTier("case-study");
  return (
    <section id="work" aria-labelledby="work-heading" className="py-20 md:py-28">
      <Container>
        <SectionTitle
          id="work-heading"
          title="Selected work"
          intro="Production apps I've built, starting with the one I work on every day."
        />
        {caseStudy && <CaseStudy project={caseStudy} />}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {projectsByTier("featured").map((p) => (
            <ProjectCard key={p.id} project={p} size="featured" />
          ))}
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projectsByTier("compact").map((p) => (
            <ProjectCard key={p.id} project={p} size="compact" />
          ))}
        </div>
      </Container>
    </section>
  );
}
```

```bash
git rm src/features/projects/components/ProjectModal.tsx src/features/projects/hooks/useProjectFilter.ts
```

- [ ] **Step 8: Run the tests and the build**

Run: `npm test && npx tsc --noEmit && npm run build`
Expected: all pass. If `tsc` reports leftover references to `FEATURED_PROJECTS`, `ALL_PROJECT_TAGS`, or `ProjectTag`, grep for them with `grep -rn "FEATURED_PROJECTS\|ALL_PROJECT_TAGS\|ProjectTag" src` and remove them.

- [ ] **Step 9: Commit**

```bash
git add -A src/features/projects
git commit -m "feat: myDishHome case study and inline-expanding project cards"
```

---

### Task 8: Experience changelog + education

**Files:**
- Modify: `src/features/experience/types.ts`, `src/features/experience/data/experience.data.ts`
- Create: `src/features/experience/data/education.data.ts`
- Rewrite: `src/features/experience/components/ExperienceSection.tsx`
- Test: `src/features/experience/experience.test.tsx`

**Interfaces:**
- Produces:
  - `ExperienceEntry` gains `version: string`
  - `interface EducationEntry { id: string; degree: string; institution: string; period: string; current: boolean }`
  - `EDUCATION_DATA: EducationEntry[]`
  - The section is `<section id="experience">`.

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { EXPERIENCE_DATA } from "./data/experience.data";
import { ExperienceSection } from "./components/ExperienceSection";

describe("Experience changelog", () => {
  it("lists releases newest first as v3.0, v2.0, v1.0", () => {
    render(<ExperienceSection />);
    const releases = screen.getAllByRole("listitem").filter((li) => /^v\d\.\d/.test(li.textContent ?? ""));
    expect(releases.map((li) => li.textContent?.slice(0, 4))).toEqual(["v3.0", "v2.0", "v1.0"]);
  });

  it("keeps each role to at most four bullets", () => {
    for (const e of EXPERIENCE_DATA) expect(e.responsibilities.length).toBeLessThanOrEqual(4);
  });

  it("shows education with the MSc in progress", () => {
    render(<ExperienceSection />);
    const edu = screen.getByRole("region", { name: "Education" });
    expect(within(edu).getByText(/MSc Data Science/)).toBeInTheDocument();
    expect(within(edu).getByText(/present/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `npm test -- experience.test`
Expected: FAIL. There is no `v3.0` text, and the dish-media entry has 6 bullets.

- [ ] **Step 3: Update `types.ts`**

```ts
export interface ExperienceEntry {
  id: string;
  version: string;
  role: string;
  company: string;
  location: string;
  period: string;
  current: boolean;
  responsibilities: string[];
  tags: string[];
}

export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  period: string;
  current: boolean;
}
```

- [ ] **Step 4: Update `experience.data.ts`**

Add `version` and trim the bullets. Keep the `id`, `role`, `company`, `location`, `period`, `current`, and `tags` values that are already there.

```ts
  // dish-media
  version: "v3.0",
  responsibilities: [
    "Building and maintaining myDishHome, a production Flutter app serving DishHome subscribers across Nepal, where I've authored 365 commits — 189 features and 89 fixes.",
    "Integrated four payment gateways — eSewa, Khalti, FonePay and GetPay — with intent-based flows and in-app checkout.",
    "Built technician ticket tracking with a live stepper so subscribers can follow a field visit end to end.",
    "Added rich push via an iOS Notification Service Extension with FCM token refresh, and set up Firebase Crashlytics for production monitoring.",
  ],

  // infocom-junior
  version: "v2.0",
  responsibilities: [
    "Built Bizlevate, a Flutter attendance and leave app using Riverpod and Hive for offline-first caching.",
    "Developed SalesMania, a Flutter sales-operations app on MVVM with REST API integration.",
    "Developed HG HUB, a React Native attendance app with JWT authentication and Redux.",
    "Worked directly with clients to gather requirements and turn Figma designs into Android and iOS interfaces.",
  ],

  // infocom-intern
  version: "v1.0",
  // responsibilities unchanged (3 bullets)
```

- [ ] **Step 5: Create `education.data.ts`**

```ts
import type { EducationEntry } from "../types";

export const EDUCATION_DATA: EducationEntry[] = [
  {
    id: "msc",
    degree: "MSc Data Science & Computational Intelligence",
    institution: "Softwarica College of IT and E-Commerce",
    period: "Sep 2025 – present",
    current: true,
  },
  {
    id: "bsc",
    degree: "BSc (Hons) Computing",
    institution: "Softwarica College of IT and E-Commerce",
    period: "Mar 2020 – Mar 2023",
    current: false,
  },
];
```

- [ ] **Step 6: Rewrite `ExperienceSection.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Chip } from "@/components/ui/Chip";
import { EXPERIENCE_DATA } from "../data/experience.data";
import { EDUCATION_DATA } from "../data/education.data";

export function ExperienceSection() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="py-20 md:py-28">
      <Container>
        <SectionTitle id="experience-heading" title="Experience" intro="Each role, logged like a release." />

        <div className="relative">
          <motion.span
            aria-hidden
            className="absolute bottom-0 left-[9.25rem] top-0 hidden w-px origin-top bg-line md:block"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />
          <ol>
            {EXPERIENCE_DATA.map((e) => (
              <li key={e.id} className="grid gap-3 border-t border-line py-8 md:grid-cols-[8rem_1fr] md:gap-10">
                <div>
                  <p className="font-display text-2xl font-extrabold tabular-nums text-primary">{e.version}</p>
                  <p className="text-sm text-muted">{e.period}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    {e.role}, {e.company}
                    {e.current && (
                      <span className="ml-3 inline-flex items-center gap-1.5 align-middle text-sm font-medium text-muted">
                        <span className="h-2 w-2 rounded-full bg-live" aria-hidden />
                        Current
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-muted">{e.location}</p>
                  <ul className="mt-4 max-w-[68ch] list-disc space-y-2 pl-5 marker:text-primary">
                    {e.responsibilities.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                  <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
                    {e.tags.map((t) => (
                      <li key={t}>
                        <Chip>{t}</Chip>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <section aria-labelledby="education-heading" className="mt-12 border-t border-line pt-8">
          <h3 id="education-heading" className="font-display text-2xl font-extrabold">
            Education
          </h3>
          <ul className="mt-4 space-y-3">
            {EDUCATION_DATA.map((ed) => (
              <li key={ed.id} className="grid gap-1 md:grid-cols-[1fr_auto] md:gap-6">
                <span>
                  <span className="font-semibold">{ed.degree}</span>
                  <span className="text-muted">, {ed.institution}</span>
                </span>
                <span className="text-sm text-muted">{ed.period}</span>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </section>
  );
}
```

Note: the test filters list items whose text starts with `v\d.\d`. The chip `<li>`s and education `<li>`s don't match that pattern.

- [ ] **Step 7: Run the tests and the build**

Run: `npm test && npx tsc --noEmit && npm run build`
Expected: all pass. The Task 1 test still finds "365 commits" in the current role.

- [ ] **Step 8: Commit**

```bash
git add -A src/features/experience
git commit -m "feat: experience as a versioned changelog with education"
```

---

### Task 9: Toolkit

**Files:**
- Modify: `src/features/skills/types.ts`, `src/features/skills/data/skills.data.ts`
- Rewrite: `src/features/skills/components/SkillsSection.tsx`
- Test: `src/features/skills/skills.test.ts`

**Interfaces:**
- Produces: `interface SkillGroup { category: string; skills: string[] }` (the `icon` field is removed). The section is `<section id="toolkit">`.
- The second row is labelled **"Web, backend & data"** instead of the spec's "Backend & data", because it also holds React, Next.js, and TypeScript. This is a minor, intentional deviation from the spec.

- [ ] **Step 1: Write the failing test**

```ts
import { describe, expect, it } from "vitest";
import { SKILLS_DATA } from "./data/skills.data";

describe("toolkit data", () => {
  it("has exactly three groups in order", () => {
    expect(SKILLS_DATA.map((g) => g.category)).toEqual(["Mobile", "Web, backend & data", "Tools"]);
  });

  it("lists no skill twice", () => {
    const all = SKILLS_DATA.flatMap((g) => g.skills);
    expect(new Set(all).size).toBe(all.length);
  });
});
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `npm test -- skills.test`
Expected: FAIL. There are 8 groups.

- [ ] **Step 3: Replace `types.ts` and `skills.data.ts`**

```ts
// types.ts
export interface SkillGroup {
  category: string;
  skills: string[];
}
```

```ts
// skills.data.ts
import type { SkillGroup } from "../types";

export const SKILLS_DATA: SkillGroup[] = [
  {
    category: "Mobile",
    skills: [
      "Flutter", "Dart", "React Native", "Android (Kotlin)", "iOS (Swift)",
      "Riverpod", "GetX", "Bloc", "Provider", "Redux",
      "Clean Architecture", "MVVM", "Hive", "Firebase Cloud Messaging", "Figma to code",
    ],
  },
  {
    category: "Web, backend & data",
    skills: [
      "REST APIs", "Dio", "JWT auth", "Node.js", "Supabase", "Firebase",
      "PostgreSQL", "MySQL", "MongoDB", "React", "Next.js", "TypeScript", "Tailwind CSS",
    ],
  },
  {
    category: "Tools",
    skills: [
      "Git", "GitHub Actions", "GitLab", "Firebase Crashlytics", "Android Studio",
      "Xcode", "VS Code", "Postman", "Figma", "Google Cloud Vision",
    ],
  },
];
```

- [ ] **Step 4: Rewrite `SkillsSection.tsx`**

```tsx
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Chip } from "@/components/ui/Chip";
import { SKILLS_DATA } from "../data/skills.data";

export function SkillsSection() {
  return (
    <section id="toolkit" aria-labelledby="toolkit-heading" className="py-20 md:py-28">
      <Container>
        <SectionTitle id="toolkit-heading" title="Toolkit" />
        <dl className="divide-y divide-line border-y border-line">
          {SKILLS_DATA.map((g) => (
            <div key={g.category} className="grid gap-3 py-6 md:grid-cols-[14rem_1fr] md:gap-10">
              <dt className="font-semibold">{g.category}</dt>
              <dd>
                <ul className="flex flex-wrap gap-2">
                  {g.skills.map((s) => (
                    <li key={s}>
                      <Chip>{s}</Chip>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
```

- [ ] **Step 5: Run the tests and the build**

Run: `npm test && npx tsc --noEmit && npm run build`
Expected: all pass.

- [ ] **Step 6: Commit**

```bash
git add -A src/features/skills
git commit -m "feat: compact three-row toolkit"
```

---

### Task 10: Contact (two paths + form)

**Files:**
- Modify: `src/features/contact/types.ts` (zod schema and type)
- Modify: `src/features/contact/hooks/useContactForm.ts`
- Modify: `src/lib/formspree.ts`
- Create: `src/features/contact/components/ContactForm.tsx`
- Rewrite: `src/features/contact/components/ContactSection.tsx`
- Test: `src/features/contact/ContactForm.test.tsx`

**Interfaces:**
- Produces:
  - `contactSchema` (zod), `type ContactFormData = z.infer<typeof contactSchema>` with fields `name, email, subject, project, message`
  - `useContactForm(): { form, onSubmit, status: "idle" | "submitting" | "success" | "error" }`
  - `ContactForm()`
  - `FORMSPREE_ENDPOINT = "https://formspree.io/f/xykvegga"`
  - The section is `<section id="contact">`.

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, expect, it, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "./components/ContactForm";

afterEach(() => vi.unstubAllGlobals());

async function fillValid(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText("Name"), "Ada Lovelace");
  await user.type(screen.getByLabelText("Email"), "ada@example.com");
  await user.type(screen.getByLabelText("Subject"), "Booking app");
  await user.type(screen.getByLabelText("Message"), "I need a Flutter booking app, about ten screens.");
}

describe("ContactForm", () => {
  it("shows field errors on an empty submit", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.click(screen.getByRole("button", { name: "Send message" }));
    expect(await screen.findByText("Name must be at least 2 characters")).toBeInTheDocument();
    expect(screen.getByText("Please enter a valid email address")).toBeInTheDocument();
  });

  it("shows the email fallback when Formspree fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillValid(user);
    await user.click(screen.getByRole("button", { name: "Send message" }));
    expect(await screen.findByText(/Couldn't send your message/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "shakyarijwol19@gmail.com" })).toHaveAttribute(
      "href",
      "mailto:shakyarijwol19@gmail.com"
    );
  });

  it("sends exactly one request on a double click", async () => {
    let resolve: (v: { ok: boolean }) => void = () => {};
    const fetchMock = vi.fn(() => new Promise<{ ok: boolean }>((r) => (resolve = r)));
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillValid(user);
    const send = screen.getByRole("button", { name: "Send message" });
    await user.dblClick(send);
    resolve({ ok: true });
    expect(await screen.findByText(/Message sent/)).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `npm test -- ContactForm`
Expected: FAIL with "Failed to resolve import ./components/ContactForm".

- [ ] **Step 3: Update `types.ts`, `formspree.ts`, and the hook**

```ts
// src/features/contact/types.ts
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Please enter a valid email address"),
  subject: z.string().trim().min(4, "Subject must be at least 4 characters"),
  project: z.string().max(500, "Keep this under 500 characters"),
  message: z.string().trim().min(20, "Message must be at least 20 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
```

```ts
// src/lib/formspree.ts
export const FORMSPREE_ENDPOINT = "https://formspree.io/f/xykvegga";
```

```ts
// src/features/contact/hooks/useContactForm.ts
"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FORMSPREE_ENDPOINT } from "@/lib/formspree";
import { contactSchema, type ContactFormData } from "../types";

export type ContactStatus = "idle" | "submitting" | "success" | "error";

export function useContactForm() {
  const [status, setStatus] = useState<ContactStatus>("idle");
  const inFlight = useRef(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", project: "", message: "" },
  });

  const onSubmit = async (data: ContactFormData) => {
    if (inFlight.current) return;
    inFlight.current = true;
    setStatus("submitting");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      inFlight.current = false;
    }
  };

  return { form, onSubmit, status };
}
```

- [ ] **Step 4: Create `ContactForm.tsx`**

```tsx
"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { SITE_METADATA } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useContactForm } from "../hooks/useContactForm";
import type { ContactFormData } from "../types";

const INPUT =
  "w-full rounded-xl border border-line bg-background px-4 py-3 text-base text-foreground placeholder:text-muted outline-none focus:border-primary";

function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="-mt-1 mb-1.5 text-sm text-muted">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const { form, onSubmit, status } = useContactForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  if (status === "success") {
    return (
      <p role="status" className="rounded-xl bg-background p-6 text-lg font-semibold">
        Message sent. I&apos;ll reply within two days.
      </p>
    );
  }

  const fieldProps = (name: keyof ContactFormData, hint = false) => ({
    id: `contact-${name}`,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby":
      cn(hint && `contact-${name}-hint`, errors[name] && `contact-${name}-error`) || undefined,
    className: cn(INPUT, errors[name] && "border-red-600"),
    ...register(name),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {status === "error" && (
        <p role="alert" className="rounded-xl border border-red-600/30 p-4 text-sm">
          Couldn&apos;t send your message. Email me at{" "}
          <a href={`mailto:${SITE_METADATA.email}`} className="font-semibold text-primary underline">
            {SITE_METADATA.email}
          </a>{" "}
          instead.
        </p>
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="contact-name" label="Name" error={errors.name?.message}>
          <input type="text" autoComplete="name" {...fieldProps("name")} />
        </Field>
        <Field id="contact-email" label="Email" error={errors.email?.message}>
          <input type="email" autoComplete="email" {...fieldProps("email")} />
        </Field>
      </div>
      <Field id="contact-subject" label="Subject" error={errors.subject?.message}>
        <input type="text" {...fieldProps("subject")} />
      </Field>
      <Field
        id="contact-project"
        label="What do you want built?"
        hint="Optional. Platforms, rough scope, timeline."
        error={errors.project?.message}
      >
        <textarea rows={3} {...fieldProps("project", true)} />
      </Field>
      <Field id="contact-message" label="Message" error={errors.message?.message}>
        <textarea rows={5} {...fieldProps("message")} />
      </Field>
      <Button type="submit" size="lg" disabled={status === "submitting"} className="w-full sm:w-auto">
        {status === "submitting" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
```

- [ ] **Step 5: Rewrite `ContactSection.tsx`**

```tsx
import { Mail, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { buttonStyles } from "@/components/ui/Button";
import { LinkedinIcon } from "@/components/ui/SocialIcons";
import { ContactForm } from "./ContactForm";
import { CV_PATH, SITE_METADATA, SOCIAL_LINKS } from "@/lib/constants";

const ROW = "flex min-h-12 items-center gap-3 text-foreground hover:text-primary";

export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-20 md:py-28">
      <Container>
        <SectionTitle
          id="contact-heading"
          title="Get in touch"
          intro="Hiring for a Flutter role, or need an app built? Pick the path that fits."
        />
        <div className="grid items-start gap-6 md:grid-cols-[1fr_1.4fr]">
          <div className="rounded-2xl border border-line bg-surface p-6 md:p-8">
            <h3 className="font-display text-2xl font-extrabold">Hiring?</h3>
            <p className="mt-2 text-muted">
              I&apos;m open to remote Flutter and mobile roles, working from Kathmandu (UTC+5:45).
            </p>
            <ul className="mt-5">
              <li>
                <a href={`mailto:${SITE_METADATA.email}`} className={ROW}>
                  <Mail size={18} aria-hidden /> {SITE_METADATA.email}
                </a>
              </li>
              <li>
                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className={ROW}>
                  <LinkedinIcon width={18} height={18} /> LinkedIn
                </a>
              </li>
              <li>
                <a href={`tel:${SITE_METADATA.phone}`} className={ROW}>
                  <Phone size={18} aria-hidden /> {SITE_METADATA.phone}
                </a>
              </li>
            </ul>
            <a href={CV_PATH} download className={buttonStyles({ variant: "outline", className: "mt-6" })}>
              Download CV
            </a>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-6 md:p-8">
            <h3 className="font-display text-2xl font-extrabold">Need an app built?</h3>
            <p className="mb-6 mt-2 text-muted">Tell me what you have in mind and I&apos;ll reply within two days.</p>
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 6: Run the tests and the build**

Run: `npm test && npx tsc --noEmit && npm run build`
Expected: all pass.

- [ ] **Step 7: Commit**

```bash
git add -A src/features/contact src/lib/formspree.ts
git commit -m "feat: two-path contact with project field and double-submit guard"
```

---

### Task 11: Page composition and cleanup

**Files:**
- Modify: `src/app/page.tsx`, `src/app/globals.css` (remove the legacy block), `src/content.test.ts` (remove About from `PENDING`)
- Delete: `src/features/about/`, `src/components/ui/{GlassCard,Badge,SectionHeading}.tsx`, `public/{file,globe,next,vercel,window}.svg`, `public/icons/`
- Test: `src/app/page.test.tsx`

**Interfaces:**
- Consumes: all the sections.
- Produces: the final page order `hero → work → experience → toolkit → contact`.

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";

vi.mock("next-themes", () => ({ useTheme: () => ({ resolvedTheme: "light", setTheme: vi.fn() }) }));

import Home from "./page";

describe("Home", () => {
  it("renders the sections in order with no About section", () => {
    const { container } = render(<Home />);
    const ids = [...container.querySelectorAll("main section[id]")].map((s) => s.id);
    expect(ids).toEqual(["hero", "work", "experience", "toolkit", "contact"]);
  });
});
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `npm test -- page.test`
Expected: FAIL. `about` is still in the list.

- [ ] **Step 3: Rewrite `src/app/page.tsx`**

```tsx
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { HeroSection } from "@/features/hero/components/HeroSection";
import { ProjectsSection } from "@/features/projects/components/ProjectsSection";
import { ExperienceSection } from "@/features/experience/components/ExperienceSection";
import { SkillsSection } from "@/features/skills/components/SkillsSection";
import { ContactSection } from "@/features/contact/components/ContactSection";

export default function Home() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-4 focus:py-3 focus:text-on-primary"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="flex-1">
        <HeroSection />
        <ProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 4: Delete the dead code and assets**

First confirm nothing still imports them:

```bash
grep -rn "features/about\|GlassCard\|ui/Badge\|SectionHeading\|/icons/" src
```

Expected: no output, apart from `src/features/about` itself. Then delete:

```bash
git rm -r src/features/about public/icons
git rm src/components/ui/GlassCard.tsx src/components/ui/Badge.tsx src/components/ui/SectionHeading.tsx
git rm public/file.svg public/globe.svg public/next.svg public/vercel.svg public/window.svg
```

Also delete `src/lib/assets.ts` if `grep -rn "assetPath" src` returns nothing.

- [ ] **Step 5: Remove the legacy CSS**

In `globals.css`, delete:
- the four legacy alias variables in `:root`
- the four `--color-*` legacy lines in `@theme inline`
- the whole `/* ── Legacy … */` block (`.glass`, `.gradient-text`, `.section`)

Then confirm nothing uses them:

```bash
grep -rnE "surface-muted|border-border|text-accent|bg-accent|primary-hover|\bglass\b|gradient-text|className=\"section" src
```

Expected: no output.

- [ ] **Step 6: Empty `PENDING` in `src/content.test.ts`**

Remove `"src/features/about/components/AboutSection.tsx"` from it. Only `"scripts/generate-og.mjs"` remains, until Task 12.

- [ ] **Step 7: Run the tests, lint, and the build**

Run: `npm test && npm run lint && npx tsc --noEmit && npm run build`
Expected: all pass.

- [ ] **Step 8: Commit**

```bash
git add -A src public
git commit -m "chore: compose new page; remove About, glass components and unused assets"
```

---

### Task 12: Domain, SEO, and OG image

**Files:**
- Create: `public/CNAME`, `src/app/sitemap.ts`, `src/app/robots.ts`
- Modify: `src/lib/constants.ts` (`url`, `title`), `src/app/layout.tsx` (canonical URL, keywords)
- Rewrite: `scripts/generate-og.mjs`; regenerate `public/og-image.png`
- Modify: `src/content.test.ts` (empty `PENDING`)
- Test: `src/app/seo.test.ts`

**Interfaces:**
- Produces: `SITE_METADATA.url = "https://rijwol.com.np"`, plus `out/CNAME`, `out/sitemap.xml`, and `out/robots.txt` in the build output.

- [ ] **Step 1: Write the failing test**

```ts
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import sitemap from "./sitemap";
import robots from "./robots";
import { SITE_METADATA } from "@/lib/constants";

describe("domain + SEO", () => {
  it("uses rijwol.com.np everywhere", () => {
    expect(SITE_METADATA.url).toBe("https://rijwol.com.np");
    expect(readFileSync("public/CNAME", "utf8").trim()).toBe("rijwol.com.np");
  });

  it("lists the home page in the sitemap", () => {
    expect(sitemap().map((e) => e.url)).toEqual(["https://rijwol.com.np/"]);
  });

  it("allows crawling and points at the sitemap", () => {
    const r = robots();
    expect(r.sitemap).toBe("https://rijwol.com.np/sitemap.xml");
    expect(r.rules).toEqual({ userAgent: "*", allow: "/" });
  });
});
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `npm test -- seo.test`
Expected: FAIL with "Failed to resolve import ./sitemap".

- [ ] **Step 3: Implement the domain files**

```bash
printf 'rijwol.com.np\n' > public/CNAME
```

In `src/lib/constants.ts`, set:

```ts
  title: "Rijwol Shakya — Flutter Developer",
  url: "https://rijwol.com.np",
```

`src/app/sitemap.ts`:
```ts
import type { MetadataRoute } from "next";
import { SITE_METADATA } from "@/lib/constants";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${SITE_METADATA.url}/`, changeFrequency: "monthly", priority: 1 }];
}
```

`src/app/robots.ts`:
```ts
import type { MetadataRoute } from "next";
import { SITE_METADATA } from "@/lib/constants";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_METADATA.url}/sitemap.xml`,
  };
}
```

In `src/app/layout.tsx`, add `alternates: { canonical: "/" },` to `metadata`, and set `keywords` to `["Flutter Developer", "Remote Flutter Developer", "Mobile Developer", "Dart", "GetX", "Riverpod", "Clean Architecture", "Firebase", "Kathmandu", "Nepal"]`.

- [ ] **Step 4: Rewrite `scripts/generate-og.mjs` in the new palette**

Keep the file's imports, `OUT`, and the `sharp` write at the bottom. Replace the `svg` template with:

```js
const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#EEF1F4"/>
  <circle cx="92" cy="104" r="7" fill="#16B67A"/>
  <text x="110" y="111" font-family="Helvetica, Arial, sans-serif" font-size="22" fill="#14202B">Available for remote Flutter roles</text>
  <text x="80" y="230" font-family="Helvetica, Arial, sans-serif" font-size="76" font-weight="800" letter-spacing="-2" fill="#14202B">I build the mobile apps</text>
  <text x="80" y="318" font-family="Helvetica, Arial, sans-serif" font-size="76" font-weight="800" letter-spacing="-2" fill="#14202B">people pay their bills with.</text>
  <text x="80" y="400" font-family="Helvetica, Arial, sans-serif" font-size="28" fill="#4A5866">Rijwol Shakya · Flutter developer · Kathmandu</text>
  <rect x="80" y="456" width="300" height="64" rx="32" fill="#2F5BFF"/>
  <text x="230" y="497" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="24" font-weight="700" fill="#FFFFFF">rijwol.com.np</text>
  <rect x="930" y="70" width="200" height="420" rx="36" fill="#14202B"/>
  <rect x="942" y="82" width="176" height="396" rx="28" fill="#FFFFFF"/>
  <rect x="960" y="140" width="34" height="8" rx="4" fill="#16B67A"/>
  <rect x="998" y="140" width="34" height="8" rx="4" fill="#16B67A"/>
  <rect x="1036" y="140" width="34" height="8" rx="4" fill="#2F5BFF"/>
  <rect x="1074" y="140" width="28" height="8" rx="4" fill="#D5DBE3"/>
  <rect x="960" y="176" width="142" height="80" rx="14" fill="#EEF1F4"/>
  <rect x="960" y="270" width="142" height="40" rx="10" fill="#EEF1F4"/>
  <rect x="960" y="318" width="142" height="40" rx="10" fill="#EEF1F4"/>
  <rect x="960" y="410" width="142" height="44" rx="12" fill="#2F5BFF"/>
</svg>
`;
```

Run: `npm run generate-og`
Expected: `✅ OG image written → public/og-image.png`. Open the PNG with the Read tool and check the text is not clipped.

- [ ] **Step 5: Empty `PENDING` in `src/content.test.ts`**

Remove `"scripts/generate-og.mjs"`. `PENDING` should now be `[]`. Then delete the `PENDING` array and its filter entirely.

- [ ] **Step 6: Run the tests and the build, then check the output**

Run:
```bash
npm test && npx tsc --noEmit && npm run build && cat out/CNAME && cat out/robots.txt && grep -o "https://rijwol.com.np/" out/sitemap.xml
```

Expected: tests pass. The output shows `rijwol.com.np`, a robots file containing `Sitemap: https://rijwol.com.np/sitemap.xml`, and the sitemap URL.

- [ ] **Step 7: Commit**

```bash
git add -A public/CNAME public/og-image.png src scripts
git commit -m "feat: serve at rijwol.com.np — CNAME, sitemap, robots, canonical, new OG image"
```

---

### Task 13: Docs + end-to-end verification

**Files:**
- Modify: `AGENTS.md`, `PORTFOLIO_LOG.md`

- [ ] **Step 1: Update `AGENTS.md`**

Replace the `### 1. Unified Tailwind Theme Engine` "Glassmorphism Theme" bullet with:

```markdown
- **Design tokens:** Colors come only from the tokens in `src/app/globals.css` (`background, surface, foreground, muted, primary, on-primary, line, live`), with light and dark values. No glassmorphism, gradient blobs, or gradient text. Display type is Bricolage Grotesque (`font-display`); body type is Schibsted Grotesk.
```

Replace the "Scroll-Triggered Visuals" bullet with:

```markdown
- **Motion budget:** One load moment (hero), user-driven motion everywhere else, and at most one scroll reveal per page (the Experience rule). No per-section fade-ins. `MotionConfig reducedMotion="user"` is set globally in `Providers.tsx`.
```

Add under CODE QUALITY:

```markdown
5. **Tests:** `npm test` (Vitest + Testing Library). Keep component logic in pure functions where possible (see `PhoneDemo/phoneDemo.logic.ts`).
```

- [ ] **Step 2: Append to `PORTFOLIO_LOG.md`**

Add a session entry dated 2026-10-01 that covers: the redesign (Pocket + changelog), the personal myDishHome figures and the command used, the `rijwol.com.np` setup, the files removed, and links to the spec and this plan. In "Known Issues", replace the `basePath` notes with the user's DNS checklist from spec §6.

- [ ] **Step 3: Run the full automated checks**

Run: `npm run lint && npx tsc --noEmit && npm test && npm run build`
Expected: zero errors, and all tests pass.

- [ ] **Step 4: Browser pass on the built site**

```bash
npx --yes serve@14 out -l 4173
```

At `http://localhost:4173`, using claude-in-chrome or a manual check, verify each of the following at 375px, 768px, and 1280px:
- Light and dark mode (using the toggle) both apply the tokens. `dark:` utilities follow the toggle, not the OS.
- With reduced motion emulated (DevTools → Rendering → `prefers-reduced-motion: reduce`), the phone does not slide in, and all phone flows still work.
- Keyboard only:
  - Tab to the skip link, the header, and the phone tabs (arrows work).
  - Refresh status, then the Pay flow.
  - Project "Show details".
  - The form.
  - At 375px, the mobile menu: Esc closes it and focus returns to the menu button.
- There is no horizontal scroll at 375px, and the phone fits.
- Nav links scroll to their sections without the sticky header covering the headings.
- Take a screenshot of each viewport and review it against spec §3.

- [ ] **Step 5: Lighthouse**

```bash
npx --yes lighthouse http://localhost:4173 --only-categories=performance,accessibility,seo --chrome-flags="--headless" --output=json --output-path=/tmp/lh.json --quiet
node -e "const r=require('/tmp/lh.json').categories;for(const k in r)console.log(k,Math.round(r[k].score*100))"
```

Expected: accessibility 100, SEO 100, performance at least 95. If any score is below target, fix the specific audit Lighthouse lists, then re-run.

- [ ] **Step 6: Commit and stop for review**

```bash
git add AGENTS.md PORTFOLIO_LOG.md
git commit -m "docs: update AGENTS.md rules and portfolio log for redesign"
```

Do **not** merge or push to `master`. Report the results to the user and hand over the DNS checklist from spec §6.
