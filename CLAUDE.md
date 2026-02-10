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
│   ├── portfolio/    # /portfolio route
│   ├── collaboration/ # /collaboration route (service offerings)
│   └── how-i-built-this/ # /how-i-built-this route (ebook case study)
├── components/       # React components by section
│   ├── layout/       # FloatingNav, Footer
│   ├── hero/         # HeroSection, viz toggle, 3 visualizations
│   ├── experience/   # ExperienceSection, ExperienceCard
│   ├── filters/      # FilterPills
│   ├── contact/      # ContactSection (Formspree)
│   ├── portfolio/    # PortfolioGrid, ProjectCard
│   ├── collaboration/ # OfferingCard, OfferingsGrid, PackageCards, WorkingStyleSection
│   └── ebook/        # EbookContent (case study article)
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
├── Offering.md       # Service offerings content source
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
- Single scrollable page (Hero → Experience → Contact/Footer) + `/portfolio` (hidden), `/collaboration`, and `/how-i-built-this` routes
- Floating centered nav bar always visible at top (links: Home, Experience, Collaboration, Contact, PDF). Portfolio link removed (page preserved for v2). Ebook page accessible via subtle hero button only (not in nav).
- 3 visualization tabs: Career Path (SVG + aligned HTML timeline), Skills & Tech Stack (interactive tag grid), Industries (stacked bar + cards)
- Pill/chip filter toggles above experience section
- RoleEvolution uses year-proportional X positioning (2014-2025) with HTML timeline below chart aligned via shared `yearToX()` percentages
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
- **RoleEvolution label placement** — Per-node `labelPlacements` array with custom `dx`, `titleDy`, `subtitleDy`, `anchor` per node. Bunched nodes (1-4) use diagonal placement (above-left or below-right) to avoid circles and curves. Nodes 5-6 use standard above. Node 1 must be below-right (not above-left) because it's too close to SVG left edge for `textAnchor="end"`.
- **RoleEvolution year positioning** — Nodes positioned proportionally by year (2014-2025). Early career nodes (2014-2018) are bunched in left ~36% of chart. Timeline rendered as HTML below SVG, sharing same `yearToX()` percentages for alignment.
- **`prefers-reduced-motion`** is handled globally in CSS (forces 0.01ms durations) — but Framer Motion `animate` props still fire; they just complete instantly. Don't rely on animation callbacks for logic.
- **`.gitignore` has `*.png`** — OG image exception: `!src/app/opengraph-image.png`. Logos exception: `!public/logos/*.png`.
- **Company logos use `<img>` not `next/image`** — `next/image` produces dimension mismatch warnings when logos have varying aspect ratios. Plain `<img>` with `eslint-disable` block in `ExperienceCard.tsx`. Logos are small static PNGs (3–153KB) that don't benefit from the optimization pipeline.
- **FloatingNav anchor links must use `/#section` format** — plain `#section` hrefs don't navigate between pages in Next.js. Must prefix with `/` (e.g., `/#top`, `/#experience`) for cross-page navigation to work.
- **Anchor scroll offset** — Sections with `id` anchors need `scroll-mt-[140px]` to clear the fixed FloatingNav (~60px) + sticky filter bar (~80px) when navigating via nav links. Applied to `#contact` and `#experience`.

## Accessibility Patterns
- **Skip-to-content**: `layout.tsx` — sr-only link targeting `#main-content`, visible on focus
- **Viz toggle**: `VisualizationToggle` uses `role="tablist"` / `role="tab"` + `aria-selected` + `aria-controls="viz-panel"`; `HeroSection` viz area has `role="tabpanel" id="viz-panel"`
- **Filter pills**: `role="group"` + `aria-pressed` on each toggle button
- **FloatingNav**: `aria-current="page"` via `usePathname`. Route detection: `/#` prefixed links check `pathname === '/'` for Home; `/path` links check `pathname === link.href`. No mobile hamburger — same inline pill nav at all sizes.
- **Collaboration page**: Accordion `aria-expanded` on deliverables toggle buttons
- **SVG visualizations**: All have `role="img"` + descriptive `aria-label`; decorative elements use `aria-hidden="true"`
- **SkillsTechStack**: Interactive category filter buttons; clicking a category isolates it, clicking again (or "All") resets
- **Contact form**: `aria-required` on fields, `role="alert"` on error, `role="status"` on success
- **Filtered results**: `aria-live="polite"` on ExperienceSection results container

## Responsive Breakpoints
- Base (320px+) → `sm` (640px) → `md` (768px) → `lg` (1024px)
- Mobile-first: all components use base styles stepping up
- VisualizationToggle: icon-only below `sm`, labels shown at `sm`+
- RoleEvolution SVG: scales to fit viewport via `viewBox` (no min-width, no horizontal scroll)
- HeroSection padding: `px-4` base, `sm:px-6` on wider screens; viz card `p-2` base, `sm:p-6`, `md:p-8`
- Section padding: `px-4` base, `md:px-6` on wider screens

## Scope Notes
- Cut from v1: Shareable filter URLs (query params), technology tag click-to-filter
- Portfolio page uses placeholder project cards (real content TBD)

## Performance Profile
- Build: 0 warnings, all pages statically generated (SSG)
- `/` = 158 kB first load JS (gzipped), `/portfolio` = 144 kB, `/collaboration` = 148 kB, `/how-i-built-this` = 158 kB
- CSS bundle = 25 kB raw (Tailwind purge working correctly)
- `next.config.ts`: `reactStrictMode: true`, `poweredByHeader: false`, AVIF+WebP image formats
- Deferred optimizations: dynamic imports for vizs, lazy loading below-fold, font weight subsetting

## Repository
- **GitHub:** https://github.com/Ninety2UA/web-app-resume
- **Commits:** `fb6a036` (Phases 0–7), `34e5062` (Phase 8 + launch prep), `53bdd97` (post-launch UI fixes), `47ba309` (Skills & Tech Stack merge), `18a2ea5` (Collaboration page), `b5e26ea` (UI rework: chart, timeline, nav), `2d65169` (logos, full resume content, nav fix, RIT logo, README), `6863c84` (comprehensive README + CLAUDE.md sync), `e8f9cae` (doc sync), `78bb8f6` (deployment complete), `ec931fc` (RIT logo update), `1f47fd8` (mobile layout fixes), `648994d` (Google intern date fix), `d083605` (resume PDF V3 update), `fb4ece0` (mobile nav + chart spacing), `9ce59d3` (contact anchor scroll fix), `e2d7434` (experience anchor scroll fix)
- **Branch:** `main`

## Project Documentation
- Read `docs/STATUS.md` for current progress and state
- Read `docs/tasks.md` for the task backlog and priorities
- Read `docs/plan.md` for the overall project plan
- Read `docs/spec.md` for project specifications and requirements

Always read these files before starting any work.

## Session Continuity
- **Latest work** — Added `/how-i-built-this` ebook page (T35) + subtle hero button. Uncommitted, pending review.
- **Deployed** — live at https://dbenger.com (Vercel, manual deploy via `npx vercel --prod` when Git auto-deploy doesn't trigger)
- **Ebook page** — `/how-i-built-this` route: full case study article from `docs/ebook-building-dbenger-com.md`. Server page wrapping `EbookContent` client component. Accessible via subtle pill button above "Dominik Benger" in HeroSection. Not in FloatingNav.
- **FloatingNav** — always visible inline pill nav at all screen sizes (no hamburger menu). Links use `/#section` format for cross-page navigation. Links: Home, Experience, Collaboration, Contact, PDF.
- **Portfolio page hidden** — `/portfolio` route still works but no links point to it. Files preserved for future v2.
