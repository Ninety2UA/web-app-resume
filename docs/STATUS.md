# Project Status

## What we're building
- Interactive resume web app for Dominik Benger (dbenger.com) — replaces a static PDF with animated visualizations, a filterable career timeline, and a contact form
- Single scrollable page (Hero → Experience → Contact) plus `/portfolio`, `/collaboration`, and `/how-i-built-this` routes
- Deployed via Vercel; all career data lives in TypeScript files, no CMS

## What's done
| Commit | Scope |
|--------|-------|
| `fb6a036` Initial commit | Phases 0–7: project setup, data layer, all components, both pages wired up |
| `34e5062` Phase 8 + launch prep | T29 responsive, T30 accessibility, T31 performance, T32 final QA, Formspree wired, OG image, docs |
| `53bdd97` Post-launch UI fixes | Nav/filter overlap fix, chart label typo, chart padding, docs update |
| `47ba309` Skills & Tech Stack merge | Merged Skills + Tech Stack into single interactive tag grid (7 categories, 77 skills), reduced viz tabs 4→3, startup ritual in CLAUDE.md |
| `18a2ea5` Collaboration page | New `/collaboration` route: 10 service offerings (accordion cards), 3 packages (Audit/Build/Operate), add-ons, working style + tooling pills, nav updated |
| `b5e26ea` UI rework | Year-proportional chart positioning, aligned HTML timeline below chart, per-node diagonal label placement, FloatingNav always visible, portfolio hidden from nav |
| `2d65169` Content + logos | Company logos on all 8 experience cards + RIT on education, full verbatim resume content, FloatingNav anchor link fix, README |
| `6863c84` README + docs sync | Comprehensive README rewrite (TOC, z-index docs, expanded troubleshooting), CLAUDE.md sync |
| `e8f9cae` Doc sync | Synced CLAUDE.md, Plan.md, STATUS.md, tasks.md with latest commit history |
| `78bb8f6` Deployment | Vercel project created, dbenger.com + www.dbenger.com live, L03 done |
| `ec931fc` RIT logo update | Replaced RIT logo with new version, manual Vercel deploy |
| `1f47fd8` Mobile layout fixes | RoleEvolution chart fits viewport (no horizontal scroll), FloatingNav inline pill nav at all sizes (no hamburger) |
| `648994d` Google intern date fix | Corrected Google Analytical Consultant Intern dates from Aug 2017–Dec 2021 to Jan 2017–Aug 2017 |
| `d083605` Resume PDF V3 update | Updated downloadable resume PDF (`public/resume/Dominik_Benger_Resume.pdf`) to latest V3 |
| `6823438` Hero bottom padding | Added `pb-12` to HeroSection for breathing room between scroll indicator and filter bar on mobile |
| `fb4ece0` Mobile nav + chart spacing | Tightened FloatingNav link padding, reduced hero section + viz card padding on mobile for larger chart rendering |
| `9ce59d3` Contact anchor scroll fix | Added `scroll-mt-[140px]` to `#contact` section so "Get in Touch" clears fixed nav + filter bar |
| `e2d7434` Experience anchor scroll fix | Added `scroll-mt-[140px]` to `#experience` section so "Experience" heading clears fixed nav + filter bar |
| `4095704` Ebook page | New `/how-i-built-this` case study article with 12 sections, code blocks, tables, callouts |
| `6cfa572` AI chatbot + ebook update | T36 chatbot (Gemini 3 Flash Preview via Google AI Studio, SSE streaming, ChatWidget, rate limiting). Ebook updated with model name + compound-engineering-plugin. |
| `a52b4a8` README update | Added chatbot, ebook page, API route, env vars, z-index, troubleshooting to README |

**Uncommitted:**
- U22: ChatWidget auto-open disabled on mobile — only opens automatically on desktop (>= 640px)

Key files: ~37 TSX/TS source files across `src/`, 5 data files, 3 visualizations (Career Path, Skills & Tech Stack, Industries), 1 API route (`/api/chat`), Tailwind theme, global styles, favicon, OG image.

