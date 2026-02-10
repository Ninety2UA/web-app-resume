# Implementation Plan

## Overview
Build an interactive resume & portfolio web app for Dominik Benger using Next.js 15, Framer Motion, and custom SVG visualizations. Deployed on Vercel at dbenger.com.

**Work style:** Autonomous full build, then user review.
**Priority:** Every section gets "wow factor" treatment.

---

## Phase 0: Project Setup

### T01 - Initialize Next.js project
- Create package.json with Next.js 15, React 19, Framer Motion, Vercel Analytics
- TypeScript, Tailwind CSS 3.4, ESLint, App Router, src/ directory
- **Dependencies:** None
- **Acceptance:** `npm install` completes, `npm run dev` starts

### T02 - Configure Tailwind theme
- Custom color palette: warm whites, terra cotta, sage teal, amber, lavender
- Plus Jakarta Sans font family
- Custom spacing, border radius, box shadows
- **Dependencies:** T01
- **Acceptance:** Tailwind classes use custom design tokens

### T03 - Configure Next.js
- Metadata (title, description, Open Graph)
- Font loading via next/font/google
- Image optimization settings
- **Dependencies:** T01
- **Acceptance:** Layout renders with correct fonts and metadata

### T04 - Set up global styles
- CSS reset, base typography, smooth scrolling
- Custom scrollbar styling
- Selection color, focus styles
- prefers-reduced-motion media query support
- **Dependencies:** T02
- **Acceptance:** Base page looks clean with warm aesthetic

### T05 - Copy PDF resume to public/
- Copy `docs/resume-file/Dominik Benger - Resume [V3].pdf` to `public/resume/`
- **Dependencies:** T01
- **Acceptance:** PDF accessible at /resume/Dominik_Benger_Resume.pdf

---

## Phase 1: Data Architecture

### T06 - Create experience data file
- TypeScript interfaces for Experience type
- All career entries from resume: Career Break, Google LCS, Google IGT, Google SMB, Google AC Intern, Q Agency, L'Oreal, Henkel
- Include: company, role, team, location, dates, description sections, bullets, technologies, industries, roleType tags
- **Dependencies:** None
- **Acceptance:** Typed data exports, all resume content captured

### T07 - Create skills progression data
- Year-by-year skill levels (2014-2025)
- Categories: Marketing & Ads, Data & Analytics, Programming, AI & Automation
- Proficiency levels 0-100 for each skill per year
- **Dependencies:** None
- **Acceptance:** Data supports animated skills chart

### T08 - Create portfolio placeholder data
- TypeScript interface for PortfolioProject
- 6 placeholder projects including iOS SKAN Reporting Pack (real), BI Platform, AI Workflow Automation
- Each with: title, type tag, description, tech stack, external links
- **Dependencies:** None
- **Acceptance:** Data supports portfolio grid rendering

### T09 - Create filter configuration
- Filter categories: Industry, Role Level, Technology domain
- Map each experience entry to filter tags
- Define filter pill labels and corresponding filter logic
- **Dependencies:** T06
- **Acceptance:** Filters can correctly show/hide experience entries

---

## Phase 2: Layout & Navigation

### T10 - Build root layout
- Plus Jakarta Sans font loading
- HTML metadata and Open Graph tags
- Vercel Analytics component
- Body wrapper with warm background
- **Dependencies:** T02, T03
- **Acceptance:** Page renders with correct font, meta tags in head

### T11 - Build FloatingNav component
- Centered floating pill that appears after scrolling past hero (opacity 0→1)
- Links: Home, Experience, Portfolio
- Download PDF button (accent color)
- Frosted glass background (backdrop-blur)
- Smooth show/hide transition
- Mobile: hamburger menu
- **Dependencies:** T04
- **Acceptance:** Nav appears on scroll, links work, responsive

### T12 - Build Footer component
- Social links: LinkedIn, Email (with icons)
- Copyright notice
- "Built with Next.js" subtle note
- Warm styling consistent with design system
- **Dependencies:** T04
- **Acceptance:** Footer renders with working links, icons

---

## Phase 3: Hero Section

