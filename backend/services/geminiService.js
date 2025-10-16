import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Gemini AI Service for generating roadmaps and quiz questions
 */
class GeminiService {
  constructor() {
    this.model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });
  }

  /**
   * Generate a personalized learning roadmap
   * @param {string} subject - Learning subject (JavaScript, React, Python, Node.js)
   * @param {string} goal - Learning goal (Web Dev, DSA, Full-Stack, etc.)
   * @param {string} level - Skill level (Basic, Intermediate, Advanced)
   * @returns {Promise<object>} Structured roadmap with modules
   */
  async generateRoadmap(subject, goal, level) {
    const prompt = `You are an expert learning path designer. Create a detailed learning roadmap for:

Subject: ${subject}
Goal: ${goal}
Level: ${level}

Generate a structured JSON roadmap with 8-12 modules. Each module should have:
- id: unique identifier (module-1, module-2, etc.)
- title: concise module name
- description: 2-3 sentences explaining what the learner will master
- estimatedHours: realistic time estimate (1-8 hours)
- topics: array of 3-5 key topics covered
- difficulty: one of ["easy", "medium", "hard"]

Return ONLY valid JSON in this exact format:
{
  "roadmap": {
    "title": "Complete roadmap title",
    "description": "Brief overview of the learning journey",
    "totalModules": 10,
    "estimatedTotalHours": 45,
    "modules": [
      {
        "id": "module-1",
        "title": "Module Title",
        "description": "Module description",
        "estimatedHours": 4,
        "topics": ["topic1", "topic2", "topic3"],
        "difficulty": "easy"
      }
    ]
  }
}`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = result.response.text();
      
      console.log('\n📋 Gemini Roadmap Response:');
      console.log('─'.repeat(80));
      console.log(response.substring(0, 500) + (response.length > 500 ? '...' : ''));
      console.log('─'.repeat(80));
      
      // Extract JSON from markdown code blocks if present
      // Match: ```json ... ```, ```javascript ... ```, or ``` ... ```
      let jsonText = response;
      const codeBlockMatch = response.match(/```(?:json|javascript)?\s*([\s\S]*?)```/);
      if (codeBlockMatch) {
        jsonText = codeBlockMatch[1];
      }
      
      const parsedData = JSON.parse(jsonText.trim());
      
      console.log('\n✅ Successfully parsed roadmap with', parsedData.roadmap?.modules?.length || 0, 'modules\n');
      
      return parsedData;
    } catch (error) {
      console.error('\n❌ Error generating roadmap:', error.message);
      throw new Error('Failed to generate roadmap from AI');
    }
  }

  /**
   * Generate an adaptive quiz question
   * @param {string} moduleTitle - Current module title
   * @param {array} topics - Array of topics for the module
   * @param {string} difficulty - Question difficulty (easy, medium, hard)
   * @returns {Promise<object>} Quiz question with options and explanation
   */
  async generateQuestion(moduleTitle, topics, difficulty) {
    const difficultyGuidance = {
      easy: 'Basic understanding, recall, and simple application',
      medium: 'Practical application, problem-solving, and concept integration',
      hard: 'Advanced analysis, edge cases, optimization, and deep understanding'
    };

    const prompt = `You are an expert quiz designer. Create a ${difficulty} difficulty multiple-choice question for:

Module: ${moduleTitle}
Topics: ${topics.join(', ')}
Difficulty Level: ${difficulty} - ${difficultyGuidance[difficulty]}

Generate a single quiz question in this EXACT JSON format:
{
  "question": "Clear, specific question text",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctIndex": 0,
  "explanation": "Detailed explanation of why the answer is correct and others are wrong",
  "difficulty": "${difficulty}",
  "topic": "specific topic from the list"
}

Requirements:
- Question should be practical and scenario-based when possible
- All 4 options should be plausible
- Explanation should be educational and comprehensive
- Return ONLY valid JSON, no markdown formatting`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = result.response.text();
      
      console.log('\n❓ Gemini Question Response:');
      console.log('─'.repeat(80));
      console.log(response.substring(0, 300) + (response.length > 300 ? '...' : ''));
      console.log('─'.repeat(80));
      
      // Extract JSON from markdown code blocks if present
      // Match: ```json ... ```, ```javascript ... ```, or ``` ... ```
      let jsonText = response;
      const codeBlockMatch = response.match(/```(?:json|javascript)?\s*([\s\S]*?)```/);
      if (codeBlockMatch) {
        jsonText = codeBlockMatch[1];
      }
      
      const questionData = JSON.parse(jsonText.trim());
      
      // Add unique ID
      questionData.id = `q-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      console.log('\n✅ Generated', questionData.difficulty, 'question on topic:', questionData.topic || 'N/A', '\n');
      
      return questionData;
    } catch (error) {
      console.error('\n❌ Error generating question:', error.message);
      throw new Error('Failed to generate question from AI');
    }
  }

  /**
   * Generate module completion report with insights
   * @param {object} moduleData - Module information
   * @param {object} performance - User performance stats
   * @returns {Promise<object>} Completion report with recommendations
   */
  async generateModuleReport(moduleData, performance) {
    const { accuracy, totalQuestions, correctAnswers, timeSpent, difficultyBreakdown } = performance;

    const prompt = `You are a learning analytics expert. Generate a completion report for:

Module: ${moduleData.title}
Performance:
- Accuracy: ${accuracy}%
- Questions Answered: ${totalQuestions}
- Correct Answers: ${correctAnswers}
- Time Spent: ${timeSpent} minutes
- Difficulty Breakdown: ${JSON.stringify(difficultyBreakdown)}

Generate a JSON report with:
{
  "overallScore": 85,
  "strengths": ["strength 1", "strength 2"],
  "weaknesses": ["area 1", "area 2"],
  "recommendations": ["next step 1", "next step 2"],
  "suggestedResources": [
    {
      "title": "Resource name",
      "type": "article/video/tutorial",
      "url": "https://example.com",
      "reason": "Why this resource is helpful"
    }
  ],
  "careerReadinessImpact": "Brief assessment of how this module contributes to career readiness"
}

Provide honest, constructive feedback. Return ONLY valid JSON.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = result.response.text();
      
      console.log('\n📊 Gemini Report Response:');
      console.log('─'.repeat(80));
      console.log(response.substring(0, 400) + (response.length > 400 ? '...' : ''));
      console.log('─'.repeat(80));
      
      // Extract JSON from markdown code blocks if present
      // Match: ```json ... ```, ```javascript ... ```, or ``` ... ```
      let jsonText = response;
      const codeBlockMatch = response.match(/```(?:json|javascript)?\s*([\s\S]*?)```/);
      if (codeBlockMatch) {
        jsonText = codeBlockMatch[1];
      }
      
      const reportData = JSON.parse(jsonText.trim());
      
      console.log('\n✅ Generated report with score:', reportData.overallScore || 'N/A', '\n');
      
      return reportData;
    } catch (error) {
      console.error('\n❌ Error generating report:', error.message);
      throw new Error('Failed to generate completion report');
    }
  }
}

export default new GeminiService();
