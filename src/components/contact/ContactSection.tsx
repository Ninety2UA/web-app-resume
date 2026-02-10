'use client'

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export function ContactSection() {
  const [state, setState] = useState<FormState>('idle')
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setState('submitting')

    try {
      const res = await fetch('https://formspree.io/f/mojnqgnq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setState('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setState('error')
      }
    } catch {
      setState('error')
    }
  }

  return (
    <section id="contact" className="scroll-mt-[140px] py-20 px-4 md:px-6 bg-warm-100/40">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left - copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-warm-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-warm-600 leading-relaxed mb-6">
              Whether you&apos;re looking for an analytics leader, a consulting partner, or just want to connect — I&apos;d love to hear from you.
            </p>
            <div className="space-y-3">
              <a
                href="mailto:domi@dbenger.com"
                className="flex items-center gap-3 text-warm-700 hover:text-coral transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-warm-50 border border-warm-200 flex items-center justify-center group-hover:border-coral/30 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <span className="text-sm font-medium">domi@dbenger.com</span>
              </a>
              <a
                href="https://www.linkedin.com/in/dombenger/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-warm-700 hover:text-coral transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-warm-50 border border-warm-200 flex items-center justify-center group-hover:border-coral/30 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </div>
                <span className="text-sm font-medium">linkedin.com/in/dombenger</span>
              </a>
            </div>
          </motion.div>

          {/* Right - form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {state === 'success' ? (
              <div className="bg-teal-50 border border-teal/20 rounded-2xl p-8 text-center" role="status">
                <div className="w-12 h-12 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4A9B8E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-warm-800 mb-2">Thanks for reaching out!</h3>
                <p className="text-warm-600 text-sm">I&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-warm-700 mb-1.5">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    aria-required="true"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-warm-50 border border-warm-200 rounded-xl text-warm-800 text-sm placeholder:text-warm-400 focus:border-coral focus:ring-1 focus:ring-coral/20 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-warm-700 mb-1.5">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    aria-required="true"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-warm-50 border border-warm-200 rounded-xl text-warm-800 text-sm placeholder:text-warm-400 focus:border-coral focus:ring-1 focus:ring-coral/20 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-warm-700 mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    aria-required="true"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-warm-50 border border-warm-200 rounded-xl text-warm-800 text-sm placeholder:text-warm-400 focus:border-coral focus:ring-1 focus:ring-coral/20 transition-colors resize-none"
                    placeholder="What would you like to discuss?"
                  />
                </div>

                {state === 'error' && (
                  <p className="text-sm text-red-600" role="alert">
                    Something went wrong. Please email me directly at{' '}
                    <a href="mailto:domi@dbenger.com" className="underline">domi@dbenger.com</a>.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={state === 'submitting'}
                  className="w-full py-3 bg-coral text-white font-semibold rounded-xl hover:bg-coral-dark disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  {state === 'submitting' ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>

                {/* Honeypot field for spam */}
                <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} aria-hidden="true" autoComplete="off" />
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
