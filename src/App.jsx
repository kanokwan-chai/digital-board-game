import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import GameBoard from './components/GameBoard';
import GameArea from './components/GameArea';
import TeacherDashboard from './components/TeacherDashboard';
import { levelsData } from './data/gameData';
import { Trophy, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  const [student, setStudent] = useState(null);
  const [score, setScore] = useState(100);
  const [unlockedLevel, setUnlockedLevel] = useState(1);
  const [completedLevels, setCompletedLevels] = useState([]);
  const [activeLevel, setActiveLevel] = useState(null);
  
  // Views: 'login' | 'board' | 'game' | 'dashboard'
  const [view, setView] = useState('login');
  const [showGameCompleteModal, setShowGameCompleteModal] = useState(false);

  // Teacher Passcode Modal state
  const [showTeacherAuthModal, setShowTeacherAuthModal] = useState(false);
  const [teacherPasscode, setTeacherPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');
  const [showPasswordText, setShowPasswordText] = useState(false);

  const handleTeacherAuth = (e) => {
    e.preventDefault();
    if (teacherPasscode === '122047mail') {
      setShowTeacherAuthModal(false);
      setTeacherPasscode('');
      setPasscodeError('');
      setView('dashboard');
    } else {
      setPasscodeError('❌ รหัสผ่านไม่ถูกต้อง! กรุณาลองใหม่อีกครั้ง');
    }
  };

  // Sync progress from localStorage for this specific student
  useEffect(() => {
    if (student) {
      const storedProgress = localStorage.getItem(`lq_progress_${student.id}`);
      const isReplayUnlocked = localStorage.getItem('lq_unlock_all_replay') === 'true' ||
                               localStorage.getItem(`lq_unlock_replay_${student.id}`) === 'true';

      if (storedProgress) {
        const { score: s, unlockedLevel: ul, completedLevels: cl } = JSON.parse(storedProgress);
        setScore(s);
        if (isReplayUnlocked) {
          setUnlockedLevel(1);
          setCompletedLevels([]);
          localStorage.removeItem(`lq_unlock_replay_${student.id}`);
        } else {
          setUnlockedLevel(ul);
          setCompletedLevels(cl);
        }
      } else {
        // Apply character ability: Phoenix 🔥 starts with 120 points, others start with 100
        const startingScore = student.character?.id === 'phoenix' ? 120 : 100;
        setScore(startingScore);
        setUnlockedLevel(1);
        setCompletedLevels([]);
      }
    }
  }, [student]);

  // Sync state to local storage when state changes
  const saveProgress = (currentScore, currentUnlocked, currentCompleted) => {
    if (student) {
      localStorage.setItem(
        `lq_progress_${student.id}`,
        JSON.stringify({
          score: currentScore,
          unlockedLevel: currentUnlocked,
          completedLevels: currentCompleted
        })
      );
    }
  };

  const handleLogin = (loggedInStudent) => {
    setStudent(loggedInStudent);
    setView('board');
  };

  const handleLogout = () => {
    setStudent(null);
    setScore(100);
    setUnlockedLevel(1);
    setCompletedLevels([]);
    setView('login');
  };

  const handleResetScore = () => {
    const startingScore = student?.character?.id === 'phoenix' ? 120 : 100;
    setScore(startingScore);
    saveProgress(startingScore, unlockedLevel, completedLevels);
  };

  const handleSelectLevel = (level) => {
    setActiveLevel(level);
    setView('game');
  };

  const handleUpdateScore = (points) => {
    setScore(prev => {
      const nextScore = Math.max(0, prev + points);
      saveProgress(nextScore, unlockedLevel, completedLevels);
      return nextScore;
    });
  };

  const handleLevelCompleted = (levelId) => {
    let nextUnlocked = unlockedLevel;
    const nextCompleted = completedLevels.includes(levelId)
      ? completedLevels
      : [...completedLevels, levelId];

    if (levelId === unlockedLevel && unlockedLevel < levelsData.length) {
      nextUnlocked = unlockedLevel + 1;
      setUnlockedLevel(nextUnlocked);
    }

    setCompletedLevels(nextCompleted);
    saveProgress(score, nextUnlocked, nextCompleted);
    setView('board');

    // Trigger congratulations popup if final level is completed!
    if (levelId === 5) {
      setTimeout(() => {
        setShowGameCompleteModal(true);
        triggerEndlessConfetti();
      }, 500);
    }
  };

  const triggerEndlessConfetti = () => {
    const end = Date.now() + (3 * 1000);
    const interval = setInterval(() => {
      if (Date.now() > end) {
        return clearInterval(interval);
      }
      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2
        }
      });
    }, 200);
  };

  const handleRestartGame = () => {
    const startingScore = student?.character?.id === 'phoenix' ? 120 : 100;
    setScore(startingScore);
    setUnlockedLevel(1);
    setCompletedLevels([]);
    setShowGameCompleteModal(false);
  };

  return (
    <main className="min-h-screen text-slate-800 antialiased bg-gradient-to-br from-[#FAF5E6] via-[#F4E6CD] to-[#EBDCB8] font-sans relative overflow-hidden">
      {/* Floating golden magic dust particles */}
      <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1.2px,transparent_1.2px)] [background-size:28px_28px] opacity-25 pointer-events-none animate-pulse"></div>

      {view === 'login' && (
        <Login 
          onLogin={handleLogin} 
          onOpenDashboard={() => setShowTeacherAuthModal(true)} 
        />
      )}

      {view === 'board' && student && (
        <GameBoard
          levels={levelsData}
          unlockedLevel={unlockedLevel}
          completedLevels={completedLevels}
          student={student}
          score={score}
          onSelectLevel={handleSelectLevel}
          onLogout={handleLogout}
        />
      )}

      {view === 'game' && student && activeLevel && (
        <GameArea
          level={activeLevel}
          student={student}
          score={score}
          onUpdateScore={handleUpdateScore}
          onResetScore={handleResetScore}
          onBackToMap={() => setView('board')}
          onLevelCompleted={handleLevelCompleted}
        />
      )}

      {view === 'dashboard' && (
        <TeacherDashboard 
          onClose={() => setView('login')} 
        />
      )}

      {/* TEACHER AUTH PASSCODE MODAL */}
      {showTeacherAuthModal && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#fdf5dd] border-8 border-[#5c4613] rounded-[36px] p-6 max-w-sm w-full text-center shadow-2xl relative border-b-16 border-b-[#42310b] text-[#4c380b] animate-in fade-in zoom-in-95 duration-150">
            <div className="w-16 h-16 bg-amber-100 border-2 border-amber-400 rounded-full flex items-center justify-center text-3xl mx-auto mb-3 shadow-inner">
              🔐
            </div>
            
            <h2 className="text-xl font-black text-[#4c380b] mb-1 uppercase font-sans">
              สิทธิ์สำหรับคุณครูผู้สอน
            </h2>
            <p className="text-xs font-bold text-amber-900 mb-4 leading-relaxed">
              โปรดกรอกรหัสผ่านลับเพื่อเข้าสู่ระบบทำเนียบคุณครู (Teacher Dashboard)
            </p>

            <form onSubmit={handleTeacherAuth} className="space-y-3">
              <div className="relative">
                <input
                  type={showPasswordText ? "text" : "password"}
                  value={teacherPasscode}
                  onChange={(e) => {
                    setTeacherPasscode(e.target.value);
                    setPasscodeError('');
                  }}
                  placeholder="กรอกรหัสผ่านคุณครู..."
                  autoFocus
                  className="w-full px-4 py-3 bg-white border-2 border-[#8a6e29]/50 rounded-xl text-center text-sm font-black text-slate-850 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordText(!showPasswordText)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-amber-850 font-black hover:text-amber-950 cursor-pointer"
                >
                  {showPasswordText ? '🙈 ซ่อน' : '👁️ แสดง'}
                </button>
              </div>

              {passcodeError && (
                <div className="text-xs font-extrabold text-rose-600 bg-rose-50 border border-rose-200 p-2 rounded-lg animate-bounce">
                  {passcodeError}
                </div>
              )}

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setShowTeacherAuthModal(false);
                    setTeacherPasscode('');
                    setPasscodeError('');
                  }}
                  className="flex-1 py-2.5 bg-white hover:bg-slate-100 text-slate-600 font-black rounded-xl text-xs border border-slate-300 shadow-sm cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-black rounded-xl text-xs border-b-4 border-amber-900 shadow-md active:scale-95 transition-all cursor-pointer uppercase tracking-wider"
                >
                  🔑 เข้าสู่ระบบ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Final Game Completion Modal - Styled like a detailed Wizard Gold Plaque Scroll */}
      {showGameCompleteModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#fdf5dd] border-8 border-[#5c4613] rounded-[40px] p-8 max-w-md w-full text-center shadow-2xl relative border-b-16 border-b-[#42310b] text-[#4c380b] ring-12 ring-amber-500/10">
            
            <div className="absolute top-3 left-3 text-xs text-[#8a6e29]/50">⚜️</div>
            <div className="absolute top-3 right-3 text-xs text-[#8a6e29]/50">⚜️</div>

            <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-[#d4af37] rounded-full flex items-center justify-center text-4xl mx-auto mb-5 shadow-lg border-2 border-white ring-4 ring-amber-400/20 animate-bounce">
              🏆
            </div>
            
            <h2 className="text-xl font-black text-[#4c380b] leading-tight uppercase font-sans tracking-wide">
              ยินดีด้วย ผู้สืบเวทมนตร์!
            </h2>
            <p className="text-lg font-extrabold text-amber-800 mt-1 font-sans">
              {student?.name}
            </p>
            <p className="text-slate-500 text-[10px] mt-2 font-bold leading-relaxed">
              คุณได้สลายผนึกบาซิลิสก์สะกดรหัสสำเร็จ ปลดล็อกห้องลับห้องสุดท้าย และนำความสงบสุขกลับคืนสู่ฮอกวอตส์แล้ว!
            </p>

            <div className="my-6 p-4 bg-[#f3e5c8] border border-[#d2bfa1] rounded-2xl shadow-inner">
              <span className="block text-[8px] font-black text-amber-800 uppercase tracking-widest leading-none mb-1">พลังเวทสะสมสูงสุดสุดท้าย</span>
              <span className="text-3xl font-black text-amber-700">{score} 🔮</span>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleRestartGame}
                className="flex-1 py-3 bg-white hover:bg-slate-100 text-slate-600 border-2 border-[#8a6e29]/40 font-black rounded-2xl text-[10px] tracking-wide transition-all flex items-center justify-center gap-1 shadow-sm"
              >
                <RefreshCw className="w-3.5 h-3.5" /> เริ่มใหม่อีกครั้ง
              </button>
              <button
                onClick={() => {
                  setShowGameCompleteModal(false);
                  setView('board');
                }}
                className="flex-1 py-3 bg-gradient-to-r from-[#8a6e29] to-[#b8860b] hover:from-[#5c4613] hover:to-[#8a6e29] text-amber-100 border-2 border-amber-300 font-black rounded-2xl text-[10px] tracking-wide shadow transition-all"
              >
                กลับสู่แผนที่ใหญ่
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
