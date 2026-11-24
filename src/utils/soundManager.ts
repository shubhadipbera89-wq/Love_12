// Web Audio API ambient romantic synth fallback & sound effects manager

class SoundManager {
  private audioCtx: AudioContext | null = null;
  private bgAudio: HTMLAudioElement | null = null;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private synthInterval: number | null = null;
  private volume: number = 0.5;

  constructor() {
    // Lazy init audio context on user interaction
  }

  private getAudioContext(): AudioContext {
    if (!this.audioCtx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioCtx();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  public initBackgroundAudio(audioUrl: string, initialVolume: number = 0.5) {
    this.volume = initialVolume;
    try {
      this.bgAudio = new Audio(audioUrl);
      this.bgAudio.loop = true;
      this.bgAudio.volume = initialVolume;

      // Handle errors by falling back to ambient synth
      this.bgAudio.addEventListener('error', () => {
        console.warn("External background audio failed to load. Using romantic Web Audio synth fallback.");
        if (this.isPlaying) {
          this.startAmbientSynth();
        }
      });
    } catch {
      console.warn("Audio element creation error. Falling back to synth.");
    }
  }

  public playMusic() {
    this.isPlaying = true;
    const ctx = this.getAudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    if (this.bgAudio && !this.isMuted) {
      this.bgAudio.play().catch(() => {
        // Autoplay policy or error, start ambient synth chime sequence
        this.startAmbientSynth();
      });
    } else if (!this.isMuted) {
      this.startAmbientSynth();
    }
  }

  public pauseMusic() {
    this.isPlaying = false;
    if (this.bgAudio) {
      this.bgAudio.pause();
    }
    this.stopAmbientSynth();
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.bgAudio) {
      this.bgAudio.muted = this.isMuted;
    }
    if (this.isMuted) {
      this.stopAmbientSynth();
    } else if (this.isPlaying) {
      this.playMusic();
    }
    return this.isMuted;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  // Play gentle chime sound effect for button clicks and interactions
  public playChime(freq: number = 523.25, type: OscillatorType = 'sine') {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      gain.gain.setValueAtTime(0.15 * this.volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch (e) {
      console.error(e);
    }
  }

  // Play heart explosion chime chord
  public playHeartChord() {
    if (this.isMuted) return;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playChime(freq, 'sine');
      }, idx * 120);
    });
  }

  // Soft ambient synth chimes in case external MP3 fails
  private startAmbientSynth() {
    if (this.synthInterval !== null) return;
    const scale = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99]; // C major pentatonic
    let noteIdx = 0;
    
    this.synthInterval = window.setInterval(() => {
      if (!this.isPlaying || this.isMuted) return;
      const note = scale[noteIdx % scale.length];
      this.playChime(note, 'sine');
      noteIdx = (noteIdx + Math.floor(Math.random() * 2) + 1) % scale.length;
    }, 2400);
  }

  private stopAmbientSynth() {
    if (this.synthInterval !== null) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
  }
}

export const soundManager = new SoundManager();
