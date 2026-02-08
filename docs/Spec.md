# Technical Specification

## 1. Overview

Interactive resume and portfolio web application for Dominik Benger. Single-page layout with hero visualizations, filterable experience section, and contact form, plus a dedicated `/portfolio` route.

**Domain:** dbenger.com
**Hosting:** Vercel
**Target:** Desktop-primary, fully responsive

---

## 2. Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 15.x |
| Language | TypeScript | 5.x |
| UI Library | React | 19.x |
| Styling | Tailwind CSS | 3.4.x |
| Animations | Framer Motion | 11.x |
| Visualizations | Custom SVG + Framer Motion | — |
| Analytics | @vercel/analytics | 1.x |
| Contact Form | Formspree | — |
| Font | Plus Jakarta Sans (next/font) | — |
| Deployment | Vercel | — |

---

## 3. Project Structure

```
web-app-resume/
├── CLAUDE.md
├── docs/
│   ├── PRD.md
│   ├── Spec.md (this file)
│   ├── Plan.md
│   ├── Dominik_Benger_Resume_4Page.md
│   └── resume-file/
│       └── Dominik Benger - Resume [V3].pdf
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   ├── globals.css         # Global styles
│   │   └── portfolio/
│   │       └── page.tsx        # Portfolio page
│   ├── components/
│   │   ├── layout/
│   │   │   ├── FloatingNav.tsx
│   │   │   └── Footer.tsx
│   │   ├── hero/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── VisualizationToggle.tsx
│   │   │   ├── TimelineMarkers.tsx
│   │   │   └── visualizations/
│   │   │       ├── RoleEvolution.tsx
│   │   │       ├── SkillsProgression.tsx
│   │   │       ├── IndustryVerticals.tsx
│   │   │       └── TechStack.tsx
│   │   ├── experience/
│   │   │   ├── ExperienceSection.tsx
│   │   │   └── ExperienceCard.tsx
│   │   ├── filters/
│   │   │   └── FilterPills.tsx
│   │   ├── contact/
│   │   │   └── ContactSection.tsx
│   │   └── portfolio/
│   │       ├── PortfolioGrid.tsx
│   │       └── ProjectCard.tsx
│   ├── data/
│   │   ├── experience.ts
│   │   ├── skills.ts
│   │   └── portfolio.ts
│   ├── hooks/
│   │   └── useScrollAnimation.ts
│   └── lib/
│       └── utils.ts
├── public/
│   ├── resume/
│   │   └── Dominik_Benger_Resume.pdf
│   └── logos/
├── package.json
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
└── postcss.config.mjs
```

---

## 4. Data Models

### Experience
```typescript
interface Experience {
  id: string;
  company: string;
  companyShort: string;        // abbreviated for viz labels
  role: string;
  team?: string;
  location: string;
  startDate: string;           // "YYYY-MM"
  endDate: string | null;      // null = "Present"
  summary: string;
  sections: {
    title: string;
    bullets: string[];
  }[];
  keyProjects?: {
    title: string;
    description: string;
    link?: string;
  }[];
  technologies: string[];
  industries: string[];        // "apps_gaming", "retail_fmcg", "tech", "agency"
  roleType: string[];          // "leadership", "technical", "account_mgmt", "analytics", "marketing"
  isAdditional?: boolean;
}
```

### Skills Timeline
```typescript
interface SkillCategory {
  name: string;
  color: string;              // Tailwind color class
  skills: {
    name: string;
    level: number;            // 0-100
  }[];
}
```

### Portfolio Project
```typescript
interface PortfolioProject {
  id: string;
  title: string;
  type: string;               // "Open Source", "Platform", "AI Workflow"
  description: string;
  technologies: string[];
  gradient: string;           // CSS gradient for placeholder thumbnail
  links: {
    label: string;
    url: string;
    icon: 'github' | 'external' | 'doc';
  }[];
}
```

---

## 5. Design System

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| warm-50 | #FDFCFA | Page background |
| warm-100 | #F5F0EB | Card/surface background |
| warm-200 | #EDE6DE | Borders, dividers |
| warm-300 | #D5D0CB | Disabled elements |
| warm-400 | #B5B0AB | Placeholder text |
| warm-500 | #8A8580 | Muted text |
| warm-600 | #6B6560 | Secondary text |
| warm-700 | #4A4640 | Body text |
| warm-800 | #2D2B27 | Headings |
| warm-900 | #1A1814 | Emphasis/titles |
| coral | #E07A5F | Primary accent (CTAs, active states) |
| teal | #4A9B8E | Secondary accent |
| amber | #E6B35A | Tertiary accent |
| lavender | #7C6FB0 | Quaternary accent |

