# Prompt Engine - Project Specification

## Overview
A professional prompt optimization engine that understands user intent and converts natural language (text or audio) into optimized, AI-friendly prompts. Especially powerful for fitness data, financial data, and software engineering domains (but works across all domains).

## Core Features

### 1. **User Interface**
- Professional ChatGPT-like design
- Split-column layout:
  - **Left Column**: Audio input → Text conversion display
  - **Right Column**: Optimized prompt output
- Convert button (center-bottom) to activate audio input
- Real-time display of results

### 2. **Input Methods**
- Text input (optional)
- Audio input with speech-to-text conversion
- Convert button triggers audio recording

### 3. **Processing Pipeline**
```
User Input (text/audio) 
    ↓
Speech-to-text conversion (if audio)
    ↓
Send to backend
    ↓
Grok API analysis & optimization
    ↓
Return optimized prompt to frontend
    ↓
Display in right column
```

### 4. **Domain Expertise**
- Primary domains: Fitness, Finance, Software Engineering
- Secondary: Any domain (general prompt optimization)
- Context-aware understanding of user intent

## Tech Stack

### Frontend
- **Framework**: React.js
- **Styling**: HTML, CSS, JavaScript
- **Speech-to-text**: Web Speech API (or Whisper API)
- **State Management**: React Context API (or Redux)

### Backend
- **Runtime**: Node.js
- **API**: Grok API for prompt optimization
- **Architecture**: REST API or WebSocket

## Project Structure (TBD)
```
prompt-engine/
├── frontend/          (React app)
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/           (Node.js)
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   └── package.json
├── .gitignore
├── README.md
└── PROJECT.md
```

## Pending Decisions
- [ ] Speech-to-text library preference (Web Speech API vs Whisper)
- [ ] Grok API key setup
- [ ] State management solution (Context API vs Redux)
- [ ] Data persistence requirements
- [ ] Deployment target (local vs cloud hosting)

## MVP Goals
1. Text-to-prompt optimization via Grok
2. Audio-to-text conversion
3. Professional UI with two-column layout
4. Real-time prompt optimization display

## Next Steps
1. Answer clarification questions
2. Create detailed architecture plan
3. Set up project scaffolding
4. Build frontend UI
5. Build backend API
6. Integrate Grok API
7. Test end-to-end
