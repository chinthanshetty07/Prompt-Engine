# MongoDB Setup Guide

You have two options to use MongoDB with Prompt Engine:

## Option 1: Local MongoDB (Recommended for Development)

### macOS
```bash
# Install MongoDB using Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community

# Verify MongoDB is running
mongo --version
```

### Verify MongoDB Connection
```bash
# In another terminal, connect to MongoDB
mongosh

# Should show: test>
# Type 'exit' to close
```

---

## Option 2: MongoDB Atlas (Cloud - Recommended for Production)

1. **Go to MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
2. **Create a Free Account** (no credit card required)
3. **Create a Cluster**:
   - Choose the free tier (M0)
   - Select your region
   - Click "Create Cluster"
4. **Add Database User**:
   - Go to Database Access
   - Click "Add New Database User"
   - Create username and password
5. **Get Connection String**:
   - Go to Clusters → Connect
   - Choose "Connect your application"
   - Copy the connection string
6. **Update .env**:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/prompt-engine?retryWrites=true&w=majority
   ```

---

## Testing MongoDB Connection

After setting up MongoDB, you can verify the connection:

```bash
# Terminal 1: Start MongoDB (if using local)
brew services start mongodb-community

# Terminal 2: Start the backend
cd backend
npm run dev

# Terminal 3: Test API
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running",
  "env": "development",
  "timestamp": "2024-07-21T..."
}
```

---

## MongoDB Collections

After running the backend, MongoDB will automatically create:

- **prompts** - Stores all optimized prompts with metadata

### Sample Document Structure
```javascript
{
  _id: ObjectId("..."),
  originalPrompt: "user's original prompt",
  optimizedPrompt: "AI optimized version",
  domain: "fitness", // or "finance", "software_engineering", "other"
  detectedDomains: ["fitness"],
  confidence: 0.8,
  tokens: {
    original: 45,
    optimized: 78
  },
  metadata: {
    userAgent: "Mozilla/5.0...",
    ipAddress: "127.0.0.1",
    language: "en"
  },
  createdAt: "2024-07-21T...",
  updatedAt: "2024-07-21T..."
}
```

---

## Troubleshooting

### MongoDB Not Starting
```bash
# Check if MongoDB is running
brew services list

# Restart MongoDB
brew services restart mongodb-community

# Check logs
tail -f /usr/local/var/log/mongodb/mongo.log
```

### Connection Refused
```bash
# Make sure MongoDB is running on port 27017
lsof -i :27017

# If nothing shows, start MongoDB
brew services start mongodb-community
```

### MongoDB Atlas Connection Issues
- Make sure IP is whitelisted in MongoDB Atlas
- Verify username and password in connection string
- Check internet connection

---

## Running Backend Without Local MongoDB

If you don't have MongoDB set up yet:

1. The backend will attempt to connect to `mongodb://localhost:27017`
2. If connection fails, you'll see: `❌ MongoDB connection error`
3. Get a free MongoDB Atlas cluster (takes ~5 minutes)
4. Update `.env` with your connection string
5. Restart the backend

---

## Next Steps

Once MongoDB is running:

```bash
cd backend
npm run dev
```

The backend will start on `http://localhost:5000`
