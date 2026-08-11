import axios from 'axios'

class GrokService {
  constructor() {
    this.baseURL = process.env.GROK_API_BASE_URL || 'https://api.groq.com/openai/v1'
    this.model = 'llama-3.3-70b-versatile'  // Latest available Groq model
  }

  getApiKey() {
    return process.env.GROK_API_KEY
  }

  async optimizePrompt(prompt, domain = null) {
    const apiKey = this.getApiKey()
    if (!apiKey) {
      console.warn('⚠️ GROK_API_KEY not set, returning mock response')
      return this.getMockResponse(prompt)
    }

    try {
      const systemPrompt = this.getSystemPrompt(domain)
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

  getSystemPrompt(domain) {
    const basePrompt = `You are an expert prompt optimizer that helps users create better prompts for AI models.
Your task is to:
1. Analyze the user's prompt for clarity and structure
2. Remove ambiguities and add specificity
3. Improve the prompt to get better AI responses
4. Consider the domain context
5. Keep the original intent while enhancing the wording`

    if (domain === 'fitness') {
      return `${basePrompt}\n\nDomain: FITNESS & HEALTH\nFocus on exercise routines, nutrition, wellness metrics, and health optimization.`
    } else if (domain === 'finance') {
      return `${basePrompt}\n\nDomain: FINANCE & INVESTING\nFocus on financial planning, investments, budgeting, and economic analysis.`
    } else if (domain === 'software_engineering') {
      return `${basePrompt}\n\nDomain: SOFTWARE ENGINEERING\nFocus on coding, architecture, debugging, and technical implementation.`
    }

    return basePrompt
  }

  getMockResponse(prompt) {
    // Fallback when API key is not available
    const mockOptimizations = {
      'fitness': `You are a fitness coach. Provide a detailed ${prompt.length > 50 ? 'comprehensive' : 'quick'} workout plan with specific exercises, sets, reps, and rest periods tailored to my fitness level and goals.`,
      'finance': `As a financial advisor, analyze my ${prompt.length > 50 ? 'financial situation' : 'budget'} and provide specific, actionable investment recommendations with risk assessment.`,
      'software_engineering': `Help me ${prompt.length > 50 ? 'architect and implement' : 'build'} a solution that includes: clear requirements, code structure, error handling, and testing strategy.`
    }

    // Simple domain detection
    let detectedDomain = 'other'
    const lowerPrompt = prompt.toLowerCase()
    if (lowerPrompt.includes('exercise') || lowerPrompt.includes('workout') || lowerPrompt.includes('fitness')) {
      detectedDomain = 'fitness'
    } else if (lowerPrompt.includes('invest') || lowerPrompt.includes('budget') || lowerPrompt.includes('money')) {
      detectedDomain = 'finance'
    } else if (lowerPrompt.includes('code') || lowerPrompt.includes('build') || lowerPrompt.includes('api')) {
      detectedDomain = 'software_engineering'
    }

    const optimizedPrompt = mockOptimizations[detectedDomain] ||
      `Please elaborate on your request with: specific goals, constraints, current state, desired outcome, and any relevant context. This will help generate a more accurate and useful response.`

    return {
      success: true,
      optimizedPrompt,
      tokensUsed: {
        prompt_tokens: Math.ceil(prompt.length / 4),
        completion_tokens: Math.ceil(optimizedPrompt.length / 4),
        total_tokens: Math.ceil((prompt.length + optimizedPrompt.length) / 4)
      },
      model: 'mock-grok',
      isMockResponse: true
    }
  }

  async detectDomain(prompt) {
    const domains = ['fitness', 'finance', 'software_engineering']
    const lowerPrompt = prompt.toLowerCase()
    const detectedDomains = []

    const keywordMap = {
      fitness: ['workout', 'exercise', 'fitness', 'diet', 'nutrition', 'gym', 'training', 'health', 'calories'],
      finance: ['invest', 'budget', 'money', 'finance', 'stock', 'portfolio', 'savings', 'loan', 'tax'],
      software_engineering: ['code', 'build', 'api', 'database', 'backend', 'frontend', 'deploy', 'algorithm', 'function']
    }

    for (const [domain, keywords] of Object.entries(keywordMap)) {
      if (keywords.some(kw => lowerPrompt.includes(kw))) {
        detectedDomains.push(domain)
      }
    }

    return detectedDomains.length > 0 ? detectedDomains : ['other']
  }
}

export default new GrokService()
