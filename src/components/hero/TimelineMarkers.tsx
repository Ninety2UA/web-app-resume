'use client'

import { cn } from '@/lib/utils'

const eras = [
  { label: '2014–15', sublabel: 'Early Career' },
  { label: '2016–17', sublabel: 'Growth' },
  { label: '2017–18', sublabel: 'Google Start' },
  { label: '2018–21', sublabel: 'Technical Lead' },
  { label: '2021–25', sublabel: 'Senior Leadership' },
  { label: '2025+', sublabel: 'AI Era' },
]

export function TimelineMarkers() {
  return (
    <div className="relative" role="img" aria-label="Career timeline from 2014 to 2025+">
      {/* Timeline line */}
      <div className="absolute top-4 left-0 right-0 h-px bg-warm-200" aria-hidden="true" />

      <div className="flex justify-between items-start px-0 sm:px-2">
        {eras.map((era, i) => (
          <div key={era.label} className="flex flex-col items-center relative">
            {/* Dot */}
            <div
              aria-hidden="true"
              className={cn(
                'w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border-2 bg-warm-50 z-10',
                i === eras.length - 1 ? 'border-coral' : 'border-warm-300'
              )}
            />
            {/* Label */}
            <span className="mt-1.5 sm:mt-2 text-[9px] sm:text-xs font-semibold text-warm-700 whitespace-nowrap">
              {era.label}
            </span>
            <span className="text-[10px] text-warm-400 whitespace-nowrap hidden sm:block">
              {era.sublabel}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
