---
artifact_contract: ce-unified-plan/v1
artifact_readiness: implementation-ready
execution: code
product_contract_source: ce-plan-bootstrap
type: feat
created: 2026-07-24
title: "feat: Creative Health client case-study section on the systems page"
---

# feat: Creative Health client case-study section on the systems page

**Target repo:** `langdock-application` (`~/projects/langdock-application`, private
`Ninety2UA/langdock-application`, live at langdock.dbenger.com, permanent noindex).
This plan lives in the `web-app-resume` repo by the established convention for
langdock plans; every repo-relative path below is relative to the **langdock**
repo root.

---

## Summary

Add a **Creative Health** case-study section to langdock's `/systems` page: the
story of a real client build (a creative "trading desk" for a mobile-app growth
advertiser), the public live demo anyone can operate, and the Google ADK
architecture underneath. It renders in **Direction A** (native deep-dive, chosen
from three mockups over spotlight/console variants), placed **after the Ninety2
deep-dive and before the closing ask**, in the same grammar as
`Ninety2DeepDive`. The section leads with **real screenshots of the tool** (the
Creative decision map, then the Diagnosis / Action Plan / governed chatbot), a
plain-language architecture walk (the deterministic engine vs. the AI narration,
three ADK agents, the governance ladder), a live-demo CTA with step-by-step
access, and a synthetic-data note.

All content is **public-safe**: the real client name and every internal
identifier stay off the page, masked as the fictional "Pip's Peaks," enforced by
a code gate that mirrors the source project's own confidentiality scrub-gate.

---

## Problem Frame

