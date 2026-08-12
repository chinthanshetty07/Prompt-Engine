export const CODING_DOMAIN = 'software_engineering'

export const CODING_PRINCIPLES = [
  'Preserve the user’s technical intent; do not invent requirements, APIs, dependencies, or runtime behavior.',
  'Prefer clear, maintainable, idiomatic, and production-ready solutions over clever or unnecessarily complex ones.',
  'State assumptions, supported versions, constraints, and trade-offs when they affect the implementation.',
  'Design for correctness, security, reliability, observability, and reasonable performance.',
  'Include input validation, error handling, edge cases, and safe failure behavior where relevant.',
  'Favor modular architecture, separation of concerns, and interfaces that are easy to test and extend.',
  'When code is requested, provide complete relevant code with consistent naming and explain integration points briefly.',
  'Recommend tests for the main path, failure paths, and important boundary conditions.',
  'Never claim code was executed, tested, or verified unless that actually happened.',
  'If the request is ambiguous, identify the ambiguity and make the smallest reasonable assumption.'
]

const CODING_SIGNALS = [
  /\b(code|coding|program|programming|software|application|app|website|web app)\b/i,
  /\b(api|sdk|cli|database|sql|query|schema|backend|frontend|full[- ]stack)\b/i,
  /\b(debug|debugging|bug|error|exception|stack trace|refactor|compile|runtime)\b/i,
  /\b(function|method|class|component|module|package|library|framework|algorithm|data structure)\b/i,
  /\b(react|next\.js|node\.js|express|python|java|javascript|typescript|go|rust|c\+\+|c#|swift|kotlin|php|ruby|\.net)\b/i,
  /\b(git|github|docker|kubernetes|ci\/cd|devops|deploy|deployment|cloud|microservice|architecture)\b/i,
  /\b(unit test|integration test|end[- ]to[- ]end test|test suite|automate|automation)\b/i,
  /\b(implement|build|create|design|develop|write)\b.*\b(code|api|app|software|service|feature|function|database|website)\b/i
]

const NON_CODING_SIGNALS = [
  /\b(workout|exercise|fitness|diet|nutrition|recipe|travel|vacation|relationship|dating)\b/i,
  /\b(invest|investment|stock|portfolio|loan|mortgage|tax advice|financial advice)\b/i,
  /\b(poem|poetry|song|lyrics|story|fiction|joke| horoscope|meditation)\b/i
]

export function isCodingPrompt(prompt) {
  const hasCodingSignal = CODING_SIGNALS.some((pattern) => pattern.test(prompt))
  const hasNonCodingSignal = NON_CODING_SIGNALS.some((pattern) => pattern.test(prompt))

  return hasCodingSignal && !hasNonCodingSignal
}

export function getCodingSystemPrompt() {
  return [
    'You are a senior software engineer and expert prompt optimizer.',
    'This system exclusively handles coding, software engineering, and technical implementation prompts.',
    '',
    'Rewrite the user prompt so another AI can produce an accurate, actionable technical response.',
    'Preserve the original intent and add only useful technical specificity.',
    '',
    'Follow these engineering principles:',
    ...CODING_PRINCIPLES.map((principle, index) => `${index + 1}. ${principle}`),
    '',
    'When relevant, make the optimized prompt request: context, objective, inputs and outputs, constraints, environment and versions, architecture, implementation details, security considerations, error handling, testing, and acceptance criteria.',
    'Return only the optimized prompt. Do not provide commentary about the optimization.'
  ].join('\n')
}
