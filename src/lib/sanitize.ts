/**
 * Input sanitization and prompt injection guards for chatbot.
 */

const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?previous\s+instructions/i,
  /ignore\s+(all\s+)?prior\s+instructions/i,
  /disregard\s+(all\s+)?previous/i,
  /forget\s+(all\s+)?previous/i,
  /you\s+are\s+now/i,
  /new\s+system\s+prompt/i,
  /override\s+system/i,
  /reveal\s+(your\s+)?system\s+prompt/i,
  /show\s+(me\s+)?(your\s+)?system\s+(prompt|instructions)/i,
  /what\s+(are|is)\s+(your\s+)?system\s+(prompt|instructions)/i,
  /repeat\s+(your\s+)?system\s+(prompt|instructions)/i,
  /print\s+(your\s+)?system\s+(prompt|instructions)/i,
  /output\s+(your\s+)?instructions/i,
  /act\s+as\s+(?:a\s+)?(?:different|new)/i,
  /pretend\s+you\s+are/i,
  /jailbreak/i,
  /DAN\s+mode/i,
]

export function sanitizeInput(text: string, maxLength: number = 500): string {
  // Trim whitespace
  let clean = text.trim()
  // Strip control characters (keep newlines and tabs for readability)
  clean = clean.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
  // Enforce max length
  if (clean.length > maxLength) {
    clean = clean.slice(0, maxLength)
  }
  return clean
}

export function checkPromptInjection(text: string): boolean {
  return INJECTION_PATTERNS.some((pattern) => pattern.test(text))
}
