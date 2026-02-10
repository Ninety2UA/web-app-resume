'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const sectionAnim = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
}

const tocItems = [
  { id: 'project-overview', label: 'Project Overview' },
  { id: 'tech-stack', label: 'Tech Stack & Tools' },
  { id: 'project-setup', label: 'Project Setup & Configuration' },
  { id: 'architecture', label: 'Architecture & Design Decisions' },
  { id: 'workflow', label: 'Development Workflow with Claude Code' },
  { id: 'features', label: 'Key Features Built' },
  { id: 'challenges', label: 'Challenges & Solutions' },
  { id: 'documentation', label: 'Documentation & Project Management' },
  { id: 'lessons', label: 'Lessons Learned' },
  { id: 'results', label: 'Final Results & Reflections' },
  { id: 'appendix-commits', label: 'Appendix A: Commit Timeline' },
  { id: 'appendix-files', label: 'Appendix B: File Inventory' },
]

function CodeBlock({ children, label }: { children: string; label?: string }) {
  return (
    <div className="mb-6">
      {label && (
        <div className="text-xs font-medium text-warm-400 bg-[#2D2D2D] rounded-t-xl px-4 pt-3 pb-1 border-b border-warm-700/30">
          {label}
        </div>
      )}
      <pre className={`bg-[#1E1E1E] text-[#D4D4D4] ${label ? 'rounded-b-xl' : 'rounded-xl'} p-4 sm:p-5 overflow-x-auto text-sm leading-relaxed`}>
        <code>{children}</code>
      </pre>
    </div>
  )
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="border-l-4 border-coral/50 bg-warm-100/60 rounded-r-xl p-4 sm:p-5 mb-6">
      <div className="text-warm-700 leading-relaxed">{children}</div>
    </blockquote>
  )
}

function SectionTitle({ id, number, title }: { id: string; number?: string; title: string }) {
  return (
    <h2 id={id} className="text-2xl sm:text-3xl font-bold text-warm-900 mb-6 scroll-mt-24 pt-8 first:pt-0">
      {number && <span className="text-coral mr-2">{number}.</span>}
      {title}
    </h2>
  )
}

function SubTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-xl font-bold text-warm-900 mb-3 mt-8">{children}</h3>
}

