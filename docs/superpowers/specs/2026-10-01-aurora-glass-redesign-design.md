# Aurora Glass Portfolio Redesign — Design Spec

**Date:** 2026-10-01
**Branch:** `aurora-redesign` (from local `master` @ 906e049)
**Supersedes:** `2026-10-01-portfolio-redesign-design.md` ("Pocket"). The user rejected that design as "too plain, like a CV".
**Visual reference (approved):** `docs/superpowers/specs/aurora-glass-mockup/index.html` (v9). Where this spec and the mockup disagree on look and feel, the mockup wins. Where they disagree on behaviour or accessibility, this spec wins.

## 1. Intent

**Who it's for:**
- Primary: recruiters hiring for Flutter / mobile roles, mostly remote or abroad.
- Secondary: freelance clients.

**What the user asked for:** a **professional, visually rich, animated portfolio**, explicitly *not* a CV. That means:
- the photo shown prominently
- glass, gradients and depth
- motion everywhere it adds delight
- detailed content in the depth the original site had
- real app logos, screenshots and store links

**Success criteria:**
- The page matches the approved v9 mockup section by section, in both look and motion.
- Every shipped app links to its real Google Play / App Store listing using official badges.
- Every project opens a detailed case study with a scroll-synced phone showcase.
- No repo-wide commit figures anywhere. The myDishHome figures are personal: **365 / 189 / 89 / 29**.
- The site is still a static export on GitHub Pages and is ready for `rijwol.com.np`.
- Accessibility 100 and SEO 100. Performance ≥ 90 in Lighthouse's simulated mobile mode and ≥ 95 with devtools throttling.
- Works fully with `prefers-reduced-motion`: animations become instant, nothing is hidden.

## 2. What stays from current `master`

The infrastructure is kept as is: the static export, Vitest setup, `public/CNAME`, `sitemap.ts` / `robots.ts`, canonical URL, `SITE_METADATA.url = https://rijwol.com.np`, the DNS merge gate in `PORTFOLIO_LOG.md`, and the deploy workflow.

The following are kept and reused, or restyled:
- `src/lib/{constants,utils,formspree}.ts`
- `useActiveSection`
- `useContactForm` (zod schema, in-flight guard, Formspree)
- `ThemeToggle` (`resolvedTheme` fix)
- the Header mobile-sheet behaviour: focus trap, Esc, scroll lock, closes at ≥ 768px
- `SocialIcons`
- the tests for those behaviours

The "Pocket" visual layer is replaced: hero/PhoneDemo, `SectionTitle`, `Chip`, the current section components and their styles.

## 3. Visual system

### Colour tokens (`globals.css`, exposed via `@theme inline`)

| Token | Dark (default) | Light | Use |
|---|---|---|---|
| `--background` | `#070b1a` | `#f5f6ff` | page |
| `--foreground` | `#e7ecff` | `#0f1430` | headings / text |
| `--muted` | `#9aa5c8` | `#4f5878` | secondary text |
| `--muted-2` | `#b6bfdc` | `#3d4566` | body copy on glass |
| `--indigo` | `#6366f1` | `#4f46e5` | primary accent |
| `--cyan` | `#22d3ee` | `#0891b2` | secondary accent, focus, active |
| `--fuchsia` | `#e879f9` | `#c026d3` | tertiary accent, education |
| `--emerald` | `#10b981` | `#059669` | availability / "live" dots |
| `--glass-bg` | `linear-gradient(160deg,#ffffff12,#ffffff05)` | `linear-gradient(160deg,#ffffffcc,#ffffff99)` | glass cards |
| `--glass-border` | `#ffffff1a` | `#0f143014` | glass card border |

- **Signature gradient:** `--grad` = `linear-gradient(90deg, indigo, cyan, fuchsia, indigo)`, animated with `background-position`. Used for gradient text, CTA buttons, the hero ring and the progress bar.
- **Dark is the default.** `defaultTheme="dark"` with system detection off, so the first visit always sees the aurora look. The light theme is selected through the toggle.
- **Contrast:** body text on glass must meet WCAG AA in both themes (check with Lighthouse).

### Type

