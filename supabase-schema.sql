-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  uid TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  display_name TEXT,
  photo_url TEXT,
  provider TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_uid TEXT UNIQUE NOT NULL REFERENCES users(uid) ON DELETE CASCADE,
  goal TEXT,
  skill_level TEXT,
  selected_subjects JSONB,
  roadmap JSONB,
  current_module TEXT,
  completed_modules TEXT[],
  quiz_scores JSONB DEFAULT '{}'::jsonb,
  overall_progress DECIMAL(5,2) DEFAULT 0,
  roadmap_generated_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_users_uid ON users(uid);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_uid ON user_progress(user_uid);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own data" ON users
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (true);

-- Create policies for user_progress table
CREATE POLICY "Users can view their own progress" ON user_progress
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own progress" ON user_progress
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their own progress" ON user_progress
  FOR UPDATE USING (true);

CREATE POLICY "Users can delete their own progress" ON user_progress
  FOR DELETE USING (true);
