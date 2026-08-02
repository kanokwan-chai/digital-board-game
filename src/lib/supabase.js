import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = supabaseUrl && supabaseAnonKey;

// Initialize Supabase if keys are provided
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

if (!isSupabaseConfigured) {
  console.warn("⚠️ Supabase keys are not configured. Running in Local Storage Mode.");
}

// helper UUID generator for local storage
const generateUUID = () => {
  return 'local-uuid-' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Database interface layer with fallback
export const db = {
  // 1. Register student
  async registerStudent(name, classroom, number) {
    if (isSupabaseConfigured) {
      try {
        // Check if student already exists in this classroom with this number
        const { data: existing, error: checkError } = await supabase
          .from('students')
          .select('*')
          .eq('classroom', classroom)
          .eq('number', number)
          .maybeSingle();

        if (existing) {
          return existing;
        }

        const { data, error } = await supabase
          .from('students')
          .insert([{ name, classroom, number }])
          .select()
          .single();
        
        if (error) throw error;
        return data;
      } catch (err) {
        console.error("Supabase error during registration, falling back to local:", err);
      }
    }

    // Local Storage Fallback
    const localStudents = JSON.parse(localStorage.getItem('lq_students') || '[]');
    let student = localStudents.find(s => s.classroom === classroom && Number(s.number) === Number(number));
    
    if (!student) {
      student = {
        id: generateUUID(),
        name,
        classroom,
        number: Number(number),
        created_at: new Date().toISOString()
      };
      localStudents.push(student);
      localStorage.setItem('lq_students', JSON.stringify(localStudents));
    }
    return student;
  },

  // 2. Save game/level completion result
  async saveGameResult({ studentId, levelCompleted, score, wrongAttempts, hintsUsed }) {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('game_results')
          .insert([
            {
              student_id: studentId,
              level_completed: levelCompleted,
              score: score,
              wrong_attempts: wrongAttempts,
              hints_used: hintsUsed,
              completed_at: new Date().toISOString()
            }
          ])
          .select();
        if (error) throw error;
        return data;
      } catch (err) {
        console.error("Supabase error saving game result, falling back to local:", err);
      }
    }

    // Local Storage Fallback
    const localResults = JSON.parse(localStorage.getItem('lq_game_results') || '[]');
    const newResult = {
      id: generateUUID(),
      student_id: studentId,
      level_completed: Number(levelCompleted),
      score: Number(score),
      wrong_attempts: Number(wrongAttempts),
      hints_used: Number(hintsUsed),
      completed_at: new Date().toISOString()
    };
    localResults.push(newResult);
    localStorage.setItem('lq_game_results', JSON.stringify(localResults));
    return newResult;
  },

  // 3. Get all students and their scores for the Teacher Dashboard
  async getTeacherDashboardData() {
    if (isSupabaseConfigured) {
      try {
        // Query students and their related game results
        const { data: students, error: sError } = await supabase
          .from('students')
          .select('*');
        
        const { data: results, error: rError } = await supabase
          .from('game_results')
          .select('*');

        if (sError) throw sError;
        if (rError) throw rError;

        // Group results by student_id to calculate summaries
        return students.map(student => {
          const studentResults = results.filter(r => r.student_id === student.id);
          const maxLevel = studentResults.reduce((max, r) => r.level_completed > max ? r.level_completed : max, 0);
          // Get the latest score
          const latestResult = studentResults.sort((a,b) => new Date(b.completed_at) - new Date(a.completed_at))[0];
          const score = latestResult ? latestResult.score : 100;
          const wrongAttempts = studentResults.reduce((sum, r) => sum + (r.wrong_attempts || 0), 0);
          const hintsUsed = studentResults.reduce((sum, r) => sum + (r.hints_used || 0), 0);
          const playCount = studentResults.length;

          return {
            id: student.id,
            name: student.name,
            classroom: student.classroom,
            number: student.number,
            score,
            level_completed: maxLevel,
            wrong_attempts: wrongAttempts,
            hints_used: hintsUsed,
            play_count: playCount
          };
        });
      } catch (err) {
        console.error("Supabase error fetching dashboard, falling back to local:", err);
      }
    }

    // Local Storage Fallback
    const localStudents = JSON.parse(localStorage.getItem('lq_students') || '[]');
    const localResults = JSON.parse(localStorage.getItem('lq_game_results') || '[]');

    // Seed mock data if localStorage is empty to show how it looks
    if (localStudents.length === 0) {
      const mockStudents = [
        { id: "local-s1", name: "สมชาย รักเรียน", classroom: "ปวช.1/1", number: 5, created_at: new Date().toISOString() },
        { id: "local-s2", name: "สมศรี ใจดี", classroom: "ปวช.1/1", number: 12, created_at: new Date().toISOString() },
        { id: "local-s3", name: "มานะ ขยันหมั่นเพียร", classroom: "ปวช.1/2", number: 1, created_at: new Date().toISOString() },
        { id: "local-s4", name: "ชูใจ นามสกุลดี", classroom: "ปวช.1/1", number: 18, created_at: new Date().toISOString() },
        { id: "local-s5", name: "ปิติ ดีใจ", classroom: "ปวช.1/2", number: 8, created_at: new Date().toISOString() }
      ];
      const mockResults = [
        { id: "r1", student_id: "local-s1", level_completed: 5, score: 140, wrong_attempts: 2, hints_used: 1, completed_at: new Date().toISOString() },
        { id: "r2", student_id: "local-s2", level_completed: 5, score: 135, wrong_attempts: 1, hints_used: 2, completed_at: new Date().toISOString() },
        { id: "r3", student_id: "local-s3", level_completed: 4, score: 120, wrong_attempts: 4, hints_used: 2, completed_at: new Date().toISOString() },
        { id: "r4", student_id: "local-s4", level_completed: 3, score: 95, wrong_attempts: 7, hints_used: 4, completed_at: new Date().toISOString() },
        { id: "r5", student_id: "local-s5", level_completed: 3, score: 105, wrong_attempts: 5, hints_used: 2, completed_at: new Date().toISOString() }
      ];
      localStorage.setItem('lq_students', JSON.stringify(mockStudents));
      localStorage.setItem('lq_game_results', JSON.stringify(mockResults));
      
      return mockStudents.map(student => {
        const studentResults = mockResults.filter(r => r.student_id === student.id);
        const maxLevel = studentResults.reduce((max, r) => r.level_completed > max ? r.level_completed : max, 0);
        const latestResult = studentResults[0];
        return {
          id: student.id,
          name: student.name,
          classroom: student.classroom,
          number: student.number,
          score: latestResult.score,
          level_completed: maxLevel,
          wrong_attempts: latestResult.wrong_attempts,
          hints_used: latestResult.hints_used,
          play_count: 1
        };
      });
    }

    return localStudents.map(student => {
      const studentResults = localResults.filter(r => r.student_id === student.id);
      const maxLevel = studentResults.reduce((max, r) => r.level_completed > max ? r.level_completed : max, 0);
      const latestResult = studentResults.sort((a,b) => new Date(b.completed_at) - new Date(a.completed_at))[0];
      const score = latestResult ? latestResult.score : 100;
      const wrongAttempts = studentResults.reduce((sum, r) => sum + (r.wrong_attempts || 0), 0);
      const hintsUsed = studentResults.reduce((sum, r) => sum + (r.hints_used || 0), 0);
      const playCount = studentResults.length;

      return {
        id: student.id,
        name: student.name,
        classroom: student.classroom,
        number: student.number,
        score,
        level_completed: maxLevel,
        wrong_attempts: wrongAttempts,
        hints_used: hintsUsed,
        play_count: playCount
      };
    });
  },

  // 4. Wipe local data for testing
  clearLocalData() {
    localStorage.removeItem('lq_students');
    localStorage.removeItem('lq_game_results');
  }
};