export function EbookContent() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-12 px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...sectionAnim}>
            <p className="text-sm font-medium text-coral uppercase tracking-wider mb-3">Case Study</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-warm-900 mb-4 text-balance">
              Building dbenger.com: An AI-Assisted Portfolio Case Study
            </h1>
            <p className="text-warm-600 max-w-2xl mx-auto text-lg leading-relaxed mb-2">
              How I Built an Interactive Resume Web App in 3 Days with Claude Code
            </p>
            <p className="text-warm-400 text-sm">Dominik Benger &mdash; February 2026</p>
          </motion.div>
        </div>
      </section>

      {/* Article content */}
      <article className="px-4 md:px-6 pb-20">
        <div className="max-w-3xl mx-auto">

          {/* Table of Contents */}
          <motion.nav {...sectionAnim} className="bg-warm-100/60 border border-warm-200/50 rounded-2xl p-5 sm:p-8 mb-16" aria-label="Table of contents">
            <h2 className="text-lg font-bold text-warm-900 mb-4">Table of Contents</h2>
            <ol className="space-y-2">
              {tocItems.map((item, i) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-warm-600 hover:text-coral transition-colors duration-200 text-sm sm:text-base"
                  >
                    <span className="text-warm-400 mr-2">{i < 10 ? `${i + 1}.` : ''}</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </motion.nav>

          {/* ── Section 1: Project Overview ── */}
          <motion.section {...sectionAnim}>
            <SectionTitle id="project-overview" number="1" title="Project Overview" />

            <SubTitle>The Problem</SubTitle>
            <p className="text-warm-700 leading-relaxed mb-4">
              Static PDF resumes are limited. They&apos;re flat, one-dimensional documents that force 10+ years of career experience into bullet points on a page. Recruiters scan them in 30 seconds. There&apos;s no way to filter by relevance, explore career progression visually, or engage with the content interactively.
            </p>
            <p className="text-warm-700 leading-relaxed mb-6">I wanted something better.</p>

            <SubTitle>The Vision</SubTitle>
            <p className="text-warm-700 leading-relaxed mb-4">
              Replace my PDF resume with a fully interactive web application &mdash; a living document where visitors could:
            </p>
            <ul className="list-disc pl-6 text-warm-700 leading-relaxed mb-6 space-y-1">
              <li><strong>Explore</strong> my career trajectory through animated SVG visualizations</li>
              <li><strong>Filter</strong> my experience by industry, role type, or technical capability</li>
              <li><strong>Interact</strong> with 77 skills across 7 categories in a filterable tag grid</li>
              <li><strong>Connect</strong> directly through an integrated contact form</li>
              <li><strong>Download</strong> a traditional PDF when they needed one</li>
            </ul>
            <p className="text-warm-700 leading-relaxed mb-6">
              The result is <a href="https://dbenger.com" className="text-coral hover:underline">dbenger.com</a> &mdash; an animated, responsive web app built with Next.js 15, Tailwind CSS, Framer Motion, and custom SVG visualizations.
            </p>

            <SubTitle>The Constraint</SubTitle>
            <p className="text-warm-700 leading-relaxed mb-6">
              I built the entire project in approximately <strong>3 days</strong> using Claude Code as my primary development partner. No design team, no Figma mockups, no prior React/Next.js project in this domain. Just a 4-page resume PDF, a product requirements document, and an AI coding assistant.
            </p>

            <SubTitle>What It Became</SubTitle>
            <ul className="list-disc pl-6 text-warm-700 leading-relaxed mb-6 space-y-2">
              <li><strong>3 interactive visualizations</strong> &mdash; Career Path (animated SVG with year-proportional node positioning), Skills &amp; Tech Stack (filterable tag grid with 77 skills), and Industry Verticals (proportional bar chart with detail cards)</li>
              <li><strong>Filterable experience timeline</strong> &mdash; 8 career entries with expandable sections, company logos, technology tags, and key projects</li>
              <li><strong>Collaboration page</strong> &mdash; 10 service offerings with accordion deliverables, 3 packages, and a tooling showcase</li>
              <li><strong>Contact form</strong> &mdash; Formspree-powered with honeypot spam protection</li>
              <li><strong>Full accessibility</strong> &mdash; skip-to-content, ARIA tablist/tabpanel, keyboard navigation, <code className="text-sm bg-warm-100 px-1.5 py-0.5 rounded">prefers-reduced-motion</code> support</li>
              <li><strong>Mobile-first responsive design</strong> &mdash; tested at 320px, 375px, 768px, and 1024px+</li>
            </ul>
          </motion.section>

          <hr className="border-warm-200/60 my-12" />

          {/* ── Section 2: Tech Stack & Tools ── */}
          <motion.section {...sectionAnim}>
            <SectionTitle id="tech-stack" number="2" title="Tech Stack & Tools" />

            <SubTitle>Core Framework &amp; Libraries</SubTitle>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-warm-200">
                    <th className="text-left p-2.5 text-warm-900 font-semibold">Layer</th>
                    <th className="text-left p-2.5 text-warm-900 font-semibold">Technology</th>
                    <th className="text-left p-2.5 text-warm-900 font-semibold">Purpose</th>
                  </tr>
                </thead>
                <tbody className="text-warm-700">
                  {[
                    ['Framework', 'Next.js 15', 'App Router, SSG, Turbopack dev server'],
                    ['Language', 'TypeScript 5.7', 'Type safety across all data and components'],
                    ['UI Library', 'React 19', 'Component model'],
                    ['Styling', 'Tailwind CSS 3.4', 'Utility-first CSS with custom design tokens'],
                    ['Animations', 'Framer Motion 11', 'Scroll animations, page transitions, SVG path drawing'],
                    ['Visualizations', 'Custom SVG', 'Hand-built, no charting library'],
                    ['Analytics', 'Vercel Analytics', 'Page views and Web Vitals'],
                    ['Contact Form', 'Formspree', 'Serverless form handling'],
                    ['Font', 'Plus Jakarta Sans', 'Loaded via next/font/google'],
                  ].map(([layer, tech, purpose]) => (
                    <tr key={layer} className="border-b border-warm-200/50">
                      <td className="p-2.5 font-medium">{layer}</td>
                      <td className="p-2.5">{tech}</td>
                      <td className="p-2.5 text-warm-600">{purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <SubTitle>Development &amp; Deployment</SubTitle>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-warm-200">
                    <th className="text-left p-2.5 text-warm-900 font-semibold">Tool</th>
                    <th className="text-left p-2.5 text-warm-900 font-semibold">Purpose</th>
                  </tr>
                </thead>
                <tbody className="text-warm-700">
                  {[
                    ['ChatPRD', 'AI product management — helped draft the initial Product Requirements Document'],
                    ['Codex', 'AI research assistant — helped refine PRD structure, user stories, and requirements'],
                    ['Cursor', 'AI-powered IDE — used in Plan Mode with Codex models for planning and development'],
                    ['Claude Code', 'AI pair-programming — wrote the vast majority of code, docs, and config'],
                    ['Git / GitHub', 'Version control, hosted at github.com/Ninety2UA/web-app-resume'],
                    ['Vercel', 'Hosting, CDN, SSL, custom domain management'],
                    ['ESLint', 'Code quality with eslint-config-next'],
                  ].map(([tool, purpose]) => (
                    <tr key={tool} className="border-b border-warm-200/50">
                      <td className="p-2.5 font-medium">{tool}</td>
                      <td className="p-2.5 text-warm-600">{purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <SubTitle>What I Didn&apos;t Use (and Why)</SubTitle>
            <ul className="list-disc pl-6 text-warm-700 leading-relaxed mb-6 space-y-2">
              <li><strong>No charting library</strong> (Chart.js, Recharts, D3) &mdash; Custom SVG gave me full control over the Career Path visualization&apos;s aesthetics and animations without bundle bloat.</li>
              <li><strong>No CMS</strong> &mdash; Career data lives in TypeScript files under <code className="text-sm bg-warm-100 px-1.5 py-0.5 rounded">src/data/</code>. For a single-user site, a CMS adds complexity without value.</li>
              <li><strong>No test framework</strong> &mdash; The site is entirely presentational with no business logic. Visual QA via browser and Playwright snapshots was sufficient.</li>
              <li><strong>No database</strong> &mdash; Everything is statically generated at build time. Zero runtime data fetching.</li>
            </ul>

            <Callout>
              <strong>Key Insight:</strong> The &ldquo;no charting library&rdquo; decision saved significant bundle size and gave me pixel-perfect control over the Career Path visualization &mdash; including year-proportional node positioning, custom bezier curves, and per-node label placement. A charting library would have fought me on all of these.
            </Callout>
          </motion.section>

          <hr className="border-warm-200/60 my-12" />

          {/* ── Section 3: Project Setup & Configuration ── */}
          <motion.section {...sectionAnim}>
            <SectionTitle id="project-setup" number="3" title="Project Setup & Configuration" />

            <SubTitle>Project Initialization</SubTitle>
            <p className="text-warm-700 leading-relaxed mb-4">
              The project started from a standard Next.js 15 scaffold with TypeScript, Tailwind CSS, and the App Router enabled:
            </p>
            <CodeBlock label="package.json">{`{
  "dependencies": {
    "next": "^15.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "framer-motion": "^11.15.0",
    "@vercel/analytics": "^1.4.0"
  }
}`}</CodeBlock>
            <p className="text-warm-700 leading-relaxed mb-6">Five production dependencies. That&apos;s the entire runtime footprint.</p>

            <SubTitle>Tailwind Configuration</SubTitle>
            <p className="text-warm-700 leading-relaxed mb-4">
              The design system was encoded directly in <code className="text-sm bg-warm-100 px-1.5 py-0.5 rounded">tailwind.config.ts</code> with a warm color palette:
            </p>
            <CodeBlock label="tailwind.config.ts">{`colors: {
  warm: {
    50: '#FDFCFA',   // Page background
    100: '#F5F0EB',  // Card surfaces
    200: '#EDE6DE',  // Borders
    600: '#6B6560',  // Secondary text
    900: '#1A1814',  // Primary text
  },
  coral:    { DEFAULT: '#E07A5F' },  // Primary accent
  teal:     { DEFAULT: '#4A9B8E' },  // Secondary accent
  amber:    { DEFAULT: '#E6B35A' },  // Tertiary accent
  lavender: { DEFAULT: '#7C6FB0' },  // Quaternary accent
}`}</CodeBlock>
            <p className="text-warm-700 leading-relaxed mb-6">
              Custom box shadows, animation keyframes, and the Plus Jakarta Sans font family completed the config. The entire Tailwind setup fits in 80 lines.
            </p>

            <SubTitle>Next.js Configuration</SubTitle>
            <CodeBlock label="next.config.ts">{`const nextConfig: NextConfig = {
  images: { formats: ['image/avif', 'image/webp'] },
  reactStrictMode: true,
  poweredByHeader: false,
}`}</CodeBlock>
            <p className="text-warm-700 leading-relaxed mb-6">
              The <code className="text-sm bg-warm-100 px-1.5 py-0.5 rounded">poweredByHeader: false</code> removes the <code className="text-sm bg-warm-100 px-1.5 py-0.5 rounded">X-Powered-By: Next.js</code> header &mdash; a small security best practice. AVIF image support was enabled for future optimization.
            </p>

            <SubTitle>Global Styles</SubTitle>
            <p className="text-warm-700 leading-relaxed mb-4">
              The global CSS (<code className="text-sm bg-warm-100 px-1.5 py-0.5 rounded">globals.css</code>, 70 lines) handles smooth scrolling, font smoothing, custom selection colors, focus-visible outlines, custom scrollbar styling, and a <code className="text-sm bg-warm-100 px-1.5 py-0.5 rounded">prefers-reduced-motion</code> media query:
            </p>
            <CodeBlock label="globals.css">{`@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}`}</CodeBlock>

            <Callout>
              <strong>Design Decision:</strong> Using <code className="text-sm bg-warm-200 px-1.5 py-0.5 rounded">0.01ms</code> instead of <code className="text-sm bg-warm-200 px-1.5 py-0.5 rounded">0ms</code> prevents browsers from skipping <code className="text-sm bg-warm-200 px-1.5 py-0.5 rounded">animationend</code> / <code className="text-sm bg-warm-200 px-1.5 py-0.5 rounded">transitionend</code> events entirely. Framer Motion animation props still fire &mdash; they just complete instantly.
            </Callout>
          </motion.section>

          <hr className="border-warm-200/60 my-12" />

          {/* ── Section 4: Architecture & Design Decisions ── */}
          <motion.section {...sectionAnim}>
            <SectionTitle id="architecture" number="4" title="Architecture & Design Decisions" />

            <SubTitle>Page Architecture</SubTitle>
            <p className="text-warm-700 leading-relaxed mb-4">
              The site is a single-page scrollable app with three additional routes:
            </p>
            <CodeBlock>{`/                 → Hero + Visualizations + Filters + Experience + Contact + Footer
/collaboration    → Service offerings, packages, working style
/how-i-built-this → Case study: how the site was built with AI tools
/portfolio        → Project cards (hidden from nav — preserved for v2)`}</CodeBlock>
            <p className="text-warm-700 leading-relaxed mb-6">
              All four routes are <strong>statically generated</strong> (SSG) at build time. There are no API routes, no server-side data fetching, and no client-side data fetching. The entire site is served as pre-rendered HTML with hydrated React components for interactivity.
            </p>

            <SubTitle>Component Tree</SubTitle>
            <CodeBlock>{`Layout (all pages)
├── FloatingNav (fixed, always visible, z-50)
├── Skip-to-content link (z-[100])
└── Vercel Analytics

/ (Home)
├── HeroSection
│   ├── VisualizationToggle (tablist: 3 tabs)
│   ├── RoleEvolution (SVG + aligned HTML timeline)
│   ├── SkillsTechStack (interactive tag grid)
│   ├── IndustryVerticals (stacked bar + cards)
│   └── TimelineMarkers (shown for non-Career-Path tabs)
├── FilterPills (sticky, inclusive OR toggle chips)
├── ExperienceSection
│   ├── ExperienceCard × N (main roles)
│   ├── ExperienceCard × N (additional, compact)
│   └── Education
├── ContactSection (Formspree POST)
└── Footer

/how-i-built-this
└── EbookContent (full case study article with 12 sections)`}</CodeBlock>

            <SubTitle>Data Architecture</SubTitle>
            <p className="text-warm-700 leading-relaxed mb-4">
              All career data lives in <code className="text-sm bg-warm-100 px-1.5 py-0.5 rounded">src/data/</code> as typed TypeScript objects:
            </p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-warm-200">
                    <th className="text-left p-2.5 text-warm-900 font-semibold">File</th>
                    <th className="text-left p-2.5 text-warm-900 font-semibold">Contents</th>
                    <th className="text-left p-2.5 text-warm-900 font-semibold">Records</th>
                  </tr>
                </thead>
                <tbody className="text-warm-700">
                  {[
                    ['experience.ts', 'Career entries, education, filter tags', '8 entries, 7 filter tags'],
                    ['skills.ts', 'Skill categories, industry data, role progression nodes', '7 categories, 77 skills, 7 role nodes'],
                    ['offerings.ts', 'Service offerings, packages, add-ons, tool categories', '10 offerings, 3 packages'],
                    ['portfolio.ts', 'Project cards (placeholder)', '6 projects'],
                  ].map(([file, contents, records]) => (
                    <tr key={file} className="border-b border-warm-200/50">
                      <td className="p-2.5 font-mono text-sm">{file}</td>
                      <td className="p-2.5">{contents}</td>
                      <td className="p-2.5 text-warm-600">{records}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-warm-700 leading-relaxed mb-4">The <code className="text-sm bg-warm-100 px-1.5 py-0.5 rounded">ExperienceEntry</code> interface captures the full structure:</p>
            <CodeBlock label="TypeScript">{`interface ExperienceEntry {
  id: string
  company: string
  role: string
  team?: string
  location: string
  startDate: string          // "YYYY-MM"
  endDate: string | null     // null = "Present"
  summary: string
  sections: { title: string; bullets: string[] }[]
  keyProjects?: { title: string; description: string; link?: string }[]
  technologies: string[]
  industries: string[]       // maps to filter tag IDs
  roleType: string[]         // maps to filter tag IDs
  logo?: string              // path to company logo
  isAdditional?: boolean     // renders in compact "Additional Experience" section
}`}</CodeBlock>

            <Callout>
              <strong>Why TypeScript over JSON?</strong> TypeScript data files give us type checking at build time. If I misspell a filter tag ID, the build catches it. JSON would require runtime validation.
            </Callout>

            <SubTitle>Design System: The Warm Palette</SubTitle>
            <p className="text-warm-700 leading-relaxed mb-4">
              The entire visual language is built around a &ldquo;warm &amp; approachable&rdquo; aesthetic:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { name: 'Background', hex: '#FDFCFA', ring: 'ring-warm-200' },
                { name: 'Surface', hex: '#F5F0EB', ring: 'ring-warm-200' },
                { name: 'Terra Cotta', hex: '#E07A5F', ring: 'ring-coral/30' },
                { name: 'Sage Teal', hex: '#4A9B8E', ring: 'ring-teal/30' },
                { name: 'Amber', hex: '#E6B35A', ring: 'ring-amber/30' },
                { name: 'Lavender', hex: '#7C6FB0', ring: 'ring-lavender/30' },
                { name: 'Primary Text', hex: '#1A1814', ring: 'ring-warm-200' },
                { name: 'Secondary', hex: '#6B6560', ring: 'ring-warm-200' },
              ].map(({ name, hex }) => (
                <div key={name} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg border border-warm-200 shrink-0" style={{ backgroundColor: hex }} />
                  <div>
                    <p className="text-xs font-medium text-warm-900">{name}</p>
                    <p className="text-xs text-warm-500 font-mono">{hex}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-warm-700 leading-relaxed mb-6">
              Three extended colors (Sky <span className="font-mono text-sm">#5B8DB8</span>, Rose <span className="font-mono text-sm">#D4697A</span>, Emerald <span className="font-mono text-sm">#4A9B6E</span>) are used exclusively in the Skills &amp; Tech Stack visualization as inline styles &mdash; not in the Tailwind config &mdash; to keep the global palette lean.
            </p>

            <SubTitle>Z-Index Strategy</SubTitle>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-warm-200">
                    <th className="text-left p-2.5 text-warm-900 font-semibold">Element</th>
                    <th className="text-left p-2.5 text-warm-900 font-semibold">Z-Index</th>
                    <th className="text-left p-2.5 text-warm-900 font-semibold">Position</th>
                  </tr>
                </thead>
                <tbody className="text-warm-700">
                  {[
                    ['Sticky filter bar', 'z-30', 'sticky top-[68px]'],
                    ['FloatingNav', 'z-50', 'fixed top-4'],
                    ['Skip-to-content', 'z-[100]', 'Absolute on focus'],
                  ].map(([el, z, pos]) => (
                    <tr key={el} className="border-b border-warm-200/50">
                      <td className="p-2.5 font-medium">{el}</td>
                      <td className="p-2.5 font-mono text-sm">{z}</td>
                      <td className="p-2.5 text-warm-600 font-mono text-sm">{pos}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-warm-700 leading-relaxed mb-6">
              The filter bar uses <code className="text-sm bg-warm-100 px-1.5 py-0.5 rounded">top-[68px]</code> to sit below the FloatingNav (which is ~44px tall at <code className="text-sm bg-warm-100 px-1.5 py-0.5 rounded">top-4</code>). This relationship required careful measurement &mdash; getting it wrong caused the filter bar to overlap the nav on initial scroll.
            </p>
          </motion.section>

          <hr className="border-warm-200/60 my-12" />

          {/* ── Section 5: Development Workflow ── */}
          <motion.section {...sectionAnim}>
            <SectionTitle id="workflow" number="5" title="Development Workflow with Claude Code" />

            <SubTitle>How the Project Was Actually Built</SubTitle>
            <p className="text-warm-700 leading-relaxed mb-6">
              This project was built using <strong>Claude Code</strong> (Anthropic&apos;s CLI for Claude) as the primary development tool. I provided the direction, requirements, and design feedback; Claude Code wrote the code, config, documentation, and handled debugging.
            </p>

            <SubTitle>The Document-First Approach</SubTitle>
            <p className="text-warm-700 leading-relaxed mb-4">
              Before writing a single line of code, I created three foundational documents:
            </p>
            <ol className="list-decimal pl-6 text-warm-700 leading-relaxed mb-6 space-y-2">
              <li><strong>PRD (Product Requirements Document)</strong> &mdash; ~900 lines covering goals, user stories, functional requirements, UX flows, success metrics, and technical considerations. I used <strong>ChatPRD</strong> and <strong>Codex</strong> to draft and refine the initial PRD. I also used <strong>Cursor</strong> in Plan Mode with Codex models for planning and iterating on development strategy alongside Claude Code.</li>
              <li><strong>Technical Specification</strong> &mdash; ~380 lines defining the tech stack, data models, design system tokens, component specs, and performance budgets</li>
              <li><strong>Implementation Plan</strong> &mdash; ~470 lines breaking the project into 32+ tasks across 8 phases with explicit dependencies</li>
            </ol>

            <Callout>
              <strong>Key Strategy:</strong> Front-loading the documentation paid massive dividends. Using ChatPRD and Codex for the PRD meant the requirements were well-structured before any code was written. Claude Code could then reference the spec when making implementation decisions, and the task tracker gave both of us a shared understanding of progress and priorities.
            </Callout>

            <SubTitle>The CLAUDE.md File</SubTitle>
            <p className="text-warm-700 leading-relaxed mb-4">
              The project&apos;s <code className="text-sm bg-warm-100 px-1.5 py-0.5 rounded">CLAUDE.md</code> file grew to ~200 lines over the course of development. It served as persistent memory across sessions and included:
            </p>
            <ul className="list-disc pl-6 text-warm-700 leading-relaxed mb-6 space-y-1">
              <li><strong>Startup ritual</strong> &mdash; mandatory steps to read status docs and git state before making changes</li>
              <li><strong>Tech stack reference</strong> &mdash; quick lookup for versions, libraries, and patterns</li>
              <li><strong>Architecture decisions</strong> &mdash; documented choices so they wouldn&apos;t be revisited</li>
              <li><strong>Pitfalls section</strong> &mdash; known gotchas (z-index relationships, SVG text rendering, .gitignore exceptions)</li>
              <li><strong>Accessibility patterns</strong> &mdash; ARIA patterns used across the app</li>
              <li><strong>Session continuity notes</strong> &mdash; what was done last, what&apos;s deployed, what&apos;s next</li>
            </ul>
            <p className="text-warm-700 leading-relaxed mb-6">
              This file was the single most important artifact for multi-session development. Without it, every new session would have started from scratch.
            </p>

            <SubTitle>Task Breakdown and Phasing</SubTitle>
            <p className="text-warm-700 leading-relaxed mb-4">The project was organized into 19 phases:</p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-warm-200">
                    <th className="text-left p-2.5 text-warm-900 font-semibold">Phase</th>
                    <th className="text-left p-2.5 text-warm-900 font-semibold">Scope</th>
                    <th className="text-left p-2.5 text-warm-900 font-semibold">Tasks</th>
                  </tr>
                </thead>
                <tbody className="text-warm-700">
                  {[
                    ['0', 'Project setup', 'T01–T05'],
                    ['1', 'Data architecture', 'T06–T09'],
                    ['2', 'Layout & navigation', 'T10–T12'],
                    ['3', 'Hero section (4 visualizations)', 'T13–T19'],
                    ['4', 'Filters & experience', 'T20–T23'],
                    ['5', 'Contact & footer', 'T24'],
                    ['6', 'Portfolio page', 'T25–T27'],
                    ['7', 'Main page assembly', 'T28'],
                    ['8', 'Polish & QA', 'T29–T32'],
                    ['9', 'Collaboration page', 'T34'],
                    ['10', 'UI rework', 'U06–U10'],
                    ['11–14', 'Tweaks, docs, deploy, mobile fixes', 'U11–U15'],
                    ['15', 'Data & content fixes', 'U16–U17'],
                    ['16', 'Mobile spacing polish', 'U18–U19'],
                    ['17', 'Anchor scroll fixes', 'U20–U21'],
                    ['18', 'Ebook / case study page', 'T35'],
                  ].map(([phase, scope, tasks]) => (
                    <tr key={phase} className="border-b border-warm-200/50">
                      <td className="p-2.5 font-medium">{phase}</td>
                      <td className="p-2.5">{scope}</td>
                      <td className="p-2.5 text-warm-600 font-mono text-sm">{tasks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-warm-700 leading-relaxed mb-6">
              Phases 0–7 were completed in the <strong>first commit</strong> &mdash; over 10,000 lines of code across 41 files. This was the &ldquo;autonomous full build&rdquo; phase where Claude Code worked through the plan end-to-end.
            </p>

            <SubTitle>Multi-Agent Parallelism</SubTitle>
            <p className="text-warm-700 leading-relaxed mb-4">
              For Phase 8 (Polish &amp; Optimization), I used Claude Code&apos;s agent system to parallelize work across 4 agents:
            </p>
            <ul className="list-disc pl-6 text-warm-700 leading-relaxed mb-4 space-y-1">
              <li><strong>Agent 1:</strong> Responsive design for hero components</li>
              <li><strong>Agent 2:</strong> Responsive design for experience and contact components</li>
              <li><strong>Agent 3:</strong> Accessibility audit across all layouts</li>
              <li><strong>Agent 4:</strong> Performance analysis and optimization</li>
            </ul>
            <p className="text-warm-700 leading-relaxed mb-6">
              This parallel approach had a key lesson: <strong>agents blocked on file writes when permission prompts were unavailable</strong>. The solution was to split files by exclusive ownership (zero overlap between agents) to avoid merge conflicts.
            </p>

            <SubTitle>The Iteration Loop</SubTitle>
            <p className="text-warm-700 leading-relaxed mb-4">After the initial build, the workflow settled into a tight feedback loop:</p>
            <ol className="list-decimal pl-6 text-warm-700 leading-relaxed mb-6 space-y-1">
              <li><strong>Review the live site</strong> (via <code className="text-sm bg-warm-100 px-1.5 py-0.5 rounded">npm run dev</code>)</li>
              <li><strong>Identify issues</strong> (visual, behavioral, content)</li>
              <li><strong>Describe the issue to Claude Code</strong> (e.g., &ldquo;the chart labels overlap on nodes 1 and 2&rdquo;)</li>
              <li><strong>Claude Code fixes the code</strong> and explains the change</li>
              <li><strong>Verify</strong> in the browser</li>
              <li><strong>Commit</strong> when a batch of fixes is stable</li>
            </ol>
          </motion.section>

          <hr className="border-warm-200/60 my-12" />

          {/* ── Section 6: Key Features Built ── */}
          <motion.section {...sectionAnim}>
            <SectionTitle id="features" number="6" title="Key Features Built" />

            <SubTitle>Feature 1: Career Path Visualization (RoleEvolution)</SubTitle>
            <p className="text-warm-700 leading-relaxed mb-4">
              The centerpiece of the site &mdash; an animated SVG chart showing career progression from 2014 to 2025. Each career milestone is a node positioned proportionally by year:
            </p>
            <CodeBlock label="TypeScript">{`const yearToX = (year: number) =>
  padding.left + ((year - minYear) / yearRange) * chartW`}</CodeBlock>
            <p className="text-warm-700 leading-relaxed mb-4">
              The path connecting nodes uses cubic bezier curves, and draws itself using Framer Motion&apos;s <code className="text-sm bg-warm-100 px-1.5 py-0.5 rounded">pathLength</code> animation:
            </p>
            <CodeBlock label="TSX">{`<motion.path
  d={pathData}
  initial={{ pathLength: 0 }}
  animate={{ pathLength: 1 }}
  transition={{ duration: 1.5, ease: [0.37, 0, 0.63, 1] }}
/>`}</CodeBlock>
            <p className="text-warm-700 leading-relaxed mb-4">
              <strong>Label placement</strong> was the hardest part. Early-career nodes (2014–2018) are bunched in the left ~36% of the chart, so labels needed custom diagonal offsets:
            </p>
            <CodeBlock label="TypeScript">{`const labelPlacements = [
  { dx: 0,   titleDy: 38,  anchor: 'start' },   // Node 0: below
  { dx: 24,  titleDy: 30,  anchor: 'start' },   // Node 1: below-right
  { dx: 24,  titleDy: 30,  anchor: 'start' },   // Node 2: below-right
  { dx: -24, titleDy: -44, anchor: 'end' },     // Node 3: above-left
  { dx: 24,  titleDy: 30,  anchor: 'start' },   // Node 4: below-right
  { dx: 0,   titleDy: -50, anchor: 'middle' },  // Node 5: above
  { dx: 0,   titleDy: -50, anchor: 'end' },     // Node 6: above-right
]`}</CodeBlock>

            <Callout>
              <strong>Pitfall Discovered:</strong> SVG <code className="text-sm bg-warm-200 px-1.5 py-0.5 rounded">textAnchor=&quot;end&quot;</code> near the left edge of the viewBox clips text off-screen. Node 1 had to use <code className="text-sm bg-warm-200 px-1.5 py-0.5 rounded">textAnchor=&quot;start&quot;</code> with a positive <code className="text-sm bg-warm-200 px-1.5 py-0.5 rounded">dx</code> offset instead.
            </Callout>

            <SubTitle>Feature 2: Skills &amp; Tech Stack (Interactive Tag Grid)</SubTitle>
            <p className="text-warm-700 leading-relaxed mb-4">
              A filterable grid of 77 skills across 7 color-coded categories. Clicking a category filter isolates that category; clicking again resets. Colors are defined as inline styles via a <code className="text-sm bg-warm-100 px-1.5 py-0.5 rounded">colorMap</code> object &mdash; the extended palette didn&apos;t need to exist in the global Tailwind config:
            </p>
            <CodeBlock label="TypeScript">{`const colorMap = {
  teal:    { dot: '#4A9B8E', bg: '#EFF8F6', text: '#3B7D72', border: '#4A9B8E30' },
  sky:     { dot: '#5B8DB8', bg: '#EEF4F9', text: '#4A7396', border: '#5B8DB830' },
  // ... 5 more
}`}</CodeBlock>

            <SubTitle>Feature 3: Filterable Experience Section</SubTitle>
            <p className="text-warm-700 leading-relaxed mb-4">
              Experience cards filter dynamically using pill toggle buttons with inclusive OR logic. Filter state lives at the page level and flows down:
            </p>
            <CodeBlock label="TSX">{`export default function Home() {
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  return (
    <>
      <FilterPills activeFilters={activeFilters} onFilterChange={setActiveFilters} />
      <ExperienceSection activeFilters={activeFilters} />
    </>
  )
}`}</CodeBlock>

            <SubTitle>Feature 4: Scroll-Triggered Animations</SubTitle>
            <p className="text-warm-700 leading-relaxed mb-4">
              A custom <code className="text-sm bg-warm-100 px-1.5 py-0.5 rounded">useScrollAnimation</code> hook drives reveal animations using IntersectionObserver:
            </p>
            <CodeBlock label="TypeScript">{`export function useScrollAnimation(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true)  // bypass observer entirely
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)  // trigger once only
        }
      },
      { threshold, rootMargin: '0px 0px -80px 0px' }
    )
    // ...
  }, [threshold])
  return { ref, isVisible }
}`}</CodeBlock>

            <SubTitle>Feature 5: Contact Form with Formspree</SubTitle>
            <p className="text-warm-700 leading-relaxed mb-4">
              A client-side form that POSTs to Formspree&apos;s API with four states: <code className="text-sm bg-warm-100 px-1.5 py-0.5 rounded">idle</code> &rarr; <code className="text-sm bg-warm-100 px-1.5 py-0.5 rounded">submitting</code> (spinner) &rarr; <code className="text-sm bg-warm-100 px-1.5 py-0.5 rounded">success</code> (checkmark) &rarr; <code className="text-sm bg-warm-100 px-1.5 py-0.5 rounded">error</code> (fallback mailto link). A hidden honeypot field provides spam protection.
            </p>

            <SubTitle>Feature 6: Collaboration Page</SubTitle>
            <p className="text-warm-700 leading-relaxed mb-4">
              A full service offerings page (<code className="text-sm bg-warm-100 px-1.5 py-0.5 rounded">/collaboration</code>) with 10 service offerings using accordion-style deliverables, 3 packages (Audit / Build / Operate) in a comparison card layout, and a working style section with principle cards and tool category pills.
            </p>

            <SubTitle>Feature 7: Floating Navigation</SubTitle>
            <p className="text-warm-700 leading-relaxed mb-4">
              An always-visible pill-shaped nav bar, fixed at the top center. This went through several iterations:
            </p>
            <ol className="list-decimal pl-6 text-warm-700 leading-relaxed mb-4 space-y-1">
              <li><strong>v1:</strong> Hidden on load, appeared on scroll with AnimatePresence wrapper</li>
              <li><strong>v2:</strong> Always visible, but with a hamburger menu on mobile</li>
              <li><strong>v3 (final):</strong> Always visible, same horizontal pill layout at all breakpoints</li>
            </ol>
            <p className="text-warm-700 leading-relaxed mb-6">
              The final version removed ~87 lines of code (scroll listener, useState, AnimatePresence, hamburger menu, dropdown). Simpler was better.
            </p>
          </motion.section>

          <hr className="border-warm-200/60 my-12" />

          {/* ── Section 7: Challenges & Solutions ── */}
          <motion.section {...sectionAnim}>
            <SectionTitle id="challenges" number="7" title="Challenges & Solutions" />

            {[
              {
                title: 'Challenge 1: SVG Label Overlap in Year-Proportional Chart',
                problem: 'When nodes are positioned by actual year (2014–2025), early-career roles (2014–2018) bunch in the left ~36% of the chart. Labels for adjacent nodes overlap each other and the bezier curves.',
                solution: 'A per-node labelPlacements array with diagonal offsets. Bunched nodes alternate between above-left and below-right placement. This took 3 revisions (U04, U05, then the full U06–U10 rework) to get right.',
              },
              {
                title: 'Challenge 2: Mobile Chart Horizontal Scroll',
                problem: 'The RoleEvolution SVG had min-w-[500px] to prevent it from becoming unreadably small on narrow viewports. This forced a horizontal scroll container — a poor mobile experience.',
                solution: 'Removed the min-width entirely and let the SVG scale naturally via viewBox="0 0 900 440" + preserveAspectRatio="xMidYMid meet".',
              },
              {
                title: 'Challenge 3: Nav/Filter Bar Z-Index Overlap',
                problem: 'After launch, the sticky filter bar overlapped the floating nav when scrolling. The filter bar used sticky top-0, placing it at the same position as the FloatingNav.',
                solution: 'Changed the filter bar to sticky top-[68px] — calculated by measuring the FloatingNav height (~44px) plus its top-4 offset (16px) plus breathing room.',
              },
              {
                title: 'Challenge 4: next/image Dimension Warnings with Company Logos',
                problem: 'Company logos have varying aspect ratios. next/image requires explicit width and height props, and mismatches produce console warnings.',
                solution: 'Used plain <img> tags with an ESLint disable/enable block. The logos are small static PNGs (3–153KB) that don\'t benefit from the optimization pipeline. The build size actually decreased from 162kB to 156kB.',
              },
              {
                title: 'Challenge 5: Cross-Page Navigation with Anchor Links',
                problem: '#section hrefs in the FloatingNav didn\'t work when navigating from /collaboration back to the home page.',
                solution: 'Prefix all anchor links with / — using /#top, /#experience instead of #top, #experience. Next.js handles the route change to / first, then scrolls to the anchor.',
              },
              {
                title: 'Challenge 6: Merging Two Visualizations into One',
                problem: 'The original design had 4 visualization tabs. The Skills (bar chart) and Tech Stack (timeline) tabs felt incomplete individually.',
                solution: 'Merged them into a single "Skills & Tech Stack" interactive tag grid with category filters. This reduced tabs from 4 to 3 and showcased all 77 skills at once.',
              },
            ].map((challenge) => (
              <div key={challenge.title} className="mb-8">
                <h3 className="text-lg font-bold text-warm-900 mb-3">{challenge.title}</h3>
                <p className="text-warm-700 leading-relaxed mb-2">
                  <strong className="text-warm-800">Problem:</strong> {challenge.problem}
                </p>
                <p className="text-warm-700 leading-relaxed">
                  <strong className="text-warm-800">Solution:</strong> {challenge.solution}
                </p>
              </div>
            ))}
          </motion.section>

          <hr className="border-warm-200/60 my-12" />

          {/* ── Section 8: Documentation & Project Management ── */}
          <motion.section {...sectionAnim}>
            <SectionTitle id="documentation" number="8" title="Documentation & Project Management" />

            <SubTitle>The Document Stack</SubTitle>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-warm-200">
                    <th className="text-left p-2.5 text-warm-900 font-semibold">Document</th>
                    <th className="text-left p-2.5 text-warm-900 font-semibold">Lines</th>
                    <th className="text-left p-2.5 text-warm-900 font-semibold">Purpose</th>
                  </tr>
                </thead>
                <tbody className="text-warm-700">
                  {[
                    ['PRD.md', '~890', 'Requirements, user stories, success metrics'],
                    ['Spec.md', '~380', 'Tech stack, data models, component specs, performance budgets'],
                    ['Plan.md', '~470', 'Phased task breakdown with dependencies'],
                    ['tasks.md', '~270', 'Task tracker with completion status and detail sections'],
                    ['STATUS.md', '~140', 'Current state summary, decisions made, pitfalls'],
                    ['CLAUDE.md', '~200', 'AI assistant instructions, startup ritual, patterns'],
                  ].map(([doc, lines, purpose]) => (
                    <tr key={doc} className="border-b border-warm-200/50">
                      <td className="p-2.5 font-mono text-sm font-medium">{doc}</td>
                      <td className="p-2.5 text-center">{lines}</td>
                      <td className="p-2.5 text-warm-600">{purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <SubTitle>How They Were Used</SubTitle>
            <ul className="space-y-4 mb-6">
              {[
                { doc: 'PRD', desc: 'Written first, before any code. Defined what "done" looks like. Referenced throughout for scope decisions.' },
                { doc: 'Spec', desc: 'The bridge between requirements and implementation. Data model interfaces were copy-pasted from the spec into TypeScript files.' },
                { doc: 'Plan', desc: 'The execution roadmap. Tasks were organized with explicit dependencies, enabling Claude Code to work through them in the correct order.' },
                { doc: 'tasks.md', desc: 'The living task tracker. Every completed task got a "Detail" section documenting what was done and what changed.' },
                { doc: 'STATUS.md', desc: 'The "executive summary" — quick reference for project state, recent commits, and known issues.' },
                { doc: 'CLAUDE.md', desc: 'Persistent instruction set for the AI assistant, including a mandatory startup ritual that prevented making changes without understanding the current state.' },
              ].map(({ doc, desc }) => (
                <li key={doc} className="text-warm-700 leading-relaxed">
                  <strong className="text-warm-900">{doc}</strong> &mdash; {desc}
                </li>
              ))}
            </ul>

            <SubTitle>Session Continuity</SubTitle>
            <p className="text-warm-700 leading-relaxed mb-4">Each development session ended with a &ldquo;session wrap&rdquo; that updated the docs:</p>
            <ol className="list-decimal pl-6 text-warm-700 leading-relaxed mb-4 space-y-1">
              <li>Update STATUS.md with what was accomplished</li>
              <li>Update tasks.md with completed task details</li>
              <li>Update CLAUDE.md if new patterns or pitfalls were discovered</li>
              <li>Commit the doc updates</li>
            </ol>

            <Callout>
              <strong>Key Takeaway:</strong> Documentation isn&apos;t overhead when working with AI &mdash; it&apos;s infrastructure. The docs were the mechanism that made multi-session development coherent.
            </Callout>
          </motion.section>

          <hr className="border-warm-200/60 my-12" />

          {/* ── Section 9: Lessons Learned ── */}
          <motion.section {...sectionAnim}>
            <SectionTitle id="lessons" number="9" title="Lessons Learned" />

            <SubTitle>On AI-Assisted Development</SubTitle>
            <div className="space-y-4 mb-8">
              <Callout>
                <strong>&ldquo;Front-load your docs.&rdquo;</strong> The more context you provide upfront (PRD, spec, plan), the less course-correction you need during implementation. The initial autonomous build (10,000+ lines in one commit) was possible because the spec was thorough enough for Claude Code to make correct decisions without asking.
              </Callout>
              <Callout>
                <strong>&ldquo;CLAUDE.md is your most important file.&rdquo;</strong> It&apos;s the persistent memory that makes sessions composable. Every pitfall documented, every pattern recorded, every architectural decision captured &mdash; they compound across sessions.
              </Callout>
              <Callout>
                <strong>&ldquo;Review everything.&rdquo;</strong> AI-generated code is not reviewed code. Every commit in this project was manually verified in the browser at multiple viewport sizes. The AI got the structure right ~90% of the time; the remaining 10% was the difference between &ldquo;works&rdquo; and &ldquo;polished.&rdquo;
              </Callout>
            </div>

            <SubTitle>On Architecture</SubTitle>
            <div className="space-y-4 mb-8">
              <Callout>
                <strong>&ldquo;Fewer dependencies, fewer problems.&rdquo;</strong> Five production dependencies. Zero API routes. Zero database. Every decision to not add something made the project simpler to build, debug, and deploy.
              </Callout>
              <Callout>
                <strong>&ldquo;Custom SVG beats chart libraries for bespoke visualizations.&rdquo;</strong> The Career Path chart needed year-proportional positioning, custom bezier curves, per-node label placement, and Framer Motion integration. No charting library offers all of that without fighting the API.
              </Callout>
              <Callout>
                <strong>&ldquo;Static TypeScript data is underrated.&rdquo;</strong> Type-checked data files with no runtime overhead. Changes are caught at build time. No CMS complexity for a single-user site.
              </Callout>
            </div>

            <SubTitle>On Process</SubTitle>
            <div className="space-y-4 mb-8">
              <Callout>
                <strong>&ldquo;Ship fast, then iterate.&rdquo;</strong> The initial build was deployed live, then refined over several focused sessions. Each iteration addressed a specific cluster of issues.
              </Callout>
              <Callout>
                <strong>&ldquo;Document your pitfalls.&rdquo;</strong> The pitfalls section in CLAUDE.md prevented the same mistakes from recurring. Each was encountered once and never again.
              </Callout>
              <Callout>
                <strong>&ldquo;Parallel agents need exclusive file ownership.&rdquo;</strong> When running multiple AI agents, split files so no two agents write to the same file. Merge conflicts with AI-generated code are painful to resolve.
              </Callout>
            </div>

            <SubTitle>On Design</SubTitle>
            <div className="space-y-4 mb-8">
              <Callout>
                <strong>&ldquo;Warm palettes create approachability.&rdquo;</strong> The deliberate choice of warm off-white over pure white, and warm near-black over pure black, creates a softer, more inviting feel. Small HSL shifts make a large perceptual difference.
              </Callout>
              <Callout>
                <strong>&ldquo;Navigation simplicity wins.&rdquo;</strong> The FloatingNav went through 3 iterations before arriving at the simplest version: a fixed horizontal pill bar with no scroll triggers, no hamburger menu, no animation wrappers. The final version is 47 lines of code.
              </Callout>
            </div>
          </motion.section>

          <hr className="border-warm-200/60 my-12" />

          {/* ── Section 10: Final Results & Reflections ── */}
          <motion.section {...sectionAnim}>
            <SectionTitle id="results" number="10" title="Final Results & Reflections" />

            <SubTitle>By the Numbers</SubTitle>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              {[
                { label: 'Development time', value: '~3 days' },
                { label: 'Total commits', value: '29' },
                { label: 'Source files', value: '~32' },
                { label: 'Lines (initial commit)', value: '10,581' },
                { label: 'Dependencies', value: '5' },
                { label: 'First Load JS', value: '158 kB' },
                { label: 'CSS bundle', value: '25 kB' },
                { label: 'Pages (SSG)', value: '4' },
                { label: 'Build warnings', value: '0' },
                { label: 'Skills showcased', value: '77' },
                { label: 'Experience entries', value: '8' },
                { label: 'Visualizations', value: '3' },
              ].map(({ label, value }) => (
                <div key={label} className="bg-warm-100/60 border border-warm-200/50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-warm-900">{value}</p>
                  <p className="text-xs text-warm-500 mt-1">{label}</p>
                </div>
              ))}
            </div>

            <SubTitle>What Worked</SubTitle>
            <ol className="list-decimal pl-6 text-warm-700 leading-relaxed mb-8 space-y-2">
              <li><strong>The document-first approach</strong> &mdash; PRD &rarr; Spec &rarr; Plan &rarr; Build. The upfront investment in docs made the autonomous build phase possible.</li>
              <li><strong>Claude Code for rapid prototyping</strong> &mdash; Going from zero to a deployed, responsive, accessible web app in 3 days would not have been feasible without AI assistance.</li>
              <li><strong>Custom SVG visualizations</strong> &mdash; They&apos;re the differentiating feature. Visitors engage with the Career Path chart in a way they never would with a static timeline.</li>
              <li><strong>Progressive refinement</strong> &mdash; The &ldquo;ship, then iterate&rdquo; approach kept momentum high.</li>
              <li><strong>Persistent documentation</strong> &mdash; The docs survived across sessions and prevented context loss.</li>
            </ol>

            <SubTitle>What I&apos;d Do Differently</SubTitle>
            <ol className="list-decimal pl-6 text-warm-700 leading-relaxed mb-8 space-y-2">
              <li><strong>Start with mobile</strong> &mdash; The first build was desktop-primary. Mobile fixes came later. Starting mobile-first would have avoided the chart horizontal scroll issue entirely.</li>
              <li><strong>Design in the browser sooner</strong> &mdash; Some label placement issues required 3 iterations. A quicker feedback loop would have caught these earlier.</li>
              <li><strong>Add Lighthouse CI</strong> &mdash; Automated Lighthouse scoring on each commit would catch performance regressions before they ship.</li>
            </ol>

            <SubTitle>What&apos;s Next</SubTitle>
            <ul className="list-disc pl-6 text-warm-700 leading-relaxed mb-8 space-y-1">
              <li><strong>Portfolio page v2</strong> &mdash; Real case studies and project showcases</li>
              <li><strong>Blog / writing section</strong> &mdash; Expanding from a resume into a personal brand platform</li>
              <li><strong>Analytics refinement</strong> &mdash; Custom event tracking for visualization interactions</li>
              <li><strong>Performance optimization</strong> &mdash; Dynamic imports, font weight subsetting, lazy loading</li>
            </ul>

            <SubTitle>Final Thought</SubTitle>
            <p className="text-warm-700 leading-relaxed mb-6">
              This project started as a replacement for a 4-page PDF. It became a case study in how AI-assisted development changes the economics of personal projects. What would have been a multi-week effort for a solo developer became a weekend sprint. The tools didn&apos;t write the vision &mdash; they executed it. The taste, the design decisions, the &ldquo;should this be a chart or a grid?&rdquo; choices &mdash; those remain human. But the implementation velocity? That&apos;s transformed.
            </p>
            <p className="text-warm-700 leading-relaxed mb-6">
              The site is live at <a href="https://dbenger.com" className="text-coral hover:underline">dbenger.com</a>. The code is open at <a href="https://github.com/Ninety2UA/web-app-resume" className="text-coral hover:underline" target="_blank" rel="noopener noreferrer">github.com/Ninety2UA/web-app-resume</a>.
            </p>
          </motion.section>

          <hr className="border-warm-200/60 my-12" />

          {/* ── Appendix A: Commit Timeline ── */}
          <motion.section {...sectionAnim}>
            <SectionTitle id="appendix-commits" title="Appendix A: Commit Timeline" />

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-warm-200">
                    <th className="text-left p-2.5 text-warm-900 font-semibold">Date</th>
                    <th className="text-left p-2.5 text-warm-900 font-semibold">Hash</th>
                    <th className="text-left p-2.5 text-warm-900 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="text-warm-700">
                  {[
                    ['Feb 8', 'fb6a036', 'Initial commit: complete interactive resume (Phases 0–7, 10,581 lines)'],
                    ['Feb 8', '34e5062', 'Phase 8: responsive design, accessibility, performance, launch prep'],
                    ['Feb 8', '53bdd97', 'Fix post-launch UI issues (nav/filter overlap, chart labels, padding)'],
                    ['Feb 8', '47ba309', 'Merge Skills + Tech Stack visualizations into single interactive tab'],
                    ['Feb 8', '18a2ea5', 'Add Collaboration page with 10 service offerings'],
                    ['Feb 9', 'b5e26ea', 'UI rework: year-proportional chart, aligned timeline, nav cleanup'],
                    ['Feb 9', '2d65169', 'Add company logos, full resume content, nav fix, README'],
                    ['Feb 10', '6863c84', 'Comprehensive README rewrite, CLAUDE.md sync'],
                    ['Feb 10', 'e8f9cae', 'Sync project docs with latest commit history'],
                    ['Feb 10', '78bb8f6', 'Mark deployment complete — live at dbenger.com'],
                    ['Feb 10', 'ec931fc', 'Update RIT logo with new version'],
                    ['Feb 10', '1f47fd8', 'Fix mobile layout: remove chart scroll, inline pill nav'],
                    ['Feb 10', '648994d', 'Fix Google intern dates to Jan 2017 – Aug 2017'],
                    ['Feb 10', 'd083605', 'Update downloadable resume PDF to V3'],
                    ['Feb 10', '6823438', 'Add bottom padding to hero section for mobile spacing'],
                    ['Feb 10', 'fb4ece0', 'Tighten mobile nav tabs and enlarge hero chart on mobile'],
                    ['Feb 10', '9ce59d3', 'Fix Contact anchor scroll on mobile'],
                    ['Feb 10', 'e2d7434', 'Fix Experience anchor scroll: heading hidden behind fixed nav'],
                  ].map(([date, hash, desc]) => (
                    <tr key={hash} className="border-b border-warm-200/50">
                      <td className="p-2.5 whitespace-nowrap">{date}</td>
                      <td className="p-2.5 font-mono text-xs text-warm-500">{hash}</td>
                      <td className="p-2.5">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.section>

          <hr className="border-warm-200/60 my-12" />

          {/* ── Appendix B: File Inventory ── */}
          <motion.section {...sectionAnim}>
            <SectionTitle id="appendix-files" title="Appendix B: File Inventory" />

            <SubTitle>Source Files (src/)</SubTitle>
            <CodeBlock>{`src/app/
├── layout.tsx              Root layout (fonts, metadata, analytics)
├── page.tsx                Home page (Hero + Filters + Experience + Contact)
├── globals.css             Global styles + Tailwind directives
├── icon.svg                Favicon (DB monogram)
├── opengraph-image.png     OG image (1200×630)
├── collaboration/page.tsx      /collaboration route
├── how-i-built-this/page.tsx  /how-i-built-this route (case study)
└── portfolio/page.tsx         /portfolio route (hidden)

src/components/
├── layout/FloatingNav.tsx              Always-visible pill navigation
├── layout/Footer.tsx                   Footer with social links
├── hero/HeroSection.tsx                Hero wrapper (viz toggle, viz area, timeline)
├── hero/VisualizationToggle.tsx        3-tab toggle buttons
├── hero/TimelineMarkers.tsx            Era markers (non-Career-Path tabs)
├── hero/visualizations/
│   ├── RoleEvolution.tsx               SVG career path chart
│   ├── SkillsTechStack.tsx             Interactive skill tag grid
│   └── IndustryVerticals.tsx           Stacked bar + detail cards
├── experience/ExperienceSection.tsx    Filtered experience container
├── experience/ExperienceCard.tsx       Individual experience card
├── filters/FilterPills.tsx             Toggle filter chips
├── contact/ContactSection.tsx          Formspree contact form
├── portfolio/PortfolioGrid.tsx         Project card grid
├── portfolio/ProjectCard.tsx           Individual project card
├── collaboration/OfferingCard.tsx      Service offering with accordion
├── collaboration/OfferingsGrid.tsx     2-column offering grid
├── collaboration/PackageCards.tsx      3-tier package comparison
├── collaboration/WorkingStyleSection.tsx  Principles + tool pills
└── ebook/EbookContent.tsx             Case study article (12 sections)

src/data/
├── experience.ts    8 career entries + education + filter tags
├── skills.ts        7 skill categories + industry data + role nodes
├── offerings.ts     10 offerings + 3 packages + tools
└── portfolio.ts     6 project cards (placeholder)

src/hooks/
└── useScrollAnimation.ts  IntersectionObserver scroll trigger

src/lib/
└── utils.ts  cn() classname merger + formatDateRange()`}</CodeBlock>

            <SubTitle>Configuration Files</SubTitle>
            <CodeBlock>{`package.json          Dependencies and scripts
next.config.ts        Next.js config (images, strict mode)
tailwind.config.ts    Design system tokens (colors, shadows, animations)
tsconfig.json         TypeScript config (strict, path aliases)
postcss.config.mjs    PostCSS + Autoprefixer
.eslintrc.json        ESLint config
.gitignore            Ignores with PNG exceptions`}</CodeBlock>

            <SubTitle>Documentation Files (docs/)</SubTitle>
            <CodeBlock>{`PRD.md                          Product Requirements Document (~890 lines)
Spec.md                         Technical Specification (~380 lines)
Plan.md                         Implementation Plan (~470 lines)
tasks.md                        Task Tracker (~270 lines)
STATUS.md                       Project Status (~140 lines)
Dominik_Benger_Resume_4Page.md  Source resume content
Offering.md                     Service offerings source
ebook-building-dbenger-com.md   Source content for the case study page
resume-file/                    Original PDF resume`}</CodeBlock>
          </motion.section>

          {/* ── Footer CTA ── */}
          <motion.section {...sectionAnim} className="mt-16 py-12 border-t border-warm-200/60 text-center">
            <p className="text-warm-500 text-sm mb-4">
              Built with Next.js 15, Tailwind CSS, Framer Motion, and Claude Code.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-coral text-white font-semibold rounded-full hover:bg-coral-dark shadow-glow-coral transition-all duration-200 text-sm"
              >
                View the Live Site
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </Link>
              <a
                href="https://github.com/Ninety2UA/web-app-resume"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-warm-200 text-warm-700 font-semibold rounded-full hover:border-warm-300 hover:text-warm-900 transition-all duration-200 text-sm"
              >
                View Source on GitHub
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
          </motion.section>

        </div>
      </article>
    </>
  )
}