**All development tasks (T01–T36, U06–U21, L04) are complete and committed.** Site live at dbenger.com.

## Current state of the code
- `npm run build` — passes clean (0 errors, 0 warnings, all pages SSG except `/api/chat` dynamic)
- `npm run dev` — runs on localhost:3000, all routes render (`/`, `/collaboration`, `/how-i-built-this`, `/portfolio`)
- Contact form wired to Formspree endpoint `mojnqgnq` — live and functional
- AI chatbot live — `GEMINI_API_KEY` set in Vercel env vars
- Open Graph image at `src/app/opengraph-image.png` (1200×630, auto-served by Next.js)
- No tests (no test framework installed)
- GitHub: https://github.com/Ninety2UA/web-app-resume

## Decisions made
| Area | Decision |
|------|----------|
| Framework | Next.js 15 App Router, TypeScript, React 19 |
| Styling | Tailwind CSS 3.4, custom warm palette (`#FDFCFA` bg, terra cotta/sage/amber/lavender accents) |
| Animations | Framer Motion 11 — all scroll animations use `useScrollAnimation` hook with IntersectionObserver |
| Visualizations | Custom SVG + Framer Motion (no charting library) — 3 views: RoleEvolution, SkillsTechStack, IndustryVerticals |
| Font | Plus Jakarta Sans via `next/font/google` |
| Contact | Formspree POST (client-side), honeypot spam field |
| Analytics | Vercel Analytics |
| Data model | Static TS files in `src/data/` — `experience.ts` (typed entries with sections, bullets, tags), `skills.ts` (7 skill categories + industry + role data), `portfolio.ts` (project cards), `offerings.ts` (10 offerings, 3 packages, add-ons, tools) |
| UX | Floating pill nav (always visible), sticky filter pills, pill toggles are inclusive OR, scroll-triggered fade-in animations (once), `prefers-reduced-motion` respected |
| Cut from v1 | Shareable filter URLs, tech tag click-to-filter, dynamic PDF gen, blog/CMS |

## Completed tasks
- [x] Add favicon (`src/app/icon.svg`)
- [x] Init git repo + first commit
- [x] **T29 — Responsive design pass** (all components responsive 320–1024px+)
- [x] **T30 — Accessibility audit** (skip-to-content, ARIA labels, keyboard nav, tablist/tabpanel, aria-pressed, aria-live)
- [x] **T31 — Performance optimization** (build clean, 156 kB first load, SSG, next.config optimized)
- [x] **T32 — Final QA** (all viewports tested, all 4 visualizations verified, filters working, all links confirmed, PDF download 200, OG image route 200)
- [x] Set real Formspree form ID in `ContactSection.tsx` (`mojnqgnq`)
- [x] Add Open Graph image (`opengraph-image.png` — 1200×630)
- [x] Set up git remote + push to GitHub

## Post-launch UI fixes (committed at `53bdd97`)
- [x] **Fix nav/filter overlap** — FloatingNav (fixed z-50) was overlapping the sticky filter bar. Changed filter bar from `sticky top-0` to `sticky top-[68px]` in `page.tsx` so it clears the nav.
- [x] **Fix chart label typo** — RoleEvolution chart showed "AI & Innovation Focus" instead of "AI & Technology Focus". Fixed in `skills.ts`.
- [x] **Reduce chart horizontal padding** — RoleEvolution SVG padding reduced from 60px to 20px per side, making the plotted line extend closer to chart boundaries. Added smart text anchoring (`start`/`end` for first/last nodes) to prevent label clipping at edges.

