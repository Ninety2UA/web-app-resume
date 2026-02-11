# Task Tracker

## Phase 0: Project Setup
| Task | Description | Status |
|------|-------------|--------|
| T01 | Initialize Next.js project | Done |
| T02 | Configure Tailwind theme | Done |
| T03 | Configure Next.js (metadata, fonts, images) | Done |
| T04 | Set up global styles | Done |
| T05 | Copy PDF resume to public/ | Done |

## Phase 1: Data Architecture
| Task | Description | Status |
|------|-------------|--------|
| T06 | Create experience data file | Done |
| T07 | Create skills progression data | Done |
| T08 | Create portfolio placeholder data | Done |
| T09 | Create filter configuration | Done |

## Phase 2: Layout & Navigation
| Task | Description | Status |
|------|-------------|--------|
| T10 | Build root layout | Done |
| T11 | Build FloatingNav component | Done |
| T12 | Build Footer component | Done |

## Phase 3: Hero Section
| Task | Description | Status |
|------|-------------|--------|
| T13 | Build HeroSection wrapper | Done |
| T14 | Build VisualizationToggle buttons (3 tabs) | Done |
| T15 | Build Role Evolution visualization | Done |
| T16 | ~~Build Skills Progression visualization~~ → merged into T33 | Replaced |
| T17 | Build Industry Verticals visualization | Done |
| T18 | ~~Build Tech Stack visualization~~ → merged into T33 | Replaced |
| T19 | Build TimelineMarkers | Done |
| T33 | Build merged Skills & Tech Stack visualization | **Done** |

## Phase 4: Filters & Experience Section
| Task | Description | Status |
|------|-------------|--------|
| T20 | Build FilterPills component | Done |
| T21 | Build useScrollAnimation hook | Done |
| T22 | Build ExperienceSection container | Done |
| T23 | Build ExperienceCard component | Done |

## Phase 5: Contact & Footer
| Task | Description | Status |
|------|-------------|--------|
| T24 | Build ContactSection | Done |

## Phase 6: Portfolio Page
| Task | Description | Status |
|------|-------------|--------|
| T25 | Build ProjectCard component | Done |
| T26 | Build PortfolioGrid layout | Done |
| T27 | Build portfolio page | Done |

## Phase 7: Main Page Assembly
| Task | Description | Status |
|------|-------------|--------|
| T28 | Wire up main page | Done |

## Phase 8: Polish & Optimization
| Task | Description | Status |
|------|-------------|--------|
| T29 | Responsive design pass | **Done** |
| T30 | Accessibility audit | **Done** |
| T31 | Performance optimization | **Done** |
| T32 | Final QA | **Done** |

### T29 Detail — Responsive Design Pass (Complete)

**All components now responsive at 320px / 375px / 768px / 1024px+:**
- FilterPills — horizontal scroll, smaller pills on mobile
- RoleEvolution — scales to fit viewport via SVG viewBox (no min-width or horizontal scroll)
- SkillsProgression — responsive label widths (w-16 sm:w-28 md:w-36), smaller bars/text on mobile
- IndustryVerticals — smaller proportional bar (h-12 sm:h-16 md:h-20), smaller cards, text threshold raised
- TechStack — compact timeline (smaller year labels, tags, dots on mobile)
- TimelineMarkers — smaller dots/text on mobile (text-[9px] sm:text-xs)
- VisualizationToggle — icon-only on mobile (labels hidden sm:inline), smaller padding
- HeroSection — responsive viz area padding
- ExperienceCard — reduced padding (p-4 sm:p-5 md:p-8)
- ExperienceSection — px-4 md:px-6, tighter subheading max-width
- ContactSection — px-4 md:px-6
- Portfolio page — all sections px-4 md:px-6, smaller card thumbnails, tighter grid gap
- ProjectCard — h-28 sm:h-36 thumbnail, p-4 sm:p-5 content

### T30 Detail — Accessibility Audit (Complete)

- **Skip-to-content** link in layout.tsx (sr-only, visible on focus, z-[100])
- **Landmark roles**: main#main-content, filter section aria-label, footer aria-label
- **SVG visualizations**: role="img" + descriptive aria-label on all 4 viz + TimelineMarkers
- **VisualizationToggle**: role="tablist", buttons get role="tab" + aria-selected + aria-controls
- **Viz panel**: id="viz-panel", role="tabpanel", aria-label
- **FilterPills**: role="group", aria-label, aria-pressed on each toggle
- **FloatingNav**: aria-current="page" via usePathname. Inline pill nav at all sizes (no hamburger menu)
- **HeroSection**: aria-hidden on decorative elements, aria-label on download link
- **ContactSection**: aria-required on form fields, role="alert" on error, role="status" on success, aria-hidden on honeypot
- **ExperienceCard**: aria-label on "View" links with project name, aria-label on tech pills
- **ExperienceSection**: aria-live="polite" on filtered results
- **ProjectCard**: aria-label on links including project title
- **Decorative elements**: aria-hidden on gradients, circles, timeline dots/lines, scroll indicator

