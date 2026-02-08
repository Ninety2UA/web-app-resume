import { Metadata } from 'next'
import { FloatingNav } from '@/components/layout/FloatingNav'
import { OfferingsGrid } from '@/components/collaboration/OfferingsGrid'
import { PackageCards } from '@/components/collaboration/PackageCards'
import { WorkingStyleSection } from '@/components/collaboration/WorkingStyleSection'
import { Footer } from '@/components/layout/Footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Collaboration \u2014 Dominik Benger',
  description: 'Practical analytics, measurement, and automation services for app and growth teams. Audit, build, or operate \u2014 clear decisions, reliable tracking, repeatable improvements.',
}

export default function CollaborationPage() {
  return (
    <>
      <FloatingNav />
      <main className="min-h-screen" aria-label="Collaboration">
        {/* Hero */}
        <section className="pt-28 pb-12 px-4 md:px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-warm-900 mb-4">
              Collaboration
            </h1>
            <p className="text-warm-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Practical analytics, measurement, and automation services for app and growth teams &mdash; built to produce clear decisions, reliable tracking, and repeatable performance improvements.
            </p>
          </div>
        </section>

        {/* Core Offerings */}
        <section className="px-4 md:px-6 pb-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-warm-900 mb-2">
              Core Offerings
            </h2>
            <p className="text-warm-600 mb-8 max-w-xl">
              Ten focused services &mdash; each with a clear audience, outcome, and deliverable set.
            </p>
            <OfferingsGrid />
          </div>
        </section>

        {/* Packages + Add-ons */}
        <section className="px-4 md:px-6 py-16 bg-warm-100/30 border-y border-warm-200/40">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-warm-900 mb-2">
              Simple Packages
            </h2>
            <p className="text-warm-600 mb-8 max-w-xl">
              Three ways to engage &mdash; pick the depth that fits.
            </p>
            <PackageCards />
          </div>
        </section>

        {/* Working Style + Tooling */}
        <section className="px-4 md:px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-warm-900 mb-2">
              Working Style
            </h2>
            <p className="text-warm-600 mb-8 max-w-xl">
              How I work and what I build with.
            </p>
            <WorkingStyleSection />
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 md:px-6 bg-warm-100/40 border-t border-warm-200/50">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-warm-900 mb-4">
              Interested in collaborating?
            </h2>
            <p className="text-warm-600 mb-6">
              I&apos;m always open to discussing new projects, consulting engagements, or full-time opportunities.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-coral text-white font-semibold rounded-full hover:bg-coral-dark shadow-glow-coral transition-all duration-200"
            >
              Get in Touch
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
