# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

**Nayi Disha** is an AI-driven personalized learning platform for web development skills (JavaScript, React, Python, Node.js). It features:

- AI-powered roadmap generation using Google Gemini
- Adaptive quiz system with rolling window difficulty algorithm
- Real-time progress tracking and analytics
- React + Vite frontend with Tailwind CSS
- Express.js backend with in-memory session storage

## Development Commands

### Frontend (React + Vite)
```bash
npm install              # Install frontend dependencies
npm start                # Start dev server (http://localhost:5173)
npm run build            # Build for production
npm run serve            # Preview production build
```

### Backend (Express.js)
```bash
cd backend
npm install              # Install backend dependencies
npm run dev              # Start with auto-reload (node --watch)
npm start                # Start production server (http://localhost:5000)
```

### Running Both Servers
You need to run both frontend and backend simultaneously:
1. Terminal 1: `npm start` (frontend on port 5173)
2. Terminal 2: `cd backend && npm run dev` (backend on port 5000)

## Architecture

### Frontend Structure
```
src/
├── pages/              # Route pages
│   ├── landing-page/
│   ├── subject-selection/
│   ├── goal-selection/
│   ├── skill-level-selection/
│   ├── ai-generated-roadmap/
│   └── module-quiz-interface/
├── components/         # Reusable UI components
├── services/
│   └── api.js         # Backend API integration
└── routes.jsx         # React Router configuration
```

### Backend Structure
```
backend/
├── server.js           # Express app entry point
├── routes/
│   ├── roadmapRoutes.js    # Roadmap generation endpoints
│   └── quizRoutes.js       # Quiz and evaluation endpoints
├── controllers/
│   ├── roadmapController.js
│   └── quizController.js
├── services/
│   └── geminiService.js    # Google Gemini AI integration
└── utils/
    ├── sessionStore.js     # In-memory data storage
    └── adaptiveAlgorithm.js # Rolling window difficulty logic
```

### API Endpoints

**Roadmap Endpoints:**
- `POST /api/roadmap/generate` - Generate AI roadmap (subject, goal, level)
- `GET /api/roadmap/:sessionId` - Retrieve existing roadmap

**Quiz Endpoints:**
- `POST /api/quiz/question` - Generate next adaptive question
- `POST /api/quiz/evaluate` - Evaluate answer and update progress
- `POST /api/quiz/report` - Generate module completion report
- `GET /api/quiz/progress/:sessionId/:moduleId` - Get module progress

**Health Check:**
- `GET /api/health` - Backend health status

## Configuration

### Backend Environment Variables (backend/.env)
```bash
PORT=5000
GEMINI_API_KEY=your-gemini-api-key-here  # Required for AI features
FRONTEND_URL=http://localhost:5173
```

### Frontend Environment Variables (.env)
```bash
VITE_API_URL=http://localhost:5000/api
```

## Key Features

### Adaptive Quiz System
The backend implements a **rolling window algorithm** (3-question window):
- Score calculation: +1 for correct, -1 for incorrect
- Score ≥ 2 → increase to "hard"
- Score ≤ -2 → decrease to "easy"
- Score between -1 and 1 → keep "medium"

### Quiz Termination Conditions
- Minimum 10 questions required
- Maximum 20 questions allowed
- Auto-end if accuracy ≥ 70% after 10 questions
- Early mastery: ≥ 80% accuracy in first 10 questions

### Session Management
- Single-user in-memory sessions (no database)
- Session ID stored in localStorage
- Automatic session creation on first use
- Data persists during server runtime

## Important Notes

- Backend requires a valid Google Gemini API key to function
- All AI responses use structured JSON schemas for consistency
- Frontend has fallback to localStorage if backend is unavailable
- No authentication system - designed for single-user local development
- Session data is lost when backend server restarts
