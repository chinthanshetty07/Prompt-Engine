# 🎤 Whisper API Integration Guide

Complete guide for using OpenAI's Whisper API for audio-to-text conversion in Prompt Engine.

---

## 📋 What is Whisper?

**Whisper** is OpenAI's speech recognition model that converts audio to text.

**Capabilities:**
- Converts spoken words to text
- Supports 99+ languages
- Handles background noise well
- Very accurate
- Free tier available ($5 credits)

---

## 🔑 Step 1: Get Your API Key

### Create OpenAI Account
1. Go to https://platform.openai.com/signup
2. Sign up with email or Google
3. Verify email

### Get API Key
1. Go to https://platform.openai.com/account/api-keys
2. Click "Create new secret key"
3. Copy the key (starts with `sk-proj-`)
4. **Save it safely** (don't share!)

### Check Free Credits
1. Go to https://platform.openai.com/account/billing/overview
2. You get $5 free credits
3. Whisper is very cheap (~$0.02 per 10 minutes of audio)

---

## ⚙️ Step 2: Configure Backend

### Add API Key to `.env`

```bash
# backend/.env
WHISPER_API_KEY=sk-proj-your_actual_key_here
```

### Install Dependencies

```bash
cd backend
npm install multer form-data
```

Or if already installed from previous setup:
```bash
npm install
```

---

## 🧪 Step 3: Test Whisper Integration

### Start Everything

**Terminal 1: MongoDB**
```bash
brew services start mongodb-community
```

**Terminal 2: Backend**
```bash
cd backend
npm run dev
```

Should see:
```
✅ MongoDB connected successfully
Server: http://localhost:5000
```

**Terminal 3: Frontend**
```bash
cd frontend
npm run dev
```

Should see:
```
Local: http://localhost:3000/
```

---

## 🎙️ Step 4: Test Audio Conversion

### Method 1: Using Frontend UI (Easiest)

1. **Open http://localhost:3000**
2. **Click "Convert Audio" button**
3. **Allow microphone access** (browser will ask)
4. **Speak your prompt:**
   - Example: "Create a workout plan for beginners"
   - Speak clearly
   - Take your time
5. **Click button again to stop**
6. **See transcribed text** in Input column!

### Method 2: Using cURL (Advanced)

**Create a test audio file:**
```bash
# Record 5 seconds of audio
ffmpeg -f avfoundation -i ":0" -t 5 test_audio.wav

# Or use existing audio file
```

**Send to Whisper:**
```bash
curl -X POST http://localhost:5000/api/transcribe \
  -F "audio=@test_audio.wav"
```

**Expected response:**
```json
{
  "success": true,
  "text": "Create a workout plan for beginners",
  "language": "en",
  "originalFilename": "test_audio.wav"
}
```

---

## 🔄 How Whisper Integration Works

### Data Flow

```
┌─────────────────┐
│  User speaks    │
│  "Create a      │
│   workout       │
│   plan"         │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────┐
│ Browser (Frontend)                  │
│                                     │
│ 1. MediaRecorder captures audio    │
│ 2. Creates Blob (WebM format)      │
│ 3. Sends to backend                │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│ Backend (Node.js)                   │
│                                     │
│ 1. Receives audio blob              │
│ 2. Validates format & size          │
│ 3. Sends to Whisper API             │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│ OpenAI Whisper API                  │
│                                     │
│ 1. Processes audio                  │
│ 2. Returns text transcription       │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│ Backend                             │
│                                     │
│ 1. Receives transcription           │
│ 2. Sends back to frontend           │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│ Frontend (React)                    │
│                                     │
│ 1. Receives text                    │
│ 2. Updates Input column             │
│ 3. User sees transcribed text       │
└─────────────────────────────────────┘
```

---

## 📝 Testing Checklist

### Test Cases

- [ ] **Basic Recording**
  - Click "Convert Audio"
  - Speak 5-10 seconds
  - Stop recording
  - Text appears in Input column

- [ ] **Clear Audio**
  - Speak clearly
  - No background noise
  - Verify accurate transcription

- [ ] **Noisy Environment**
  - Record with background noise
  - Whisper should still work (but less accurate)

- [ ] **Long Recording**
  - Speak for 30+ seconds
  - Verify it processes

- [ ] **Error Handling**
  - Try without API key (should show mock)
  - Try with invalid file
  - Verify error messages appear

- [ ] **Copy After Transcription**
  - Record audio
  - Get transcription
  - Click "Optimize Prompt"
  - See optimization in Output column

---

## 🐛 Troubleshooting

### "Microphone access denied"
**Solution:**
1. Check browser settings
2. Go to http://localhost:3000
3. Look for microphone icon in address bar
4. Click "Allow"
5. Try again

### "Failed to transcribe audio"
**Check:**
1. Is Whisper API key set in `.env`?
   ```bash
   echo $WHISPER_API_KEY
   ```
2. Is key valid? Check at https://platform.openai.com/account/api-keys
3. Do you have free credits? Check at https://platform.openai.com/account/billing/overview
4. Is backend running? Should see "Server: http://localhost:5000"

### "Using mock transcription (Whisper API key not set)"
**This is normal!** Means:
- No API key configured
- Backend is using mock responses
- Transcription still works but with pre-set text

**To fix:**
1. Get API key from OpenAI
2. Add to `backend/.env`
3. Restart backend

### "Unsupported audio format"
**Supported formats:**
- WebM (browser default) ✓
- MP3 ✓
- WAV ✓
- OGG ✓
- M4A ✓
- FLAC ✓

### "Audio file exceeds maximum size"
**Max file size:** 25MB

**Solution:**
- Record shorter segments
- Reduce quality before sending

---

## 💰 Pricing

**Whisper API Pricing:**
- $0.02 per 1 minute of audio
- First $5 free (250 minutes!)

**Examples:**
- 10 min recording = $0.20
- 50 min recording = $1.00
- 100 min recording = $2.00

**For free tier:**
- $5 ÷ $0.02 per min = **250 minutes free**
- That's 4+ hours of usage!

---

## 🎯 API Endpoint Details

### Transcribe Audio
```
POST /api/transcribe
Content-Type: multipart/form-data

Parameters:
- audio: Audio file (required)

Supported formats: webm, mp3, wav, ogg, m4a, flac
Max size: 25MB

Response:
{
  "success": true,
  "text": "transcribed text",
  "language": "en",
  "originalFilename": "audio.webm",
  "duration": 12.5,
  "isMockResponse": false
}

Error Response:
{
  "success": false,
  "error": "error message"
}
```

---

## 📊 Data Being Sent

### To Whisper API
- Audio file (encrypted over HTTPS)
- Language: English
- Temperature: 0 (most accurate)

### What You Control
- Everything in `backend/.env`
- No user data is stored by Whisper
- OpenAI doesn't train on your audio

---

## 🔒 Security Notes

1. **API Key Safety**
   - Never commit `.env` to git
   - Don't share your key
   - Regenerate if exposed
   - Use `.env` file (not in code)

2. **Audio Privacy**
   - Audio sent over HTTPS (encrypted)
   - OpenAI API is secure
   - No data stored by default
   - Can request data deletion from OpenAI

3. **Frontend**
   - Audio recorded in browser memory
   - Only sent to backend
   - Not stored on device

---

## 🚀 Production Deployment

### On Production Server

1. **Set environment variable:**
   ```bash
   export WHISPER_API_KEY=sk-proj-your_key
   ```

2. **Or use `.env` file:**
   ```bash
   WHISPER_API_KEY=sk-proj-your_key
   ```

3. **Backend will use it automatically**

### Using Docker
```dockerfile
FROM node:18

ENV WHISPER_API_KEY=$WHISPER_API_KEY

# ... rest of docker config
```

### Using Heroku
```bash
heroku config:set WHISPER_API_KEY=sk-proj-your_key
```

---

## 📈 Monitoring

### Check API Usage
1. Go to https://platform.openai.com/account/usage
2. See Whisper API calls
3. Monitor spending
4. Set spending limits

### Backend Logs
When Whisper is called, you'll see:
```
POST /api/transcribe - 200 OK
Audio transcribed successfully
Text: "create a workout plan"
```

---

## 🎓 What Whisper Can Do

### Works Well
- ✅ Clear speech
- ✅ Multiple languages
- ✅ Technical terms
- ✅ Background noise (handles it)
- ✅ Different accents
- ✅ Timestamps in audio

### Limitations
- ❌ Very heavy background noise (music)
- ❌ Very fast speech (hard to follow)
- ❌ Very quiet audio
- ❌ Files over 25MB

---

## 🔗 Useful Links

- **OpenAI Whisper API:** https://platform.openai.com/docs/guides/speech-to-text
- **API Key Dashboard:** https://platform.openai.com/account/api-keys
- **Usage Dashboard:** https://platform.openai.com/account/usage
- **OpenAI Status:** https://status.openai.com

---

## ✅ Verification Checklist

Before considering Whisper "fully integrated":

- [ ] API key obtained from OpenAI
- [ ] API key added to `backend/.env`
- [ ] Backend dependencies installed (`npm install`)
- [ ] Backend started and running
- [ ] Frontend started and running
- [ ] Microphone access granted in browser
- [ ] Test audio recording works
- [ ] Transcribed text appears in Input column
- [ ] Transcription sent to Grok optimization
- [ ] Full flow works: Record → Transcribe → Optimize

---

## 🎉 Next Steps

Once Whisper is working:

1. **Test with real Grok optimization**
   - Get Grok API key
   - Set in `backend/.env`
   - Record prompt
   - Get transcribed text
   - Click "Optimize Prompt"
   - See optimized result

2. **Handle Edge Cases**
   - Very long recordings
   - Poor quality audio
   - Multiple languages
   - Background noise

3. **Improve UX**
   - Add audio level indicator
   - Show transcription in real-time
   - Add undo/clear buttons
   - Save audio recordings

4. **Deploy to Production**
   - Use MongoDB Atlas
   - Deploy to Vercel (frontend)
   - Deploy to Railway/Render (backend)

---

## 📞 Support

If Whisper isn't working:

1. Check `.env` has valid API key
2. Check OpenAI has free credits
3. Check backend is running on port 5000
4. Check frontend can reach backend
5. Check browser console for errors (F12)
6. Check backend logs for errors

---

## 📄 Summary

| Feature | Status |
|---------|--------|
| Whisper Service | ✅ Built |
| Audio Recording | ✅ Built |
| API Endpoint | ✅ Built |
| Frontend UI | ✅ Built |
| Error Handling | ✅ Built |
| Mock Responses | ✅ Built |
| File Validation | ✅ Built |
| Tests | ⏳ Next |

---

**You now have fully functional audio-to-text conversion!** 🎉

Record audio → Get text → Optimize with Grok → Done!
