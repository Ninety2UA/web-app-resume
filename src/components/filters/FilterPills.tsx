'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface FilterPillsProps {
  activeFilters: string[]
  onFilterChange: (filters: string[]) => void
}

const pills = [
  { id: 'all', label: 'All Experience' },
  { id: 'apps_gaming', label: 'Apps & Gaming' },
  { id: 'retail', label: 'Retail & FMCG' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'innovation', label: 'AI & Innovation' },
]

export function FilterPills({ activeFilters, onFilterChange }: FilterPillsProps) {
  const handleClick = (id: string) => {
    if (id === 'all') {
      onFilterChange([])
      return
    }
    if (activeFilters.includes(id)) {
      onFilterChange(activeFilters.filter((f) => f !== id))
    } else {
      onFilterChange([...activeFilters, id])
    }
  }

  const isAllActive = activeFilters.length === 0

  return (
    <div role="group" aria-label="Filter by category" className="flex gap-2 justify-start md:justify-center overflow-x-auto pb-1 scrollbar-hide">
      {pills.map((pill) => {
        const isActive = pill.id === 'all' ? isAllActive : activeFilters.includes(pill.id)
        return (
          <motion.button
            key={pill.id}
            onClick={() => handleClick(pill.id)}
            aria-pressed={isActive}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              'px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-200 whitespace-nowrap shrink-0',
              isActive
                ? 'bg-coral text-white shadow-glow-coral'
                : 'bg-warm-50 text-warm-600 border border-warm-200 hover:border-coral/30 hover:text-warm-800'
            )}
          >
            {pill.label}
          </motion.button>
        )
      })}
    </div>
  )
}
