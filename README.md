# Dominik Benger — Interactive Resume

An animated, interactive web app that replaces a static PDF resume with dynamic data visualizations, a filterable career timeline, and a contact form. Live at [dbenger.com](https://dbenger.com).

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-purple?logo=framer)

---

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Repository Structure](#repository-structure)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Run Locally](#run-locally)
- [Build & Production](#build--production)
- [Lint](#lint)
- [Environment Variables](#environment-variables)
- [Data & Source Files](#data--source-files)
- [Customization](#customization)
- [Deployment](#deployment)
- [Design System](#design-system)
- [Z-Index Stacking Order](#z-index-stacking-order)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Demo

**Live:** [https://dbenger.com](https://dbenger.com)

<!-- To add screenshots:
1. Place PNGs in a tracked directory (e.g., docs/screenshots/)
2. Add a .gitignore exception: !docs/screenshots/*.png
3. Uncomment the lines below:

![Homepage — Career Path visualization](docs/screenshots/home.png)
![Collaboration page](docs/screenshots/collaboration.png)
![Mobile view](docs/screenshots/mobile.png)
-->

---

## Features

- **3 interactive visualizations** — Career Path (SVG with year-proportional node positioning), Skills & Tech Stack (filterable tag grid, 7 categories, 77 skills), Industry Verticals (stacked bar chart + detail cards)
- **Filterable experience timeline** — toggle by industry or role type with pill chips (inclusive OR logic)
- **Expandable experience cards** — sectioned bullet points, key projects with links, technology tags, company logos
- **Collaboration page** — 10 service offerings with accordion deliverables, 3 packages (Audit / Build / Operate), add-ons, working style principles, tooling categories
- **Contact form** — Formspree-powered with honeypot spam protection
- **Scroll animations** — staggered fade-in entrances via Framer Motion `whileInView`; respects `prefers-reduced-motion`
- **Fully responsive** — mobile-first, tested at 320px, 375px, 768px, and 1024px+
- **Accessible** — skip-to-content link, ARIA tablist/tabpanel for visualizations, `aria-pressed` filter toggles, `aria-live` regions, keyboard navigation, `aria-current="page"` in nav
- **Static PDF download** — pre-built resume via nav button
- **SEO optimized** — Open Graph image, meta tags, semantic HTML, all pages statically generated (SSG)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 15](https://nextjs.org/) (App Router, Turbopack) |
| Language | [TypeScript 5.7](https://www.typescriptlang.org/) |
| UI | [React 19](https://react.dev/) |
| Styling | [Tailwind CSS 3.4](https://tailwindcss.com/) |
| Animations | [Framer Motion 11](https://www.framer.com/motion/) |
| Visualizations | Custom SVG + Framer Motion (no charting library) |
| Contact Form | [Formspree](https://formspree.io/) |
| Analytics | [Vercel Analytics](https://vercel.com/analytics) |
| Font | [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) via `next/font` |
| Deployment | [Vercel](https://vercel.com/) |

---

## Architecture

### Component Tree

```
Browser
  │
  ├── / (Home)
  │     ├── HeroSection
  │     │     ├── VisualizationToggle (tablist: 3 tabs)
  │     │     ├── RoleEvolution (SVG career path + aligned HTML timeline)
  │     │     ├── SkillsTechStack (interactive tag grid, 7 categories)
  │     │     ├── IndustryVerticals (stacked bar + detail cards)
  │     │     └── TimelineMarkers (shown for non-Career-Path tabs)
  │     ├── FilterPills (sticky, inclusive OR toggle chips)
  │     ├── ExperienceSection
  │     │     ├── ExperienceCard × N (main roles)
  │     │     ├── ExperienceCard × N (additional, compact)
  │     │     └── Education
  │     ├── ContactSection (Formspree POST)
  │     └── Footer
  │
  ├── /collaboration
  │     ├── OfferingsGrid → OfferingCard (accordion deliverables)
  │     ├── PackageCards (3-tier comparison + add-ons)
  │     └── WorkingStyleSection (principles + tool pills)
  │
  └── /portfolio (hidden — preserved for v2)
        └── PortfolioGrid → ProjectCard

Layout (all pages):
  ├── FloatingNav (fixed, always visible, z-50)
  ├── Skip-to-content link (z-[100])
  └── Vercel Analytics
```

### Data Flow

```
src/data/*.ts (static TypeScript) ──▶ React components ──▶ SSG HTML at build time
                                           │
                                      Framer Motion
                                      (client-side animations)
```

All pages are statically generated (SSG). No server-side data fetching, no API routes, no CMS. Career data, skills, offerings, and portfolio entries are typed TypeScript objects in `src/data/`.

---

## Repository Structure

```
src/
├── app/                            # Next.js App Router
│   ├── layout.tsx                  # Root layout (fonts, metadata, analytics)
│   ├── page.tsx                    # Home: Hero + Filters + Experience + Contact
│   ├── globals.css                 # Global styles + Tailwind directives
│   ├── icon.svg                    # Favicon (DB initials on terra cotta)
│   ├── opengraph-image.png         # OG image (1200×630)
│   ├── collaboration/page.tsx      # /collaboration route (server component)
│   └── portfolio/page.tsx          # /portfolio route (hidden, v2)
├── components/
│   ├── layout/                     # FloatingNav, Footer
│   ├── hero/                       # HeroSection, VisualizationToggle, TimelineMarkers
│   │   └── visualizations/         # RoleEvolution, SkillsTechStack, IndustryVerticals
│   ├── experience/                 # ExperienceSection, ExperienceCard
│   ├── filters/                    # FilterPills
│   ├── contact/                    # ContactSection
│   ├── portfolio/                  # PortfolioGrid, ProjectCard
│   └── collaboration/              # OfferingCard, OfferingsGrid, PackageCards, WorkingStyleSection
├── data/                           # Static TypeScript data (no CMS)
│   ├── experience.ts               # Career entries, education, filter tags
│   ├── skills.ts                   # Skill categories, industry data, role progression
│   ├── offerings.ts                # Service offerings, packages, add-ons, tools
│   └── portfolio.ts                # Project cards (placeholder)
├── hooks/
│   └── useScrollAnimation.ts       # IntersectionObserver scroll-triggered animations
└── lib/
    └── utils.ts                    # Utility functions (cn classname merger)

public/
├── logos/                          # Company & education logos (PNG)
│   ├── google.png, henkel.png, loreal.png, q-agency.png, ai.png, rit.png
└── resume/
    └── Dominik_Benger_Resume.pdf   # Static PDF resume for download

docs/
├── Dominik_Benger_Resume_4Page.md  # Source resume content (reference)
├── Offering.md                     # Service offerings source (reference)
├── PRD.md                          # Product Requirements Document
├── Spec.md                         # Technical specification
├── Plan.md                         # Implementation plan (phases & tasks)
├── STATUS.md                       # Project status tracker
└── tasks.md                        # Task backlog
```

---

## Prerequisites

- **Node.js** >= 18
- **npm** >= 9

---

## Setup

```bash
git clone https://github.com/Ninety2UA/web-app-resume.git
cd web-app-resume
npm install
```

---

## Run Locally

```bash
npm run dev
```

Opens at [http://localhost:3000](http://localhost:3000) with Turbopack hot reload.

---

## Build & Production

```bash
npm run build    # Type-check + lint + static generation
npm run start    # Serve the production build locally
```

All three routes are statically generated (SSG). Expected build output:

```
Route (app)              Size     First Load JS
┌ ○ /                    ~16 kB   ~158 kB
├ ○ /collaboration       ~6 kB    ~148 kB
└ ○ /portfolio           ~4 kB    ~146 kB
```

---

## Lint

```bash
npm run lint
```

Uses ESLint with `eslint-config-next`.

---

## Environment Variables

No `.env` file is required. All configuration is inline:

| Setting | Location | Description |
|---------|----------|-------------|
| Formspree endpoint | `src/components/contact/ContactSection.tsx:17` | Form ID `mojnqgnq` — POST to `https://formspree.io/f/mojnqgnq` |
| Vercel Analytics | `src/app/layout.tsx` | Auto-configured via `@vercel/analytics` — no key needed |
| Metadata base URL | `src/app/layout.tsx:16` | Set to `https://dbenger.com` for OG/Twitter cards |

To use your own Formspree form, replace the ID in `ContactSection.tsx`.

---

## Data & Source Files

All career content is defined as typed TypeScript in `src/data/`. There is no CMS or database.

| File | Contents | Used By |
|------|----------|---------|
| [`src/data/experience.ts`](src/data/experience.ts) | 8 career entries, education, filter tags | ExperienceSection, ExperienceCard, RoleEvolution |
| [`src/data/skills.ts`](src/data/skills.ts) | 7 skill categories (77 skills), industry data, role progression | SkillsTechStack, IndustryVerticals, RoleEvolution |
| [`src/data/offerings.ts`](src/data/offerings.ts) | 10 offerings, 3 packages, add-ons, working principles, tool categories | Collaboration page |
| [`src/data/portfolio.ts`](src/data/portfolio.ts) | Project cards (placeholder) | Portfolio page (hidden) |

Reference documents (not imported by the app — content is manually synced to the TS files above):

| File | Purpose |
|------|---------|
| [`docs/Dominik_Benger_Resume_4Page.md`](docs/Dominik_Benger_Resume_4Page.md) | Source resume in Markdown |
| [`docs/Offering.md`](docs/Offering.md) | Service offerings source |

---

## Customization

### Update career content

Edit [`src/data/experience.ts`](src/data/experience.ts). Each entry follows the `ExperienceEntry` interface:

```typescript
{
  id: string
  company: string
  companyShort: string
  role: string
  team?: string
  location: string
  startDate: string        // "YYYY-MM"
  endDate: string | null   // null = "Present"
  summary: string
  sections: { title: string; bullets: string[] }[]
  keyProjects?: { title: string; description: string; link?: string }[]
  technologies: string[]
  industries: string[]     // must match filterTags ids
  roleType: string[]       // must match filterTags ids
  logo?: string            // path relative to /public (e.g., "/logos/acme.png")
  isAdditional?: boolean   // renders in "Additional Experience" section
}
```

### Add a new filter tag

Add to the `filterTags` array in `src/data/experience.ts`, then reference its `id` in the relevant entries' `industries` or `roleType` arrays.

### Update skills / tech stack

Edit `skillsTechCategories` in [`src/data/skills.ts`](src/data/skills.ts). Each category has a `name`, `colorKey`, and `skills` string array. The SkillsTechStack component auto-generates the grid.

### Add a company logo

1. Place the PNG in `public/logos/`
2. Add `logo: '/logos/filename.png'` to the experience entry in `experience.ts`
3. Ensure `.gitignore` has the exception `!public/logos/*.png` (already present)

> Logos use `<img>` instead of `next/image` to avoid dimension mismatch warnings with varying aspect ratios. See `ExperienceCard.tsx`.

### Update the collaboration page

Edit [`src/data/offerings.ts`](src/data/offerings.ts) — offerings, packages, add-ons, working principles, and tool categories. Note: `toolCategories` in `offerings.ts` is separate from `skillsTechCategories` in `skills.ts` — the former powers the Tooling section on `/collaboration`, the latter powers the Skills & Tech Stack visualization on the home page.

### Change the color palette

Edit [`tailwind.config.ts`](tailwind.config.ts). The core palette:

| Token | Hex | Usage |
|-------|-----|-------|
| `warm-50` | `#FDFCFA` | Page background |
| `warm-100` | `#F5F0EB` | Surface / cards |
| `warm-900` | `#1A1814` | Primary text |
| `warm-600` | `#6B6560` | Secondary text |
| `coral` | `#E07A5F` | Primary accent (CTAs, links) |
| `teal` | `#4A9B8E` | Accent (data/analytics) |
| `amber` | `#E6B35A` | Accent (marketing) |
| `lavender` | `#7C6FB0` | Accent (AI/cloud) |

Three extended colors (sky `#5B8DB8`, rose `#D4697A`, emerald `#4A9B6E`) are defined as inline styles in `SkillsTechStack.tsx` only — not in the Tailwind config.

### Replace the PDF resume

Replace `public/resume/Dominik_Benger_Resume.pdf`. The download path is referenced in:
- `src/components/layout/FloatingNav.tsx` (nav PDF button)
- `src/components/hero/HeroSection.tsx` (hero download link)

---

## Deployment

The project is configured for [Vercel](https://vercel.com/):

1. Connect the GitHub repo to a new Vercel project
2. Vercel auto-detects Next.js — no custom build settings or environment variables needed
3. Add a custom domain (e.g., `dbenger.com`) in Vercel project settings → Domains
4. Vercel handles SSL, CDN, and automatic deployments on push to `main`

Alternatively, any platform that supports Next.js SSG works. Run `npm run build` and serve the `.next/` output or `out/` (if configured for static export).

---

## Design System

| Token | Value |
|-------|-------|
| Font | Plus Jakarta Sans (all weights, `next/font` optimized) |
| Background | `#FDFCFA` (warm off-white) |
| Surface | `#F5F0EB` (warm cream) |
| Primary text | `#1A1814` (warm near-black) |
| Secondary text | `#6B6560` |
| Terra cotta | `#E07A5F` |
| Sage teal | `#4A9B8E` |
| Amber | `#E6B35A` |
| Lavender | `#7C6FB0` |
| Spacing | 8px grid system |
| Animations | 400–500ms, staggered entrances, `prefers-reduced-motion` respected |
| Breakpoints | base (320px) → `sm` (640px) → `md` (768px) → `lg` (1024px) |
| Border radius | Cards: `rounded-2xl`, Pills/buttons: `rounded-full` |
| Shadows | `card` (subtle), `card-hover` (elevated), `nav` (floating), `glow-coral` (CTA) |

---

## Z-Index Stacking Order

Any new fixed/sticky elements must respect this layering:

| Element | Z-Index | Position | File |
|---------|---------|----------|------|
| Sticky filter bar | `z-30` | `sticky top-[68px]` | `src/app/page.tsx` |
| FloatingNav | `z-50` | `fixed top-4` | `src/components/layout/FloatingNav.tsx` |
| Skip-to-content | `z-[100]` | absolute (on focus) | `src/app/layout.tsx` |

The filter bar uses `top-[68px]` to clear the FloatingNav (which is ~44px tall at `top-4`).

---

## Troubleshooting

| Issue | Cause | Fix |
|-------|-------|-----|
| `npm run build` fails after running alongside dev server | `.next/` cache corruption | Stop the dev server, `rm -rf .next`, then rebuild |
| Port 3000 already in use | Another process on 3000 | Dev server auto-picks next port (3001, etc.) — check terminal output |
| New PNG files not tracked by git | `.gitignore` has `*.png` | Add an exception: `!path/to/file.png` |
| Company logos show `next/image` dimension warnings | `next/image` doesn't handle varying aspect ratios well | Use `<img>` instead (already done in `ExperienceCard.tsx`) |
| SVG text invisible outside the app | RoleEvolution `<text>` uses Tailwind `fill-warm-*` classes | These require the Tailwind runtime; they won't render in raw SVG viewers |
| Filter pills don't show a role | Missing tag reference | Ensure the entry's `industries` or `roleType` includes the filter tag `id` |
| Contact form not submitting | Wrong Formspree endpoint | Verify the ID in `ContactSection.tsx:17` (current: `mojnqgnq`) |
| Anchor links don't work from `/collaboration` | `#section` href doesn't navigate cross-page in Next.js | Use `/#section` format (prefixed with `/`) — already set up in `FloatingNav.tsx` |
| `eslint-disable` block not suppressing in JSX | `eslint-disable-next-line` inside conditional (`&&`) fails when target is on non-adjacent line | Use `eslint-disable` / `eslint-enable` block pair instead |

---

## License

All rights reserved. This is a personal portfolio project and is not licensed for reuse.
