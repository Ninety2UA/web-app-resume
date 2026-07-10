# Grounding Dossier — Cycling Outreach Site (3rd job-outreach build)

Extraction only. Verbatim quotes + code snippets with `path:line` pointers. Three sibling repos by Dominik Benger. Repo roles: **web-app-resume** = general resume (dbenger.com, static HTML SPA); **job-application** = KLAR outreach (klar.dbenger.com, full Next.js — this is "klar"); **amazon-application** = Amazon AIP outreach (amazon.dbenger.com, full Next.js, the richest architecture).

---

## REPO 1 — web-app-resume (dbenger.com) — general resume site

Stack / architecture (CLAUDE.md):
- "Framework: Next.js 15 (App Router, TypeScript) — used for API routes + static HTML serving"
- "Frontend: Self-contained HTML (`public/site.html`) with CDN Tailwind CSS, vanilla JS, hash-based SPA routing"
- "AI Features: 4 server-side API routes proxying to Gemini 3 Flash Preview (Google AI Studio)"

The 4 AI routes (dir listing): `src/app/api/ai/{solution-matcher,experience-qa,outreach-drafter,agenda-builder}/route.ts` + shared `src/app/api/ai/knowledge.ts`.
- CLAUDE.md: "All 4 AI routes import `src/app/api/ai/knowledge.ts` which contains Dominik's full professional profile."
- knowledge.ts:1-6 `Comprehensive knowledge base about Dominik Benger. / Imported by all AI API routes for rich, grounded system prompts. / export const DOMINIK_CONTEXT = \`...\``

Design system (CLAUDE.md): "Aesthetic: Modern teal-accented with dark sections"; "Font: Plus Jakarta Sans"; "Brand palette: Teal scale — brand-500 `#14b8a6`". Note: this is the OLDER static-HTML approach; both outreach siblings deliberately diverged from it.

---

## REPO 2 — amazon-application (amazon.dbenger.com) — Amazon AIP outreach [PRIMARY MODEL]

### Stack (README.md:7-14, AGENTS.md:15-22, package.json)
- "Next.js 16 (App Router, TypeScript, server components by default)"
- "Tailwind CSS v4 with OKLCH semantic tokens, single committed dark theme"
- "shadcn/ui on Base UI primitives (`@base-ui/react`, not Radix)"
- "Recharts for all data visualization, styled through one shared chart theme"
- "framer-motion for entrance animations (reduced-motion respected)"
- "Gemini behind a server-side API route for the chat assistant"
- package.json deps: `@base-ui/react ^1.6.0`, `framer-motion ^12.42.2`, `lucide-react`, `next 16.2.10`, `react 19.2.4`, `recharts ^3.9.1`, `shadcn ^4.12.0`, `tailwind-merge`, `tw-animate-css`. Fonts: Switzer (self-hosted) + JetBrains Mono (next/font/google).

### Pages / routes (AGENTS.md:27, README.md:20)
- "/, /analysis, /prototypes, /prototypes/[slug], /about"
- `src/app/api/ai/chat/route.ts` — "Gemini SSE proxy (force-dynamic)"; `src/app/opengraph-image.tsx` — "1200×630 OG card (ImageResponse)"; `robots.ts`, `not-found.tsx`.

### Component structure (AGENTS.md:30-41)
```
├── layout/                # SiteNav, SiteFooter
├── home|analysis|about/   # page sections
├── prototypes/            # PrototypeDetail, AmcSqlBlock, MVPPanel, mvp-registry
│   └── mvps/              # 6 self-contained interactive MVPs (client)
├── charts/chart-theme.tsx # shared Recharts theme — single source of chart styling
└── ui/                    # shadcn (Base UI) components
data/                      # ALL content: fit.ts, stats.ts, prototypes.ts, analysis.ts, about.ts, knowledge.ts, types.ts
lib/format.ts              # EUR/number formatters (fmtEur, fmtNum, fmtPct, fmtCompact)
```

