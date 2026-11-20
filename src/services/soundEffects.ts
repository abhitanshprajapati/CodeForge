export type SoundEffectType =
  | 'click'
  | 'hint'
  | 'xp'
  | 'levelComplete'
  | 'error';

const SOUND_STORAGE_KEY = 'tech_leveling_sound_enabled';
const SAMPLE_RATE = 44100;

interface NoteSpec {
  freq: number;
  endFreq?: number;
  startSec: number;
  durationSec: number;
  gain: number;
  wave?: 'sine' | 'triangle';
}

/**
 * Encodes mono Float32 PCM samples (-1..1) into a standard 16-bit PCM WAV Blob URL
 * for playback via the HTML5 Audio API (HTMLAudioElement).
 */
function encodeWavObjectUrl(samples: Float32Array): string {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);

  const writeStr = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  };

  writeStr(0, 'RIFF');
  view.setUint32(4, 36 + samples.length * 2, true);
  writeStr(8, 'WAVE');
  writeStr(12, 'fmt ');
  view.setUint32(16, 16, true); // PCM chunk size
  view.setUint16(20, 1, true); // PCM format
  view.setUint16(22, 1, true); // Mono
  view.setUint32(24, SAMPLE_RATE, true);
  view.setUint32(28, SAMPLE_RATE * 2, true); // Byte rate
  view.setUint16(32, 2, true); // Block align
  view.setUint16(34, 16, true); // Bits per sample
  writeStr(36, 'data');
  view.setUint32(40, samples.length * 2, true);

  let offset = 44;
  for (let i = 0; i < samples.length; i++) {
    const clamped = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(offset, clamped < 0 ? clamped * 0x8000 : clamped * 0x7fff, true);
    offset += 2;
  }

  const blob = new Blob([buffer], { type: 'audio/wav' });
  return URL.createObjectURL(blob);
}

/**
 * Synthesizes subtle, smooth-envelope PCM tones into a Float32Array.
 */
function synthesizeNotes(totalSec: number, notes: NoteSpec[]): Float32Array {
  const totalSamples = Math.ceil(totalSec * SAMPLE_RATE);
  const out = new Float32Array(totalSamples);

  for (const note of notes) {
    const startIdx = Math.floor(note.startSec * SAMPLE_RATE);
    const lenSamples = Math.floor(note.durationSec * SAMPLE_RATE);
    const endIdx = Math.min(totalSamples, startIdx + lenSamples);
    const attackSamples = Math.max(1, Math.floor(Math.min(0.006, note.durationSec * 0.2) * SAMPLE_RATE));

    let phase = 0;
    for (let i = startIdx; i < endIdx; i++) {
      const localIdx = i - startIdx;
      const t = localIdx / lenSamples; // 0..1
      const currentFreq =
        note.endFreq !== undefined
          ? note.freq + (note.endFreq - note.freq) * t
          : note.freq;

      phase += (2 * Math.PI * currentFreq) / SAMPLE_RATE;

      // Smooth attack + exponential decay envelope (prevents harsh clicks)
      const attack = localIdx < attackSamples ? localIdx / attackSamples : 1;
      const decay = Math.pow(1 - t, 2.2);
      const env = attack * decay;

      let sample = Math.sin(phase);
      if (note.wave === 'triangle') {
        sample = (2 / Math.PI) * Math.asin(Math.sin(phase));
      }

      // Add subtle second harmonic for warm chime clarity on longer notes
      const harmonic = note.durationSec > 0.08 ? 0.18 * Math.sin(phase * 2) * (1 - t) : 0;
      out[i] += (sample + harmonic) * env * note.gain;
    }
  }

  return out;
}

