# Prompt Engine - Architecture Plan

## Tech Stack Confirmed
- **Frontend**: React.js + HTML/CSS/JavaScript + Context API
- **Backend**: Node.js + Express
- **Speech-to-Text**: Whisper API
- **Prompt Optimization**: Grok API (key pending)
- **Database**: MongoDB (local or MongoDB Atlas)
- **Environment**: Local development

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND (React)                      │
│                                                               │
│  ┌──────────────────────┐         ┌──────────────────────┐  │
│  │  LEFT COLUMN         │         │  RIGHT COLUMN        │  │
│  │  (Audio to Text)     │         │  (Optimized Prompt)  │  │
│  │                      │         │                      │  │
│  │  - Input textarea    │────────→│  - Output display    │  │
│  │  - Transcribed text  │         │  - Copy button       │  │
│  │                      │         │  - Save to history   │  │
│  └──────────────────────┘         └──────────────────────┘  │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  CONVERT BUTTON (Center-Bottom)                      │   │
│  │  - Activates Whisper speech-to-text                 │   │
│  │  - Sends to backend for optimization                │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  Context: UserInput, OptimizedPrompt, History               │
└─────────────────────────────────────────────────────────────┘
                              ↓
                         REST API
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND (Node.js/Express)                │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Routes:                                              │   │
│  │  - POST /api/optimize (receives text prompt)        │   │
│  │  - POST /api/history (save to DB)                   │   │
│  │  - GET /api/history (retrieve saved prompts)        │   │
│  │  - DELETE /api/history/:id (delete entry)           │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Services:                                            │   │
│  │  - GrokService (calls Grok API for optimization)   │   │
│  │  - DatabaseService (MongoDB CRUD operations)       │   │
│  │  - ValidationService (input sanitization)          │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Grok API Integration:                               │   │
│  │  - Receives: user prompt (text)                     │   │
│  │  - Returns: optimized prompt                        │   │
│  │  - Error handling for API failures                  │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                       MONGODB                               │
│                                                               │
│  Collections:                                               │
│  - prompts                                                  │
│    {                                                        │
│      _id: ObjectId,                                        │
│      originalPrompt: string,                              │
│      optimizedPrompt: string,                             │
│      domain: string (fitness/finance/engineering/other), │
│      createdAt: timestamp,                               │
│      updatedAt: timestamp                                │
│    }                                                       │
│                                                               │
│  - users (optional, for future enhancement)               │
└─────────────────────────────────────────────────────────────┘
```

## Project Structure

```
prompt-engine/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── InputColumn.jsx
│   │   │   ├── OutputColumn.jsx
│   │   │   ├── ConvertButton.jsx
│   │   │   └── History.jsx
│   │   ├── context/
│   │   │   └── PromptContext.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── styles/
│   │   │   ├── App.css
│   │   │   ├── layout.css
│   │   │   └── components.css
│   │   ├── App.jsx
│   │   └── index.js
│   ├── .env.example
│   └── package.json
│
├── backend/
│   ├── routes/
│   │   └── prompts.js
│   ├── controllers/
│   │   └── promptController.js
│   ├── services/
│   │   ├── grokService.js
│   │   └── dbService.js
│   ├── models/
│   │   └── Prompt.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── config/
│   │   └── database.js
│   ├── .env.example
│   ├── server.js
│   └── package.json
│
├── .gitignore
├── README.md
├── PROJECT.md
├── ARCHITECTURE.md
└── SETUP.md
```

## Development Roadmap

### Phase 1: Frontend UI (No backend integration)
- [ ] Set up React project with Vite or CRA
- [ ] Create two-column layout (ChatGPT-like design)
- [ ] Build InputColumn component (textarea for manual input)
- [ ] Build OutputColumn component (display optimized prompt)
- [ ] Build ConvertButton component (styled button)
- [ ] Implement Context API for state management
- [ ] Add basic styling (professional appearance)

### Phase 2: Backend Setup
- [ ] Initialize Node.js + Express
- [ ] Set up MongoDB connection
- [ ] Create database schema (Prompt model)
- [ ] Implement basic CRUD routes
- [ ] Set up error handling middleware
- [ ] Add environment variables (.env)

### Phase 3: Integration
- [ ] Connect frontend to backend API
- [ ] Implement optimization flow (text → API → optimized)
- [ ] Add loading states and error handling
- [ ] Test end-to-end flow

### Phase 4: Whisper Integration
- [ ] Set up Whisper API client
- [ ] Implement speech-to-text in ConvertButton
- [ ] Display transcribed text in InputColumn
- [ ] Handle audio recording and upload

### Phase 5: Grok Integration
- [ ] Add Grok API service in backend
- [ ] Integrate Grok for prompt optimization
- [ ] Add domain detection (fitness/finance/engineering)
- [ ] Test optimization quality

### Phase 6: Polish & Features
- [ ] Add conversation history display
- [ ] Copy-to-clipboard functionality
- [ ] Delete history entries
- [ ] Improve UI/UX
- [ ] Add animations and transitions
- [ ] Performance optimization

### Phase 7: Testing & Deployment
- [ ] Frontend unit tests
- [ ] Backend unit tests
- [ ] Integration tests
- [ ] Local deployment validation
- [ ] Documentation

## API Endpoints

### Core Endpoints
```
POST /api/optimize
  Request: { prompt: string, domain?: string }
  Response: { originalPrompt, optimizedPrompt, domain, _id, createdAt }

GET /api/history
  Response: [{ _id, originalPrompt, optimizedPrompt, domain, createdAt }]

DELETE /api/history/:id
  Response: { success: true }
```

## Environment Variables

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000
```

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/prompt-engine
GROK_API_KEY=your_grok_api_key_here
WHISPER_API_KEY=your_whisper_api_key_here
NODE_ENV=development
```

## Next Steps
1. Choose to start with frontend UI or backend setup
2. Create project scaffolding
3. Install dependencies
4. Begin Phase 1 development
