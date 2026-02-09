const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/dombenger/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:domi@dbenger.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
]

export function Footer() {
  return (
    <footer aria-label="Footer navigation" className="border-t border-warm-200 bg-warm-100/50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                aria-label={link.label}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-warm-50 border border-warm-200 text-warm-600 hover:text-coral hover:border-coral/30 hover:shadow-glow-coral transition-all duration-200"
              >
                {link.icon}
              </a>
            ))}
          </div>

          <div className="flex flex-col items-center md:items-end gap-1">
            <div className="flex items-center gap-4 text-sm text-warm-500">
              <a
                href="/resume/Dominik_Benger_Resume.pdf"
                download
                className="hover:text-warm-700 transition-colors"
              >
                Download PDF
              </a>
            </div>
            <p className="text-xs text-warm-400">
              &copy; {new Date().getFullYear()} Dominik Benger
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
