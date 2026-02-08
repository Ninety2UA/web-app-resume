'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { VizType } from './HeroSection'

interface VisualizationToggleProps {
  active: VizType
  onChange: (viz: VizType) => void
}

const vizOptions: { id: VizType; label: string; icon: React.ReactNode }[] = [
  {
    id: 'role',
    label: 'Career Path',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    id: 'skillsTech',
    label: 'Skills & Tech Stack',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <polyline points="16 18 21 14 16 10" />
      </svg>
    ),
  },
  {
    id: 'industry',
    label: 'Industries',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
]

export function VisualizationToggle({ active, onChange }: VisualizationToggleProps) {
  return (
    <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2" role="tablist" aria-label="Visualization type">
      {vizOptions.map((option) => (
        <button
          key={option.id}
          onClick={() => onChange(option.id)}
          role="tab"
          aria-selected={active === option.id}
          aria-controls="viz-panel"
          className={cn(
            'relative px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors duration-200 flex items-center gap-1.5 sm:gap-2',
            active === option.id
              ? 'text-warm-900'
              : 'text-warm-500 hover:text-warm-700'
          )}
        >
          {active === option.id && (
            <motion.div
              layoutId="activeVizPill"
              className="absolute inset-0 bg-warm-100 border border-warm-200 rounded-full"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
            <span aria-hidden="true">{option.icon}</span>
            <span className="hidden sm:inline">{option.label}</span>
          </span>
        </button>
      ))}
    </div>
  )
}