### Shared contracts — `src/data/types.ts` (the reusable content schema)
- types.ts:1-3 "Shared content types. Every data file and page component codes against these — keep changes coordinated across data/, app/, and components/."
- `FitRow` (types.ts:8-18): `requirement`, `quote` ("Fragment quoted from the job posting"), `category: "responsibility"|"basic"|"preferred"`, `evidence: string[]` ("Concrete resume proof points, with numbers"), `strength: "direct"|"adjacent"|"growth"`.
- `Prototype` (types.ts:37-58): `id, slug, title, subtitle, responsibility` ("Fragment from the job posting this maps to"), `insight` ("The real advertiser problem"), `whatItShows`, `amcSQL` ("AMC-style SQL that would power this for real"), `skillMapping: string[]` ("Resume evidence bullets"), `methodNote` ("Statistical technique + its limitation"), `icon` (lucide name), `tags: string[]`.
- Also `StatItem {value,label,context}`, `TranslationRow {google,amazon}`, `AnalysisSection {id,title,kicker?,body[]}`.

### Prototype registry — `src/components/prototypes/mvp-registry.tsx` (slug→lazy component)
- mvp-registry.tsx:19-20 "/** slug → interactive MVP component. File names are a fixed contract. */ const mvpBySlug: Record<string, ComponentType> = {"
- Pattern: each entry `dynamic(() => import("./mvps/XxxMvp"), { ssr: false, loading })` with a `MvpSkeleton`. Client host: `export function MvpHost({ slug }) { const Mvp = mvpBySlug[slug]; if (!Mvp) return null; return <Mvp />; }`
- AGENTS.md:58 pitfall: "server components cannot index into a map exported from a `use client` file... Use the `MvpHost slug=...` client host in `mvp-registry.tsx`."

### The 6 prototypes (README.md:36-41, prototypes.ts slugs)
1. `business-review-generator` — "Advertiser Business Review Generator — a QBR whose executive summary recomputes live as you change the period, strategic lens, and category benchmark."
2. `incrementality-lab` — "design a geo-holdout with a power curve, then watch simulated iROAS land well below last-click ROAS."
3. `sales-driver-decomposition` — "in-browser OLS over 104 weeks; toggle predictors and watch elasticities, R², and the euro contribution waterfall respond."
4. `ntb-ltv-cohorts` — "New-to-Brand & LTV Cohort Explorer — NTB cohort LTV curves and payback math... Subscribe & Save adoption slider."
5. `anomaly-triage` — "robust z-score detection plus a rule-based engine that ranks five root-cause hypotheses."
6. `flywheel-simulator` — "a 26-week system-dynamics loop of spend → sales rank → organic halo."
- README.md:43 "Each prototype page pairs the demo with the AMC-style SQL that would power it in production, a method note stating the technique's limitations, and the resume evidence it maps to."
- README.md:34 "All six share one synthetic advertiser — 'Voltkraft GmbH'... generated deterministically (seeded PRNG) so every number cross-references believably."

### Design system — DESIGN.md (the "impeccable design contract")
- DESIGN.md:5 "Single committed dark theme (no toggle). Deep Amazon-ink navy surface; Amazon smile-orange as the only saturated accent; cyan as the supporting data color... reads like a well-crafted internal analytics tool, not a marketing page."
- DESIGN.md:9 "All tokens in OKLCH, defined in `src/app/globals.css`. Use semantic tokens only... never ad-hoc hex in components."
- Tokens (DESIGN.md:13-21): `--background oklch(0.16 0.018 255)` ink-navy; `--primary oklch(0.77 0.16 65)` "Amazon smile orange — CTAs, active states, chart series 1"; `--chart-2 oklch(0.73 0.11 220)` cyan.
- DESIGN.md:23 "orange is scarce — one primary action per viewport, active nav item, lead chart series. Never orange body text."
- Typography (DESIGN.md:27-29): "Switzer (self-hosted) — display + body"; "JetBrains Mono — metrics, SQL, table numerics, chart ticks, kickers. Always with `.tnum`."
- Charts (DESIGN.md:37): "Shared theme in `src/components/charts/chart-theme.tsx` — CHART colors, AXIS/GRID prop bags, <ChartTooltip>. Grid: dashed horizontal only at 8% white... No chart borders, no drop shadows, no gradients."
- Layout (DESIGN.md:41-43): "Max content width max-w-6xl (pages), max-w-3xl for prose... Section spacing py-16 sm:py-24... No nested cards."
- Motion (DESIGN.md:47): "Framer Motion. Entrances: fade + 12–16px rise, 0.4–0.5s, ease-out-quart, stagger 0.05–0.08s... No continuous/looping motion... prefers-reduced-motion collapses everything to instant."
- Voice (DESIGN.md:51): "Confident, specific, no exclamation marks. Numbers in mono... 'Synthetic data' disclosure on every MVP."

