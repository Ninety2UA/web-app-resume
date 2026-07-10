# Implementation Patterns Digest — Cycling Outreach Site (inheriting the amazon-application chassis)

**Inherit from `amazon-application`** (newer, stronger chassis) and **borrow three things from `job-application`** (dual chat mount, pathname-aware starters, the role→content-layer precedent). Where they diverge, amazon wins: it has streaming SSE chat with retry+rate-limit, an OKLCH semantic-token system on shadcn/Base UI, a lazy-loaded slug registry, and typed `src/data/` contracts. `job-application` is pre-shadcn (hand-rolled UI, hex tokens, non-streaming chat, eager-imported `Rec1–10MVP` keyed by number).

## 1. App structure & routing

`amazon-application/src/` tree (2 levels):
- `app/` — `page.tsx` (home), `analysis/page.tsx`, `prototypes/page.tsx` (grid index), `prototypes/[slug]/page.tsx` (detail), `about/page.tsx`, `api/ai/chat/route.ts`, `layout.tsx`, `globals.css`, `robots.ts`, `opengraph-image.tsx`, `not-found.tsx`, `favicon.ico`.
- `components/` — `layout/` (SiteNav, SiteFooter), `home/`, `analysis/`, `about/` (page-section components), `charts/chart-theme.tsx`, `prototypes/` (PrototypeDetail, MVPPanel, mvp-registry, AmcSqlBlock + `mvps/` = 6 client MVPs), `chat/` (ChatProvider, ChatWidget), `ui/` (21 shadcn/Base-UI primitives).
- `data/` — `types.ts`, `prototypes.ts`, `fit.ts`, `stats.ts`, `analysis.ts`, `about.ts`, `knowledge.ts`.
- `lib/` — `format.ts`, `utils.ts` (`cn`).

**layout.tsx** (`amazon-application/src/app/layout.tsx:11-27,61-83`): self-hosted Switzer via `next/font/local` (4 weights → `--font-switzer`) + `JetBrains_Mono` via `next/font/google` (→ `--font-jetbrains`); `<html className="dark …">` hard-codes dark; body wraps `ChatProvider > SiteNav + main#main + SiteFooter + ChatWidget`, then `<Analytics/>` (`@vercel/analytics/next`). `metadata` uses title template `"%s · …"`, `metadataBase`, openGraph/twitter, `icons.icon:"/icon.svg"`; separate `viewport` export with `themeColor`.

**Home composition** (`src/app/page.tsx:13-25`): `<noscript>` style forces `[data-reveal]{opacity:1}`, then `Hero → StatsStrip → RoleDecoded → TranslationTable → PrototypeIndex → ClosingCta` — sections are ordered components, each self-contained.

**SiteNav** (`src/components/layout/SiteNav.tsx:19-32`): `"use client"`, `NAV_LINKS` const array, `usePathname()` active-state, sticky `bg-background/95`, skip-link, mobile `Sheet`. Resume href const at top.

## 2. Chat (the strong pattern to inherit)

**Route** `amazon-application/src/app/api/ai/chat/route.ts`:
- `export const dynamic = "force-dynamic"; export const maxDuration = 30;` (`:4-5`).
- Endpoint `…/gemini-3-flash-preview:streamGenerateContent?alt=sse` (`:8`).
- `SYSTEM_INSTRUCTION` template = persona + HARD RULES + `KNOWLEDGE` interpolated (`:10-28`); knowledge lives separately in `data/knowledge.ts`, persona/rules in the route.
- **Degradation**: missing/`YOUR_`-prefixed key → 503 JSON `{error}` (`:76-81`).
- **Rate limit**: in-memory `Map` bucket per IP, 10 req/60s, `x-forwarded-for` key, opportunistic GC when `size>500` (`:30-50,83-90`).
- Input hardening: message `.slice(0,500)`, history `.slice(-10)` each `.slice(0,1000)`, role mapped `assistant→model` (`:59-109`).
- `generationConfig: { temperature:0.6, maxOutputTokens:1024, thinkingConfig:{ thinkingBudget:128 } }` and **`system_instruction` snake_case** (`:114-124`).
- **SSE re-emit**: reads upstream stream, parses `data:` lines, enqueues only `part.text && !part.thought` (filters thinking), fallback text if nothing sent; returns `text/plain` with `Cache-Control:no-cache`, `X-Accel-Buffering:no` (`:139-202`).

