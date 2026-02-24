import { NextResponse } from 'next/server'
import { DOMINIK_CONTEXT } from '../knowledge'

export const dynamic = 'force-dynamic'

const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent'

const VALID_TYPES = ['email', 'linkedin'] as const
const VALID_TONES = ['professional', 'casual', 'direct'] as const

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey || apiKey === 'your-key-here') {
      return NextResponse.json(
        { error: 'AI service is temporarily unavailable.' },
        { status: 500 }
      )
    }

    const body = await request.json().catch(() => null)
    if (
      !body ||
      typeof body.intent !== 'string' ||
      !body.intent.trim() ||
      !VALID_TYPES.includes(body.type) ||
      !VALID_TONES.includes(body.tone)
    ) {
      return NextResponse.json(
        { error: 'Please provide intent, type (email|linkedin), and tone (professional|casual|direct).' },
        { status: 400 }
      )
    }

    const intent = body.intent.trim().slice(0, 500)
    const type = body.type as (typeof VALID_TYPES)[number]
    const tone = body.tone as (typeof VALID_TONES)[number]

    const formatRules =
      type === 'linkedin'
        ? 'Format it as a LinkedIn connection note (MAXIMUM 290 CHARACTERS). Be very concise.'
        : 'Format it as a standard email body (no subject line). Keep it under 150 words.'

    const systemInstruction = `You are a skilled copywriter helping someone draft an outreach message to Dominik Benger. Write something that sounds human, warm, and specific — like one professional reaching out to another they genuinely respect.

${DOMINIK_CONTEXT}

TASK: Draft a ${tone} ${type === 'linkedin' ? 'LinkedIn connection note' : 'email'} to Dominik based on the user's intent.

STRUCTURE (for emails):
1. Greeting line: "Hi Dominik," or "Dear Dominik,"
2. Opening paragraph: a specific hook referencing his background relevant to the intent
3. Body: what the sender needs and why Dominik is the right person
4. Closing line: clear call-to-action (e.g., "Would you be open to a quick call?")
5. Professional sign-off: "Best regards," or "Kind regards," followed by a new line with [Your Name]

RULES:
- Keep the tone natural and ${tone}, not corporate or stiff
- Reference specific projects, tools, or achievements from Dominik's profile that match the intent
- ${formatRules}
- Output PLAIN TEXT only — no markdown, no asterisks, no formatting markers`

    const response = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: systemInstruction }],
        },
        contents: [
          {
            role: 'user',
            parts: [{ text: `Intent: ${intent}` }],
          },
        ],
        generationConfig: {
          temperature: 0.6,
          maxOutputTokens: 1024,
          thinkingConfig: { thinkingBudget: 128 },
        },
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('Gemini API error (outreach-drafter):', err)
      return NextResponse.json(
        { error: 'Failed to generate draft.' },
        { status: 502 }
      )
    }

    const data = await response.json()
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || ''

    return NextResponse.json({ text })
  } catch (error) {
    console.error('Outreach drafter error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