### Typography

| Element | Font | Weight | Size |
|---------|------|--------|------|
| Page title (name) | Plus Jakarta Sans | 800 | 48-64px |
| Headline | Plus Jakarta Sans | 600 | 24-32px |
| Section title | Plus Jakarta Sans | 700 | 28-36px |
| Card title | Plus Jakarta Sans | 600 | 20-24px |
| Body text | Plus Jakarta Sans | 400 | 16px |
| Small/caption | Plus Jakarta Sans | 500 | 14px |
| Pill/tag | Plus Jakarta Sans | 500 | 12-13px |

### Spacing
8px base grid. Tailwind default spacing scale (4px increments).

### Border Radius
- Cards: 16px (`rounded-2xl`)
- Buttons/pills: 9999px (`rounded-full`)
- Inputs: 12px (`rounded-xl`)

### Shadows
- Card default: `0 1px 3px rgba(26,24,20,0.06)`
- Card hover: `0 8px 25px rgba(26,24,20,0.1)`
- Nav: `0 4px 20px rgba(26,24,20,0.08)`

### Animation Specs
| Animation | Duration | Easing | Trigger |
|-----------|----------|--------|---------|
| Viz toggle transition | 300ms | ease-out | Button click |
| Scroll reveal | 400-500ms | [0.25, 0.1, 0.25, 1] | 80% viewport |
| Card stagger delay | 100ms | — | Sequential |
| Hover elevation | 200ms | ease-out | Mouse enter |
| Nav appear/hide | 300ms | ease-in-out | Scroll position |
| Skill bar growth | 800ms | [0.25, 0.1, 0.25, 1] | On mount |
| Path drawing | 1500ms | [0.37, 0, 0.63, 1] | On mount |

---

## 6. Page Architecture

### Home Page (`/`)
```
┌─────────────────────────────────────────────┐
│ [FloatingNav - hidden initially]            │
├─────────────────────────────────────────────┤
│ HERO SECTION                                │
│ ┌─────────────────────────────────────────┐ │
│ │ Name + Headline                         │ │
│ │ [Download PDF]                          │ │
│ │                                         │ │
│ │ [Career Path] [Skills] [Industry] [Tech]│ │
│ │ ┌─────────────────────────────────────┐ │ │
│ │ │ Active Visualization (SVG)          │ │ │
│ │ └─────────────────────────────────────┘ │ │
│ │ [Early Career] [Growth] [Senior] [AI]   │ │
│ │                                         │ │
│ │ ↓ Scroll to explore                     │ │
│ └─────────────────────────────────────────┘ │
├─────────────────────────────────────────────┤
│ FILTER PILLS                                │
│ [All] [Apps & Gaming] [Analytics] [Lead...]  │
├─────────────────────────────────────────────┤
│ EXPERIENCE SECTION                          │
│ ┌─────────────────────────────────────────┐ │
│ │ ExperienceCard (scroll-animated)        │ │
│ │ ExperienceCard (scroll-animated)        │ │
│ │ ExperienceCard (scroll-animated)        │ │
│ │ ...                                     │ │
│ └─────────────────────────────────────────┘ │
├─────────────────────────────────────────────┤
│ CONTACT SECTION                             │
│ ┌─────────────────────────────────────────┐ │
│ │ "Get in Touch" + Form (Formspree)       │ │
│ └─────────────────────────────────────────┘ │
├─────────────────────────────────────────────┤
│ FOOTER                                      │
│ Social links + Copyright                    │
└─────────────────────────────────────────────┘
```

