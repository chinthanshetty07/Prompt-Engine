// Vercel serverless version of POST /api/optimize.
// The Express backend in /backend is for local development; on Vercel only the
// frontend folder is deployed, so this function provides the same endpoint.
// It shares the coding rules with the backend so both behave the same.
import { CODING_DOMAIN, isCodingPrompt, getCodingSystemPrompt } from '../../backend/config/codingPrinciples.js'

const BASE_URL = (process.env.GROQ_API_BASE_URL || 'https://api.groq.com/openai/v1').replace(/\/$/, '')
const MODEL = process.env.GROQ_MODEL || 'openai/gpt-oss-120b'

function getApiKey() {
  const key = (process.env.GROQ_API_KEY || process.env.GROK_API_KEY || '').trim()
  if (!key || /^your_.*_here$/.test(key)) return null
  return key
}

function mockResult(prompt) {
  const optimizedPrompt = `Act as a senior software engineer. ${prompt.trim()}\n\nInclude the relevant context, assumptions, constraints, implementation details, error handling, security considerations, testing strategy, and acceptance criteria.`
  return {
    optimizedPrompt,
    tokens: { original: Math.ceil(prompt.length / 4), optimized: Math.ceil(optimizedPrompt.length / 4) },
    model: 'mock-coding-optimizer',
    isMockResponse: true
  }
}

async function groqResult(prompt, apiKey) {
  const response = await fetch(`${BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: getCodingSystemPrompt() },
        { role: 'user', content: `Optimize this prompt for better AI understanding:\n\n"${prompt}"\n\nProvide only the optimized prompt without any explanation.` }
      ],
      temperature: 0.7,
      max_completion_tokens: 4000,
      top_p: 1
    }),
    signal: AbortSignal.timeout(30000)
  })

  if (!response.ok) {
    const reason = response.status === 401
      ? 'the Groq API key was rejected (check GROQ_API_KEY in Vercel settings)'
      : `Groq API returned status ${response.status}`
    throw new Error(`Failed to optimize prompt: ${reason}`)
  }

  const data = await response.json()
  const optimizedPrompt = (data.choices?.[0]?.message?.content || '').trim()
  if (!optimizedPrompt) throw new Error('Failed to optimize prompt: the AI model returned an empty response')

  return {
    optimizedPrompt,
    tokens: { original: data.usage?.prompt_tokens || 0, optimized: data.usage?.completion_tokens || 0 },
    model: MODEL,
    isMockResponse: false
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }

  const prompt = req.body?.prompt
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ success: false, error: 'Prompt is required and must be a string' })
  }
  if (prompt.trim().length === 0) {
    return res.status(400).json({ success: false, error: 'Prompt cannot be empty' })
  }
  if (prompt.length > 10000) {
    return res.status(400).json({ success: false, error: 'Prompt exceeds maximum length of 10000 characters' })
  }
  if (!isCodingPrompt(prompt)) {
    return res.status(422).json({
      success: false,
      error: 'Only coding, software engineering, and technical implementation prompts are supported.'
    })
  }

  try {
    const apiKey = getApiKey()
    const result = apiKey ? await groqResult(prompt, apiKey) : mockResult(prompt)
    return res.status(200).json({
      success: true,
      _id: null,
      originalPrompt: prompt,
      domain: CODING_DOMAIN,
      detectedDomains: [CODING_DOMAIN],
      createdAt: new Date().toISOString(),
      historySaved: false,
      ...result
    })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ success: false, error: error.message })
  }
}
