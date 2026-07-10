# Cycling WorldTour Outreach Site — Flow & Edge-Case Analysis

**Spec:** `/Users/dbenger/projects/web-app-resume/docs/plans/2026-07-05-001-feat-cycling-worldtour-outreach-plan.md`
**Grounding chassis:** `/Users/dbenger/projects/amazon-application` (verified against `job-application` sibling patterns)
**Date:** 2026-07-05

Analysis of a requirements-only Product Contract from the end users' perspective — a GM (Milan Eržen, ~90s cold visit) and a performance director / fact-checker (Rod Ellingworth). Goal: surface missing flows, ambiguous requirements, and unspecified edge cases before implementation. Grounded in real sibling code; a concern already handled by the inherited chassis is not counted as a gap.

## What the chassis already handles (NOT flagged as gaps)

Confirmed by reading the sibling source:

- **Chat key-absence** — `api/ai/chat/route.ts` returns 503 + friendly message when `GEMINI_API_KEY` absent/placeholder (satisfies AE3).
- **Rate limiting** — in-memory per-IP bucket (10/min) in the chat route.
- **Streaming + retry UI** — SSE re-emit, thinking-part filtering, empty-response fallback; `ChatProvider` maps failures to an inline error + Retry button.
- **Mobile chat** — `fixed inset-0` full-screen on mobile, floating panel (`sm:`) on desktop; auto-open desktop-only.
- **Reduced motion** — `useReducedMotion()` throughout `ChatWidget`; framer-motion reveals collapse to `duration:0` (satisfies AE4).
- **Analytics** — `@vercel/analytics` in `layout.tsx` (satisfies R28).
- **Custom 404** — themed `not-found.tsx`.
- **Dynamic OG** — `opengraph-image.tsx` via `ImageResponse` (1200×630) + full `metadata`/`openGraph`/`twitter` in `layout.tsx`.
- **Mobile nav** — `SiteNav` Sheet drawer on mobile, inline on desktop, skip-to-content link, active states.
- **Prototype routing + loading** — `/prototypes/[slug]` with `generateStaticParams` + `generateMetadata`; `mvp-registry` uses `dynamic(import, { ssr:false, loading: <Skeleton/> })`.
- **Seeded synthetic data + honesty discipline** — mulberry32 seeded MVPs, synthetic-data disclaimers, honest-gap framing in `knowledge.ts`.

---

## 1. User Flows (walked from the actual users)

- **U1 — GM cold visit, phone, ~90s (A2):** taps a LinkedIn/email link on mobile → hero hook → the two flagship cards → forms a "worth a reply / worth forwarding" judgment. The flagships are dense desktop exploratory tools; on a phone in 90s he will *not* drive them.
- **U2 — Forward-to-colleague (A2→A3):** Eržen forwards *a specific thing* (an Atlas view, a Console briefing) to Ellingworth. This is F1's stated outcome and the whole conversion.
- **U3 — Fact-checker deep-dive (A3):** Ellingworth spot-checks equipment/roster/metrics against reality and stress-tests methodology; one falsifiable claim kills trust.
- **U4 — Flagship-as-product (any visitor):** first paint of a large dataset; NL query returns nothing/nonsense/out-of-range; weather down; stage with no analogue.
- **U5 — Concierge Q&A (A5):** in-domain cycling questions not in the knowledge base (hallucination boundary).
- **U6 — Second-team swap (A1/A4):** duplicate content layer → Visma version with zero component changes.
- **U7 — The send (A1):** OG preview renders in email/LinkedIn/WhatsApp; first-click load; Gemini quota state the day it's blasted out.

---

## 2. Gaps by severity

### CRITICAL

**C1 — Flagships have no mobile "lead view" / money shot.**
U1 is the primary flow, yet the Atlas (explore by edition/stage/team/rider) and Console are interaction-first desktop tools. "Fully responsive" (R25) ≠ deliverable in 90s on a phone with no interaction.
*Chassis default:* MVPs are all interaction-first `useState`; no precedent for a pre-composed default view.
*Need:* each flagship opens on a static, high-impact default view that lands with zero taps; exploration is progressive disclosure below it.

