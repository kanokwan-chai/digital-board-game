import React, { useState } from 'react';
import { Lock, Unlock, Star, LogOut, Key, AlertCircle } from 'lucide-react';
import audio from '../lib/audio';
import { PrologueSlideshow } from './GameArea';

const icons = {
  1: "🌲", // Forest
  2: "🧪", // Potions classroom
  3: "🏛️", // Great Hall
  4: "👹", // Staff room
  5: "🐍"  // Chamber of Secrets
};

const doorNames = {
  1: "ประตูศิลาป่าต้องห้าม",
  2: "ประตูห้องเรียนปรุงยา",
  3: "ประตูหอกลางปราสาท",
  4: "ประตูห้องโถงอาจารย์",
  5: "ประตูห้องลับเวทมนตร์"
};

export default function GameBoard({ levels, unlockedLevel, completedLevels, student, score, onSelectLevel, onLogout }) {
  const [lockedNotice, setLockedNotice] = useState(null);
  const [showStoryModal, setShowStoryModal] = useState(false);
  const keysCollected = completedLevels.length;

  return (
    <div className="min-h-screen bg-transparent p-3 md:p-6 flex flex-col items-center justify-center select-none font-sans relative">
      
      {/* Floating bright golden magical halos */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-amber-300/10 rounded-full filter blur-[100px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-yellow-200/10 rounded-full filter blur-[120px] pointer-events-none animate-pulse"></div>

      {/* Top HUD - Bright Magic Gold Wood Plaque */}
      <div className="w-full max-w-5xl bg-gradient-to-r from-[#ebdcb8] to-[#f5ebd0] border-2 border-[#d4af37] rounded-3xl p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 border-b-6 border-b-[#c2a65d] z-10 text-[#5c4613]">
        
        {/* Left Profile */}
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full border-2 border-amber-400 bg-white overflow-hidden shadow-lg flex items-center justify-center p-0.5 relative">
            <span className="text-3xl filter drop-shadow">{student.character?.avatar || "🧙‍♂️"}</span>
            <div className="absolute -bottom-1 -right-1 bg-amber-600 border border-amber-300 text-white text-[7px] font-black px-1.5 py-0.5 rounded-full shadow">
              {student.character?.ability}
            </div>
          </div>
          <div>
            <h2 className="text-sm font-black text-[#4c380b] tracking-wide">
              ผู้เรียน: <span className="text-[#8c530b] font-extrabold">{student.name}</span>
            </h2>
            <p className="text-[#4c380b]/75 text-[10px] font-black tracking-wider truncate max-w-[220px]">
              📧 {student.email || 'Google Account'}
            </p>
          </div>
        </div>

        {/* Center: Keys Collected Gauge */}
        <div className="bg-[#fffcf5] border border-amber-300 px-4 py-2 rounded-2xl flex items-center gap-2.5 shadow-sm">
          <div className="p-1.5 bg-yellow-100 text-yellow-600 rounded-xl">
            <Key className="w-4.5 h-4.5 fill-yellow-250" />
          </div>
          <div>
            <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-0.5">กุญแจไขประตู</span>
            <span className="text-xs font-black text-amber-700 leading-none">{keysCollected} / 5 ดอก</span>
          </div>
        </div>

        {/* Center-Right: score */}
        <div className="bg-[#fffcf5] border border-amber-300 px-4 py-2 rounded-2xl flex items-center gap-2.5 shadow-sm">
          <div className="p-1.5 bg-sky-100 text-sky-600 rounded-xl">
            🔮
          </div>
          <div>
            <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-0.5">พลังเวทสะสม</span>
            <span className="text-xs font-black text-amber-700 leading-none">{score} คะแนน</span>
          </div>
        </div>

        {/* Story button */}
        <button 
          type="button"
          onClick={() => {
            audio.playClick();
            setShowStoryModal(true);
          }}
          className="px-3.5 py-2 bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 font-black rounded-2xl shadow-xs transition-all text-xs flex items-center gap-1.5 cursor-pointer"
          title="เปิดอ่านเนื้อเรื่องบันทึกคดี"
        >
          📖 อ่านเนื้อเรื่องคดี
        </button>

        {/* Right: Exit */}
        <button 
          onClick={() => {
            audio.playClick();
            onLogout();
          }}
          className="px-4 py-2 bg-gradient-to-r from-red-805 to-rose-800 hover:from-red-800 hover:to-rose-900 text-white font-black rounded-xl border border-red-750 shadow transition-all text-xs tracking-wider border-b-4 border-b-red-950 cursor-pointer"
        >
          🚪 ออกจากเกม
        </button>
      </div>

      {/* Main Board - Ancient wizard parchment map scroll */}
      <div className="w-full max-w-5xl bg-[#fdf5dd] border-8 border-[#5c4613] rounded-[48px] p-6 md:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.15),0_0_30px_rgba(212,175,55,0.1)] relative flex flex-col items-center border-b-16 border-b-[#42310b] ring-12 ring-amber-500/5 z-10">
        
        <div className="absolute top-4 left-4 text-sm text-[#8a6e29]/40">⚜️</div>
        <div className="absolute top-4 right-4 text-sm text-[#8a6e29]/40">⚜️</div>

        <div className="text-center mb-10 border-b-2 border-dashed border-[#8a6e29]/20 pb-4 w-full">
          <span className="text-[9px] font-black text-[#8a6e29] uppercase tracking-widest block mb-0.5">Hogwarts Logic Map Selector</span>
          <h1 className="text-xl md:text-2xl font-black text-[#4c380b] tracking-wider uppercase font-sans">
            📜 แผนที่ปลดล็อกบานประตูห้องความลับตรรกศาสตร์
          </h1>
          <p className="text-[#8a6e29] text-[10px] font-black uppercase tracking-wider mt-0.5">โปรดเลือกซุ้มประตูเวทมนตร์วิเศษเพื่อเข้าคลาสทำภารกิจ</p>
        </div>

        {/* 5 Vertical Arch Doors side-by-side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 w-full px-1">
          {levels.map((level) => {
            const isCompleted = completedLevels.includes(level.id);
            const isUnlocked = level.id <= unlockedLevel;
            const isCurrent = level.id === unlockedLevel && !isCompleted;
            const canPlay = isUnlocked && !isCompleted;
            
            return (
              <div 
                key={level.id}
                onClick={() => {
                  if (isCompleted) {
                    audio.playError();
                    setLockedNotice("🔒 ด่านนี้ผ่านภารกิจแล้ว! ไม่อนุญาตให้เล่นซ้ำ จนกว่าคุณครูจะกดปุ่มรีเซ็ตคลาสเรียนให้เท่านั้น");
                  } else if (canPlay) {
                    audio.playClick();
                    onSelectLevel(level);
                  } else {
                    audio.playError();
                    setLockedNotice("🔒 ด่านนี้ยังไม่เปิด! ต้องทำภารกิจด่านก่อนหน้าให้สำเร็จก่อน");
                  }
                }}
                className={`flex flex-col items-center p-3 rounded-2xl border-2 transition-all select-none cursor-pointer ${
                  isCompleted
                    ? 'border-emerald-500 bg-emerald-50/40 opacity-80 hover:opacity-100'
                    : isCurrent
                      ? 'border-[#d4af37] bg-amber-50/40 shadow-xl shadow-amber-500/15 ring-4 ring-amber-500/10 hover:-translate-y-2 hover:shadow-2xl animate-pulse'
                      : canPlay
                        ? 'border-[#8a6e29]/50 bg-white/70 shadow-sm hover:-translate-y-1 hover:shadow-md'
                        : 'border-[#dccba0]/40 bg-slate-100/55 opacity-60 cursor-not-allowed'
                }`}
              >
                {/* 1. THE MAGICAL GOTHIC ARCH DOOR */}
                <div 
                  className={`w-full aspect-[2/3] rounded-t-full border-4 flex flex-col items-center justify-between p-3.5 relative shadow-inner transition-colors duration-300 ${
                    isCompleted
                      ? 'bg-gradient-to-t from-emerald-100 to-teal-50 border-emerald-400'
                      : isCurrent
                        ? 'bg-gradient-to-t from-amber-100 to-yellow-50 border-[#d4af37]'
                        : canPlay
                          ? 'bg-gradient-to-t from-amber-50/20 to-white border-[#8a6e29]/65 shadow'
                          : 'bg-[#d2bfa1]/45 border-[#a3906a]'
                  }`}
                >
                  {/* Status label banner */}
                  <div className="absolute top-2 right-2 z-10">
                    {isCompleted ? (
                      <span className="text-[7px] bg-slate-700 text-amber-200 font-black px-1.5 py-0.5 rounded shadow-sm flex items-center gap-0.5">
                        <Lock className="w-2.5 h-2.5" /> ผ่านแล้ว
                      </span>
                    ) : canPlay ? (
                      <Unlock className="w-3.5 h-3.5 text-amber-600" />
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-[#5c4613]" />
                    )}
                  </div>

                  {/* Gate Level Number Badge */}
                  <div className="w-6 h-6 rounded-full bg-[#5c4613] text-amber-100 text-[10px] font-black flex items-center justify-center border border-[#8a6e29] shadow-md z-10">
                    {level.id}
                  </div>

                  {/* Door Keyhole & Icon symbol */}
                  <div className="my-auto text-4xl filter drop-shadow select-none">
                    {icons[level.id] || "❓"}
                  </div>

                  {/* Active Character Wooden Standee */}
                  {isCurrent && (
                    <div className="absolute -bottom-5 z-20 animate-bounce flex flex-col items-center">
                      <div className="w-9 h-9 rounded-full border-2 border-amber-400 bg-white overflow-hidden shadow-lg flex items-center justify-center p-0.5">
                        <span className="text-lg filter drop-shadow">{student.character?.avatar || "🧙‍♂️"}</span>
                      </div>
                      <div className="w-6 h-1 bg-black/30 rounded-full blur-[1px] mt-0.5"></div>
                    </div>
                  )}

                  {/* Completed star indicator */}
                  {isCompleted && (
                    <div className="absolute -bottom-2 bg-emerald-600 text-white p-0.5 rounded-full border border-white shadow-md z-10">
                      <Star className="w-3.5 h-3.5 fill-yellow-300 text-yellow-300" />
                    </div>
                  )}
                </div>

                {/* 2. DOOR NAME PARCHMENT PLACARD */}
                <div className="mt-4.5 w-full text-center">
                  <div className={`border-2 text-[9px] font-black py-0.5 px-1.5 rounded-lg shadow-md w-full truncate border-b-4 ${
                    isCompleted 
                      ? 'bg-emerald-800 border-emerald-600 text-emerald-100 border-b-emerald-950' 
                      : 'bg-[#8b0000] border-[#b8860b] text-amber-100 border-b-[#42310b]'
                  }`}>
                    {doorNames[level.id]}
                  </div>
                  
                  {/* 3. Level descriptive statement summary */}
                  <p className="text-[9px] text-[#5c4613] font-bold mt-2 leading-relaxed line-clamp-3 min-h-[38px] px-0.5">
                    {isCompleted ? "✅ ผ่านภารกิจแล้ว (ล็อกไม่ให้เล่นซ้ำ)" : level.description}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

        {/* Wizard map legends panel */}
        <div className="w-full flex flex-wrap justify-center gap-6 mt-10 text-[9px] font-black text-[#5c4613] uppercase tracking-widest bg-[#f3e5c8] px-5 py-2.5 rounded-2xl border border-[#d2bfa1] shadow-inner">
          <div className="flex items-center gap-1.5">
            <span className="text-base">🧙‍♂️</span>
            <span>ด่านปัจจุบันที่คุณกำลังท้าทาย (Current)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs">⭐</span>
            <span>ด่านที่ผ่านแล้ว (ล็อกห้ามเล่นซ้ำ)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs">🔒</span>
            <span>ด่านยังไม่ถึงคิวปลดล็อก</span>
          </div>
        </div>

      </div>

      {/* LOCKED REPLAY NOTICE MODAL */}
      {lockedNotice && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#fdf5dd] border-8 border-[#5c4613] rounded-[36px] p-6 max-w-sm w-full text-center shadow-2xl border-b-16 border-b-[#42310b] relative animate-in fade-in zoom-in-95 duration-150">
            <div className="w-16 h-16 mx-auto mb-3 bg-amber-100 border-2 border-amber-400 rounded-full flex items-center justify-center text-3xl shadow-inner">
              🔒
            </div>
            <h3 className="text-xl font-black text-[#4c380b] mb-2 uppercase">
              แจ้งเตือนด่านเวทมนตร์
            </h3>
            <p className="text-xs font-bold text-amber-900 mb-5 leading-relaxed px-2">
              {lockedNotice}
            </p>
            <button
              onClick={() => {
                audio.playClick();
                setLockedNotice(null);
              }}
              className="w-full py-3 bg-amber-700 hover:bg-amber-800 text-white font-black text-xs rounded-xl border-b-4 border-amber-900 shadow-md active:scale-95 transition-all cursor-pointer uppercase tracking-wider"
            >
              รับทราบ (ตกลง)
            </button>
          </div>
        </div>
      )}

      {/* OPTIONAL STORYBOOK MODAL */}
      {showStoryModal && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <PrologueSlideshow onDone={() => setShowStoryModal(false)} audioLib={audio} />
        </div>
      )}

    </div>
  );
}