The systems page proves Dominik's **internal** agentic practice (Claude Code
Blueprint, Agent Triforge, PM OS, ninety2). It shows no **client-facing, shipped
product**. Creative Health is the strongest outward proof available: a real
client deliverable built on Google's Agent Development Kit, operable right now as
a live demo, and directly analogous to what Langdock sells (governed enterprise
AI over a company's own data). It belongs on the systems page as the outward
counterpart to the internal-practice story, positioned as the culminating "and
here is that capability, in production for a paying client" beat before the ask.

**Audience:** the same reader as the rest of the site (Judith Dada, Langdock
incoming co-CEO). Executive-legible at the top, credible to an engineer on a
forward.

---

## Requirements

| ID | Requirement |
|----|-------------|
| R1 | Tell the case-study story in three beats: the client build, the public live demo, and the architecture under the hood. |
| R2 | Explain how it works in plain, executive-legible language: the Google ADK agent framework, the split where a deterministic engine computes every number/verdict and the AI only narrates it, the request path, and the governance. |
| R3 | Feature real screenshots of the tool. Confirmed: the **Creative decision map** section (health bar + IPM×ROAS bubble matrix + stage strip) and the **"What the numbers say"** section (Diagnosis + Action Plan + the governed "Ask about your creatives" chatbot). Additional screens welcome if strong (ranked table, drill-down drawer). |
| R4 | Include the live demo link (`creative-health-demo.three-dots.dev`), a step-by-step way to get access, and a synthetic-data note that says the process is explained in the project overview. |
| R5 | Public-safe: never render the real client name or any internal infrastructure identifier; frame every visitor-facing figure as synthetic. Enforce in code, mirroring the source project's scrub-gate. |
| R6 | Match langdock's design language and the systems-page section grammar (Direction A). Facts live in a typed data module, not inline in the component. Copy passes the house gates (no em dashes, no AI-tell phrases). Accessible (labelled section, alt text on every screenshot). |
| R7 | Placement: a distinct section after `Ninety2DeepDive`, before the closing ask section. |
| R8 | Responsive and cross-engine: no horizontal overflow at 360/390px; screenshots render in Safari/WebKit (use the fixed framed-image treatment, never a bare `aspect-ratio` + `fill` box). |

---

## Key Technical Decisions

**KTD1 — Direction A (native deep-dive).** *(session-settled: user-directed — chosen from a three-direction mockup artifact over B "spotlight" and C "console".)* The section reads as a natural continuation of the systems page: eyebrow, section heading, a short story, a framed hero screenshot, alternating figure/text architecture rows, fact pills, and a closing demo card — the exact grammar of `Ninety2DeepDive`.

**KTD2 — Placement after `Ninety2DeepDive`, before the ask.** *(session-settled: user-approved — recommended and accepted.)* The internal systems establish the practice; this is the outward client proof, so it is the last content beat before the ask rather than the page opener or a fifth grid card.

**KTD3 — Real tool screenshots, captured from the running demo.** *(session-settled: user-directed — over a recreated table.)* Screenshots are captured from the demo (local dev instance at `127.0.0.1:3100`, or the live demo once accessible), verified public-safe, optimized, and committed to `public/images/`. The Creative decision map is the hero visual; the Diagnosis/Action-Plan/chatbot shot pairs with the "three agents" row because it literally shows the three agents.

**KTD4 — Facts live in `src/data/creative-health.ts`.** Per AGENTS.md ("facts live in data, never inline in components"), all copy-bearing facts, the demo URL, the login steps, the synthetic-data note, the verdict vocabulary, the agent roster, and the governance layers are typed exports. The component renders from the module so copy cannot drift and the copy gate can walk it.

**KTD5 — Confidentiality enforced in code.** A test asserts the new data module and component contain none of the entities on the source project's scrub-gate list (the real client name and internal identifiers). This mirrors `deploy/scrub-gate.sh` in the source repo — the same standard the public overview docs already pass. The banned list is not reproduced in this plan; the implementer reads it from the source project's scrub-gate.

**KTD6 — New `CreativeHealthDeepDive` component.** A self-contained section component in `src/components/systems/`, wired into `systems/page.tsx`, mirroring `Ninety2DeepDive`'s structure and using the existing `Figure` wrapper for screenshots (which already renders a framed image safely; no `NarrativeImage` `fill` box needed).

**KTD7 — Semantic verdict color, not a new accent.** The four verdict colors (Scale/Sustain/Fix/Retire) may appear as small semantic chips only, as meaning-bearing state, never as the section's interactive accent (which stays langdock blue). This keeps the langdock accent-scarcity rule intact while speaking the tool's own vocabulary. Verdict swatches, if used, are added as tokens rather than raw hex in the component (AGENTS.md: semantic tokens only).

---

## High-Level Technical Design

### Section anatomy (Direction A, top to bottom)

```
[ eyebrow: "A client build, opened up" ]
The trading desk for creative.                      ← section heading
  story: a growth advertiser runs hundreds of creatives; most teams can
  name the five winners, almost none know what to do about the other 95.
  Built a system that gives one verdict per creative, then forked the
  client build into a public demo. "The client product, pointed at
  different data."

[ FIGURE: Creative decision map screenshot ]        ← hero visual (R3)
  caption: every creative placed by pulling power and return; one verdict each.

row  ── "The engine computes; the model narrates."   text + small pipeline
        deterministic SQL computes every score/verdict/EUR; the AI only
        narrates it. Turn the AI off and every number still renders.
        pills: additive-not-load-bearing · 31-case eval · governed views

row  ── "Three agents over one JSON."                 FIGURE (numbers/chatbot
        Google ADK, in-process. Chat / Diagnosis /    screenshot) + text
        Action Plan narrate the same metric JSON via
        8 governed tools; no agent writes its own SQL.

row  ── "Eight layers of guarantees, all in code."    text + ladder (8)
        masking, injection screen, number-binding,
        cost caps; 3 trust boundaries; EU residency.

[ eyebrow: "The stack" ]  pills: Google ADK · Vertex Gemini · BigQuery ·
                                 Cloud Run · Next.js · FastAPI · EU residency

[ DEMO CARD ]  "See it decide, on live data."
   Open the demo →   |   How to get in: 1-2-3 steps
   synthetic-data note (process explained in the overview)
```

### What the section says the system does (the request path it narrates)

```
You (a question) → signing proxy (auth + HMAC) → deterministic engine
(governed BigQuery views) → ADK agent (8 governed tools, masked handles
only) → narrated answer (every figure traced). Three trust boundaries; the
model never sees a raw row.
```

The page states this in prose and pills; a formal diagram is optional (see U6).

---

## Output Structure

```
langdock-application/
├── public/images/
│   ├── creative-health-decision-map.png       # NEW — hero screenshot (R3)
│   ├── creative-health-numbers.png             # NEW — diagnosis/action-plan/chatbot (R3)
│   └── (optional additional screens)           # NEW — ranked table / drill-down
├── src/data/
│   ├── creative-health.ts                       # NEW — typed facts (KTD4)
│   └── creative-health.test.ts                  # NEW — confidentiality + shape gate (KTD5)
├── src/components/systems/
│   ├── CreativeHealthDeepDive.tsx               # NEW — the section (KTD6)
│   └── CreativeHealthDeepDive.test.tsx          # NEW — render + a11y + link tests
└── src/app/
    ├── systems/page.tsx                         # EDIT — mount after Ninety2DeepDive
    └── globals.css                              # EDIT (only if verdict tokens are added, KTD7)
```

Copy gates and the systems-page test are edited, not created (see U5).

---

## Implementation Units

### U1. Capture and prepare the tool screenshots

**Goal:** Produce the committed, public-safe screenshot assets the section needs.
**Requirements:** R3, R5, R8.
**Dependencies:** none (but blocked on the demo being reachable — see Risks).
**Files:** `public/images/creative-health-decision-map.png`, `public/images/creative-health-numbers.png` (plus any additional agreed screens).
**Approach:**
- Capture from the running demo (local dev `127.0.0.1:3100`, or the live demo once access exists) at a generous desktop width (≈1440px) so detail survives being shown in a framed card. Prefer the full "Scale, sustain, fix, or retire" decision-map block and the full "What the numbers say" + "Ask about your creatives" block, matching the reference screens the user supplied.
- **Public-safe check before committing (R5):** inspect every capture for the real client name and any internal identifier from the source scrub-gate list; recapture or crop if anything appears. The reference screens the user shared are Pip's Peaks (synthetic) and clean; hold new captures to the same bar.
- Optimize for web (reasonable PNG/WebP size); keep the demo's own aspect ratio so nothing is distorted.
**Patterns to follow:** the existing committed `public/images/*.png` narrative assets.
**Test scenarios:** none — static assets. `Test expectation: none — binary image assets; correctness is judged in the browser pass (U5) and the confidentiality gate on rendered copy.`
**Verification:** both hero and numbers screenshots exist, are legible at the size they render, and contain no client or infra identifier.

### U2. `creative-health.ts` data module

**Goal:** Hold every copy-bearing fact for the section as typed exports.
**Requirements:** R1, R2, R4, R5, R6.
**Dependencies:** none.
**Files:** `src/data/creative-health.ts`, `src/data/types.ts` (extend if a shared type helps).
**Approach:** Export the story beats, the hero/section copy, the three architecture-row bodies, the agent roster (Chat / Diagnosis / Action Plan with their public-safe one-liners; model tiers may be named at the executive-doc level of detail, e.g. "Google's Gemini models," and version strings kept out to match the prospect framing), the eight governance-ladder rungs, the stack list, the four verdict labels, the demo URL, the ordered login steps, and the synthetic-data note (which must say the process is explained in the project overview, per R4). No em dashes; no AI-tell phrases; no client name or internal identifier (R5). Keep the strongest source lines verbatim where they earn it ("the engine computes; the model narrates"; "the client product, pointed at different data"; "one clear verdict each").
**Patterns to follow:** `src/data/systems.ts` (typed profile objects, exported constants).
**Test scenarios:** covered by U5's module tests (shape + confidentiality + copy gates). `Execution note: this is a content module; its correctness is enforced by the gates in U5 rather than unit logic.`
**Verification:** the component in U3 renders entirely from this module with no inline facts.

### U3. `CreativeHealthDeepDive` section component

**Goal:** Render the Direction-A section from the data module.
**Requirements:** R1, R2, R3, R4, R6, R7, R8.
**Dependencies:** U1, U2.
**Files:** `src/components/systems/CreativeHealthDeepDive.tsx`.
**Approach:** Mirror `Ninety2DeepDive`: a labelled `<section>` with a top border and the same vertical rhythm (`mt-24 border-t pt-16 sm:mt-32 sm:pt-20`), eyebrow, section/display heading, story paragraphs, a hero `Figure` (decision-map screenshot), alternating two-column figure/text rows (`lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]`, `lg:order-*` to alternate) for the architecture, fact pills (`rounded-full bg-muted`/`border`), and a closing demo card (`rounded-lg border bg-card`) holding the demo CTA (ink pill to the demo URL, `target="_blank" rel="noopener noreferrer"`), an ordered list of login steps, and the synthetic-data note (a left-border highlight like the ninety2 card's data-posture callout). Use `Figure` for screenshots (it already renders a framed `<img className="h-auto w-full">`, which is Safari-safe — do **not** introduce a `NarrativeImage` `fill`/`aspect-ratio` box here, R8). Semantic tokens only; verdict chips (if used) via tokens from KTD7.
**Patterns to follow:** `src/components/systems/Ninety2DeepDive.tsx` (structure, `Figure` usage, closing card + link), `AltitudeStory.tsx` (figure/list row).
**Test scenarios** (in U5's `CreativeHealthDeepDive.test.tsx`):
- Renders a labelled region (`aria-labelledby` heading present).
- Renders both screenshots as `img` with non-empty `alt` and the expected `src` filenames.
- Renders the demo link with `href` = the demo URL, `target="_blank"`, and `rel` containing `noopener`.
- Renders the three or more ordered login steps.
- Renders the synthetic-data note text and the phrase pointing to the project overview.
- Renders the story, the three architecture-row headings, and the stack pills, all sourced from the module (assert a representative string from `creative-health.ts` appears).
**Verification:** the section renders top-to-bottom with both screenshots framed, in langdock styling.

### U4. Mount the section on the systems page

**Goal:** Place the section after the Ninety2 deep-dive, before the ask.
**Requirements:** R7.
**Dependencies:** U3.
**Files:** `src/app/systems/page.tsx`.
**Approach:** Import `CreativeHealthDeepDive` and render `<CreativeHealthDeepDive />` between `<Ninety2DeepDive />` and the closing `systems-ask` section. No other page changes.
**Patterns to follow:** the existing sequential section mounts in `systems/page.tsx`.
**Test scenarios** (extend `src/components/systems/systems-page.test.tsx`):
- The Creative Health section is present on the rendered page.
- It appears after the ninety2 deep-dive heading and before the ask heading (DOM order assertion).
**Verification:** `/systems` renders the new section in the right position.

### U5. Gates: confidentiality, copy, component, and page tests

**Goal:** Enforce public-safety and house rules; cover the new component and page wiring.
**Requirements:** R5, R6.
**Dependencies:** U2, U3, U4.
**Files:** `src/data/creative-health.test.ts` (new), `src/data/copy-gates.test.ts` (edit), `src/components/systems/CreativeHealthDeepDive.test.tsx` (new), `src/components/systems/systems-page.test.tsx` (edit).
**Approach:**
- **Confidentiality gate (`creative-health.test.ts`):** collect every string exported from `creative-health.ts` and assert none contains any banned entity from the source scrub-gate list (real client name and internal identifiers), case-insensitively. Read the banned list from the source project rather than hardcoding the confidential strings into the langdock repo; if the list cannot be read at test time, fall back to an explicit in-test constant kept out of rendered copy. Also assert the module exposes the demo URL and a non-empty login-steps array (shape gate).
- **Copy gate (`copy-gates.test.ts`):** add `creative-health` to the `modules` map so its strings are walked for the em-dash and AI-tell rules already enforced there.
- **Component + page tests:** as enumerated in U3 and U4.
**Test scenarios:**
- Confidentiality: a synthetic string containing a banned entity fails the gate (guard test proving the matcher works), and the real module passes.
- Copy: the module contains no em dash and no AI-tell phrase (inherited from the shared gate once registered).
- Component/page: the U3 and U4 scenarios above.
**Verification:** `npm test` green including the new gates; deliberately inserting a banned string makes the confidentiality test fail.

### U6. (Optional) One architecture figure for parity

**Goal:** Add a single hand-drawn figure for visual parity with the ninety2 deep-dive, if the screenshots alone feel thin.
**Requirements:** R2 (enhancement).
**Dependencies:** U3.
**Files:** `public/figures/creative-health-*.svg`, `CreativeHealthDeepDive.tsx` (add one `Figure`).
**Approach:** Recreate one of the source diagrams as an Excalidraw-style SVG in the same hand it uses elsewhere — the strongest candidate is **"the engine computes; the model narrates"** (deterministic engine → one metric JSON → three agents) or **"three trust boundaries."** Screenshot-gated for visual quality like the other figures.
**Test scenarios:** `Test expectation: none — a static figure asset; the component test already asserts the figure count if one is added.`
**Verification:** the figure reads at a glance and matches the page's figure style. Deferred by default (see Scope Boundaries) unless the browser pass shows the section needs it.

---

## Scope Boundaries

### Deferred to follow-up work
- **U6 architecture figure(s)** unless the browser pass calls for one.
- Additional screenshots beyond the two confirmed screens (ranked table, drill-down drawer) — add only if they strengthen the story.
- A standalone, deep Creative Health case-study page (this is a systems-page section, not its own route).

### Outside this work's identity
- Any change to the Creative Health demo, its client build, or its GCP project — this repo only describes it.
- Naming the real client, or exposing any internal identifier, screenshot number as a client result, or production-grade-auth claim (the email gate is a knowledge check on synthetic data). All are barred by R5 and the honesty flags in the research brief.
- The hosted ninety2 walkthrough route and the four internal systems' content — untouched.

---

## Risks & Dependencies

- **Demo reachability (blocks U1).** The local demo (`127.0.0.1:3100`) was down at planning time and the live demo is login-gated to the automation browser. Capture requires the demo running (Dominik restarts the local instance, or grants live access), or Dominik supplies clean high-resolution captures. Everything else (U2–U5) proceeds without it; U1 lands when the demo is reachable.
- **Confidentiality (R5).** The one true hazard. Mitigated by KTD5's code gate plus a manual scan of every screenshot before commit. The real client name and internal identifiers must never reach the repo, rendered copy, or an image.
- **Synthetic-data honesty (R5).** Every visitor-facing figure is fabricated; the note must frame it as a demonstration account, never a client result, and point to the overview for the method.
- **Cross-engine rendering (R8).** Using `Figure` (intrinsic `<img>`) rather than a `fill`/`aspect-ratio` box avoids the Safari image-collapse class of bug fixed earlier in this repo.

---

## Verification Contract / Definition of Done

- `npm run lint` — 0 errors, 0 warnings.
- `npm test` — green, including: the new confidentiality gate, the copy gate over `creative-health.ts`, the component test, and the systems-page order test.
- `npm run build` — clean compile.
- Browser pass (chrome-devtools + a real WebKit check per this repo's convention): `/systems` at 1440px and true 390px shows the new section after the ninety2 deep-dive, both screenshots render (in Chrome **and** WebKit), 0 horizontal overflow, 0 console errors.
- **Confidentiality check:** grep the built page output and the two new source files for the scrub-gate banned entities → 0 hits.
- Content check: the demo link, the three-step access, and the synthetic-data note (with the "explained in the overview" pointer) are all present and correct.
- Ship per this repo's convention (feature branch → ff-merge to main → `npx vercel --prod`), then live-verify on langdock.dbenger.com. Deploy is Dominik's call at handoff, not automatic.

---

## Sources & Research

- **Source overview docs** (read-only, under `~/ninety2/…/creative-health-demo-final/docs/`): `demo-overview-executive.html`, `demo-overview-prospect.html`, `demo-overview-technical.html`. The executive and prospect docs are the public-safe framing; the technical doc names the real client and infra and is **internal only** — its client facts are barred from the page.
- **Distilled research brief** (this session): the architecture, the eight governed tools, the three agents, the governance ladder, and the honesty flags that define R5.
- **Design mockups** (this session): three directions at the published artifact; Direction A chosen.
- **Reference screens** supplied by Dominik: the Creative decision map and the "What the numbers say" + chatbot sections — the two screens to capture (R3).
- **Live demo:** `creative-health-demo.three-dots.dev` (email-allowlist access; synthetic Pip's Peaks data).
- **Langdock conventions:** `AGENTS.md`, `DESIGN.md`, `src/components/systems/Ninety2DeepDive.tsx`, `src/data/systems.ts`, `src/data/copy-gates.test.ts`.

---

## Product Contract preservation

Direct planning (`product_contract_source: ce-plan-bootstrap`); no upstream brainstorm to preserve. Product scope is the user's request plus the source overview docs, bounded by the confidentiality flags.
