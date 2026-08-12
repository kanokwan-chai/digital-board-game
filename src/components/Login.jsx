import React, { useState } from 'react';
import { db } from '../lib/supabase';
import { Loader2 } from 'lucide-react';

const characters = [
  { 
    id: 'griffin', 
    name: 'อาร์กัส', 
    fullName: 'อาร์กัส นักสืบอาร์เคน',
    avatar: '🔍',
    image: '/char_argus.jpg',
    ability: 'เนตรหยั่งรู้',
    color: 'from-emerald-500 to-teal-600',
    glow: 'shadow-emerald-500/60',
    ring: 'ring-emerald-400',
    badge: 'bg-emerald-900/80 border-emerald-400/50 text-emerald-200',
    icon: '🔍',
    desc: 'ใช้คำใบ้ฟรีได้ 1 ครั้ง ไม่หักคะแนน'
  },
  { 
    id: 'phoenix', 
    name: 'ไซเฟอร์', 
    fullName: 'ไซเฟอร์ สายลับเงา',
    avatar: '🌙',
    image: '/char_cipher.jpg',
    ability: 'พรางรอยเงา',
    color: 'from-violet-500 to-purple-700',
    glow: 'shadow-violet-500/60',
    ring: 'ring-violet-400',
    badge: 'bg-violet-900/80 border-violet-400/50 text-violet-200',
    icon: '🌙',
    desc: 'เริ่มเกมด้วย 120 คะแนน'
  },
  { 
    id: 'unicorn', 
    name: 'เล็กซ์', 
    fullName: 'เล็กซ์ อัครนายอำเภอ',
    avatar: '🛡️',
    image: '/char_lex.jpg',
    ability: 'เกราะโล่กฎหมาย',
    color: 'from-amber-400 to-yellow-600',
    glow: 'shadow-amber-400/60',
    ring: 'ring-amber-400',
    badge: 'bg-amber-900/80 border-amber-400/50 text-amber-200',
    icon: '🛡️',
    desc: 'ตอบผิดเสียแค่ -3 แต้ม'
  },
  { 
    id: 'basilisk', 
    name: 'นาโอมิ', 
    fullName: 'นาโอมิ นิติเวชเวทย์',
    avatar: '🧪',
    image: '/char_naomi.jpg',
    ability: 'วิเคราะห์เฉียบคม',
    color: 'from-cyan-400 to-blue-600',
    glow: 'shadow-cyan-400/60',
    ring: 'ring-cyan-400',
    badge: 'bg-cyan-900/80 border-cyan-400/50 text-cyan-200',
    icon: '🧪',
    desc: 'ตอบถูกรับ +12 แต้ม'
  }
];

