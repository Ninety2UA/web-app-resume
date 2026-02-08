'use client'

import { motion } from 'framer-motion'
import { techTimeline } from '@/data/skills'

const categoryColors: Record<string, { bg: string; dot: string; text: string }> = {
  marketing: { bg: '#FEF2EE', dot: '#E07A5F', text: '#C96347' },
  data: { bg: '#EFF8F6', dot: '#4A9B8E', text: '#3B7D72' },
  programming: { bg: '#FDF6E8', dot: '#E6B35A', text: '#D49A3A' },
  ai: { bg: '#F2F0F8', dot: '#7C6FB0', text: '#635897' },
}

const categoryLabels: Record<string, string> = {
  marketing: 'Marketing Tech',
  data: 'Data & Analytics',
  programming: 'Programming',
  ai: 'AI & Automation',
}

export function TechStack() {
  return (
    <div className="w-full">
      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        {Object.entries(categoryLabels).map(([key, label]) => {
          const colors = categoryColors[key]
          return (
            <div key={key} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: colors.dot }} />
              <span className="text-xs text-warm-600 font-medium">{label}</span>
            </div>
          )
        })}
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-16 md:left-20 top-0 bottom-0 w-px bg-warm-200" />

        <div className="space-y-4">
          {techTimeline.map((entry, yearIdx) => (
            <motion.div
              key={entry.year}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.35,
                delay: yearIdx * 0.07,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="flex items-start gap-4"
            >
              {/* Year label */}
              <span className="w-12 md:w-16 text-right text-sm font-bold text-warm-700 tabular-nums shrink-0 pt-1.5">
                {entry.year}
              </span>

              {/* Dot on timeline */}
              <div className="relative shrink-0 pt-2">
                <div className="w-3 h-3 rounded-full bg-warm-50 border-2 border-warm-400 z-10 relative" />
              </div>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2 pt-0.5">
                {entry.technologies.map((tech, techIdx) => {
                  const colors = categoryColors[tech.category]
                  return (
                    <motion.span
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.3,
                        delay: yearIdx * 0.07 + techIdx * 0.05 + 0.1,
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border"
                      style={{
                        backgroundColor: colors.bg,
                        borderColor: colors.dot + '30',
                        color: colors.text,
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.dot }} />
                      {tech.name}
                    </motion.span>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
