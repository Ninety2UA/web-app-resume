import { Metadata } from 'next'
import { FloatingNav } from '@/components/layout/FloatingNav'
import { PortfolioGrid } from '@/components/portfolio/PortfolioGrid'
import { Footer } from '@/components/layout/Footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Portfolio — Dominik Benger',
  description: 'Projects and case studies from 10+ years in analytics, performance marketing, and AI innovation.',
}

export default function PortfolioPage() {
  return (
    <>
      <FloatingNav />
      <main className="min-h-screen">
        {/* Header */}
        <section className="pt-28 pb-12 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-warm-900 mb-4">
              Portfolio
            </h1>
            <p className="text-warm-600 max-w-xl mx-auto text-lg">
              Selected projects spanning analytics platforms, open-source tools, AI workflows, and strategic frameworks.
            </p>
          </div>
        </section>

        {/* Grid */}
        <section className="px-6 pb-20">
          <div className="max-w-6xl mx-auto">
            <PortfolioGrid />
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6 bg-warm-100/40 border-t border-warm-200/50">
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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