### Portfolio Page (`/portfolio`)
```
┌─────────────────────────────────────────────┐
│ FloatingNav (always visible)                │
├─────────────────────────────────────────────┤
│ Page Header: "Portfolio"                    │
├─────────────────────────────────────────────┤
│ ┌──────────┐ ┌──────────┐ ┌──────────┐     │
│ │ Project  │ │ Project  │ │ Project  │     │
│ │ Card 1   │ │ Card 2   │ │ Card 3   │     │
│ └──────────┘ └──────────┘ └──────────┘     │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐     │
│ │ Project  │ │ Project  │ │ Project  │     │
│ │ Card 4   │ │ Card 5   │ │ Card 6   │     │
│ └──────────┘ └──────────┘ └──────────┘     │
├─────────────────────────────────────────────┤
│ CTA: "Interested in collaborating?"         │
├─────────────────────────────────────────────┤
│ FOOTER                                      │
└─────────────────────────────────────────────┘
```

---

## 7. Component Specifications

### FloatingNav
- **Visibility:** Hidden when hero is in viewport; visible after scrolling past hero
- **Position:** Fixed, centered horizontally, 16px from top
- **Style:** Frosted glass (backdrop-blur-md, semi-transparent warm-100)
- **Content:** Home | Experience | Portfolio | [Download PDF ↓]
- **Mobile:** Hamburger icon → slide-down menu
- **Z-index:** 50

### HeroSection
- **Height:** min-h-screen (fills viewport)
- **Layout:** Centered content, max-w-6xl
- **State:** `activeViz: 'role' | 'skills' | 'industry' | 'tech'`
- **Default:** 'role' (Role Evolution)
- **Background:** warm-50 with subtle gradient

### Visualizations (all 4)
- **Container:** aspect-[16/9] or similar, max-w-4xl centered
- **SVG:** viewBox-based for responsiveness
- **Entry animation:** Plays on mount (when visualization becomes active)
- **Exit:** AnimatePresence fade-out (200ms) before new viz fades in (300ms)

### ExperienceCard
- **Layout:** Full-width card with left accent border
- **Header:** Company (+ logo) | Role title | Date range
- **Body:** Collapsible sections with bullets
- **Footer:** Technology pills
- **Animation:** useScrollAnimation hook, fade-in + translateY(20px→0)

### FilterPills
- **Layout:** Horizontal scrollable row, gap-2
- **Active:** bg-coral text-white rounded-full
- **Inactive:** bg-warm-100 text-warm-700 border border-warm-200 rounded-full
- **Behavior:** Click toggles pill; "All" resets; inclusive OR logic

### ContactSection
- **Layout:** Two-column on desktop (copy left, form right), stacked on mobile
- **Fields:** Name (text), Email (email), Message (textarea)
- **Validation:** Required, email format check
- **Submit:** POST to Formspree endpoint
- **States:** idle, submitting (spinner), success (green check), error (red message)

### ProjectCard
- **Layout:** Vertical card with gradient thumbnail area
- **Hover:** translateY(-3px) + shadow increase, 200ms
- **Content:** Thumbnail → Title → Type pill → Description → Tech pills → Links

---

## 8. Responsive Breakpoints

| Breakpoint | Width | Behavior |
|-----------|-------|----------|
| Mobile | <768px | Single column, hamburger nav, simplified viz, stacked form |
| Tablet | 768-1199px | 2-col portfolio, stacked hero, side-by-side contact |
| Desktop | 1200px+ | Full layout, 3-col portfolio, all animations |

---

## 9. Integration Points

### Formspree
- Endpoint: `https://formspree.io/f/{form_id}` (user to configure)
- Method: POST with JSON body
- Fields: name, email, message
- CORS: Handled by Formspree
- Spam protection: Formspree built-in + honeypot field

### Vercel Analytics
- Import `@vercel/analytics` in root layout
- Auto-tracks page views
- Web Vitals monitoring included

### PDF Download
- Static file at `/resume/Dominik_Benger_Resume.pdf`
- `<a>` tag with `download` attribute
- No server-side generation

---

## 10. Performance Budget

| Metric | Target |
|--------|--------|
| First Contentful Paint | <1.5s |
| Largest Contentful Paint | <2.5s |
| Time to Interactive | <3s |
| Total Bundle Size (JS) | <200KB gzipped |
| Lighthouse Performance | 90+ |
| Lighthouse Accessibility | 95+ |
| Animation Frame Rate | 60fps |

---

## 11. Browser Support

| Browser | Versions |
|---------|----------|
| Chrome | Last 2 |
| Firefox | Last 2 |
| Safari | Last 2 |
| Edge | Last 2 |
| iOS Safari | Last 2 |
| Chrome Android | Last 2 |
