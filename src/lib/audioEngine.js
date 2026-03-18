// Procedural Audio Engine for Stellar Empire

let audioCtx = null;
let musicGainNode = null;
let sfxGainNode = null;
let isMusicPlaying = false;
let musicInterval = null;
let currentNoteIndex = 0;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    musicGainNode = audioCtx.createGain();
    musicGainNode.gain.value = 0.12;
    musicGainNode.connect(audioCtx.destination);
    sfxGainNode = audioCtx.createGain();
    sfxGainNode.gain.value = 0.2;
    sfxGainNode.connect(audioCtx.destination);
  }
  return audioCtx;
}

// Ambient space music - evolving pad chords
const CHORD_PROGRESSIONS = [
  [130.81, 164.81, 196.00, 261.63], // Cm
  [116.54, 146.83, 174.61, 233.08], // Bb
  [103.83, 130.81, 155.56, 207.65], // Ab
  [116.54, 146.83, 174.61, 233.08], // Bb
  [130.81, 164.81, 196.00, 261.63], // Cm
  [110.00, 138.59, 164.81, 220.00], // Am-ish
  [103.83, 130.81, 155.56, 207.65], // Ab
  [123.47, 155.56, 185.00, 246.94], // B
];

function playPadChord(frequencies, duration) {
  const ctx = getAudioContext();
  if (ctx.state === 'suspended') ctx.resume();
  
  const now = ctx.currentTime;
  
  frequencies.forEach((freq, i) => {
    // Main oscillator
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    // Slight detune for richness
    osc.detune.setValueAtTime(Math.random() * 10 - 5, now);
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);
    filter.Q.setValueAtTime(1, now);
    
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.08 / frequencies.length, now + 0.8);
    gain.gain.setValueAtTime(0.08 / frequencies.length, now + duration - 1);
    gain.gain.linearRampToValueAtTime(0, now + duration);
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(musicGainNode);
    
    osc.start(now + i * 0.1);
    osc.stop(now + duration + 0.1);
    
    // Add a subtle harmonic
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, now);
    osc2.detune.setValueAtTime(Math.random() * 8 - 4, now);
    gain2.gain.setValueAtTime(0, now);
    gain2.gain.linearRampToValueAtTime(0.02 / frequencies.length, now + 1.2);
    gain2.gain.setValueAtTime(0.02 / frequencies.length, now + duration - 1.2);
    gain2.gain.linearRampToValueAtTime(0, now + duration);
    
    osc2.connect(gain2);
    gain2.connect(musicGainNode);
    osc2.start(now + i * 0.15);
    osc2.stop(now + duration + 0.1);
  });
  
  // Subtle bass note
  const bassOsc = ctx.createOscillator();
  const bassGain = ctx.createGain();
  bassOsc.type = 'sine';
  bassOsc.frequency.setValueAtTime(frequencies[0] / 2, now);
  bassGain.gain.setValueAtTime(0, now);
  bassGain.gain.linearRampToValueAtTime(0.06, now + 0.5);
  bassGain.gain.setValueAtTime(0.06, now + duration - 0.8);
  bassGain.gain.linearRampToValueAtTime(0, now + duration);
  bassOsc.connect(bassGain);
  bassGain.connect(musicGainNode);
  bassOsc.start(now);
  bassOsc.stop(now + duration + 0.1);
}

function playArpNote() {
  const ctx = getAudioContext();
  if (ctx.state === 'suspended') return;
  
  const notes = [261.63, 329.63, 392.00, 523.25, 392.00, 329.63];
  const note = notes[Math.floor(Math.random() * notes.length)];
  const now = ctx.currentTime;
  
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(note * (Math.random() > 0.5 ? 2 : 1), now);
  gain.gain.setValueAtTime(0.03, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
  osc.connect(gain);
  gain.connect(musicGainNode);
  osc.start(now);
  osc.stop(now + 1.5);
}

export function startMusic() {
  if (isMusicPlaying) return;
  getAudioContext();
  isMusicPlaying = true;
  
  const playNext = () => {
    if (!isMusicPlaying) return;
    const chord = CHORD_PROGRESSIONS[currentNoteIndex % CHORD_PROGRESSIONS.length];
    playPadChord(chord, 4.5);
    currentNoteIndex++;
    
    // Random arp notes
    if (Math.random() > 0.3) {
      setTimeout(playArpNote, 1000 + Math.random() * 2000);
    }
    if (Math.random() > 0.5) {
      setTimeout(playArpNote, 2500 + Math.random() * 1500);
    }
  };
  
  playNext();
  musicInterval = setInterval(playNext, 4000);
}

export function stopMusic() {
  isMusicPlaying = false;
  if (musicInterval) {
    clearInterval(musicInterval);
    musicInterval = null;
  }
}

export function toggleMusic() {
  if (isMusicPlaying) {
    stopMusic();
  } else {
    startMusic();
  }
  return isMusicPlaying;
}

export function isMusicOn() {
  return isMusicPlaying;
}

// SFX
export function playBuySound() {
  const ctx = getAudioContext();
  if (ctx.state === 'suspended') ctx.resume();
  const now = ctx.currentTime;
  
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(400, now);
  osc.frequency.exponentialRampToValueAtTime(800, now + 0.1);
  gain.gain.setValueAtTime(0.15, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
  osc.connect(gain);
  gain.connect(sfxGainNode);
  osc.start(now);
  osc.stop(now + 0.25);
}

export function playCollectSound() {
  const ctx = getAudioContext();
  if (ctx.state === 'suspended') ctx.resume();
  const now = ctx.currentTime;
  
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(600, now);
  osc.frequency.exponentialRampToValueAtTime(1200, now + 0.08);
  gain.gain.setValueAtTime(0.1, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
  osc.connect(gain);
  gain.connect(sfxGainNode);
  osc.start(now);
  osc.stop(now + 0.2);
}

export function playPrestigeSound() {
  const ctx = getAudioContext();
  if (ctx.state === 'suspended') ctx.resume();
  const now = ctx.currentTime;
  
  [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + i * 0.15);
    gain.gain.setValueAtTime(0, now + i * 0.15);
    gain.gain.linearRampToValueAtTime(0.12, now + i * 0.15 + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.15 + 0.6);
    osc.connect(gain);
    gain.connect(sfxGainNode);
    osc.start(now + i * 0.15);
    osc.stop(now + i * 0.15 + 0.7);
  });
}

export function playUpgradeSound() {
  const ctx = getAudioContext();
  if (ctx.state === 'suspended') ctx.resume();
  const now = ctx.currentTime;
  
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'square';
  osc.frequency.setValueAtTime(300, now);
  osc.frequency.exponentialRampToValueAtTime(1200, now + 0.15);
  gain.gain.setValueAtTime(0.08, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
  osc.connect(gain);
  gain.connect(sfxGainNode);
  osc.start(now);
  osc.stop(now + 0.35);
}

export function playAchievementSound() {
  const ctx = getAudioContext();
  if (ctx.state === 'suspended') ctx.resume();
  const now = ctx.currentTime;
  
  [523.25, 659.25, 783.99].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now + i * 0.12);
    gain.gain.setValueAtTime(0.12, now + i * 0.12);
    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.4);
    osc.connect(gain);
    gain.connect(sfxGainNode);
    osc.start(now + i * 0.12);
    osc.stop(now + i * 0.12 + 0.5);
  });
}