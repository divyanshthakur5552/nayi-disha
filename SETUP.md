# 🚀 Nayi Disha - Setup Guide

Complete setup guide for getting the Nayi Disha learning platform running locally.

## Prerequisites

- Node.js 18+ installed ([Download](https://nodejs.org/))
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))
- Two terminal windows (for running frontend and backend simultaneously)

## Step-by-Step Setup

### 1. Install Frontend Dependencies

```bash
npm install
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
cd ..
```

### 3. Configure Environment Variables

#### Backend Configuration

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Open the `.env` file (already created) and update your Gemini API key:
   ```bash
   GEMINI_API_KEY=your-actual-gemini-api-key-here
   ```

3. Return to root directory:
   ```bash
   cd ..
   ```

#### Getting a Gemini API Key

1. Visit https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key
5. Paste it in `backend/.env` file

#### Frontend Configuration (Optional)

The frontend `.env` file is already configured with default values:
```bash
VITE_API_URL=http://localhost:5000/api
```

You can modify this if you change the backend port.

### 4. Start the Application

You need to run **both** frontend and backend servers simultaneously.

#### Option 1: Using Two Terminals

**Terminal 1 - Frontend:**
```bash
npm start
```
This will start the frontend on http://localhost:5173

**Terminal 2 - Backend:**
```bash
cd backend
npm run dev
```
This will start the backend on http://localhost:5000

#### Option 2: Using PowerShell (Windows)

```powershell
# Start both servers in background
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "npm start"
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "cd backend; npm run dev"
```

### 5. Verify Setup

1. Open your browser and navigate to http://localhost:5173
2. You should see the Nayi Disha landing page
3. Backend health check: http://localhost:5000/api/health

## Testing the Backend API

You can test the backend endpoints using curl or any API client:

```bash
# Health check
curl http://localhost:5000/api/health

# Generate a roadmap
curl -X POST http://localhost:5000/api/roadmap/generate \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "JavaScript",
    "goal": "Full-Stack Development",
    "level": "Intermediate"
  }'
```

## Project Structure Overview

```
nayi-disha/
├── frontend (React + Vite)
│   ├── src/
│   │   ├── pages/           # Route components
│   │   ├── components/      # Reusable UI components
│   │   ├── services/        # API integration
│   │   └── routes.jsx       # Routing configuration
│   ├── .env                 # Frontend environment variables
│   └── package.json
│
└── backend/ (Express.js)
    ├── routes/              # API routes
    ├── controllers/         # Business logic
    ├── services/            # Gemini AI integration
    ├── utils/               # Helper functions
    ├── .env                 # Backend environment variables
    ├── server.js            # Entry point
    └── package.json
```

## Common Issues

### Port Already in Use

If you get a "port already in use" error:

**Frontend (Port 5173):**
```bash
# Kill the process using port 5173
npx kill-port 5173
```

**Backend (Port 5000):**
```bash
# Kill the process using port 5000
npx kill-port 5000
```

### CORS Errors

Make sure both servers are running and the CORS settings in `backend/server.js` match your frontend URL.

### "Cannot find module" Errors

Run `npm install` in both the root directory and the backend directory.

### Gemini API Errors

- Verify your API key is correct in `backend/.env`
- Check your Gemini API quota at https://makersuite.google.com
- Ensure there are no spaces before or after the API key

## Development Workflow

1. Make code changes
2. Frontend auto-reloads (Vite HMR)
3. Backend auto-reloads (node --watch flag)
4. Test in browser at http://localhost:5173

## Next Steps

1. ✅ Complete the onboarding flow (Subject → Goal → Level)
2. ✅ Generate your first AI roadmap
3. ✅ Start a quiz module
4. ✅ Experience the adaptive difficulty algorithm
5. ✅ View your progress and completion report

## Production Build

To build for production:

```bash
# Build frontend
npm run build

# Start backend in production mode
cd backend
npm start
```

The frontend build will be in the `dist/` directory.

## Need Help?

- Check the main [README.md](./README.md) for project overview
- See [WARP.md](./WARP.md) for detailed architecture
- Review [backend/README.md](./backend/README.md) for API documentation

## Features Checklist

- [x] Backend API with Express.js
- [x] Google Gemini AI integration
- [x] Adaptive quiz algorithm
- [x] Session management
- [x] Frontend API service layer
- [ ] Connect frontend pages to backend
- [ ] Dashboard analytics
- [ ] Module completion reports
- [ ] Progress tracking UI

---

**Happy Learning! 🎓**
