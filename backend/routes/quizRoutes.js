import express from 'express';
import {
  generateQuestion,
  evaluateAnswer,
  getModuleReport,
  getModuleProgress
} from '../controllers/quizController.js';

const router = express.Router();

// POST /api/quiz/question - Generate next question
router.post('/question', generateQuestion);

// POST /api/quiz/evaluate - Evaluate answer
router.post('/evaluate', evaluateAnswer);

// POST /api/quiz/report - Get module completion report
router.post('/report', getModuleReport);

// GET /api/quiz/progress/:sessionId/:moduleId - Get module progress
router.get('/progress/:sessionId/:moduleId', getModuleProgress);

export default router;
