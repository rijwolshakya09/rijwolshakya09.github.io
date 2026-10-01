<!-- BEGIN:nextjs-agent-rules -->

# Next.js Advanced Architecture Rules (Static Export Focus)

## 🚨 CRITICAL RULE: NO SERVER RUNTIME

This project compiles via `output: 'export'`.

- DO NOT use Node.js server runtimes, `getServerSideProps`, `headers()`, `cookies()`, or dynamic server APIs.
- All dynamic routes MUST implement `generateStaticParams()`.
- Image optimization must bypass servers (`images.unoptimized = true` in next.config).

## 🏗️ ENTERPRISE ARCHITECTURE: FEATURE-DRIVEN / SCALABLE DESIGN

Do not clutter the root components folder. Organize code using a Clean Architectural layout inside `src/`:

```text
src/
├── app/                  # Routing Layer (App Router)
│   ├── layout.tsx        # Global provider orchestration & SEO metadata
│   └── page.tsx          # Homepage layout composition
├── components/           # Universal UI/Design System
│   ├── ui/               # Atom-level components (Buttons, Inputs - Shadcn style)
│   └── common/           # Shared structures (Header, Footer, GlassmorphismCard)
├── features/             # Business Logic Layer (Feature-Driven Design)
│   ├── projects/         # Everything related to the Project Showcase
│   │   ├── components/   # Feature-specific items (ProjectGrid, CommitTimeline)
│   │   ├── hooks/        # Local state/fetching hooks
│   │   └── types.ts      # Strictly typed definitions
│   ├── experience/       # Interactive Work Timeline module
│   └── contact/          # Client-side form handlers & validation
├── hooks/                # Global custom React hooks (useTheme, useScrollDirection)
└── lib/                  # Utilities, formatters, and third-party API wrappers
```

## 💻 CODE QUALITY & MODERN CONVENTIONS

1. **React Compiler Mode:** Do NOT manually write `useMemo` or `useCallback`. Let the compiler handle it automatically.
2. **TypeScript:** Strict typing always. Zero usage of `any`. Define deep structures for Git commits and project objects.
3. **Tailwind & Interactivity:** Use `clsx` or `tailwind-merge` for clean conditional styles. For dynamic UI, explicitly use `'use client';` strictly where interaction happens.
4. **Performance & Access:** Target 100/100 Core Web Vitals. Use proper semantic HTML, accessible `aria-*` tags, and responsive layouts (`sm:`, `md:`, `lg:` breakpoints).
5. **Tests:** `npm test` (Vitest + Testing Library). Keep component logic in pure functions where possible (see `PhoneDemo/phoneDemo.logic.ts`).

## 🎨 MODERN UI & ADVANCED THEMING CONFIGURATION

### 1. Unified Tailwind Theme Engine

- **No Heavy Runtimes:** Do not use runtime CSS-in-JS frameworks (like legacy MUI or Ant Design) t o prevent layout shifts on static HTML pages.
- **Tailwind Variables:** Use pure Tailwind CSS utility classes paired with shadcn/ui or HeroUI primitives.
- **Flicker-Free Dark/Light Mode:** Use `next-themes` with class-based routing to ensure dark mode maps instantaneously without a white flash on page load.
- **Design tokens:** Colors come only from the tokens in `src/app/globals.css` (`background, surface, foreground, muted, primary, on-primary, line, live`), with light and dark values. No glassmorphism, gradient blobs, or gradient text. Display type is Bricolage Grotesque (`font-display`); body type is Schibsted Grotesk.

### 2. Framer Motion Animation Rules

Every animation must feel organic, purposeful, and optimized.

- **Physics-Based Over Tweens:** Use Framer Motion `spring` physics (`stiffness`, `damping`) rather than linear delays for fluid, modern movements.
- **Micro-Interactions:** Apply subtle hover states on clickable targets (e.g., scale up by exactly `1.02`, never over-exaggerated).
- **Motion budget:** One load moment (hero), user-driven motion everywhere else, and at most one scroll reveal per page (the Experience rule). No per-section fade-ins. `MotionConfig reducedMotion="user"` is set globally in `Providers.tsx`.
- **Layout Animations:** Protect visual flow. Use `layoutId` for smooth tab switching or layout morphs.
- **Accessibility (Crucial):** Respect the system settings of users. Wrap all major animations or transitions within a check for `window.matchMedia('(prefers-reduced-motion: reduce)')` to disable them if requested.

### 3. Mobile Touch-Target Optimization

- **Responsive Navigation:** Implement an animated mobile action sheet/drawer that smoothly transitions from the bottom or side on small viewports.
- **Touch Targets:** Ensure interactive elements  (buttons, links, tags) adhere to a minimum size of 48x48 pixels on mobile to facilitate easy tapping.
- **Horizontal Swiping:** Project screens and code commit snippets must cleanly wrap or support native touch swiping on mobile browsers without breaking layout boundaries.

<!-- END:nextjs-agent-rules -->
