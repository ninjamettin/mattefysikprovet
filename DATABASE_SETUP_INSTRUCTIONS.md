# Supabase Database Setup Instructions

## Overview
This guide will help you set up your PostgreSQL database in Supabase with all 5 required tables.

## Tables Created
1. **profiles** - User profile information
2. **exams** - Exam content and answer keys
3. **user_exam_attempts** - Completed exam attempts
4. **user_statistics** - Aggregated user proficiency metrics
5. **practice_progress** - Question mastery tracking

## Setup Steps

### 1. Access Supabase SQL Editor
1. Go to your Supabase project dashboard: https://supabase.com/dashboard
2. Select your project
3. Click on "SQL Editor" in the left sidebar

### 2. Run the Migration Script
1. Open the file `supabase_schema.sql` in your code editor
2. Copy the entire contents of the file
3. In the Supabase SQL Editor, paste the SQL code
4. Click "Run" button (or press Ctrl/Cmd + Enter)

### 3. Verify the Setup
After running the script, verify that all tables were created:

```sql
-- Check all tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Check profiles table
SELECT * FROM profiles LIMIT 5;

-- Check exams table
SELECT * FROM exams LIMIT 5;

-- Check user_exam_attempts table
SELECT * FROM user_exam_attempts LIMIT 5;

-- Check user_statistics table
SELECT * FROM user_statistics LIMIT 5;

-- Check practice_progress table
SELECT * FROM practice_progress LIMIT 5;
```

## Features Included

### ✅ Row Level Security (RLS)
All tables have RLS enabled with policies that ensure:
- Users can only access their own data
- Exams are readable by all authenticated users
- Automatic profile creation on user signup

### ✅ Foreign Key Constraints
- All user_id fields reference `profiles(id)` with CASCADE delete
- `user_exam_attempts.exam_id` references `exams.exam_id`
- Maintains referential integrity

### ✅ Indexes
Optimized indexes on:
- Foreign keys for faster joins
- Frequently queried columns
- Composite indexes for common query patterns

### ✅ Automatic Timestamps
- `created_at` automatically set on record creation
- `updated_at` automatically updated on record modification
- Triggers handle timestamp updates

### ✅ Auto Profile Creation
- New user profiles are automatically created when users sign up
- Triggered by Supabase Auth user creation

## Sample Data
The script includes sample exam data for testing. To remove it, delete the section marked "SAMPLE DATA" before running the script.

## Next Steps

### 1. Update Your Supabase Client
Make sure your `src/lib/supabaseClient.js` is properly configured:

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### 2. Add Environment Variables
Create or update `.env.local`:

```env
VITE_SUPABASE_URL=your-project-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Create Database Helper Functions
Example function to save an exam attempt:

```javascript
import { supabase } from './lib/supabaseClient'

export async function saveExamAttempt(examId, scoreString, scorePercentage) {
  const { data: user } = await supabase.auth.getUser()
  
  const { data, error } = await supabase
    .from('user_exam_attempts')
    .insert({
      user_id: user.id,
      exam_id: examId,
      score_string: scoreString,
      score_percentage: scorePercentage
    })
  
  if (error) throw error
  return data
}
```

## Common Operations

### Insert a New Exam
```sql
INSERT INTO exams (exam_id, type, correct_answers, categories)
VALUES (
  'MATH-2007-01',
  'MATEMATIK',
  'A,B,C,D,...',
  'Algebra,Geometry,...'
);
```

### Query User Statistics
```sql
SELECT category, correct_count, total_count,
       ROUND((correct_count::NUMERIC / NULLIF(total_count, 0)) * 100, 2) as percentage
FROM user_statistics
WHERE user_id = 'user-uuid-here'
ORDER BY category;
```

### Get Recent Exam Attempts
```sql
SELECT e.exam_id, e.type, ua.score_percentage, ua.created_at
FROM user_exam_attempts ua
JOIN exams e ON ua.exam_id = e.exam_id
WHERE ua.user_id = 'user-uuid-here'
ORDER BY ua.created_at DESC
LIMIT 10;
```

## Troubleshooting

### Error: "relation already exists"
If tables already exist, you can either:
1. Drop existing tables first (⚠️ WARNING: This deletes all data)
```sql
DROP TABLE IF EXISTS practice_progress CASCADE;
DROP TABLE IF EXISTS user_statistics CASCADE;
DROP TABLE IF EXISTS user_exam_attempts CASCADE;
DROP TABLE IF EXISTS exams CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
```

2. Or modify the script to use `CREATE TABLE IF NOT EXISTS` (already included)

### Error: "permission denied"
Make sure you're running the script as a Supabase admin in the SQL Editor, not through the client.

### RLS Blocking Queries
If you need to test without RLS:
```sql
ALTER TABLE table_name DISABLE ROW LEVEL SECURITY;
```

## Support
- Supabase Documentation: https://supabase.com/docs
- SQL Reference: https://www.postgresql.org/docs/
