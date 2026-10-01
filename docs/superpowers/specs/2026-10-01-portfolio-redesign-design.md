# Portfolio Redesign + rijwol.com.np — Design Spec

**Date:** 2026-10-01
**Branch:** `redesign`
**Status:** Approved in brainstorming, pending written-spec review

## 1. Intent

**Who it's for:** Recruiters and hiring managers filling Flutter/mobile roles, mainly remote or abroad. Freelance and contract clients are a secondary audience.

**Primary job:** Within a few seconds, show that Rijwol builds real, production mobile apps. Then make it easy to read the details (work, experience) and get in touch, either to hire or to commission an app.

**What the user asked for:**
1. Redesign every section of the portfolio. The current indigo/violet glassmorphism look reads as a template.
2. Fix the myDishHome commit figures. They currently show the whole team's commits (1,065) and should show only commits by `rijwol.shakya`.
3. Serve the site at `rijwol.com.np`.

**Success criteria**
- No repo-wide commit figure appears anywhere on the site. All myDishHome numbers are personal.
- The hero shows mobile work through an interactive phone, not a stats row.
- The site works at `https://rijwol.com.np` over HTTPS, and `rijwolshakya09.github.io` redirects to it.
- Lighthouse scores: Accessibility 100, SEO 100, Performance 95 or higher.
- It is still a static export on GitHub Pages, with no server runtime.

## 2. Decisions made

| Decision | Choice |
|---|---|
| Visual direction | **A · Pocket** (tappable phone hero) with **B · Release notes** used for Experience |
| Phone demo content | myDishHome-style flows, **unbranded**: no DishHome name, logo, or colors |
| Commit count shown | **365** (non-merge commits by the user) |
| Implementation approach | Rebuild the visual layer in place; keep data, lib, hooks, and contact logic |
| Project details | Expand inline (accordion). The modal is removed. No separate case-study routes. |
| DNS | Move to **Cloudflare** (free). Apex `rijwol.com.np` is the primary address; `www` redirects to it |

## 3. Visual system

### Color tokens (CSS custom properties in `globals.css`, exposed via `@theme inline`)

| Token | Light | Dark | Use |
|---|---|---|---|
| `--background` | `#EEF1F4` (Fog) | `#0F1A26` (Night) | Page background |
| `--surface` | `#FFFFFF` | `#172433` | Cards, phone screen, case-study block |
| `--foreground` | `#14202B` (Ink) | `#E6ECF2` | Headings, body text |
| `--muted` | `#4A5866` (Slate) | `#A9B6C4` | Secondary text |
| `--primary` | `#2F5BFF` (Signal) | `#7C9BFF` | Buttons, links, version numbers. The only accent. |
| `--on-primary` | `#FFFFFF` | `#0F1A26` | Text on primary buttons |
| `--line` | `#D5DBE3` | `#263445` | Borders, dividers, changelog rule |
| `--live` | `#16B67A` | `#34D399` | Availability dot and completed stepper steps only. Never used for text. |

Contrast: Signal on Fog is 4.6:1, and white on Signal is 5.2:1 (both pass WCAG AA).

### Type
- **Display:** Bricolage Grotesque, weight 800, letter-spacing −0.02 to −0.025em. Used for headlines, section titles, and version numbers (`font-variant-numeric: tabular-nums`).
- **Body:** Schibsted Grotesk, weights 400/500/600.
- Both are loaded through `next/font/google` with `display: swap` and replace Geist / Geist Mono.
- Scale (rem): 0.875 / 1 / 1.125 / 1.5 / 2.25 / 3.5 (hero at `lg`). Body line-height is 1.55 and measure is at most 70ch.
- Not used: all-caps labels, monospace labels, single-word accent colors in headlines.

### Layout
- Left-aligned, `max-w-[1120px]` container, 16px side gutter on mobile and 24–32px at `md`/`lg` and above.
- Hero: two columns at `lg` (text roughly 60%, phone roughly 40%). Below `lg`, the phone stacks under the text at about 90% scale.
- Radius hierarchy: phone frame 36px, cards and blocks 16px, chips 8px, buttons fully rounded.
- The only shadow is the one under the phone frame. No glass blur, gradient blobs, grid patterns, or gradient text.

