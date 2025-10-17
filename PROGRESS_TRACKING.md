# Progress Tracking Implementation

## Overview
Complete implementation of user progress tracking with database persistence, preventing roadmap regeneration, and real-time progress display on the profile page.

## Workflow

### 1. User Authentication
- User signs in using email/password (Firebase Auth)
- User data is automatically synced to Supabase `users` table
- Firebase UID is used as the primary identifier

### 2. Learning Path Selection
```
User Flow:
1. Select Subject (e.g., JavaScript)
2. Select Learning Goal (e.g., Full Stack Development)
3. Select Skill Level (Basic/Intermediate/Advanced)
4. Generate Roadmap
```

### 3. Roadmap Generation (One-Time)
**File**: `src/pages/skill-level-selection/components/RoadmapGenerationModal.jsx`

**Logic**:
```javascript
1. Check if user is authenticated
2. Check if roadmap already exists in database
   - If YES: Load existing roadmap (prevents regeneration)
   - If NO: Generate new roadmap via AI
3. Save roadmap to database with:
   - User selections (subject, goal, skill level)
   - Complete roadmap structure
   - Initialize all module scores to 0
   - Set overall_progress to 0
4. Navigate to roadmap page
```

**Database Operation**:
```javascript
await userService.saveRoadmap(user.uid, roadmapData, {
  subject: "JavaScript",
  goal: "Full Stack Development", 
  skillLevel: "intermediate",
  selectedSubjects: ["JavaScript"]
});
```

### 4. Module Quiz Completion
**File**: `src/pages/module-quiz-interface/index.jsx`

**Logic**:
```javascript
1. User completes quiz questions
2. On quiz finish:
   - Calculate final accuracy
   - Check if passed (>= 70%)
   - If passed:
     a. Save score to database
     b. Add module to completed_modules array
     c. Update overall_progress percentage
     d. Update quiz_scores object
```

**Database Operation**:
```javascript
await userService.updateModuleProgress(user.uid, moduleId, {
  quizScore: 85.5,  // accuracy percentage
  currentModule: null  // clear since completed
});
```

### 5. Progress Display
**Files**:
- `src/pages/Profile/index.jsx` - Profile page with stats
- `src/pages/ai-generated-roadmap/index.jsx` - Roadmap with progress

**Profile Page Shows**:
- Overall completion percentage
- Number of completed modules
- Skills breakdown (calculated from module scores)
- Real-time data from database

**Roadmap Page Shows**:
- Module status (completed/in-progress/available)
- Individual module scores
- Overall progress bar
- Completed module indicators

## Database Schema

### `users` Table
```sql
- id: UUID (primary key)
- uid: TEXT (Firebase UID, unique)
- email: TEXT
- display_name: TEXT
- photo_url: TEXT
- provider: TEXT
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### `user_progress` Table
```sql
- id: UUID (primary key)
- user_uid: TEXT (foreign key to users.uid)
- goal: TEXT (e.g., "Full Stack Development")
- skill_level: TEXT (e.g., "intermediate")
- selected_subjects: JSONB (array of subjects)
- roadmap: JSONB (complete roadmap structure)
- current_module: TEXT (currently active module)
- completed_modules: TEXT[] (array of completed module IDs)
- quiz_scores: JSONB (object: moduleId -> score)
- overall_progress: DECIMAL(5,2) (percentage 0-100)
- roadmap_generated_at: TIMESTAMP
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### Example `quiz_scores` JSONB
```json
{
  "module-1": 85.5,
  "module-2": 92.0,
  "module-3": 78.5
}
```

## API Methods

### userService.saveRoadmap()
**Purpose**: Save newly generated roadmap (one-time)
```javascript
await userService.saveRoadmap(uid, roadmapData, selections);
```
**Database Changes**:
- Inserts/updates user_progress record
- Initializes all module scores to 0
- Sets overall_progress to 0
- Stores complete roadmap structure

### userService.updateModuleProgress()
**Purpose**: Update progress when module is completed
```javascript
await userService.updateModuleProgress(uid, moduleId, {
  quizScore: 85.5,
  currentModule: null
});
```
**Database Changes**:
- Adds moduleId to completed_modules array
- Updates quiz_scores object
- Recalculates overall_progress percentage
- Updates updated_at timestamp

### userService.getProgress()
**Purpose**: Retrieve user's current progress
```javascript
const progress = await userService.getProgress(uid);
```
**Returns**:
```javascript
{
  user_uid: "firebase-uid",
  goal: "Full Stack Development",
  skill_level: "intermediate",
  roadmap: { /* complete roadmap */ },
  completed_modules: ["module-1", "module-2"],
  quiz_scores: { "module-1": 85.5, "module-2": 92.0 },
  overall_progress: 20.0,
  ...
}
```

## Key Features

### ✅ Prevents Roadmap Regeneration
- Checks database before generating new roadmap
- If roadmap exists, loads it instead of regenerating
- Maintains user's progress history

### ✅ Granular Progress Tracking
- Tracks individual module scores
- Tracks completed vs in-progress modules
- Calculates overall completion percentage

### ✅ Real-Time Profile Updates
- Profile page fetches latest data from database
- Shows actual completion stats
- Calculates skills from module scores

### ✅ Persistent Storage
- All progress saved to Supabase
- Survives browser refresh
- Available across devices

### ✅ Score Requirements
- Only saves progress when quiz is passed (≥70%)
- Prevents incomplete modules from counting
- Maintains quality standards

## Migration

### For New Installations
Run: `supabase-schema.sql`

### For Existing Installations
Run: `supabase-migration.sql`

This will add the new columns (`overall_progress`, `roadmap_generated_at`) to existing tables.

## Testing Checklist

- [ ] User signs in successfully
- [ ] Roadmap generation creates database entry
- [ ] Attempting to regenerate loads existing roadmap
- [ ] Module completion saves score to database
- [ ] Profile page shows real completion stats
- [ ] Roadmap page marks completed modules correctly
- [ ] Overall progress percentage calculates correctly
- [ ] Multiple module completions update progress incrementally
- [ ] Failed quizzes (<70%) don't save progress
- [ ] User can view progress across sessions

## File Changes Summary

### Modified Files
1. `supabase-schema.sql` - Updated schema
2. `src/services/userService.js` - Added saveRoadmap, updated updateModuleProgress
3. `src/pages/skill-level-selection/components/RoadmapGenerationModal.jsx` - Check existing + save
4. `src/pages/module-quiz-interface/index.jsx` - Save score on completion
5. `src/pages/Profile/index.jsx` - Load real data from database
6. `src/pages/ai-generated-roadmap/index.jsx` - Load progress from database

### New Files
1. `supabase-migration.sql` - Migration script for existing installations
2. `PROGRESS_TRACKING.md` - This documentation file

## Future Enhancements

1. **Leaderboard**: Add ranking based on overall_progress
2. **Achievements**: Award badges for milestones
3. **Analytics**: Track time spent per module
4. **Retry Logic**: Allow retaking failed modules
5. **Progress History**: Store historical progress data
6. **Export Progress**: Download progress report as PDF
7. **Social Sharing**: Share achievements on social media
