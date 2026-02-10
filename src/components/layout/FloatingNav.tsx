'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { label: 'Home', href: '/#top' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Collaboration', href: '/collaboration' },
  { label: 'Contact', href: '/#contact' },
]

export function FloatingNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
          <div className="flex items-center gap-0.5 sm:gap-1 bg-warm-50/80 backdrop-blur-md border border-warm-200 rounded-full px-1.5 sm:px-2 py-1 sm:py-1.5 shadow-nav">
            {navLinks.map((link) => {
              const isCurrent = link.href.startsWith('/#') ? link.href === '/#top' && pathname === '/' : pathname === link.href
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-current={isCurrent ? 'page' : undefined}
                  className="px-2 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-warm-700 hover:text-warm-900 hover:bg-warm-100 rounded-full transition-colors duration-200 whitespace-nowrap"
                >
                  {link.label}
                </Link>
              )
            })}
            <a
              href="/resume/Dominik_Benger_Resume.pdf"
              download
              className="ml-0.5 sm:ml-1 px-2 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-semibold text-white bg-coral hover:bg-coral-dark rounded-full transition-colors duration-200 flex items-center gap-1 sm:gap-1.5 whitespace-nowrap"
            >
              <svg aria-hidden="true" className="w-3 h-3 sm:w-3.5 sm:h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              PDF
            </a>
          </div>
    </nav>
  )
}
