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
- **Framework:** Next.js 15 (App Router, TypeScript) — used for API routes + static HTML serving
- **Frontend:** Self-contained HTML (`public/site.html`) with CDN Tailwind CSS, vanilla JS, hash-based SPA routing
- **AI Features:** 4 server-side API routes proxying to Gemini 3 Flash Preview (Google AI Studio)
- **Sanitization:** DOMPurify (CDN) for AI HTML responses
- **Contact Form:** Formspree (in HTML)
- **Fonts:** Plus Jakarta Sans (Google Fonts CDN)

## Project Structure
```
src/
├── app/
│   ├── route.ts           # GET / — serves public/site.html (force-static)
│   └── api/ai/            # Server-side Gemini proxy routes
│       ├── solution-matcher/route.ts   # POST — 3-step action plan
│       ├── experience-qa/route.ts      # POST — experience Q&A
│       ├── outreach-drafter/route.ts   # POST — email/LinkedIn drafts
│       └── agenda-builder/route.ts     # POST — call agenda generator
public/
├── site.html              # Full site (SPA, CDN Tailwind, hash routing)
├── icon.svg               # Favicon
├── og-image.png           # Open Graph image (1200×630)
├── resume/                # PDF resume for download
└── logos/                 # Company logo assets (6 PNGs)
docs/
├── index.html             # Source design (single source of truth)
├── PRD.md                 # Product Requirements Document
├── Spec.md                # Technical specification
├── Plan.md                # Implementation plan (phases & tasks)
├── STATUS.md              # High-level project status
├── tasks.md               # Detailed task tracker
├── Offering.md            # Service offerings content source
├── Dominik_Benger_Resume_4Page.md  # Source resume content
└── resume-file/           # Original PDF resume source
```

## Commands
- `npm run dev` — Start dev server (Turbopack)
- `npm run build` — Production build
- `npm run lint` — ESLint