### chart-theme.tsx (chart-theme.tsx:16-49)
- `CHART = { orange:"#f59e2b", cyan:"#5cb8e4", sand:"#d9c49a", violet:"#9d8cd6", green:"#5fc08b", red:"#e06c5c", grid:"rgba(240,244,250,0.08)", tick:"...0.55", reference:"...0.35" }`
- `SERIES_COLORS = [orange, cyan, sand, violet, green]`; `AXIS = {stroke:tick, tickLine:false, axisLine:false, fontSize:11, fontFamily:"var(--font-jetbrains),monospace"}`; `GRID = {stroke:grid, strokeDasharray:"3 6", vertical:false}`.

### Docs & deploy (AGENTS.md:10, README.md:5)
- "Not a cover letter: a business analysis, six working analytics prototypes, and a requirements-to-evidence fit map. Sibling project to klar.dbenger.com... Target domain: `amazon.dbenger.com`."
- Docs present: AGENTS.md, CLAUDE.md, DESIGN.md, PRODUCT.md, README.md, docs/STATUS.md, docs/tasks.md, docs/research/{job-posting.txt, fit-mapping.md, amazon-ads-research.md, prototype-specs.md}.
- AGENTS.md:1-5 top rule: "This is NOT the Next.js you know... Read the relevant guide in `node_modules/next/dist/docs/` before writing any code."
- Pitfalls (AGENTS.md:62-64): "Seeded randomness only in MVPs (mulberry32) — Math.random() breaks reproducible demos"; "Gemini: thinkingBudget:128 minimum, system_instruction snake_case, plain-text-only outputs, graceful error without GEMINI_API_KEY"; "Content honesty: German fluency is NEVER claimed; every MVP carries the synthetic-data disclaimer."

---

## REPO 3 — job-application (klar.dbenger.com) — KLAR outreach ["klar" confirmed]

Confirmation: `src/app/api/ai/klar-knowledge.ts`, `docs/brainstorms/2026-03-05-klar-application-brainstorm.md`, package.json name `"klar-application"`.

### Stack (package.json, CLAUDE.md:36-44)
- Deps: `next 16.1.6`, `react 19.2.3`, `recharts ^3.7.0`, `framer-motion ^12.35.0`, `@vercel/analytics`. NOTE: NO shadcn/Base UI here — hand-rolled `ui/{Badge,Card,ExpandableSection}.tsx`. Fonts: Satoshi (self-hosted).
- CLAUDE.md:42 "Fonts: Satoshi... (self-hosted or Fontshare — NOT Google Fonts, NOT Inter/Roboto/Plus Jakarta Sans)"; CLAUDE.md:44 "Deployment: Vercel (auto-deploy from GitHub, fallback: `npx vercel --prod`)".

### Structure (CLAUDE.md:46-71, 98-104; dir listing)
- Routes: `/`, `/analysis`, `/prototypes` (CLAUDE.md:102 "Card grid overview of all 10 prototypes"), `/prototypes/[id]/page.tsx`, `/about`. API: `src/app/api/ai/chat/route.ts`.
- CLAUDE.md:103-104 "/prototypes/1–5 → Cross-Role Strategy prototypes"; "/prototypes/6–10 → PO Marketing Measurement prototypes".
- Components: `layout/{FloatingNav,Footer,ChatProvider,ChatWidget,EmbeddedChat}`, `prototypes/{PrototypeContent, Rec1MVP…Rec10MVP}`, `sections/CompetitorTable`, `ui/{Badge,Card,ExpandableSection}`.
- Data: `src/data/{analysis.ts, prototypes.ts, skills-roles.ts}` + `src/app/api/ai/klar-knowledge.ts` (CLAUDE.md:63 "Shared knowledge base (resume + KLAR context + prototypes)").
- **10 prototypes** here (vs 6 in Amazon) — Rec1MVP…Rec10MVP. (Brainstorm originally scoped 5; shipped 10.)