Both fonts load through `next/font/google` with `display: swap`:
- **Display:** Sora 600/800 for headings, numbers and badges.
- **Body:** Manrope 400/500/700.

### Shape and depth

- **Glass cards:** `--glass-bg` + `--glass-border` + `backdrop-blur-[14px]`, radius 22px. Interactive tiles get a cursor-following gradient border glow (CSS custom properties `--x` / `--y`, updated on `pointermove`).
- **Background:** three blurred aurora blobs (indigo, cyan, fuchsia) drifting slowly behind the hero, plus a masked dot grid. Each section gets one or two low-opacity accent blobs.
- **Buttons:**
  - primary: gradient fill with an indigo glow shadow
  - secondary: glass with a 1px border
  - hover: lift 2px + scale 1.02

## 4. Sections (in order), matching the v9 mockup

### 4.0 Global chrome

- **Scroll progress bar:** a 3px gradient bar fixed at the top, `scaleX` bound to page scroll (Framer `useScroll`).
- **Header:** a floating glass pill nav, centred: `RS` gradient monogram · About · Work · Experience · Skills · Contact · theme toggle.
  - The active section is highlighted in cyan, and a `layoutId` pill slides between items.
  - It hides on scroll down and shows on scroll up.
  - Mobile behaviour is unchanged (glass bottom sheet).
- **Skip-to-content** link (kept).

### 4.1 Hero (`#hero`)

**Left column:**
- Emerald "Open to remote Flutter roles" pill with a ping dot.
- `h1` "Hi, I'm Rijwol" / **"Shakya"** in animated gradient text.
- A typing line that cycles: Flutter Developer → Mobile Engineer → Clean Architecture fan → UI craftsman.
- Intro paragraph.
- CTAs "View my work →" (`#work`) and "Download CV ↓", with **34px top spacing**.
- GitHub and LinkedIn icons.

**Right column:**
- The photo (`/images/avatar.png`, unchanged for now) in a circle (330px desktop, 240px mobile).
- A spinning conic-gradient ring around the photo, plus a dashed orbit carrying Flutter, Dart and Firebase logos counter-rotated so they stay upright.
- Three floating glass badges that bob: **365+** commits shipped · **3+ yrs** professional · **4** payment gateways.

**Below:**
- A full-width tech-logo marquee (12 logos, edge fade mask, infinite).
- **110px gap** above the marquee so it never touches the photo/orbit.

**Load sequence:** pill, then h1, then typing line, paragraph, CTAs, as a spring stagger using **transforms only** (rise and scale; opacity stays 1, per §5), with the photo and ring scaling in.

### 4.2 About (`#about`)

Eyebrow "About me", then h2 "Building apps that **people rely on**", then a lead line.

The bento grid (3 columns on desktop, stacked on mobile) has 7 tiles:
1. **Who I am** (tall, spans 3 rows) — three paragraphs:
   - *"I'm a Flutter developer with **3+ years of professional experience** building cross-platform mobile apps for Android and iOS. At **Dish Media Network** I build and maintain **myDishHome**, the self-service app with **1M+ downloads** that DishHome subscribers across Nepal use to pay bills, track technicians and manage their services."*
   - *"My engineering philosophy centres on **Clean Architecture**: a strict split between domain, data and presentation layers keeps codebases maintainable as they grow. I use **GetX** or **Riverpod** as the reactive layer, depending on the project."*
   - *"Beyond mobile, I'm growing my skills in **React, Next.js and Node.js** through projects like Finance Tracker (Flutter + Supabase) and Rent-N-Read (React + Node.js). I'm currently pursuing an **MSc in Data Science** to bring ML-driven features to mobile."*
2. **Commits to myDishHome:** count-up to **365+**; caption "my own, merges excluded".
3. **Experience:** count-up to **3+**; caption "years, plus an internship".
4. **Currently:** live dot, "Mobile App Developer", "Dish Media Network · myDishHome".
5. **Local time, Kathmandu:** a live clock (`Asia/Kathmandu`, updates every 10s); caption "UTC+5:45 · overlaps EU mornings".
6. **myDishHome commit breakdown:** animated bars for feat 189 / fix 89 / refactor 29, filling when they enter the viewport.
7. **Apps shipped:** count-up to **6+**; caption "Flutter, React Native & web".