**C2 — Flagship value dies when Gemini is down / quota-exhausted — on the exact day the link is shared.**
R14 (Atlas NL→charts+prose) and R17 (agentic briefing) are AI-integral. AE3 covers key *absence*; nothing covers quota *exhaustion* (Google 429) — the single likeliest failure the day a public link is blasted to a network. `ChatProvider` maps every failure to "try again" + Retry, which hammers an exhausted quota.
*Chassis default:* friendly error only; no cached/pre-rendered AI output.
*Need:* precomputed example query results + one fully static example briefing so the money shot survives AI-down; a distinct quota-exhaustion UX (no retry-loop). Overlaps C1 — the precomputed showcase *is* the mobile lead view.

**C3 — No shareable/forwardable deep link for a specific flagship view.**
U2 is the entire goal, but the chassis has per-prototype URLs and **zero within-tool URL state** (all `useState`; no `useSearchParams`/`router.replace` anywhere in the sibling). Eržen cannot forward "this exact view/query/briefing" — Ellingworth opens a reset default.
*Need:* URL-encoded view state on both flagships (+ ideally per-view OG).

**C4 — Cost/abuse exposure across 3–4 expensive public AI endpoints.**
The chassis rate limit is in-memory, per-serverless-instance, resets on cold start — adequate for *one cheap* chat. Cycling adds Atlas NL (charts+prose), Console briefing (agentic/multi-step, expensive), concierge, maybe Race-Recon. A public link + scrapers = a real bill and the quota drain behind C2.
*Need:* shared durable rate limiting (per-IP + a global daily cap) and a hard spend ceiling across all routes, not per-endpoint memory buckets.

### IMPORTANT

**I1 — "9+ years at Google" is the sharpest fact-check landmine and directly contradicts R6.**
LinkedIn shows Aug 2017–Feb 2025 (~7.5y); success criteria say "no claim falsifiable by someone who knows." A 10-second check by Eržen/Ellingworth finds it. It is a recorded decision — but note the sibling `knowledge.ts` already says **"eight years"**: a fact-checker viewing both sites sees 8 vs 9+. At minimum, reconcile the number across sites and the concierge KB.

**I2 — Concierge hallucination boundary is far harder here than in the sibling.**
Amazon's scope was narrow (Dominik + Amazon Ads). The cycling KB includes "cycling research" (R10) — a *broad* domain. "Tiberi's FTP?" / "Bahrain's 2027 signings?" are in-domain but not-in-KB, so the model may synthesize from training rather than decline (AE6's salary example is the *easy* case).
*Need:* an explicit "never state cycling facts not in the KB even if you think you know them" rule + an adversarial in-domain test set.

**I3 — Team facts have no on-page "as-of" dating or shelf-life.**
R7's insider facts (Tiberi, L. Martinez, Mohorič, Bianchi/Power2Max/Shimano) drift with transfer season; send window is Aug 2026 and a PD may open the forward weeks later. A stale roster fact reads as "not actually inside the sport" — the inverse of the insider test. Dependencies says "re-verify before send" but nothing dates it on-page.
*Need:* visible "as of July 2026" stamps on team-fact surfaces + a pre-send re-verify checklist.

