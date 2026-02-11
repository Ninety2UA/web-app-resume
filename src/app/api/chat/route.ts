import { GoogleGenerativeAI } from '@google/generative-ai'
import { SYSTEM_PROMPT, CHAT_CONFIG } from '@/data/chatbot-knowledge'
import { sanitizeInput, checkPromptInjection } from '@/lib/sanitize'

export const dynamic = 'force-dynamic'

// In-memory rate limiting (resets on cold start — acceptable for portfolio site)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 24 * 60 * 60 * 1000 })
    return true
  }
  if (entry.count >= CHAT_CONFIG.maxDailyRequests) {
    return false
  }
  entry.count++
  return true
}

function getClientIp(request: Request): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
}

// Simple hash for logging (don't log raw IPs)
function hashIp(ip: string): string {
  let hash = 0
  for (let i = 0; i < ip.length; i++) {
    hash = ((hash << 5) - hash + ip.charCodeAt(i)) | 0
  }
  return Math.abs(hash).toString(36)
}

// Strip accidental system prompt leakage from model output
function sanitizeOutput(text: string): string {
  const leakagePatterns = [
    /## Knowledge Base[\s\S]*/i,
    /## Rules[\s\S]*?(?=##|$)/i,
    /SYSTEM_PROMPT/gi,
    /KNOWLEDGE_BASE/gi,
  ]
  let clean = text
  for (const pattern of leakagePatterns) {
    clean = clean.replace(pattern, '')
  }
  return clean.trim()
}

interface ChatMessage {
  role: 'user' | 'model'
  text: string
}

export async function POST(request: Request) {
  const startTime = Date.now()
  const ip = getClientIp(request)
  const ipHash = hashIp(ip)

  try {
    // Parse body
    const body = await request.json().catch(() => null)
    if (!body || typeof body.message !== 'string' || !Array.isArray(body.history)) {
      return Response.json({ error: 'Invalid request body' }, { status: 400 })
    }

    const { message, history, sessionId } = body as {
      message: string
      history: ChatMessage[]
      sessionId: string
    }

    // Sanitize input
    const cleanMessage = sanitizeInput(message, CHAT_CONFIG.maxInputLength)
    if (!cleanMessage) {
      return Response.json({ error: 'Message cannot be empty' }, { status: 400 })
    }

    // Prompt injection check
    if (checkPromptInjection(cleanMessage)) {
      console.log(JSON.stringify({
        _source: 'chat', type: 'blocked', sessionId, ipHash, reason: 'injection',
      }))
      return Response.json(
        { error: "I'm here to help you learn about Dominik's background and services!" },
        { status: 400 }
      )
    }

    // Session limit check
    if (history.length >= CHAT_CONFIG.maxSessionMessages) {
      return Response.json(
        { error: 'Session message limit reached. Feel free to reach out to Dominik directly at domi@dbenger.com!' },
        { status: 429 }
      )
    }

    // Rate limit check
    if (!checkRateLimit(ip)) {
      console.log(JSON.stringify({
        _source: 'chat', type: 'rate_limit', ipHash, limitType: 'daily',
      }))
      return Response.json(
        { error: 'Too many messages today. Please try again tomorrow, or reach out directly at domi@dbenger.com.' },
        { status: 429 }
      )
    }

    // Validate API key
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey || apiKey === 'your-key-here') {
      console.error(JSON.stringify({
        _source: 'chat', type: 'error', sessionId, error: 'Missing GEMINI_API_KEY',
      }))
      return Response.json(
        { error: 'Chat is temporarily unavailable. Please reach out to Dominik directly at domi@dbenger.com.' },
        { status: 500 }
      )
    }

    // Build Gemini request
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({
      model: CHAT_CONFIG.model,
      systemInstruction: SYSTEM_PROMPT,
    })

    // Convert history to Gemini format
    const geminiHistory = history.map((msg: ChatMessage) => ({
      role: msg.role === 'user' ? 'user' as const : 'model' as const,
      parts: [{ text: msg.text }],
    }))

    const chat = model.startChat({ history: geminiHistory })

    // Stream response
    const result = await chat.sendMessageStream(cleanMessage)

    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text()
            if (text) {
              const sanitized = sanitizeOutput(text)
              if (sanitized) {
                controller.enqueue(
                  encoder.encode(`data: ${JSON.stringify({ text: sanitized })}\n\n`)
                )
              }
            }
          }
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true })}\n\n`))

          const responseTimeMs = Date.now() - startTime
          console.log(JSON.stringify({
            _source: 'chat', type: 'message', sessionId, ipHash,
            messageLength: cleanMessage.length, responseTimeMs,
          }))
        } catch (streamError) {
          console.error(JSON.stringify({
            _source: 'chat', type: 'error', sessionId, error: String(streamError),
          }))
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ error: 'Stream interrupted. Please try again.' })}\n\n`)
          )
        } finally {
          controller.close()
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (error) {
    console.error(JSON.stringify({
      _source: 'chat', type: 'error', ipHash, error: String(error),
    }))

    const isQuotaError = String(error).includes('quota') || String(error).includes('429')
    if (isQuotaError) {
      return Response.json(
        { error: 'Chat is experiencing high demand. Please try again later or email domi@dbenger.com.' },
        { status: 429 }
      )
    }

    return Response.json(
      { error: 'Something went wrong. Please try again or reach out to Dominik at domi@dbenger.com.' },
      { status: 500 }
    )
  }
}
