export interface ExperienceEntry {
  id: string
  company: string
  companyShort: string
  role: string
  team?: string
  location: string
  startDate: string
  endDate: string | null
  summary: string
  sections: {
    title: string
    bullets: string[]
  }[]
  keyProjects?: {
    title: string
    description: string
    link?: string
  }[]
  technologies: string[]
  industries: string[]
  roleType: string[]
  isAdditional?: boolean
}

export const experiences: ExperienceEntry[] = [
  {
    id: 'career-break',
    company: 'Career Break',
    companyShort: 'Gap Year',
    role: 'AI & Technology Focus',
    location: 'Munich, Germany',
    startDate: '2025-02',
    endDate: null,
    summary: 'Building deep, hands-on AI/LLM capability to enhance productivity, automate workflows, and support data-driven decision-making while applying newly acquired expertise to real-world side projects.',
    sections: [
      {
        title: 'Core Focus',
        bullets: [
          'Expanding technical expertise across the full AI ecosystem—automating user acquisition and performance marketing data workflows, integrating AI into analytics and reporting, leveraging code generation and optimization tools, and applying AI to strategic planning.',
          'Actively designing and building product/code development and automation workflows through hands-on projects spanning diverse applications beyond performance marketing and user acquisition.',
        ],
      },
      {
        title: 'Competencies in Development',
        bullets: [
          'AI Tools & Platforms: ChatGPT, Gemini, Claude, Perplexity, NotebookLM, Google AI Studio, ElevenLabs',
          'Developer Tools: Claude Code, Cursor, Codex CLI, Firebase Studio, Replit, V0, Bolt.new, Vercel',
          'Workflow Automation: n8n, Make.com, Langraph, CrewAI, Zapier, Gumloop',
        ],
      },
    ],
    technologies: ['AI/LLM', 'Python', 'Claude', 'Cursor', 'n8n', 'Vercel', 'React'],
    industries: ['ai_tech'],
    roleType: ['innovation'],
  },
  {
    id: 'google-lcs',
    company: 'Google',
    companyShort: 'Google',
    role: 'Senior Analytical Lead',
    team: 'Large Customer Sales, Northern Europe',
    location: 'Amsterdam, Netherlands',
    startDate: '2021-09',
    endDate: '2025-02',
    summary: 'Partnered with the largest apps and mobile gaming advertisers in Benelux + Nordics as a strategic partner and industry thought leader.',
    sections: [
      {
        title: 'Revenue & Client Impact',
        bullets: [
          'Partnered with leading global app and gaming advertisers across Northern Europe, delivering $XXXmm+ per quarter with 40% average YoY growth.',
          'Engaged C-suite and senior executives to present insights and strategic recommendations, building credibility at the leadership level.',
          'Collaborated on development and implementation of business strategies contributing to sustained revenue growth and market leadership.',
        ],
      },
      {
        title: 'Performance Operations & Analytics',
        bullets: [
          'Built KPI scorecards, alerting systems, and cohort/LTV views in BigQuery and Looker; translated signals into actions reducing time-to-insight.',
          'Operated a "daily performance engine": automated data pipelines, performance decoding, and executive dashboards for rapid optimization decisions.',
          'Combined change-history forensics with funnel analysis to diagnose performance swings and prioritize highest-marginal-gain actions.',
        ],
      },
      {
        title: 'Platform & Capability Building',
        bullets: [
          'Pioneered an end-to-end performance insights platform, resulting in commercialized offerings and improved client satisfaction.',
          'Established the team\'s data and reporting strategic pillar; led Sales-Value-Add and Go-To-Market processes from ideation to execution.',
          'Founded an internal performance analytics capability with standardized packages generating actionable recommendations.',
        ],
      },
      {
        title: 'AI Integration',
        bullets: [
          'Leveraged AI and Gemini models to optimize analytics, performance analysis, and internal data workflows.',
          'Applied conversational analytics within Looker and Google AI Studio, uncovering multimillion-dollar opportunities at scale.',
        ],
      },
    ],
    keyProjects: [
      {
        title: 'iOS SKAN Reporting Pack',
        description: 'Comprehensive performance reporting solution integrating Google Ads App Campaign and SKAdNetwork data for seamless iOS campaign analysis. Published externally.',
        link: 'https://github.com/google/app-reporting-pack',
      },
    ],
    technologies: ['BigQuery', 'Looker', 'Python', 'Google Ads', 'SKAdNetwork', 'SQL', 'Gemini AI', 'Google Cloud'],
    industries: ['apps_gaming', 'retail'],
    roleType: ['leadership', 'analytics'],
  },
  {
    id: 'google-igt',
    company: 'Google',
    companyShort: 'Google',
    role: 'Technical Apps Lead',
    team: 'EMEA International Growth Team',
    location: 'Hamburg, Germany',
    startDate: '2018-12',
    endDate: '2021-08',
    summary: 'Accelerated international growth of customers through in-depth strategic and operational consultations across EMEA.',
    sections: [
      {
        title: 'Client Management & Revenue Growth',
        bullets: [
          'Managed and consulted over 25 clients across Gaming and Non-Gaming app verticals, driving 55% average YoY increase in market exports.',
          'Adopted a hands-on approach to craft personalized performance strategies, achieving 100% client satisfaction rate.',
          'Developed customized tools that increased client productivity by 40%.',
        ],
      },
      {
        title: 'Executive Engagement & Thought Leadership',
        bullets: [
          'Delivered workshops to C-level management on gaming strategy, resulting in success stories published on Think with Google.',
          'Presented gaming growth opportunities at Google Conferences (GameCamp, AppHub).',
        ],
      },
      {
        title: 'Program Leadership & Scaled Solutions',
        bullets: [
          'Established and co-led the IGT EMEA Apps & Gaming program, securing 2 funded headcounts.',
          'Achieved 1,500+ clients adopting narratives and solutions via scaled tools—increasing client investment by 300% YoY.',
          'Launched and scaled a complete Go-To-Market playbook globally.',
        ],
      },
    ],
    keyProjects: [
      {
        title: '"One-Stop Shop" BI Platform',
        description: 'Comprehensive app campaign insights platform with in-depth analysis and recommendations. Multi-billion USD in revenue coverage; 3,000+ daily/weekly active users.',
      },
      {
        title: 'Global Data Sharing Compliance Policy',
        description: 'Identified compliance limitations, initiated comprehensive policy solution. Co-led global training rollout published for all App Campaigns sales teams worldwide.',
      },
    ],
    technologies: ['Google Ads', 'BigQuery', 'Python', 'Looker Studio', 'App Campaigns'],
    industries: ['apps_gaming'],
    roleType: ['technical', 'leadership'],
  },
  {
    id: 'google-smb',
    company: 'Google',
    companyShort: 'Google',
    role: 'Account Manager',
    team: 'Marketing Solutions, SMB Ad Sales',
    location: 'Dublin, Ireland',
    startDate: '2017-08',
    endDate: '2018-12',
    summary: 'Managed top-tier clients in UK/I and CE/CEE markets, excelling in growing the book of business through customized digital strategies.',
    sections: [
      {
        title: 'Key Achievements',
        bullets: [
          'Achieved 135% of Q4\'17 target a month early; 157% of Q1\'18 target two months early; exceeded Q2-Q3\'18 revenue by +15%.',
          'Advised 20 mid-size clients (Apps/Retail/Tech/Travel) on digital strategy, growth, and export; built strategies for 140 SMBs.',
          'Drove +383% audience depth (top-18 CE pod) and +158% automation growth; scaled RLSA from 87% to 562% with >50% win rate.',
          'Trained 50+ representatives across EMEA/US on automation and insight generation.',
        ],
      },
    ],
    technologies: ['Google Ads', 'Google Analytics', 'SQL', 'Attribution', 'Display & Search'],
    industries: ['apps_gaming', 'retail', 'tech'],
    roleType: ['account_mgmt'],
  },
  {
    id: 'google-intern',
    company: 'Google',
    companyShort: 'Google',
    role: 'Analytical Consultant Intern',
    location: 'Zagreb, Croatia',
    startDate: '2017-08',
    endDate: '2021-12',
    summary: 'Supported Google LCS across CEE markets, delivering quantitative market analyses and presenting insights to Industry Managers.',
    sections: [
      {
        title: 'Contributions',
        bullets: [
          'Supported Google LCS across CEE (Apps, Airlines, Gaming, IT, Fashion, Retail, Government, OTAs).',
          'Led CEE ad market sizing (online/offline), built SQL/Looker Studio data products including a multi-market brand-popularity tracker.',
          'Contributed to portfolio modeling and quarter-by-quarter forecasting.',
        ],
      },
    ],
    technologies: ['SQL', 'Looker Studio', 'Google Ads', 'Market Analysis'],
    industries: ['apps_gaming', 'retail', 'tech'],
    roleType: ['analytics'],
    isAdditional: true,
  },
  {
    id: 'q-agency',
    company: 'Q Agency',
    companyShort: 'Q Agency',
    role: 'Business Development Manager',
    location: 'Zagreb, Croatia',
    startDate: '2016-01',
    endDate: '2017-01',
    summary: 'Operated at a Top 10 World\'s Best Agency (Clutch, 2022), owning the UK market and full sales cycle.',
    sections: [
      {
        title: 'Key Contributions',
        bullets: [
          'Owned the UK market and the full sales cycle from pre-sales to post-sales (presentations, negotiation, contracting, account management).',
          'Built the sales operating system: introduced new sales strategy and toolset, implemented CRM with trainings, and defined reporting metrics.',
        ],
      },
    ],
    technologies: ['CRM', 'Sales Tools', 'Business Development'],
    industries: ['agency'],
    roleType: ['account_mgmt'],
    isAdditional: true,
  },
  {
    id: 'loreal',
    company: "L'Oréal",
    companyShort: "L'Oréal",
    role: 'Marketing Analyst Intern',
    location: 'Zagreb, Croatia',
    startDate: '2015-09',
    endDate: '2015-12',
    summary: 'Supported PMs and Brand Managers on Croatia GTM: localized global concepts, ran launch ops, and managed media budgets.',
    sections: [
      {
        title: 'Key Contributions',
        bullets: [
          'Localized global concepts/ads, ran launch ops and catalog management for Croatia market.',
          'Built sales/brand/competitor analyses and planned/optimized the annual media budget.',
        ],
      },
    ],
    technologies: ['Marketing Analytics', 'Media Planning', 'Market Research'],
    industries: ['retail'],
    roleType: ['marketing'],
    isAdditional: true,
  },
  {
    id: 'henkel',
    company: 'Henkel',
    companyShort: 'Henkel',
    role: 'Marketing & Business Intelligence Intern',
    location: 'Zagreb, Croatia',
    startDate: '2014-12',
    endDate: '2015-08',
    summary: 'B2B media planning and business intelligence reporting across IMEA region.',
    sections: [
      {
        title: 'Key Contributions',
        bullets: [
          'Ran B2B media planning (print/online) with partner coordination and audience analysis.',
          'Delivered monthly IMEA slow-mover analytics (SAP/Microsoft BI) to the Regional Lead.',
          'Contributed to migrating supply-chain reporting from SAP to Microsoft BI.',
        ],
      },
    ],
    technologies: ['SAP', 'Microsoft BI', 'Media Planning', 'Analytics'],
    industries: ['retail'],
    roleType: ['marketing', 'analytics'],
    isAdditional: true,
  },
]

export const education = {
  school: 'Rochester Institute of Technology',
  degree: 'B.S. in International Business & Marketing',
  year: 2017,
}

export type FilterTag = {
  id: string
  label: string
  category: 'industry' | 'role' | 'tech'
}

export const filterTags: FilterTag[] = [
  { id: 'apps_gaming', label: 'Apps & Gaming', category: 'industry' },
  { id: 'retail', label: 'Retail & FMCG', category: 'industry' },
  { id: 'tech', label: 'Tech', category: 'industry' },
  { id: 'leadership', label: 'Leadership', category: 'role' },
  { id: 'analytics', label: 'Analytics', category: 'role' },
  { id: 'technical', label: 'Technical', category: 'role' },
  { id: 'innovation', label: 'AI & Innovation', category: 'role' },
]
