import { Metadata } from 'next'
import { FloatingNav } from '@/components/layout/FloatingNav'
import { EbookContent } from '@/components/ebook/EbookContent'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'How I Built This Web App — Dominik Benger',
  description: 'A case study on building an interactive resume web app in 3 days with Claude Code, Next.js 15, Tailwind CSS, and custom SVG visualizations.',
}

export default function HowIBuiltThisPage() {
  return (
    <>
      <FloatingNav />
      <main className="min-h-screen" aria-label="How I Built This Web App">
        <EbookContent />
      </main>
      <Footer />
    </>
  )
}