### T31 Detail — Performance Optimization (Complete)

- Build clean: 0 warnings, all pages statically generated (SSG)
- `/` = 156 kB first load (gzipped) — healthy
- `/portfolio` = 146 kB first load (gzipped) — healthy
- CSS = 25 kB raw — excellent
- next.config.ts updated: reactStrictMode, poweredByHeader: false, AVIF image format
- No unused dependencies, Tailwind purge working correctly
- Deferred (P2/P3): dynamic imports for vizs, lazy loading below-fold, font weight subsetting

## Additional Fixes
| Item | Description | Status |
|------|-------------|--------|
| F01 | Add favicon (`src/app/icon.svg` — DB initials on terra cotta) | Done |
| F02 | Initialize git repository + initial commit (`fb6a036`) | Done |
| F03 | Create `docs/STATUS.md` project status document | Done |
| F04 | Create `docs/tasks.md` task tracker | Done |

### T32 Detail — Final QA (Complete)

Browser-based visual QA across all breakpoints using Playwright:
- **Desktop (768px+)**: Hero, all 4 viz tabs, filters, experience cards, contact form, footer — all render correctly
- **Tablet (768px)**: 2-column contact layout, viz labels visible, FloatingNav with horizontal links
- **Mobile (375px)**: Clean text wrapping, icon-only viz tabs, horizontal scroll filter pills, stacked contact
- **Extreme mobile (320px)**: No overflow, text wraps cleanly, CTA fits within viewport
- **Visualizations**: Career Path, Skills, Industries, Tech Stack — all 4 render and switch correctly
- **Filter pills**: Toggle works, experience cards filter correctly (tested Apps & Gaming)
- **Links verified**: PDF download (200), portfolio route (200), OG image route (200), mailto, LinkedIn
- **Accessibility snapshot**: Skip-to-content, tablist/tab/tabpanel, aria-pressed, role="group", role="img", landmarks — all present in DOM

## Post-Launch UI Fixes
| Task | Description | Status |
|------|-------------|--------|
| U01 | Fix FloatingNav overlapping sticky filter bar — changed `top-0` to `top-[68px]` in `page.tsx` | **Done** |
| U02 | Fix chart label "AI & Innovation Focus" → "AI & Technology Focus" in `skills.ts` | **Done** |
| U03 | Reduce RoleEvolution chart horizontal padding (60px → 20px) + smart text anchoring for edge labels | **Done** |

### T33 Detail — Merged Skills & Tech Stack (Complete)

