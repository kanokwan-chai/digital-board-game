/**
 * 🔮 LOGIC QUEST : ระบบสังเคราะห์เสียงเวทมนตร์ (Web Audio API Synthesizer)
 * 
 * ใช้สำหรับผลิตเสียงเอฟเฟกต์แบบเรียลไทม์ผ่านเบราว์เซอร์โดยตรง 
 * ไม่ต้องใช้แบนด์วิดท์ในการดาวน์โหลดไฟล์เสียงภายนอก ช่วยให้รันได้รวดเร็วและไม่มีดีเลย์
 */

class AudioManager {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    // Resume context if suspended (browser security policy)
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // เสียงจั่วไพ่ขดกระดาษ (Sweep arpeggio chime)
  playDraw() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(350, now);
    osc.frequency.exponentialRampToValueAtTime(1300, now + 0.25);
    
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.28);
  }

  // เสียงวางไพ่/ถอนไพ่บนแท่นไม้ (Tactile wood/stone tap)
  playPlace() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.08);
    
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.1);
  }

  // เสียงร่ายเวทสำเร็จ/คำตอบถูกต้อง (Triumphant sparkles arpeggio)
  playSuccess() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    
    // Sparkle notes (C5 -> E5 -> G5 -> C6 arpeggio)
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const delay = idx * 0.08;
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + delay);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.2, now + delay + 0.35);
      
      gain.gain.setValueAtTime(0.08, now + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.35);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start(now + delay);
      osc.stop(now + delay + 0.4);
    });
  }

  // เสียงร่ายเวทล้มเหลว/คำตอบผิด (Fizzle warning buzz)
  playError() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(140, now);
    osc1.frequency.linearRampToValueAtTime(80, now + 0.35);
    
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(135, now);
    osc2.frequency.linearRampToValueAtTime(75, now + 0.35);
    
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    
    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.4);
    osc2.stop(now + 0.4);
  }

  // เสียงคลิกปุ่มประตูปุ่มทหารทั่วไป (Button click energy pop)
  playClick() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.05);
    
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.06);
  }
}

export const audio = new AudioManager();
export default audio;
