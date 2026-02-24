# Dominik Benger — Interactive Resume

An interactive web app replacing a static PDF resume with dynamic career timelines, 4 AI-powered features (Gemini 3 Flash Preview), and a full services page. Live at [dbenger.com](https://dbenger.com).

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-CDN-06B6D4?logo=tailwindcss)

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
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Design System](#design-system)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Demo

**Live:** [https://dbenger.com](https://dbenger.com)

---

## Features

- **Single-page app** — Hash-based SPA with 5 views (#home, #experience, #collaboration, #contact, #ebook)
- **Interactive career timeline** — Animated career path with company logos, hover effects, and staggered scroll animations
- **Filterable experience cards** — Toggle by industry/role type with pill chips and `data-tags` filtering
- **4 AI-powered features** — All proxied server-side through Gemini 3 Flash Preview:
  - **Solution Matcher** — Generates a custom 3-step action plan for business challenges
  - **Experience Q&A** — Conversational AI assistant answering questions about Dominik's background
  - **Outreach Drafter** — Drafts tailored email/LinkedIn messages with proper structure
  - **Agenda Builder** — Creates focused 30-minute discovery call agendas
- **Collaboration page** — Service offerings, packages, and working style principles
- **Ebook / case study** — Full article documenting how the site was built
- **Contact section** — Formspree-powered form, Google Calendar booking, LinkedIn link
- **Canvas particle animation** — Interactive hero background with skill word labels and mouse interaction
- **Scroll animations** — CSS-based via IntersectionObserver + `data-animate` attributes
- **Fully responsive** — Mobile-first design via Tailwind breakpoints; mobile nav shows all key sections + "How I Built This Web App" hero pill
- **Static PDF download** — Resume available via nav button
- **SEO optimized** — Open Graph image, meta tags, semantic HTML

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 15](https://nextjs.org/) (App Router, Turbopack) |
| Language | [TypeScript 5.7](https://www.typescriptlang.org/) |
| Frontend | Self-contained HTML SPA (`public/site.html`) with vanilla JS |
| Styling | [Tailwind CSS](https://tailwindcss.com/) via CDN |
| Animations | CSS transitions + IntersectionObserver (no JS animation library) |
| AI Features | [Gemini 3 Flash Preview](https://ai.google.dev/) via Google AI Studio REST API |
| Sanitization | [DOMPurify](https://github.com/cure53/DOMPurify) via CDN |
| Contact Form | [Formspree](https://formspree.io/) |
| Booking | [Google Calendar](https://calendar.app.google/) |
| Font | [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) via Google Fonts CDN |
| Deployment | [Vercel](https://vercel.com/) |

---

## Architecture

### How It Works

```
Browser ──▶ GET / ──▶ Next.js route.ts ──▶ serves public/site.html (static)

site.html (SPA):
  ├── #home         — Hero + career timeline + AI Experience Q&A + AI Solution Matcher
  ├── #experience   — Filterable experience cards with detailed sections
  ├── #collaboration — Services, AI Outreach Drafter + AI Agenda Builder
  ├── #contact      — Contact form, booking link, LinkedIn
  └── #ebook        — Case study article
```

### Data Flow

```
public/site.html (all content inline) ──▶ Browser renders SPA
                                              │
                                         vanilla JS handles:
                                         ├── hash routing
                                         ├── scroll animations (IntersectionObserver)
                                         ├── experience filtering (data-tags)
                                         └── canvas particle animation

User input ──▶ fetch('/api/ai/*') ──▶ Next.js API route ──▶ Gemini 3 Flash Preview ──▶ JSON response
```

### AI Feature Routes

| Route | Input | Output | Temp | Thinking |
|-------|-------|--------|------|----------|
| `/api/ai/solution-matcher` | `{challenge}` | HTML (sanitized via DOMPurify) | 0.7 | 128 tokens |
| `/api/ai/experience-qa` | `{question}` | Plain text | 0.6 | 128 tokens |
| `/api/ai/outreach-drafter` | `{intent, type, tone}` | Plain text | 0.6 | 128 tokens |
| `/api/ai/agenda-builder` | `{topic}` | HTML (sanitized via DOMPurify) | 0.6 | 128 tokens |

All routes import a shared knowledge base (`src/app/api/ai/knowledge.ts`) containing Dominik's full professional profile, ensuring rich and specific AI responses.

---

## Repository Structure

```
src/
├── app/
│   ├── route.ts                       # GET / — serves public/site.html (force-static)
│   └── api/ai/                        # Server-side Gemini proxy routes
│       ├── knowledge.ts               # Shared professional profile for all AI routes
│       ├── solution-matcher/route.ts  # POST — 3-step action plan
│       ├── experience-qa/route.ts     # POST — experience Q&A
│       ├── outreach-drafter/route.ts  # POST — email/LinkedIn drafts
│       └── agenda-builder/route.ts    # POST — call agenda generator

public/
├── site.html                          # Full site (SPA, CDN Tailwind, hash routing)
├── icon.svg                           # Favicon (teal D logo with bar chart)
├── og-image.png                       # Open Graph image (1200x630)
├── resume/                            # PDF resume for download
│   └── Dominik_Benger_Resume.pdf
└── logos/                             # Company logo assets (PNGs)
    ├── google.png, henkel.png, loreal.png, q-agency.png, ai.png, rit.png

docs/
├── index.html                         # Source design (single source of truth)
├── Dominik_Benger_Resume_4Page.md     # Source resume content
├── PRD.md                             # Product Requirements Document
├── Spec.md                            # Technical specification
├── Plan.md                            # Implementation plan
├── STATUS.md                          # Project status tracker
└── tasks.md                           # Task backlog
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
npm run build    # Type-check + static generation
npm run start    # Serve the production build locally
```

Build output:

```
Route (app)                    Size     First Load JS
┌ ○ /                         ~101 kB  (static HTML response)
├ ƒ /api/ai/agenda-builder     0 B     (dynamic)
├ ƒ /api/ai/experience-qa      0 B     (dynamic)
├ ƒ /api/ai/outreach-drafter   0 B     (dynamic)
└ ƒ /api/ai/solution-matcher   0 B     (dynamic)
```

---

## Environment Variables

| Variable | Location | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | `.env.local` (dev) / Vercel settings (prod) | Google AI Studio API key for Gemini 3 Flash Preview. Required for all 4 AI features. If missing, API routes return a graceful error. |

Other configuration is inline in `public/site.html`:
- **Formspree endpoint** — Form ID `mojnqgnq`
- **Google Calendar booking** — `https://calendar.app.google/NFqGMfy3RVgLcJHPA`
- **LinkedIn** — `https://www.linkedin.com/in/dombenger/`

---

## Deployment

The project is configured for [Vercel](https://vercel.com/):

1. Connect the GitHub repo to a Vercel project
2. Vercel auto-detects Next.js — no custom build settings needed
3. Add `GEMINI_API_KEY` in Vercel project settings → Environment Variables
4. Add custom domain (e.g., `dbenger.com`) in Vercel → Domains
5. Vercel handles SSL, CDN, and automatic deployments on push to `main`

Manual deploy: `npx vercel --prod`

---

## Design System

| Token | Value |
|-------|-------|
| Font | Plus Jakarta Sans (weights 300–700, Google Fonts CDN) |
| Background | White, zinc-50 (light sections), zinc-900/950 (dark hero/footer) |
| Brand color | Teal — `#14b8a6` (brand-500) with full scale brand-50 to brand-950 |
| Text | zinc-900 (primary), zinc-500 (secondary), white (on dark) |
| Animations | CSS scroll-triggered via IntersectionObserver + `data-animate` |
| Breakpoints | base → `sm` (640px) → `md` (768px) → `lg` (1024px) → `xl` (1280px) |
| Border radius | Cards: `rounded-3xl`, Pills/buttons: `rounded-full` |

---

## Troubleshooting

| Issue | Cause | Fix |
|-------|-------|-----|
| `npm run build` fails alongside dev server | `.next/` cache corruption | Stop dev server, `rm -rf .next`, rebuild |
| New PNG files not tracked by git | `.gitignore` has `*.png` | Add exception: `!path/to/file.png` |
| AI features return empty/truncated text | Gemini thinking tokens consuming output budget | Ensure `thinkingConfig: { thinkingBudget: 128 }` and `maxOutputTokens: 1024` in route |
| AI responses show `**bold**` as literal text | Gemini outputting markdown in plain text context | Add "Output PLAIN TEXT only" to system instruction |
| Image paths broken in site.html | Relative paths used instead of absolute | Use `/logos/google.png` not `logos/google.png` |
| Design changes not reflected | Edited `public/site.html` instead of `docs/index.html` | `docs/index.html` is the design source of truth — edit there first |
| `force-static` route stale after HTML edit | `route.ts` reads file at build time | Rebuild with `npm run build` |

---

## License

All rights reserved. This is a personal portfolio project and is not licensed for reuse.
