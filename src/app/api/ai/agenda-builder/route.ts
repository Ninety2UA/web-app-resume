import { NextResponse } from 'next/server'
import { DOMINIK_CONTEXT } from '../knowledge'

export const dynamic = 'force-dynamic'

const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent'

function stripCodeFences(text: string): string {
  return text
    .replace(/```html\s*/gi, '')
    .replace(/```\s*/g, '')
    .trim()
}

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
    if (!body || typeof body.topic !== 'string' || !body.topic.trim()) {
      return NextResponse.json(
        { error: 'Please provide a topic for the call.' },
        { status: 400 }
      )
    }

    const topic = body.topic.trim().slice(0, 500)

    const systemInstruction = `You are helping prepare a sharp, high-value 30-minute discovery call between a potential client and Dominik Benger. The agenda should make the caller think "this person really understands my problem."

${DOMINIK_CONTEXT}

TASK: Generate a 3-point agenda for a 30-minute discovery call about: "${topic}"

RULES:
- Each point ~10 minutes, with a clear time block label
- Each point must connect the caller's topic to SPECIFIC experience from Dominik's profile — name real projects, tools, metrics, or achievements he brings to the table
- Write descriptions that are vivid and concrete, not corporate filler — the caller should feel like the call will be genuinely useful
- Use active, engaging language
- Format strictly as HTML: <ol class="list-decimal pl-4 space-y-3"><li><strong>[Time Block]:</strong> [Description]</li></ol>
- Only output the HTML, nothing else`

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
            parts: [{ text: `Topic: ${topic}` }],
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
      console.error('Gemini API error (agenda-builder):', err)
      return NextResponse.json(
        { error: 'Failed to generate agenda.' },
        { status: 502 }
      )
    }

    const data = await response.json()
    const rawText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || ''
    const text = stripCodeFences(rawText)

    return NextResponse.json({ text })
  } catch (error) {
    console.error('Agenda builder error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
