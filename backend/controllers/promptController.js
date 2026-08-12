import grokService from '../services/grokService.js'
import dbService from '../services/dbService.js'
import { CODING_DOMAIN, isCodingPrompt } from '../config/codingPrinciples.js'

export const optimizePrompt = async (req, res, next) => {
  try {
    const { prompt } = req.body

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Prompt is required and must be a string'
      })
    }

    if (prompt.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Prompt cannot be empty'
      })
    }

    if (prompt.length > 10000) {
      return res.status(400).json({
        success: false,
        error: 'Prompt exceeds maximum length of 10000 characters'
      })
    }

    if (!isCodingPrompt(prompt)) {
      return res.status(422).json({
        success: false,
        error: 'Only coding, software engineering, and technical implementation prompts are supported.'
      })
    }

    // The product is intentionally coding-only; every accepted prompt has one domain.
    const detectedDomains = await grokService.detectDomain(prompt)
    const selectedDomain = CODING_DOMAIN

    // Optimize prompt using Grok
    const grokResult = await grokService.optimizePrompt(prompt)

    if (!grokResult.success) {
      return res.status(500).json({
        success: false,
        error: 'Failed to optimize prompt'
      })
    }

    // Save to database
    const savedPrompt = await dbService.createPrompt({
      originalPrompt: prompt,
      optimizedPrompt: grokResult.optimizedPrompt,
      domain: selectedDomain,
      detectedDomains,
      confidence: 1,
      tokens: {
        original: grokResult.tokensUsed.prompt_tokens || 0,
        optimized: grokResult.tokensUsed.completion_tokens || 0
      },
      metadata: {
        userAgent: req.headers['user-agent'],
        ipAddress: req.ip,
        language: req.headers['accept-language']?.split(',')[0] || 'en'
      }
    })

    res.status(200).json({
      success: true,
      _id: savedPrompt._id,
      originalPrompt: savedPrompt.originalPrompt,
      optimizedPrompt: savedPrompt.optimizedPrompt,
      domain: savedPrompt.domain,
      detectedDomains: savedPrompt.detectedDomains,
      tokens: savedPrompt.tokens,
      createdAt: savedPrompt.createdAt,
      isMockResponse: grokResult.isMockResponse || false
    })
  } catch (error) {
    next(error)
  }
}

export const getHistory = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 50
    const skip = parseInt(req.query.skip) || 0

    const history = await dbService.getHistory(limit, skip)

    res.status(200).json({
      success: true,
      ...history
    })
  } catch (error) {
    next(error)
  }
}

export const getPromptById = async (req, res, next) => {
  try {
    const { id } = req.params

    const prompt = await dbService.getPromptById(id)

    res.status(200).json({
      success: true,
      data: prompt
    })
  } catch (error) {
    next(error)
  }
}

export const deletePrompt = async (req, res, next) => {
  try {
    const { id } = req.params

    await dbService.deletePrompt(id)

    res.status(200).json({
      success: true,
      message: 'Prompt deleted successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const searchPrompts = async (req, res, next) => {
  try {
    const { q } = req.query

    if (!q) {
      return res.status(400).json({
        success: false,
        error: 'Search query is required'
      })
    }

    const results = await dbService.searchPrompts(q)

    res.status(200).json({
      success: true,
      results,
      count: results.length
    })
  } catch (error) {
    next(error)
  }
}

export const getStatistics = async (req, res, next) => {
  try {
    const stats = await dbService.getStatistics()

    res.status(200).json({
      success: true,
      data: stats
    })
  } catch (error) {
    next(error)
  }
}
