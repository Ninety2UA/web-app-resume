# Project Status

## What we're building
- Interactive resume web app for Dominik Benger (dbenger.com) — replaces a static PDF with animated visualizations, a filterable career timeline, and a contact form
- Single scrollable page (Hero → Experience → Contact) plus a `/portfolio` route
- Deployed via Vercel; all career data lives in TypeScript files, no CMS

## What's done
| Commit | Scope |
|--------|-------|
| `fb6a036` Initial commit | Phases 0–7: project setup, data layer, all components, both pages wired up |
| `34e5062` Phase 8 + launch prep | T29 responsive, T30 accessibility, T31 performance, T32 final QA, Formspree wired, OG image, docs |

Key files: 25 TSX/TS source files across `src/`, 3 data files, 4 SVG visualizations, Tailwind theme, global styles, favicon, OG image.

**All development tasks (T01–T32) are complete.** Code is pushed to GitHub.

## Current state of the code
- `npm run build` — passes clean (0 errors, 0 warnings, all pages SSG)
- `npm run dev` — runs on localhost:3000, both `/` and `/portfolio` render
- Contact form wired to Formspree endpoint `mojnqgnq` — live and functional
- Open Graph image at `src/app/opengraph-image.png` (1200×630, auto-served by Next.js)
- No tests (no test framework installed)
- GitHub: https://github.com/Ninety2UA/web-app-resume

## Decisions made
| Area | Decision |
|------|----------|
| Framework | Next.js 15 App Router, TypeScript, React 19 |
| Styling | Tailwind CSS 3.4, custom warm palette (`#FDFCFA` bg, terra cotta/sage/amber/lavender accents) |
| Animations | Framer Motion 11 — all scroll animations use `useScrollAnimation` hook with IntersectionObserver |
| Visualizations | Custom SVG + Framer Motion (no charting library) — 4 views: RoleEvolution, SkillsProgression, IndustryVerticals, TechStack |
| Font | Plus Jakarta Sans via `next/font/google` |
| Contact | Formspree POST (client-side), honeypot spam field |
| Analytics | Vercel Analytics |
| Data model | Static TS files in `src/data/` — `experience.ts` (typed entries with sections, bullets, tags), `skills.ts` (categories + timeline), `portfolio.ts` (project cards) |
| UX | Floating pill nav (appears after 60vh scroll), sticky filter pills, pill toggles are inclusive OR, scroll-triggered fade-in animations (once), `prefers-reduced-motion` respected |
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

## Post-launch UI fixes (uncommitted)
- [x] **Fix nav/filter overlap** — FloatingNav (fixed z-50) was overlapping the sticky filter bar. Changed filter bar from `sticky top-0` to `sticky top-[68px]` in `page.tsx` so it clears the nav.
- [x] **Fix chart label typo** — RoleEvolution chart showed "AI & Innovation Focus" instead of "AI & Technology Focus". Fixed in `skills.ts`.
- [x] **Reduce chart horizontal padding** — RoleEvolution SVG padding reduced from 60px to 20px per side, making the plotted line extend closer to chart boundaries. Added smart text anchoring (`start`/`end` for first/last nodes) to prevent label clipping at edges.

## Remaining (deployment)
- [ ] Set up Vercel project + custom domain (dbenger.com)
- [ ] Company logos in `public/logos/` where available (optional — styled text fallback works)

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
- **`.gitignore` has `*.png`** — OG image has an exception (`!src/app/opengraph-image.png`). Add similar exceptions for any future PNG assets that need tracking.
