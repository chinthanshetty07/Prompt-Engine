# Prompt Engine Project Specification

## Overview

Prompt Engine optimizes coding, software engineering, and technical implementation requests into precise prompts for an AI model.

## Core flow

```text
Coding prompt → backend scope validation → engineering principles → AI optimization → MongoDB history
```

## Core features

- React two-column interface for coding prompt input and optimized output
- Backend enforcement of coding-only requests
- Predefined software-engineering principles injected into every AI request
- MongoDB persistence for original and optimized prompts
- Copy-to-clipboard support
- History, search, deletion, and statistics API endpoints

## Technology

- Frontend: React, Vite, Context API, CSS
- Backend: Node.js, Express, Axios
- Database: MongoDB with Mongoose
- AI integration: OpenAI-compatible chat completion API

## MVP goals

1. Accept coding and software-engineering prompts.
2. Reject clearly unrelated requests.
3. Produce technically precise optimized prompts.
4. Persist optimization history.
