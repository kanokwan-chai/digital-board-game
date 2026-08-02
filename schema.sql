-- -----------------------------------------------------------------------------
-- Logic Quest Database Schema
-- Run this script inside the Supabase SQL Editor to set up the database tables.
-- -----------------------------------------------------------------------------

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Table: students
CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  classroom TEXT NOT NULL,
  number INT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  
  -- Prevent multiple entries of the same student number in the same classroom
  CONSTRAINT unique_student_in_class UNIQUE (classroom, number)
);

-- Enable Row Level Security (RLS)
ALTER TABLE students ENABLE ROW LEVEL SECURITY;

-- Create basic access policies (Allow anonymous select/insert for school activity)
CREATE POLICY "Allow student insertion" ON students FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow student lookup" ON students FOR SELECT USING (true);


-- 2. Table: game_results
CREATE TABLE IF NOT EXISTS game_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  level_completed INT NOT NULL,
  score INT NOT NULL,
  wrong_attempts INT DEFAULT 0,
  hints_used INT DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE game_results ENABLE ROW LEVEL SECURITY;

-- Create access policies
CREATE POLICY "Allow score insertion" ON game_results FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow score reading" ON game_results FOR SELECT USING (true);


-- -----------------------------------------------------------------------------
-- OPTIONAL: SEED DATA FOR DEMO IF NEEDED
-- -----------------------------------------------------------------------------
-- These tables (missions and cards) are managed locally by src/data/gameData.js
-- but are included here for structural completeness.
-- -----------------------------------------------------------------------------

-- 3. Table: missions
CREATE TABLE IF NOT EXISTS missions (
  id SERIAL PRIMARY KEY,
  level INT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  difficulty TEXT CHECK (difficulty IN ('Easy', 'Medium', 'Hard')) NOT NULL,
  hint TEXT NOT NULL,
  points_reward INT DEFAULT 10
);

-- 4. Table: cards
CREATE TABLE IF NOT EXISTS cards (
  id SERIAL PRIMARY KEY,
  type TEXT CHECK (type IN ('Statement', 'Non-Proposition', 'Operator', 'Mission', 'Hint')) NOT NULL,
  content TEXT NOT NULL,
  truth_value BOOLEAN,
  operator TEXT
);