### T13 - Build HeroSection wrapper
- Name: "Dominik Benger" (large, prominent)
- Headline: "Seasoned Business & Analytics Leader..."
- Subheadline with key domains
- Contains: VisualizationToggle, active visualization, TimelineMarkers
- Download PDF button (top-right or integrated)
- Scroll indicator at bottom
- **Dependencies:** T04
- **Acceptance:** Hero renders above fold, looks polished

### T14 - Build VisualizationToggle buttons
- 4 toggle buttons: "Career Path", "Skills", "Industries", "Tech Stack"
- Active state: accent color, bold weight
- Inactive: muted gray
- Hover: subtle color shift
- Only one active at a time
- Smooth transition between states
- **Dependencies:** T13
- **Acceptance:** Buttons toggle, active state visible, smooth transitions

### T15 - Build Role Evolution visualization
- SVG career path going upward from left to right
- Nodes at each career milestone (Henkel → L'Oreal → Q Agency → Google AM → Google TL → Google SAL → Career Break)
- Animated path drawing with Framer Motion pathLength
- Nodes appear sequentially after path reaches them
- Labels with role title, company, date
- Responsive (viewBox-based)
- **Dependencies:** T06, T14
- **Acceptance:** Path animates smoothly, all roles shown, responsive

### T16 - Build Skills Progression visualization
- Animated horizontal skill bars grouped by category
- Categories: Marketing & Ads, Data & Analytics, Programming, AI & Automation
- Bars grow from 0 to proficiency level with stagger
- Category colors: coral, teal, amber, lavender
- Skill labels and proficiency indicators
- **Dependencies:** T07, T14
- **Acceptance:** Bars animate in, grouped clearly, colors match design

### T17 - Build Industry Verticals visualization
- Proportional rounded rectangles showing industry experience
- Industries: Apps & Mobile Gaming, Retail & FMCG, Tech & SaaS, Agency & Consulting
- Size proportional to years of experience
- Color-coded with accent palette
- Labels with industry name and year count
- Scale-in animation
- **Dependencies:** T06, T14
- **Acceptance:** Industries displayed proportionally, animated, labeled

### T18 - Build Tech Stack visualization
- Timeline-based technology adoption visualization
- Technologies plotted at their adoption year
- Connected by category paths
- Categories: Marketing Tech, Data Tools, Programming, AI/ML
- Left-to-right reveal animation
- **Dependencies:** T06, T14
- **Acceptance:** Tech appears chronologically, animated, categorized

### T19 - Build TimelineMarkers
- Clickable era buttons: "Early Career (2014-16)", "Google Growth (2017-18)", "Google Leadership (2018-21)", "Google Senior (2021-25)", "AI Era (2025+)"
- Active era highlighted with accent color
- Clicking an era filters the visualization to that time period
- "Show All" option
- **Dependencies:** T14
- **Acceptance:** Eras clickable, visualization filters correctly

---

## Phase 4: Filters & Experience Section

### T20 - Build FilterPills component
- Horizontal row of pill/chip toggles
- Default pills: "All", "Apps & Gaming", "Analytics & Data", "Leadership", "Marketing", "AI & Innovation"
- Active pill: filled accent color
- Inactive: outline style
- Multiple can be active (inclusive OR)
- Reset/"All" clears other selections
- **Dependencies:** T09
- **Acceptance:** Pills toggle correctly, visual states clear

### T21 - Build useScrollAnimation hook
- Intersection Observer-based scroll detection
- Trigger at 80% viewport position
- Returns ref and animation state (isVisible)
- Respects prefers-reduced-motion
- Triggers only once (no re-animation on scroll up)
- **Dependencies:** None
- **Acceptance:** Elements animate in on scroll, one-time trigger

### T22 - Build ExperienceSection container
- Receives filter state from parent
- Filters experience data based on active pills
- Renders ExperienceCards for matching entries
- Smooth layout transitions when filtering (AnimatePresence)
- Section header: "Experience" with subtle styling
- **Dependencies:** T06, T20, T21
- **Acceptance:** Cards filter correctly, smooth transitions

### T23 - Build ExperienceCard component
- Company name and logo area (logo or styled text)
- Role title (bold), team name, date range (right-aligned)
- Location
- Description sections with headers and bullet points
- Key metrics highlighted with accent color
- Technology pills at bottom
- Key projects section (if applicable)
- Scroll-triggered animation: fade-in + 20-30px upward slide, 400-500ms
- Stagger: 100ms delay between cards
- **Dependencies:** T06, T21
- **Acceptance:** Cards render all resume data, animate on scroll, responsive

---

## Phase 5: Contact & Footer

### T24 - Build ContactSection
- "Get in Touch" heading with inviting copy
- Form fields: Name, Email, Message (textarea)
- Submit button with accent color
- Formspree integration (POST to endpoint)
- Client-side validation: required fields, email format
- Success state: "Thanks! I'll respond within 24 hours."
- Error state: "Something went wrong. Email me directly at..."
- Scroll animation on section entry
- **Dependencies:** T04
- **Acceptance:** Form submits to Formspree, validates, shows states

---

## Phase 6: Portfolio Page

### T25 - Build ProjectCard component
- Thumbnail area (gradient placeholder)
- Project title (bold)
- Type tag pill ("Open Source", "Analytics Platform", etc.)
- Short description (2-3 sentences)
- Technology stack pills
- Action buttons: "View on GitHub", "Read Case Study"
- Hover: elevation shadow + 2-3px upward translate
- Framer Motion hover animations
- **Dependencies:** T08
- **Acceptance:** Card renders project data, hover animations work

### T26 - Build PortfolioGrid layout
- Responsive grid: 3 cols desktop, 2 cols tablet, 1 col mobile
- 24-32px gap between cards
- **Dependencies:** T25
- **Acceptance:** Grid renders responsively

### T27 - Build portfolio page
- Page header: "Portfolio" with subtitle
- PortfolioGrid with all projects
- CTA section: "Interested in collaborating?" with link to contact
- Scroll animations on entry
- **Dependencies:** T25, T26
- **Acceptance:** /portfolio renders, all cards visible, CTA works

---

## Phase 7: Main Page Assembly

### T28 - Wire up main page
- Import and compose: HeroSection, FilterPills, ExperienceSection, ContactSection, Footer
- Lift filter state to page level
- Pass filter state down to Hero (for timeline) and ExperienceSection
- Smooth scroll behavior for anchor links
- **Dependencies:** T13-T24
- **Acceptance:** Full page renders, all interactions work, scroll is smooth

---

## Phase 8: Polish & Optimization

### T29 - Responsive design pass
- Test all breakpoints: desktop (1200+), tablet (768-1199), mobile (<768)
- FloatingNav hamburger menu on mobile
- Visualizations scale/simplify on mobile
- Experience cards stack properly
- Contact form full-width on mobile
- Portfolio grid responsive columns
- **Dependencies:** T28
- **Acceptance:** All sections look good on all breakpoints

### T30 - Accessibility audit
- ARIA labels on all interactive elements
- Keyboard focus indicators (2px solid accent)
- Skip-to-content link
- Alt text on logos and images
- prefers-reduced-motion: disable all animations
- Color contrast WCAG AA minimum
- **Dependencies:** T28
- **Acceptance:** Lighthouse accessibility 95+

### T31 - Performance optimization
- Image lazy loading below fold
- Font subsetting (Plus Jakarta Sans)
- Minimal JavaScript bundle (tree-shake unused Framer Motion)
- Static PDF download (no generation overhead)
- **Dependencies:** T28
- **Acceptance:** Lighthouse performance 90+, FCP <2s

### T32 - Final QA
- Cross-browser testing (Chrome, Firefox, Safari, Edge)
- All links functional (LinkedIn, email, PDF download)
- Contact form end-to-end test
- Animation smoothness (60fps check)
- Content accuracy vs resume
- **Dependencies:** T29, T30, T31
- **Acceptance:** Zero critical bugs, all features functional

---

## Task Dependency Graph
```
T01 → T02 → T04 → T10, T11, T12, T13
T01 → T03 → T10
T01 → T05
T06, T07, T08, T09 (parallel, no deps)
T13 → T14 → T15, T16, T17, T18, T19
T06 + T20 + T21 → T22, T23
T22 + T23 → T28
T24 → T28
T25 → T26 → T27
T28 → T29, T30, T31 → T32
```

---

## Phase 9: Collaboration Page (Post-Launch Feature)

### T34 - Build Collaboration page
- New `/collaboration` route with service offerings from `docs/Offering.md`
- Data file: `offerings.ts` (10 offerings, 3 packages, add-ons, working principles, tool categories)
- Components: OfferingCard (accordion deliverables), OfferingsGrid, PackageCards (3-tier + add-ons), WorkingStyleSection (principles + tool pills)
- Page: server component with hero, 5 content sections, CTA matching portfolio
- Nav: added "Collaboration" to FloatingNav, generalized `isCurrent` detection
- **Status: Done** (committed at `18a2ea5`)

---

---

## Phase 10: UI Rework (committed at `b5e26ea`)

### U06 - RoleEvolution year-proportional positioning
- Nodes positioned by actual year (2014-2025) via `yearToX()` instead of even spacing
- SVG 900×440, padding top=70, right=20, bottom=70, left=20
- **Status: Done**

### U07 - FloatingNav always visible
- Removed scroll-threshold (60vh) visibility toggle
- Nav renders immediately as plain `<nav>`, no animation wrapper
- **Status: Done**

### U08 - Hide portfolio from navigation
- Removed "Portfolio" link from FloatingNav and Footer
- Page files preserved at `/portfolio` for future v2
- **Status: Done**

### U09 - HeroSection conditional TimelineMarkers
- Standalone TimelineMarkers hidden when role viz active (SVG has its own)
- Shows for Skills & Industries tabs
- **Status: Done**

### U10 - RoleEvolution aligned timeline + label overlap fix
- Timeline moved from SVG-integrated to HTML below chart, using `yearToX()` percentages for alignment
- Per-node `labelPlacements` array with custom dx/dy/anchor for each node
- Bunched nodes (1-4) use diagonal placement (above-left or below-right) to avoid circles and curves
- Node 1 special case: below-right instead of above-left (too close to SVG left edge for end anchor)
- **Status: Done**

---

## Launch: Company Logos (L04, committed at `2d65169`)

### L04 - Add company logos to experience cards
- Copied 6 logos to `public/logos/` (google.png, henkel.png, loreal.png, q-agency.png, ai.png, rit.png)
- Added `logo?: string` to `ExperienceEntry` interface, logo paths on all 8 entries + RIT on education
- `ExperienceCard.tsx` renders `<img>` inline with job title (h-7, max-w-[80px])
- Used `<img>` instead of `next/image` to avoid dimension mismatch warnings
- `.gitignore` updated with `!public/logos/*.png`
- **Status: Done** (committed at `2d65169`)

---

## Phase 11: UI Tweaks (committed at `2d65169`)

### U11 - Move logo to job title row
- Company logo moved from company name `<p>` to flex row alongside job title `<h3>`
- **Status: Done**

### U12 - HeroSection bottom padding
- Changed `py-20` to `pt-20 pb-0` to remove gap below "Scroll to explore"
- **Status: Done**

### U13 - Collaboration tooling update
- Marketing Measurement expanded: removed SKAdNetwork, added Meta Ads, App Campaigns, GA4, Firebase, Apple Search Ads (5 → 9 tools)
- AI & Automation expanded: all AI/dev/automation tools from resume (8 → 37 tools)
- **Status: Done**

---

## Phase 12: Documentation (committed at `6863c84`)

### D01 - Comprehensive README rewrite
- Table of contents (18 linked entries), z-index stacking order section, expanded troubleshooting (9 issues with Cause column), customization guides with color palette table, design system tokens (border radius, shadows), deployment instructions with alternative hosting note
- **Status: Done**

### D02 - CLAUDE.md sync
- Added FloatingNav anchor link pitfall, corrected route detection docs
- **Status: Done**

---

## Cut from v1 Scope
- Shareable filter URLs (query parameter state)
- Technology tag click-to-filter in experience cards
- Dynamic PDF generation (using static file)
- Blog/CMS capabilities
- Google Analytics (using Vercel Analytics instead)
- Portfolio page (hidden, preserved for v2)
