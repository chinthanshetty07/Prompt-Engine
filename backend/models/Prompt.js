import mongoose from 'mongoose'

const promptSchema = new mongoose.Schema(
  {
    originalPrompt: {
      type: String,
      required: true,
      trim: true,
      maxlength: 10000
    },
    optimizedPrompt: {
      type: String,
      required: true,
      trim: true,
      maxlength: 10000
    },
    domain: {
      type: String,
      enum: ['software_engineering'],
      default: 'software_engineering'
    },
    detectedDomains: [{
      type: String,
      trim: true
    }],
    confidence: {
      type: Number,
      min: 0,
      max: 1,
      default: 0
    },
    tokens: {
      original: {
        type: Number,
        default: 0
      },
      optimized: {
        type: Number,
        default: 0
      }
    },
    metadata: {
      userAgent: String,
      ipAddress: String,
      language: {
        type: String,
        default: 'en'
      }
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model('Prompt', promptSchema)