### 4.3 Work (`#work`)

Eyebrow "Featured work", then h2 "Projects I've **shipped**", then a lead line.

**Feature block (myDishHome, clickable):**
- **Left:**
  - app icon + "PRODUCTION · FLUTTER · 1M+ DOWNLOADS" + title + description
  - 4 count-up metric tiles (365 my commits / 189 features / 89 fixes / 4 gateways)
  - "What I built" list (5 items)
  - Domain / Data / Presentation architecture tiles
  - official **Google Play** and **App Store** badges + a "Full case study →" button
- **Right:** a 3D-tilted floating phone cycling through the 4 real store screenshots (crossfade + scale, 3s each).

**Project cards** (3 columns, then 2), each a glass card with 3D tilt toward the cursor (±12°):

| Card | Contents |
|---|---|
| Bizlevate, SalesMania, Finance Tracker | real app icon, title, subtitle, description, 3 real screenshot minis (outer two fan out on hover), tech tags, colour store chips, "Case study →" |
| HG HUB | monogram tile, "Internal release" chip, no store links |
| Rent-N-Read | monogram tile, GitHub chip |

**Store badge rules:**
- **Large:** official SVG badges (Google Play "GET IT ON", Apple "Download on the App Store"), 48px tall, hover lift + glow.
- **Small:** chips with a colour icon — Google Play four-colour triangle, App Store blue "A" tile. GitHub uses `#24292f` with the white mark.
- Links open in a new tab with `rel="noopener noreferrer"` and an accessible name, e.g. "myDishHome on Google Play".

### 4.4 Case study modal (all 6 projects)

**Container:**
- A full-viewport fixed dialog (`role="dialog"`, `aria-modal`, labelled by the project title), with a blurred backdrop.
- The body behind is scroll-locked; focus is trapped and returns to the trigger on close.
- Close with ✕, Esc or a backdrop click.
- Spring pop-in, plus a shared `layoutId` from the card icon to the modal icon.

**Left column** (scrolls inside the dialog), in this order:
1. header (icon, title, subtitle)
2. store badges / GitHub button
3. **Overview**
4. **App information** grid
5. **Key features** (2 columns)
6. **Architecture** (3 tiles)
7. **Key metrics** (4 tiles)
8. **What I did**
9. **Tech stack**

**Right column — sticky "showcase":**
- One 3D phone (notch + glare) shows the active screenshot.
- The **active screenshot follows the dialog's vertical scroll progress**.
- A vertical thumbnail rail jumps to a screen; the active thumb gets a cyan glow.
- A "n / N · Scroll to explore" counter.
- The phone tilts toward the cursor.
- Transition: fade + slide-up + blur-in.
- The rail sits below the ✕ button.
- **Mobile:** the showcase stacks above the content and becomes a horizontal swipe carousel with scroll-snap and dots.
- Projects with no screenshots show a glass placeholder with the monogram and "Internal release" or "Source code on GitHub".

**Content:** the full per-project content in §6 (data), using the v9 mockup text.

### 4.5 Experience & Education (`#experience`)

Eyebrow "Experience", then h2 "Where I've **worked**", then a lead line.

A tab switch, **Experience | Education**, implemented as `role="tablist"` with a sliding gradient pill using a springy `layoutId`.

**Experience timeline:**
- Centre line on desktop that **draws on scroll** (`scaleY` from `useScroll`); alternating glass cards slide in from their side.
- Glowing cyan dots.
- **Mobile:** single column, line on the left.

| Role | Date range | Content |
|---|---|---|
| Mobile Application Developer, Dish Media Network Ltd. (Karyabinayak) | Dec 2025 – Present | 6 bullets + tags (§6) |
| Junior Software Developer, Infocom Solutions Pvt. Ltd. (Hattisar) | May 2023 – Dec 2025 | 6 bullets + tags |
| Software Developer Intern, Infocom Solutions | Feb – May 2023 | 3 bullets + tags |

**Education timeline:** the same style with fuchsia dots — MSc Data Science & Computational Intelligence (Sep 2025 – present) and BSc (Hons) Computing (Mar 2020 – Mar 2023), both at Softwarica College of IT & E-Commerce.

