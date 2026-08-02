import React, { useState, useEffect } from 'react';
import { db } from '../lib/supabase';
import HintPanel from './HintPanel';
import audio from '../lib/audio';
import confetti from 'canvas-confetti';
import { ArrowLeft, Check, X, ShieldAlert, Sparkles, Heart, Swords, BrainCircuit, RefreshCw, ChevronRight, Layers } from 'lucide-react';

const level1Icons = {
  0: "🏰",
  1: "🔢",
  2: "🪄",
  3: "🦉",
  4: "🧙‍♀️",
  5: "🧹",
  6: "📅",
  7: "🎩",
  8: "➗",
  9: "🧪"
};

const prologueSlides = [
  {
    image: '/chibi_prologue1.jpg',
    chapter: 'ตอนที่ 1',
    title: '🚪 การบุกรุกธนาคารมนตรา',
    text: 'คดีโจรกรรมครั้งใหญ่เกิดขึ้น ณ ใจกลางเมืองอาร์เคน! ธนาคารมนตราถูกบุกรุกโดยไม่ทราบวิธี กริ่งเตือนภัยส่งเสียงดังกังวานลั่นอาคารทันทีในคืนข้างแรม เจ้าหน้าที่รักษากฎหมายประจำเมืองรีบเดินทางมาถึง โดยหน่วยปราบปรามใช้ตราเป็นเหรียญทองสลักลายคันชั่งแห่งสัจจะประดับบนหน้าอกเสื้อ',
  },
  {
    image: '/chibi_prologue2_crime.jpg',
    chapter: 'ตอนที่ 2',
    title: '🧪 ร่องรอยเหยื่อในที่เกิดเหตุ',
    text: 'ณ พื้นห้องโถงนิรภัยชั้นใต้ดิน เจ้าหน้าที่พบร่างของหัวหน้าผู้ดูแลคลังสมบัติเสียชีวิตในหน้าที่ โดยเวทประมวลชีพจรระบุเวลาชัดเจนว่าเหยื่อเสียชีวิตตอนเที่ยงคืนตรง',
  },
  {
    image: '/chibi_prologue2.jpg',
    chapter: 'ตอนที่ 3',
    title: '🔬 ผลการตรวจนิติเคมี',
    text: 'เจ้าหน้าที่พบขวดแก้วต้องสงสัยตกอยู่ใกล้ผู้ตาย ผลการตรวจวิเคราะห์จากห้องแล็บยืนยันว่าสารพิษคือยาพิษผสมน้ำยากล่อมประสาท และพบรอยนิ้วมือเวทมนตร์ประทับอยู่บนขวดอย่างหนาแน่น',
  },
  {
    image: '/chibi_prologue3.jpg',
    chapter: 'ตอนที่ 4',
    title: '🧹 ร่องรอยเวทมนตร์และการหลบหนี',
    text: 'เจ้าหน้าที่ชันสูตรตรวจพบว่าเวทสะกดรอยทิ้งสะเก็ดฝุ่นเรืองแสงสีครามจางๆ ไว้บนพื้น นอกจากนี้ คริสตัลบันทึกภาพแสดงให้เห็นคนร้ายชุดดำอุ้มหีบของกลางหลบหนีไป พร้อมทิ้งกระแสลมพายุหมุนเวทมนตร์จากการใช้ไม้กวาดบินความเร็วสูงไว้บนยอดหอคอย',
  },
  {
    image: '/chibi_prologue4.jpg',
    chapter: 'ตอนที่ 5',
    title: '📢 คำให้การและเบาะแสในที่เกิดเหตุ',
    text: 'การสอบสวนพยานเต็มไปด้วยความสับสน มีเสียงพนักงานตะโกนขึ้นมาหลายประโยค เช่น "คนร้ายเข้าไปในธนาคารได้อย่างไร?", "จงจับตัวคนร้ายคนนั้นเดี๋ยวนี้!", "โอ้พระเจ้า! คัมภีร์เวทมนตร์อันล้ำค่าหายไปแล้ว" ทำให้เจ้าหน้าที่ต้องรวบรวมเบาะแสบนกระดานสืบสวนอย่างตึงเครียด',
  },
];

