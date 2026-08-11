import Prompt from '../models/Prompt.js'

class DatabaseService {
  async createPrompt(data) {
    try {
      const prompt = new Prompt({
        originalPrompt: data.originalPrompt,
        optimizedPrompt: data.optimizedPrompt,
        domain: data.domain || 'other',
        detectedDomains: data.detectedDomains || [],
        confidence: data.confidence || 0,
        tokens: data.tokens || {},
        metadata: data.metadata || {}
      })

      await prompt.save()
      return prompt
    } catch (error) {
      throw new Error(`Failed to create prompt: ${error.message}`)
    }
  }

  async getHistory(limit = 50, skip = 0) {
    try {
      const prompts = await Prompt.find()
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(skip)
        .lean()

      const total = await Prompt.countDocuments()

      return {
        prompts,
        total,
        limit,
        skip,
        hasMore: skip + limit < total
      }
    } catch (error) {
      throw new Error(`Failed to fetch history: ${error.message}`)
    }
  }

  async getPromptById(id) {
    try {
      const prompt = await Prompt.findById(id).lean()
      if (!prompt) {
        throw new Error('Prompt not found')
      }
      return prompt
    } catch (error) {
      throw new Error(`Failed to fetch prompt: ${error.message}`)
    }
  }

  async deletePrompt(id) {
    try {
      const result = await Prompt.findByIdAndDelete(id)
      if (!result) {
        throw new Error('Prompt not found')
      }
      return result
    } catch (error) {
      throw new Error(`Failed to delete prompt: ${error.message}`)
    }
  }

  async updatePrompt(id, data) {
    try {
      const prompt = await Prompt.findByIdAndUpdate(
        id,
        {
          $set: data
        },
        { new: true, runValidators: true }
      )

      if (!prompt) {
        throw new Error('Prompt not found')
      }
      return prompt
    } catch (error) {
      throw new Error(`Failed to update prompt: ${error.message}`)
    }
  }

  async searchPrompts(query, limit = 50) {
    try {
      const prompts = await Prompt.find({
        $or: [
          { originalPrompt: { $regex: query, $options: 'i' } },
          { optimizedPrompt: { $regex: query, $options: 'i' } },
          { detectedDomains: { $regex: query, $options: 'i' } }
        ]
      })
        .sort({ createdAt: -1 })
        .limit(limit)
        .lean()

      return prompts
    } catch (error) {
      throw new Error(`Failed to search prompts: ${error.message}`)
    }
  }

  async getStatistics() {
    try {
      const total = await Prompt.countDocuments()
      const byDomain = await Prompt.aggregate([
        {
          $group: {
            _id: '$domain',
            count: { $sum: 1 }
          }
        }
      ])

      const totalTokens = await Prompt.aggregate([
        {
          $group: {
            _id: null,
            totalPromptTokens: { $sum: '$tokens.original' },
            totalOptimizedTokens: { $sum: '$tokens.optimized' }
          }
        }
      ])

      return {
        total,
        byDomain,
        tokens: totalTokens[0] || { totalPromptTokens: 0, totalOptimizedTokens: 0 }
      }
    } catch (error) {
      throw new Error(`Failed to fetch statistics: ${error.message}`)
    }
  }
}

export default new DatabaseService()