### 4.6 Skills (`#skills`)

Eyebrow "Skills", then h2 "My **toolkit**", then a lead line.

**Core technologies:** 8 glass cards, each with a logo inside a conic **proficiency ring** that fills on enter, plus a level pill.

| Technology | Ring | Level |
|---|---|---|
| Flutter | 95 | Primary |
| Dart | 92 | Primary |
| Firebase | 85 | Proficient |
| React Native | **50** | **Beginner** |
| React | **50** | **Beginner** |
| Supabase | **50** | **Beginner** |
| Node.js | **50** | **Beginner** |
| TypeScript | **50** | **Beginner** |

**Everything I work with:** 8 glass group cards (4 columns on desktop), each with an emoji tile and logo chips that lift on hover:
- Mobile development
- State management
- Architecture
- Backend & APIs
- Databases & storage
- Frontend
- DevOps & delivery
- Developer tools

The contents are in §6.

### 4.7 Contact (`#contact`)

Eyebrow "Contact", then h2 "Let's build **something great**", then the lead line "Hiring for a Flutter role or need an app built? My inbox is open."

- **Left:** three glass info cards with gradient icon tiles:
  - Email (mailto)
  - Phone (tel)
  - Location: "Kathmandu, Nepal · remote worldwide"
- **Right:** a glass form with floating labels: Name, Email, Subject, Message.
  - It reuses `useContactForm`; the optional `project` field stays in the schema but isn't shown.
  - Inline zod errors.
  - Sending, success and error states as on current master: the error state shows the email fallback.
  - Gradient "Send message ➤" button.

### 4.8 Footer

"© {year} Rijwol Shakya" · social icons · "Designed & built with Next.js".

## 5. Motion

All motion uses Framer Motion springs unless noted.

| Element | Motion |
|---|---|
| Hero entrance | staggered fade + rise (springs) |
| Aurora blobs | CSS keyframes, 14–18s drift |
| Ring | 8s spin |
| Orbit | 22s spin |
| Badges | 4s bob |
| Marquee | 26s linear |
| Typing role line | JS timer: 70ms per type, 35ms per delete, 1.4s hold |
| Sections | reveal on enter: `whileInView`, `once: true`, `y: 40 → 0`, `opacity 0 → 1`, stagger 80ms |
| Counters | count-up on enter (≈1.2s) |
| Bars | width fill |
| Proficiency rings | conic fill |
| Project cards | pointer tilt (±12°, perspective 800px); gradient border glow on bento tiles |
| Feature phone | float 7s with 3D tilt; screenshot crossfade every 3s |
| Timeline | line draw linked to scroll; cards slide in from their side |
| Tabs | `layoutId` pill |
| Modal | backdrop fade, box spring scale, icon `layoutId`, showcase transitions |

**Reduced motion:**
- `MotionConfig reducedMotion="user"` covers Framer animations.
- A `@media (prefers-reduced-motion: reduce)` block stops all CSS keyframes (blobs, ring, orbit, marquee, bob, phone float, cycles).
- The typing line shows the first role statically.
- Counters show their final value immediately.
- **No content may depend on an animation finishing to become visible.**
  - `Reveal` server-renders its children fully visible.
  - It applies the hidden `initial` state only after mount (a `useSyncExternalStore` mounted flag), and only to elements still below the viewport at that moment. Elements already on screen stay visible.
  - Hero content animates with transform only (opacity stays 1), so the LCP headline and photo paint immediately.
  - A test asserts the server HTML has no `opacity:0` in the hero.

**Performance:**
- Animate only `transform` / `opacity` / `filter`.
- Pause the marquee and blobs when off-screen.
- Pointer effects use `requestAnimationFrame` throttling.
- No layout thrash.

## 6. Data model and content

### Projects — `src/features/projects/types.ts`

