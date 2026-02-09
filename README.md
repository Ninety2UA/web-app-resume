# Dominik Benger — Interactive Resume

An animated, interactive web app that replaces a static PDF resume with dynamic data visualizations, a filterable career timeline, and a contact form. Live at [dbenger.com](https://dbenger.com).

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-purple?logo=framer)

---

## Demo

**Live:** [https://dbenger.com](https://dbenger.com)

<!-- Add screenshots here -->
<!-- ![Homepage](docs/screenshots/home.png) -->

---

## Architecture

```
Browser
  │
  ├── / (Home)
  │     ├── HeroSection ─── VisualizationToggle
  │     │     ├── RoleEvolution (SVG career path + aligned HTML timeline)
  │     │     ├── SkillsTechStack (interactive tag grid, 7 categories)
  │     │     └── IndustryVerticals (stacked bar + detail cards)
  │     ├── FilterPills (inclusive OR toggle chips)
  │     ├── ExperienceSection
  │     │     ├── ExperienceCard (main roles)
  │     │     ├── ExperienceCard (additional, compact)
  │     │     └── Education
  │     ├── ContactSection (Formspree POST)
  │     └── Footer
  │
  ├── /collaboration
  │     ├── OfferingsGrid → OfferingCard (accordion)
  │     ├── PackageCards (3-tier + add-ons)
  │     └── WorkingStyleSection (principles + tool pills)
  │
  └── /portfolio (hidden, preserved for v2)
        └── PortfolioGrid → ProjectCard

Layout (all pages):
  ├── FloatingNav (fixed, always visible)
  ├── Skip-to-content link
  └── Vercel Analytics
```

### Data Flow

```
src/data/*.ts (static TypeScript) ──▶ React components ──▶ SSG HTML
                                         │
                                    Framer Motion
                                    (client-side animations)
```

All pages are statically generated at build time (SSG). There is no server-side data fetching, API routes, or CMS. Career data, skills, offerings, and portfolio entries are all defined as typed TypeScript objects in `src/data/`.

---

## Features

- **3 interactive visualizations** — Career Path (SVG with year-proportional positioning), Skills & Tech Stack (filterable tag grid with 77 skills across 7 categories), Industry Verticals (stacked bar chart + detail cards)
- **Filterable experience timeline** — toggle by industry or role type; inclusive OR logic with pill chips
- **Expandable experience cards** — sectioned bullet points, key projects with links, technology tags, company logos
- **Collaboration page** — 10 service offerings with accordion deliverables, 3 packages (Audit/Build/Operate), add-ons, working style principles, and tooling categories
- **Contact form** — Formspree-powered with honeypot spam protection
- **Scroll animations** — staggered fade-in entrances via Framer Motion `whileInView`, respects `prefers-reduced-motion`
- **Fully responsive** — mobile-first design tested at 320px, 375px, 768px, 1024px+
- **Accessible** — skip-to-content, ARIA tablist/tabpanel for visualizations, `aria-pressed` filter toggles, `aria-live` regions, keyboard navigation, `aria-current="page"` in nav
- **Static PDF download** — pre-built resume available via nav button
- **SEO optimized** — Open Graph image, meta tags, semantic HTML, all pages SSG

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
| Font | [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) (via `next/font`) |
| Deployment | [Vercel](https://vercel.com/) |

---

## Repository Structure

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (fonts, metadata, analytics)
│   ├── page.tsx                  # Home: Hero + Filters + Experience + Contact
│   ├── globals.css               # Global styles + Tailwind directives
│   ├── icon.svg                  # Favicon
│   ├── opengraph-image.png       # OG image (1200×630)
│   ├── collaboration/page.tsx    # /collaboration route
│   └── portfolio/page.tsx        # /portfolio route (hidden, v2)
├── components/
│   ├── layout/                   # FloatingNav, Footer
│   ├── hero/                     # HeroSection, VisualizationToggle, TimelineMarkers
│   │   └── visualizations/       # RoleEvolution, SkillsTechStack, IndustryVerticals
│   ├── experience/               # ExperienceSection, ExperienceCard
│   ├── filters/                  # FilterPills
│   ├── contact/                  # ContactSection
│   ├── portfolio/                # PortfolioGrid, ProjectCard
│   └── collaboration/            # OfferingCard, OfferingsGrid, PackageCards, WorkingStyleSection
├── data/                         # Static TypeScript data (no CMS)
│   ├── experience.ts             # Career entries, education, filter tags
│   ├── skills.ts                 # Skill categories, industry data, role progression
│   ├── offerings.ts              # Service offerings, packages, add-ons, tools
│   └── portfolio.ts              # Project cards (placeholder)
├── hooks/
│   └── useScrollAnimation.ts     # IntersectionObserver scroll-triggered animations
└── lib/
    └── utils.ts                  # Utility functions (cn classname merger)

public/
├── logos/                        # Company & education logos (PNG)
└── resume/                       # Static PDF resume for download

docs/
├── Dominik_Benger_Resume_4Page.md  # Source resume content
├── Offering.md                      # Service offerings source
├── PRD.md                           # Product Requirements Document
├── Spec.md                          # Technical specification
├── Plan.md                          # Implementation plan
├── STATUS.md                        # Project status tracker
└── tasks.md                         # Task backlog
```

---

## Prerequisites

- **Node.js** >= 18 (built with v25.6.0)
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
npm run start    # Serve production build locally
```

All pages are statically generated (SSG). Expected output:

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

---

## Environment Variables

No `.env` file is required. All configuration is inline:

| Variable | Location | Description |
|----------|----------|-------------|
| Formspree endpoint | [`src/components/contact/ContactSection.tsx:17`](src/components/contact/ContactSection.tsx) | Form ID `mojnqgnq` — hardcoded POST to `https://formspree.io/f/mojnqgnq` |
| Vercel Analytics | [`src/app/layout.tsx`](src/app/layout.tsx) | Auto-configured via `@vercel/analytics` — no key needed |

---

## Data / Source Files

All career content is defined as typed TypeScript in `src/data/`. There is no CMS or database.

| File | Contents | How it's used |
|------|----------|---------------|
| [`src/data/experience.ts`](src/data/experience.ts) | 8 career entries, education, filter tags | ExperienceSection cards, RoleEvolution chart nodes |
| [`src/data/skills.ts`](src/data/skills.ts) | 7 skill categories (77 skills), industry data, role progression | SkillsTechStack grid, IndustryVerticals chart, RoleEvolution labels |
| [`src/data/offerings.ts`](src/data/offerings.ts) | 10 offerings, 3 packages, add-ons, working principles, tool categories | Collaboration page |
| [`src/data/portfolio.ts`](src/data/portfolio.ts) | Project cards (placeholder) | Portfolio page (hidden) |
| [`docs/Dominik_Benger_Resume_4Page.md`](docs/Dominik_Benger_Resume_4Page.md) | Source resume in Markdown | Reference document — content manually synced to `experience.ts` |
| [`docs/Offering.md`](docs/Offering.md) | Service offerings source | Reference document — content synced to `offerings.ts` |

---

## Customization

### Update career content

Edit [`src/data/experience.ts`](src/data/experience.ts). Each entry follows the `ExperienceEntry` interface:

```typescript
{
  id: string
  company: string
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
  logo?: string            // path in /public/logos/
  isAdditional?: boolean   // renders in "Additional Experience" section
}
```

### Add a new filter tag

Add to the `filterTags` array in [`src/data/experience.ts`](src/data/experience.ts), then reference its `id` in the relevant entries' `industries` or `roleType` arrays.

### Update skills / tech stack

Edit `skillsTechCategories` in [`src/data/skills.ts`](src/data/skills.ts). Each category has a `name` and `skills` string array. The SkillsTechStack component auto-generates the grid.

### Add a company logo

1. Place the PNG in `public/logos/`
2. Add `logo: '/logos/filename.png'` to the experience entry
3. Logos use `<img>` (not `next/image`) — see [ExperienceCard.tsx](src/components/experience/ExperienceCard.tsx)

### Update the collaboration page

Edit [`src/data/offerings.ts`](src/data/offerings.ts) — offerings, packages, add-ons, and tool categories.

### Change the color palette

Edit [`tailwind.config.ts`](tailwind.config.ts). The core palette:

- **Background:** `warm-50` (#FDFCFA)
- **Surface:** `warm-100` (#F5F0EB)
- **Accents:** `coral` (#E07A5F), `teal` (#4A9B8E), `amber` (#E6B35A), `lavender` (#7C6FB0)

Three extended colors (sky, rose, emerald) are defined as inline styles in `SkillsTechStack.tsx` only.

### Replace the PDF resume

Replace `public/resume/Dominik_Benger_Resume.pdf`. The download button path is hardcoded in `FloatingNav.tsx` and `HeroSection.tsx`.

---

## Deployment

The project is configured for [Vercel](https://vercel.com/):

1. Connect the GitHub repo to a Vercel project
2. Vercel auto-detects Next.js — no custom build settings needed
3. Add a custom domain (e.g., `dbenger.com`) in Vercel project settings

No environment variables are required in Vercel.

---

## Design System

| Token | Value |
|-------|-------|
| Font | Plus Jakarta Sans (all weights) |
| Background | `#FDFCFA` (warm off-white) |
| Surface | `#F5F0EB` (warm cream) |
| Primary text | `#1A1814` (warm near-black) |
| Secondary text | `#6B6560` |
| Terra cotta | `#E07A5F` |
| Sage teal | `#4A9B8E` |
| Amber | `#E6B35A` |
| Lavender | `#7C6FB0` |
| Spacing | 8px grid system |
| Animations | 400–500ms, staggered, motion-safe |
| Breakpoints | 320px → `sm` 640px → `md` 768px → `lg` 1024px |

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `npm run build` fails after running alongside dev server | The `.next/` cache can corrupt. Stop the dev server, run `rm -rf .next`, then rebuild. |
| Port 3000 in use | The dev server will auto-pick the next available port (e.g., 3001). Check terminal output. |
| Company logos show dimension warnings | Logos use `<img>` (not `next/image`) intentionally. This avoids `next/image` dimension mismatch warnings with varying aspect ratios. |
| `.gitignore` blocks new PNG files | `*.png` is ignored by default. Add exceptions: `!public/logos/*.png` or `!src/app/opengraph-image.png`. |
| SVG text not rendering outside the app | RoleEvolution `<text>` elements use Tailwind `fill-warm-*` classes that require the Tailwind runtime. |
| Filter pills don't show a role | Ensure the entry's `industries` or `roleType` array includes the filter tag `id`. |
| Contact form not submitting | Verify the Formspree endpoint in `ContactSection.tsx:17` (current: `mojnqgnq`). |

---

## License

All rights reserved. This is a personal portfolio project and is not licensed for reuse.
