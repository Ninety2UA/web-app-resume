'use client'

import { coreOfferings } from '@/data/offerings'
import { OfferingCard } from './OfferingCard'

export function OfferingsGrid() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
      {coreOfferings.map((offering, i) => (
        <OfferingCard key={offering.id} offering={offering} index={i} />
      ))}
    </div>
  )
}
