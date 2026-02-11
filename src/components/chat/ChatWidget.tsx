'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { CHAT_CONFIG } from '@/data/chatbot-knowledge'
import TypingIndicator from './TypingIndicator'

interface Message {
  id: string
  role: 'user' | 'model'
  text: string
}

type StreamState = 'idle' | 'streaming' | 'error'

function generateId() {
  return Math.random().toString(36).slice(2, 10)
}

// --- Inline sub-components ---

function ChatIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}

function UserBubble({ text }: { text: string }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[80%] px-4 py-2.5 bg-coral text-white rounded-2xl rounded-br-md text-sm leading-relaxed">
        {text}
      </div>
    </div>
  )
}

/** Strip any residual markdown the model might produce */
function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')   // **bold**
    .replace(/\*(.*?)\*/g, '$1')        // *italic*
    .replace(/#{1,6}\s?/g, '')          // ## headings
    .replace(/`{1,3}(.*?)`{1,3}/g, '$1') // `code`
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // [link](url)
}

function AssistantBubble({ text }: { text: string }) {
  return (
    <div className="flex justify-start">
      <div className="max-w-[80%] px-4 py-2.5 bg-warm-100 text-warm-800 rounded-2xl rounded-bl-md text-sm leading-relaxed whitespace-pre-wrap">
        {stripMarkdown(text)}
      </div>
    </div>
  )
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(true)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [streamState, setStreamState] = useState<StreamState>('idle')
  const [sessionId] = useState(() => generateId())
  const [lastFailedMessage, setLastFailedMessage] = useState<string | null>(null)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  const userMessageCount = messages.filter((m) => m.role === 'user').length
  const atSessionLimit = userMessageCount >= CHAT_CONFIG.maxSessionMessages

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streamState])

  // Focus textarea on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => textareaRef.current?.focus(), 100)
    }
  }, [isOpen])

  // Escape to close
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const sendMessage = useCallback(async (messageText: string) => {
    const trimmed = messageText.trim()
    if (!trimmed || streamState === 'streaming') return

    setLastFailedMessage(null)

    // Add user message
    const userMsg: Message = { id: generateId(), role: 'user', text: trimmed }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setStreamState('streaming')

    // Build history for API (exclude the new message — it goes as `message`)
    const history = messages.map((m) => ({ role: m.role, text: m.text }))

    try {
      abortRef.current = new AbortController()
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history,
          sessionId,
        }),
        signal: abortRef.current.signal,
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Something went wrong.' }))
        throw new Error(errorData.error || `Error ${res.status}`)
      }

      if (!res.body) throw new Error('No response stream')

      // Stream SSE
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let assistantText = ''
      const assistantId = generateId()

      // Add empty assistant message
      setMessages((prev) => [...prev, { id: assistantId, role: 'model', text: '' }])

      let buffer = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          try {
            const data = JSON.parse(line.slice(6))
            if (data.done) break
            if (data.error) throw new Error(data.error)
            if (data.text) {
              assistantText += data.text
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId ? { ...m, text: assistantText } : m
                )
              )
            }
          } catch {
            // Skip malformed JSON lines
          }
        }
      }

      setStreamState('idle')
    } catch (error) {
      if ((error as Error).name === 'AbortError') {
        setStreamState('idle')
        return
      }

      // Remove empty assistant bubble if streaming failed before any content
      setMessages((prev) => {
        const last = prev[prev.length - 1]
        if (last?.role === 'model' && !last.text) {
          return prev.slice(0, -1)
        }
        return prev
      })

      setLastFailedMessage(trimmed)
      setStreamState('error')
    }
  }, [messages, streamState, sessionId])

  const handleSubmit = () => {
    sendMessage(input)
  }

  const handleRetry = () => {
    if (lastFailedMessage) {
      // Remove the failed user message so sendMessage re-adds it
      setMessages((prev) => {
        const last = prev[prev.length - 1]
        if (last?.role === 'user' && last.text === lastFailedMessage) {
          return prev.slice(0, -1)
        }
        return prev
      })
      setStreamState('idle')
      sendMessage(lastFailedMessage)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleSuggestedQuestion = (question: string) => {
    sendMessage(question)
  }

  const showContactCTA = messages.filter((m) => m.role === 'user').length >= 3

  return (
    <>
      {/* FAB */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-14 h-14 bg-coral text-white rounded-full shadow-glow-coral flex items-center justify-center z-[60]"
            aria-label="Open chat"
            aria-expanded={false}
          >
            <ChatIcon />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            role="dialog"
            aria-label="Chat with Dominik's AI"
            className="fixed inset-0 sm:inset-auto sm:bottom-4 sm:right-4 sm:w-[380px] sm:h-[540px] z-[60] flex flex-col bg-warm-50 sm:rounded-2xl sm:shadow-card-hover overflow-hidden border border-warm-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-warm-50/80 backdrop-blur-md border-b border-warm-200 shrink-0">
              <div>
                <h2 className="text-sm font-semibold text-warm-900">Ask Dominik&apos;s AI</h2>
                <p className="text-xs text-warm-500">Ask about experience, skills & services</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-warm-100 text-warm-500 transition-colors"
                aria-label="Close chat"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
              aria-live="polite"
              aria-label="Chat messages"
            >
              {/* Welcome state */}
              {messages.length === 0 && (
                <div className="space-y-4">
                  <AssistantBubble text={"Hi! I'm Dominik's AI assistant. I can tell you about his professional background, skills, experience at Google, consulting services, and more. What would you like to know?"} />
                  <div className="flex flex-wrap gap-2">
                    {CHAT_CONFIG.suggestedQuestions.map((q) => (
                      <button
                        key={q}
                        onClick={() => handleSuggestedQuestion(q)}
                        className="text-xs px-3 py-1.5 bg-warm-100 text-warm-700 rounded-full border border-warm-200 hover:bg-warm-200 hover:border-warm-300 transition-colors"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Message bubbles */}
              {messages.map((msg) =>
                msg.role === 'user' ? (
                  <UserBubble key={msg.id} text={msg.text} />
                ) : (
                  <AssistantBubble key={msg.id} text={msg.text} />
                )
              )}

              {/* Typing indicator */}
              {streamState === 'streaming' && messages[messages.length - 1]?.role === 'user' && (
                <div className="flex justify-start">
                  <TypingIndicator />
                </div>
              )}

              {/* Error state with retry */}
              {streamState === 'error' && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] px-4 py-2.5 bg-coral-50 text-warm-700 rounded-2xl rounded-bl-md text-sm border border-coral/20">
                    <p>Something went wrong. Please try again.</p>
                    {lastFailedMessage && (
                      <button
                        onClick={handleRetry}
                        className="mt-2 text-xs font-medium text-coral hover:text-coral-dark underline underline-offset-2"
                      >
                        Try again
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Session limit message */}
              {atSessionLimit && streamState === 'idle' && (
                <div className="px-4 py-3 bg-warm-100 rounded-xl text-sm text-warm-600 border border-warm-200">
                  <p>You&apos;ve reached the message limit for this session.</p>
                  <Link
                    href="/#contact"
                    className="mt-1 inline-block text-coral font-medium hover:text-coral-dark underline underline-offset-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Reach out to Dominik directly
                  </Link>
                </div>
              )}

              {/* Contact CTA after 3+ exchanges */}
              {showContactCTA && !atSessionLimit && streamState === 'idle' && messages[messages.length - 1]?.role === 'model' && (
                <div className="text-center">
                  <Link
                    href="/#contact"
                    className="inline-block text-xs text-warm-500 hover:text-coral transition-colors underline underline-offset-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Want to discuss further? Contact Dominik
                  </Link>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="px-3 py-3 border-t border-warm-200 bg-warm-50 shrink-0">
              <div className="flex items-end gap-2">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={atSessionLimit ? 'Message limit reached' : 'Ask about Dominik...'}
                  disabled={atSessionLimit || streamState === 'streaming'}
                  rows={1}
                  className="flex-1 resize-none px-3 py-2 bg-white border border-warm-200 rounded-xl text-sm text-warm-800 placeholder:text-warm-400 focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral/20 disabled:opacity-50 disabled:cursor-not-allowed max-h-24 overflow-y-auto"
                />
                <button
                  onClick={handleSubmit}
                  disabled={!input.trim() || atSessionLimit || streamState === 'streaming'}
                  className="shrink-0 p-2.5 bg-coral text-white rounded-xl hover:bg-coral-dark disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  aria-label="Send message"
                >
                  <SendIcon />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
