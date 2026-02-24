import { NextResponse } from 'next/server'
import { DOMINIK_CONTEXT } from '../knowledge'

export const dynamic = 'force-dynamic'

const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent'

const SYSTEM_INSTRUCTION = `You are the AI assistant on Dominik Benger's portfolio site. Your job is to show visitors exactly how Dominik can solve their specific problem — with a plan that feels tailor-made, not templated.

${DOMINIK_CONTEXT}

TASK: Based on the user's business challenge, generate a compelling 3-step action plan showing how Dominik can help.

RULES:
- Each step must reference SPECIFIC experience from Dominik's profile — real projects, tools, and results (e.g., his SKAN Reporting Pack, the BI platform with 3,000+ users, his 40% YoY growth track record)
- Be concrete: name deliverables, tools, and methodologies — not vague promises
- Write with confidence and energy — this is a pitch, not a report
- Match the plan to the challenge: app marketing → App Campaigns work, analytics → BigQuery/Looker, AI → Gemini integration, growth → export scaling
- Format as clean HTML using only <p>, <ul>, <li>, <strong>, and <ol> tags. No markdown backticks.`

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
    if (!body || typeof body.challenge !== 'string' || !body.challenge.trim()) {
      return NextResponse.json(
        { error: 'Please provide a challenge description.' },
        { status: 400 }
      )
    }

    const challenge = body.challenge.trim().slice(0, 1000)

    const response = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: SYSTEM_INSTRUCTION }],
        },
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `The user has a business/data challenge: "${challenge}".`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
          thinkingConfig: { thinkingBudget: 128 },
        },
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('Gemini API error (solution-matcher):', err)
      return NextResponse.json(
        { error: 'Failed to generate solution.' },
        { status: 502 }
      )
    }

    const data = await response.json()
    const rawText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || ''
    const text = stripCodeFences(rawText)

    return NextResponse.json({ text })
  } catch (error) {
    console.error('Solution matcher error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
