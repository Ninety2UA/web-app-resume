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

## Scope Notes
- Cut from v1: Shareable filter URLs (query params), technology tag click-to-filter
- Portfolio page uses placeholder project cards (real content TBD)
- Company logos: use where available, styled text as fallback
