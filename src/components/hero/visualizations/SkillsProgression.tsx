'use client'

import { motion } from 'framer-motion'
import { skillCategories } from '@/data/skills'

const colorMap: Record<string, { bar: string; bg: string; text: string }> = {
  coral: { bar: '#E07A5F', bg: '#FEF2EE', text: '#C96347' },
  teal: { bar: '#4A9B8E', bg: '#EFF8F6', text: '#3B7D72' },
  amber: { bar: '#E6B35A', bg: '#FDF6E8', text: '#D49A3A' },
  lavender: { bar: '#7C6FB0', bg: '#F2F0F8', text: '#635897' },
}

export function SkillsProgression() {
  return (
    <div className="w-full space-y-6 sm:space-y-8" role="img" aria-label="Skills proficiency chart across Marketing and Ads, Data and Analytics, Programming and Tools, and AI and Automation categories">
      {skillCategories.map((category, catIdx) => {
        const colors = colorMap[category.colorClass] || colorMap.coral
        return (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: catIdx * 0.12,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <div
                className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: colors.bar }}
                aria-hidden="true"
              />
              <h3 className="text-xs sm:text-sm font-semibold text-warm-800">
                {category.name}
              </h3>
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              {category.skills.map((skill, skillIdx) => (
                <div key={skill.name} className="flex items-center gap-2 sm:gap-3">
                  <span className="text-[10px] sm:text-[11px] md:text-xs text-warm-600 w-16 sm:w-28 md:w-36 text-right shrink-0 truncate">
                    {skill.name}
                  </span>
                  <div className="flex-1 h-4 sm:h-5 rounded-full overflow-hidden" style={{ backgroundColor: colors.bg }}>
                    <motion.div
                      className="h-full rounded-full relative"
                      style={{ backgroundColor: colors.bar }}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{
                        duration: 0.8,
                        delay: catIdx * 0.12 + skillIdx * 0.06,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                    >
                      <span className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 text-[9px] sm:text-[10px] font-bold text-white/90">
                        {skill.level}
                      </span>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
