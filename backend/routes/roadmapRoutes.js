import express from 'express';
import { generateRoadmap, getRoadmap } from '../controllers/roadmapController.js';

const router = express.Router();

// POST /api/roadmap/generate - Generate new roadmap
router.post('/generate', generateRoadmap);

// GET /api/roadmap/:sessionId - Get existing roadmap
router.get('/:sessionId', getRoadmap);

export default router;
