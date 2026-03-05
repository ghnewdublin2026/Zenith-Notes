-- ============================================================
-- Zenith Notes - MVP Database Schema
-- Phase 1: Core Data & Auth
-- ============================================================

-- 1. Users Profile (Extends Supabase Auth)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Daily Summary (The "Container" for each day)
CREATE TABLE daily_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) NOT NULL,
  log_date DATE UNIQUE DEFAULT CURRENT_DATE,
  wind_down_reflection TEXT, -- For PM processing
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. The "Big 3" Intentions
CREATE TABLE intentions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  log_id UUID REFERENCES daily_logs(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_completed BOOLEAN DEFAULT FALSE,
  priority_rank INTEGER CHECK (priority_rank BETWEEN 1 AND 3)
);

-- 4. Interstitial Logs & Energy Tracking
CREATE TABLE interstitial_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  log_id UUID REFERENCES daily_logs(id) ON DELETE CASCADE,
  entry_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  activity_description TEXT NOT NULL,
  energy_level INTEGER CHECK (energy_level BETWEEN 1 AND 10),
  mood_tag TEXT -- e.g., 'focused', 'foggy', 'anxious'
);

-- 5. Row Level Security (RLS)
ALTER TABLE daily_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can only view their own logs" 
  ON daily_logs FOR ALL USING (auth.uid() = user_id);
