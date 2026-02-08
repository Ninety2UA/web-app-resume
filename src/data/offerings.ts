export interface CoreOffering {
  id: string
  number: number
  name: string
  audience: string
  outcome: string
  outcomeLabel: string
  deliverables: string[]
  deliverablesLabel: string
  accentColor: string
}

export interface ServicePackage {
  id: string
  name: string
  letter: string
  timeline: string
  bestIf: string
  items: string[]
  accentColor: string
}

export interface ToolCategory {
  name: string
  tools: string[]
}

export interface WorkingPrinciple {
  label: string
  description: string
}

export const coreOfferings: CoreOffering[] = [
  {
    id: 'mobile-measurement',
    number: 1,
    name: 'Mobile App Measurement & Attribution Setup',
    audience: 'app studios, subscription apps, gaming',
    outcome: 'trustworthy conversion tracking + attribution you can act on',
    outcomeLabel: 'Outcome',
    deliverables: [
      'End-to-end measurement map (events \u2192 conversions \u2192 revenue)',
      'Tracking audit + fixes (gaps, inconsistencies, missing revenue signals)',
      'MMP alignment (naming, mapping, dedupe assumptions, governance)',
      '\u201CSource of truth\u201D definitions doc (ROAS, LTV, retention, conversions)',
    ],
    deliverablesLabel: 'Typical deliverables',
    accentColor: '#E07A5F',
  },
  {
    id: 'skan-rebuild',
    number: 2,
    name: 'SKAdNetwork / iOS Privacy Measurement Rebuild',
    audience: 'iOS-heavy advertisers (post-privacy changes)',
    outcome: 'SKAN you can optimize against \u2014 not just report',
    outcomeLabel: 'Outcome',
    deliverables: [
      'Conversion Value (CV) / schema design + decoding approach',
      'SKAN reporting dashboards (network/campaign where possible)',
      'Optimization playbook (what to change when SKAN shifts)',
    ],
    deliverablesLabel: 'Typical deliverables',
    accentColor: '#4A9B8E',
  },
  {
    id: 'daily-engine',
    number: 3,
    name: 'Performance Analytics \u201CDaily Engine\u201D',
    audience: 'teams that need always-on clarity (not monthly reporting)',
    outcome: 'daily visibility into performance, spend, ROAS, CPI/A, ROAS, LTV, retention, anomalies',
    outcomeLabel: 'Outcome',
    deliverables: [
      'Automated pipelines (multi-report & multi-source unified)',
      'KPI scorecards + alerting (pacing, anomalies, sudden drops)',
      'Overall performance,funnel + cohort/LTV dashboards + exec views',
      'Performance decoding & forensics to diagnose performance swings + prioritize high-impact actions',
    ],
    deliverablesLabel: 'Typical deliverables',
    accentColor: '#E6B35A',
  },
  {
    id: 'bigquery-bi',
    number: 4,
    name: 'BigQuery + BI Implementation (Marketing Data Warehouse)',
    audience: 'teams whose data lives across platforms and spreadsheets',
    outcome: 'one reliable dataset powering every report and analysis',
    outcomeLabel: 'Outcome',
    deliverables: [
      'Warehouse schema for marketing + product + revenue',
      'Automated ingestion (scheduled transfers / APIs where needed)',
      'Clean reporting layer (analysis-ready tables + BI model)',
    ],
    deliverablesLabel: 'Typical deliverables',
    accentColor: '#7C6FB0',
  },
  {
    id: 'spend-optimization',
    number: 5,
    name: 'Marketing Spend Optimization (Budget / Bid / Creative Diagnostics)',
    audience: 'teams spending enough that small improvements matter',
    outcome: 'measurable lift via a repeatable decision framework',
    outcomeLabel: 'Outcome',
    deliverables: [
      'Budget/bid structure review + recommendations',
      'Creative performance analysis framework (what drives outcomes)',
      'Change-history forensics (what changed, when, and what it broke)',
      'Prioritized action list by impact + confidence',
    ],
    deliverablesLabel: 'Typical deliverables',
    accentColor: '#E07A5F',
  },
  {
    id: 'experimentation',
    number: 6,
    name: 'Experimentation & Incrementality Program',
    audience: 'teams unsure what\u2019s actually driving growth',
    outcome: 'proof-based allocation decisions',
    outcomeLabel: 'Outcome',
    deliverables: [
      'Experiment design (A/B tests, geo tests, lift tests)',
      'Measurement plan + reporting templates',
      'Decision rules (scale/kill thresholds)',
    ],
    deliverablesLabel: 'Typical deliverables',
    accentColor: '#4A9B8E',
  },
  {
    id: 'ai-analytics',
    number: 7,
    name: 'AI-Powered Analytics & Reporting (Practical, Not Hype)',
    audience: 'founders/teams who want faster insights without hiring a full analytics org',
    outcome: 'automated narratives + faster iteration with consistent metric definitions',
    outcomeLabel: 'Outcome',
    deliverables: [
      'Weekly performance brief (auto-generated insights + next steps)',
      '\u201CExplain my performance\u201D workflows (guardrails + prompt templates)',
      'Optional: conversational analytics prototype (ask questions, get answers)',
    ],
    deliverablesLabel: 'Typical deliverables',
    accentColor: '#E6B35A',
  },
  {
    id: 'automation',
    number: 8,
    name: 'Automation for Marketing Ops (n8n / Make / Zapier)',
    audience: 'lean teams doing too much manual reporting and QA',
    outcome: 'less busywork, more time on growth',
    outcomeLabel: 'Outcome',
    deliverables: [
      'Automated reporting flows (dashboards, digests, Slack/email summaries)',
      'Anomaly alerts + \u201Cwhat changed?\u201D summaries',
      'Workflow automations (campaign QA, data QA, tagging governance)',
    ],
    deliverablesLabel: 'Typical deliverables',
    accentColor: '#7C6FB0',
  },
  {
    id: 'internal-tools',
    number: 9,
    name: 'Internal Tools for Growth Teams (Lightweight Web Apps)',
    audience: 'teams that need a workflow tool, not another dashboard',
    outcome: 'a small purpose-built app that saves hours/week',
    outcomeLabel: 'Outcome',
    deliverables: [
      'Custom internal tools (e.g., SKAN decoder UI, pacing console, creative tracker)',
      'Hosted deployments + simple admin flows',
      'Documentation + handover',
    ],
    deliverablesLabel: 'Typical deliverables',
    accentColor: '#E07A5F',
  },
  {
    id: 'workshops',
    number: 10,
    name: 'Workshops & Team Enablement',
    audience: 'teams who want to level up quickly',
    outcome: '90-min session / half-day / 1\u20132 day',
    outcomeLabel: 'Formats',
    deliverables: [
      'SKAN & privacy measurement for performance marketers',
      'BigQuery for growth teams: answer questions faster',
      'Dashboards that drive action (not vanity metrics)',
      'AI for analytics: workflows that actually stick',
    ],
    deliverablesLabel: 'Popular topics',
    accentColor: '#4A9B8E',
  },
]

