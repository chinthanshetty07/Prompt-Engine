# Getting Started with Prompt Engine

Complete guide to set up and run the Prompt Engine locally.

## 📋 Prerequisites

- **Node.js** 16+ (download from https://nodejs.org/)
- **MongoDB** - Choose one:
  - Local: [Install MongoDB](https://docs.mongodb.com/manual/installation/)
  - Cloud: [Free MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (recommended)
- **Code Editor** - VS Code, Cursor, or similar
- **Terminal** - Any terminal (zsh, bash, etc.)

## 🎯 Step-by-Step Setup

### Step 1: Check Prerequisites

```bash
# Check Node.js version (should be 16+)
node --version

# Check npm version (should come with Node.js)
npm --version
```

### Step 2: Set Up MongoDB

**Option A: Local MongoDB (macOS)**
```bash
# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community

# Verify it's running
brew services list | grep mongodb
```

**Option B: MongoDB Atlas (Cloud - Free)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account (no credit card needed)
3. Create a cluster (M0 free tier)
4. Create a database user
5. Get connection string
6. Keep the connection string handy

### Step 3: Install Frontend Dependencies

```bash
cd frontend
npm install
```

### Step 4: Configure Frontend

```bash
# Frontend uses default backend URL: http://localhost:5000
# Usually no configuration needed
```

### Step 5: Install Backend Dependencies

```bash
cd ../backend
npm install
```

### Step 6: Configure Backend

```bash
# Copy example config
cp .env.example .env

# Edit .env with your settings
nano .env  # or use your editor
```

**If using Local MongoDB:**
```
MONGODB_URI=mongodb://localhost:27017/prompt-engine
```

**If using MongoDB Atlas:**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/prompt-engine?retryWrites=true&w=majority
```

## 🚀 Running the Application

You'll need **3 terminal windows/tabs**:

### Terminal 1: Start MongoDB (if using local)

```bash
# Check if already running
brew services list | grep mongodb

# If not running, start it
brew services start mongodb-community

# Keep this terminal open or let it run in background
```

### Terminal 2: Start Backend

```bash
cd backend
npm run dev
```

You should see:
```
╔════════════════════════════════════════╗
║   Prompt Engine Backend Server        ║
╠════════════════════════════════════════╣
║ Server: http://localhost:5000
║ Environment: development
║ Database: Connected
║ Status: Ready ✅
╚════════════════════════════════════════╝
```

### Terminal 3: Start Frontend

```bash
cd frontend
npm run dev
```

You should see:
```
  VITE v4.5.14  ready in 120 ms

  ➜  Local:   http://localhost:3000/
```

## ✅ Verify Everything Works

### 1. Check Health Endpoints

**Backend Health:**
```bash
curl http://localhost:5000/api/health
```

Should return:
```json
{
  "success": true,
  "message": "Server is running",
  "env": "development",
  "timestamp": "2024-07-21T..."
}
```

**Frontend:**
Open http://localhost:3000 in your browser

### 2. Test Full Flow

1. Open http://localhost:3000
2. Type a prompt in the Input column (e.g., "Create a workout plan")
3. Click "Optimize Prompt" button
4. Should see "Optimizing..." spinner
5. See optimized prompt in Output column

## 🔌 API Testing

Test the backend API directly:

```bash
# Optimize a prompt
curl -X POST http://localhost:5000/api/optimize \
  -H "Content-Type: application/json" \
  -d '{"prompt": "I want to get fit", "domain": "fitness"}'

# Get history
curl http://localhost:5000/api/history

# Get statistics
curl http://localhost:5000/api/statistics
```

## 📁 Project Structure

```
prompt-engine/
├── frontend/              # React UI
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
├── backend/               # Node.js API
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── server.js
│   ├── package.json
│   └── README.md
│
├── GETTING_STARTED.md     # This file
├── MONGODB_SETUP.md       # Detailed MongoDB guide
├── ARCHITECTURE.md        # Technical architecture
├── PROJECT.md             # Project specification
└── README.md              # Main README
```

## 🎨 Features You Can Test

### 1. Input/Output Columns
- Type text in left column
- See character count
- See optimized text in right column

### 2. Copy Button
- Optimized prompt appears
- Click "Copy" button
- Check clipboard (paste anywhere)
- Should show "Copied!" confirmation

### 3. Convert Audio Button
- Click "Convert Audio" button
- Allow microphone access
- Speak your prompt
- Click "Stop Recording"
- Text appears in Input column (implementation pending)

### 4. History
- Each optimization is saved
- Get history: `curl http://localhost:5000/api/history`
- View all past optimizations

## 🔑 Getting API Keys (For Full Features)

### Grok API Key
1. Visit https://grok.com
2. Create account
3. Generate API key
4. Add to backend `.env`:
   ```
   GROK_API_KEY=your_key_here
   ```

### Whisper API Key (For Audio)
1. Visit https://platform.openai.com/
2. Create account
3. Generate API key
4. Add to backend `.env`:
   ```
   WHISPER_API_KEY=your_key_here
   ```

**Note:** Backend works without these keys - uses mock responses.

## 🛠️ Stopping the Application

To stop:
1. Press `Ctrl+C` in each terminal
2. MongoDB will keep running in background

To stop MongoDB (macOS):
```bash
brew services stop mongodb-community
```

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"
- Check MongoDB is running: `brew services list`
- Verify connection string in `.env`
- See MONGODB_SETUP.md for detailed help

### "Frontend can't reach backend"
- Backend must be running on port 5000
- Check no other process is using port 5000
- Frontend looks for backend at http://localhost:5000

### "Port already in use"
```bash
# Find process using port 3000
lsof -i :3000

# Find process using port 5000
lsof -i :5000

# Kill process (replace PID)
kill -9 PID
```

### "npm install fails"
```bash
# Clear npm cache
npm cache clean --force

# Try install again
npm install
```

## 📊 Project Stats

| Component | Tech | Status |
|-----------|------|--------|
| Frontend | React 18 + Vite | ✅ Complete |
| Backend | Node.js + Express | ✅ Complete |
| Database | MongoDB | ✅ Setup |
| UI/UX | Professional Design | ✅ Complete |
| Styling | CSS + Dark Mode | ✅ Complete |
| State Management | Context API | ✅ Complete |
| Error Handling | Global Middleware | ✅ Complete |

## 📚 Documentation

- **[Frontend README](frontend/README.md)** - UI components, styling, state management
- **[Backend README](backend/README.md)** - API endpoints, database schema, services
- **[MongoDB Setup](MONGODB_SETUP.md)** - Database installation and configuration
- **[Architecture](ARCHITECTURE.md)** - System design and data flow
- **[Project Spec](PROJECT.md)** - Original requirements and features

## 🎓 Learning Path

1. **Understand Frontend**
   - Check `frontend/src/components/` for React components
   - Look at `frontend/src/styles/` for CSS styling
   - Review `frontend/src/context/` for state management

2. **Understand Backend**
   - Check `backend/server.js` for app setup
   - Look at `backend/routes/` for API endpoints
   - Review `backend/services/` for business logic

3. **Test Integration**
   - Use frontend UI
   - Monitor backend logs
   - Check MongoDB data

4. **Customize**
   - Change colors (already did this!)
   - Add new endpoints
   - Extend domain detection
   - Add new features

## 🚀 Next Steps

After getting everything running:

1. **Get API Keys** - Grok and Whisper for full features
2. **Enhance Audio** - Complete Whisper integration
3. **Add Testing** - Unit and integration tests
4. **Deploy** - Host on cloud services (Vercel, Railway)
5. **Optimize** - Performance tuning

## ❓ FAQ

**Q: Do I need the API keys?**
A: No, backend works with mock responses. Keys enable real Grok optimization.

**Q: Can I use remote MongoDB?**
A: Yes, use MongoDB Atlas free tier (recommended).

**Q: How do I save my work?**
A: Git is already initialized. Commit regularly!

**Q: Can I deploy this?**
A: Yes! See ARCHITECTURE.md for deployment options.

---

**Happy Building! 🚀**

For questions or issues, check the relevant README files or MONGODB_SETUP.md.
