'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Home', href: '/#top' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Collaboration', href: '/collaboration' },
]

export function FloatingNav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [mobileOpen])

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1 bg-warm-50/80 backdrop-blur-md border border-warm-200 rounded-full px-2 py-1.5 shadow-nav">
            {navLinks.map((link) => {
              const isCurrent = link.href.startsWith('/#') ? link.href === '/#top' && pathname === '/' : pathname === link.href
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-current={isCurrent ? 'page' : undefined}
                  className="px-4 py-1.5 text-sm font-medium text-warm-700 hover:text-warm-900 hover:bg-warm-100 rounded-full transition-colors duration-200"
                >
                  {link.label}
                </Link>
              )
            })}
            <a
              href="/resume/Dominik_Benger_Resume.pdf"
              download
              className="ml-1 px-4 py-1.5 text-sm font-semibold text-white bg-coral hover:bg-coral-dark rounded-full transition-colors duration-200 flex items-center gap-1.5"
            >
              <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              PDF
            </a>
          </div>

          {/* Mobile nav */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex items-center justify-center w-12 h-12 bg-warm-50/80 backdrop-blur-md border border-warm-200 rounded-full shadow-nav"
              aria-label="Toggle navigation"
              aria-expanded={mobileOpen}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-warm-800">
                {mobileOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="4" y1="8" x2="20" y2="8" />
                    <line x1="4" y1="16" x2="20" y2="16" />
                  </>
                )}
              </svg>
            </button>

            <AnimatePresence>
              {mobileOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -8 }}
                  transition={{ duration: 0.2 }}
                  role="menu"
                  className={cn(
                    'absolute top-14 right-0 w-48',
                    'bg-warm-50/95 backdrop-blur-md border border-warm-200 rounded-2xl shadow-card-hover p-2'
                  )}
                >
                  {navLinks.map((link) => {
                    const isCurrent = link.href.startsWith('/#') ? link.href === '/#top' && pathname === '/' : pathname === link.href
                    return (
                      <Link
                        key={link.label}
                        href={link.href}
                        role="menuitem"
                        aria-current={isCurrent ? 'page' : undefined}
                        onClick={() => setMobileOpen(false)}
                        className="block px-4 py-2.5 text-sm font-medium text-warm-700 hover:text-warm-900 hover:bg-warm-100 rounded-xl transition-colors"
                      >
                        {link.label}
                      </Link>
                    )
                  })}
                  <a
                    href="/resume/Dominik_Benger_Resume.pdf"
                    download
                    role="menuitem"
                    className="block px-4 py-2.5 text-sm font-semibold text-coral hover:text-coral-dark hover:bg-coral-50 rounded-xl transition-colors"
                  >
                    Download PDF
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
    </nav>
  )
}
