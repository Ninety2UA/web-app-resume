export interface PortfolioProject {
  id: string
  title: string
  type: string
  description: string
  technologies: string[]
  gradient: string
  links: {
    label: string
    url: string
    icon: 'github' | 'external' | 'doc'
  }[]
}

export const projects: PortfolioProject[] = [
  {
    id: 'skan-reporting',
    title: 'iOS SKAN Reporting Pack',
    type: 'Open Source',
    description: 'Comprehensive performance reporting solution integrating Google Ads App Campaign and SKAdNetwork data for seamless iOS campaign analysis with real-time SKAN CV schema decoding.',
    technologies: ['BigQuery', 'SQL', 'Looker', 'Google Ads API', 'SKAdNetwork'],
    gradient: 'from-coral to-amber',
    links: [
      { label: 'View on GitHub', url: 'https://github.com/google/app-reporting-pack', icon: 'github' },
    ],
  },
  {
    id: 'bi-platform',
    title: 'App Campaigns BI Platform',
    type: 'Analytics Platform',
    description: 'Enterprise-scale business intelligence platform providing in-depth campaign analysis, creative trends, seasonal benchmarking, and automated recommendations for app advertisers.',
    technologies: ['BigQuery', 'Looker', 'Python', 'Google Ads', 'Data Studio'],
    gradient: 'from-teal to-teal-light',
    links: [
      { label: 'Read Case Study', url: '#', icon: 'doc' },
    ],
  },
  {
    id: 'ai-workflows',
    title: 'AI Workflow Automation',
    type: 'AI Workflow',
    description: 'End-to-end automation pipelines combining LLM capabilities with data processing for performance marketing analytics, reporting, and strategic insight generation.',
    technologies: ['n8n', 'Claude API', 'Python', 'Make.com', 'CrewAI'],
    gradient: 'from-lavender to-lavender-light',
    links: [
      { label: 'View Details', url: '#', icon: 'external' },
    ],
  },
  {
    id: 'data-compliance',
    title: 'Global Data Sharing Policy',
    type: 'Policy Framework',
    description: 'Developed comprehensive data sharing compliance framework for Google App Campaigns, enabling advertisers to unlock full campaign potential while maintaining privacy standards.',
    technologies: ['Policy Design', 'Compliance', 'Google Ads', 'Privacy'],
    gradient: 'from-amber to-coral-light',
    links: [
      { label: 'Read Overview', url: '#', icon: 'doc' },
    ],
  },
  {
    id: 'interactive-resume',
    title: 'Interactive Resume Web App',
    type: 'Web Development',
    description: 'This website! A Next.js application with custom SVG visualizations, Framer Motion animations, and interactive career timeline built during the AI-focused career break.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Framer Motion', 'Tailwind CSS'],
    gradient: 'from-coral to-lavender',
    links: [
      { label: 'View Source', url: '#', icon: 'github' },
    ],
  },
  {
    id: 'gtm-playbook',
    title: 'Global GTM Playbook',
    type: 'Strategy',
    description: 'Scalable Go-To-Market playbook for international app growth, adopted across EMEA with 1,500+ clients benefiting from standardized narratives and tools.',
    technologies: ['Strategy', 'Market Analysis', 'Google Ads', 'Looker Studio'],
    gradient: 'from-teal to-amber',
    links: [
      { label: 'Learn More', url: '#', icon: 'external' },
    ],
  },
]
