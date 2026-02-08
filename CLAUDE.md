# Interactive Resume & Portfolio - Dominik Benger

## Project Overview
Interactive, animated web app replacing static PDF resumes with dynamic data visualizations, filterable career timelines, and portfolio showcase. Deployed at dbenger.com via Vercel.

## Startup Ritual
**At the start of every new session, before taking any action, you MUST:**

1. **Read project status files** (in parallel):
   - `docs/STATUS.md` — current project state
   - `docs/tasks.md` — task backlog and priorities

2. **Check git state** (in parallel):
   - `git status` — uncommitted changes, staged files, current branch
   - `git log --oneline -10` — recent commit history
   - `git diff --stat` — summary of working tree changes

3. **Summarize current status to the user**, including:
   - Current branch and any uncommitted work
   - What was done in the last few commits
   - Any open tasks or next steps from `docs/tasks.md`
   - Anything that looks like it needs attention (e.g., uncommitted changes, failing builds)

4. **Wait for the user's instructions** before making any changes.

Do NOT skip this ritual. Do NOT start modifying files until you have read the above and presented the summary. This ensures continuity across sessions and prevents accidentally overwriting in-progress work.

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
│   ├── hero/         # HeroSection, viz toggle, 3 visualizations
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
docs/
├── PRD.md            # Product Requirements Document
├── Spec.md           # Technical specification
├── Plan.md           # Implementation plan (phases & tasks)
├── STATUS.md         # High-level project status
├── tasks.md          # Detailed task tracker (T01–T32 + launch)
├── Dominik_Benger_Resume_4Page.md  # Source resume content
└── resume-file/      # Original PDF resume source
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
- **Accents (core 4):** Terra cotta #E07A5F, Sage teal #4A9B8E, Amber #E6B35A, Lavender #7C6FB0
- **Accents (extended):** Sky #5B8DB8, Rose #D4697A, Emerald #4A9B6E (used in SkillsTechStack only)
- **Animations:** 400-500ms, staggered entrances, respects prefers-reduced-motion
- **Spacing:** 8px grid system

## Architecture Decisions
- Single scrollable page (Hero → Experience → Contact/Footer) + `/portfolio` route
- Floating centered nav bar appears after scrolling past hero
- 3 visualization tabs: Career Path (SVG), Skills & Tech Stack (interactive tag grid), Industries (stacked bar + cards)
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
| Element | Z-Index | Position | File |
|---------|---------|----------|------|
| Sticky filter bar | z-30 | `sticky top-[68px]` | `src/app/page.tsx` |
| FloatingNav | z-50 | `fixed top-4` | `src/components/layout/FloatingNav.tsx` |
| Skip-to-content link | z-[100] | — | `src/app/layout.tsx` |

The filter bar uses `top-[68px]` to sit below the FloatingNav (which is ~44px tall at `top-4`). Any new sticky/fixed elements must respect this stacking order.

## Pitfalls
- **Formspree ID** — `ContactSection.tsx:17` uses `mojnqgnq`. Endpoint: `https://formspree.io/f/mojnqgnq`.
- **PDF path must match** — download button points to `/resume/Dominik_Benger_Resume.pdf`; source file in `docs/resume-file/` has spaces but was copied with underscores to `public/resume/`.
- **SVG text in RoleEvolution** uses Tailwind `fill-warm-*` classes inside `<text>` elements — requires Tailwind theme to be loaded; won't render in raw SVG viewers.
- **RoleEvolution text anchoring** — First node uses `textAnchor="start"`, last uses `"end"`, middle nodes use `"middle"`. This prevents edge label clipping with minimal SVG padding (20px).
- **`prefers-reduced-motion`** is handled globally in CSS (forces 0.01ms durations) — but Framer Motion `animate` props still fire; they just complete instantly. Don't rely on animation callbacks for logic.
- **`.gitignore` has `*.png`** — OG image required an exception: `!src/app/opengraph-image.png`.

## Accessibility Patterns
- **Skip-to-content**: `layout.tsx` — sr-only link targeting `#main-content`, visible on focus
- **Viz toggle**: `VisualizationToggle` uses `role="tablist"` / `role="tab"` + `aria-selected` + `aria-controls="viz-panel"`; `HeroSection` viz area has `role="tabpanel" id="viz-panel"`
- **Filter pills**: `role="group"` + `aria-pressed` on each toggle button
- **FloatingNav**: `aria-expanded` on mobile toggle, `role="menu"` / `role="menuitem"`, Escape key closes menu, `aria-current="page"` via `usePathname`
- **SVG visualizations**: All have `role="img"` + descriptive `aria-label`; decorative elements use `aria-hidden="true"`
- **SkillsTechStack**: Interactive category filter buttons; clicking a category isolates it, clicking again (or "All") resets
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

## Repository
- **GitHub:** https://github.com/Ninety2UA/web-app-resume
- **Commits:** `fb6a036` (Phases 0–7), `34e5062` (Phase 8 + launch prep)
- **Branch:** `main`

## Project Documentation
- Read `docs/STATUS.md` for current progress and state
- Read `docs/tasks.md` for the task backlog and priorities
- Read `docs/plan.md` for the overall project plan
- Read `docs/spec.md` for project specifications and requirements

Always read these files before starting any work.

## Session Continuity
- **All development complete** — Phases 0–8 done, T01–T32 all passed
- **Post-launch UI fixes committed** at `53bdd97`: nav/filter overlap, chart label typo, chart padding
- **Skills & Tech Stack merge** (uncommitted): merged "Skills" + "Tech Stack" tabs into one "Skills & Tech Stack" tab with 7 categories (77 skills), interactive category filtering, 3 new accent colors (sky/rose/emerald). Deleted `SkillsProgression.tsx` and `TechStack.tsx`.
- Remaining: Vercel deployment + custom domain (dbenger.com), optional company logos
