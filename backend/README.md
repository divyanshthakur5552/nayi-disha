# Nayi Disha Backend API

Express.js backend for the Nayi Disha AI-powered learning platform.

## Features

- 🤖 Google Gemini AI integration for roadmap and question generation
- 📊 Adaptive quiz system with rolling window difficulty algorithm
- 💾 In-memory session storage for single-user experience
- 🔒 Security headers with Helmet
- 📝 Request logging with Morgan
- ✅ Input validation and error handling

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the backend directory:

```bash
PORT=5000
GEMINI_API_KEY=your-actual-gemini-api-key-here
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

**To get a Gemini API key:**
1. Visit https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and paste it in your `.env` file

### 3. Start the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Documentation

### Health Check
```
GET /api/health
```
Returns server health status.

### Roadmap Endpoints

#### Generate Roadmap
```
POST /api/roadmap/generate
Content-Type: application/json

{
  "subject": "JavaScript",
  "goal": "Full-Stack Development",
  "level": "Intermediate",
  "sessionId": "optional-session-id"
}
```

#### Get Roadmap
```
GET /api/roadmap/:sessionId
```

### Quiz Endpoints

#### Generate Question
```
POST /api/quiz/question
Content-Type: application/json

{
  "sessionId": "session-123",
  "moduleId": "module-1",
  "moduleTitle": "JavaScript Basics",
  "topics": ["variables", "functions", "arrays"]
}
```

#### Evaluate Answer
```
POST /api/quiz/evaluate
Content-Type: application/json

{
  "sessionId": "session-123",
  "moduleId": "module-1",
  "questionId": "q-12345",
  "userAnswer": 2
}
```

#### Get Module Report
```
POST /api/quiz/report
Content-Type: application/json

{
  "sessionId": "session-123",
  "moduleId": "module-1",
  "moduleTitle": "JavaScript Basics"
}
```

#### Get Module Progress
```
GET /api/quiz/progress/:sessionId/:moduleId
```

## Project Structure

```
backend/
├── server.js              # Express app entry point
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables (create this)
├── routes/
│   ├── roadmapRoutes.js   # Roadmap API routes
│   └── quizRoutes.js      # Quiz API routes
├── controllers/
│   ├── roadmapController.js  # Roadmap business logic
│   └── quizController.js     # Quiz business logic
├── services/
│   └── geminiService.js   # Google Gemini AI integration
└── utils/
    ├── sessionStore.js    # In-memory session management
    └── adaptiveAlgorithm.js  # Adaptive quiz algorithm
```

## Adaptive Quiz Algorithm

The backend uses a **rolling window algorithm** to adjust question difficulty:

1. **Initial State**: First question is always "medium"
2. **Rolling Window**: Tracks last 3 answers
3. **Scoring System**:
   - Correct answer: +1 point
   - Incorrect answer: -1 point
4. **Difficulty Adjustment**:
   - Score ≥ 2: Increase to "hard"
   - Score ≤ -2: Decrease to "easy"
   - Score -1 to 1: Stay "medium"

### Quiz Termination

Quiz ends when:
- User answers minimum 10 questions AND accuracy ≥ 70%
- User answers exactly 10 questions with accuracy ≥ 80%
- User reaches maximum 20 questions

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `GEMINI_API_KEY` | Google Gemini API key | Required |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:5173 |
| `NODE_ENV` | Environment mode | development |

## Dependencies

### Production
- `express` - Web framework
- `@google/generative-ai` - Gemini AI SDK
- `cors` - CORS middleware
- `dotenv` - Environment variables
- `helmet` - Security headers
- `morgan` - HTTP logging
- `express-validator` - Input validation

## Development Notes

- Uses ES modules (`"type": "module"` in package.json)
- Node.js 18+ recommended for `--watch` flag
- Data is stored in memory and lost on server restart
- Single-user design - no authentication required
- All AI prompts use structured JSON schemas

## Troubleshooting

### "GEMINI_API_KEY not set" warning
Make sure you've created a `.env` file in the backend directory with a valid Gemini API key.

### CORS errors
Check that `FRONTEND_URL` in `.env` matches your frontend URL.

### Module import errors
Ensure you're using Node.js 14+ and the package.json has `"type": "module"`.

## License

MIT
