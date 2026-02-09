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
  logo?: string
}

export const experiences: ExperienceEntry[] = [
  {
    id: 'career-break',
    company: 'Career Break',
    companyShort: 'Gap Year',
    logo: '/logos/ai.png',
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
    logo: '/logos/google.png',
    role: 'Senior Analytical Lead',
    team: 'Large Customer Sales, Northern Europe',
    location: 'Amsterdam, Netherlands',
    startDate: '2021-09',
    endDate: '2025-02',
    summary: 'Google\'s Large Customer Sales (LCS) teams are strategic partners and industry thought leaders to the world\'s leading brands. LCS teams continuously challenge how customers think about their business and how Google can support growth. Partnered with the largest apps and mobile gaming advertisers in Benelux + Nordics.',
    sections: [
      {
        title: 'Revenue & Client Impact',
        bullets: [
          'Partnered with leading global app and gaming advertisers across Northern Europe to develop innovative digital solutions, leveraging Google\'s resources to drive business growth and exceed client objectives—delivering $XXXmm+ per quarter with 40% average YoY growth.',
          'Engaged C-suite and senior executives to present insights and strategic recommendations, building credibility and driving high-impact conversations at the leadership level.',
          'Collaborated on the development and implementation of business strategies that contributed to sustained revenue growth and market leadership.',
        ],
      },
      {
        title: 'Performance Operations & Analytics',
        bullets: [
          'Owned daily pacing and analytics across Google Ads: built KPI scorecards, alerting systems, and cohort/LTV views in BigQuery and Looker; translated signals into actions (budget shifts, bidding, creatives), reducing time-to-insight and improving operational efficiency.',
          'Embedded with client growth teams to manage day-to-day performance operations: monitored ROAS, CPI, LTV, and retention metrics; triaged anomalies; and guided bid, budget, and creative optimizations that sustained targets while unlocking incremental scale.',
          'Operated a "daily performance engine": automated data pipelines, performance decoding, and executive dashboards; led standups with senior stakeholders to align on risks and opportunities and trigger rapid optimization decisions.',
          'Delivered hands-on analytics and optimization: combined change-history forensics with funnel analysis to diagnose performance swings and prioritize actions with the highest marginal gain.',
        ],
      },
      {
        title: 'Experimentation & Insights',
        bullets: [
          'Led day-to-day experimentation and analysis: designed A/B and lift tests, quantified impact on CPA, ROAS, and retention, and codified winning tactics into playbooks adopted across markets.',
          'Coordinated cross-team execution across marketing, product, and data functions to connect campaign metrics to downstream events (in-app revenue, LTV), ensuring optimizations served business outcomes rather than vanity metrics.',
          'Converted findings into scalable artifacts (SOPs, checklists, GTM documentation), raising operational consistency and enabling rapid onboarding across accounts and markets.',
        ],
      },
      {
        title: 'Cross-Functional Leadership & Strategy',
        bullets: [
          'Led cross-functional teams in executing complex, data-driven initiatives designed to scale operations and improve advertiser performance.',
          'Built and implemented comprehensive cross-functional plans, delivering tailored strategic support that accelerated business growth.',
          'Mentored stakeholders and managed complex technical relationships, providing ongoing consultative support to high-priority clients.',
          'Organized and directed workflows across cross-functional teams, streamlining solution discovery and planning processes to increase collaboration and output quality.',
        ],
      },
      {
        title: 'Platform & Capability Building',
        bullets: [
          'Pioneered and operationalized the end-to-end process for a performance insights platform, resulting in commercialized offerings, improved service quality, and higher client satisfaction.',
          'Established the team\'s data and reporting strategic pillar; led Sales-Value-Add and Go-To-Market (GTM) processes from ideation to execution.',
          'Founded an internal performance analytics capability with standardized packages and narratives to generate actionable recommendations and measurable performance improvements.',
          'Demonstrated prototypes and proofs-of-concept using Google Cloud infrastructure and BigQuery, enabling feedback loops that improved tool usability and data access.',
        ],
      },
      {
        title: 'AI Integration & Innovation',
        bullets: [
          'Leveraged AI and Gemini models to optimize analytics, performance analysis, and internal data workflows—streamlining reporting, surfacing advanced insights, and reducing time-to-insight.',
          'Applied Gemini-assisted features to dashboards, surfacing narrative insights, next-best actions, and risk flags; accelerated weekly business review preparation and improved cross-functional alignment.',
          'Applied conversational analytics within Looker and Google AI Studio to enhance product and performance insights, uncovering multimillion-dollar opportunities at scale.',
          'Integrated emerging AI capabilities into day-to-day operations, scaling strategic recommendations and improving stakeholder alignment with product impact.',
        ],
      },
    ],
    keyProjects: [
      {
        title: 'iOS SKAN Reporting Pack',
        description: 'Developed a comprehensive performance reporting solution integrating Google Ads App Campaign and SKAdNetwork data for seamless iOS campaign analysis. Combined Google Ads change history and campaign performance reports with SKAdNetwork reports to visualize iOS performance data and translate SKAdNetwork values into meaningful metrics with real-time SKAN CV schema decoding and cohort analysis. Solution officially included in the internal Sales-Value-Add solutions catalog and published externally.',
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
    logo: '/logos/google.png',
    role: 'Technical Apps Lead',
    team: 'EMEA International Growth Team',
    location: 'Hamburg, Germany',
    startDate: '2018-12',
    endDate: '2021-08',
    summary: 'The EMEA International Growth Team is a specialist consultative sales organization responsible for accelerating the international growth of customers through in-depth strategic and operational consultations, scalable initiatives, and opening new revenue lines. Managed large advertisers across EMEA.',
    sections: [
      {
        title: 'Client Management & Revenue Growth',
        bullets: [
          'Managed and consulted over 25 clients across Gaming and Non-Gaming app verticals, driving 55% average YoY increase in market exports.',
          'Led export revenue growth by advising gaming clients on market expansion and improving performance in key markets through a data-driven approach.',
          'Adopted a hands-on approach to craft personalized performance and market export strategies, achieving 100% client satisfaction rate through direct communication and customized tools.',
          'Developed and implemented customized tools that increased client productivity by 40%.',
        ],
      },
      {
        title: 'Executive Engagement & Thought Leadership',
        bullets: [
          'Engaged and advised C-level executives to align strategies with business objectives.',
          'Delivered workshops to C-level management on gaming strategy and opportunities, resulting in multiple success stories and cases published on Think with Google.',
          'Advised the Analytical Consultant community on app insights and data knowledge; presented gaming growth opportunities at Google Conferences (GameCamp, AppHub).',
        ],
      },
      {
        title: 'Program Leadership & Scaled Solutions',
        bullets: [
          'Established and co-led the IGT EMEA Apps & Gaming program, securing 2 funded headcounts with potential for 2 additional roles.',
          'Collaborated with Global Program Managers for App Development on the export initiative, achieving 1,500+ clients adopting narratives and solutions via scaled tools—increasing client investment by 300% YoY.',
          'Launched, developed, and scaled a complete Go-To-Market playbook globally, leading the export initiative alongside Global Program Managers for Apps.',
          'Established scalable narratives, tools, and Go-To-Market processes for sub-regional teams.',
        ],
      },
      {
        title: 'Reporting & Cross-Functional Operations',
        bullets: [
          'Owned and led reporting for cross-functional teams at Google EMEA, streamlining the delivery of App Promo insights at scale.',
          'Developed impactful narratives and solutions for market expansion and performance enhancement in key markets.',
        ],
      },
    ],
    keyProjects: [
      {
        title: '"One-Stop Shop" App Campaigns BI Platform',
        description: 'Designed, developed, and managed a comprehensive app campaign insights platform providing in-depth analysis and recommendations for client performance, creative trends, seasonal trends, and benchmarking. Automated data retrieval and visualization processes. Impact: Multi-billion USD in revenue coverage; 3,000+ daily/weekly internal active users.',
      },
      {
        title: 'Global App Campaigns Data Sharing Compliance Policy & Framework',
        description: 'Identified compliance limitations restricting advertisers from reaching full campaign potential; initiated development of a comprehensive policy solution. Collaborated with Global Product Leads and Go-To-Market teams to design and launch the policy, officially published for all App Campaigns sales teams worldwide. Co-led the global training rollout.',
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
    logo: '/logos/google.png',
    role: 'Account Manager',
    team: 'Marketing Solutions, SMB Ad Sales',
    location: 'Dublin, Ireland',
    startDate: '2017-08',
    endDate: '2018-12',
    summary: 'Managed top-tier clients in the UK/I and CE/CEE markets with revenue under management ranging from $XXXk to $XXMM per quarter. Excelled in growing the book of business by developing customized digital strategies that matched client needs with Google solutions.',
    sections: [
      {
        title: 'Key Achievements',
        bullets: [
          'Achieved 135% of Q4\'17 target a month early; 157% of Q1\'18 target two months early; exceeded Q2–Q3\'18 revenue by +15% and hit targets a month early. Awards: H1 CE Brilliant Basics winner; GMS UK&I Audience Champion.',
          'Advised 20 mid-size clients (Apps/Retail/Tech/Travel; $XXXk to $XXMM per quarter) on digital strategy, growth, and export; mapped needs to Google solutions for high ROAS. Built strategies for 140 SMBs ($XXk–$XXXk/quarter).',
          'Drove +383% audience depth (top-18 CE pod) and +158% automation growth; scaled RLSA from 87% to 562% with >50% win rate; led team in Attribution, Audience Depth, Display & Search Auto-bidding.',
          'Served as analytical consultant across Google; shipped automated QBRs, reports, and scripts; delivered AppDev performance dashboard and shareable multi-market brand-popularity models; provided EMEA-wide insights and technical support.',
          'Trained 50+ representatives across EMEA/US on automation and insight generation; upgraded AppDev KPI best practices via automation; led CE/CEE projects to build an information/insights hub and helped develop the startup-client pipeline.',
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
    logo: '/logos/google.png',
    role: 'Analytical Consultant Intern',
    location: 'Zagreb, Croatia',
    startDate: '2017-08',
    endDate: '2021-12',
    summary: 'Supported Google LCS across CEE markets, delivering quantitative market landscape work and presenting insights to Industry Managers.',
    sections: [
      {
        title: 'Contributions',
        bullets: [
          'Supported Google LCS across CEE (Apps, Airlines, Gaming, IT, Fashion, Retail, Government, OTAs), delivering quantitative market landscape work and presenting insights to Industry Managers.',
          'Led a CEE ad market sizing (online/offline), built SQL/Looker Studio data products including a multi-market brand-popularity tracker, and contributed to portfolio modeling and quarter-by-quarter forecasting.',
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
    logo: '/logos/q-agency.png',
    role: 'Business Development Manager',
    location: 'Zagreb, Croatia',
    startDate: '2016-01',
    endDate: '2017-01',
    summary: 'Operated at a Top 10 World\'s Best Agency (Clutch, 2022); owned the UK market and the full sales cycle from pre-sales to post-sales.',
    sections: [
      {
        title: 'Key Contributions',
        bullets: [
          'Owned the UK market and the full sales cycle from pre-sales to post-sales (presentations, negotiation, contracting, account management).',
          'Built the sales operating system: introduced a new sales strategy and toolset, implemented CRM for the team with trainings, and defined reporting metrics/cadence to track performance and hit goals.',
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
    logo: '/logos/loreal.png',
    role: 'Marketing Analyst Intern',
    location: 'Zagreb, Croatia',
    startDate: '2015-09',
    endDate: '2015-12',
    summary: 'Supported PMs and Brand Managers on Croatia GTM: localized global concepts/ads, ran launch ops and catalog management, built sales/brand/competitor analyses, and planned/optimized the annual media budget.',
    sections: [
      {
        title: 'Key Contributions',
        bullets: [
          'Supported PMs and Brand Managers on Croatia GTM: localized global concepts/ads, ran launch ops and catalog management, built sales/brand/competitor analyses, and planned/optimized the annual media budget.',
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
    logo: '/logos/henkel.png',
    role: 'Marketing and Business Intelligence Intern',
    location: 'Zagreb, Croatia',
    startDate: '2014-12',
    endDate: '2015-08',
    summary: 'Ran B2B media planning (print/online) with partner coordination and audience analysis; delivered monthly IMEA slow-mover analytics and contributed to supply-chain reporting migration.',
    sections: [
      {
        title: 'Key Contributions',
        bullets: [
          'Ran B2B media planning (print/online) with partner coordination and audience analysis; delivered monthly IMEA slow-mover analytics (SAP/Microsoft BI) to the Regional Lead.',
          'Contributed to migrating supply-chain reporting from SAP to Microsoft BI; owned OtC KPI tracking and performance.',
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
