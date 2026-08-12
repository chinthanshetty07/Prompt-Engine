# Prompt Engine Architecture

## Runtime

```text
React/Vite :3000 → Express :5001 → AI provider
                                  ↓
                              MongoDB :27017
```

## Layers

```text
React components
  → frontend API service
  → Express routes
  → controllers
  → coding policy / AI service / database service
  → external AI API or MongoDB
```

## Backend request flow

`POST /api/optimize` validates the request, rejects non-coding prompts, assigns the `software_engineering` domain, applies the principles in `backend/config/codingPrinciples.js`, calls the AI provider, saves the result, and returns JSON to the frontend.

## Backend structure

- `server.js`: Express startup, middleware, health endpoint, and route registration
- `config/database.js`: Mongoose connection
- `config/codingPrinciples.js`: coding-only scope detection and engineering rules
- `routes/prompts.js`: API route definitions
- `controllers/promptController.js`: request orchestration and validation
- `services/grokService.js`: AI provider integration and mock fallback
- `services/dbService.js`: MongoDB operations
- `models/Prompt.js`: prompt document schema
- `middleware/errorHandler.js`: centralized error responses

## Frontend structure

- `main.jsx`: React entrypoint
- `App.jsx`: main screen and optimization workflow
- `context/PromptContext.jsx`: shared UI state
- `components/InputColumn.jsx`: coding prompt input
- `components/OutputColumn.jsx`: optimized prompt output
- `services/api.js`: backend requests
- `styles/`: layout and component styling
