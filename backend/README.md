# Prompt Engine Backend

Professional Node.js + Express backend for the Prompt Engine application. Handles prompt optimization, database operations, and API endpoints.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start MongoDB** (see ../MONGODB_SETUP.md for detailed instructions)
   ```bash
   brew services start mongodb-community
   ```

4. **Run the backend**
   ```bash
   npm run dev
   ```

   Server will start on `http://localhost:5000`

## 📋 Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection setup
├── controllers/
│   └── promptController.js  # Business logic for API endpoints
├── middleware/
│   └── errorHandler.js      # Global error handling middleware
├── models/
│   └── Prompt.js           # MongoDB schema
├── routes/
│   └── prompts.js          # API route definitions
├── services/
│   ├── grokService.js      # Grok API integration
│   └── dbService.js        # Database operations
├── server.js               # Express app initialization
├── package.json
└── .env.example
```

## 🔌 API Endpoints

### Optimize Prompt
```
POST /api/optimize
Content-Type: application/json

Request:
{
  "prompt": "your prompt text here",
  "domain": "fitness" // optional: fitness, finance, software_engineering, other
}

Response:
{
  "success": true,
  "_id": "...",
  "originalPrompt": "...",
  "optimizedPrompt": "...",
  "domain": "fitness",
  "detectedDomains": ["fitness"],
  "tokens": {
    "original": 45,
    "optimized": 78
  },
  "createdAt": "2024-07-21T..."
}
```

### Get History
```
GET /api/history?limit=50&skip=0

Response:
{
  "success": true,
  "prompts": [...],
  "total": 150,
  "limit": 50,
  "skip": 0,
  "hasMore": true
}
```

### Get Single Prompt
```
GET /api/history/:id

Response:
{
  "success": true,
  "data": { prompt object }
}
```

### Search Prompts
```
GET /api/search?q=fitness

Response:
{
  "success": true,
  "results": [...],
  "count": 5
}
```

### Delete Prompt
```
DELETE /api/history/:id

Response:
{
  "success": true,
  "message": "Prompt deleted successfully"
}
```

### Get Statistics
```
GET /api/statistics

Response:
{
  "success": true,
  "data": {
    "total": 150,
    "byDomain": [
      { "_id": "fitness", "count": 45 },
      { "_id": "finance", "count": 30 },
      { "_id": "software_engineering", "count": 25 },
      { "_id": "other", "count": 50 }
    ],
    "tokens": {
      "totalPromptTokens": 5432,
      "totalOptimizedTokens": 8765
    }
  }
}
```

### Health Check
```
GET /api/health

Response:
{
  "success": true,
  "message": "Server is running",
  "env": "development",
  "timestamp": "2024-07-21T..."
}
```

## 🔧 Configuration

### Environment Variables (.env)

```bash
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/prompt-engine

# Grok API (get key from https://grok.com)
GROK_API_KEY=your_key_here
GROK_API_BASE_URL=https://api.x.ai/v1


# Frontend URL for CORS
CORS_ORIGIN=http://localhost:3000
```

## 🗄️ Database Schema

### Prompt Document
```javascript
{
  _id: ObjectId,
  originalPrompt: String,           // User's input (max 10000 chars)
  optimizedPrompt: String,          // AI's optimized output
  domain: String,                   // fitness | finance | software_engineering | other
  detectedDomains: [String],        // Domains detected from prompt
  confidence: Number,               // 0-1 confidence score
  tokens: {
    original: Number,               // Tokens in original prompt
    optimized: Number               // Tokens in optimized prompt
  },
  metadata: {
    userAgent: String,
    ipAddress: String,
    language: String                // Detected language
  },
  createdAt: Date,                  // Auto-generated timestamp
  updatedAt: Date                   // Auto-generated timestamp
}
```

## 🛠️ Services

### GrokService
Handles communication with Grok API for prompt optimization.

**Features:**
- Sends prompts to Grok AI
- Domain-specific system prompts
- Domain detection from text
- Mock responses when API key unavailable
- Error handling and retries

### DatabaseService
Manages all database operations with MongoDB.

**Operations:**
- Create prompt
- Fetch history with pagination
- Get single prompt
- Delete prompt
- Search prompts
- Get statistics

## 🚨 Error Handling

The backend includes comprehensive error handling:

- **Validation Errors** (400) - Invalid input format
- **Not Found Errors** (404) - Resource doesn't exist
- **Server Errors** (500) - Internal server issues

All errors return consistent JSON format:
```json
{
  "success": false,
  "error": "Error message here"
}
```

## 🧪 Testing Endpoints

Using curl:

```bash
# Test health
curl http://localhost:5000/api/health

# Optimize a prompt
curl -X POST http://localhost:5000/api/optimize \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Create a workout plan for beginners", "domain": "fitness"}'

# Get history
curl http://localhost:5000/api/history

# Search
curl "http://localhost:5000/api/search?q=fitness"
```

Using VS Code REST Client or Postman:

See `../API.md` for detailed endpoint testing (coming soon)

## 🔌 Integration with Frontend

The frontend communicates with the backend via these endpoints:

1. Frontend sends prompt → `POST /api/optimize`
2. Backend calls Grok API
3. Backend saves to MongoDB
4. Backend returns optimized prompt
5. Frontend displays in OutputColumn

## 📊 Performance

- **Prompt Optimization**: ~1-3 seconds (depends on Grok API)
- **History Fetch**: ~100ms for 50 items
- **Search**: ~150ms for index search
- **Database**: MongoDB indexes on `createdAt` and `domain`

## 🔐 Security

- Input validation on all endpoints
- Max prompt length: 10,000 characters
- CORS enabled for frontend only
- Environment variables for sensitive data
- Error messages don't expose internal details

## 🚀 Production Deployment

For production deployment:

1. Use MongoDB Atlas (cloud)
2. Set `NODE_ENV=production`
3. Use process manager (PM2, systemd)
4. Enable HTTPS
5. Set up rate limiting
6. Configure proper CORS origins
7. Use environment variable service

## 📝 Scripts

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start

# Install dependencies
npm install
```

## 🆘 Troubleshooting

### MongoDB Connection Failed
- Check MongoDB is running: `brew services list`
- Verify connection string in `.env`
- See ../MONGODB_SETUP.md for detailed help

### Grok API Errors
- Verify `GROK_API_KEY` is set in `.env`
- Backend uses mock responses if key is missing
- Check Grok API status

### CORS Errors
- Verify frontend URL in `CORS_ORIGIN`
- Check frontend is running on correct port

## 📚 Related Documentation

- [Frontend README](../frontend/README.md)
- [MongoDB Setup](../MONGODB_SETUP.md)
- [Architecture](../ARCHITECTURE.md)
- [Project Spec](../PROJECT.md)

---

**Built with Node.js, Express, and MongoDB** ⚡
