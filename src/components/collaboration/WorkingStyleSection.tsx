'use client'

import { motion } from 'framer-motion'
import { workingPrinciples, toolCategories } from '@/data/offerings'

export function WorkingStyleSection() {
  return (
    <div className="space-y-10">
      {/* Working principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {workingPrinciples.map((principle, i) => (
          <motion.div
            key={principle.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="bg-warm-50 rounded-2xl border border-warm-200 shadow-card p-5"
          >
            <h3 className="text-base font-bold text-warm-900 mb-1">
              {principle.label}
            </h3>
            <p className="text-sm text-warm-600 leading-relaxed">
              {principle.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Tooling */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <h3 className="text-lg font-bold text-warm-900 mb-4">
          Tooling & Stack
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {toolCategories.map((category) => (
            <div key={category.name}>
              <p className="text-xs font-semibold text-warm-500 uppercase tracking-wider mb-2">
                {category.name}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {category.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-2.5 py-1 text-xs font-medium rounded-full bg-warm-100 text-warm-700 border border-warm-200"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
