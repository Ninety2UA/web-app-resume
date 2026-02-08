'use client'

import { motion } from 'framer-motion'
import type { ExperienceEntry } from '@/data/experience'
import { formatDateRange } from '@/lib/utils'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

interface ExperienceCardProps {
  experience: ExperienceEntry
  index: number
  compact?: boolean
}

const accentColors = [
  'border-l-coral',
  'border-l-teal',
  'border-l-amber',
  'border-l-lavender',
  'border-l-coral',
  'border-l-teal',
  'border-l-amber',
  'border-l-lavender',
]

export function ExperienceCard({ experience, index, compact }: ExperienceCardProps) {
  const { ref, isVisible } = useScrollAnimation(0.15)
  const accentColor = accentColors[index % accentColors.length]

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className={`bg-warm-50 border border-warm-200 rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300 border-l-4 ${accentColor}`}
    >
      <div className={compact ? 'p-4 sm:p-5' : 'p-4 sm:p-5 md:p-8'}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-4">
          <div>
            <h3 className={`font-bold text-warm-900 ${compact ? 'text-lg' : 'text-xl'}`}>
              {experience.role}
            </h3>
            <p className="text-warm-600 font-medium">
              {experience.company}
              {experience.team && (
                <span className="text-warm-400"> · {experience.team}</span>
              )}
            </p>
          </div>
          <div className="text-sm text-warm-500 shrink-0 sm:text-right">
            <p className="font-medium">{formatDateRange(experience.startDate, experience.endDate)}</p>
            <p className="text-warm-400 text-xs">{experience.location}</p>
          </div>
        </div>

        {/* Summary */}
        <p className="text-warm-600 text-sm leading-relaxed mb-4">{experience.summary}</p>

        {/* Sections */}
        {!compact && experience.sections.map((section) => (
          <div key={section.title} className="mb-4 last:mb-0">
            <h4 className="text-sm font-semibold text-warm-700 mb-2">{section.title}</h4>
            <ul className="space-y-1.5">
              {section.bullets.map((bullet, i) => (
                <li key={i} className="text-sm text-warm-600 leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:rounded-full before:bg-warm-300">
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {compact && experience.sections[0] && (
          <ul className="space-y-1.5 mb-4">
            {experience.sections[0].bullets.slice(0, 2).map((bullet, i) => (
              <li key={i} className="text-sm text-warm-600 leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:rounded-full before:bg-warm-300">
                {bullet}
              </li>
            ))}
          </ul>
        )}

        {/* Key Projects */}
        {!compact && experience.keyProjects && experience.keyProjects.length > 0 && (
          <div className="mb-4 bg-warm-100/50 rounded-xl p-3 sm:p-4 border border-warm-200/50">
            <h4 className="text-sm font-semibold text-warm-700 mb-2">Key Projects</h4>
            {experience.keyProjects.map((project) => (
              <div key={project.title} className="mb-2 last:mb-0">
                <p className="text-sm font-medium text-warm-800">
                  {project.title}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} project`}
                      className="ml-2 text-coral hover:text-coral-dark text-xs font-normal"
                    >
                      View →
                    </a>
                  )}
                </p>
                <p className="text-xs text-warm-500 mt-0.5">{project.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5 mt-3" aria-label="Technologies used">
          {experience.technologies.slice(0, compact ? 4 : undefined).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-warm-100 text-warm-600 border border-warm-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