**Client** `src/components/chat/ChatProvider.tsx`: context exposes `messages, isOpen, isStreaming, error, setIsOpen, sendMessage, retry` (`:17-28`); `streamReply` fetches then reads `res.body.getReader()` appending chunks to a trailing assistant bubble (`:50-82`); `run` drops empty placeholder on error and stores `failedTextRef` for `retry` (`:84-132`). `ChatWidget.tsx`: framer-motion FAB↔panel, auto-open once/session desktop-only after 2.5s via `sessionStorage` (`:39-49`), `STARTERS` const, `aria-live` pending state, `useReducedMotion` guards.

**Borrow from `job-application`** for a multi-page site:
- **Dual mount**: `EmbeddedChat.tsx` (inline card, on home) + `ChatWidget.tsx` FAB **hidden on home** (`job-application/src/components/layout/ChatWidget.tsx:70,76`).
- **Pathname-aware starters**: `suggestedQuestions: Record<string,string[]>` keyed by route + `getSuggestions()` prefix-match for detail pages (`ChatWidget.tsx:8-40`).
- Its route is **non-streaming** (`:generateContent`, client reads `data.text` — `job-application/src/components/layout/ChatProvider.tsx:46-47`) — do NOT copy that; keep amazon's SSE.

## 3. Prototype registry system

**Registry** `amazon-application/src/components/prototypes/mvp-registry.tsx` (`"use client"`): `mvpBySlug: Record<string, ComponentType>` where each value is `dynamic(() => import("./mvps/Xyz"), { ssr:false, loading })` (`:20-45`); `loading` = `MvpSkeleton` (three `<Skeleton>` bars, `:7-17`). Exports `MvpHost({slug})` — **the client host a server component mounts** because server components can't index a client-exported map (`:47-52`; rule in AGENTS.md `:58`). Slug strings are a fixed contract.

**Detail shell** `PrototypeDetail.tsx` (server component): breadcrumb + `NN/NN` counter → header/quote → two-col problem/what-it-shows → `<MvpHost slug={p.slug}/>` full-width → `<AmcSqlBlock sql={p.amcSQL}/>` → evidence list → method-note aside → wrap-around prev/next pager computed by index modulo (`:19-22,86-171`).

**Index grid** `src/app/prototypes/page.tsx`: maps `prototypes` to Link cards, `ICONS: Record<string,LucideIcon>` lookup by `p.icon` string (`:22-29,53-86`).

**Static params** `prototypes/[slug]/page.tsx`: `generateStaticParams` from `prototypes.map(slug)`, `generateMetadata` per-slug, `notFound()` on miss (`:9-37`) — every detail page prerenders static; only the chat route is dynamic.

**job-application 10-prototype precedent** (`PrototypeContent.tsx:7-29`): eager `import Rec1MVP…Rec10MVP` into `Record<number,ComponentType>`, routed by `[id]` (`prototypes/[id]/page.tsx`). Confirms 10+ MVPs work — but for 12 prototypes + 2 flagships, use amazon's **lazy `dynamic()`** registry, not eager imports.

## 4. Charts

`amazon-application/src/components/charts/chart-theme.tsx` (`"use client"`) exports: `CHART` (hex color map: orange/cyan/sand/violet/green/red + grid/tick/reference rgba, `:16-26`), `SERIES_COLORS` ordered array (`:29-35`), `AXIS` prop-bag (`stroke/tickLine:false/axisLine:false/fontSize:11/fontFamily:mono`, `:37-43`), `GRID` (`strokeDasharray:"3 6"/vertical:false`, `:45-49`), and `<ChartTooltip>` that filters non-finite entries and renders mono `tnum` rows with a `format` callback (`:53-97`).

