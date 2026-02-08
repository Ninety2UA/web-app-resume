'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { skillsTechCategories } from '@/data/skills'

const colorMap: Record<string, { dot: string; bg: string; text: string; border: string }> = {
  teal: { dot: '#4A9B8E', bg: '#EFF8F6', text: '#3B7D72', border: '#4A9B8E30' },
  coral: { dot: '#E07A5F', bg: '#FEF2EE', text: '#C96347', border: '#E07A5F30' },
  amber: { dot: '#E6B35A', bg: '#FDF6E8', text: '#D49A3A', border: '#E6B35A30' },
  lavender: { dot: '#7C6FB0', bg: '#F2F0F8', text: '#635897', border: '#7C6FB030' },
  sky: { dot: '#5B8DB8', bg: '#EEF4F9', text: '#4A7396', border: '#5B8DB830' },
  rose: { dot: '#D4697A', bg: '#FDF0F2', text: '#B8566A', border: '#D4697A30' },
  emerald: { dot: '#4A9B6E', bg: '#EFF8F2', text: '#3B7D58', border: '#4A9B6E30' },
}

export function SkillsTechStack() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  const filteredCategories = activeFilter
    ? skillsTechCategories.filter((c) => c.id === activeFilter)
    : skillsTechCategories

  return (
    <div
      className="w-full"
      role="img"
      aria-label={`Skills and tech stack across ${skillsTechCategories.length} categories: ${skillsTechCategories.map((c) => c.name).join(', ')}`}
    >
      {/* Category filter pills */}
      <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-4 sm:mb-6">
        <button
          onClick={() => setActiveFilter(null)}
          className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium border transition-all duration-200 ${
            activeFilter === null
              ? 'bg-warm-800 text-warm-50 border-warm-800'
              : 'bg-warm-50 text-warm-600 border-warm-200 hover:border-warm-400'
          }`}
        >
          All
        </button>
        {skillsTechCategories.map((category) => {
          const colors = colorMap[category.colorKey]
          const isActive = activeFilter === category.id
          return (
            <button
              key={category.id}
              onClick={() => setActiveFilter(isActive ? null : category.id)}
              className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium border transition-all duration-200"
              style={{
                backgroundColor: isActive ? colors.dot : colors.bg,
                color: isActive ? '#FDFCFA' : colors.text,
                borderColor: isActive ? colors.dot : colors.border,
              }}
            >
              <span className="flex items-center gap-1 sm:gap-1.5">
                {!isActive && (
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: colors.dot }}
                  />
                )}
                {category.name}
              </span>
            </button>
          )
        })}
      </div>

      {/* Skills grid */}
      <div className="max-h-[340px] sm:max-h-[360px] overflow-y-auto scrollbar-hide space-y-4 sm:space-y-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter ?? 'all'}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="space-y-4 sm:space-y-5"
          >
            {filteredCategories.map((category, catIdx) => {
              const colors = colorMap[category.colorKey]
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: catIdx * 0.06,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  {/* Category header */}
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: colors.dot }}
                      aria-hidden="true"
                    />
                    <h3 className="text-xs sm:text-sm font-semibold text-warm-800">
                      {category.name}
                    </h3>
                    <span className="text-[10px] sm:text-xs text-warm-400 font-medium">
                      {category.skills.length}
                    </span>
                  </div>

                  {/* Skill tags */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {category.skills.map((skill, skillIdx) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.25,
                          delay: catIdx * 0.06 + skillIdx * 0.02,
                        }}
                        className="inline-flex items-center px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium border cursor-default hover:shadow-sm transition-shadow duration-150"
                        style={{
                          backgroundColor: colors.bg,
                          borderColor: colors.border,
                          color: colors.text,
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
