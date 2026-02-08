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
        {children}
        <Analytics />
      </body>
    </html>
  )
}