**Usage** (`mvps/CohortLtvMvp.tsx:340-389`): `<CartesianGrid {...GRID}/>`, `<XAxis {...AXIS} tickFormatter/>`, `<YAxis {...AXIS} width={52}/>`, `<Tooltip content={<ChartTooltip format={fmt}/>}/>`, series colored from `SERIES_COLORS[i % n]` / `CHART.orange`. Every chart sits in `<MVPPanel title caption>` (ink-well card + mono kicker, `MVPPanel.tsx:18-37`). Recharts v3 caveat: `TooltipProps` has no `payload`/`label` — theme defines its own props (AGENTS.md `:60`).

## 5. Data contracts & the swappable "team layer"

`amazon-application/src/data/types.ts`: `Prototype` interface (`:37-58`) = `id, slug, title, subtitle, responsibility, insight, whatItShows, amcSQL, skillMapping[], methodNote, icon, tags[]`; plus `FitRow`, `StatItem`, `TranslationRow`, `AnalysisSection`. Data files are typed arrays feeding pages: `prototypes.ts` (268 lines, 6 rich entries with inline AMC SQL, `:10+`), `fit.ts` (270), `analysis.ts` (151), `stats.ts` (93), `about.ts` (40). **`knowledge.ts`** (71 lines) exports one `KNOWLEDGE` template string (role / profile / fit-matrix / stats / translation sections) injected verbatim into the chat system prompt — content-honesty single-source (`data/knowledge.ts:8+`).

**Team-layer precedent = `job-application/src/data/skills-roles.ts`**: `Role { id, title, contact, summary }[]` + `Skill { name, description, roles[] }[]`, and each `Prototype` carries `roles: string[]` tagging which entities it maps to (`data/prototypes.ts` shape; rendered as badges in `PrototypeContent.tsx:60-63`). This role-keyed indirection — one content object per entity, cross-referenced by id from prototypes/skills — is the exact structure a per-team swappable layer should generalize.

## 6. Build / deploy / quality

`amazon-application/package.json`: scripts `dev/build/start/lint` only — **no test setup, no test runner** in either repo. Deps: `next 16.2.10`, `react 19.2.4`, `@base-ui/react ^1.6`, `recharts ^3.9`, `framer-motion ^12.42`, `lucide-react ^1.23`, `shadcn ^4.12`, `class-variance-authority`, `clsx`, `tailwind-merge`, `tw-animate-css`, `@vercel/analytics ^2`. Dev: `@tailwindcss/postcss ^4`, `tailwindcss ^4`, `eslint 9 + eslint-config-next`. `next.config.ts` is empty scaffold; **no `vercel.json`**. `robots.ts` allows all. `opengraph-image.tsx` uses `next/og` `ImageResponse` (1200×630, inline styles, exported `alt/size/contentType`). `.env.local` = single `GEMINI_API_KEY`; README documents it as the only env var. `@vercel/analytics` mounted in layout. Deploy target `amazon.dbenger.com` via Vercel (README).

## 7. Governance / pitfalls that materially affect a rebuild

- **Next 16 rule** (AGENTS.md `:1-5`): "This is NOT the Next.js you know… Read the relevant guide in `node_modules/next/dist/docs/` before writing any code." `CLAUDE.md` is just `@AGENTS.md`.
- **params are async**: `params: Promise<{slug}>` must be awaited (`[slug]/page.tsx:32`).
- **Base UI ≠ Radix** (AGENTS.md `:56-57`): Slider `value` is `number|number[]` (handle both: `Array.isArray(v)?v[0]:v`, `CohortLtvMvp.tsx:261`); Select uses render-props; Button wrapper auto-sets `nativeButton=false` — don't remove.
- **Server can't index a client component map** → use `MvpHost` (AGENTS.md `:58`).
- **framer-motion reduced-motion**: never branch to `initial={false}` style-less render (SSR keeps `opacity:0`); keep one branch + `transition={{duration:0}}` (AGENTS.md `:59`).
- **Seeded randomness only** — `mulberry32(seed)` at MVP top, `Math.random()` forbidden (reproducible screenshots) (`CohortLtvMvp.tsx:44-52`; AGENTS.md `:62`).
- **Gemini**: `thinkingBudget:128` min, `system_instruction` snake_case, plain-text-only outputs, graceful no-key path (AGENTS.md `:63`).
- **Number locale**: `fmtNum` pinned `en-US`, currency `en-DE`; `fmtEur/fmtNum/fmtPct/fmtCompact` in `lib/format.ts` (AGENTS.md `:61`).
- **Content honesty**: all content in `src/data/*` incl. `knowledge.ts`; never hardcode in components except chart datapoints with source comments; every MVP carries a synthetic-data disclaimer line (AGENTS.md `:64-65`; `CohortLtvMvp.tsx:508-511`).
- **Design contract** (DESIGN.md): single dark OKLCH theme, one scarce accent, mono `.tnum` for all numerics, charts styled only via `chart-theme.tsx`, `max-w-6xl`/`max-w-3xl`, `py-16 sm:py-24`, no nested cards, one mono kicker per page, no gradient text/glassmorphism/border-left stripes. Tokens wired via `@theme inline` mapping `--color-*: var(--*)` + `:root` OKLCH values (`globals.css:7-93`).