export default function Login({ onLogin, onOpenDashboard }) {
  const [name, setName] = useState('');
  const [classroom] = useState('ปวช.1/1');
  const [studentNumber, setStudentNumber] = useState('');
  const [selectedChar, setSelectedChar] = useState(characters[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showQuickRules, setShowQuickRules] = useState(false);
  
  const isEmbedded = new URLSearchParams(window.location.search).get('embedded') === 'true' || window.self !== window.top;

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      localStorage.setItem('lq_pending_character', JSON.stringify(selectedChar));
      await db.signInWithGoogle();
    } catch (err) {
      console.error(err);
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อ Google กรุณาลองใหม่อีกครั้ง');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) { setError('กรุณากรอกชื่อ-นามสกุล'); return; }
    if (!studentNumber || Number(studentNumber) <= 0) { setError('กรุณากรอกเลขที่'); return; }
    setLoading(true); setError('');
    try {
      const student = await db.registerStudent(name.trim(), classroom, studentNumber);
      onLogin({ ...student, name: name.trim(), character: selectedChar });
    } catch (err) {
      console.error(err);
      setError('เกิดข้อผิดพลาด กรุณาลองใหม่');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-3 sm:p-5 relative overflow-hidden font-sans select-none bg-[#f5ebd2]">

      {/* QUICK RULEBOOK MODAL */}
      {showQuickRules && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#fffdf7] border-4 border-[#8c6d23] rounded-3xl p-5 md:p-6 max-w-lg w-full shadow-2xl text-[#4c380b] border-b-8 border-b-[#5c4613] relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b-2 border-amber-200 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📖</span>
                <h2 className="text-lg font-black text-amber-950">กติกาและวิธีเล่น 5 ด่าน (สรุปย่อ)</h2>
              </div>
              <button onClick={() => setShowQuickRules(false)} className="w-8 h-8 rounded-full bg-rose-100 text-rose-800 font-black flex items-center justify-center hover:bg-rose-200">
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs md:text-sm font-black">
              <div className="bg-amber-50 p-3 rounded-xl border border-amber-200">
                <span className="text-amber-900 font-extrabold block text-sm mb-1">🔎 ด่าน 1: คัดแยกการ์ดประพจน์</span>
                <p className="text-amber-800 text-xs font-bold leading-relaxed">
                  อ่านการ์ดข้อความ แล้วเลือกระบุว่าเป็น 🟢 ประพจน์จริง, 🔴 ประพจน์เท็จ หรือ ❓ ไม่ใช่ประพจน์
                </p>
              </div>

              <div className="bg-amber-50 p-3 rounded-xl border border-amber-200">
                <span className="text-amber-900 font-extrabold block text-sm mb-1">🧪 ด่าน 2: ตัวเชื่อมพื้นฐาน (และ, หรือ, ไม่)</span>
                <p className="text-amber-800 text-xs font-bold leading-relaxed">
                  • <b>และ (AND):</b> จริงทั้งคู่ ➔ จริง<br/>
                  • <b>หรือ (OR):</b> มีจริงอย่างน้อย 1 ฝั่ง ➔ จริง<br/>
                  • <b>ไม่ (NOT):</b> สลับค่า (เท็จ ➔ จริง)
                </p>
              </div>

              <div className="bg-amber-50 p-3 rounded-xl border border-amber-200">
                <span className="text-amber-900 font-extrabold block text-sm mb-1">📜 ด่าน 3: เงื่อนไขเหตุและผล (ถ้า...แล้ว, ก็ต่อเมื่อ)</span>
                <p className="text-amber-800 text-xs font-bold leading-relaxed">
                  • <b>ถ้า...แล้ว (IF...THEN):</b> เป็นเท็จแค่อย่างเดียว คือ เหตุจริง แต่ ผลเท็จ<br/>
                  • <b>ก็ต่อเมื่อ (IFF):</b> ค่าเหมือนกันทั้ง 2 ฝั่ง ➔ จริง
                </p>
              </div>

              <div className="bg-amber-50 p-3 rounded-xl border border-amber-200">
                <span className="text-amber-900 font-extrabold block text-sm mb-1">🛡️ ด่าน 4: สมการ 3 เงื่อนไข</span>
                <p className="text-amber-800 text-xs font-bold leading-relaxed">
                  เลือกการ์ดประพจน์ 3 ใบ + ตัวเชื่อมและตัวปฏิเสธ "ไม่" ต่อเป็นวงจรให้ได้ค่ารวมเป็นจริง
                </p>
              </div>

              <div className="bg-amber-50 p-3 rounded-xl border border-amber-200">
                <span className="text-amber-900 font-extrabold block text-sm mb-1">🔒 ด่าน 5: วงเล็บจัดลำดับความสำคัญ</span>
                <p className="text-amber-800 text-xs font-bold leading-relaxed">
                  วางวงเล็บ ( ) ครอบชุดประพจน์ย่อยที่ต้องการให้คำนวณก่อน แล้วนำไปเชื่อมกับเงื่อนไขภายนอก
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowQuickRules(false)}
              className="w-full mt-4 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-black text-xs md:text-sm rounded-xl shadow border-b-4 border-b-amber-800"
            >
              เข้าใจแล้ว ปิดหน้าต่างนี้
            </button>
          </div>
        </div>
      )}

      {/* Bright warm ambient glow circles */}
      <div className="absolute top-[-10%] left-[-10%] w-[450px] h-[450px] rounded-full pointer-events-none bg-amber-300/30 blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[450px] h-[450px] rounded-full pointer-events-none bg-yellow-400/25 blur-3xl" />

      {/* Main card — Bright Warm Parchment Style */}
      <div className="w-full max-w-md relative z-10 bg-[#fffdf7] border-4 border-[#8c6d23] rounded-3xl shadow-2xl overflow-hidden text-[#4c380b] border-b-8 border-b-[#5c4613]">

        {/* Top accent banner */}
        <div className="h-2 w-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600" />

        <div className="p-4 sm:p-6">

          {/* Header */}
          <div className="text-center mb-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-2 bg-gradient-to-br from-amber-400 to-yellow-500 shadow-md border-2 border-amber-200">
              🔮
            </div>
            <h1 className="text-2xl font-black text-amber-950 tracking-wide">
              สำนักสืบสวนลับ
            </h1>
            <p className="text-[10px] font-black tracking-wider uppercase text-amber-800/70 mt-0.5">
              Central Bureau of Magic Investigation · Arcane City
            </p>
            <button
              onClick={() => setShowQuickRules(true)}
              className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 hover:bg-amber-200 border border-amber-300 text-amber-900 rounded-full font-black text-xs transition-all shadow-xs"
            >
              📖 อ่านกติกาและวิธีเล่น 5 ด่าน
            </button>
          </div>

          {/* Character Selection */}
          <div className="mb-4">
            <p className="text-center text-xs font-black tracking-wider uppercase mb-2 text-amber-900">
              ⚔ เลือกนักสืบประจำหน่วย
            </p>
            <div className="grid grid-cols-4 gap-2 mb-3">
              {characters.map(char => {
                const isSelected = selectedChar.id === char.id;
                return (
                  <button
                    type="button"
                    key={char.id}
                    onClick={() => setSelectedChar(char)}
                    className={`relative flex flex-col items-center rounded-xl p-1.5 transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-amber-100 border-2 border-amber-600 scale-105 shadow-md'
                        : 'bg-white/80 border border-amber-200 hover:bg-amber-50 opacity-80 hover:opacity-100'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-600 text-white font-black text-[9px] flex items-center justify-center shadow">
                        ✓
                      </div>
                    )}
                    <div className="w-12 h-12 rounded-lg overflow-hidden mb-1 relative border border-amber-300">
                      <img src={char.image} alt={char.name} className="w-full h-full object-cover" />
                    </div>
                    <span className={`text-[10px] font-black text-center ${isSelected ? 'text-amber-950' : 'text-amber-800'}`}>
                      {char.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected char info panel */}
            <div className="rounded-xl p-2.5 flex items-center gap-3 bg-[#fdf8ea] border border-[#e6dab7] shadow-inner">
              <div className="relative flex-shrink-0">
                <img src={selectedChar.image} alt={selectedChar.name} className="w-11 h-11 rounded-lg object-cover border border-amber-300 shadow-sm" />
                <div className="absolute -bottom-1 -right-1 text-xs">{selectedChar.icon}</div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-xs font-black text-amber-950">{selectedChar.fullName}</span>
                </div>
                <span className="inline-block text-[8px] font-black px-2 py-0.5 rounded-full mb-0.5 bg-amber-200 text-amber-900 border border-amber-400/50">
                  ⚡ {selectedChar.ability}
                </span>
                <p className="text-[10px] font-extrabold text-amber-800 leading-tight">{selectedChar.desc}</p>
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-3 px-3 py-2 rounded-xl text-xs font-black bg-rose-100 border border-rose-300 text-rose-900 flex items-center gap-2">
              ⚠️ {error}
            </div>
          )}

          {/* Login Button Section */}
          <div className="mt-4 mb-2">
            {isEmbedded ? (
              <button
                type="button"
                onClick={() => onLogin({ id: 'guest-101', name: 'นักเรียน (E-Learning)', character: selectedChar })}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black rounded-2xl text-xs sm:text-sm shadow-xl transition-all flex items-center justify-center gap-3 cursor-pointer border-b-4 border-b-emerald-800 active:translate-y-0.5"
              >
                🎮 เข้าสู่ระบบและเริ่มเกม (เชื่อมต่อ E-Learning แล้ว)
              </button>
            ) : (
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-black rounded-2xl text-xs sm:text-sm shadow-xl transition-all flex items-center justify-center gap-3 cursor-pointer border-b-4 border-b-amber-800 active:translate-y-0.5"
              >
                <div className="p-1 bg-white rounded-lg shadow-sm">
                  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                </div>
                <span className="tracking-wide">
                  {loading ? 'กำลังเชื่อมต่อ Google...' : '🌐 เข้าสู่ระบบด้วย Google Account'}
                </span>
              </button>
            )}
          </div>

          {/* Footer */}
          <div className="mt-4 pt-3 flex flex-col sm:flex-row items-center justify-between border-t border-amber-200 gap-2">
            <span className="text-[10px] font-black text-amber-800/60">
              ตรรกศาสตร์เบื้องต้น · ปวช.1
            </span>
            <button 
              type="button"
              onClick={onOpenDashboard}
              className="px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 rounded-xl font-black text-xs transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              🎓 สำหรับคุณครูผู้สอน (Dashboard)
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