### Motion (Framer Motion, spring physics)
- **One page-load moment:** the headline settles in, then the phone slides up with a spring (stiffness about 120, damping about 20).
- **Everything else responds to the user:** phone interactions, accordion open/close (`layout` animation), and a segmented-control indicator (`layoutId`).
- **One scroll-triggered effect:** the changelog's vertical rule draws once (`whileInView`, `once: true`). Other sections have no fade-in on scroll.
- Hover on buttons and links: scale 1.02.
- `prefers-reduced-motion: reduce` turns off all transitions and the load sequence; content renders in its final state, and the phone stays fully usable. Use the existing `src/hooks/useReducedMotion.ts`.

## 4. Page structure and components

Single page, in this order: **Header → Hero → Selected work → Experience → Toolkit → Contact → Footer.**

### Header — `src/components/common/Header.tsx` (rewrite)
- Name (links to top), nav links Work / Experience / Contact, a CV download (`/Rijwol_Shakya_CV.pdf`), and `ThemeToggle`.
- Sticky. It is transparent at the top and gets a solid `--background` with a bottom `--line` border after scrolling.
- Below `md`: a menu button opens a bottom sheet (Framer Motion, spring) with 48px or taller links, a focus trap, Esc to close, and `aria-expanded` / `aria-controls`.
- Keep the active-section highlight from `src/hooks/useActiveSection.ts`.

