# 🔧 Whisper API Troubleshooting Guide

## Issue: "Failed to transcribe" or Error 429

### What We Fixed ✅
- **API Key Loading Issue** - The service wasn't reading your API key properly at startup
- **Fix Applied** - Now loads API key dynamically when needed

---

## Current Status

Your API key **IS working** but you're getting:
```
ERROR: Request failed with status code 429
```

This means:
- ✅ API key is **valid**
- ✅ Connection to OpenAI is **working**
- ❌ Rate limit OR quota issue

---

## Solutions to Try

### Solution 1: Check Your Free Credits ⭐ (Most Common)

1. Go to https://platform.openai.com/account/billing/overview
2. Look at **Credit balance**
3. Do you see **$5.00** or more available?

**If YES:** Free credits are there
**If NO:** You need to add a payment method

**What to do:**
- Go to https://platform.openai.com/account/billing/overview
- Click "Add to credit balance" or "Set up paid account"
- Add a card
- Retry

---

### Solution 2: Check API Key Status

1. Go to https://platform.openai.com/account/api-keys
2. Find your key: `sk-proj-J4yWGZlE45h_...`
3. Is it **enabled** (green)?
4. Click it to see usage

**If disabled:** 
- Click to enable it
- Retry

---

### Solution 3: Rate Limit (If You Just Created Account)

New accounts sometimes have **strict rate limits**.

**Wait 5 minutes and try again**

If still failing:
- Go to https://platform.openai.com/account/rate-limits
- Check if you're seeing limits

---

### Solution 4: Get a Fresh API Key

Sometimes the key gets revoked or restricted:

1. Go to https://platform.openai.com/account/api-keys
2. Delete the key you're using
3. Create a new one: "Create new secret key"
4. Copy the **full** key (very long string)
5. Update `backend/.env`:
   ```
   WHISPER_API_KEY=sk-proj-your_new_key_here
   ```
6. Restart backend:
   ```bash
   cd backend
   npm run dev
   ```

---

## Testing with Diagnostic Script

### Run the Diagnostic

```bash
cd backend
node test-whisper.js
```

**What to look for:**

✅ **Success** (you should see):
```
✅ API Key found
✅ Mock response working
✅ API Call Successful!
```

❌ **Error** (tells you the issue):
- `WHISPER_API_KEY not set` → Add key to .env
- `429 Too Many Requests` → Rate limit/no credits
- `401 Unauthorized` → Invalid API key
- `403 Forbidden` → Account issue
- `500 Internal Server Error` → OpenAI issue

---

## Step-by-Step Fix

### Step 1: Verify API Key Format
```bash
cat backend/.env | grep WHISPER
```

Should show:
```
OPENAI_API_KEY=your_api_key_here
```

✅ Key present and starts with `sk-proj-`

---

### Step 2: Check Free Credits

Go to: https://platform.openai.com/account/billing/overview

Look for:
- **Credit balance** - Should show $5 or more
- **Available balance** - Should be positive

If $0.00 or negative:
1. Click "Add to credit balance"
2. Add payment method
3. Get charged only for usage (very cheap)

---

### Step 3: Restart Backend

```bash
# Stop backend (Ctrl+C if running)
# Then restart:
cd backend
npm run dev
```

Should see:
```
✅ MongoDB connected successfully
Server: http://localhost:5000
Status: Ready ✅
```

---

### Step 4: Run Diagnostic Again

```bash
node test-whisper.js
```

**Look for:** ✅ API Call Successful!

---

### Step 5: Test in Browser

1. Open http://localhost:3000
2. Click "Convert Audio"
3. Allow microphone
4. Speak a prompt
5. Stop recording
6. Watch for text to appear

Should see:
- ✅ "Transcribing..." message
- ✅ Spinner animation
- ✅ Text appears in Input column
- ✅ NO "mock transcription" message

---

## Common Errors & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| `401 Unauthorized` | Invalid API key | Get new key from OpenAI |
| `429 Too Many Requests` | Rate limit/no credits | Check billing, wait 5 min |
| `403 Forbidden` | Account issue | Check account status |
| `500 Internal Error` | OpenAI server issue | Wait and retry |
| `WHISPER_API_KEY not set` | Key not in .env | Add key to `backend/.env` |

---

## Quick Checklist

- [ ] Go to https://platform.openai.com/account/billing/overview
- [ ] Verify you have free credits ($5+)
- [ ] Go to https://platform.openai.com/account/api-keys
- [ ] Verify API key is enabled (green)
- [ ] Update `backend/.env` with correct key
- [ ] Restart backend (`npm run dev`)
- [ ] Run: `node test-whisper.js`
- [ ] Look for: ✅ API Call Successful!
- [ ] Test in browser at http://localhost:3000
- [ ] Click "Convert Audio" and speak

---

## If Still Not Working

Tell me:
1. What error message do you see?
2. Is it in browser console or terminal?
3. What does `node test-whisper.js` show?
4. Do you have free credits available?
5. Is the API key from a new account?

---

## Next Steps

Once Whisper works:
1. Test full flow: Record → Transcribe → Optimize
2. Get Grok API key for real optimization
3. Test all features
4. Deploy to production

---

## Useful Links

- **Check Credits**: https://platform.openai.com/account/billing/overview
- **API Keys**: https://platform.openai.com/account/api-keys
- **Account**: https://platform.openai.com/account/org-settings/general
- **API Status**: https://status.openai.com

---

**You're very close!** The API key is working - just need to verify credits. 🚀