### Prototype schema — `src/data/prototypes.ts:1-11` (DIFFERENT shape from Amazon)
```
export interface Prototype {
  id: number; title: string; subtitle: string;
  insight: string; opportunity: string; proposal: string[];
  skillMapping: string[]; roles: string[]; icon: string;
}
```
Titles (prototypes.ts): 1 "Attribution Confidence Score Dashboard", 2 "Paid Growth Playbook for B2B with B2C DNA", 3 "Customer Onboarding Flow Optimizer", 4 "Cross-Channel Creative Performance Analyzer", 5 "eCom Unity Community Conversion Pipeline", 6 "Attribution Model Comparator", 7 "Channel Saturation Curve Analyzer", 8 "Incrementality Test Planner", 9 "Privacy Signal Loss Simulator", 10 "Unified Measurement Framework".
- Each entry maps to `roles` (e.g. prototypes.ts:34 `roles: ["PO Marketing Measurement", "Senior eCom Manager"]`) — positioning flexible across the company's open roles.

### Design system (CLAUDE.md:115-128, globals.css:4-10)
- CLAUDE.md:123 "Primary accent: Emerald/green (KLAR brand-aligned, e.g., Tailwind emerald-500 `#10b981`)".
- globals.css tokens: `--background:#0a0a0a; --foreground:#fafafa; --accent:#10b981; --accent-hover:#059669; --muted:#a1a1aa; --card:#111113; --card-border:#1e1e22; --surface:#161618`. Plain hex CSS vars (NOT OKLCH — Amazon upgraded to OKLCH later).

### Brainstorm doc = template for THIS task (2026-03-05-klar-application-brainstorm.md)
- ":8-18 "What We're Building": "interactive Next.js web application that serves as Dominik Benger's job application to KLAR... Instead of a traditional cover letter, this is a working prototype." Deliverable list: "Landing/hero page; Interactive business analysis; N strategic recommendations, each with a fully interactive MVP prototype; 'Why [company] + Dominik' about page; Persistent AI chatbot with [company]-specific context (Gemini Flash)."
- :23-31 "Architecture: Full Next.js App Router" chosen over dbenger.com static HTML because "React components enable truly interactive MVPs with state management, data filtering, and chart animations."
- :86-95 "dbenger.com Patterns to Reuse: AI API route pattern (server-side Gemini Flash + shared knowledge base); professional quality bar; scroll animations (IntersectionObserver → adapted to React). NOT to Reuse: Static HTML SPA; CDN Tailwind; Plus Jakarta Sans; Teal palette."

---

## DOMINIK BENGER — profile (condensed, from web-app-resume knowledge.ts + amazon knowledge.ts)
- Based in Munich. domi@dbenger.com | linkedin.com/in/dombenger | dbenger.com. B.S. International Business & Marketing, Rochester Institute of Technology (2017).
- "eight years at Google in advertising analytics across four countries, then independent AI product work."
- **Senior Analytical Lead, Google LCS Northern Europe** (2021–25, Amsterdam): C-suite business reviews for global app/gaming advertisers; nine-figure quarterly ad revenue at 40% avg YoY growth; KPI scorecards, alerting, cohort/LTV in BigQuery + Looker; "daily performance engine" (automated pipelines, exec dashboards, standups); authored iOS SKAN Reporting Pack, open-sourced by Google (github.com/google/app-reporting-pack).
- **Technical Apps Lead, Google EMEA International Growth** (2018–21, Hamburg): 25+ advertisers, 55% avg YoY export growth; co-founded IGT program adopted by 1,500+ clients (+300% YoY investment); built "One-Stop Shop" BI platform, multi-billion USD coverage, 3,000+ daily/weekly users.
- **Account Manager, Google SMB Ad Sales** (2017–18, Dublin): 135%/157% of targets early; RLSA 87%→562%; trained 50+ EMEA/US reps.
- **Independent (Feb 2025–present, Munich):** "shipped 20+ products end-to-end across AI, analytics and PM tooling on an AI-native stack (Claude Code, Cursor, Codex, Gemini CLI, n8n, LangGraph, CrewAI) on GCP and AWS."
- Earlier: Q Agency (Zagreb, top-10 agency per Clutch); L'Oréal + Henkel marketing-analytics internships. "He has sat in all three seats: publisher, agency, advertiser."
- Skills: advanced SQL (BigQuery at production scale), Python, Looker; statistics/experimentation (A/B testing, LTV/cohort, incrementality); SKAdNetwork/privacy-era measurement; MMP integrations (Adjust, AppsFlyer); performance marketing (Google/Meta Ads, App Campaigns); AI/LLM tooling + workflow automation.
- Languages: "English (fluent), German (proficient), Croatian (native)." Personal interests incl. "road cycling" (web-app-resume knowledge.ts:85).
