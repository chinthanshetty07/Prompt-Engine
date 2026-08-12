# Getting Started with Prompt Engine

## Requirements

- Node.js 16+
- npm
- MongoDB local or MongoDB Atlas
- AI provider API key for non-mock optimization

## Install

```bash
cd frontend && npm install
cd ../backend && npm install
```

## Configure backend

```bash
cd backend
cp .env.example .env
```

Set `MONGODB_URI`, `GROK_API_KEY`, and `GROK_API_BASE_URL` in `backend/.env`.

## Run locally

Start MongoDB, then use separate terminals:

```bash
cd backend
npm run dev
```

```bash
cd frontend
npm run dev
```

Open `http://localhost:3000`. The backend health check is `http://localhost:5001/api/health`.

## Use the application

1. Enter a coding or software-engineering request.
2. Click `Optimize Prompt`.
3. Copy the optimized result.

Non-coding requests are rejected by the backend.
