'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { experiences } from '@/data/experience'
import { ExperienceCard } from './ExperienceCard'

interface ExperienceSectionProps {
  activeFilters: string[]
}

export function ExperienceSection({ activeFilters }: ExperienceSectionProps) {
  const filtered = activeFilters.length === 0
    ? experiences
    : experiences.filter((exp) =>
        activeFilters.some(
          (f) => exp.industries.includes(f) || exp.roleType.includes(f)
        )
      )

  const mainExperiences = filtered.filter((e) => !e.isAdditional)
  const additionalExperiences = filtered.filter((e) => e.isAdditional)

  return (
    <section id="experience" className="scroll-mt-[140px] py-20 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-warm-900 text-center mb-4"
        >
          Experience
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-warm-500 text-center mb-14 max-w-lg md:max-w-xl mx-auto"
        >
          10+ years of driving growth through data, analytics, and strategic leadership
        </motion.p>

        <AnimatePresence mode="popLayout">
          <div className="space-y-6" aria-live="polite">
            {mainExperiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <ExperienceCard experience={exp} index={i} />
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        {additionalExperiences.length > 0 && (
          <>
            <motion.h3
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
              className="text-xl font-semibold text-warm-700 mt-16 mb-8 text-center"
            >
              Additional Experience
            </motion.h3>
            <AnimatePresence mode="popLayout">
              <div className="space-y-4">
                {additionalExperiences.map((exp, i) => (
                  <motion.div
                    key={exp.id}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                  >
                    <ExperienceCard experience={exp} index={i} compact />
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          </>
        )}

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mt-16 text-center"
        >
          <h3 className="text-xl font-semibold text-warm-700 mb-3">Education</h3>
          <p className="text-warm-800 font-medium flex items-center justify-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logos/rit.png" alt="RIT logo" className="h-7 w-auto max-w-[80px] object-contain" />
            Rochester Institute of Technology
          </p>
          <p className="text-warm-500 text-sm">B.S. in International Business & Marketing · 2017</p>
        </motion.div>
      </div>
    </section>
  )
}