## Design System
- **Aesthetic:** Modern teal-accented with dark sections
- **Font:** Plus Jakarta Sans (Google Fonts CDN, weights 300–700)
- **Brand palette:** Teal scale — brand-50 `#f0fdfa` through brand-950 `#042f2e`, primary brand-500 `#14b8a6`
- **Backgrounds:** White, zinc-50, zinc-900/950 (dark hero/footer sections)
- **Animations:** CSS scroll-triggered via IntersectionObserver + `data-animate` attributes, hero canvas particle animation
- **SPA routing:** Hash-based (#home, #experience, #collaboration, #contact, #ebook)

## Architecture Decisions
- **Static HTML + API routes**: Self-contained HTML (`public/site.html`) served via Next.js route handler. Next.js used only for API routes and Vercel deployment.
- **SPA with hash routing**: 5 page views (#home, #experience, #collaboration, #contact, #ebook) in single HTML file, JS-based router
- **Server-side AI proxy**: 4 API routes under `/api/ai/` proxy to Gemini 3 Flash Preview — keeps `GEMINI_API_KEY` server-side
- **CDN dependencies**: Tailwind CSS, DOMPurify, Google Fonts all loaded via CDN in HTML
- **No React on frontend**: All interactivity is vanilla JS (scroll animations, experience filters, AI feature forms, canvas particle animation)
- **Design source of truth**: `docs/index.html` — any design changes should be made there first, then copied to `public/site.html`

## Content
- **Owner:** Dominik Benger
- **Domain:** dbenger.com
- **LinkedIn:** https://www.linkedin.com/in/dombenger/
- **Email:** domi@dbenger.com
- **Resume data:** `docs/Dominik_Benger_Resume_4Page.md`
- **PDF download:** `docs/resume-file/Dominik Benger - Resume [V3].pdf`

## Z-Index Stacking
All stacking context is managed in `public/site.html` via inline Tailwind classes. The sticky nav bar is at the top, experience filter pills are sticky below it.

## Pitfalls
- **PDF path must match** — download button points to `/resume/Dominik_Benger_Resume.pdf`; source file in `docs/resume-file/` has spaces but was copied with underscores to `public/resume/`.
- **`.gitignore` has `*.png`** — Exceptions: `!public/logos/*.png`, `!public/og-image.png`.
- **`GEMINI_API_KEY` env var** — Required for all 4 AI features. Set in `.env.local` (gitignored) for dev, in Vercel project settings for prod. If missing or placeholder, API routes return graceful error.
- **Design source of truth** — `docs/index.html` is the master design. Changes should be made there first, then reflected in `public/site.html` (with image path fixes and API route updates).
- **Image paths in site.html** — Must use absolute paths (`/logos/google.png` not `logos/google.png` or `../public/logos/google.png`). Fixed during copy from `docs/index.html`.
- **AI responses use innerHTML** — Solution Matcher and Agenda Builder return HTML from Gemini. Sanitized via DOMPurify with allowlisted tags (`p`, `ul`, `li`, `strong`, `ol`, `em`).
- **route.ts at app root** — `src/app/route.ts` serves static HTML. Cannot coexist with `page.tsx` in same directory. No `layout.tsx` needed (Route Handlers don't use layouts).
- **Gemini API field names** — API routes use `system_instruction` (snake_case) for the Gemini REST API v1beta endpoint.

## Accessibility & Responsive
- All accessibility and responsive behavior is handled in `public/site.html` via Tailwind responsive classes and HTML attributes
- Scroll animations use IntersectionObserver with `data-animate` attributes
- Experience filter uses `data-tags` on cards for tag-based filtering
- Mobile-first responsive design via Tailwind breakpoints (sm, md, lg, xl)

## Performance Profile
- Build: 0 warnings, `/` is static (force-static), 4 API routes are dynamic
- `/` = 101 kB first load JS (gzipped) — static HTML response
- `site.html` = ~250 kB (self-contained with inline CSS/JS + CDN Tailwind)
- `next.config.ts`: `reactStrictMode: true`, `poweredByHeader: false`

## Repository
- **GitHub:** https://github.com/Ninety2UA/web-app-resume
- **Commits:** `fb6a036` (Phases 0–7), `34e5062` (Phase 8 + launch prep), `53bdd97` (post-launch UI fixes), `47ba309` (Skills & Tech Stack merge), `18a2ea5` (Collaboration page), `b5e26ea` (UI rework: chart, timeline, nav), `2d65169` (logos, full resume content, nav fix, RIT logo, README), `6863c84` (comprehensive README + CLAUDE.md sync), `e8f9cae` (doc sync), `78bb8f6` (deployment complete), `ec931fc` (RIT logo update), `1f47fd8` (mobile layout fixes), `648994d` (Google intern date fix), `d083605` (resume PDF V3 update), `fb4ece0` (mobile nav + chart spacing), `9ce59d3` (contact anchor scroll fix), `e2d7434` (experience anchor scroll fix), `4095704` (ebook page), `6cfa572` (AI chatbot + ebook Gemini/plugin update), `a52b4a8` (README update), `27e65c1` (chatbot mobile auto-open fix), `0366d57` (ebook summary + hero button visibility)
- **Branch:** `main`

## Project Documentation
- Read `docs/STATUS.md` for current progress and state
- Read `docs/tasks.md` for the task backlog and priorities
- Read `docs/plan.md` for the overall project plan
- Read `docs/spec.md` for project specifications and requirements

Always read these files before starting any work.

## Session Continuity
- **Latest work** — Complete site redesign: replaced React component architecture with static HTML (`public/site.html`) from `docs/index.html`. Created 4 server-side AI API routes. Removed all old components, data, hooks, utilities (~4,914 lines deleted). NOT YET COMMITTED.
- **Deployed** — Previous version live at https://dbenger.com (Vercel). Manual deploy via `npx vercel --prod` when Git auto-deploy doesn't trigger.
- **AI features (new)** — 4 inline AI features in `site.html`, each calling server-side API routes: Solution Matcher, Experience Q&A, Outreach Drafter, Agenda Builder. All use Gemini 3 Flash Preview via `GEMINI_API_KEY`.
- **Old chatbot removed** — FAB chatbot widget (`ChatWidget.tsx`) and `/api/chat` route deleted. Replaced by 4 inline AI features.
- **Old pages removed** — `/portfolio`, `/collaboration`, `/how-i-built-this` Next.js routes deleted. All content now in `site.html` hash-based SPA.
- **Untracked** — `chatbot/` scratch directory in repo root (not committed, not needed).