```ts
type StoreKind = "play" | "appstore" | "github";
interface StoreLink { kind: StoreKind; url: string }
interface InfoItem { label: string; value: string }
interface ArchLayer { label: string; description: string }
interface Metric { value: string; label: string }
interface Project {
  id: "mydishhome" | "bizlevate" | "salesmania" | "finance-tracker" | "hg-hub" | "rent-n-read";
  title: string; subtitle: string; category: string;      // card subtitle e.g. "Attendance & leave · Flutter"
  tier: "feature" | "card";
  icon?: string;                       // /apps/<id>/icon.png  (monogram fallback when absent)
  monogram?: string;                   // "HG", "RR"
  cardDescription: string;
  overview: string;
  stores: StoreLink[];
  statusNote?: string;                 // "Internal release"
  info: InfoItem[];
  features: string[];
  architecture: ArchLayer[];
  metrics: Metric[];
  contributions: string[];             // "What I did"
  techStack: string[];
  cardTags: string[];
  screenshots: string[];               // /apps/<id>/shot-N.webp
}
```

**Store links:**

| App | Google Play | App Store |
|---|---|---|
| myDishHome | https://play.google.com/store/apps/details?id=com.shirantech.dishhome | https://apps.apple.com/np/app/mydishhome/id1396471022 |
| Bizlevate | https://play.google.com/store/apps/details?id=com.ispl.bizlevate | https://apps.apple.com/np/app/bizlevate/id6760984023 |
| SalesMania (SalesManiaHD) | https://play.google.com/store/apps/details?id=com.ispl.ps360flutter | https://apps.apple.com/np/app/salesmaniahd/id6760572812 |
| Finance Tracker | https://play.google.com/store/apps/details?id=com.rijwolshakya.financetracker | — |
| HG HUB | — (internal) | — |
| Rent-N-Read | GitHub: https://github.com/Ak-tsuki | — |

**Content:** the overview, info, features, architecture, metrics, "What I did" and tech stack for every project are taken **verbatim from the `P` object in the v9 mockup script**. The "Minimum OS" and "Latest version" values come from the iTunes Lookup API as of 2026-10-01.

**myDishHome metrics:** keep the `git` provenance comment from current master.

### Experience — `src/features/experience/data/*`

- **Bullets:** use the full v9 mockup bullets (6 / 6 / 3).
- **Fields:** `ExperienceEntry` keeps `role`, `company`, `location`, `period`, `current`, `responsibilities`, `tags`. Drop `version` (the changelog styling is gone).
- **Education:** `EDUCATION_DATA` (kept), with an added one-line `focus` per entry.

### Skills — `src/features/skills/data/*`

- `CORE_SKILLS: { name; icon; level: "Primary" | "Proficient" | "Beginner"; value: number }[]`, per the §4.6 table.
- `SKILL_GROUPS: { title; emoji; accent; skills: { name; icon? }[] }[]`, with the 8 groups and their contents from v9.

### Assets — `public/`

| Path | Contents |
|---|---|
| `apps/<id>/icon.png` | 512px app icons from the stores |
| `apps/<id>/shot-1..4.webp` | screenshots ~600px wide; Finance Tracker PNGs converted to webp |
| `badges/google-play.svg`, `badges/app-store.svg` | official badges |
| `icons/` | the 12 tech logos restored from git `d348417`, plus `play-color.svg`, `appstore-color.svg`, `github-white.svg` |

All images:
- carry explicit `width` / `height`, so there is no CLS
- below the fold: `loading="lazy"` and `decoding="async"`
- have meaningful `alt` text for screenshots, and empty `alt` for decorative logos

The source files are in `docs/superpowers/specs/aurora-glass-mockup/`.

## 7. Architecture and file layout

This follows `AGENTS.md`: feature folders, `"use client"` only where interactive, no `useMemo` / `useCallback`, no `any`.

```text
src/components/ui/         GlassCard, GradientText, Button (gradient/glass variants), StoreBadge, StoreChip,
                           SectionHeader (eyebrow + h2 with gradient span + lead), Reveal (whileInView wrapper),
                           CountUp, TiltCard, GlowBorder (pointer-glow hook/wrapper), Marquee, TechLogo
src/components/common/     Header (glass pill), Footer, ScrollProgress, AuroraBackground, ThemeToggle, Providers
src/features/hero/         HeroSection, PhotoOrbit, TypingRoles
src/features/about/        AboutSection (bento), LiveClock, CommitBars
src/features/projects/     ProjectsSection, FeatureProject, ProjectCard, CaseStudyModal, PhoneShowcase, data/, types
src/features/experience/   ExperienceSection, Timeline, data/
src/features/skills/       SkillsSection, CoreSkillCard, SkillGroupCard, data/
src/features/contact/      ContactSection, ContactForm (floating labels), hooks/useContactForm (kept), types (kept)
src/hooks/                 useActiveSection (kept), useScrollDirection (restored), useTypewriter, usePointerVars
```

