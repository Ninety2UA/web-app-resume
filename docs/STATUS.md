# Project Status

## What we're building
- Interactive resume web app for Dominik Benger (dbenger.com) — replaces a static PDF with animated visualizations, a filterable career timeline, and a contact form
- Single scrollable page (Hero → Experience → Contact) plus a `/portfolio` route
- Deployed via Vercel; all career data lives in TypeScript files, no CMS

## What's done
| Commit | Scope |
|--------|-------|
| `fb6a036` Initial commit | Phases 0–7 complete: project setup, data layer, all components, both pages wired up |

Key files: 22 TSX/TS source files across `src/`, 3 data files, 4 SVG visualizations, Tailwind theme, global styles, favicon.

**Uncommitted:** Phase 8 complete (T29 responsive, T30 accessibility, T31 performance). All components responsive at 320–1024px+, full ARIA/a11y pass, next.config optimized. T32 (Final QA) pending visual verification.

## Current state of the code
- `npm run build` — passes clean (no type or lint errors)
- `npm run dev` — runs on localhost:3000, both `/` and `/portfolio` render
- **Not broken**, but polish items remain (see Next Tasks)
- Contact form wired to Formspree endpoint `mojnqgnq`
- No tests (no test framework installed)

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

## Next tasks
- [x] Add favicon (`src/app/icon.svg`)
- [x] Init git repo + first commit
- [x] **T29 — Responsive design pass** (all components responsive 320–1024px+)
- [x] **T30 — Accessibility audit** (skip-to-content, ARIA labels, keyboard nav, tablist/tabpanel, aria-pressed, aria-live)
- [x] **T31 — Performance optimization** (build clean, 156 kB first load, SSG, next.config optimized)
- [ ] **T32 — Final QA** (cross-browser check, all links work, contact form e2e with real Formspree ID, animation smoothness, content accuracy vs resume)
- [x] Set real Formspree form ID in `ContactSection.tsx`
- [x] Add Open Graph image (`opengraph-image.png`)
- [ ] Set up Vercel project + custom domain (dbenger.com)
- [ ] Company logos in `public/logos/` where available (currently all text fallback)

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
- **No git remote yet** — repo is local only. Need to `git remote add origin` before push.
