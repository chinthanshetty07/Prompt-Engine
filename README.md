# 🚀 Prompt Engine

A professional AI-powered prompt optimization engine that converts natural language (text or audio) into optimized, AI-friendly prompts. Perfect for fitness, finance, software engineering, and beyond.

## ✨ Features

- **Professional UI** - ChatGPT-like design with split-column layout
- **Smart Optimization** - Powered by Grok AI for intelligent prompt analysis
- **Conversation History** - Save and manage all your prompts in MongoDB
- **Dark Mode** - Beautiful light and dark theme support
- **Responsive Design** - Works seamlessly on all screen sizes

## 🛠 Tech Stack

### Frontend
- React 18.2 with Vite
- Context API for state management
- HTML/CSS/JavaScript
- Responsive grid layout

### Backend
- Node.js + Express
- MongoDB for data persistence
- Grok API integration

## 📋 Project Structure

```
prompt-engine/
├── frontend/                (React app)
│   ├── src/
│   │   ├── components/      (React components)
│   │   ├── context/         (Context API)
│   │   ├── services/        (API calls)
│   │   └── styles/          (CSS files)
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── backend/                 (Node.js - coming soon)
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── models/
│   └── package.json
│
├── PROJECT.md              (Project specification)
├── ARCHITECTURE.md         (Architecture details)
└── README.md              (This file)
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn
- Git

### Frontend Setup

1. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Create environment file**
   ```bash
   cp .env.example .env
   # Edit .env if needed (defaults to http://localhost:5000)
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   
   The app will open at `http://localhost:3000`

### Backend Setup (Coming Next)
Backend will be available in the `backend/` directory with Node.js and Express.

## 📖 How to Use

1. **Text Input**: Type or paste your prompt in the left column
2. **Audio Input**: Click the "Convert Audio" button to record your prompt
3. **Optimize**: Click "⚡ Optimize Prompt" to send it to Grok
4. **Copy**: Click the copy button to save the optimized prompt to clipboard
5. **History**: All prompts are saved automatically to your database

## 🔌 API Endpoints (Backend)

```
POST /api/optimize
  - Optimize a prompt using Grok AI

GET /api/history
  - Retrieve all saved prompts

DELETE /api/history/:id
  - Delete a specific prompt
```

## 🎨 UI Components

- **InputColumn** - Text input area with character counter
- **OutputColumn** - Displays optimized prompts with copy functionality
- **App** - Main component that orchestrates the flow

## 🔐 Environment Variables

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000
```

### Backend (.env) - Coming Soon
```
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/prompt-engine
GROK_API_KEY=your_grok_api_key
NODE_ENV=development
```

## 📝 Development Roadmap

- [x] Phase 1: Frontend UI
- [ ] Phase 2: Backend Setup
- [ ] Phase 3: API Integration
- [ ] Phase 4: Grok Integration
- [ ] Phase 5: Polish & Features
- [ ] Phase 6: Testing & Deployment

## 🤝 Contributing

This is a personal project. Feel free to fork and customize!

## 📄 License

MIT

## 🙋 Support

For questions or issues, check the `PROJECT.md` and `ARCHITECTURE.md` files for detailed specifications.

---

**Built with ❤️ for AI-powered prompt optimization**
# Prompt-Engine
# Prompt-Engine