Merged "Skills" (bar chart, T16) and "Tech Stack" (timeline, T18) into a single "Skills & Tech Stack" tab:
- **Data**: Replaced `skillCategories` (4 categories, 20 skills with levels) and `techTimeline` (12 years of tech adoption) with `skillsTechCategories` (7 categories, 77 skills as flat string arrays)
- **Component**: New `SkillsTechStack.tsx` — interactive category filter pills at top, color-coded skill tags below organized by category section
- **Categories**: Data/Analytics (13), Marketing Platforms (8), Cloud/Infrastructure (10), AI/LLM Tools (8), Developer Tools (22), Workflow Automation (6), Generative Media (10)
- **Colors**: 4 existing (teal, coral, amber, lavender) + 3 new (sky #5B8DB8, rose #D4697A, emerald #4A9B6E) — inline styles, not Tailwind config
- **Interactivity**: Click category filter to isolate; click again or "All" to reset. AnimatePresence for smooth transitions.
- **Toggle**: VizType reduced from 4 to 3 options. Combined icon (grid + code bracket).
- **Deleted**: `SkillsProgression.tsx`, `TechStack.tsx`
- **Verified**: Build clean, tested at 375px + 1280px, category filtering works

## Phase 9: Collaboration Page
| Task | Description | Status |
|------|-------------|--------|
| T34 | Build Collaboration page (`/collaboration`) with service offerings | **Done** |
| U04 | Fix RoleEvolution label overlap (node 0 vs node 1) | **Done** |
| U05 | Fix RoleEvolution labels touching circle nodes (increase offsets) | **Done** |

### T34 Detail — Collaboration Page (Complete)

New `/collaboration` route with service offerings from `docs/Offering.md`:
- **Data**: `src/data/offerings.ts` — 10 core offerings (typed with audience/outcome/deliverables), 3 packages (Audit/Build/Operate), 4 add-ons, 3 working principles, 4 tool categories
- **Components**: `OfferingCard.tsx` (accordion via Framer Motion AnimatePresence, `border-l-4` accent, numbered badge), `OfferingsGrid.tsx` (2-col at lg), `PackageCards.tsx` (3-col at md, accent top stripe, checkmark items, add-ons section), `WorkingStyleSection.tsx` (3-col principle cards, tool pills by category)
- **Page**: Server component — hero, Core Offerings, Simple Packages + Add-ons, Working Style + Tooling, CTA (matching portfolio)
- **Nav**: Added "Collaboration" to FloatingNav, generalized `isCurrent` with `startsWith('/')`
- **Build**: 148 kB first load, SSG, responsive at 375px + 1280px, all accordions tested

### U04–U05 Detail — RoleEvolution Label Fixes (Superseded by U06–U09)

- **U04**: Originally forced node 1 above. Superseded by U06 year-proportional rework.
- **U05**: Originally adjusted offsets. Superseded by U06 rework with new offset scheme.

## Phase 10: UI Rework (committed at `b5e26ea`)
| Task | Description | Status |
|------|-------------|--------|
| U06 | RoleEvolution year-proportional positioning | **Done** |
| U07 | FloatingNav always visible (remove scroll threshold) | **Done** |
| U08 | Hide portfolio from navigation (preserve files for v2) | **Done** |
| U09 | HeroSection: hide standalone TimelineMarkers when role viz active | **Done** |
| U10 | RoleEvolution: aligned timeline below chart + label overlap fix | **Done** |

### U06 Detail — RoleEvolution Year-Proportional Positioning

Major rework of RoleEvolution chart:
- **X positioning**: `yearToX(year) = padding.left + ((year - 2014) / 11) * chartW` — nodes at actual year positions instead of evenly spaced
- **SVG dimensions**: 900×440, padding top=70, right=20, bottom=70, left=20

### U10 Detail — Aligned Timeline + Label Overlap Fix

- **Timeline moved below chart**: Removed SVG-integrated timeline. Added HTML timeline below SVG inside same scrollable container, using `yearToX()` percentages for alignment with chart nodes.
- **Per-node label placement**: Replaced generic even/odd rule with `labelPlacements` array. Each node has custom `dx`, `titleDy`, `subtitleDy`, `anchor`. Bunched nodes (1-4) use diagonal placement (above-left or below-right) to keep text clear of circles and bezier curves. Nodes 5-6 use standard above.
- **Node 1 special case**: Too close to SVG left edge for `textAnchor="end"` — placed below-right instead of above-left.

### U07 Detail — FloatingNav Always Visible

- Removed `visible` state (was `useState(false)`)
- Removed scroll listener (triggered at `window.innerHeight * 0.6`)
- Replaced `motion.nav` + `AnimatePresence` wrapper with plain `<nav>`
- Removed "Portfolio" link from nav links array
- Mobile dropdown animation preserved (still uses `motion`/`AnimatePresence`)

### U08 Detail — Portfolio Hidden

- Removed "Portfolio" link from FloatingNav `navLinks` array
- Removed "Portfolio" link + separator from Footer
- Removed unused `Link` import from Footer
- Page files (`src/app/portfolio/`, `src/components/portfolio/`, `src/data/portfolio.ts`) preserved

## Pre-Launch Checklist
| Item | Description | Status |
|------|-------------|--------|
| L01 | Set real Formspree form ID in `ContactSection.tsx` | **Done** |
| L02 | Add Open Graph image (`opengraph-image.png`) | **Done** |
| L03 | Set up Vercel project + custom domain (dbenger.com) | **Done** |
| L04 | Add company logos to experience cards | **Done** (committed at `2d65169`) |
| L05 | Set up git remote + push | **Done** |

### L04 Detail — Company Logos (Complete, committed at `2d65169`)

Added company logos inline with job titles in experience card headers:
- **Logos**: `public/logos/` — google.png, henkel.png, loreal.png, q-agency.png, ai.png
- **Data**: Added `logo?: string` to `ExperienceEntry` interface, logo paths on all 8 entries
- **Component**: `ExperienceCard.tsx` renders `<img>` with `h-7 w-auto max-w-[80px] object-contain` in flex row with job title `<h3>`
- **Decision**: Used `<img>` instead of `next/image` — `next/image` produces dimension mismatch warnings when logos have varying aspect ratios. ESLint `no-img-element` suppressed with disable/enable block.
- **gitignore**: Added `!public/logos/*.png` exception
- **Build**: Clean (0 warnings), first load JS dropped from 162kB to 156kB (no `next/image` import)

## Phase 11: UI Tweaks (committed at `2d65169`)
| Task | Description | Status |
|------|-------------|--------|
| U11 | Move company logo from company name row to job title row | **Done** |
| U12 | HeroSection: remove bottom padding below "Scroll to explore" (`py-20` → `pt-20 pb-0`) | **Done** |
| U13 | Collaboration tooling: expand Marketing Measurement (9 tools) and AI & Automation (37 tools) | **Done** |

### U13 Detail — Collaboration Tooling Update

Updated `toolCategories` in `offerings.ts`:
- **Marketing Measurement** (was 5 tools → 9): Removed SKAdNetwork. Added Meta Ads, App Campaigns, GA4, Firebase, Apple Search Ads. Split MMP integrations into separate Adjust and AppsFlyer pills.
- **AI & Automation** (was 8 tools → 37): All AI/dev/automation tools from resume — AI platforms (ChatGPT, Gemini, Claude, Manus, Perplexity, NotebookLM, Google AI Studio, Notion AI), developer tools (Claude Code, Cursor, Codex, Codex CLI, Gemini CLI, Firebase Studio, Antigravity, Lovable, Replit, V0, Bolt.new, Jules, AMP, Devin, Factory, Linear, Warp), automation (n8n, Make.com, LangGraph, CrewAI, Zapier, Gumloop), generative media (ElevenLabs, Descript, Artlist, Higgsfield, Granola, Wispr Flow, ChatPRD, Text-to-Image/Video/Image-to-Video Models).

## Phase 14: Mobile Layout Fixes (committed at `1f47fd8`)
| Task | Description | Status |
|------|-------------|--------|
| U14 | RoleEvolution chart fits viewport — remove min-w-[500px] and horizontal scroll | **Done** |
| U15 | FloatingNav inline pill nav — replace hamburger with responsive horizontal links | **Done** |

### U14 Detail — RoleEvolution Mobile Fit
- Removed `min-w-[500px]` from SVG element and timeline div
- Removed `overflow-x-auto`, `-mx-2 px-2`, `scrollbar-hide` from wrapper div
- SVG scales naturally via `viewBox="0 0 900 440"` + `preserveAspectRatio="xMidYMid meet"`

### U15 Detail — FloatingNav Inline Pill Nav
- Removed mobile hamburger menu (button, dropdown, AnimatePresence)
- Single horizontal pill nav at all breakpoints with responsive sizing
- Base: `text-xs px-2.5 py-1 gap-0.5` → sm: `text-sm px-4 py-1.5 gap-1`
- Removed unused imports: `useState`, `useEffect`, `motion`, `AnimatePresence`, `cn`
- Net change: −87 lines, +7 lines

## Phase 15: Data & Content Fixes (committed at `648994d`, `d083605`)
| Task | Description | Status |
|------|-------------|--------|
| U16 | Fix Google Analytical Consultant Intern dates (Jan 2017 – Aug 2017) | **Done** |
| U17 | Update downloadable resume PDF to V3 | **Done** |

## Phase 16: Mobile Spacing Polish (committed at `6823438`, `fb4ece0`)
| Task | Description | Status |
|------|-------------|--------|
| U18 | HeroSection bottom padding — `pb-0` → `pb-12` for scroll indicator gap | **Done** |
| U19 | Mobile nav + chart spacing — tighter nav padding, reduced hero/card padding for larger chart | **Done** |

### U19 Detail — Mobile Nav + Chart Spacing
- FloatingNav: link padding `px-2.5` → `px-2` on mobile (both nav links and PDF button)
- HeroSection: section padding `px-6` → `px-4 sm:px-6` on mobile
- Viz panel card: padding `p-4` → `p-2 sm:p-6 md:p-8` on mobile
- Net ~32px more rendering width for Career Path chart on mobile
- Desktop (`sm:` and up) unchanged

## Phase 17: Anchor Scroll Fixes (committed at `9ce59d3`, `e2d7434`)
| Task | Description | Status |
|------|-------------|--------|
| U20 | Contact anchor scroll — add `scroll-mt-[140px]` to `#contact` section | **Done** |
| U21 | Experience anchor scroll — add `scroll-mt-[140px]` to `#experience` section | **Done** |

### U20–U21 Detail — Anchor Scroll Offset
- **Problem**: Tapping "Contact" or "Experience" nav links on mobile scrolled the section heading behind the fixed FloatingNav (~60px) + sticky filter bar (~80px at `top-[68px]`).
- **Fix**: Added `scroll-mt-[140px]` to both `<section id="contact">` in `ContactSection.tsx` and `<section id="experience">` in `ExperienceSection.tsx`.
- **Verified**: Tested on 375px mobile viewport via Playwright — "Get in Touch" and "Experience" headings now fully visible after nav click.

## Phase 18: Ebook / Case Study Page (committed at `4095704`, updated at `6cfa572`)
| Task | Description | Status |
|------|-------------|--------|
| T35 | "How I Built This" ebook page (`/how-i-built-this`) + hero button | **Done** |

### T35 Detail — Ebook Page (Complete)

New `/how-i-built-this` route rendering the ebook case study (`docs/ebook-building-dbenger-com.md`):
- **Page**: `src/app/how-i-built-this/page.tsx` — server component with metadata, FloatingNav, Footer (follows collaboration page pattern)
- **Content**: `src/components/ebook/EbookContent.tsx` (~600 lines) — client component with all 12 sections:
  - Inline helpers: `CodeBlock` (dark theme with optional file label), `Callout` (coral-bordered blockquote), `SectionTitle`, `SubTitle`
  - Table of Contents with anchor links to each section
  - Styled tables, ordered/unordered lists, code blocks, color swatch grid, stats metric grid
  - Framer Motion `whileInView` scroll animations on each section
  - Footer CTA: "View the Live Site" + "View Source on GitHub"
- **Hero button**: Subtle pill link "How I build this Web App" added above `<h1>` in `HeroSection.tsx`. Uses `text-xs font-medium text-warm-500 bg-warm-100 border border-warm-200 rounded-full` styling with coral hover.
- **Navigation**: Page NOT in FloatingNav — accessible only via hero button
- **Build**: 0 warnings, 17 kB component, 158 kB first load JS, SSG
- **Content**: Article uses `max-w-3xl` for comfortable reading width; no markdown renderer dependency (all JSX)

## Phase 19: AI Chatbot (committed at `6cfa572`)
| Task | Description | Status |
|------|-------------|--------|
| T36 | "Ask Dominik's AI" chatbot — Gemini 3 Flash Preview (Google AI Studio), SSE streaming, ChatWidget in layout | **Done** |

### T36 Detail — AI Chatbot (Complete)

"Ask Dominik's AI" — an AI-powered chatbot available on all routes:
- **API**: `src/app/api/chat/route.ts` — POST handler with Gemini 3 Flash Preview (`gemini-3-flash-preview`) via Google AI Studio, SSE streaming via ReadableStream, in-memory rate limiting (100/day/IP, 20 messages/session)
- **Knowledge Base**: `src/data/chatbot-knowledge.ts` — structured text (~5K tokens) consolidating resume, experience, skills, offerings, and projects. System prompt with personality rules and guardrails. Explicit plain-text formatting rules (no markdown).
- **Sanitization**: `src/lib/sanitize.ts` — input trimming/length enforcement, prompt injection detection (regex patterns for common injection attempts)
- **Widget**: `src/components/chat/ChatWidget.tsx` — FAB button (coral, bottom-right, z-[60]) + sliding panel. Auto-opens on desktop only (>= 640px); closed by default on mobile. Full-screen on mobile, 380x540 on desktop. Suggested questions, streaming bubbles, error retry, session limit message, contact CTA after 3+ exchanges. Client-side `stripMarkdown()` safety net strips residual bold/italic/headings/code/links.
- **Typing Indicator**: `src/components/chat/TypingIndicator.tsx` — 3 bouncing dots with staggered Framer Motion animation
- **Layout**: ChatWidget added to `src/app/layout.tsx` (after `{children}`, before `<Analytics />`)
- **Dependency**: `@google/generative-ai` added to package.json
- **Env**: `GEMINI_API_KEY` required in `.env.local` (dev) / Vercel settings (prod)
- **Analytics**: Structured `console.log` for Vercel Logs (`_source: "chat"` — message, error, rate_limit, blocked events)
- **Build**: 0 warnings, `/api/chat` = dynamic route, all other pages remain SSG
