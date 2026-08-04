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
  // 0. Sign in with Google OAuth
  async signInWithGoogle() {
    if (!isSupabaseConfigured) {
      alert("⚠️ Supabase ยังไม่ได้ตั้งค่าการใช้งานในระบบ");
      return;
    }
    const targetUrl = window.location.origin.includes('localhost') 
      ? window.location.origin 
      : 'https://digital-board-game-pwc.vercel.app';

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: targetUrl
      }
    });
    if (error) throw error;
    return data;
  },

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
          const isNameChanged = existing.name !== name;
          if (isNameChanged) {
            localStorage.setItem(`lq_unlock_replay_${existing.id}`, 'true');
          }
          const { data: updated } = await supabase
            .from('students')
            .update({ name })
            .eq('id', existing.id)
            .select()
            .single();
          return { ...(updated || { ...existing, name }), isNameChanged };
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
    
    if (student) {
      const isNameChanged = student.name !== name;
      if (isNameChanged) {
        localStorage.setItem(`lq_unlock_replay_${student.id}`, 'true');
      }
      student.name = name;
      localStorage.setItem('lq_students', JSON.stringify(localStudents));
      return { ...student, isNameChanged };
    } else {
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
    let students = [];
    let results = [];
    const clearedAt = localStorage.getItem('lq_cleared_at');

    if (isSupabaseConfigured) {
      try {
        const { data: sData } = await supabase.from('students').select('*').neq('classroom', 'DELETED');
        const { data: rData } = await supabase.from('game_results').select('*');
        students = (sData || []).filter(s => s.name && !s.name.includes('[DELETED]'));
        results = rData || [];
      } catch (err) {
        console.error("Supabase error fetching dashboard:", err);
      }
    }

    if (!isSupabaseConfigured) {
      const localStudents = JSON.parse(localStorage.getItem('lq_students') || '[]');
      const localResults = JSON.parse(localStorage.getItem('lq_game_results') || '[]');
      students = localStudents;
      results = localResults;
    }

    // Filter out student records before clearedAt timestamp
    if (clearedAt) {
      const clearTime = new Date(clearedAt).getTime();
      students = students.filter(s => {
        if (!s.created_at) return false;
        return new Date(s.created_at).getTime() > clearTime;
      });
    }

    return students.map(student => {
      const studentResults = results.filter(r => r.student_id === student.id);

      // Sort by completion time descending (latest first)
      const sortedResults = [...studentResults].sort((a, b) => new Date(b.completed_at) - new Date(a.completed_at));
      const latestResult = sortedResults[0];

      // Score = the score at the latest level completion (reflects all deductions up to that point)
      const score = latestResult ? latestResult.score : 100;

      // Level completed = highest level reached
      const maxLevel = studentResults.reduce((max, r) => r.level_completed > max ? r.level_completed : max, 0);

      // Use the latest session's wrong attempts & hints (take from the results in the latest "batch")
      // Latest session = results that share the same level range as the most recent attempt
      const wrongAttempts = studentResults.reduce((sum, r) => sum + (r.wrong_attempts || 0), 0);
      const hintsUsed = studentResults.reduce((sum, r) => sum + (r.hints_used || 0), 0);
      const playCount = studentResults.length;

      return {
        id: student.id,
        name: student.name,
        classroom: student.classroom,
        number: student.number,
        created_at: student.created_at,
        score,
        level_completed: maxLevel,
        wrong_attempts: wrongAttempts,
        hints_used: hintsUsed,
        play_count: playCount
      };
    });
  },

  // 4. Wipe all data (Supabase DB + Local Storage)
  async clearAllData() {
    const clearNow = new Date().toISOString();
    localStorage.setItem('lq_cleared_at', clearNow);

    if (isSupabaseConfigured) {
      try {
        const { data: students } = await supabase.from('students').select('id');
        if (students && students.length > 0) {
          const ids = students.map(s => s.id);
          await supabase.from('students').update({ name: '[DELETED]', classroom: 'DELETED' }).in('id', ids);
        }
      } catch (err) {
        console.error("Supabase error clearing data:", err);
      }
    }
    localStorage.removeItem('lq_students');
    localStorage.removeItem('lq_game_results');
  },

  // 5. Unlock replay for a specific student without deleting score history
  unlockStudentProgress(studentId) {
    localStorage.setItem(`lq_unlock_replay_${studentId}`, 'true');
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(`lq_progress_${studentId}`)) {
        try {
          const data = JSON.parse(localStorage.getItem(key) || '{}');
          localStorage.setItem(key, JSON.stringify({
            ...data,
            unlockedLevel: 1,
            completedLevels: []
          }));
        } catch (e) { console.error(e); }
      }
    });
  },

  // 6. Unlock replay for all students without deleting score history
  unlockAllStudentsProgress() {
    localStorage.setItem('lq_unlock_all_replay', 'true');
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('lq_progress_')) {
        try {
          const data = JSON.parse(localStorage.getItem(key) || '{}');
          localStorage.setItem(key, JSON.stringify({
            ...data,
            unlockedLevel: 1,
            completedLevels: []
          }));
        } catch (e) { console.error(e); }
      }
    });
  }
};
