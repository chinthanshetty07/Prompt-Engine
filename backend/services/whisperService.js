import axios from 'axios'
import FormData from 'form-data'
import fs from 'fs'
import path from 'path'

class WhisperService {
  constructor() {
    this.apiUrl = 'https://api.openai.com/v1/audio/transcriptions'
    this.model = 'whisper-1'
  }

  getApiKey() {
    return process.env.WHISPER_API_KEY
  }

  async transcribeAudio(audioBuffer, audioFormat = 'webm') {
    const apiKey = this.getApiKey()
    if (!apiKey) {
      console.warn('⚠️ WHISPER_API_KEY not set')
      return this.getMockTranscription()
    }

    try {
      const form = new FormData()
      form.append('file', audioBuffer, `audio.${audioFormat}`)
      form.append('model', this.model)
      form.append('language', 'en')
      form.append('temperature', '0')

      const response = await axios.post(this.apiUrl, form, {
        headers: {
          ...form.getHeaders(),
          'Authorization': `Bearer ${apiKey}`
        },
        timeout: 60000
      })

      return {
        success: true,
        text: response.data.text,
        language: response.data.language || 'en',
        duration: response.data.duration || null
      }
    } catch (error) {
      console.error('Whisper API Error:', error.message)
      throw new Error(`Failed to transcribe audio: ${error.message}`)
    }
  }

  async transcribeFromFile(filePath) {
    const apiKey = this.getApiKey()
    if (!apiKey) {
      return this.getMockTranscription()
    }

    try {
      const audioStream = fs.createReadStream(filePath)
      const form = new FormData()
      form.append('file', audioStream)
      form.append('model', this.model)
      form.append('language', 'en')
      form.append('temperature', '0')

      const response = await axios.post(this.apiUrl, form, {
        headers: {
          ...form.getHeaders(),
          'Authorization': `Bearer ${apiKey}`
        },
        timeout: 60000
      })

      return {
        success: true,
        text: response.data.text,
        language: response.data.language || 'en'
      }
    } catch (error) {
      console.error('Whisper API Error:', error.message)
      throw new Error(`Failed to transcribe audio: ${error.message}`)
    }
  }

  getMockTranscription() {
    // Mock transcriptions for testing without API key
    const mockTranscriptions = [
      'Create a comprehensive workout plan for beginners with proper form and recovery',
      'What are the best investment strategies for long-term wealth building',
      'Help me optimize this database query for better performance',
      'Design a scalable microservices architecture for our application',
      'Show me exercises to strengthen my core and improve posture'
    ]

    const randomIndex = Math.floor(Math.random() * mockTranscriptions.length)

    return {
      success: true,
      text: mockTranscriptions[randomIndex],
      language: 'en',
      isMockResponse: true
    }
  }

  validateAudioFormat(format) {
    const supportedFormats = ['mp3', 'mp4', 'mpeg', 'mpga', 'ogg', 'wav', 'webm', 'flac']
    return supportedFormats.includes(format.toLowerCase())
  }

  validateAudioSize(sizeInBytes) {
    const maxSize = 25 * 1024 * 1024 // 25MB
    return sizeInBytes <= maxSize
  }
}

export default new WhisperService()