**I4 — Team-swap "zero component changes" (R22/AE5) is already violated.**
The concierge persona/framing lives in the **route** (sibling `SYSTEM_INSTRUCTION` hardcodes the role/company), and the analysis page is bespoke-per-section (Bahrain's Project Lenny / nation-brand-ROI angle is structurally unlike Visma, who already runs a Control Room) with inline stats in the component (e.g. `GERMANY_STATS`). Swapping teams edits routes/components.
*Need:* move *all* team framing — concierge system instruction, analysis section config, OG content, `metadataBase`, 404 copy — into the data layer; prove R22 with a dry-run Visma swap.

**I5 — Atlas NL empty/nonsense/out-of-range state unspecified.**
R14 covers success only. Unparseable queries, out-of-Atlas asks ("2005 power data," "who wins 2027"), and empty result sets are a different pipeline than chat (NL→data-query→chart).
*Need:* a defined empty/redirect state offering example queries; chassis chat-decline is a start, not sufficient for a chart-rendering tool.

**I6 — Atlas estimates need calibration against famous known numbers.**
R13's per-figure "modeled estimate" + error band does not save an estimate that contradicts a community-famous climb W/kg an expert already ballparks — it reads as "his model is wrong," failing the Ellingworth test *with* the label present.
*Need:* a sanity pass against known reference cases; show the method agreeing with a known benchmark on the explainer.

### MINOR

- **M1** — Console "no historical analogue" state (novel 2026 stage) undefined (R16 leans on analogues); define the fallback.
- **M2** — All pages share the root OG (prototype pages get title/desc only); a per-flagship OG would strengthen U2 — cheap, `generateMetadata` already exists.
- **M3** — `robots.ts` = allow-all; `metadataBase`, OG copy, and 404 are Amazon-hardcoded in the sibling — trivial per-team but must be on the swap checklist so they aren't missed.

---

## 3. Questions (stakes + default assumption)

1. **Atlas depth + live-vs-precompute** (spec's own open Q) — gates C1 **and** C2.
   *Default:* precompute a curated showcase set as static JSON (doubles as mobile lead view + AI-down fallback); live NL query is a layer on top, never the only path.
2. **Is the hero/OG identity team-BRANDED ("Bahrain") or team-NEUTRAL (Dominik + cycling)?**
   *Stakes:* forward-safety, swap cost, cached-preview leakage across teams. *Default:* team-neutral primary OG; team name in title/description only.
3. **Console stage: fixed showcase vs user-selectable** (spec's open Q).
   *Stakes:* AI cost, no-analogue edge surface, demo reliability. *Default:* one hand-picked stage fully precomputed; others opt-in live.
4. **Should `bahrain.dbenger.com` be `noindex`?**
   *Stakes:* a named-team pitch surfacing in search (rivals/press) is more sensitive than the Amazon role. *Default:* follow sibling (indexable) but confirm with Dominik.
5. **Reconcile "9+ years" vs sibling "eight years" vs documented ~7.5** (see I1).
   *Default:* keep Dominik's directive on this site but align the phrasing across the concierge KB and any cross-referable sibling.

---

## 4. Recommended next steps

1. Define a **"lead view" contract** per flagship (static default money-shot + progressive disclosure) — gates mobile U1. *(C1)*
2. **Precompute a showcase set** (Atlas example views/queries + one full Console briefing) as static data — one artifact serves the mobile money shot and the AI-down fallback. *(C1, C2)*
3. Add **URL view-state** (+ optional per-view OG) to both flagships for the forward moment. *(C3, M2)*
4. **Move all team framing into the data layer** and write the swap checklist; verify R22 with a dry-run Visma swap. *(I4, M3)*
5. Add **shared durable rate limiting + a global daily AI spend cap**, and a quota-exhaustion UX distinct from key-absence. *(C4, C2)*
6. Build an **adversarial concierge test set** + tighten the decline rule; add **"as of" dating** and a pre-send fact re-verify pass. *(I2, I3)*

---

## Load-bearing files referenced

- Spec: `/Users/dbenger/projects/web-app-resume/docs/plans/2026-07-05-001-feat-cycling-worldtour-outreach-plan.md`
- `/Users/dbenger/projects/amazon-application/src/app/api/ai/chat/route.ts` — in-memory per-instance rate limit + key-absence 503
- `/Users/dbenger/projects/amazon-application/src/components/chat/ChatProvider.tsx` — retry-on-any-failure (hammers exhausted quota)
- `/Users/dbenger/projects/amazon-application/src/components/prototypes/mvp-registry.tsx` — dynamic+skeleton loading; no within-tool URL state
- `/Users/dbenger/projects/amazon-application/src/app/opengraph-image.tsx` — hardcoded team, root-only OG
- `/Users/dbenger/projects/amazon-application/src/app/robots.ts` — allow-all indexing
- `/Users/dbenger/projects/amazon-application/src/data/knowledge.ts` — "eight years" phrasing; route-vs-data framing split
