/**
 * 🔮 LOGIC QUEST : ระบบเล่นเสียงจากไฟล์ MP3
 * 
 * ผู้ใช้สามารถนำไฟล์เสียงของตัวเองมาใส่ในโฟลเดอร์ public/sounds/ ของโปรเจกต์ได้เลยครับ
 * - public/sounds/bgm.mp3 (เสียงเพลงพื้นหลัง)
 * - public/sounds/draw.mp3 (เสียงจั่วไพ่)
 * - public/sounds/place.mp3 (เสียงวางไพ่)
 * - public/sounds/success.mp3 (เสียงตอบถูก)
 * - public/sounds/error.mp3 (เสียงตอบผิด)
 * - public/sounds/click.mp3 (เสียงกดปุ่มทั่วไป)
 */

class AudioManager {
  constructor() {
    this.bgMusic = null;
    this.bgMusicPlaying = false;
    this.bgVolume = 0.38;
    this.bgMuted = false;
    
    // Cache for SFX
    this.sfx = {};
  }

  // Helper to play SFX
  _playSfx(filename) {
    try {
      const audio = new Audio(`/sounds/${filename}`);
      audio.volume = 0.5; // ปรับความดังของเอฟเฟกต์ (0.0 - 1.0)
      audio.play().catch(e => console.log("SFX play prevented:", e));
    } catch (err) {
      console.log("Error playing SFX:", err);
    }
  }

  // ============================================================
  // 🎵 BACKGROUND MUSIC
  // ============================================================

  startBgMusic() {
    if (this.bgMusicPlaying && this.bgMusic) return;
    
    try {
      if (!this.bgMusic) {
        this.bgMusic = new Audio('/sounds/bgm.mp3');
        this.bgMusic.loop = true;
      }
      this.bgMusic.volume = this.bgMuted ? 0 : this.bgVolume;
      this.bgMusic.play().then(() => {
        this.bgMusicPlaying = true;
      }).catch(e => console.log("BGM play prevented by browser:", e));
    } catch (err) {
      console.log("Error playing BGM:", err);
    }
  }

  stopBgMusic() {
    if (this.bgMusic) {
      this.bgMusic.pause();
      this.bgMusic.currentTime = 0;
    }
    this.bgMusicPlaying = false;
  }

  toggleMuteBgMusic() {
    this.bgMuted = !this.bgMuted;
    if (this.bgMusic) {
      this.bgMusic.volume = this.bgMuted ? 0 : this.bgVolume;
    }
    return this.bgMuted;
  }

  setBgVolume(vol) {
    this.bgVolume = vol;
    if (this.bgMusic && !this.bgMuted) {
      this.bgMusic.volume = vol;
    }
  }

  // ============================================================
  // 🎮 SOUND EFFECTS
  // ============================================================

  // เสียงจั่วไพ่ขดกระดาษ
  playDraw() {
    this._playSfx('draw.mp3');
  }

  // เสียงวางไพ่/ถอนไพ่บนแท่นไม้
  playPlace() {
    this._playSfx('place.mp3');
  }

  // เสียงร่ายเวทสำเร็จ/คำตอบถูกต้อง
  playSuccess() {
    this._playSfx('success.mp3');
  }

  // เสียงร่ายเวทล้มเหลว/คำตอบผิด
  playError() {
    this._playSfx('error.mp3');
  }

  // เสียงคลิกปุ่มประตูปุ่มทหารทั่วไป
  playClick() {
    this._playSfx('click.mp3');
  }
}

export const audio = new AudioManager();
export default audio;
