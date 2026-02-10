'use client'

import { motion } from 'framer-motion'
import { industryData } from '@/data/skills'

const colorMap: Record<string, { bg: string; border: string; text: string; accent: string }> = {
  coral: { bg: '#FEF2EE', border: '#F4A592', text: '#C96347', accent: '#E07A5F' },
  teal: { bg: '#EFF8F6', border: '#7EC8BD', text: '#3B7D72', accent: '#4A9B8E' },
  amber: { bg: '#FDF6E8', border: '#F5D185', text: '#D49A3A', accent: '#E6B35A' },
  lavender: { bg: '#F2F0F8', border: '#A193CC', text: '#635897', accent: '#7C6FB0' },
}

export function IndustryVerticals() {
  const totalYears = industryData.reduce((sum, d) => sum + d.years, 0)

  return (
    <div className="w-full" role="img" aria-label="Industry experience breakdown showing years spent across Apps and Mobile Gaming, Retail and FMCG, Tech and SaaS, Agency and Consulting, and AI and Innovation">
      {/* Proportional bar */}
      <div className="flex rounded-2xl overflow-hidden h-12 sm:h-16 md:h-20 mb-6 sm:mb-8 shadow-card" aria-hidden="true">
        {industryData.map((industry, i) => {
          const colors = colorMap[industry.colorClass] || colorMap.coral
          const widthPercent = (industry.years / totalYears) * 100
          return (
            <motion.div
              key={industry.name}
              className="relative flex items-center justify-center overflow-hidden"
              style={{ backgroundColor: colors.accent }}
              initial={{ width: 0 }}
              animate={{ width: `${widthPercent}%` }}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <span className="text-white text-[9px] sm:text-[10px] md:text-xs font-bold text-center px-0.5 sm:px-1 leading-tight">
                {widthPercent > 15 ? industry.name : ''}
              </span>
            </motion.div>
          )
        })}
      </div>

      {/* Detail cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {industryData.map((industry, i) => {
          const colors = colorMap[industry.colorClass] || colorMap.coral
          return (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.5 + i * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="rounded-xl p-3 sm:p-4 border"
              style={{
                backgroundColor: colors.bg,
                borderColor: colors.border + '40',
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-xs sm:text-sm font-semibold" style={{ color: colors.text }}>
                  {industry.name}
                </h4>
                <span
                  className="text-base sm:text-lg font-extrabold tabular-nums ml-2 shrink-0"
                  style={{ color: colors.accent }}
                >
                  {industry.years}y
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {industry.roles.map((role) => (
                  <span
                    key={role}
                    className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                    style={{
                      backgroundColor: colors.accent + '15',
                      color: colors.text,
                    }}
                  >
                    {role}
                  </span>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
