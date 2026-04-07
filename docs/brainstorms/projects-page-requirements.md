---
date: 2026-04-07
topic: projects-page
---

# Projects Page

## Problem Frame

Dominik's resume site (dbenger.com) showcases experience and collaboration offerings but has no dedicated page for the tools and products he's built. Visitors — recruiters, hiring managers, potential collaborators — can't see his builder portfolio, which is a significant gap for someone who ships real products. A "Projects" page fills this by showcasing 6 detailed project entries that demonstrate PM, engineering, and product thinking skills.

## Requirements

**Page & Navigation**
- R1. Add a "Projects" page at `#projects` hash route, following the existing SPA routing pattern
- R2. Add "Projects" to navigation between Experience and Collaboration (order: Home, Experience, Projects, Collaboration, Contact)
- R3. Add "Projects" to the footer navigation links
- R4. Mobile nav should include "Projects" — if adding the 5th link causes overflow at 320px, abbreviate "Collaboration" to "Collab" on mobile (`<span class="sm:hidden">Collab</span><span class="hidden sm:inline">Collaboration</span>`) to reclaim space

**Project Entries**
- R5. Page displays 6 featured projects as detailed card entries in a flat list (no categories)
- R6. Each project card includes: project name, short tagline, description of what it is, key features (3-5 bullets), technologies/tools used, and a primary link (live site or GitHub)
- R7. The 6 projects and their primary links are:

| # | Project | Primary Link | Type |
|---|---------|-------------|------|
| 1 | Agent Triforge | https://ninety2ua.github.io/agent-triforge/ | Claude Code plugin — 3-model orchestration (Claude, Gemini, Codex), 19 subagents, parallel review swarm |
| 2 | Claude Code Blueprint | https://ninety2ua.github.io/claude-code-blueprint/ | Claude Code plugin — 34 skills, 26 agents, 25 slash commands, quality gates |
| 3 | Concept Sandbox | https://concept-sandbox.com | SaaS product — AI workbench for solo creators, 2,400+ users, idea-to-prototype pipeline |
| 4 | Job Application Example | https://github.com/Ninety2UA/job-application-example | Full-stack app — interactive cover letter with 10 MVP prototypes, AI chatbot, built in 3 days |
| 5 | Knowledge Hub | https://github.com/Ninety2UA/knowledge-hub | Automation pipeline — Slack-to-Notion, AI content processing, 237 tests, deployed on GCP |
| 6 | PM Operating System | https://ninety2ua.github.io/pm-operating-system/ | Claude Code plugin — 19 skills, 6 commands, MCP tools, goal-aligned task management |

**"More Projects" CTA**
- R8. Bottom of the page includes a prominent CTA section linking to projects.dbenger.com with messaging like "Explore 100+ more project ideas"
- R9. The CTA should communicate that projects.dbenger.com is a catalog of project ideas and completed work, each with full PRDs

**Design & Visual Quality**
- R10. Page follows the existing design system: teal brand palette (brand-500 #14b8a6), card patterns with hover states, `data-animate` scroll animations, `max-w-4xl` or `max-w-5xl` content width
- R11. Page hero section follows existing pattern: watermark SVG, category pill, large heading, subheading, description
- R12. Project cards should feel modern and polished — draw visual inspiration from shadcn, pencil.dev, and 21st.dev card patterns, reproduced using Tailwind utilities only (no library imports, no build-step dependencies)
- R13. Each card displays a project type badge for visual differentiation. The 4 types are:

| Badge | Projects |
|-------|----------|
| Claude Code Plugin | Agent Triforge, Claude Code Blueprint, PM Operating System |
| SaaS Product | Concept Sandbox |
| Full-Stack App | Job Application Example |
| Automation Pipeline | Knowledge Hub |

- R14. Fat footer (contact CTA) remains visible on the Projects page (same as Experience and Collaboration pages — the "More Projects" CTA at R8 serves a different purpose)

## Success Criteria

- Visitors to dbenger.com can navigate to the Projects page from both nav bar and footer
- Each of the 6 projects is presented with enough detail that a visitor understands what it is, what's impressive about it, and can click through to explore it
- The page visually matches the rest of the site (same design system, same quality bar)
- projects.dbenger.com link is discoverable at the bottom for visitors who want to see more
- Page is fully responsive (mobile-first, works on small Android screens per existing constraints)

## Scope Boundaries

- **In scope:** New `#projects` page section in both `docs/index.html` (design source of truth, first) and `public/site.html` (production), nav/footer/router updates, 6 project cards, "more projects" CTA
- **In scope:** SPA router updates — add `'projects'` to the `pages` array, create `page-projects` div, add `nav-projects` link ID, update footer links
- **Out of scope:** Changes to other pages, new API routes, dynamic data fetching (all content is static HTML)
- **Out of scope:** Screenshots or thumbnails of projects (would require new image assets and `.gitignore` exceptions)
- **Follow-up:** Update `src/app/api/ai/knowledge.ts` with project portfolio data so AI features can answer "What has Dominik built?" — not blocking the page launch
- **Not changing:** PDF resume button position, logo as home link

## Key Decisions

- **Page title: "Projects"** — clean, direct, lets the work speak for itself
- **Nav position: after Experience** — natural flow (what you've done → what you've built → let's work together)
- **Flat list, no categories** — 6 items doesn't warrant grouping; each project is equal weight
- **Design source of truth applies** — changes go to `docs/index.html` first, then `public/site.html`

## Dependencies / Assumptions

- All 6 project links are live and publicly accessible (verified during brainstorm)
- projects.dbenger.com is live (Docsify site with 105 project ideas)
- Adding "Projects" to mobile nav is tight at 320px — R4 includes a fallback strategy (abbreviate "Collaboration" to "Collab" on mobile if needed)

## Outstanding Questions

### Deferred to Planning
- [Affects R4][Technical] Test mobile nav at 320px with 5 links — apply "Collab" abbreviation fallback if overflow occurs
- [Affects R12][Needs research] Research specific card visual patterns from shadcn/pencil.dev/21st.dev that can be reproduced in Tailwind utilities (no imports)
- [Affects R7][Technical] Determine project display order — consider: most impressive first, variety (alternate types), or most recent

## Next Steps

-> `/ce:plan` for structured implementation planning