const SOUND_SPECS: Record<SoundEffectType, { totalSec: number; volume: number; notes: NoteSpec[] }> = {
  // Subtle tactile UI tap
  click: {
    totalSec: 0.045,
    volume: 0.24,
    notes: [
      { freq: 680, endFreq: 420, startSec: 0, durationSec: 0.038, gain: 0.5, wave: 'sine' },
    ],
  },
  // Gentle shimmer for hints & refreshed notes
  hint: {
    totalSec: 0.26,
    volume: 0.24,
    notes: [
      { freq: 659.25, startSec: 0, durationSec: 0.14, gain: 0.42, wave: 'sine' }, // E5
      { freq: 987.77, startSec: 0.07, durationSec: 0.18, gain: 0.36, wave: 'sine' }, // B5
    ],
  },
  // Crisp rising sparkle for +50 XP earned
  xp: {
    totalSec: 0.32,
    volume: 0.28,
    notes: [
      { freq: 783.99, startSec: 0, durationSec: 0.13, gain: 0.42, wave: 'sine' }, // G5
      { freq: 1174.66, startSec: 0.075, durationSec: 0.22, gain: 0.45, wave: 'sine' }, // D6
    ],
  },
  // Warm ascending major chord arpeggio for passing a level
  levelComplete: {
    totalSec: 0.58,
    volume: 0.3,
    notes: [
      { freq: 523.25, startSec: 0, durationSec: 0.22, gain: 0.38, wave: 'sine' }, // C5
      { freq: 659.25, startSec: 0.08, durationSec: 0.24, gain: 0.38, wave: 'sine' }, // E5
      { freq: 783.99, startSec: 0.16, durationSec: 0.26, gain: 0.4, wave: 'sine' }, // G5
      { freq: 1046.5, startSec: 0.24, durationSec: 0.32, gain: 0.44, wave: 'sine' }, // C6
    ],
  },
  // Soft low muted tone for locked level or failed code check
  error: {
    totalSec: 0.19,
    volume: 0.24,
    notes: [
      { freq: 240, endFreq: 190, startSec: 0, durationSec: 0.09, gain: 0.45, wave: 'triangle' },
      { freq: 185, endFreq: 155, startSec: 0.08, durationSec: 0.1, gain: 0.4, wave: 'triangle' },
    ],
  },
};

// Pool of HTML5 Audio elements per sound type for zero-latency overlapping playback
const audioPools: Partial<Record<SoundEffectType, HTMLAudioElement[]>> = {};
const poolCursor: Record<SoundEffectType, number> = {
  click: 0,
  hint: 0,
  xp: 0,
  levelComplete: 0,
  error: 0,
};

let soundEnabled = true;

function initSoundPreference(): void {
  if (typeof window === 'undefined') return;
  try {
    const saved = window.localStorage.getItem(SOUND_STORAGE_KEY);
    if (saved === 'false') {
      soundEnabled = false;
    }
  } catch {
    // Ignore storage access errors
  }
}

initSoundPreference();

function getAudioPool(type: SoundEffectType): HTMLAudioElement[] {
  if (typeof window === 'undefined' || typeof Audio === 'undefined') {
    return [];
  }

  let pool = audioPools[type];
  if (!pool) {
    const spec = SOUND_SPECS[type];
    const samples = synthesizeNotes(spec.totalSec, spec.notes);
    const url = encodeWavObjectUrl(samples);
    const poolSize = type === 'click' ? 4 : 2;
    pool = Array.from({ length: poolSize }, () => {
      const el = new Audio(url);
      el.preload = 'auto';
      el.volume = spec.volume;
      return el;
    });
    audioPools[type] = pool;
  }

  return pool;
}

export function isSoundEnabled(): boolean {
  return soundEnabled;
}

export function setSoundEnabled(enabled: boolean): void {
  soundEnabled = enabled;
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(SOUND_STORAGE_KEY, String(enabled));
    } catch {
      // Ignore storage write errors
    }
  }
}

export function playSound(type: SoundEffectType): void {
  if (!soundEnabled) return;
  const pool = getAudioPool(type);
  if (pool.length === 0) return;

  const idx = poolCursor[type] % pool.length;
  poolCursor[type] = idx + 1;

  const audio = pool[idx];
  try {
    audio.currentTime = 0;
    const playPromise = audio.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        // Ignore browser autoplay policy rejections before user gesture
      });
    }
  } catch {
    // Ignore playback errors in unsupported environments
  }
}

/**
 * Plays the celebratory level completion chord, optionally followed by the crisp XP chime.
 */
export function playLevelPassedSequence(earnedXp: boolean): void {
  if (!soundEnabled) return;
  playSound('levelComplete');
  if (earnedXp) {
    window.setTimeout(() => {
      playSound('xp');
    }, 260);
  }
}