### Hero — `src/features/hero/`
- **`HeroSection.tsx`** (rewrite), the text column:
  - Status line: green live dot followed by "Available for remote Flutter roles · Kathmandu, UTC+5:45"
  - `h1`: "I build the mobile apps people pay their bills with."
  - Intro (two sentences): Flutter developer in Kathmandu, 3+ years shipping production Android and iOS apps (since Feb 2023 — the current site's "2+ years" is outdated and is updated everywhere, incl. `SITE_METADATA.description`), including a self-service app used by subscribers across Nepal.
  - Buttons: "See my work" (links to `#work`) and "Download CV".
  - GitHub and LinkedIn icon links (reuse `src/components/ui/SocialIcons.tsx`).
- **`PhoneDemo/`** (new), all plain JSX and CSS with no raster images:
  - `PhoneDemo.tsx`: the phone frame plus a segmented control (`role="tablist"`) with tabs **Ticket**, **Pay**, and **Alerts**. Each tab has `aria-selected` and `aria-controls`, and arrow keys move between tabs.
  - `TicketScreen.tsx`: a technician-visit stepper with the steps Booked → Assigned → On the way → Completed. A "Refresh status" button moves forward one step and is disabled once the visit is Completed.
  - `PayScreen.tsx`: a bill amount, a gateway list (eSewa / Khalti / FonePay) as a radio group, and a Pay button that stays disabled until a gateway is selected. Flow: idle → processing (about 900ms) → received (a receipt with the gateway name and a "Pay again" button to reset).
  - `AlertsScreen.tsx`: an iOS-style lock-screen notification with a CSS-drawn image thumbnail. Tapping it expands to show the full image area (rich push / Notification Service Extension).
  - `phoneDemo.logic.ts`: pure `ticketReducer` and `paymentReducer`, plus exported state and action types.
  - A visually hidden `aria-live="polite"` region announces state changes, for example "Technician on the way" and "Payment received via Khalti".
  - Caption under the phone: "Flows I built for a production billing app. Tap to try."
- **Delete** `TechMarquee.tsx`.

### Selected work — `src/features/projects/` (section `id="work"`)
- `ProjectsSection.tsx` (rewrite) renders the following:
  - **`CaseStudy.tsx`** (new) for myDishHome: a large `--surface` block with three parts.
    - **Description:** what the app is, plus what Rijwol built (4 payment gateways with intent flows, technician ticket tracking, iOS rich push via Notification Service Extension with FCM token refresh, Crashlytics).
    - **Personal numbers** (see §5).
    - **Architecture note:** Clean Architecture with GetX.
  - **Two medium `ProjectCard`s:** Bizlevate and Finance Tracker.
  - **Compact row:** SalesMania, HG HUB, and Rent-N-Read.
  - Cards expand inline (a `<button aria-expanded>` controls a `layout`-animated region) to show highlights, the tech stack, and the GitHub link if `githubUrl` exists.
- Data comes from `projects.data.ts`. Ordering and size are controlled by a new `tier: "case-study" | "featured" | "compact"` field on `Project`, which replaces `featured: boolean`.
- **Delete** `ProjectModal.tsx` and `hooks/useProjectFilter.ts`.

### Experience — `src/features/experience/` (section `id="experience"`)
- `ExperienceSection.tsx` (rewrite) is a changelog. Each entry shows:
  - a version (`v3.0` / `v2.0` / `v1.0`) in display type, colored `--primary`
  - the date range
  - role and company
  - 3–4 bullets
  - tech chips
- A vertical `--line` rule connects the entries and draws once on view.
- Add a `version: string` field to `ExperienceEntry`. Trim responsibilities to at most 4 per role, keeping the most specific ones.
- **Education** follows as a short list: BSc (Hons) Computing, Softwarica College, 2020–2023; MSc Data Science & Computational Intelligence, Softwarica College, Sep 2025 to present. The data moves out of `AboutSection.tsx` into `experience/data/education.data.ts`.

### Toolkit — `src/features/skills/`
- `SkillsSection.tsx` (rewrite) has three rows: **Mobile**, **Backend & data**, and **Tools**. Each row is a label followed by a wrapping list of text chips, with no icons and no proficiency indicators.
- Regroup `skills.data.ts` from 8 groups into these 3 and drop duplicates.

### Contact — `src/features/contact/` (section `id="contact"`)
- `ContactSection.tsx` (rewrite) has two columns at `md` and above, stacked on mobile:
  - **"Hiring?"**: email (mailto), LinkedIn, phone, and CV download.
  - **"Need an app built?"**: the existing form (`useContactForm.ts`, zod and react-hook-form, Formspree via `src/lib/formspree.ts`), with a new optional field "What do you want built?" (`project`, max 500 characters) added to the zod schema in `types.ts`.
- States: sending (button disabled, label "Sending…"), success ("Message sent. I'll reply within two days."), and error ("Couldn't send your message. Email me at shakyarijwol19@gmail.com instead.", with the address linked).

### Footer — `src/components/common/Footer.tsx` (restyle)
- Name, © year, social links, and "Built with Next.js · Hosted on GitHub Pages".

### Removals
- Components: `TechMarquee`, `ScrollProgress`, `AboutSection` (whole `features/about/`), `ProjectModal`, `GlassCard`, `Badge` (replaced by a simple `Chip` in `components/ui/`).
- CSS: `.glass`, `.gradient-text`, and the old indigo/violet tokens.
- Unused public assets: `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`, and `public/icons/*` (only the marquee used them; confirm with grep before deleting).
- Hook: `useScrollDirection.ts`, if it is no longer used by the new header.

## 5. Content corrections — myDishHome commit figures

Source: `/Users/dmn/Documents/Projects/dmn-customer-mobile-app`, all refs, author email `rijwol.shakya@dishhome.com.np` (covers both the `rijwol.shakya` and `rijwol shakya` author names):

```sh
git rev-list --all --no-merges --author='rijwol.shakya@dishhome.com.np' --count   # 365
git log --all --no-merges --author='rijwol.shakya@dishhome.com.np' --format=%s | grep -ciE '^feat(\(.*\))?!?:'     # 189
#   … same for fix (89) and refactor (29)
```

| Metric | Old (repo-wide) | New (personal) |
|---|---|---|
| Commits | 1,065+ | **365** |
| `feat:` | 128 | **189** |
| `fix:` | 65 | **89** |
| `refactor:` | 23 | **29** |
| Feature branches | 29 | **removed** (this was a team figure) |
| Active period | — | **Jan 2026 – Sep 2026** |
| Payment gateways | 4 | 4 (unchanged) |

Required edits:
- `projects.data.ts`: replace the myDishHome `metrics` with the figures above, and put a comment with the commands above the array.
- `experience.data.ts`:
  - "…with 1,000+ commits and 29 active feature branches serving…" becomes "…where I've authored 365 commits — 189 features and 89 fixes — serving…"
  - "…across 65+ fix commits" becomes "…across 89 fix commits".
- The `1,065+` hero badge and the About stats (`1K+`, the breakdown bars, "Out of 1,065 total commits across 29 branches") are removed along with their components.

## 6. Domain, SEO, and deploy

### Code
- `public/CNAME` containing exactly `rijwol.com.np`.
- `src/lib/constants.ts`: `SITE_METADATA.url = "https://rijwol.com.np"`.
- `src/app/sitemap.ts` and `src/app/robots.ts` with `export const dynamic = "force-static"`. The sitemap lists `/`, and robots allows all and points to the sitemap.
- `layout.tsx`: add `alternates: { canonical: "/" }`, swap the fonts, and update the description and title to match the new copy.
- `scripts/generate-og.mjs`: restyle to the new palette and fonts (Fog background, Ink text, Signal accent, a phone silhouette), then regenerate `public/og-image.png`.
- Keep `public/google4a193daf4333377c.html`.
- `.github/workflows/deploy.yml`: no change (it already publishes `out/`, which will contain `CNAME`).

### User checklist (manual, in order)
1. **Cloudflare:** Add site `rijwol.com.np` on the Free plan.
2. **Cloudflare DNS** (all records set to *DNS only*, grey cloud):
   - `A @ 185.199.108.153`
   - `A @ 185.199.109.153`
   - `A @ 185.199.110.153`
   - `A @ 185.199.111.153`
   - `CNAME www rijwolshakya09.github.io`
3. **register.com.np:** replace nameservers `ns1/ns2/ns3.epizy.com` with the two Cloudflare nameservers. `.np` changes are manually approved and usually take 1–2 days.
4. **Verify:** `dig +short rijwol.com.np` returns the four GitHub IPs.
5. **GitHub:** repo Settings → Pages → Custom domain → `rijwol.com.np` → Save → wait for the DNS check → enable **Enforce HTTPS**.
6. **Search Console:** add a Domain property `rijwol.com.np`, verify it with a TXT record in Cloudflare, and submit `https://rijwol.com.np/sitemap.xml`.

Current state, observed 2026-10-01: the `epizy.com` nameservers time out, public resolvers return `SERVFAIL`, and the domain does not resolve at all. Step 3 is required.

## 7. Error handling
- **Contact form:** zod field errors are shown inline with `aria-describedby`. A network or Formspree failure shows the email fallback. Double submits are prevented while sending.
- **Phone demo:** state is local to each screen, and the reducers ignore invalid transitions (for example, refreshing a Completed ticket, or paying without a gateway). Without JavaScript, the server-rendered HTML shows the Ticket screen in its initial state.
- **Projects without `githubUrl`:** no link is rendered.

## 8. Testing
Add dev dependencies `vitest`, `@vitejs/plugin-react`, `jsdom`, `@testing-library/react`, `@testing-library/user-event`, and `@testing-library/jest-dom`, plus an `npm test` script.

- `phoneDemo.logic.test.ts`:
  - The ticket stepper advances one step per refresh and stops at Completed.
  - Pay is rejected without a gateway.
  - Payment goes idle → processing → received, and reset returns it to idle.
- `PhoneDemo.test.tsx`:
  - Clicking a tab swaps the screen and updates `aria-selected`.
  - Arrow keys move between tabs.
  - The live region announces "Payment received via Khalti".
- `content.test.ts`:
  - The myDishHome metrics include 365 / 189 / 89 / 29.
  - No data file contains `1,065`, `1,000+`, or `65+ fix`.
- `ContactSection.test.tsx`:
  - An empty submit shows the required-field errors.
  - A mocked failed `fetch` shows the email fallback.

## 9. Verification before completion
- `npm run lint`, `npx tsc --noEmit`, `npm test`, and `npm run build` all pass.
- `out/CNAME`, `out/sitemap.xml`, and `out/robots.txt` exist and reference `rijwol.com.np`.
- Manual browser pass on the built `out/` at 375 / 768 / 1280px, covering:
  - light and dark mode
  - `prefers-reduced-motion`
  - keyboard-only operation (header sheet, phone tabs and controls, project accordions, form)
- Lighthouse on the built site: Accessibility 100, SEO 100, Performance 95 or higher.
- No merge to `master` (which triggers deploy) without the user's approval.

## 10. Housekeeping
- Add `.superpowers/` to `.gitignore`.
- Update `AGENTS.md` to match the new direction:
  - Replace the Glassmorphism rule with the token system in §3.
  - Change "scroll-triggered fade-ins" to "one load moment, user-driven motion, at most one scroll reveal per page".
  - Keep the static-export, feature-folder, React Compiler, reduced-motion, and 48px touch-target rules.
- Append a session entry to `PORTFOLIO_LOG.md`.

## Out of scope
- Separate case-study routes (`/work/[slug]`).
- A blog, CMS, analytics, or i18n.
- Real app screenshots or any DishHome branding.
