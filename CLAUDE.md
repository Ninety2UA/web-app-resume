# Interactive Resume & Portfolio - Dominik Benger

## Project Overview
Interactive, animated web app replacing static PDF resumes with dynamic data visualizations, filterable career timelines, and portfolio showcase. Deployed at dbenger.com via Vercel.

## Tech Stack
- **Framework:** Next.js 15 (App Router, TypeScript)
- **Styling:** Tailwind CSS 3.4
- **Animations:** Framer Motion 11
- **Visualizations:** Custom SVG + Framer Motion (no charting library)
- **Contact Form:** Formspree
- **Analytics:** Vercel Analytics
- **Fonts:** Plus Jakarta Sans (next/font/google)

## Project Structure
```
src/
├── app/              # Next.js App Router pages
│   ├── layout.tsx    # Root layout (fonts, metadata)
│   ├── page.tsx      # Home: Hero + Experience + Contact
│   ├── globals.css   # Global styles + Tailwind
│   └── portfolio/    # /portfolio route
├── components/       # React components by section
│   ├── layout/       # FloatingNav, Footer
│   ├── hero/         # HeroSection, viz toggle, 4 visualizations
│   ├── experience/   # ExperienceSection, ExperienceCard
│   ├── filters/      # FilterPills
│   ├── contact/      # ContactSection (Formspree)
│   └── portfolio/    # PortfolioGrid, ProjectCard
├── data/             # Static TypeScript data files
├── hooks/            # useScrollAnimation, etc.
└── lib/              # Utility functions
public/
├── resume/           # PDF resume for download
└── logos/            # Company logo assets
docs/                 # PRD, Spec, Plan
```

## Commands
- `npm run dev` — Start dev server (Turbopack)
- `npm run build` — Production build
- `npm run lint` — ESLint

## Design System
- **Aesthetic:** Warm & approachable
- **Font:** Plus Jakarta Sans (all weights)
- **Background:** #FDFCFA (warm off-white)
- **Surface:** #F5F0EB (warm cream)
- **Text:** #1A1814 (warm near-black), #6B6560 (secondary)
- **Accents:** Terra cotta #E07A5F, Sage teal #4A9B8E, Amber #E6B35A, Lavender #7C6FB0
- **Animations:** 400-500ms, staggered entrances, respects prefers-reduced-motion
- **Spacing:** 8px grid system

## Architecture Decisions
- Single scrollable page (Hero → Experience → Contact/Footer) + `/portfolio` route
- Floating centered nav bar appears after scrolling past hero
- 4 interactive infographic-style SVG visualizations (not a chart library)
- Pill/chip filter toggles above experience section
- Clickable era markers (not draggable timeline slider)
- Static PDF download (pre-built, not generated)
- All career data in TypeScript files under `src/data/`
- Client components marked with 'use client' for interactivity
- Server components for pages where possible

## Content
- **Owner:** Dominik Benger
- **Domain:** dbenger.com
- **LinkedIn:** https://www.linkedin.com/in/dombenger/
- **Email:** domi@dbenger.com
- **Resume data:** `docs/Dominik_Benger_Resume_4Page.md`
- **PDF download:** `docs/resume-file/Dominik Benger - Resume [V3].pdf`

## Z-Index Stacking
| Element | Z-Index | File |
|---------|---------|------|
| Sticky filter bar | z-30 | `src/app/page.tsx` |
| FloatingNav | z-50 | `src/components/layout/FloatingNav.tsx` |
| Skip-to-content link | z-[100] | `src/app/layout.tsx` |

Any new sticky/fixed elements must respect this stacking order.

## Pitfalls
- **Formspree ID** — `ContactSection.tsx:17` uses `mojnqgnq`. Endpoint: `https://formspree.io/f/mojnqgnq`.
- **PDF path must match** — download button points to `/resume/Dominik_Benger_Resume.pdf`; source file in `docs/resume-file/` has spaces but was copied with underscores to `public/resume/`.
- **SVG text in RoleEvolution** uses Tailwind `fill-warm-*` classes inside `<text>` elements — requires Tailwind theme to be loaded; won't render in raw SVG viewers.
- **`prefers-reduced-motion`** is handled globally in CSS (forces 0.01ms durations) — but Framer Motion `animate` props still fire; they just complete instantly. Don't rely on animation callbacks for logic.
- **No git remote yet** — repo is local only. Need to `git remote add origin` before push.

## Accessibility Patterns
- **Skip-to-content**: `layout.tsx` — sr-only link targeting `#main-content`, visible on focus
- **Viz toggle**: `VisualizationToggle` uses `role="tablist"` / `role="tab"` + `aria-selected` + `aria-controls="viz-panel"`; `HeroSection` viz area has `role="tabpanel" id="viz-panel"`
- **Filter pills**: `role="group"` + `aria-pressed` on each toggle button
- **FloatingNav**: `aria-expanded` on mobile toggle, `role="menu"` / `role="menuitem"`, Escape key closes menu, `aria-current="page"` via `usePathname`
- **SVG visualizations**: All have `role="img"` + descriptive `aria-label`; decorative elements use `aria-hidden="true"`
- **Contact form**: `aria-required` on fields, `role="alert"` on error, `role="status"` on success
- **Filtered results**: `aria-live="polite"` on ExperienceSection results container

## Responsive Breakpoints
- Base (320px+) → `sm` (640px) → `md` (768px) → `lg` (1024px)
- Mobile-first: all components use base styles stepping up
- VisualizationToggle: icon-only below `sm`, labels shown at `sm`+
- RoleEvolution SVG: horizontal scroll with `min-w-[500px]` + `scrollbar-hide`
- Section padding: `px-4` base, `md:px-6` on wider screens

## Scope Notes
- Cut from v1: Shareable filter URLs (query params), technology tag click-to-filter
- Portfolio page uses placeholder project cards (real content TBD)
- Company logos: use where available, styled text as fallback

## Performance Profile
- Build: 0 warnings, all pages statically generated (SSG)
- `/` = 156 kB first load JS (gzipped), `/portfolio` = 146 kB
- CSS bundle = 25 kB raw (Tailwind purge working correctly)
- `next.config.ts`: `reactStrictMode: true`, `poweredByHeader: false`, AVIF+WebP image formats
- Deferred optimizations: dynamic imports for vizs, lazy loading below-fold, font weight subsetting

## Session Continuity
- Read `docs/STATUS.md` for high-level project status
- Read `docs/tasks.md` for detailed task tracker (T01–T32 + fixes)
- Current phase: **Phase 8 complete** (T29–T31 done), T32 Final QA pending
- Phases 0–7 complete in commit `fb6a036`
- Phase 8 changes are uncommitted (T29 responsive + T30 accessibility + T31 performance)
