'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { VisualizationToggle } from './VisualizationToggle'
import { TimelineMarkers } from './TimelineMarkers'
import { RoleEvolution } from './visualizations/RoleEvolution'
import { SkillsProgression } from './visualizations/SkillsProgression'
import { IndustryVerticals } from './visualizations/IndustryVerticals'
import { TechStack } from './visualizations/TechStack'

export type VizType = 'role' | 'skills' | 'industry' | 'tech'

const vizComponents: Record<VizType, React.ComponentType> = {
  role: RoleEvolution,
  skills: SkillsProgression,
  industry: IndustryVerticals,
  tech: TechStack,
}

export function HeroSection() {
  const [activeViz, setActiveViz] = useState<VizType>('role')

  const ActiveViz = vizComponents[activeViz]

  return (
    <section id="top" className="relative min-h-screen flex flex-col justify-center px-6 py-20 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-warm-50 via-warm-50 to-warm-100 pointer-events-none" />

      {/* Decorative circles */}
      <div className="absolute top-20 right-[10%] w-72 h-72 bg-coral/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-[5%] w-96 h-96 bg-teal/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold text-warm-900 tracking-tight mb-4">
              Dominik Benger
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-lg md:text-xl text-warm-600 max-w-2xl mx-auto text-balance leading-relaxed"
          >
            Seasoned Business & Analytics leader with extensive experience in data-driven sales & operations
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-6"
          >
            <a
              href="/resume/Dominik_Benger_Resume.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 bg-coral text-white font-semibold rounded-full hover:bg-coral-dark shadow-glow-coral hover:shadow-lg transition-all duration-200"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download PDF Resume
            </a>
          </motion.div>
        </div>

        {/* Visualization Toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          <VisualizationToggle active={activeViz} onChange={setActiveViz} />
        </motion.div>

        {/* Visualization Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 bg-warm-50 border border-warm-200 rounded-2xl p-6 md:p-8 shadow-card min-h-[340px] md:min-h-[400px] flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeViz}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="w-full"
            >
              <ActiveViz />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Timeline Markers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.75 }}
          className="mt-6"
        >
          <TimelineMarkers />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex flex-col items-center mt-12 text-warm-400"
        >
          <span className="text-xs font-medium tracking-wider uppercase mb-2">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
