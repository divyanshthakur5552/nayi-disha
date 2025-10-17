-- Migration script to update user_progress table
-- Run this if you already have the table and need to add new columns

-- Add new columns to user_progress table
ALTER TABLE user_progress 
  ADD COLUMN IF NOT EXISTS overall_progress DECIMAL(5,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS roadmap_generated_at TIMESTAMP WITH TIME ZONE;

-- Update quiz_scores default if not already set
ALTER TABLE user_progress 
  ALTER COLUMN quiz_scores SET DEFAULT '{}'::jsonb;

-- Update existing rows to have default values
UPDATE user_progress 
SET overall_progress = 0 
WHERE overall_progress IS NULL;

UPDATE user_progress 
SET quiz_scores = '{}'::jsonb 
WHERE quiz_scores IS NULL;

-- Create index for faster queries on overall_progress
CREATE INDEX IF NOT EXISTS idx_user_progress_overall_progress ON user_progress(overall_progress);

-- Verify changes
SELECT 
  column_name, 
  data_type, 
  column_default
FROM information_schema.columns
WHERE table_name = 'user_progress'
ORDER BY ordinal_position;
