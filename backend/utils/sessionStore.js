/**
 * In-memory session store for single-user learning app
 * Stores roadmap, quiz answers, and progress data
 */

class SessionStore {
  constructor() {
    this.sessions = new Map();
  }

  /**
   * Create or update a session
   * @param {string} sessionId - Unique session identifier
   * @param {object} data - Session data to store
   */
  setSession(sessionId, data) {
    const existing = this.sessions.get(sessionId) || {};
    this.sessions.set(sessionId, { ...existing, ...data, updatedAt: new Date() });
  }

  /**
   * Get session data
   * @param {string} sessionId - Unique session identifier
   * @returns {object|null} Session data or null if not found
   */
  getSession(sessionId) {
    return this.sessions.get(sessionId) || null;
  }

  /**
   * Store roadmap for a session
   * @param {string} sessionId - Session ID
   * @param {object} roadmap - Generated roadmap data
   */
  storeRoadmap(sessionId, roadmap) {
    const session = this.getSession(sessionId) || {};
    session.roadmap = roadmap;
    session.modules = {};
    this.setSession(sessionId, session);
  }

  /**
   * Get roadmap for a session
   * @param {string} sessionId - Session ID
   * @returns {object|null} Roadmap data
   */
  getRoadmap(sessionId) {
    const session = this.getSession(sessionId);
    return session?.roadmap || null;
  }

  /**
   * Store module progress
   * @param {string} sessionId - Session ID
   * @param {string} moduleId - Module identifier
   * @param {object} progress - Progress data (answers, score, etc.)
   */
  storeModuleProgress(sessionId, moduleId, progress) {
    const session = this.getSession(sessionId) || {};
    if (!session.modules) session.modules = {};
    session.modules[moduleId] = {
      ...(session.modules[moduleId] || {}),
      ...progress,
      updatedAt: new Date(),
    };
    this.setSession(sessionId, session);
  }

  /**
   * Get module progress
   * @param {string} sessionId - Session ID
   * @param {string} moduleId - Module identifier
   * @returns {object|null} Module progress data
   */
  getModuleProgress(sessionId, moduleId) {
    const session = this.getSession(sessionId);
    return session?.modules?.[moduleId] || null;
  }

  /**
   * Store answer history for rolling window
   * @param {string} sessionId - Session ID
   * @param {string} moduleId - Module ID
   * @param {object} answer - Answer data (correct, difficulty, timestamp)
   */
  addAnswer(sessionId, moduleId, answer) {
    const session = this.getSession(sessionId) || {};
    if (!session.modules) session.modules = {};
    if (!session.modules[moduleId]) session.modules[moduleId] = {};
    if (!session.modules[moduleId].answers) session.modules[moduleId].answers = [];

    session.modules[moduleId].answers.push({
      ...answer,
      timestamp: new Date(),
    });

    this.setSession(sessionId, session);
  }

  /**
   * Get last N answers for rolling window algorithm
   * @param {string} sessionId - Session ID
   * @param {string} moduleId - Module ID
   * @param {number} count - Number of recent answers to retrieve (default: 3)
   * @returns {array} Array of recent answers
   */
  getRecentAnswers(sessionId, moduleId, count = 3) {
    const moduleProgress = this.getModuleProgress(sessionId, moduleId);
    if (!moduleProgress?.answers) return [];
    return moduleProgress.answers.slice(-count);
  }

  /**
   * Clear a specific session
   * @param {string} sessionId - Session ID to clear
   */
  clearSession(sessionId) {
    this.sessions.delete(sessionId);
  }

  /**
   * Clear all sessions (for testing/reset)
   */
  clearAll() {
    this.sessions.clear();
  }

  /**
   * Get all session IDs (for debugging)
   * @returns {array} Array of session IDs
   */
  getAllSessionIds() {
    return Array.from(this.sessions.keys());
  }
}

// Export singleton instance
export default new SessionStore();