## Skills & Tech Stack merge (committed at `47ba309`)
- [x] **Merge "Skills" + "Tech Stack" into one tab** — Replaced the separate Skills (bar chart) and Tech Stack (timeline) visualizations with a single "Skills & Tech Stack" interactive tag grid.
- **New data**: 7 categories, 77 skills from resume: Data/Analytics (13), Marketing Platforms (8), Cloud/Infrastructure (10), AI/LLM Tools (8), Developer Tools (22), Workflow Automation (6), Generative Media (10).
- **New component**: `SkillsTechStack.tsx` — category filter buttons at top (click to isolate), color-coded skill tag pills, staggered Framer Motion animations, scrollable content area.
- **3 new accent colors**: Sky (#5B8DB8), Rose (#D4697A), Emerald (#4A9B6E) — defined as inline styles in component colorMap (not in Tailwind config).
- **Deleted**: `SkillsProgression.tsx`, `TechStack.tsx`, old `skillCategories` and `techTimeline` data exports.
- **VizType reduced**: 4 tabs → 3 tabs (Career Path | Skills & Tech Stack | Industries).

## Collaboration page (committed at `18a2ea5`)
- [x] **New `/collaboration` route** — service offerings page sourced from `docs/Offering.md`
- **Data**: `src/data/offerings.ts` — 10 core offerings, 3 packages (Audit/Build/Operate), 4 add-ons, 3 working principles, 4 tool categories
- **Components**: `OfferingCard.tsx` (accordion deliverables, accent bar, number badge), `OfferingsGrid.tsx` (2-col responsive), `PackageCards.tsx` (3-tier comparison + add-ons), `WorkingStyleSection.tsx` (principles cards + tool pills)
- **Page**: Server component with hero, 5 sections, CTA matching portfolio pattern
- **Nav**: Added "Collaboration" link to FloatingNav, generalized `isCurrent` route detection
- **Build**: 148 kB first load, SSG, 0 warnings

## UI rework (committed at `b5e26ea`)
- [x] **FloatingNav always visible** — removed scroll-threshold visibility (60vh). Nav renders immediately as plain `<nav>` (no animation wrapper). Removed `visible` state + scroll listener. Mobile hamburger replaced with inline pill nav at all sizes (commit `1f47fd8`).
- [x] **Portfolio hidden from navigation** — removed "Portfolio" link from FloatingNav and Footer. Page files intact at `/portfolio` for future v2. Cleaned up unused `Link` import in Footer.
- [x] **RoleEvolution year-proportional positioning** — nodes positioned by actual year (2014-2025) instead of evenly spaced. Early-career roles (2014-2018) bunched left, later roles spread right. SVG 900×440, padding 70/20/70/20.
- [x] **RoleEvolution aligned timeline** — timeline moved from inside SVG to HTML below chart. Uses `yearToX()` percentages for alignment with chart nodes. TimelineMarkers component used for other viz tabs only.
- [x] **RoleEvolution label overlap fix** — per-node `labelPlacements` array with diagonal offsets (above-left / below-right) for bunched nodes 1-4. Nodes 5-6 use standard above. No labels overlap circles or curves.
- [x] **HeroSection timeline conditional** — standalone TimelineMarkers hidden when role viz is active (has its own aligned timeline). Shows for Skills & Industries tabs.

## Company logos (committed at `2d65169` — L04)
- [x] **Added company logos to experience cards** — 6 logos in `public/logos/` (google.png, henkel.png, loreal.png, q-agency.png, ai.png, rit.png)
- Added `logo?: string` field to `ExperienceEntry` interface in `experience.ts`
- `ExperienceCard.tsx` renders logo inline with **job title** (left side) using `<img>` (not `next/image` — avoids dimension mismatch warnings for varying aspect ratios)
- `.gitignore` updated with `!public/logos/*.png` exception
- All 8 experience entries now have logos (including career-break with ai.png) + RIT on education
- Build: 156 kB first load (down from 162 kB — `next/image` module no longer imported)

## UI tweaks (committed at `2d65169` — U11–U13)
- [x] **U11 — Logo position**: Moved company logo from company name row to job title row (flex with `<h3>`)
- [x] **U12 — HeroSection bottom padding**: Changed `py-20` to `pt-20 pb-0`, removing gap below "Scroll to explore"
- [x] **U13 — Collaboration tooling update**: Marketing Measurement expanded (removed SKAdNetwork, added Meta Ads, App Campaigns, GA4, Firebase, Apple Search Ads, split Adjust/AppsFlyer — 9 tools). AI & Automation expanded from 8 to 37 tools (all AI/dev/automation tools from resume).

## README rewrite (committed at `6863c84`)
- [x] Comprehensive README with table of contents, z-index stacking order, expanded troubleshooting (9 issues), customization guides, design system tokens, deployment instructions
- [x] CLAUDE.md synced with FloatingNav anchor link pitfall and corrected route detection docs

## Deployment (complete)
- [x] ~~Commit all uncommitted changes~~ — done at `2d65169` and `6863c84`
- [x] Push to origin — done at `e8f9cae`
- [x] Set up Vercel project + custom domain — live at https://dbenger.com (also https://www.dbenger.com)

## Commands
```bash
npm run dev      # Start dev server (Turbopack) — localhost:3000
npm run build    # Production build — checks types + lint
npm run lint     # ESLint only
```

No test runner installed. Lighthouse can be run via Chrome DevTools or `npx lighthouse http://localhost:3000`.

## Pitfalls / don't forget
- **Formspree ID** — `ContactSection.tsx:17` uses real endpoint `mojnqgnq`.
- **PDF path must match** — download button points to `/resume/Dominik_Benger_Resume.pdf`; the source file in `docs/resume-file/` has spaces in the name but was copied with underscores to `public/resume/`.
- **SVG text in RoleEvolution** uses Tailwind `fill-warm-*` classes inside `<text>` elements — these require the Tailwind theme to be loaded; won't render in raw SVG viewers.
- **Sticky filter bar is z-30, FloatingNav is z-50** — any new sticky/fixed elements need to respect this stacking.
- **`prefers-reduced-motion`** is handled globally in CSS (forces 0.01ms durations) — but Framer Motion `animate` props still fire; they just complete instantly. Don't rely on animation callbacks for logic.
- **`.gitignore` has `*.png`** — OG image exception: `!src/app/opengraph-image.png`. Logos exception: `!public/logos/*.png`.
- **Company logos use `<img>` not `next/image`** — `next/image` produces dimension mismatch warnings with varying aspect ratio logos. Plain `<img>` with `eslint-disable` block in `ExperienceCard.tsx`.

## Mobile layout fixes (committed at `1f47fd8`)
- [x] **U14 — RoleEvolution chart fits viewport** — Removed `min-w-[500px]` from SVG and timeline, removed `overflow-x-auto scrollbar-hide` from wrapper. Chart now scales to fit any viewport via SVG `viewBox` + `preserveAspectRatio`.
- [x] **U15 — FloatingNav inline pill nav** — Replaced mobile hamburger menu with same horizontal pill nav at all sizes. Responsive sizing: `text-xs`/`px-2.5` base, `sm:text-sm`/`sm:px-4`. Removed unused imports (useState, useEffect, motion, AnimatePresence, cn). No more mobile dropdown, Escape key handler, or AnimatePresence.

## Data & content fixes (committed at `648994d`, `d083605`)
- [x] **Fix Google intern dates** — Corrected Google Analytical Consultant Intern from `2017-08`/`2021-12` to `2017-01`/`2017-08` in `experience.ts`
- [x] **Update resume PDF** — Replaced `public/resume/Dominik_Benger_Resume.pdf` with latest V3 from `docs/resume-file/`

## Mobile spacing polish (committed at `6823438`, `fb4ece0`)
- [x] **U18 — HeroSection bottom padding** — Changed `pb-0` to `pb-12` for breathing room between "Scroll to explore" and filter bar on mobile
- [x] **U19 — Mobile nav + chart spacing** — FloatingNav link padding `px-2.5` → `px-2`, HeroSection `px-6` → `px-4 sm:px-6`, viz card `p-4` → `p-2 sm:p-6` — all mobile only, ~32px more chart width

## Anchor scroll fixes (committed at `9ce59d3`, `e2d7434`)
- [x] **U20 — Contact anchor scroll** — Added `scroll-mt-[140px]` to `#contact` section so "Get in Touch" heading clears the fixed FloatingNav + sticky filter bar when navigating via Contact nav link
- [x] **U21 — Experience anchor scroll** — Same `scroll-mt-[140px]` fix applied to `#experience` section