**Pure logic, unit-tested:**
- `useTypewriter` step function
- `showcaseIndex(progress, count)`
- the clock formatter
- the count-up easing

## 8. Accessibility

- **Semantics:** semantic landmarks; one `h1`; section `h2`s; `aria-labelledby` on each section.
- **Decorative elements** (blobs, orbit, badges, marquee duplicates, glare) are marked `aria-hidden`.
- **Marquee:** has a visually hidden full list.
- **Typing line:** wrapped in a live region set to `aria-live="off"`; screen readers read a static "Flutter developer" instead.
- **Tabs:** full keyboard support.
- **Modal:** dialog semantics, focus trap, Esc, focus return.
- **Thumbnails:** buttons with labels.
- **Store badges:** have accessible names.
- **Focus rings:** visible cyan, in both themes.
- **Touch targets:** ≥ 48px.
- **Contrast:** AA in both themes.

## 9. Testing (Vitest + Testing Library)

| Test file | What it checks |
|---|---|
| `projects.data.test.ts` | each of the 6 projects is present; store links match §6 exactly; Finance Tracker has Play only; HG HUB has none; myDishHome metrics include 365/189/89 and nothing contains `1,065` / `1,000+` / `2+ years` (keep `src/content.test.ts`) |
| `showcase.test.ts` | `showcaseIndex` maps progress 0 → 0 and 1 → last, and is clamped |
| `CaseStudyModal.test.tsx` | opening a card renders *that* project's title and overview (regression for the "always Bizlevate" mockup bug); Esc closes and returns focus to the card; thumbnail click shows that screenshot; no store badges for HG HUB |
| `ExperienceSection.test.tsx` | tab switch shows Education with the MSc; arrow keys move between tabs |
| `SkillsSection.test.tsx` | React Native / React / Supabase / Node.js / TypeScript render "Beginner" with value 50 |
| `useTypewriter.test.ts` | step sequence: types, holds, deletes, advances |
| `HeroSection.test.tsx` | h1, CTAs (`#work`, CV path), photo has alt, server HTML has no `opacity:0` on the h1 / photo |
| `ContactForm.test.tsx` | keep the existing cases (errors, failure fallback, single request) on the new UI |
| `Header.test.tsx` | keep the existing cases on the restyled header |
| `seo.test.ts`, `ThemeToggle.test.tsx` | keep |

## 10. Verification before completion

- `npm run lint`, `npx tsc --noEmit`, `npm test` and `npm run build` all pass.
- `out/CNAME`, `out/sitemap.xml` and `out/robots.txt` are present.
- All `/apps/**` and `/badges/**` assets resolve.
- **Visual comparison with the v9 mockup:**
  - desktop at 1280 and 1440
  - tablet at 768
  - mobile at 375 / 390 with real device emulation (Lighthouse or DevTools), not a narrow window
  - dark and light themes
- **Reduced motion:** everything visible, no motion.
- **Keyboard-only pass:** nav, tabs, cards → modal → thumbnails → close, form.
- **Lighthouse:** see §1 targets.
- **No merge to `master` without the user's approval;** the DNS merge gate still applies.

## 11. Housekeeping

- Update `AGENTS.md`:
  - Restore glassmorphism and gradients as the design language.
  - Replace the "Pocket" token rule with §3 and the motion-budget rule with §5.
  - Note the `docs/superpowers/specs/aurora-glass-mockup/` reference.
- Append a Session 4 entry to `PORTFOLIO_LOG.md`.
- Save the user's design preference in memory (done).

## Out of scope

- A new photo (the user will provide one later; it's a one-file swap at `public/images/avatar.png`).
- Separate case-study routes, a blog, CMS or analytics.
- HG HUB store links (not published).
