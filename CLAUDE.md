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
│       ├── knowledge.ts               # Shared professional profile for all AI routes
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
- **Animations:** CSS scroll-triggered via IntersectionObserver + `data-animate` attributes (0.35s ease-out-quart, 0.04s delay step — max fade 0.59s end-to-end), hero canvas skill-word constellation (v2: Poisson-disk layout, Lissajous oscillation, hover proximity highlight, ambient connection lines)
- **SPA routing:** Hash-based (#home, #experience, #projects, #collaboration, #contact, #ebook)

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
- **Gemini thinking tokens** — Gemini 3 Flash Preview uses thinking tokens that count against `maxOutputTokens`. Must set `thinkingConfig: { thinkingBudget: 128 }` (not 0) and `maxOutputTokens: 1024`. At `thinkingBudget: 0` with temperature > 0.3, the model outputs garbage text.
- **AI knowledge base** — All 4 AI routes import `src/app/api/ai/knowledge.ts` which contains Dominik's full professional profile. Update this file when resume content changes.
- **AI plain text outputs** — Experience Q&A and Outreach Drafter must include "Output PLAIN TEXT only" in system prompts to prevent markdown artifacts (`**bold**`) rendering as literal text.
- **Hero canvas DPR** — Canvas must scale `canvas.width/height = rect.width/height * dpr` and call `ctx.setTransform(dpr,0,0,dpr,0,0)` — otherwise text is fuzzy on retina. Cap DPR at 2 for perf.
- **Hero canvas sync** — FEATURE 5 block (`public/site.html` ~3026–3360, `docs/index.html` ~3055–3389) must stay byte-identical between both files. Use `diff` to verify after edits.
- **Hero canvas motion speed** — Lissajous frequency ~0.001–0.002 rad/ms (period 5–8s) reads as "alive"; `0.0004` (period ~15s) reads as static.
- **Scroll-entrance timing** — `[data-animate]` uses `opacity/transform 0.35s cubic-bezier(0.22,1,0.36,1)` (ease-out-quart) with delay step `0.04s` per `data-delay` level. End-to-end fade (delay + duration) caps at ~0.59s. Longer values (0.6s + 0.1s step = 1.2s total with ease-out-quint) read as "slow motion" trailing the scroll.
- **CSS transition shorthand cascade** — `[data-animate]` sets its transition via the `transition` shorthand, but Tailwind CDN utility classes like `transition-colors` (loaded later in the cascade) override it on elements that have both. Those elements snap instead of fade. Pre-existing; not worth fixing since it affects only small above-the-fold elements (nav pills, etc.).
- **content-visibility on below-fold sections** — `.page-view > section:nth-of-type(n+2) { content-visibility: auto; contain-intrinsic-size: auto 1200px; }` defers paint/layout of non-hero sections. Works correctly with the `data-animate` IntersectionObserver (`rootMargin: '0px 0px -40px 0px'`) because the browser materializes `cv:auto` content before viewport intersection.
- **Compositing-cost traps** — `mix-blend-multiply` on blurred elements blocks GPU layer promotion → forces CPU paint each frame; `backdrop-filter: blur()` on a fixed strip forces per-scroll-frame recomposition; `animate-pulse` on large blurred layers = continuous repaint. All three are invisible on M-series GPUs but bite mid-range devices.

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
- **Commits:** `fb6a036` (Phases 0–7), `34e5062` (Phase 8 + launch prep), `53bdd97` (post-launch UI fixes), `47ba309` (Skills & Tech Stack merge), `18a2ea5` (Collaboration page), `b5e26ea` (UI rework: chart, timeline, nav), `2d65169` (logos, full resume content, nav fix, RIT logo, README), `6863c84` (comprehensive README + CLAUDE.md sync), `e8f9cae` (doc sync), `78bb8f6` (deployment complete), `ec931fc` (RIT logo update), `1f47fd8` (mobile layout fixes), `648994d` (Google intern date fix), `d083605` (resume PDF V3 update), `fb4ece0` (mobile nav + chart spacing), `9ce59d3` (contact anchor scroll fix), `e2d7434` (experience anchor scroll fix), `4095704` (ebook page), `6cfa572` (AI chatbot + ebook Gemini/plugin update), `a52b4a8` (README update), `27e65c1` (chatbot mobile auto-open fix), `0366d57` (ebook summary + hero button visibility), `8d7629c` (full redesign: static HTML SPA + AI knowledge base + Gemini thinking fix), `d9bb422` (OG image + meta description update), `5befda8` (mobile nav, status badge, hero particles fix), `1571bc9` (Collaboration in mobile nav + ebook hero pill), `6884d22` (mobile nav overflow fix), `cf3137f` (README update), `0018dcc` (ebook pill to nav bar desktop), `fc5a793` (remove Ebook nav link), `0f6743d` (Android mobile nav overflow fix), `45f49de` (README update), `7fd89f5` (resume PDF update + Career Break → Professional Development), `24300d6` (Projects page with 6 portfolio entries), `db6a3d8` (Resume V4 content update), `fda3203` (restore original V4 PDF + iterative copy refinements), `9fdc90e` (OG image + README for Projects page + Resume V4), `396c47a` (hero canvas rework: interactive skill constellation), `93a9c5c` (Phase 28 doc sync), `2d553ad` (Phase 29 scroll perf polish)
- **Branch:** `main`

## Project Documentation
- Read `docs/STATUS.md` for current progress and state
- Read `docs/tasks.md` for the task backlog and priorities
- Read `docs/plan.md` for the overall project plan
- Read `docs/spec.md` for project specifications and requirements

Always read these files before starting any work.

## Session Continuity
- **Sibling project (2026-07-03)** — Built the Amazon AIP interactive job application at `~/projects/amazon-application` (own repo, committed at `7de0eb5`; deploy to `amazon.dbenger.com` pending user go-ahead). No web-app-resume changes that session. That project's own AGENTS.md/docs are the source of truth; cross-project pitfalls recorded in auto-memory (`amazon-aip-application-site.md`).
- **Latest work** — Scroll performance polish (commit `2d553ad`). Diagnosed "slow-motion / sluggish" scroll feel via Chrome DevTools traces: no frame jank (120 fps flat, 0 long frames at 120 Hz), perception driven by 0.6s ease-out-quint transitions + 0.6s max delay (1.2s end-to-end fade) across 118 `[data-animate]` elements. Applied seven coordinated fixes mirrored in `public/site.html` + `docs/index.html`: (1) `[data-animate]` duration 0.6s→0.35s (+ 0.5s variant→0.3s); (2) delay step 0.1s→0.04s (max stagger 0.6s→0.24s); (3) easing `cubic-bezier(0.16,1,0.3,1)`→`cubic-bezier(0.22,1,0.36,1)` (ease-out-quart); (4) removed `mix-blend-multiply` from 4 decorative `blur-3xl` circles (GPU can composite instead of CPU paint); (5) removed `animate-pulse` from 2 of those circles (no more continuous repaint); (6) nav `bg-white/80 backdrop-blur-md`→`bg-white/95` (no per-scroll-frame backdrop-filter); (7) `.page-view > section:nth-of-type(n+2) { content-visibility: auto; contain-intrinsic-size: auto 1200px }` for below-fold render deferral. End-to-end fade per element: 1.2s → 0.59s.
- **Prior work** — Phase 28 hero canvas rework (`396c47a`): all 27 skill words render via Poisson-disk layout (desktop) / 2-col stagger (mobile), Lissajous oscillation, proximity highlight, ambient constellation lines, DPR-scaled, IO-paused. FEATURE 5 block must stay byte-identical between `public/site.html` and `docs/index.html`.
- **Deployed** — `2d553ad` live at https://dbenger.com (Vercel dpl_948pZ85Yz6GRPVkMHhZhks34gYDA, 37s build+deploy). Manual deploy via `npx vercel --prod` when Git auto-deploy doesn't trigger.
- **Perf diagnostic playbook** — To distinguish jank from perception: (a) run scripted rAF scroll via Chrome DevTools MCP `evaluate_script` and measure frame deltas; (b) inject CSS overrides (kill `backdrop-filter`, `filter: blur()`, `animate-pulse`, `[data-animate]` transitions) and re-measure; (c) if frame timing identical, the fix is perceptual (shorten/snappier animations), not compositing.
- **Mobile nav** — [logo] Experience Projects Collab Contact [PDF Resume]. "Home" hidden on mobile (`hidden sm:inline`). "Collaboration" abbreviated to "Collab" on mobile to fit 5 links. Ebook accessible via hero pill. Text `11px` and padding `px-3` at base for small Android screens.
- **Desktop nav** — [logo + "How I Built This Web App" pill] Home Experience Projects Collaboration Contact [PDF Resume]. No "Ebook" text link — pill replaces it.
- **Projects page** — 6 cards with type badges (Claude Code Plugin/violet, SaaS Product/emerald, Full-Stack App/sky, Automation Pipeline/amber). "Explore More Projects" CTA links to projects.dbenger.com. Requirements doc at `docs/brainstorms/projects-page-requirements.md`.
- **Resume PDF** — V4 at `~/Documents/Resume & Jobs/Dominik Benger - Resume [V4].pdf`. User edits source doc and re-exports; copy to `public/resume/Dominik_Benger_Resume.pdf` when updated. PyMuPDF PDF text editing produces font mismatches (Helvetica vs Carlito) — don't attempt.
- **Hero ebook pill** — Mobile-only (`sm:hidden`) teal pill above status badge, links to `#ebook`.
- **Untracked** — `chatbot/` scratch directory in repo root (not committed, not needed).