function PrologueSlideshow({ onDone, audioLib }) {
  const [slideIdx, setSlideIdx] = useState(0);
  const slide = prologueSlides[slideIdx];
  const isLast = slideIdx === prologueSlides.length - 1;
  return (
    <div className="w-full max-w-xl mx-auto bg-[#fffdf5] border-4 border-[#8c6d23] rounded-2xl shadow-xl flex flex-col text-[#4c380b] overflow-hidden animate-fade-in my-auto">
      {/* Image container using exact 3:2 aspect ratio so full image is visible without cropping */}
      <div className="relative w-full aspect-[3/2] bg-[#1a1208] flex items-center justify-center overflow-hidden">
        <img src={slide.image} alt={slide.title} className="w-full h-full object-contain" />
        <div className="absolute top-2.5 left-2.5 bg-[#8b0000] text-amber-100 text-[10px] font-black px-3 py-0.5 rounded-full border border-[#b8860b] shadow z-10">
          📖 {slide.chapter} ({slideIdx + 1}/{prologueSlides.length})
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 bg-black/50 px-2.5 py-0.5 rounded-full backdrop-blur-sm z-10">
          {prologueSlides.map((_,i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === slideIdx ? 'bg-amber-400 w-4' : 'bg-white/50 w-1.5'}`} />
          ))}
        </div>
      </div>


      {/* Content */}
      <div className="p-3.5 sm:p-4 flex flex-col gap-2 bg-[#fffdf5]">
        <h2 className="text-sm sm:text-base font-black text-amber-900 border-b border-amber-200 pb-1">
          {slide.title}
        </h2>
        <p className="text-xs sm:text-sm font-bold text-[#4c380b] leading-relaxed bg-[#fcf8ed] p-3 rounded-xl border border-[#e6dab7]">
          {slide.text}
        </p>

        {/* Buttons */}
        <div className="flex gap-2.5 mt-1">
          {slideIdx > 0 && (
            <button onClick={() => { audioLib.playClick(); setSlideIdx(i => i - 1); }}
              className="px-4 py-2 bg-white border border-[#d4af37] text-amber-900 font-black rounded-xl text-xs hover:bg-amber-50 transition-all shadow-sm">
              ← ย้อนกลับ
            </button>
          )}
          <button
            onClick={() => { audioLib.playClick(); if (isLast) onDone(); else setSlideIdx(i => i + 1); }}
            className="flex-1 py-2 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-black rounded-xl shadow transition-all text-xs border-b-2 border-b-amber-800 flex items-center justify-center gap-1.5">
            {isLast ? 'เริ่มสืบสวนคัดแยกการ์ด 🔍' : `ถัดไป (${slideIdx + 2}/${prologueSlides.length}) →`}
          </button>
        </div>
      </div>
    </div>
  );
}



const levelBriefings = {
  1: {
    title: "ด่าน 1: ห้องโถงวิเคราะห์หลักฐาน",
    icon: "🔎",
    desc: "ภารกิจจำแนกประพจน์: อ่านข้อความการ์ดแต่ละใบ แล้วคัดแยกให้ออกว่าข้อความไหนเป็นประพจน์จริง, ประพจน์เท็จ หรือ ไม่ใช่ประพจน์",
    rules: [
      "🟢 ประพจน์จริง: ประโยคบอกเล่า/ปฏิเสธ ที่สรุปได้ว่าเป็นจริงแน่นอน",
      "🔴 ประพจน์เท็จ: ประโยคบอกเล่า/ปฏิเสธ ที่สรุปได้ว่าเป็นเท็จแน่นอน",
      "❓ ไม่ใช่ประพจน์: ประโยคคำถาม คำสั่ง ขอร้อง อุทาน (สรุปจริง/เท็จไม่ได้)"
    ]
  },
  2: {
    title: "ด่าน 2: ห้องแล็บปรุงยาพิษเวทมนตร์",
    icon: "🧪",
    desc: "ภารกิจต่อประพจน์พื้นฐาน: เลือกการ์ดประพจน์เบาะแส และ ตัวเชื่อม (และ, หรือ, ไม่) มาต่อวงจรตรรกะให้ได้คำตอบเป็น จริง",
    rules: [
      "🔮 ตัวเชื่อม 'และ' (AND): ต้องจริงทั้งคู่ คำตอบจึงจะเป็น จริง",
      "🔮 ตัวเชื่อม 'หรือ' (OR): มีจริงแค่อย่างน้อย 1 ฝั่ง คำตอบจะเป็น จริง",
      "🔮 ตัวเชื่อม 'ไม่' (NOT): เปลี่ยนค่าตรรกะให้เป็นตรงกันข้าม (เท็จ ➔ จริง)"
    ]
  },
  3: {
    title: "ด่าน 3: ที่เกิดเหตุตรอกรัตติกาล",
    icon: "📜",
    desc: "ภารกิจวิเคราะห์เงื่อนไข: เลือกตัวเชื่อมเหตุและผล (ถ้า...แล้ว, ก็ต่อเมื่อ) มาต่อประโยคให้ได้คำตอบเป็น จริง",
    rules: [
      "📜 ตัวเชื่อม 'ถ้า...แล้ว' (IF...THEN): เป็นเท็จกรณีเดียว คือ เหตุจริง แต่ ผลเท็จ",
      "🔐 ตัวเชื่อม 'ก็ต่อเมื่อ' (IFF): ต้องมีค่าความจริงเหมือนกันทั้งสองฝั่ง จึงจะเป็น จริง"
    ]
  },
  4: {
    title: "ด่าน 4: สำนักงานใหญ่กองสืบสวน",
    icon: "🛡️",
    desc: "ภารกิจอนุมัติแฟ้มลับ: ร้อยเรียงสมการตรรกะประสม 3 เงื่อนไขเข้าด้วยกันให้เป็นจริง",
    rules: [
      "🛡️ เลือกการ์ดประพจน์เบาะแสและตัวเชื่อมให้ครบทุกช่องสล็อต",
      "🛡️ ใช้การ์ดปฏิเสธ 'ไม่' วางไว้หน้าเงื่อนไขข้อห้ามเพื่อเปลี่ยนค่าเป็นจริง"
    ]
  },
  5: {
    title: "ด่าน 5: ห้องนิรภัยธนาคารเวทมนตร์",
    icon: "🔒",
    desc: "ภารกิจถอดสลักประตู: ใส่วงเล็บ ( ) จัดลำดับความสำคัญของตรรกศาสตร์เพื่อกู้ศิลานักปราชญ์",
    rules: [
      "🔒 วางวงเล็บ ( ) ล้อมประโยคย่อยที่ต้องการให้ประมวลผลก่อน",
      "🔒 นำผลลัพธ์ในวงเล็บไปเชื่อมกับเงื่อนไขภายนอกเพื่อถอดสลักประตู"
    ]
  }
};

export default function GameArea({ level, student, score, onUpdateScore, onResetScore, onBackToMap, onLevelCompleted }) {
  const [currentMissionIdx, setCurrentMissionIdx] = useState(0);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [hasUsedHintForThisMission, setHasUsedHintForThisMission] = useState(false);
  const [hasUsedFreeHint, setHasUsedFreeHint] = useState(false);
  const [showLevelBriefing, setShowLevelBriefing] = useState(true);
  const [zoomedImage, setZoomedImage] = useState(null);

  // Reset briefing state when level changes
  useEffect(() => {
    setShowLevelBriefing(true);
  }, [level.id]);

  // Level 1 states
  const [sortingItems, setSortingItems] = useState([]);
  const [sortingActiveIdx, setSortingActiveIdx] = useState(0);
  const [sortingResults, setSortingResults] = useState([]);
  const [showLevel1Prologue, setShowLevel1Prologue] = useState(true);

  const [levelDeck, setLevelDeck] = useState([]); 
  const [drawnCards, setDrawnCards] = useState([]); 
  const [placedCards, setPlacedCards] = useState([]); 
  const [discardedCards, setDiscardedCards] = useState([]); 
  const [feedback, setFeedback] = useState(null);

  // Special card states
  const SPECIAL_CARDS = [
    { id: 'flip',   name: 'พลิกค่า',       emoji: '🔄', image: '/images/special_flip.jpg',   color: 'purple', desc: 'เปลี่ยนค่าจริง↔เท็จของการ์ดในสล็อต' },
    { id: 'shield', name: 'โล่ป้องกัน',   emoji: '🛡️', image: '/images/special_shield.jpg', color: 'teal',   desc: 'ป้องกันการเสียคะแนน 1 ครั้ง' },
    { id: 'reveal', name: 'เผยความจริง',   emoji: '👁️', image: '/images/special_reveal.jpg', color: 'amber',  desc: 'ดูเฉลย 5 วินาที (หัก 15 แต้ม)' },
  ];
  const [specialHand, setSpecialHand] = useState([]);
  const [shieldActive, setShieldActive] = useState(false);
  const [flipMode, setFlipMode] = useState(false);
  const [revealActive, setRevealActive] = useState(false);
  const [revealTimeout, setRevealTimeout] = useState(null);
  const [correctAnswerPreview, setCorrectAnswerPreview] = useState(null);

  const currentMission = level.missions[currentMissionIdx];

  const activeMission = level.gameType === 'sorting'
    ? sortingItems[sortingActiveIdx] || currentMission
    : currentMission;

  // Initialize level deck when entering a level
  useEffect(() => {
    if (level.gameType === 'sorting') {
      const items = [...level.missions];
      setSortingItems(items);
      setSortingActiveIdx(0);
      setSortingResults([]);
      setShowLevel1Prologue(true);
    } else {
      const allLevelCards = level.missions.flatMap((mission, mIdx) => 
        mission.cards.map((card, cIdx) => ({
          ...card,
          instanceId: `${card.id}_m${mIdx}_c${cIdx}`,
          missionIndex: mIdx
        }))
      );
      setLevelDeck(allLevelCards);
      setDrawnCards([]);
      setPlacedCards([]);
      setDiscardedCards([]);
      setFeedback(null);
      setWrongAttempts(0);
      setHintsUsed(0);
      setHasUsedHintForThisMission(false);
      setHasUsedFreeHint(false);
      setCurrentMissionIdx(0);
    }
  }, [level]);

  // Award a random special card when 3 correct in a row (tracked via wrongAttempts reset)
  const awardSpecialCard = () => {
    const pick = SPECIAL_CARDS[Math.floor(Math.random() * SPECIAL_CARDS.length)];
    setSpecialHand(prev => [...prev, { ...pick, instanceId: `${pick.id}_${Date.now()}` }]);
  };

  // Transition to next situation: Clear slots, keep hand, keep remaining deck
  useEffect(() => {
    if (level.gameType === 'builder' && currentMissionIdx > 0) {
      if (placedCards.length > 0) {
        setDiscardedCards(prev => [...prev, ...placedCards]);
      }
      setPlacedCards([]);
      setFeedback(null);
      setHasUsedHintForThisMission(false);
    }
  }, [currentMissionIdx]);

  useEffect(() => {
    if (level.gameType === 'sorting') {
      setHasUsedHintForThisMission(false);
    }
  }, [sortingActiveIdx]);

  const handleUpdateGameScore = (points) => {
    let finalPoints = points;
    if (points > 0 && points === 10 && student.character?.id === 'basilisk') {
      finalPoints = 12;
    }
    if (points < 0 && points === -5 && student.character?.id === 'unicorn') {
      finalPoints = -3;
    }
    onUpdateScore(finalPoints);
  };

  const handleSort = (category) => {
    const activeItem = sortingItems[sortingActiveIdx];
    const isCorrect = activeItem.correctCategory === category;

    if (isCorrect) {
      audio.playSuccess();
      handleUpdateGameScore(10);
      triggerMiniConfetti();
    } else {
      audio.playError();
      handleUpdateGameScore(-5);
      setWrongAttempts(prev => prev + 1);
    }

    setSortingResults(prev => [
      ...prev,
      {
        item: activeItem,
        selected: category,
        isCorrect
      }
    ]);

    if (sortingActiveIdx < sortingItems.length - 1) {
      setSortingActiveIdx(prev => prev + 1);
    } else {
      triggerConfetti();
      saveLevelResult();
    }
  };

  // --- CARD DRAW GAME ENGINE ---

  const getIsCardUsed = (instanceId) => {
    return (
      drawnCards.some(c => c.instanceId === instanceId) || 
      placedCards.some(c => c.instanceId === instanceId) ||
      discardedCards.some(c => c.instanceId === instanceId)
    );
  };

  const handleDrawCard = (type) => {
    if (feedback?.status === 'success') return;
    const pool = levelDeck.filter(c => c.type === type && !getIsCardUsed(c.instanceId));

    if (pool.length > 0) {
      audio.playDraw();
      const cardToDraw = pool[0];
      setDrawnCards(prev => [...prev, cardToDraw]);
      setFeedback(null);
    }
  };

  const handlePlaceCard = (card) => {
    if (feedback?.status === 'success') return;
    audio.playPlace();
    setPlacedCards(prev => [...prev, card]);
    setDrawnCards(prev => prev.filter(c => c.instanceId !== card.instanceId));
    setFeedback(null);
  };

  const handleRemoveCard = (cardToRemove) => {
    if (feedback?.status === 'success') return;
    audio.playPlace();
    setDrawnCards(prev => [...prev, cardToRemove]);
    setPlacedCards(prev => prev.filter(c => c.instanceId !== cardToRemove.instanceId));
    setFeedback(null);
  };

  const handleClearCards = () => {
    audio.playClick();
    setDrawnCards([]);
    setPlacedCards([]);
    setFeedback(null);
  };

  const generateLogicSteps = () => {
    if (placedCards.length === 0) return null;

    const valueString = placedCards.map(c => {
      if (c.type === 'Statement') {
        return c.value ? 'จริง' : 'เท็จ';
      }
      return c.content;
    }).join(' ');

    return { valueString };
  };

  const handleSubmitBuilder = () => {
    const expected = currentMission.expectedPattern;
    let isMatch = false;

    // Structure types check (e.g. Statement, Operator, Statement)
    const placedTypes = placedCards.map(c => c.type === 'Statement' ? 'Statement' : c.operator);
    const expectedTypes = expected.map(item => (item === 'P' || item === 'Q' || item === 'R' || item === 'S') ? 'Statement' : item);

    const structureMatch = placedTypes.length === expectedTypes.length &&
                           placedTypes.every((type, idx) => type === expectedTypes[idx]);

    if (structureMatch) {
      let evalSuccess = false;

      if (placedCards.length === 3 && placedCards[1].type === 'Operator') {
        const v1 = placedCards[0].value;
        const op = placedCards[1].operator;
        const v2 = placedCards[2].value;

        if (op === 'AND') evalSuccess = (v1 && v2);
        else if (op === 'OR') evalSuccess = (v1 || v2);
        else if (op === 'IFF') evalSuccess = (v1 === v2);
        else if (op === 'IF_THEN') evalSuccess = (!v1 || v2);
      } else if (placedCards.length === 2 && placedCards[0].operator === 'NOT') {
        evalSuccess = (!placedCards[1].value);
      } else {
        // For multi-card expressions (L4 & L5), evaluate exact or truth-value matching
        const exactIdMatch = placedCards.every((c, idx) => {
          const expId = expected[idx];
          if (c.type === 'Statement') {
            const expCard = currentMission.cards.find(m => m.id === expId);
            return expCard ? c.value === expCard.value : true;
          }
          return (c.operator || c.id) === expId;
        });
        evalSuccess = exactIdMatch;
      }

      if (evalSuccess) {
        isMatch = true;
      }
    }

    // Fallback exact ID / commutative check
    if (!isMatch) {
      const placedPattern = placedCards.map(c => c.operator || c.id);
      const exactIdMatch = placedPattern.length === expected.length &&
                         placedPattern.every((val, index) => val === expected[index]);
      if (exactIdMatch) {
        isMatch = true;
      } else if (expected.length === 3 && (expected[1] === 'AND' || expected[1] === 'OR' || expected[1] === 'IFF')) {
        const op = expected[1];
        const commMatch = placedPattern.length === 3 && placedPattern[1] === op &&
                          ((placedPattern[0] === expected[0] && placedPattern[2] === expected[2]) ||
                           (placedPattern[0] === expected[2] && placedPattern[2] === expected[0]));
        if (commMatch) isMatch = true;
      }
    }

    if (isMatch) {
      audio.playSuccess();
      triggerConfetti();
      setFeedback({
        status: 'success',
        text: `🔮 ร่ายเวทสำเร็จ! คาถาตรรกะทำลายเกราะล็อกสะกดของศัตรู`
      });
      handleUpdateGameScore(10);

      setTimeout(() => {
        if (currentMissionIdx < level.missions.length - 1) {
          setCurrentMissionIdx(prev => prev + 1);
        } else {
          setDiscardedCards(prev => [...prev, ...placedCards]);
          saveLevelResult();
        }
      }, 2500);
    } else {
      audio.playError();
      if (shieldActive) {
        setShieldActive(false);
        setFeedback({ status: 'info', text: '🛡️ โล่ป้องกันรับแทน! ไม่เสียคะแนนรอบนี้ แต่โล่แตกแล้ว' });
      } else {
        setFeedback({
          status: 'error',
          text: '⚡ คาถาล้มเหลว! การต่อการ์ดยังไม่ตรงกับเงื่อนไขของสถานการณ์'
        });
        handleUpdateGameScore(-5);
        setWrongAttempts(prev => prev + 1);
      }
    }
  };

  const triggerMiniConfetti = () => {
    confetti({
      particleCount: 30,
      spread: 40,
      origin: { y: 0.8 }
    });
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const saveLevelResult = async () => {
    try {
      await db.saveGameResult({
        studentId: student.id,
        levelCompleted: level.id,
        score: score,
        wrongAttempts: wrongAttempts,
        hintsUsed: hintsUsed
      });
      onLevelCompleted(level.id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUseHint = () => {
    audio.playClick();
    setHintsUsed(prev => prev + 1);
    setHasUsedHintForThisMission(true);
    if (student.character?.id === 'griffin' && !hasUsedFreeHint) {
      setHasUsedFreeHint(true);
    } else {
      onUpdateScore(-5);
    }
  };

  // --- Special Card Handlers ---
  const handleDrawSpecialCard = () => {
    if (specialHand.length >= 2) return; // max 2 special cards in hand
    const pick = SPECIAL_CARDS[Math.floor(Math.random() * SPECIAL_CARDS.length)];
    audio.playClick();
    setSpecialHand(prev => [...prev, { ...pick, instanceId: `${pick.id}_${Date.now()}` }]);
  };

  const handleUseSpecialCard = (card) => {
    audio.playClick();
    // Remove from hand first
    setSpecialHand(prev => prev.filter(c => c.instanceId !== card.instanceId));

    if (card.id === 'shield') {
      setShieldActive(true);
      setFeedback({ status: 'info', text: '🛡️ โล่ป้องกันพร้อมใช้งาน! คำตอบผิดครั้งต่อไปจะไม่เสียคะแนน' });
      setTimeout(() => setFeedback(null), 2500);
    }

    if (card.id === 'flip') {
      if (placedCards.length === 0) {
        setFeedback({ status: 'error', text: '🔄 ต้องวางการ์ดในสล็อตก่อนถึงจะใช้การ์ดพลิกค่าได้!' });
        setTimeout(() => setFeedback(null), 2000);
        // return card to hand
        setSpecialHand(prev => [...prev, card]);
        return;
      }
      setFlipMode(true);
      setFeedback({ status: 'info', text: '🔄 โหมดพลิกค่า: แตะการ์ดในสล็อตที่ต้องการเปลี่ยนค่า จริง↔เท็จ' });
    }

    if (card.id === 'reveal') {
      onUpdateScore(-15);
      const mission = currentMission;
      setRevealActive(true);
      setCorrectAnswerPreview(mission.hint || mission.explanation || 'ดูที่ Hint ด้านล่างเพื่อดูเฉลยเพิ่มเติม');
      setFeedback({ status: 'info', text: '👁️ เผยความจริง: ดูเฉลยได้ 5 วินาที...' });
      const t = setTimeout(() => {
        setRevealActive(false);
        setCorrectAnswerPreview(null);
        setFeedback(null);
      }, 5000);
      setRevealTimeout(t);
    }
  };

  const handleFlipSlotCard = (cardToFlip) => {
    if (!flipMode) return;
    if (cardToFlip.type !== 'Statement') {
      setFeedback({ status: 'error', text: '🔄 พลิกได้เฉพาะการ์ดประพจน์เท่านั้น!' });
      setTimeout(() => setFeedback(null), 1500);
      return;
    }
    setPlacedCards(prev => prev.map(c =>
      c.instanceId === cardToFlip.instanceId ? { ...c, value: !c.value } : c
    ));
    setFlipMode(false);
    setFeedback({ status: 'success', text: `🔄 พลิกค่าสำเร็จ! "${cardToFlip.content}" เปลี่ยนเป็น ${!cardToFlip.value ? 'จริง' : 'เท็จ'}` });
    setTimeout(() => setFeedback(null), 2000);
  };

  const remainingStatements = level.gameType === 'builder'
    ? levelDeck.filter(c => c.type === 'Statement' && !getIsCardUsed(c.instanceId)).length
    : 0;

  const remainingOperators = level.gameType === 'builder'
    ? levelDeck.filter(c => c.type === 'Operator' && !getIsCardUsed(c.instanceId)).length
    : 0;

  const briefing = levelBriefings[level.id] || levelBriefings[1];

  return (
    <div className="min-h-screen bg-transparent p-2.5 md:p-6 flex flex-col items-center pb-28 select-none font-sans relative">
      
      {/* COMPULSORY LEVEL BRIEFING MODAL */}
      {showLevelBriefing && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#fffdf7] border-4 border-[#8c6d23] rounded-3xl p-5 md:p-7 max-w-lg w-full shadow-2xl text-[#4c380b] border-b-8 border-b-[#5c4613] relative">
            <div className="flex items-center gap-3 mb-3 border-b-2 border-amber-200 pb-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 border-2 border-amber-200 flex items-center justify-center text-3xl shadow">
                {briefing.icon}
              </div>
              <div>
                <span className="text-[10px] font-black text-amber-800 uppercase tracking-widest block">📜 คำชี้แจงประจำด่านที่ {level.id}</span>
                <h2 className="text-lg md:text-xl font-black text-amber-950">{briefing.title}</h2>
              </div>
            </div>

            <p className="text-xs md:text-sm font-black text-amber-900 leading-relaxed mb-4 bg-amber-50 p-3 rounded-xl border border-amber-200">
              {briefing.desc}
            </p>

            <div className="space-y-2 mb-6">
              <span className="text-xs font-black text-amber-900 block uppercase tracking-wider">💡 กติกาการเล่นคดีนี้:</span>
              {briefing.rules.map((rule, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-amber-200 shadow-xs">
                  <span className="text-xs font-extrabold text-amber-950 leading-snug">{rule}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => { audio.playClick(); setShowLevelBriefing(false); }}
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-600 hover:to-yellow-700 text-white font-black text-sm md:text-base rounded-2xl shadow-xl border-b-4 border-b-amber-800 transition-all flex items-center justify-center gap-2 active:translate-y-0.5"
            >
              <span>🚀 เข้าสู่ภารกิจด่านที่ {level.id}!</span>
            </button>
          </div>
        </div>
      )}

      {/* FULL-SIZE IMAGE ZOOM MODAL */}
      {zoomedImage && (
        <div onClick={() => setZoomedImage(null)} className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-pointer animate-fade-in">
          <div className="relative max-w-2xl w-full bg-[#fffdf7] border-4 border-[#8c6d23] rounded-3xl p-3 shadow-2xl overflow-hidden border-b-8 border-b-[#5c4613]" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setZoomedImage(null)} className="absolute top-3 right-3 bg-rose-600 text-white rounded-full p-2 font-black shadow-lg hover:bg-rose-700 z-10">
              <X className="w-5 h-5" />
            </button>
            <img src={zoomedImage} alt="ขยายใหญ่" className="w-full h-auto max-h-[80vh] object-contain rounded-2xl bg-amber-50" />
            <p className="text-center text-xs font-black text-amber-900 mt-2">แตะปุ่ม ✕ หรือพื้นหลังเพื่อปิดหน้าต่างขยาย</p>
          </div>
        </div>
      )}

      {/* Floating golden magic dust halos */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-amber-400/10 rounded-full filter blur-[110px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-yellow-200/10 rounded-full filter blur-[110px] pointer-events-none animate-pulse"></div>

      {/* Top HUD - Bright Wizard Gold Wood Plaque */}
      <div className="w-full max-w-5xl bg-gradient-to-r from-[#ebdcb8] to-[#f5ebd0] border-2 border-[#d4af37] rounded-2xl md:rounded-3xl p-3 md:p-4 flex items-center justify-between gap-3 md:gap-4 mb-4 md:mb-6 shadow-xl border-b-6 border-b-[#c2a65d] z-10 text-[#5c4613]">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-amber-400 bg-white overflow-hidden shadow-lg flex items-center justify-center p-0 relative">
            {student.character?.image ? (
              <img src={student.character.image} alt={student.character.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-xl md:text-2xl filter drop-shadow">{student.character?.avatar || "🧙‍♂️"}</span>
            )}
            <div className="absolute -bottom-1 -right-1 bg-amber-600 border border-amber-300 text-white text-[5px] md:text-[6px] font-black px-1.5 py-0.2 rounded-full">
              {student.character?.ability}
            </div>
          </div>
          <div>
            <h2 className="text-[10px] md:text-xs font-black text-[#4c380b]">
              ผู้เรียน: <span className="text-[#8c530b] font-extrabold">{student.name}</span>
            </h2>
            <p className="text-[#4c380b]/75 text-[8px] md:text-[9px] font-black tracking-wider">
              ห้อง {student.classroom.split('/')[1] || student.classroom} | เลขที่ {student.number}
            </p>
          </div>
        </div>

        {/* Level Title */}
        <div className="text-center">
          <span className="px-2 md:px-3 py-0.5 bg-amber-500/20 border border-amber-500/40 rounded-full text-[8px] md:text-[9px] font-black text-[#8a6e29] uppercase tracking-wider">
            {level.title.split(':')[0]}
          </span>
          {level.gameType === 'builder' && (
            <div className="mt-0.5 text-[8px] md:text-[10px] font-black text-[#5c4613]/70">
              ข้อ {currentMissionIdx + 1}/{level.missions.length}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <div className="bg-[#fffcf5] border border-amber-300 px-2 md:px-3.5 py-1 rounded-xl font-black text-amber-705 text-[10px] md:text-xs shadow-sm">
            {score} 🔮
          </div>
          <button 
            onClick={() => {
              audio.playClick();
              onBackToMap();
            }}
            className="px-2.5 py-1 bg-gradient-to-r from-red-800 to-rose-900 hover:from-red-900 hover:to-rose-950 text-white font-black rounded-lg border border-red-650 shadow transition-all text-[9px] md:text-[10px] border-b-4 border-b-red-950"
          >
            ออก
          </button>
        </div>
      </div>

      {/* Main Table Layout */}
      <div className="w-full max-w-5xl flex-1 flex flex-col gap-4 md:gap-6 z-10">
        
        {/* LEVEL 1: SORTING LAYOUT */}
        {level.gameType === 'sorting' && (
          showLevel1Prologue ? (
            <PrologueSlideshow onDone={() => setShowLevel1Prologue(false)} audioLib={audio} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-stretch w-full">
              
              {/* Left Panel */}
              <div className="md:col-span-5 flex justify-center items-center">
                {sortingActiveIdx < sortingItems.length ? (
                  <div className="w-full max-w-sm flex flex-col items-center justify-center">
                    {sortingItems[sortingActiveIdx]?.image ? (
                      <div className="w-full max-w-[240px] md:max-w-[265px] mx-auto rounded-2xl overflow-hidden border-4 border-[#5c4613] shadow-2xl border-b-8 border-b-[#42310b] relative transition-transform hover:scale-[1.02]">
                        <img 
                          src={sortingItems[sortingActiveIdx].image} 
                          alt={sortingItems[sortingActiveIdx].statement} 
                          className="w-full h-auto block"
                        />
                        {/* Dynamic Parchment Banner Overlay */}
                        <div className="absolute bottom-[3%] inset-x-[3.5%] bg-[#deb87a] border-2 border-[#5c4613] rounded-xl p-2.5 text-center shadow-lg flex items-center justify-center min-h-[58px]">
                          <p className="text-xs md:text-sm font-black text-[#382305] leading-snug">
                            {sortingItems[sortingActiveIdx].statement}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full aspect-square rounded-xl md:rounded-2xl border-2 border-[#e6d5b0] overflow-hidden bg-[#faf3db] shadow-inner relative flex items-center justify-center">
                        <span className="text-6xl md:text-8xl filter drop-shadow animate-pulse select-none">
                          {level1Icons[sortingActiveIdx] || "🔮"}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full max-w-sm bg-white border-2 border-[#d4af37] rounded-[24px] p-5 shadow-xl flex flex-col items-center justify-center text-center">
                    <span className="text-3xl mb-2">🏆</span>
                    <h3 className="text-sm font-black text-[#58410b]">วิเคราะห์ด่าน 1 เสร็จสิ้น</h3>
                    <button 
                      onClick={() => {
                        audio.playClick();
                        onBackToMap();
                      }}
                      className="mt-5 px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white font-black rounded-lg text-xs transition-all shadow"
                    >
                      กลับสู่แผนที่ใหญ่
                    </button>
                  </div>
                )}
              </div>

              {/* Right Panel */}
              <div className="md:col-span-7 bg-[#fdf5dd] border-8 border-[#5c4613] rounded-[28px] md:rounded-[32px] p-4 md:p-6 shadow-2xl flex flex-col justify-between border-b-16 border-b-[#42310b] text-[#4c380b] ring-12 ring-amber-500/5">
                
                <div className="border border-red-500/35 bg-[#fff5f5]/85 rounded-xl p-3 shadow-inner">
                  <span className="px-3 py-0.5 bg-red-800 text-amber-100 rounded-full text-[8px] font-black tracking-wider uppercase">
                    ข้อที่ {sortingActiveIdx + 1}/10
                  </span>
                  
                  <h3 className="text-sm md:text-base font-black text-red-950 mt-1.5 font-sans">
                    💡 กิจกรรมคัดแยกประพจน์
                  </h3>
                  <p className="text-red-900 text-[8px] md:text-[10px] font-bold mt-1 leading-relaxed">
                    คลิกเลือกปุ่มด้านล่างเพื่อระบุว่าข้อความการ์ดทางซ้ายมือ เป็นประพจน์จริง เป็นประพจน์เท็จ หรือไม่ใช่ประพจน์
                  </p>
                </div>

                {sortingActiveIdx < sortingItems.length ? (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 my-6 md:my-8">
                    <button
                      onClick={() => handleSort('true_prop')}
                      className="p-3.5 sm:p-6 bg-[#e3f2fd] hover:bg-[#bbdefb] border-2 border-sky-300 hover:border-sky-400 text-sky-900 rounded-2xl md:rounded-3xl shadow transition-all flex flex-row sm:flex-col items-center justify-center gap-3 border-b-4 border-b-sky-400 font-black cursor-pointer hover:scale-105 active:scale-95"
                    >
                      <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-sky-600 text-white flex items-center justify-center text-lg sm:text-2xl font-black shadow">T</div>
                      <span className="font-black text-xs md:text-sm">ประพจน์ จริง</span>
                    </button>

                    <button
                      onClick={() => handleSort('false_prop')}
                      className="p-3.5 sm:p-6 bg-[#fce4ec] hover:bg-[#f8bbd0] border-2 border-rose-350 hover:border-rose-400 text-rose-900 rounded-2xl md:rounded-3xl shadow transition-all flex flex-row sm:flex-col items-center justify-center gap-3 border-b-4 border-b-rose-400 font-black cursor-pointer hover:scale-105 active:scale-95"
                    >
                      <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-rose-500 text-white flex items-center justify-center text-lg sm:text-2xl font-black shadow">F</div>
                      <span className="font-black text-xs md:text-sm">ประพจน์ เท็จ</span>
                    </button>

                    <button
                      onClick={() => handleSort('non_prop')}
                      className="p-3.5 sm:p-6 bg-[#e8f5e9] hover:bg-[#c8e6c9] border-2 border-emerald-350 hover:border-emerald-450 text-emerald-900 rounded-2xl md:rounded-3xl shadow transition-all flex flex-row sm:flex-col items-center justify-center gap-3 border-b-4 border-b-emerald-400 font-black cursor-pointer hover:scale-105 active:scale-95"
                    >
                      <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center text-lg sm:text-2xl font-black shadow">?</div>
                      <span className="font-black text-xs md:text-sm">ไม่ใช่ประพจน์</span>
                    </button>
                  </div>
                ) : null}

                {sortingActiveIdx < sortingItems.length && (
                  <div className="flex justify-center gap-1.5 mt-auto pt-4 border-t border-[#e6dab7]">
                    {sortingItems.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                          idx === sortingActiveIdx
                            ? 'bg-amber-500 scale-125 ring-1 ring-amber-200'
                            : idx < sortingActiveIdx
                              ? 'bg-emerald-400'
                              : 'bg-slate-200'
                        }`}
                      ></div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )
        )}

        {/* LEVELS 2-5: VISUAL LOGIC BOARD (COMPUTATIONAL THINKING ENGINE) */}
        {level.gameType === 'builder' && (
          <div className="flex flex-col gap-3.5 w-full">

            {/* === TOP PANEL: Mission Objective === */}
            <div className="bg-[#fdf5dd] border-4 border-[#5c4613] rounded-2xl p-4 shadow-xl border-b-8 border-b-[#42310b] flex items-center justify-between gap-4">
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <span className="text-xs font-black bg-amber-800 text-amber-100 px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                    🎯 ภารกิจวิเคราะห์ตรรกะ ({currentMissionIdx + 1}/{level.missions.length})
                  </span>
                  <span className="text-xs font-black bg-emerald-600 text-white px-3 py-1 rounded-full shadow-xs">
                    เป้าหมาย: {currentMission.targetDescription || "จริง (True)"}
                  </span>
                </div>
                <p className="text-base md:text-lg font-black text-[#3d2c07] leading-snug">{currentMission.question}</p>
              </div>
            </div>

            {/* === CENTER PANEL: Visual Logic Circuit Slots === */}
            <div className="bg-[#fdf5dd] border-8 border-[#5c4613] rounded-2xl p-4 shadow-2xl border-b-16 border-b-[#42310b] text-[#4c380b] relative">
              
              {/* Overlays */}
              {flipMode && (
                <div className="absolute inset-0 bg-violet-900/30 rounded-2xl z-20 flex items-center justify-center pointer-events-none backdrop-blur-xs">
                  <div className="bg-violet-700 text-white font-black text-sm px-6 py-3 rounded-full shadow-2xl animate-pulse border-2 border-violet-300">
                    🔄 โหมดพลิกค่า — แตะการ์ดในสล็อตเพื่อเปลี่ยนค่าตรรกะ
                  </div>
                </div>
              )}
              {revealActive && correctAnswerPreview && (
                <div className="absolute inset-0 bg-amber-950/90 rounded-2xl z-30 flex flex-col items-center justify-center p-6 backdrop-blur-sm">
                  <span className="text-5xl mb-3">👁️</span>
                  <p className="text-amber-100 font-black text-sm text-center leading-relaxed max-w-md">{correctAnswerPreview}</p>
                  <p className="text-amber-300 text-xs font-black mt-3 animate-pulse">จะปิดใน 5 วินาที...</p>
                </div>
              )}

              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-xs font-black text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                  ⚡ แท่นวางวงจรตรรกศาสตร์ (Magic Logic Circuit)
                </span>
                <span className="text-[10px] font-black text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
                  {placedCards.length} การ์ดในแท่น
                </span>
              </div>

              {/* Slots Container */}
              <div className="min-h-[170px] bg-[#ebd6a7] rounded-2xl border-4 border-[#b59e66] p-4 flex flex-wrap items-center justify-center gap-3 shadow-inner relative">
                {placedCards.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 text-[#8a6e29]">
                    <span className="text-4xl mb-1.5">🔌</span>
                    <span className="text-sm md:text-base font-black text-center">
                      เลือกแตะการ์ดจาก "คลังอุปกรณ์" ด้านล่างมาวางเรียงวงจรตรรกะที่นี่
                    </span>
                  </div>
                ) : (
                  placedCards.map((card, idx) => {
                    const isStatement = card.type === 'Statement';
                    return (
                      <div key={idx} className="relative flex items-center animate-fade-in">
                        <div
                          onClick={() => flipMode ? handleFlipSlotCard(card) : handleRemoveCard(card)}
                          className={`w-32 md:w-36 h-44 md:h-52 rounded-2xl border-3 shadow-2xl flex flex-col justify-between cursor-pointer bg-white transition-all relative overflow-hidden group hover:scale-105 active:scale-95 ${
                            flipMode
                              ? 'border-violet-500 ring-4 ring-violet-400/50'
                              : isStatement
                                ? card.value ? 'border-emerald-500 ring-4 ring-emerald-300/50' : 'border-rose-500 ring-4 ring-rose-300/50'
                                : 'border-rose-500 hover:border-red-600'
                          }`}
                        >
                          {/* Image & Text Header */}
                          <div className="flex-1 w-full overflow-hidden bg-slate-50 flex items-center justify-center relative p-1">
                            <img src={card.image || "/wizard_student.jpg"} alt={card.content} className="w-full h-full object-contain select-none pointer-events-none" />
                            {isStatement && (
                              <div className="absolute bottom-0 inset-x-0 bg-[#fffdf5]/95 border-t-2 border-amber-300 px-1.5 py-1 text-center backdrop-blur-xs">
                                <p className="text-[10px] md:text-xs font-black text-amber-950 leading-tight line-clamp-2" title={card.content}>
                                  {card.content}
                                </p>
                              </div>
                            )}
                          </div>

                          {/* Delete Hover Icon */}
                          <div className="absolute top-1 right-1 bg-rose-600 text-white rounded-full p-1 shadow opacity-0 group-hover:opacity-100 transition-opacity z-10">
                            <X className="w-4 h-4" />
                          </div>

                          {/* Truth Badge or Operator Title */}
                          {isStatement ? (
                            <div className={`w-full py-1.5 text-center font-black text-xs md:text-sm border-t leading-none flex items-center justify-center gap-1 ${
                              card.value ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                            }`}>
                              <span>{card.value ? '🟢 จริง (True)' : '🔴 เท็จ (False)'}</span>
                            </div>
                          ) : (
                            <div className="w-full py-1.5 text-center font-black text-xs md:text-sm bg-rose-600 text-white border-t leading-none">
                              🔮 {card.content}
                            </div>
                          )}
                        </div>

                        {/* Energy Connector Line */}
                        {idx < placedCards.length - 1 && (
                          <div className="flex items-center mx-1 text-amber-700 font-black animate-pulse">
                            <ChevronRight className="w-7 h-7 text-amber-800" />
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Dynamic Logic Circuit Real-time Status Banner */}
              {placedCards.length > 0 && (
                <div className="mt-3 p-3 bg-[#fffdf7] border-2 border-[#d8c7a1] rounded-xl flex items-center justify-between shadow-inner">
                  <span className="text-xs md:text-sm font-black text-amber-950 flex items-center gap-1.5">
                    ⚡ สถานะพลังงานวงจรตรรกะ:
                  </span>
                  <span className="text-xs md:text-sm font-black text-amber-950 bg-amber-100 px-3 py-1 rounded-lg border border-amber-300">
                    {generateLogicSteps()?.valueString}
                  </span>
                </div>
              )}

              {/* Feedback Message */}
              {feedback && (
                <div className={`mt-3 p-3 rounded-xl border text-center text-xs md:text-sm font-extrabold shadow-sm ${
                  feedback.status === 'success' ? 'bg-emerald-50 border-emerald-300 text-emerald-800 animate-pulse'
                  : feedback.status === 'info' ? 'bg-violet-50 border-violet-300 text-violet-800 animate-pulse'
                  : 'bg-rose-50 border-rose-300 text-rose-800'
                }`}>
                  {feedback.text}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 mt-3">
                <button onClick={handleClearCards}
                  className="px-6 py-3.5 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-extrabold rounded-xl text-xs md:text-sm transition-all shadow-sm border-b-4 border-b-slate-300 active:translate-y-0.5">
                  🧹 ถอดทั้งหมด
                </button>
                <button onClick={handleSubmitBuilder} disabled={placedCards.length === 0 || feedback?.status === 'success'}
                  className="flex-1 py-3.5 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-600 hover:to-yellow-700 disabled:opacity-50 text-white font-black rounded-xl shadow-lg text-xs md:text-sm transition-all tracking-wider border-b-4 border-b-amber-800 flex items-center justify-center gap-2 active:translate-y-0.5">
                  ⚡ ทดสอบวงจรตรรกศาสตร์ (Test Circuit)
                </button>
              </div>
            </div>

            {/* === BOTTOM PANEL: Card Inventory Palette === */}
            <div className="bg-[#fdf5dd] border-4 border-[#5c4613] rounded-2xl p-4 shadow-xl border-b-8 border-b-[#42310b]">
              
              <div className="flex items-center justify-between mb-3 border-b border-amber-200 pb-2">
                <h3 className="font-black text-[#5c4613] text-sm md:text-base flex items-center gap-2">
                  🧰 คลังการ์ดอุปกรณ์ประจำด่าน (Inventory Palette)
                </h3>
                <span className="text-xs text-amber-800 font-black">
                  แตะการ์ดเพื่อส่งเข้าแท่นวงจรตรรกะ
                </span>
              </div>

              {/* Section 1: Statements Inventory */}
              <div className="mb-4">
                <span className="text-xs font-black text-sky-900 block mb-2 uppercase tracking-wider">
                  📄 การ์ดเบาะแสประพจน์ (Statements)
                </span>
                <div className="flex flex-row overflow-x-auto gap-3 pb-3 items-end justify-start scrollbar-thin select-none snap-x snap-mandatory">
                  {currentMission.cards?.filter(c => c.type === 'Statement').map(card => {
                    const isPlaced = placedCards.some(pc => pc.id === card.id);
                    return (
                      <div key={card.id}
                        onClick={() => {
                          if (isPlaced) return;
                          handlePlaceCard({ ...card, instanceId: `${card.id}_${Date.now()}` });
                        }}
                        className={`rounded-2xl shadow-lg flex flex-col justify-between transition-all cursor-pointer w-36 md:w-40 h-48 md:h-54 flex-shrink-0 snap-start bg-white border-3 relative overflow-hidden group ${
                          isPlaced
                            ? 'opacity-40 border-slate-300 bg-slate-100 cursor-not-allowed scale-95'
                            : 'border-sky-400 hover:-translate-y-2 hover:shadow-2xl hover:border-sky-600 active:scale-95'
                        }`}
                      >
                        <div className="flex-1 w-full overflow-hidden bg-slate-50 flex items-center justify-center relative p-1.5">
                          <img src={card.image || "/wizard_student.jpg"} alt={card.content} className="w-full h-full object-contain select-none pointer-events-none" />
                          <div className="absolute bottom-0 inset-x-0 bg-[#fffdf5]/95 border-t-2 border-amber-300 px-1.5 py-1 text-center">
                            <p className="text-[10px] md:text-xs font-black text-amber-950 leading-tight line-clamp-2" title={card.content}>
                              {card.content}
                            </p>
                          </div>
                        </div>
                        <div className={`w-full py-1.5 text-center font-black text-xs md:text-sm border-t leading-none flex items-center justify-center gap-1 ${
                          card.value ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                        }`}>
                          <span>{card.value ? '🟢 จริง' : '🔴 เท็จ'}</span>
                        </div>
                        {isPlaced && (
                          <div className="absolute inset-0 bg-slate-950/30 flex items-center justify-center backdrop-blur-xs">
                            <span className="text-xs bg-slate-800 text-white px-2.5 py-1 rounded-full font-black shadow">วางแล้ว</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Section 2: Operators Inventory */}
              <div>
                <span className="text-xs font-black text-rose-900 block mb-2 uppercase tracking-wider">
                  🔮 การ์ดตัวเชื่อมตรรกะ (Operators)
                </span>
                <div className="flex flex-row overflow-x-auto gap-2.5 pb-2 items-center justify-start scrollbar-thin select-none">
                  {currentMission.cards?.filter(c => c.type === 'Operator').map((card, i) => (
                    <button key={i}
                      onClick={() => handlePlaceCard({ ...card, instanceId: `op_${i}_${Date.now()}` })}
                      className="px-4 py-3 bg-gradient-to-b from-rose-50 to-pink-100 hover:from-rose-100 hover:to-pink-200 border-2 border-rose-300 text-rose-950 font-black rounded-xl text-xs md:text-sm transition-all shadow-md hover:-translate-y-1 active:scale-95 flex items-center gap-2 flex-shrink-0"
                    >
                      <span className="text-lg">🔮</span>
                      <span>{card.content}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Section 3: Special Hand Cards */}
              {specialHand.length > 0 && (
                <div className="border-t border-violet-200 mt-3 pt-2">
                  <span className="text-[10px] font-black text-violet-800 block mb-1.5 uppercase tracking-wider">
                    🌀 การ์ดเวทพิเศษการช่วยเหลือ
                    {shieldActive && <span className="ml-2 text-[9px] bg-teal-500 text-white px-2 py-0.5 rounded-full font-black animate-pulse">🛡️ โล่ทำงานอยู่</span>}
                  </span>
                  <div className="flex flex-row gap-3 items-end">
                    {specialHand.map(card => (
                      <div key={card.instanceId} className="flex flex-col items-center gap-1">
                        <div onClick={() => handleUseSpecialCard(card)}
                          className={`rounded-xl shadow-md flex flex-col justify-between cursor-pointer w-22 h-28 flex-shrink-0 bg-white border-2 relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg active:scale-95 ${card.id === 'flip' ? 'border-violet-400' : card.id === 'shield' ? 'border-teal-400' : 'border-amber-400'}`}>
                          <div className="flex-1 w-full overflow-hidden bg-white flex items-center justify-center">
                            <img src={card.image} alt={card.name} className="w-full h-full object-cover select-none pointer-events-none" />
                          </div>
                          <div className={`w-full py-1 text-center font-black text-[10px] border-t leading-none ${card.id === 'flip' ? 'bg-violet-500 text-white' : card.id === 'shield' ? 'bg-teal-500 text-white' : 'bg-amber-500 text-white'}`}>{card.emoji} {card.name}</div>
                        </div>
                        <span className="text-[9px] text-violet-800 font-black text-center leading-tight max-w-[88px]">{card.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

      </div>

      {/* GAME OVER MODAL (WHEN SCORE REACHES 0) */}
      {score <= 0 && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#fdf5dd] border-8 border-red-800 rounded-[40px] p-6 md:p-8 max-w-md w-full text-center shadow-2xl border-b-16 border-b-red-950 relative animate-in fade-in zoom-in-95 duration-200">
            <div className="w-24 h-24 mx-auto mb-4 bg-red-100 border-4 border-red-500 rounded-full flex items-center justify-center text-5xl shadow-xl animate-pulse">
              💥
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-red-950 mb-2 uppercase tracking-wide">
              พลังเวทมนตร์หมดสิ้น!
            </h3>
            <p className="text-sm md:text-base font-bold text-amber-900 mb-6 leading-relaxed">
              พลังเวทของ <span className="text-red-700 font-extrabold">{student.name}</span> ลดลงเหลือ <span className="text-red-600 font-black">0 🔮</span> เนื่องจากตอบคาถาล้มเหลวหลายครั้ง
              <br />
              กรุณารีเซ็ตพลังเวทเพื่อฟื้นฟูและเริ่มลองใหม่อีกครั้ง!
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  audio.playSuccess();
                  if (onResetScore) onResetScore();
                  setCurrentMissionIdx(0);
                  setSortingActiveIdx(0);
                  setDrawnCards([]);
                  setPlacedCards([]);
                  setFeedback(null);
                }}
                className="w-full py-4 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-black text-base rounded-2xl border-b-4 border-amber-800 shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                🔄 เติมพลังเวท 100 และสอบใหม่
              </button>

              <button
                onClick={() => {
                  audio.playClick();
                  if (onResetScore) onResetScore();
                  onBackToMap();
                }}
                className="w-full py-3 bg-white hover:bg-slate-100 text-slate-700 font-black text-sm rounded-2xl border-2 border-slate-300 shadow-sm active:scale-95 transition-all cursor-pointer"
              >
                🏠 กลับสู่แผนที่หลัก
              </button>
            </div>
          </div>
        </div>
      )}

      <HintPanel
        currentMission={activeMission}
        onUseHint={handleUseHint}
        hasUsedHint={hasUsedHintForThisMission}
        score={score}
      />
    </div>
  );
}
