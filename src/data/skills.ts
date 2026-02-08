export interface SkillsTechCategory {
  id: string
  name: string
  colorKey: string
  skills: string[]
}

export const skillsTechCategories: SkillsTechCategory[] = [
  {
    id: 'data',
    name: 'Data / Analytics',
    colorKey: 'teal',
    skills: [
      'SQL', 'Python', 'BigQuery', 'Looker', 'Looker Studio',
      'Performance KPI Scorecards & Alerting', 'Cohort / LTV Analysis',
      'Funnel Analysis', 'Experimentation (A/B Tests, Lift Tests)',
      'ROAS / CPI Optimization', 'Change-History Forensics',
      'Attribution', 'Bid/Budget/Creative Optimization & Analysis',
    ],
  },
  {
    id: 'marketing',
    name: 'Marketing Platforms / Measurement',
    colorKey: 'coral',
    skills: [
      'Google Ads', 'Meta Ads', 'SKAdNetwork / iOS SKAN',
      'Apple Search Ads', 'GA4', 'Firebase',
      'MMP Integrations: Adjust, AppsFlyer', 'ROAS / CPI Optimization',
    ],
  },
  {
    id: 'cloud',
    name: 'Cloud / Infrastructure / Deployment',
    colorKey: 'amber',
    skills: [
      'Google Cloud Platform (GCP)', 'BigQuery Data Transfer Service (DTS)',
      'BigQuery ML (BQML)', 'Google Ads API', 'AWS', 'Firebase',
      'Vercel', 'Railway', 'Hostinger', 'GitHub',
    ],
  },
  {
    id: 'ai',
    name: 'AI / LLM Tools & Platforms',
    colorKey: 'lavender',
    skills: [
      'ChatGPT', 'Gemini', 'Claude', 'Manus', 'Perplexity',
      'NotebookLM', 'Google AI Studio', 'Notion AI',
    ],
  },
  {
    id: 'devtools',
    name: 'Developer Tools / IDEs / Agents',
    colorKey: 'sky',
    skills: [
      'Claude Code', 'Cursor', 'Codex', 'Codex CLI', 'Gemini CLI',
      'Firebase Studio', 'Replit', 'V0', 'Bolt.new', 'Warp',
      'Lovable', 'Antigravity', 'Jules', 'AMP', 'Devin', 'Factory',
      'Linear', 'Daytona', 'Composio', 'Ollama',
      'Open Source Models (e.g., Kimi 2.5)', 'OpenClaw',
    ],
  },
  {
    id: 'automation',
    name: 'Workflow Automation',
    colorKey: 'rose',
    skills: [
      'n8n', 'Make.com', 'Zapier', 'LangGraph', 'CrewAI', 'Gumloop',
    ],
  },
  {
    id: 'media',
    name: 'Generative Media',
    colorKey: 'emerald',
    skills: [
      'Text-to-Image Models', 'Text-to-Video Models',
      'Image-to-Video Models', 'ElevenLabs', 'Descript',
      'Artlist', 'Higgsfield', 'Granola', 'Wispr Flow', 'ChatPRD',
    ],
  },
]

export interface IndustryData {
  name: string
  years: number
  colorClass: string
  roles: string[]
}

export const industryData: IndustryData[] = [
  {
    name: 'Apps & Mobile Gaming',
    years: 7,
    colorClass: 'coral',
    roles: ['Senior Analytical Lead', 'Technical Apps Lead', 'Account Manager'],
  },
  {
    name: 'Retail & FMCG',
    years: 4,
    colorClass: 'teal',
    roles: ['Senior Analytical Lead', 'Account Manager', 'Marketing Analyst', 'BI Intern'],
  },
  {
    name: 'Tech & SaaS',
    years: 3,
    colorClass: 'amber',
    roles: ['Account Manager', 'Analytical Consultant'],
  },
  {
    name: 'Agency & Consulting',
    years: 1,
    colorClass: 'lavender',
    roles: ['Business Development Manager'],
  },
  {
    name: 'AI & Innovation',
    years: 1,
    colorClass: 'lavender',
    roles: ['Career Break — AI Focus'],
  },
]

export interface RoleNode {
  id: string
  title: string
  company: string
  year: string
  level: number // 0-6 for vertical positioning
}

export const roleNodes: RoleNode[] = [
  { id: 'henkel', title: 'Marketing & BI Intern', company: 'Henkel', year: '2014', level: 0 },
  { id: 'loreal', title: 'Marketing Analyst', company: "L'Oréal", year: '2015', level: 1 },
  { id: 'qagency', title: 'Business Dev Manager', company: 'Q Agency', year: '2016', level: 2 },
  { id: 'google-am', title: 'Account Manager', company: 'Google', year: '2017', level: 3 },
  { id: 'google-tl', title: 'Technical Apps Lead', company: 'Google', year: '2018', level: 4 },
  { id: 'google-sal', title: 'Senior Analytical Lead', company: 'Google', year: '2021', level: 5 },
  { id: 'career-break', title: 'AI & Technology Focus', company: 'Gap Year', year: '2025', level: 6 },
]
