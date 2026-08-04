import React, { useState, useEffect } from 'react';
import { db } from '../lib/supabase';
import { commonMistakes } from '../data/gameData';
import { ArrowLeft, RefreshCw, BarChart2, GraduationCap, Users, Trophy, AlertTriangle, Search, Trash2 } from 'lucide-react';

export default function TeacherDashboard({ onClose }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('All');

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await db.getTeacherDashboardData();
      setStudents(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleResetData = async () => {
    if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลผู้เล่นทั้งหมดออกจากระบบ? (ใช้เมื่อต้องการเริ่มเทอม/คลาสใหม่)")) {
      setLoading(true);
      setStudents([]);
      await db.clearAllData();
      await fetchData();
    }
  };

  const handleUnlockAllReplay = () => {
    if (confirm("คุณแน่ใจหรือไม่ว่าต้องการปลดล็อกด่านให้นักเรียนทุกคนเล่นซ้ำได้? (คะแนนและประวัติเดิมจะยังคงอยู่ครบถ้วน 100%)")) {
      db.unlockAllStudentsProgress();
      alert("✅ ปลดล็อกด่านให้นักเรียนทุกคนเล่นซ้ำเรียบร้อยแล้ว! (คะแนนสะสมเดิมยังคงอยู่ครบ)");
      fetchData();
    }
  };

  const handleUnlockStudentReplay = (student) => {
    if (confirm(`คุณแน่ใจหรือไม่ว่าต้องการปลดล็อกด่านให้คุณ "${student.name}" เล่นซ้ำ? (คะแนนสะสมจะยังคงอยู่)`)) {
      db.unlockStudentProgress(student.id);
      alert(`✅ ปลดล็อกด่านให้คุณ "${student.name}" เรียบร้อยแล้ว!`);
      fetchData();
    }
  };

  const handleExportExcel = () => {
    if (filteredStudents.length === 0) {
      alert("⚠️ ไม่มีข้อมูลนักเรียนให้ส่งออกไฟล์ Excel");
      return;
    }

    // CSV Header with UTF-8 BOM for Microsoft Excel Thai font compatibility
    const headers = ["ลำดับที่", "อีเมลนักเรียน (Google Account)", "ชื่อ - นามสกุล", "ผ่านด่านล่าสุด", "สถานะภารกิจ", "คะแนนพลังเวทสะสม", "ตอบผิด (ครั้ง)", "ใช้คำใบ้ (ครั้ง)", "วันที่บันทึกผล"];

    const rows = filteredStudents.map((student, index) => [
      index + 1,
      `"${student.number && String(student.number).includes('@') ? student.number : (student.email || 'Google Account')}"`,
      `"${student.name || ''}"`,
      `"Level ${student.level_completed || 0}"`,
      student.level_completed >= 5 ? `"สำเร็จครบทุกด่าน"` : `"กำลังดำเนินการ"`,
      student.score || 100,
      student.wrong_attempts || 0,
      student.hints_used || 0,
      `"${student.created_at ? new Date(student.created_at).toLocaleString('th-TH') : '-'}"`
    ]);

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const today = new Date().toISOString().split('T')[0];
    link.setAttribute("href", url);
    link.setAttribute("download", `รายงานผลการเรียน_Logic_Quest_${selectedClass === 'All' ? 'ทุกห้อง' : selectedClass}_${today}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'All' || student.classroom === selectedClass;
    return matchesSearch && matchesClass;
  });

  const totalStudents = students.length;
  const avgScore = totalStudents > 0 
    ? Math.round(students.reduce((sum, s) => sum + s.score, 0) / totalStudents) 
    : 100;
  const totalWrong = students.reduce((sum, s) => sum + (s.wrong_attempts || 0), 0);
  const totalHints = students.reduce((sum, s) => sum + (s.hints_used || 0), 0);

  const classrooms = ['All', ...new Set(students.map(s => s.classroom))];

  return (
    <div className="min-h-screen bg-transparent p-4 md:p-8 flex flex-col items-center justify-center select-none font-sans relative">
      
      {/* Container - Scroll Theme */}
      <div className="w-full max-w-5xl bg-[#fdf5dd] border-8 border-[#5c4613] rounded-[48px] p-6 md:p-8 shadow-2xl relative border-b-16 border-b-[#42310b] text-[#4c380b] ring-12 ring-amber-500/5">
        
        <div className="absolute top-4 left-4 text-sm text-[#8a6e29]/40">⚜️</div>
        <div className="absolute top-4 right-4 text-sm text-[#8a6e29]/40">⚜️</div>

        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 border-b-2 border-dashed border-[#8a6e29]/25 pb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-3 bg-white hover:bg-slate-100 rounded-2xl border-2 border-[#8a6e29]/40 shadow-sm text-slate-500 hover:text-slate-800 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#8a6e29]" />
            </button>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-[#4c380b] tracking-wider uppercase font-sans flex items-center gap-2">
                <GraduationCap className="w-7 h-7 text-[#8a6e29]" /> ทำเนียบผู้สืบเวทมนตร์ (Registrar Board)
              </h1>
              <p className="text-slate-500 text-[10px] font-bold mt-0.5">
                ติดตามประวัติการปลดล็อกคาถา วิเคราะห์ความผิดพลาด และประเมินวิชาตรรกศาสตร์ ปวช.1
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              onClick={fetchData}
              className="p-2.5 bg-white hover:bg-slate-50 rounded-xl border-2 border-[#8a6e29]/40 shadow text-[#5c4613] font-black text-[10px] tracking-wide transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> รีเฟรชวิชา
            </button>

            <button
              onClick={handleExportExcel}
              className="p-2.5 bg-emerald-700 hover:bg-emerald-800 rounded-xl border-2 border-emerald-500 shadow text-white font-black text-[10px] tracking-wide transition-all flex items-center gap-1.5 border-b-4 border-b-emerald-950 cursor-pointer"
              title="ส่งออกรายงานผลการเรียนเป็นไฟล์ Excel (.csv)"
            >
              📊 Export Excel (รายงานคะแนน)
            </button>

            <button
              onClick={handleUnlockAllReplay}
              className="p-2.5 bg-amber-100 hover:bg-amber-200 rounded-xl border-2 border-amber-400 shadow text-amber-950 font-black text-[10px] tracking-wide transition-all flex items-center gap-1.5 border-b-4 border-b-amber-700 cursor-pointer"
              title="ปลดล็อกด่านให้นักเรียนทุกคนเล่นใหม่ โดยเก็บสะสมคะแนนเดิมไว้"
            >
              🔓 ปลดล็อกด่านทุกคน (คงคะแนนเดิม)
            </button>

            <button
              onClick={handleResetData}
              className="p-2.5 bg-rose-50 hover:bg-rose-100 rounded-xl border-2 border-rose-350 shadow text-rose-700 font-black text-[10px] tracking-wide transition-all flex items-center gap-1.5 ml-auto md:ml-0 border-b-4 border-b-rose-900 cursor-pointer"
              title="ลบข้อมูลนักเรียนและคะแนนทั้งหมดออกจากระบบ"
            >
              <Trash2 className="w-3.5 h-3.5" /> ลบประวัติคลาสทั้งหมด
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          {/* Card 1: Total Students */}
          <div className="bg-[#f3e5c8] border border-[#d2bfa1] rounded-2xl p-4 shadow-sm flex items-center gap-3">
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-[#5c4613] rounded-xl">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[8px] font-black text-amber-805/65 uppercase tracking-wider">ผู้ลงเรียนคลาส</span>
              <span className="text-2xl font-black text-[#4c380b] leading-tight">{totalStudents} คน</span>
              <span className="text-[8px] text-slate-500 block leading-tight">ลงทะเบียนเข้าห้องเรียน</span>
            </div>
          </div>

          {/* Card 2: Average Score */}
          <div className="bg-[#f3e5c8] border border-[#d2bfa1] rounded-2xl p-4 shadow-sm flex items-center gap-3">
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-600 rounded-xl">
              <Trophy className="w-5 h-5 fill-amber-500/10" />
            </div>
            <div>
              <span className="block text-[8px] font-black text-amber-805/65 uppercase tracking-wider">พลังเวทเฉลี่ย</span>
              <span className="text-2xl font-black text-amber-700 leading-tight">{avgScore} 🔮</span>
              <span className="text-[8px] text-slate-500 block leading-tight">จากคะแนนตั้งต้น 100</span>
            </div>
          </div>

          {/* Card 3: Wrong Attempts */}
          <div className="bg-[#f3e5c8] border border-[#d2bfa1] rounded-2xl p-4 shadow-sm flex items-center gap-3">
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-600 rounded-xl">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[8px] font-black text-amber-805/65 uppercase tracking-wider">ร่ายคาถาผิดพลาด</span>
              <span className="text-2xl font-black text-rose-600 leading-tight">{totalWrong} ครั้ง</span>
              <span className="text-[8px] text-slate-500 block leading-tight">การตรวจสอบล้มเหลว</span>
            </div>
          </div>

          {/* Card 4: Hints Used */}
          <div className="bg-[#f3e5c8] border border-[#d2bfa1] rounded-2xl p-4 shadow-sm flex items-center gap-3">
            <div className="p-3 bg-teal-500/10 border border-teal-500/20 text-teal-600 rounded-xl">
              <BarChart2 className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[8px] font-black text-amber-805/65 uppercase tracking-wider">เรียกคำใบ้สมุด</span>
              <span className="text-2xl font-black text-teal-700 leading-tight">{totalHints} ครั้ง</span>
              <span className="text-[8px] text-slate-500 block leading-tight">รวมการยอมหักพลังเวท</span>
            </div>
          </div>

        </div>

        {/* Filter Controls */}
        <div className="bg-[#f3e5c8] border border-[#d2bfa1] rounded-2xl p-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
          
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="ค้นหาตามชื่อผู้เรียน..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-amber-250 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50 shadow-inner"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <label className="text-[10px] font-black text-[#8a6e29] uppercase tracking-wider">ตัวกรองคลาสเรียน:</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-3 py-2 bg-white border border-amber-250 rounded-xl text-xs font-black text-[#5c4613] focus:outline-none focus:ring-2 focus:ring-amber-500/50 shadow-sm cursor-pointer"
            >
              {classrooms.map((cls) => (
                <option key={cls} value={cls}>
                  {cls === 'All' ? 'ทุกห้องเรียน' : cls}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Student Progress Table */}
        <div className="bg-white border-2 border-[#ebdcb8] rounded-[24px] shadow-md overflow-hidden mb-8 border-b-6 border-b-[#c2a65d]">
          <div className="p-4 border-b-2 border-dashed border-[#ebdcb8] bg-[#fbf9f4]">
            <h3 className="font-black text-xs text-[#5c4613]">📊 บันทึกทำเนียบความก้าวหน้าและการสอบคลาสเรียน</h3>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="py-14 text-center text-slate-400 font-bold flex flex-col items-center justify-center gap-2">
                <RefreshCw className="w-6 h-6 animate-spin text-amber-600" />
                กำลังเปิดตราสารทะเบียนคลาส...
              </div>
            ) : filteredStudents.length === 0 ? (
              <div className="py-14 text-center text-slate-400 font-extrabold text-xs">
                📭 ไม่พบบันทึกชื่อพ่อมด/แม่มดที่เลือกค้นหา
              </div>
            ) : (
              <table className="min-w-full divide-y divide-[#ebdcb8]">
                <thead className="bg-[#fbf9f4] text-[#8a6e29] font-black text-[9px] uppercase tracking-wider text-left border-b-2 border-[#ebdcb8]">
                  <tr>
                    <th className="px-4 py-3">อีเมลนักเรียน (Google Account)</th>
                    <th className="px-4 py-3">ชื่อ - นามสกุลจริง</th>
                    <th className="px-4 py-3 text-center">ผ่านด่านล่าสุด</th>
                    <th className="px-4 py-3 text-center">พลังเวทสะสม</th>
                    <th className="px-4 py-3 text-center">ตอบผิด (ครั้ง)</th>
                    <th className="px-4 py-3 text-center">ใช้คำใบ้ (ครั้ง)</th>
                    <th className="px-4 py-3 text-center">ปลดล็อกการเล่น</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-bold text-slate-700 bg-white/80">
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-[#ebdcb8]/20 transition-colors">
                      <td className="px-4 py-3 font-black text-amber-900 truncate max-w-[200px]">
                        📧 {student.number && String(student.number).includes('@') ? student.number : (student.email || 'Google Account')}
                      </td>
                      <td className="px-4 py-3 font-black text-slate-850">{student.name}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-[9px] font-black border ${
                          student.level_completed >= 5 
                            ? 'bg-emerald-100 border-emerald-300 text-emerald-800' 
                            : student.level_completed > 0 
                              ? 'bg-sky-100 border-sky-350 text-sky-850'
                              : 'bg-slate-100 border-slate-300 text-slate-500'
                        }`}>
                          Level {student.level_completed} {student.level_completed >= 5 ? '🏆 Clear' : ''}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-center font-black text-amber-700">{student.score} 🔮</td>
                      <td className="px-5 py-3.5 text-center text-rose-600 font-extrabold">{student.wrong_attempts || 0}</td>
                      <td className="px-5 py-3.5 text-center text-teal-600 font-extrabold">{student.hints_used || 0}</td>
                      <td className="px-4 py-3 text-center">
                        <button
                          type="button"
                          onClick={() => handleUnlockStudentReplay(student)}
                          className="px-2.5 py-1 bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 rounded-lg text-[10px] font-black transition-all shadow-xs flex items-center justify-center gap-1 mx-auto cursor-pointer"
                          title="ปลดล็อกด่านให้นักเรียนคนนี้เล่นซ้ำ โดยไม่ลบประวัติคะแนน"
                        >
                          🔓 ปลดล็อกเล่นซ้ำ
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
