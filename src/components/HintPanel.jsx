import React, { useState } from 'react';
import { HelpCircle, X, Check, HelpCircle as HelpIcon, Sparkles } from 'lucide-react';

export default function HintPanel({ currentMission, onUseHint, hasUsedHint, score }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenHint = () => {
    if (!isOpen) {
      if (!hasUsedHint && score >= 5) {
        if (confirm("ต้องการเปิดคำใบ้ใช่หรือไม่? (การเปิดคำใบ้สำหรับด่านนี้จะหัก 5 คะแนน)")) {
          onUseHint();
          setIsOpen(true);
        }
      } else if (hasUsedHint) {
        setIsOpen(true);
      } else {
        alert("คุณมีคะแนนไม่เพียงพอสำหรับการใช้คำใบ้ (ต้องการอย่างน้อย 5 คะแนน)");
      }
    } else {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Floating Action Button for Hint */}
      <button
        onClick={handleOpenHint}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-2xl flex items-center gap-2 font-bold transition-all z-40 ${
          hasUsedHint
            ? 'bg-amber-400 hover:bg-amber-500 text-slate-800 animate-pulse'
            : 'bg-slate-700 hover:bg-slate-800 text-white'
        }`}
      >
        <HelpCircle className="w-6 h-6" />
        <span>{hasUsedHint ? 'เปิดคำใบ้ด่านนี้ (ฟรีแล้ว)' : 'เปิดดูคำใบ้ (-5 คะแนน)'}</span>
      </button>

      {/* Slide-over Panel / Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto flex flex-col p-6 animate-scale-up">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-amber-100 text-amber-600 rounded-xl">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">แผงคู่มือการถอดรหัสตรรกศาสตร์</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-lg transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="py-4 space-y-6 flex-1 text-sm text-slate-600">
              {/* Mission Specific Hint */}
              {currentMission && (
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 text-amber-900">
                  <h4 className="font-bold mb-1 flex items-center gap-1.5 text-amber-800 text-base">
                    💡 คำใบ้เฉพาะสำหรับภารกิจนี้:
                  </h4>
                  <p className="font-medium text-slate-700">{currentMission.hint || "ลองพิจารณาตัวเชื่อมและลำดับความสัมพันธ์ให้ดี!"}</p>
                </div>
              )}

              {/* Operators Truth Tables Table */}
              <div>
                <h4 className="font-bold text-slate-800 mb-3 text-base">📊 ตารางค่าความจริงของตัวเชื่อมตรรกศาสตร์</h4>
                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="min-w-full divide-y divide-slate-200 text-center font-medium">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-3 py-2 text-slate-500 font-bold text-xs">P</th>
                        <th className="px-3 py-2 text-slate-500 font-bold text-xs">Q</th>
                        <th className="px-3 py-2 bg-sky-50 text-sky-800 font-bold text-xs">P AND Q (และ)</th>
                        <th className="px-3 py-2 bg-purple-50 text-purple-800 font-bold text-xs">P OR Q (หรือ)</th>
                        <th className="px-3 py-2 bg-amber-50 text-amber-800 font-bold text-xs">P → Q (ถ้า...แล้ว)</th>
                        <th className="px-3 py-2 bg-rose-50 text-rose-800 font-bold text-xs">P ↔ Q (ก็ต่อเมื่อ)</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-100 text-slate-700">
                      <tr>
                        <td className="px-3 py-2 font-bold text-emerald-600">T (จริง)</td>
                        <td className="px-3 py-2 font-bold text-emerald-600">T (จริง)</td>
                        <td className="px-3 py-2 bg-sky-50/40 text-emerald-600 font-bold">T</td>
                        <td className="px-3 py-2 bg-purple-50/40 text-emerald-600 font-bold">T</td>
                        <td className="px-3 py-2 bg-amber-50/40 text-emerald-600 font-bold">T</td>
                        <td className="px-3 py-2 bg-rose-50/40 text-emerald-600 font-bold">T</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-bold text-emerald-600">T (จริง)</td>
                        <td className="px-3 py-2 font-bold text-rose-600">F (เท็จ)</td>
                        <td className="px-3 py-2 bg-sky-50/40 text-rose-600 font-bold">F</td>
                        <td className="px-3 py-2 bg-purple-50/40 text-emerald-600 font-bold">T</td>
                        <td className="px-3 py-2 bg-amber-50/40 text-rose-600 font-bold">F</td>
                        <td className="px-3 py-2 bg-rose-50/40 text-rose-600 font-bold">F</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-bold text-rose-600">F (เท็จ)</td>
                        <td className="px-3 py-2 font-bold text-emerald-600">T (จริง)</td>
                        <td className="px-3 py-2 bg-sky-50/40 text-rose-600 font-bold">F</td>
                        <td className="px-3 py-2 bg-purple-50/40 text-emerald-600 font-bold">T</td>
                        <td className="px-3 py-2 bg-amber-50/40 text-emerald-600 font-bold">T</td>
                        <td className="px-3 py-2 bg-rose-50/40 text-rose-600 font-bold">F</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-bold text-rose-600">F (เท็จ)</td>
                        <td className="px-3 py-2 font-bold text-rose-600">F (เท็จ)</td>
                        <td className="px-3 py-2 bg-sky-50/40 text-rose-600 font-bold">F</td>
                        <td className="px-3 py-2 bg-purple-50/40 text-rose-600 font-bold">F</td>
                        <td className="px-3 py-2 bg-amber-50/40 text-emerald-600 font-bold">T</td>
                        <td className="px-3 py-2 bg-rose-50/40 text-emerald-600 font-bold">T</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Explanations of connectors */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 bg-sky-50 rounded-2xl border border-sky-100">
                  <h5 className="font-bold text-sky-800 mb-1">🔗 AND (และ - ∧)</h5>
                  <p className="text-xs text-sky-950 leading-relaxed">
                    จะเป็น <strong>จริง (T)</strong> เพียงกรณีเดียว คือเมื่อประพจน์ทั้งสองฝั่งมีค่าเป็น จริง (T) พร้อมกัน
                  </p>
                </div>

                <div className="p-3.5 bg-purple-50 rounded-2xl border border-purple-100">
                  <h5 className="font-bold text-purple-800 mb-1">🔗 OR (หรือ - ∨)</h5>
                  <p className="text-xs text-purple-950 leading-relaxed">
                    จะเป็น <strong>เท็จ (F)</strong> เพียงกรณีเดียว คือเมื่อประพจน์ทั้งสองฝั่งมีค่าเป็น เท็จ (F) ทั้งคู่
                  </p>
                </div>

                <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-100">
                  <h5 className="font-bold text-amber-800 mb-1">🔗 IF...THEN (ถ้า...แล้ว - →)</h5>
                  <p className="text-xs text-amber-950 leading-relaxed">
                    จะเป็น <strong>เท็จ (F)</strong> กรณีเดียว คือเมื่อเหตุเป็น จริง (T) แต่ส่งผลให้เกิดผลลัพธ์ที่เป็น เท็จ (F) (จริง ส่งไป เท็จ)
                  </p>
                </div>

                <div className="p-3.5 bg-rose-50 rounded-2xl border border-rose-100">
                  <h5 className="font-bold text-rose-800 mb-1">🔗 IFF (ก็ต่อเมื่อ - ↔)</h5>
                  <p className="text-xs text-rose-950 leading-relaxed">
                    จะเป็น <strong>จริง (T)</strong> เมื่อประพจน์ทั้งสองฝั่งมีค่าความจริงเหมือนกัน (จริง-จริง หรือ เท็จ-เท็จ)
                  </p>
                </div>

                <div className="p-3.5 bg-slate-100 rounded-2xl border border-slate-200 md:col-span-2">
                  <h5 className="font-bold text-slate-800 mb-1">🚫 NOT (นิเสธ - ~)</h5>
                  <p className="text-xs text-slate-900 leading-relaxed">
                    ใช้ในการกลับค่าความจริงเป็นตรงกันข้าม เช่น NOT จริง = เท็จ, NOT เท็จ = จริง
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-2.5 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-900 transition-all text-sm"
              >
                เข้าใจแล้ว กลับไปเล่นเกม
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
