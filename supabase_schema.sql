-- =============================================================================
-- SUPABASE DATABASE SCHEMA
-- Tables: profiles, exams, user_exam_attempts, user_statistics, practice_progress
-- =============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================================================
-- TABLE 1: profiles
-- Purpose: Links Supabase authenticated users to application-specific profile data
-- =============================================================================

CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    last_login TIMESTAMPTZ
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;

-- RLS Policy: Users can only read their own profile
CREATE POLICY "Users can view own profile"
    ON profiles FOR SELECT
    USING (auth.uid() = id);

-- RLS Policy: Users can update their own profile
CREATE POLICY "Users can update own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id);

-- RLS Policy: Users can insert their own profile
CREATE POLICY "Users can insert own profile"
    ON profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

-- =============================================================================
-- TABLE 2: exams
-- Purpose: Source of truth for all math and physics exam content and answer keys
-- =============================================================================

CREATE TABLE IF NOT EXISTS exams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    exam_id TEXT UNIQUE NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('MATEMATIK', 'FYSIK', 'math', 'physics')),
    correct_answers TEXT NOT NULL,
    categories TEXT NOT NULL,
    video_ids TEXT
);

-- Create index on exam_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_exams_exam_id ON exams(exam_id);
CREATE INDEX IF NOT EXISTS idx_exams_type ON exams(type);

-- Enable Row Level Security
ALTER TABLE exams ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Authenticated users can view exams" ON exams;

-- RLS Policy: All authenticated users can read exams
CREATE POLICY "Authenticated users can view exams"
    ON exams FOR SELECT
    TO authenticated
    USING (true);

-- RLS Policy: Only service role can insert/update/delete exams
-- (This is handled by default, but you can add explicit policies if needed)

-- =============================================================================
-- TABLE 3: user_exam_attempts
-- Purpose: Persistent log of every completed exam attempt for history and analytics
-- =============================================================================

CREATE TABLE IF NOT EXISTS user_exam_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    exam_id TEXT NOT NULL REFERENCES exams(exam_id) ON DELETE CASCADE,
    score_string TEXT NOT NULL,
    score_percentage INTEGER NOT NULL CHECK (score_percentage >= 0 AND score_percentage <= 100)
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_user_exam_attempts_user_id ON user_exam_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_user_exam_attempts_exam_id ON user_exam_attempts(exam_id);

-- Enable Row Level Security
ALTER TABLE user_exam_attempts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own exam attempts" ON user_exam_attempts;
DROP POLICY IF EXISTS "Users can insert own exam attempts" ON user_exam_attempts;

-- RLS Policy: Users can only view their own exam attempts
CREATE POLICY "Users can view own exam attempts"
    ON user_exam_attempts FOR SELECT
    USING (auth.uid() = user_id);

-- RLS Policy: Users can insert their own exam attempts
CREATE POLICY "Users can insert own exam attempts"
    ON user_exam_attempts FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- =============================================================================
-- TABLE 4: user_statistics
-- Purpose: High-level aggregated proficiency metrics used for the user dashboard
-- =============================================================================

CREATE TABLE IF NOT EXISTS user_statistics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    category TEXT NOT NULL,
    correct_count INTEGER DEFAULT 0 CHECK (correct_count >= 0),
    total_count INTEGER DEFAULT 0 CHECK (total_count >= 0),
    last_updated TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, category)
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_user_statistics_user_id ON user_statistics(user_id);
CREATE INDEX IF NOT EXISTS idx_user_statistics_category ON user_statistics(category);
CREATE INDEX IF NOT EXISTS idx_user_statistics_user_category ON user_statistics(user_id, category);

-- Enable Row Level Security
ALTER TABLE user_statistics ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own statistics" ON user_statistics;
DROP POLICY IF EXISTS "Users can insert own statistics" ON user_statistics;
DROP POLICY IF EXISTS "Users can update own statistics" ON user_statistics;

-- RLS Policy: Users can only view their own statistics
CREATE POLICY "Users can view own statistics"
    ON user_statistics FOR SELECT
    USING (auth.uid() = user_id);

-- RLS Policy: Users can insert their own statistics
CREATE POLICY "Users can insert own statistics"
    ON user_statistics FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- RLS Policy: Users can update their own statistics
CREATE POLICY "Users can update own statistics"
    ON user_statistics FOR UPDATE
    USING (auth.uid() = user_id);

-- =============================================================================
-- TABLE 5: practice_progress
-- Purpose: Tracks individual question mastery and 24-hour cooldown logic for practice mode
-- =============================================================================

CREATE TABLE IF NOT EXISTS practice_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    category TEXT NOT NULL,
    status_string TEXT NOT NULL DEFAULT '',
    last_attempts_string TEXT NOT NULL DEFAULT '',
    UNIQUE(user_id, category)
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_practice_progress_user_id ON practice_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_practice_progress_category ON practice_progress(category);
CREATE INDEX IF NOT EXISTS idx_practice_progress_user_category ON practice_progress(user_id, category);

-- Enable Row Level Security
ALTER TABLE practice_progress ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own practice progress" ON practice_progress;
DROP POLICY IF EXISTS "Users can insert own practice progress" ON practice_progress;
DROP POLICY IF EXISTS "Users can update own practice progress" ON practice_progress;

-- RLS Policy: Users can only view their own practice progress
CREATE POLICY "Users can view own practice progress"
    ON practice_progress FOR SELECT
    USING (auth.uid() = user_id);

-- RLS Policy: Users can insert their own practice progress
CREATE POLICY "Users can insert own practice progress"
    ON practice_progress FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- RLS Policy: Users can update their own practice progress
CREATE POLICY "Users can update own practice progress"
    ON practice_progress FOR UPDATE
    USING (auth.uid() = user_id);

-- =============================================================================
-- HELPER FUNCTION: Create or get user profile
-- =============================================================================

-- Function to automatically create a profile when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email)
    VALUES (NEW.id, NEW.email)
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- =============================================================================
-- SAMPLE DATA (Optional - Remove if you don't want sample data)
-- =============================================================================

-- Insert sample exam data (you can customize this)
INSERT INTO exams (exam_id, type, correct_answers, categories) VALUES
    ('MATH-2025-01', 'MATEMATIK', 'A,B,C,D,A,B,C,D,A,B,C,D,A,B,C,D,A,B,C,D,A,B,C,D,A,B,C,D,A,B', 'Algebra,Geometry,Calculus,Statistics,Algebra,Geometry,Calculus,Statistics,Algebra,Geometry,Calculus,Statistics,Algebra,Geometry,Calculus,Statistics,Algebra,Geometry,Calculus,Statistics,Algebra,Geometry,Calculus,Statistics,Algebra,Geometry,Calculus,Statistics,Algebra,Geometry'),
    ('PHYSICS-2025-01', 'FYSIK', 'A,B,C,D,A,B,C,D,A,B,C,D,A,B,C,D,A,B,C,D', 'Mechanics,Thermodynamics,Electromagnetism,Optics,Mechanics,Thermodynamics,Electromagnetism,Optics,Mechanics,Thermodynamics,Electromagnetism,Optics,Mechanics,Thermodynamics,Electromagnetism,Optics,Mechanics,Thermodynamics,Electromagnetism,Optics')
ON CONFLICT (exam_id) DO NOTHING;

-- =============================================================================
-- VERIFICATION QUERIES
-- =============================================================================

-- Run these queries to verify your setup:
-- SELECT * FROM profiles;
-- SELECT * FROM exams;
-- SELECT * FROM user_exam_attempts;
-- SELECT * FROM user_statistics;
-- SELECT * FROM practice_progress;
