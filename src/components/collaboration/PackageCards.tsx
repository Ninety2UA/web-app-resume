'use client'

import { motion } from 'framer-motion'
import { servicePackages, addOns } from '@/data/offerings'

export function PackageCards() {
  return (
    <div>
      {/* Package tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {servicePackages.map((pkg, i) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="bg-warm-50 rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300 border border-warm-200 flex flex-col"
          >
            {/* Accent bar */}
            <div
              className="h-2 w-full"
              style={{ backgroundColor: pkg.accentColor }}
            />

            <div className="p-5 sm:p-6 flex flex-col flex-1">
              {/* Letter + Name */}
              <div className="flex items-baseline gap-2 mb-1">
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: pkg.accentColor }}
                >
                  {pkg.letter}
                </span>
                <h3 className="text-xl font-bold text-warm-900">{pkg.name}</h3>
              </div>

              {/* Timeline */}
              <p className="text-sm text-warm-500 mb-4">{pkg.timeline}</p>

              {/* Best if */}
              <div className="bg-warm-100/60 rounded-xl px-4 py-3 mb-5">
                <p className="text-sm text-warm-700">
                  <span className="font-semibold">Best if:</span>{' '}
                  {pkg.bestIf}
                </p>
              </div>

              {/* Items */}
              <p className="text-xs font-semibold text-warm-500 uppercase tracking-wider mb-2">
                You get
              </p>
              <ul className="space-y-2 flex-1">
                {pkg.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-warm-600 flex items-start gap-2"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="shrink-0 mt-0.5"
                      style={{ color: pkg.accentColor }}
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add-ons */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mt-8 bg-warm-50 rounded-2xl border border-warm-200 shadow-card p-5 sm:p-6"
      >
        <h3 className="text-lg font-bold text-warm-900 mb-3">Optional Add-ons</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {addOns.map((item) => (
            <div
              key={item}
              className="flex items-start gap-2 text-sm text-warm-600"
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
                className="shrink-0 mt-0.5 text-warm-400"
                aria-hidden="true"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              {item}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
