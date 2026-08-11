import dotenv from 'dotenv'
import grokService from './services/grokService.js'

dotenv.config()

console.log('\n╔════════════════════════════════════════╗')
console.log('║  Grok API Configuration Test          ║')
console.log('╚════════════════════════════════════════╝\n')

// Check API Key
const apiKey = process.env.GROK_API_KEY
if (!apiKey) {
  console.log('❌ ERROR: GROK_API_KEY not set in .env')
  console.log('   Add this to backend/.env:')
  console.log('   GROK_API_KEY=gsk_...')
  process.exit(1)
}

console.log('✅ API Key found')
console.log(`   Key starts with: ${apiKey.substring(0, 20)}...`)
console.log(`   Key length: ${apiKey.length} characters`)

if (!apiKey.startsWith('gsk_')) {
  console.log('⚠️  WARNING: Key format might be invalid (should start with gsk_)')
}

console.log('\n📝 Testing Mock Response:')
const mockResult = grokService.getMockResponse('Create a workout plan')
console.log(`✅ Mock response working:`)
console.log(`   Text: "${mockResult.optimizedPrompt.substring(0, 80)}..."`)
console.log(`   Model: ${mockResult.model}`)

console.log('\n🤖 Testing Real Grok API Call:')
console.log('   (This will send a request to Grok API)\n')

try {
  const result = await grokService.optimizePrompt('Create a comprehensive workout plan for beginners', 'fitness')

  if (result.success) {
    console.log('✅ API Call Successful!')
    console.log(`   Model: ${result.model}`)
    console.log(`   Optimized: "${result.optimizedPrompt.substring(0, 100)}..."`)
    console.log(`   Tokens: ${result.tokensUsed.total_tokens} total`)
    console.log('\n🎉 Grok API is working correctly!')
  } else {
    console.log('❌ API Call failed')
    console.log(`   Error: ${result.error}`)
  }
} catch (error) {
  console.log('❌ ERROR calling Grok API:')
  console.log(`   ${error.message}`)
  console.log('\n🔍 Debugging Tips:')
  console.log('   1. Check API key is correct')
  console.log('   2. Verify key at https://api.groq.com/keys')
  console.log('   3. Check you have quota available')
  console.log('   4. Check internet connection')
  console.log('   5. Grok API might be rate limited')
}

console.log('\n' + '='.repeat(40) + '\n')