export const servicePackages: ServicePackage[] = [
  {
    id: 'audit',
    name: 'Audit',
    letter: 'A',
    timeline: '1\u20132 weeks',
    bestIf: 'you\u2019re unsure where the leaks are',
    items: [
      'Measurement + data + reporting audit',
      'Quick wins list + prioritized roadmap',
      '\u201CFix-first\u201D checklist your team can execute',
    ],
    accentColor: '#4A9B8E',
  },
  {
    id: 'build',
    name: 'Build',
    letter: 'B',
    timeline: '3\u20138 weeks',
    bestIf: 'you need a working system, not advice',
    items: [
      'Implementation of tracking / SKAN / pipelines / dashboards',
      'Working dashboards + alerting + documentation',
      'Handover + training session',
    ],
    accentColor: '#E07A5F',
  },
  {
    id: 'operate',
    name: 'Operate',
    letter: 'C',
    timeline: 'monthly retainer',
    bestIf: 'you want ongoing performance monitoring + continuous improvements',
    items: [
      'Performance monitoring + insights cadence (weekly/bi-weekly)',
      'Experimentation planning + review',
      'Continuous data quality + dashboard upgrades',
    ],
    accentColor: '#7C6FB0',
  },
]

export const addOns: string[] = [
  'Executive-ready narrative reporting (monthly board pack)',
  'Data QA & governance (naming standards, ownership, monitoring)',
  'Migration / cleanup (dashboard consolidation, metric reconciliation)',
  'Playbooks (creative testing, pacing, attribution interpretation)',
]

export const workingPrinciples: WorkingPrinciple[] = [
  {
    label: 'Outcome-first',
    description: 'every deliverable ties to a decision or measurable change',
  },
  {
    label: 'Documented',
    description: 'definitions + assumptions are written down (no tribal knowledge)',
  },
  {
    label: 'Reusable',
    description: 'frameworks and templates your team can run without me',
  },
]

export const toolCategories: ToolCategory[] = [
  {
    name: 'Analytics & BI',
    tools: ['SQL', 'Python', 'BigQuery', 'Looker', 'Looker Studio'],
  },
  {
    name: 'Marketing measurement',
    tools: ['Google Ads', 'SKAdNetwork', 'iOS SKAN', 'Adjust', 'AppsFlyer'],
  },
  {
    name: 'Cloud & shipping',
    tools: ['GCP', 'GitHub', 'Vercel', 'Railway', 'Firebase', 'AWS'],
  },
  {
    name: 'AI & automation',
    tools: ['Gemini', 'Claude', 'ChatGPT', 'n8n', 'Make', 'Zapier', 'LangGraph', 'CrewAI'],
  },
]