## 8. Scale check

Largest MVP: `amazon-application/src/components/prototypes/mvps/AnomalyTriageMvp.tsx` = **938 LOC**; the six total 4,168 LOC (514–938 each). All are `"use client"`, self-contained, code-split via `dynamic(ssr:false)` so they never enter the server bundle or each other's chunk. **Internal MVP convention** (from `CohortLtvMvp.tsx`): docstring → `mulberry32` + module-level deterministic data build (`const COHORTS = buildCohorts()`) → `useState` controls → `useMemo` derived chart data keyed on controls → controls card + `MVPPanel`-wrapped charts → `aria-live` auto-insight block with inline mono `<Num>` spans → disclaimer. Formatters imported from `@/lib/format`.

---

## Chassis deltas the new site must ADD (amazon chassis lacks these)

1. **Heavy static datasets** — amazon's data is small hand-authored arrays (`prototypes.ts` 268 lines) + per-MVP seeded PRNG; a 20-year Grand Tour dataset needs a real committed data module (JSON/TS) and a load/index strategy the chassis has no precedent for.
2. **Flagship tool pages** — chassis has only home/analysis/prototypes/about section-pages; the 2 data-heavy explorer/console pages are a new route+component archetype (no template exists).
3. **Natural-language data querying** — chassis chat is a knowledge-grounded *advocate* (SSE text over a static `KNOWLEDGE` string); an AI *query layer over structured data* (NL→filter/aggregate→chart) is net-new. Closest hint is the static `QueryCard.tsx` (decorative SQL, not executable).
4. **Agentic briefing generator** — the race-stage "agentic" flow (multi-step tool/generation) exceeds the single-shot streaming chat route; needs a new API-route shape.
5. **12 prototypes (2×)** — use amazon's **lazy `dynamic()` registry**, not job-application's eager `Rec1–10` imports; the slug-map pattern scales but the file-name contract must be defined up front.
6. **Swappable team content layer** — generalize `job-application/skills-roles.ts` (role-keyed content + entity-tagged prototypes) into a team-keyed layer; amazon has no multi-entity/variant indirection at all.
7. **Second dynamic API route(s)** — only `api/ai/chat` exists; flagship AI features need their own routes (keep the force-dynamic + key-degradation + rate-limit template).
8. **Dual chat mount + pathname-aware starters** — port from job-application (`EmbeddedChat` on home, FAB elsewhere, route-keyed suggestions); amazon ships FAB-only.
9. **Data-viz beyond the 5-series theme** — `chart-theme.tsx` presets suit small MVP charts; historical/stage-profile visuals (maps, elevation, 20-yr series) will need theme extensions kept inside the single `chart-theme` source.
10. **Test/verification harness** — neither repo has any tests; two heavy data flagships + NL querying warrant at least data-integrity checks, which the chassis provides no scaffold for.

**Files to read first when planning:** `amazon-application/AGENTS.md`, `DESIGN.md`, `src/app/api/ai/chat/route.ts`, `src/components/prototypes/mvp-registry.tsx`, `src/components/charts/chart-theme.tsx`, `src/data/types.ts`, `src/components/prototypes/mvps/CohortLtvMvp.tsx` (canonical MVP), and `job-application/src/data/skills-roles.ts` + `src/components/layout/ChatWidget.tsx` (team-layer + dual-chat precedents).
