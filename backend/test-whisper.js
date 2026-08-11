import dotenv from 'dotenv'
import whisperService from './services/whisperService.js'
import fs from 'fs'

dotenv.config()

console.log('\n╔════════════════════════════════════════╗')
console.log('║  Whisper API Configuration Test       ║')
console.log('╚════════════════════════════════════════╝\n')

// Check API Key
const apiKey = process.env.WHISPER_API_KEY
if (!apiKey) {
  console.log('❌ ERROR: WHISPER_API_KEY not set in .env')
  console.log('   Add this to backend/.env:')
  console.log('   WHISPER_API_KEY=sk-proj-...')
  process.exit(1)
}

console.log('✅ API Key found')
console.log(`   Key starts with: ${apiKey.substring(0, 20)}...`)
console.log(`   Key length: ${apiKey.length} characters`)

// Check if key format is correct
if (!apiKey.startsWith('sk-proj-')) {
  console.log('⚠️  WARNING: Key might be invalid (should start with sk-proj-)')
}

console.log('\n📝 Testing Mock Response:')
const mockResult = whisperService.getMockTranscription()
console.log(`✅ Mock response working:`)
console.log(`   Text: "${mockResult.text}"`)
console.log(`   Language: ${mockResult.language}`)
console.log(`   Is Mock: ${mockResult.isMockResponse}`)

console.log('\n🎤 Testing Real API Call:')
console.log('   (This will send a test request to OpenAI)\n')

try {
  // Create a simple test audio (silent audio for testing)
  // This is a minimal WAV file (1 second of silence)
  const silentWav = Buffer.from([
    0x52, 0x49, 0x46, 0x46, 0x24, 0x00, 0x00, 0x00, 0x57, 0x41, 0x56, 0x45,
    0x66, 0x6d, 0x74, 0x20, 0x10, 0x00, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00,
    0x44, 0xac, 0x00, 0x00, 0x88, 0x58, 0x01, 0x00, 0x02, 0x00, 0x10, 0x00,
    0x64, 0x61, 0x74, 0x61, 0x00, 0x00, 0x00, 0x00
  ])

  const result = await whisperService.transcribeAudio(silentWav, 'wav')

  if (result.success) {
    console.log('✅ API Call Successful!')
    console.log(`   Text: "${result.text}"`)
    console.log(`   Language: ${result.language}`)
    console.log(`   Is Mock: ${result.isMockResponse || false}`)
    console.log('\n🎉 Whisper API is working correctly!')
  } else {
    console.log('❌ API Call failed')
    console.log(`   Error: ${result.error}`)
  }
} catch (error) {
  console.log('❌ ERROR calling Whisper API:')
  console.log(`   ${error.message}`)
  console.log('\n🔍 Debugging Tips:')
  console.log('   1. Check API key is correct')
  console.log('   2. Check you have free credits left')
  console.log('   3. Go to https://platform.openai.com/account/billing/overview')
  console.log('   4. Verify key at https://platform.openai.com/account/api-keys')
  console.log('   5. Try generating a new API key')
}

console.log('\n' + '='.repeat(40) + '\n')
