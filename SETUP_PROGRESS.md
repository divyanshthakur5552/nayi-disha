# Quick Setup Guide - Progress Tracking

## 1. Database Setup

### Option A: New Installation
```bash
# Run the main schema file
psql -U postgres -d your_database < supabase-schema.sql
```

### Option B: Existing Installation
```bash
# Run the migration file
psql -U postgres -d your_database < supabase-migration.sql
```

Or via Supabase Dashboard:
1. Go to SQL Editor
2. Copy contents of `supabase-migration.sql`
3. Execute query

## 2. Verify Installation

Check that `user_progress` table has these columns:
- `overall_progress` (DECIMAL)
- `roadmap_generated_at` (TIMESTAMP)
- `quiz_scores` (JSONB with default `{}`)

## 3. Test the Flow

### Step 1: Sign In
- Go to `/auth`
- Sign in with email/password

### Step 2: Generate Roadmap
- Select subject: `JavaScript`
- Select goal: `Full Stack Development`
- Select level: `Intermediate`
- Click "Generate My Roadmap"

**Expected**: 
- Roadmap is saved to database
- Redirected to roadmap page
- All module scores initialized to 0

### Step 3: Try Regenerating
- Navigate back to skill selection
- Try to generate roadmap again

**Expected**:
- Should load existing roadmap from database
- Should NOT generate new roadmap
- Progress message: "Loading existing roadmap..."

### Step 4: Complete a Module
- Click on a module
- Complete the quiz with >70% accuracy
- Finish the quiz

**Expected**:
- Score saved to database
- Module marked as completed
- Overall progress updated

### Step 5: Check Profile
- Navigate to `/profile`

**Expected**:
- Shows overall progress percentage
- Shows completed modules count
- Shows skills calculated from scores
- All data from database (not dummy data)

## 4. Common Issues

### Issue: "Please sign in to generate roadmap"
**Solution**: User must be authenticated. Check:
```javascript
const { user } = useAuth();
console.log('User:', user); // Should not be null
```

### Issue: Roadmap regenerates every time
**Solution**: Check if `saveRoadmap` is being called:
```javascript
// In RoadmapGenerationModal.jsx
const existingProgress = await userService.getProgress(user.uid);
console.log('Existing progress:', existingProgress);
```

### Issue: Profile shows "No Skills Yet"
**Solution**: Complete at least one module with >70% score:
```javascript
// Check database
SELECT completed_modules, quiz_scores FROM user_progress WHERE user_uid = 'your-uid';
```

### Issue: Module score not saving
**Solution**: Check quiz completion logic:
```javascript
// In module-quiz-interface/index.jsx
if (user && finalAccuracy >= 70) {
  await userService.updateModuleProgress(user.uid, moduleData?.id, {
    quizScore: finalAccuracy
  });
}
```

## 5. Database Queries for Debugging

### Check user progress
```sql
SELECT 
  user_uid,
  goal,
  skill_level,
  overall_progress,
  completed_modules,
  quiz_scores
FROM user_progress
WHERE user_uid = 'your-firebase-uid';
```

### Check completed modules count
```sql
SELECT 
  user_uid,
  array_length(completed_modules, 1) as completed_count,
  overall_progress
FROM user_progress;
```

### View all scores
```sql
SELECT 
  user_uid,
  quiz_scores::text
FROM user_progress;
```

### Reset user progress (for testing)
```sql
UPDATE user_progress
SET 
  completed_modules = ARRAY[]::text[],
  quiz_scores = '{}'::jsonb,
  overall_progress = 0
WHERE user_uid = 'your-firebase-uid';
```

## 6. Environment Variables

Ensure these are set in `.env`:
```env
# Supabase
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key

# Firebase
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-domain
# ... other Firebase config
```

## 7. Key Files to Check

1. **Database Schema**
   - `supabase-schema.sql` - Full schema
   - `supabase-migration.sql` - Migration for existing DB

2. **Services**
   - `src/services/userService.js` - Database operations
   - `src/services/api.js` - API calls
   - `src/contexts/AuthContext.jsx` - Authentication

3. **Pages**
   - `src/pages/skill-level-selection/components/RoadmapGenerationModal.jsx` - Roadmap generation
   - `src/pages/module-quiz-interface/index.jsx` - Quiz completion
   - `src/pages/Profile/index.jsx` - Progress display
   - `src/pages/ai-generated-roadmap/index.jsx` - Roadmap with progress

## 8. Workflow Summary

```
┌─────────────┐
│   Sign In   │
└──────┬──────┘
       │
       v
┌─────────────────┐
│ Select Subject, │──────┐
│  Goal, Level    │      │ Check DB
└────────┬────────┘      │
         │               v
         │         ┌──────────────┐
         │         │ Existing     │ YES
         └────────>│ Roadmap?     │────────> Load & Display
                   └──────────────┘
                          │ NO
                          v
                   ┌──────────────┐
                   │ Generate     │
                   │ via Gemini   │
                   └──────┬───────┘
                          │
                          v
                   ┌──────────────┐
                   │ Save to DB   │
                   │ Initialize   │
                   │ Scores = 0   │
                   └──────┬───────┘
                          │
                          v
                   ┌──────────────┐
                   │ Display      │
                   │ Roadmap      │
                   └──────┬───────┘
                          │
                          v
                   ┌──────────────┐
                   │ Start Module │
                   └──────┬───────┘
                          │
                          v
                   ┌──────────────┐
                   │ Complete     │
                   │ Quiz         │
                   └──────┬───────┘
                          │
                          v
                   ┌──────────────┐
                   │ Score >= 70%?│─NO──> Try Again
                   └──────┬───────┘
                          │ YES
                          v
                   ┌──────────────┐
                   │ Update DB:   │
                   │ - Save Score │
                   │ - Mark Done  │
                   │ - Update %   │
                   └──────┬───────┘
                          │
                          v
                   ┌──────────────┐
                   │ View Profile │
                   │ (Real Data)  │
                   └──────────────┘
```

## 9. Success Criteria

✅ Roadmap is generated only once per user
✅ Progress persists across sessions
✅ Profile shows real completion stats
✅ Module scores are tracked individually
✅ Overall progress updates automatically
✅ Completed modules are marked on roadmap
