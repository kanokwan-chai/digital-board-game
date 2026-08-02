-- ========================================================
-- SUPABASE DATABASE SCHEMA FOR DIGITAL BOARD GAME
-- บอร์ดเกมสืบสวนตรรกศาสตร์ (Digital Board Game)
-- ========================================================

-- 1. Create 'students' table (ตารางเก็บข้อมูลนักเรียน)
CREATE TABLE IF NOT EXISTS public.students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    classroom TEXT NOT NULL,
    number INT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_student_per_class UNIQUE (classroom, number)
);

-- 2. Create 'game_results' table (ตารางเก็บผลการเล่นและคะแนน)
CREATE TABLE IF NOT EXISTS public.game_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    level_completed INT NOT NULL DEFAULT 1,
    score INT NOT NULL DEFAULT 100,
    wrong_attempts INT DEFAULT 0,
    hints_used INT DEFAULT 0,
    completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Indexes for High Performance Querying (ดัชนีเพิ่มความเร็วการค้นหา)
CREATE INDEX IF NOT EXISTS idx_students_classroom ON public.students(classroom);
CREATE INDEX IF NOT EXISTS idx_game_results_student_id ON public.game_results(student_id);
CREATE INDEX IF NOT EXISTS idx_game_results_completed_at ON public.game_results(completed_at DESC);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_results ENABLE ROW LEVEL SECURITY;

-- 5. Create RLS Policies allowing anon/public read & write access for classroom gameplay
-- (นโยบายความปลอดภัยอนุญาตให้นักเรียนและระบบคุณครูเข้าถึงข้อมูลได้)

-- Allow public read access to students
CREATE POLICY "Allow public read access to students" 
ON public.students FOR SELECT 
TO anon, authenticated 
USING (true);

-- Allow public insert access to students
CREATE POLICY "Allow public insert access to students" 
ON public.students FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

-- Allow public update access to students
CREATE POLICY "Allow public update access to students" 
ON public.students FOR UPDATE 
TO anon, authenticated 
USING (true);

-- Allow public read access to game_results
CREATE POLICY "Allow public read access to game_results" 
ON public.game_results FOR SELECT 
TO anon, authenticated 
USING (true);

-- Allow public insert access to game_results
CREATE POLICY "Allow public insert access to game_results" 
ON public.game_results FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

-- ========================================================
-- SCHEMA CREATION SUCCESSFUL!
-- นำโค้ดทั้งหมดนี้ไปวางใน SQL Editor ของ Supabase ได้เลยครับ
-- ========================================================
