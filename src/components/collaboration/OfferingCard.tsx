'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { CoreOffering } from '@/data/offerings'

interface OfferingCardProps {
  offering: CoreOffering
  index: number
}

export function OfferingCard({ offering, index }: OfferingCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="bg-warm-50 rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300 border border-warm-200 border-l-4"
      style={{ borderLeftColor: offering.accentColor }}
    >
      <div className="p-4 sm:p-5">
        {/* Header: number badge + name */}
        <div className="flex items-start gap-3 mb-3">
          <span
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5"
            style={{ backgroundColor: offering.accentColor }}
            aria-hidden="true"
          >
            {offering.number}
          </span>
          <h3 className="text-base sm:text-lg font-bold text-warm-900 leading-snug">
            {offering.name}
          </h3>
        </div>

        {/* For + Outcome */}
        <div className="space-y-1.5 ml-10">
          <p className="text-sm text-warm-600">
            <span className="font-semibold text-warm-700">For:</span>{' '}
            {offering.audience}
          </p>
          <p className="text-sm text-warm-600">
            <span className="font-semibold text-warm-700">{offering.outcomeLabel}:</span>{' '}
            {offering.outcome}
          </p>
        </div>

        {/* Accordion toggle */}
        <div className="ml-10 mt-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1.5 text-sm font-medium text-warm-500 hover:text-warm-700 transition-colors"
            aria-expanded={isOpen}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={cn(
                'transform transition-transform duration-200',
                isOpen && 'rotate-180'
              )}
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
            {offering.deliverablesLabel}
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                className="overflow-hidden"
              >
                <ul className="pt-2.5 space-y-1.5">
                  {offering.deliverables.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-warm-600 flex items-start gap-2"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5"
                        style={{ backgroundColor: offering.accentColor }}
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
