import axios from 'axios'
import { CODING_DOMAIN, getCodingSystemPrompt } from '../config/codingPrinciples.js'

class GrokService {
  constructor() {
    this.baseURL = process.env.GROK_API_BASE_URL || 'https://api.groq.com/openai/v1'
    this.model = 'llama-3.3-70b-versatile'  // Latest available Groq model
  }

  getApiKey() {
    return process.env.GROK_API_KEY
  }

  async optimizePrompt(prompt) {
    const apiKey = this.getApiKey()
    if (!apiKey) {
      console.warn('⚠️ GROK_API_KEY not set, returning mock response')
      return this.getMockResponse(prompt)
    }

    try {
      const systemPrompt = getCodingSystemPrompt()
      const userMessage = `Optimize this prompt for better AI understanding:\n\n"${prompt}"\n\nProvide only the optimized prompt without any explanation.`

      const response = await axios.post(
        `${this.baseURL}/chat/completions`,
        {
          model: this.model,
          messages: [
            {
              role: 'system',
              content: systemPrompt
            },
            {
              role: 'user',
              content: userMessage
            }
          ],
          temperature: 0.7,
          max_tokens: 1000,
          top_p: 1
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          },
          timeout: 30000
        }
      )

      const optimizedPrompt = response.data.choices[0].message.content.trim()
      const tokensUsed = response.data.usage

      return {
        success: true,
        optimizedPrompt,
        tokensUsed,
        model: this.model
      }
    } catch (error) {
      console.error('Grok API Error:', error.message)
      if (error.response) {
        console.error('Response status:', error.response.status)
        console.error('Response data:', error.response.data)
      }
      throw new Error(`Failed to optimize prompt: ${error.message}`)
    }
  }

  getMockResponse(prompt) {
    const optimizedPrompt = `Act as a senior software engineer. ${prompt.trim()}\n\nInclude the relevant context, assumptions, constraints, implementation details, error handling, security considerations, testing strategy, and acceptance criteria.`

    return {
      success: true,
      optimizedPrompt,
      tokensUsed: {
        prompt_tokens: Math.ceil(prompt.length / 4),
        completion_tokens: Math.ceil(optimizedPrompt.length / 4),
        total_tokens: Math.ceil((prompt.length + optimizedPrompt.length) / 4)
      },
      model: 'mock-coding-optimizer',
      isMockResponse: true
    }
  }

  async detectDomain(prompt) {
    return [CODING_DOMAIN]
  }
}

export default new GrokService()
