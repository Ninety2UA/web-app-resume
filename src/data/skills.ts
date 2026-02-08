export interface SkillCategory {
  name: string
  colorClass: string
  skills: {
    name: string
    level: number
  }[]
}

export const skillCategories: SkillCategory[] = [
  {
    name: 'Marketing & Ads',
    colorClass: 'coral',
    skills: [
      { name: 'Google Ads', level: 95 },
      { name: 'App Campaigns', level: 90 },
      { name: 'Performance Marketing', level: 92 },
      { name: 'SKAdNetwork', level: 80 },
      { name: 'Media Planning', level: 75 },
    ],
  },
  {
    name: 'Data & Analytics',
    colorClass: 'teal',
    skills: [
      { name: 'BigQuery', level: 92 },
      { name: 'SQL', level: 90 },
      { name: 'Looker / Studio', level: 88 },
      { name: 'A/B Testing', level: 80 },
      { name: 'LTV & Cohort Analysis', level: 85 },
    ],
  },
  {
    name: 'Programming & Tools',
    colorClass: 'amber',
    skills: [
      { name: 'Python', level: 75 },
      { name: 'Google Cloud', level: 70 },
      { name: 'Data Pipelines', level: 78 },
      { name: 'Dashboard Building', level: 88 },
      { name: 'SAP / Microsoft BI', level: 55 },
    ],
  },
  {
    name: 'AI & Automation',
    colorClass: 'lavender',
    skills: [
      { name: 'LLM Tools (Claude, GPT)', level: 82 },
      { name: 'AI Workflows', level: 78 },
      { name: 'Prompt Engineering', level: 80 },
      { name: 'n8n / Make.com', level: 70 },
      { name: 'Code Generation', level: 72 },
    ],
  },
]

export interface TechTimelineEntry {
  year: number
  technologies: {
    name: string
    category: 'marketing' | 'data' | 'programming' | 'ai'
  }[]
}

export const techTimeline: TechTimelineEntry[] = [
  {
    year: 2014,
    technologies: [
      { name: 'SAP', category: 'data' },
      { name: 'Microsoft BI', category: 'data' },
    ],
  },
  {
    year: 2015,
    technologies: [
      { name: 'Media Planning', category: 'marketing' },
      { name: 'Market Research', category: 'marketing' },
    ],
  },
  {
    year: 2016,
    technologies: [
      { name: 'CRM', category: 'marketing' },
      { name: 'Sales Tools', category: 'marketing' },
    ],
  },
  {
    year: 2017,
    technologies: [
      { name: 'Google Ads', category: 'marketing' },
      { name: 'Google Analytics', category: 'data' },
      { name: 'SQL', category: 'programming' },
    ],
  },
  {
    year: 2018,
    technologies: [
      { name: 'App Campaigns', category: 'marketing' },
      { name: 'Attribution', category: 'data' },
    ],
  },
  {
    year: 2019,
    technologies: [
      { name: 'BigQuery', category: 'data' },
      { name: 'Looker Studio', category: 'data' },
    ],
  },
  {
    year: 2020,
    technologies: [
      { name: 'Python', category: 'programming' },
      { name: 'Data Pipelines', category: 'programming' },
    ],
  },
  {
    year: 2021,
    technologies: [
      { name: 'Looker', category: 'data' },
      { name: 'SKAdNetwork', category: 'marketing' },
    ],
  },
  {
    year: 2022,
    technologies: [
      { name: 'A/B Testing', category: 'data' },
      { name: 'Google Cloud', category: 'programming' },
    ],
  },
  {
    year: 2023,
    technologies: [
      { name: 'Gemini AI', category: 'ai' },
      { name: 'AI Analytics', category: 'ai' },
    ],
  },
  {
    year: 2024,
    technologies: [
      { name: 'ChatGPT', category: 'ai' },
      { name: 'Claude', category: 'ai' },
    ],
  },
  {
    year: 2025,
    technologies: [
      { name: 'Claude Code', category: 'ai' },
      { name: 'n8n', category: 'ai' },
      { name: 'Cursor', category: 'programming' },
      { name: 'CrewAI', category: 'ai' },
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
  { id: 'career-break', title: 'AI & Innovation Focus', company: 'Gap Year', year: '2025', level: 6 },
]
