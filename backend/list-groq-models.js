import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

const apiKey = process.env.GROK_API_KEY
const baseURL = 'https://api.groq.com/openai/v1'

if (!apiKey) {
  console.log('❌ GROK_API_KEY not set')
  process.exit(1)
}

console.log('\n🔍 Fetching available Groq models...\n')

try {
  const response = await axios.get(`${baseURL}/models`, {
    headers: {
      'Authorization': `Bearer ${apiKey}`
    }
  })

  console.log('✅ Available Groq Models:\n')
  response.data.data.forEach(model => {
    console.log(`  • ${model.id}`)
  })

  console.log('\n💡 Use one of these model IDs in the backend/services/grokService.js')
  console.log('   Look for the line: this.model = "...')
} catch (error) {
  console.log('❌ Error fetching models:')
  console.log(`   ${error.message}`)
  if (error.response?.data) {
    console.log(`   Details: ${JSON.stringify(error.response.data)}`)
  }
}
