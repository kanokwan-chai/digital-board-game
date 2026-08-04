/**
 * 🔮 LOGIC QUEST : ระบบสังเคราะห์เสียงเวทมนตร์ (Web Audio API Synthesizer)
 * 
 * ใช้สำหรับผลิตเสียงเอฟเฟกต์แบบเรียลไทม์ผ่านเบราว์เซอร์โดยตรง 
 * ไม่ต้องใช้แบนด์วิดท์ในการดาวน์โหลดไฟล์เสียงภายนอก ช่วยให้รันได้รวดเร็วและไม่มีดีเลย์
 */

class AudioManager {
  constructor() {
    this.ctx = null;
    // Background music state
    this.bgMusicNodes = [];
    this.bgMasterGain = null;
    this.bgMusicPlaying = false;
    this.bgVolume = 0.38; // Rich, audible background volume
    this.bgMuted = false;
    this.bgArpInterval = null;
    this.bgPadInterval = null;
    this.bgShimmerInterval = null;
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

  // ============================================================
  // 🎵 AMBIENT BACKGROUND MUSIC — Mystical Wizard Atmosphere
  // ============================================================

  startBgMusic() {
    this.init();
    if (!this.ctx || this.bgMusicPlaying) return;
    this.bgMusicPlaying = true;

    // Master gain for the whole background music layer
    this.bgMasterGain = this.ctx.createGain();
    this.bgMasterGain.gain.setValueAtTime(this.bgMuted ? 0 : this.bgVolume, this.ctx.currentTime);
    this.bgMasterGain.connect(this.ctx.destination);

    // Start the three music layers
    this._startPadLayer();
    this._startArpLayer();
    this._startShimmerLayer();
  }

  stopBgMusic() {
    this.bgMusicPlaying = false;
    clearInterval(this.bgArpInterval);
    clearInterval(this.bgPadInterval);
    clearInterval(this.bgShimmerInterval);
    this.bgArpInterval = null;
    this.bgPadInterval = null;
    this.bgShimmerInterval = null;

    if (this.bgMasterGain) {
      this.bgMasterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.5);
    }
    // Disconnect all nodes after fade
    setTimeout(() => {
      this.bgMusicNodes.forEach(n => { try { n.stop(); n.disconnect(); } catch(e){} });
      this.bgMusicNodes = [];
      if (this.bgMasterGain) { try { this.bgMasterGain.disconnect(); } catch(e){} }
      this.bgMasterGain = null;
    }, 800);
  }

  toggleMuteBgMusic() {
    this.bgMuted = !this.bgMuted;
    if (this.bgMasterGain && this.ctx) {
      this.bgMasterGain.gain.setTargetAtTime(
        this.bgMuted ? 0 : this.bgVolume,
        this.ctx.currentTime, 0.3
      );
    }
    return this.bgMuted;
  }

  setBgVolume(vol) {
    this.bgVolume = vol;
    if (this.bgMasterGain && this.ctx && !this.bgMuted) {
      this.bgMasterGain.gain.setTargetAtTime(vol, this.ctx.currentTime, 0.3);
    }
  }

  // --- Layer 1: Smooth Pure Bass Pad (No buzzing, crystal clear) ---
  _startPadLayer() {
    // Pure clean sine wave chords (zero distortion/buzzing)
    const chordSets = [
      [146.83, 220.00, 293.66], // Dm (D3, A3, D4)
      [196.00, 233.08, 293.66], // Gm (G3, Bb3, D4)
      [138.59, 220.00, 329.63], // C#dim/A7 (C#3, A3, E4)
      [146.83, 220.00, 293.66], // Dm (D3, A3, D4)
    ];
    let chordIdx = 0;

    const playChord = () => {
      if (!this.bgMusicPlaying || !this.bgMasterGain) return;
      const chord = chordSets[chordIdx % chordSets.length];
      chordIdx++;
      const now = this.ctx.currentTime;

      chord.forEach((freq) => {
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = 'sine'; // Pure sine wave — zero buzzing/distortion!
        osc.frequency.setValueAtTime(freq, now);

        const duration = 4.0;
        g.gain.setValueAtTime(0, now);
        g.gain.linearRampToValueAtTime(0.08 / chord.length, now + 0.8);
        g.gain.setValueAtTime(0.08 / chord.length, now + duration - 0.8);
        g.gain.linearRampToValueAtTime(0, now + duration);

        osc.connect(g);
        g.connect(this.bgMasterGain);
        osc.start(now);
        osc.stop(now + duration + 0.1);
        this.bgMusicNodes.push(osc);
      });
    };

    playChord();
    this.bgPadInterval = setInterval(playChord, 4200);
  }

  // --- Layer 2: Mysterious Music Box / Harpsichord Arpeggio (Faster suspense melody) ---
  _startArpLayer() {
    // Harmonic minor & chromatic mystery notes (D, F, G#, A, C, C#)
    const mysteryScale = [293.66, 349.23, 415.30, 440.00, 523.25, 554.37, 587.33, 698.46];
    const patterns = [
      [0, 3, 2, 3, 5, 4, 3, 1],
      [0, 2, 4, 5, 4, 2, 1, 3],
      [3, 1, 0, 5, 4, 2, 3, 0],
    ];
    let patIdx = 0;
    let noteIdx = 0;

    const playArpNote = () => {
      if (!this.bgMusicPlaying || !this.bgMasterGain) return;
      const pattern = patterns[patIdx % patterns.length];
      const scaleIdx = pattern[noteIdx % pattern.length];
      const freq = mysteryScale[scaleIdx];
      noteIdx++;
      if (noteIdx >= pattern.length) { noteIdx = 0; patIdx++; }

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();

      // Crisp triangle/sine blend for a mystical detective music box sound
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.005, now + 0.45);

      g.gain.setValueAtTime(0, now);
      g.gain.linearRampToValueAtTime(0.15, now + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(g);
      g.connect(this.bgMasterGain);
      osc.start(now);
      osc.stop(now + 0.5);
      this.bgMusicNodes.push(osc);
    };

    setTimeout(() => {
      if (this.bgMusicPlaying) {
        playArpNote();
        this.bgArpInterval = setInterval(playArpNote, 520); // Faster active rhythm (520ms)
      }
    }, 1200);
  }

  // --- Layer 3: High Mystery Bells & Sparkle Chimes ---
  _startShimmerLayer() {
    const mysteryBells = [1108.73, 1174.66, 1318.51, 1396.91, 1661.22, 1760.00];

    const playShimmer = () => {
      if (!this.bgMusicPlaying || !this.bgMasterGain) return;
      if (Math.random() > 0.4) return;

      const freq = mysteryBells[Math.floor(Math.random() * mysteryBells.length)];
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.04, now + 0.35);

      g.gain.setValueAtTime(0, now);
      g.gain.linearRampToValueAtTime(0.08, now + 0.03);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(g);
      g.connect(this.bgMasterGain);
      osc.start(now);
      osc.stop(now + 0.45);
      this.bgMusicNodes.push(osc);
    };

    setTimeout(() => {
      if (this.bgMusicPlaying) {
        this.bgShimmerInterval = setInterval(playShimmer, 650);
      }
    }, 2500);
  }

  // ============================================================
  // 🎮 SOUND EFFECTS (unchanged)
  // ============================================================

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
