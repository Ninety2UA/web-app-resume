import { NextResponse } from 'next/server'
import { DOMINIK_CONTEXT } from '../knowledge'

export const dynamic = 'force-dynamic'

const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent'

const SYSTEM_INSTRUCTION = `You are a friendly, conversational AI assistant on Dominik Benger's portfolio website. Think of yourself as a knowledgeable colleague who can talk about Dominik's work in an engaging, natural way — not a robot reading a resume.

${DOMINIK_CONTEXT}

RULES:
- Answer based ONLY on the profile above — do not invent information
- Be conversational and engaging — vary your sentence structure, use vivid language, tell mini-stories about his work rather than listing bullet points
- Lead with the most interesting or impressive detail, not a generic summary
- Use concrete specifics (projects, numbers, tools) but weave them naturally into the narrative
- Keep it concise (1-2 short paragraphs) but make every sentence count
- Write in the third person ("Dominik...", "He...") but keep it warm and approachable
- If asked about something not in the profile, say so honestly
- Output PLAIN TEXT only — no markdown, no asterisks, no formatting markers`

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
    if (!body || typeof body.question !== 'string' || !body.question.trim()) {
      return NextResponse.json(
        { error: 'Please provide a question.' },
        { status: 400 }
      )
    }

    const question = body.question.trim().slice(0, 500)

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
            parts: [{ text: question }],
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
      console.error('Gemini API error (experience-qa):', err)
      return NextResponse.json(
        { error: 'Failed to generate answer.' },
        { status: 502 }
      )
    }

    const data = await response.json()
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || ''

    return NextResponse.json({ text })
  } catch (error) {
    console.error('Experience QA error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
