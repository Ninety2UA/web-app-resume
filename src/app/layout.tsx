import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Dominik Benger — Business & Analytics Leader',
  description: 'Seasoned Business & Analytics leader with extensive experience in data-driven sales & operations. Interactive resume with career visualizations and portfolio.',
  metadataBase: new URL('https://dbenger.com'),
  openGraph: {
    title: 'Dominik Benger — Business & Analytics Leader',
    description: 'Interactive resume with career visualizations, filterable experience timeline, and portfolio showcase.',
    url: 'https://dbenger.com',
    siteName: 'Dominik Benger',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dominik Benger — Business & Analytics Leader',
    description: 'Interactive resume with career visualizations and portfolio showcase.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body className="font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-coral focus:text-white focus:rounded-lg focus:font-semibold focus:text-sm"
        >
          Skip to main content
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
