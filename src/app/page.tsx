'use client'

import { useState } from 'react'
import { FloatingNav } from '@/components/layout/FloatingNav'
import { HeroSection } from '@/components/hero/HeroSection'
import { FilterPills } from '@/components/filters/FilterPills'
import { ExperienceSection } from '@/components/experience/ExperienceSection'
import { ContactSection } from '@/components/contact/ContactSection'
import { Footer } from '@/components/layout/Footer'

export default function Home() {
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  return (
    <>
      <FloatingNav />
      <main id="main-content">
        <HeroSection />

        {/* Filter + Experience */}
        <section
          aria-label="Filter experience by category"
          className="bg-warm-100/30 py-4 md:py-8 px-4 md:px-6 sticky top-[68px] z-30 backdrop-blur-sm border-b border-warm-200/50"
        >
          <div className="max-w-4xl mx-auto">
            <FilterPills activeFilters={activeFilters} onFilterChange={setActiveFilters} />
          </div>
        </section>

        <ExperienceSection activeFilters={activeFilters} />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
