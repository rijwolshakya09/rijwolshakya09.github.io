# Portfolio Project Log
**Project:** Rijwol Shakya — Developer Portfolio  
**Tech Stack:** Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion  
**Deployment:** GitHub Pages via static export (`output: 'export'`)  
**Last Updated:** 2026-10-01

---

## Table of Contents
1. [Session History](#session-history)
2. [Data Mining Results](#data-mining-results)
3. [Architecture Decisions](#architecture-decisions)
4. [File Structure](#file-structure)
5. [Completed Tasks](#completed-tasks)
6. [Known Issues & Pending Items](#known-issues--pending-items)
7. [Deployment Guide](#deployment-guide)
8. [Environment Notes](#environment-notes)

---

## Session History

### Session 1 — 2026-05-20: Blueprint + Full Build

**Phase 0: Planning (User-Approved Blueprint)**
- Analyzed `AGENTS.md` for architectural constraints (static export, feature-driven layout, no server runtime, React Compiler mode)
- Mined 3 data sources: CV PDF, 4 local git repositories, GitHub profile
- Presented engineering blueprint and received explicit approval to proceed

**Phase 1: Foundation**
- Installed 8 npm packages: framer-motion, next-themes, clsx, tailwind-merge, react-hook-form, @hookform/resolvers, zod, lucide-react
- Updated `next.config.ts`: added `output: 'export'`, `images.unoptimized: true`, kept `reactCompiler: true`
- Rewrote `globals.css` with Tailwind v4 `@theme` block, CSS custom properties for light/dark palettes, glassmorphism utilities, scrollbar styling

**Phase 2: Lib Layer**
- `src/lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)
- `src/lib/constants.ts` — site metadata, nav links, social URLs
- `src/lib/formspree.ts` — Formspree endpoint config

**Phase 3: Data Layer (CV + Git-mined content)**
- `src/features/experience/data/experience.data.ts` — 3 roles with real responsibilities
- `src/features/projects/data/projects.data.ts` — 6 projects with architecture layers, git metrics, highlights
- `src/features/skills/data/skills.data.ts` — 8 skill groups, 40+ skills

**Phase 4: UI Primitives**
- `Button.tsx` — 3 variants (primary, ghost, outline), 3 sizes, 48px mobile min-height
- `Badge.tsx` — color-coded per technology, semantic roles
- `GlassCard.tsx` — glassmorphism wrapper with optional hover
- `SectionHeading.tsx` — animated, whileInView, label chip + title + description
- `SocialIcons.tsx` — custom SVG GitHub + LinkedIn (lucide-react dropped these icons in latest version)

**Phase 5: Common Components**
- `Header.tsx` — sticky, glass on scroll, hide-on-scroll-down, mobile bottom-sheet drawer, active nav pill with layoutId, `aria-current`
- `Footer.tsx` — social links, copyright
- `ThemeToggle.tsx` — sun/moon, mounted guard (no hydration flash)
- `ScrollProgress.tsx` — spring-animated top bar via `useScroll` + `useSpring`

**Phase 6: Global Hooks**
- `useReducedMotion.ts` — `prefers-reduced-motion` MediaQuery listener
- `useScrollDirection.ts` — up/down detection for header animation
- `useActiveSection.ts` — IntersectionObserver watching all section IDs

**Phase 7: Feature Sections (6 total)**
- `HeroSection.tsx` — animated name, status badge (open to work), CTAs, social links, scroll cue, physics-based stagger
- `AboutSection.tsx` — bio, education timeline with dots, 4 stat cards, location card
- `ExperienceSection.tsx` — vertical timeline, 3 roles, current indicator, responsibility bullets, tech tags
- `ProjectsSection.tsx` — tag filter bar (All / Flutter / React Native / React / Node.js / JavaScript), animated grid with AnimatePresence, project cards with metrics preview
- `ProjectModal.tsx` — full case study modal: architecture layers, git metrics, highlights, GitHub link
- `SkillsSection.tsx` — 8 skill group cards with icon + badge list, staggered entry
- `ContactSection.tsx` — info cards (email/phone/location) + validated form (zod + react-hook-form) → Formspree, success/error states, accessible error messages

**Phase 8: App Layer**
- `layout.tsx` — ThemeProvider, full SEO metadata (OG, Twitter, robots, keywords), Google Fonts with `display: swap`
- `page.tsx` — clean section compositor, ScrollProgress + Header + 6 sections + Footer

**Phase 9: CI/CD**
- `.github/workflows/deploy.yml` — push-to-master trigger, Node 20, `npm ci`, `npm run build`, peaceiris/actions-gh-pages to `gh-pages` branch

**Bug Fixes During Build:**
1. `lucide-react` v0.500+ dropped `Github` and `Linkedin` exports → created `SocialIcons.tsx` with inline SVGs
2. Framer Motion `Variants` TypeScript strict error on `type: "spring"` → added `as const`

**Final Build Result:** ✅ Clean — 2 static routes (`/` + `/_not-found`), zero TypeScript errors, zero ESLint errors

---

## Data Mining Results

### CV Data Extracted
| Field | Value |
|---|---|
| Name | Rijwol Shakya |
| Current Role | Mobile Application Developer, Dish Media Network Ltd. |
| Prior Role | Junior Software Developer, Infocom Solutions Pvt. Ltd. (May 2023–Dec 2025) |
| Internship | Software Developer Intern, Infocom Solutions Pvt. Ltd. (Feb–May 2023) |
| Education 1 | BSc. Hons Computing, Softwarica College (Mar 2020–Mar 2023) |
| Education 2 | MSc. Data Science & CI, Softwarica College (Sep 2025–Present) |
| Contact | shakyarijwol19@gmail.com / +977-9861291534 |

### Git Repositories Mined

| Repository | Commits | Key Findings |
|---|---|---|
| `dmn-customer-mobile-app` | **1,065** | 29 branches, 128 feat:, 65 fix:, 23 refactor:, 4 payment gateways |
| `finance_tracker` | ~50+ | Supabase/RLS, OCR, PDF reports, 36 tests, Google Sheets export |
| `ecomm-merchant-flutter` | ~40 | Payment checkout SDK, WebView, live/UAT credentials |
| `my-portfolio` | 2 | This repo (initial Next.js setup) |

### myDishHome Feature Branches Identified
`feature/esewa-intent-implementation`, `feature/fcm-token-refresh`, `feature/technician-review-ticket`, `feature/support-redesign-reauthorization`, `feature/privilege-offers`, `feature/privilegeDetails`, `feature/privilege-banner`, `feature/khalti-account-management`, `feature/fonepay-intent`, `feature/getpay-log`, `feature/reportIssue`, `feature/account_deletion`, `feature/env-security`, `bugfix/crashlytics`, `bugfix/login-biometric-refresh`, `chore/update-esewa-sdk`, `feat/flutter-upgrade-3.38.10`, `backup/reportIssue-wrong-merge`

### GitHub Profile
- Username: `rijwolshakya09` (Pro account)
- 26 public repositories
- Pinned: Rent-N-Read (Frontend + Backend, JS, 2 ⭐)
- Member of: `@Ak-tsuki` org

---

## Architecture Decisions

| Decision | Choice | Reason |
|---|---|---|
| Export mode | `output: 'export'` | GitHub Pages (static only) — AGENTS.md mandate |
| React Compiler | `reactCompiler: true` | Already configured; no manual useMemo/useCallback per AGENTS.md |
| CSS framework | Tailwind v4 (pure utility) | No runtime CSS-in-JS per AGENTS.md |
| Theme system | `next-themes` class-based | Zero-flash dark/light, no media-query flicker |
| Animation | Framer Motion spring physics | Per AGENTS.md spec (stiffness/damping, not tweens) |
| Reduced motion | `useReducedMotion` guard on all animations | Per AGENTS.md spec — wrapped every major animation |
| Component lib | Manual + clsx/tailwind-merge | No MUI/Ant Design per AGENTS.md |
| Forms | react-hook-form + zod + Formspree | Client-only, zero server runtime, validated |
| Icons | lucide-react + custom SVG fallbacks | Latest lucide dropped Github/Linkedin — SVGs created |
| Social icons | Custom inline SVG | lucide-react v0.500+ breaking change |
| Font | Geist Sans + Geist Mono | Already configured in project |

---

## File Structure

```
my-portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml              ✅ CI/CD GitHub Actions
├── src/
│   ├── app/
│   │   ├── globals.css             ✅ Design tokens, glassmorphism
│   │   ├── layout.tsx              ✅ ThemeProvider + SEO metadata
│   │   └── page.tsx                ✅ Section compositor
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Badge.tsx           ✅ Color-coded tech tags
│   │   │   ├── Button.tsx          ✅ 3 variants
│   │   │   ├── GlassCard.tsx       ✅ Glassmorphism wrapper
│   │   │   ├── SectionHeading.tsx  ✅ Animated h2
│   │   │   └── SocialIcons.tsx     ✅ GitHub + LinkedIn SVGs
│   │   └── common/
│   │       ├── Footer.tsx          ✅
│   │       ├── Header.tsx          ✅ Sticky, mobile drawer, active nav
│   │       ├── ScrollProgress.tsx  ✅ Spring-animated top bar
│   │       └── ThemeToggle.tsx     ✅ Sun/moon, mounted guard
│   ├── features/
│   │   ├── hero/components/
│   │   │   └── HeroSection.tsx     ✅ Staggered entry, CTAs, status badge
│   │   ├── about/components/
│   │   │   └── AboutSection.tsx    ✅ Bio, stats, education timeline
│   │   ├── experience/
│   │   │   ├── components/
│   │   │   │   └── ExperienceSection.tsx  ✅ Timeline, 3 roles
│   │   │   ├── data/
│   │   │   │   └── experience.data.ts     ✅ Real CV data
│   │   │   └── types.ts                   ✅
│   │   ├── projects/
│   │   │   ├── components/
│   │   │   │   ├── ProjectModal.tsx       ✅ Case study (arch + metrics)
│   │   │   │   └── ProjectsSection.tsx    ✅ Filter + grid
│   │   │   ├── data/
│   │   │   │   └── projects.data.ts       ✅ 6 projects, git metrics
│   │   │   ├── hooks/
│   │   │   │   └── useProjectFilter.ts    ✅
│   │   │   └── types.ts                   ✅
│   │   ├── skills/
│   │   │   ├── components/
│   │   │   │   └── SkillsSection.tsx      ✅ 8 categories, staggered
│   │   │   ├── data/
│   │   │   │   └── skills.data.ts         ✅ 40+ skills
│   │   │   └── types.ts                   ✅
│   │   └── contact/
│   │       ├── components/
│   │       │   └── ContactSection.tsx     ✅ Info + validated form
│   │       ├── hooks/
│   │       │   └── useContactForm.ts      ✅ Zod + react-hook-form
│   │       └── types.ts                   ✅
│   ├── hooks/
│   │   ├── useActiveSection.ts     ✅ IntersectionObserver
│   │   ├── useReducedMotion.ts     ✅ prefers-reduced-motion guard
│   │   └── useScrollDirection.ts  ✅ Header hide/show
│   └── lib/
│       ├── constants.ts            ✅ Metadata, nav, socials
│       ├── formspree.ts            ✅ Form endpoint
│       └── utils.ts                ✅ cn() helper
├── next.config.ts                  ✅ output: export, images.unoptimized
├── PORTFOLIO_LOG.md                ✅ This file
└── Rijwol_Shakya_CV.pdf            (source data, served as downloadable)
```

---

## Completed Tasks

| # | Task | Status |
|---|---|---|
| 1 | Install npm packages | ✅ Done |
| 2 | Configure next.config.ts | ✅ Done |
| 3 | Build lib layer | ✅ Done |
| 4 | Build data layer | ✅ Done |
| 5 | Build UI primitives | ✅ Done |
| 6 | Build common components | ✅ Done |
| 7 | Build all feature sections | ✅ Done |
| 8 | Build global hooks | ✅ Done |
| 9 | Wire app layer | ✅ Done |
| 10 | Set up globals.css | ✅ Done |
| 11 | Create CI/CD pipeline | ✅ Done |
| 12 | Write PORTFOLIO_LOG.md | ✅ Done |

---

## Known Issues & Pending Items

### Session 2 — 2026-05-20: Bug Fixes + Visual Overhaul

**Bug Fix 1 — Hydration mismatch (AboutSection em dash):**
- Root cause: `</strong> — text` JSX inline text rendered with inconsistent leading space between SSR and client
- Fix: Wrapped all inline text around JSX elements with explicit `{" string "}` expressions to eliminate ambiguous whitespace

**Bug Fix 2 — ThemeProvider script tag warning (React 19):**
- Root cause: In React 19, `<script>` elements injected by `next-themes` ThemeProvider trigger a warning when rendered in server component tree
- Fix: Created `src/components/common/Providers.tsx` with `"use client"` directive; moved ThemeProvider into it; added `suppressHydrationWarning` to `<body>` in layout.tsx

**Visual Additions:**
- Downloaded GitHub profile picture (24KB PNG from `github.com/rijwolshakya09.png`) → `public/images/avatar.png`
- Downloaded 12 tech SVG icons from Simple Icons CDN → `public/icons/` (flutter, dart, react, firebase, typescript, nodedotjs, git, figma, supabase, redux, mongodb, mysql)
- `HeroSection.tsx` — rebuilt as 2-column layout: text left + profile photo right with animated floating stat badges ("1,065+ commits", "2+ years"), spinning decorative ring, gradient glow
- `TechMarquee.tsx` — new animated scrolling ticker of all 12 tech stack logos with fade edges, `prefers-reduced-motion` guard, infinite CSS animation
- `AboutSection.tsx` — added 4-stat infographic row with gradient icons, animated git commit progress bars (feat/fix/refactor), payment gateway badge grid
- `SkillsSection.tsx` — added 8-icon "Core Technologies" infographic grid with hover lift, proficiency labels (Primary/Proficient/Growing), tech SVG icons alongside badges in skill groups
- `page.tsx` — inserted `<TechMarquee />` between HeroSection and AboutSection

**Final Build:** ✅ Clean — zero TypeScript errors, zero ESLint errors

---

### Session 3 — 2026-10-01: Redesign ("Pocket") + rijwol.com.np

Spec: `docs/superpowers/specs/2026-10-01-portfolio-redesign-design.md` · Plan: `docs/superpowers/plans/2026-10-01-portfolio-redesign.md` · Branch: `redesign`

- **Design:** replaced indigo/violet glassmorphism with a token system (Fog/Ink/Signal blue, deep-blue dark mode), Bricolage Grotesque + Schibsted Grotesk, class-based `dark` variant, global `MotionConfig reducedMotion="user"`.
- **Hero:** interactive, unbranded phone demo (Ticket stepper, Pay with eSewa/Khalti/FonePay, rich-push Alerts) with accessible tabs and a live region.
- **Work:** myDishHome case study + inline-expanding cards (modal and tag filter removed). **Experience:** versioned changelog (v1.0 → v3.0) + education. **Toolkit:** 3 rows. **Contact:** "Hiring?" vs "Need an app built?" with a project field and double-submit guard.
- **Commit figures corrected to personal numbers** — 365 commits, 189 feat, 89 fix, 29 refactor (was repo-wide 1,065 / 128 / 65 / 23). Source: `git rev-list --all --no-merges --author='rijwol.shakya@dishhome.com.np' --count` in `dmn-customer-mobile-app`. "29 feature branches" removed (team figure). Years of experience → 3+.
- **Domain:** `public/CNAME` = `rijwol.com.np`, `SITE_METADATA.url` = `https://rijwol.com.np`, static `sitemap.xml` / `robots.txt`, canonical URL, new OG image.
- **Removed:** About section, TechMarquee, ScrollProgress, ProjectModal, project filter, GlassCard/Badge/SectionHeading, `useScrollDirection`, `useReducedMotion`, `lib/assets.ts`, `public/icons/`, default Next SVGs.
- **Fixed along the way:** `dark:` utilities ignored the theme toggle (no class variant); toggle no-op when theme was "system"; `FORMSPREE_ENDPOINT` held an invalid value (now the real `xykvegga` ID and actually used).
- **Tests:** Vitest + Testing Library added (`npm test`).

---

### 🔴 Action Required — point rijwol.com.np at GitHub Pages

The domain's current nameservers (`ns1/2/3.epizy.com`) do not respond, so the domain does not resolve at all (observed 2026-10-01).

1. **Cloudflare:** add site `rijwol.com.np` on the Free plan.
2. **Cloudflare DNS** (all *DNS only*, grey cloud): `A @ 185.199.108.153`, `A @ 185.199.109.153`, `A @ 185.199.110.153`, `A @ 185.199.111.153`, `CNAME www rijwolshakya09.github.io`.
3. **register.com.np:** replace the `epizy.com` nameservers with Cloudflare's two (manual approval, ~1–2 days).
4. **Verify:** `dig +short rijwol.com.np` returns the four GitHub IPs.
5. **GitHub:** repo Settings → Pages → Custom domain → `rijwol.com.np` → Save → wait for DNS check → enable **Enforce HTTPS**.
6. **Search Console:** add Domain property `rijwol.com.np`, verify via TXT in Cloudflare, submit `https://rijwol.com.np/sitemap.xml`.

---

## Deployment Guide

### Step 1 — Prep
```bash
# Copy CV to public folder
cp Rijwol_Shakya_CV.pdf public/

# If deploying to /my-portfolio sub-path, update next.config.ts:
# basePath: '/my-portfolio',
# assetPrefix: '/my-portfolio/',
```

### Step 2 — Test Build Locally
```bash
npm run build
npx serve out  # preview the static export
```

### Step 3 — Push to GitHub
```bash
git add .
git commit -m "feat: complete portfolio build"
git push origin master
```

The GitHub Actions workflow at `.github/workflows/deploy.yml` automatically:
1. Installs dependencies (`npm ci`)
2. Builds (`npm run build` → `out/`)
3. Deploys `out/` to `gh-pages` branch via `peaceiris/actions-gh-pages`

### Step 4 — Configure GitHub Pages
- Go to: `https://github.com/rijwolshakya09/my-portfolio/settings/pages`
- Source: `Deploy from a branch`
- Branch: `gh-pages` / `/ (root)`
- Save

Your site will be live at: `https://rijwolshakya09.github.io/my-portfolio/`

---

## Environment Notes

| Item | Value |
|---|---|
| Node.js target | 20 (CI) |
| Next.js version | 16.2.6 |
| React version | 19.2.4 |
| Tailwind version | v4 |
| Build output | `out/` (static export) |
| Default theme | Dark |
| Git user | rijwol.shakya |
| Git email | rijwol.shakya@dishhome.com.np |
| Contact email | naruto09.uzu09@gmail.com |

---

## Package Versions Installed

```json
{
  "framer-motion": "latest",
  "next-themes": "latest",
  "clsx": "latest",
  "tailwind-merge": "latest",
  "react-hook-form": "latest",
  "@hookform/resolvers": "latest",
  "zod": "latest",
  "lucide-react": "latest"
}
```

> **Note:** `lucide-react` v0.500+ removed `Github` and `Linkedin` icons. Custom SVG components were created at `src/components/ui/SocialIcons.tsx` as a replacement.
