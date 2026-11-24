/* ====================================================
   ROMANTIC LOVE & FRIEND PROPOSAL WEBSITE — script.js
   Full cinematic sequence:
   Welcome → Personal Message → Memories → Special Question →
   Proposal → YES Celebration → Love Letter → Reasons →
   “I LOVE YOU 🤗❤️” Reveal → Final Surprise.
==================================================== */

'use strict';

// ======================================================
// GLOBAL STATE
// ======================================================
let currentScreen      = 'landing';
let noClickCount       = 0;
let musicPlaying       = false;
let letterTypewriterDone = false;
let revealTypewriterDone = false;

// Canvases
let particleCanvas, particleCtx, particles = [];
let surpriseCanvas, surpriseCtx, surpriseHearts = [], surpriseParticles = [];
let finalCanvas, finalCtx, finalParticles = [];

// Fallback Synth Audio (Web Audio API) for 100% offline & reliable romantic music
let audioCtx = null;
let synthInterval = null;

// ======================================================
// UTILITY HELPERS
// ======================================================
const $ = id => document.getElementById(id);
const rand = (min, max) => Math.random() * (max - min) + min;
const randInt = (min, max) => Math.floor(rand(min, max + 1));

// ======================================================
// INITIALIZATION
// ======================================================
document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  spawnFloatingHearts('hearts-bg-1');
  spawnPetals('petal-shower-1');
  setupMusicControls();
});

// User explicitly initiates the experience by clicking "Start ❤️"
function startExperience() {
  playRomanticMusic();
  goToScreen('intro');
}

// ======================================================
// SCREEN TRANSITIONS
// ======================================================
function goToScreen(name) {
  const overlay = $('transition-overlay');
  if (overlay) overlay.classList.add('active');

  setTimeout(() => {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(s => {
      s.classList.remove('active');
    });

    // Show target screen
    const next = document.getElementById('screen-' + name);
    if (next) {
      next.classList.add('active');
      currentScreen = name;
      onScreenEnter(name);
    }

    if (overlay) overlay.classList.remove('active');
  }, 480);
}

function onScreenEnter(name) {
  switch (name) {
    case 'landing':
      spawnFloatingHearts('hearts-bg-1');
      spawnPetals('petal-shower-1');
      break;

    case 'intro':
      spawnFloatingHearts('hearts-bg-2');
      break;

    case 'memories':
      spawnFloatingHearts('hearts-bg-3');
      break;

    case 'ready':
      spawnFloatingHearts('hearts-bg-4');
      // Reset ECG line
      const ecg = document.querySelector('.ecg-line');
      if (ecg) {
        ecg.style.animation = 'none';
        ecg.offsetHeight; // force reflow
        ecg.style.animation = '';
      }
      break;

    case 'proposal':
      spawnFloatingHearts('hearts-bg-5');
      noClickCount = 0;
      const noMsg = $('no-msg');
      if (noMsg) noMsg.classList.add('hidden');
      resetNoButton();
      break;

    case 'yes':
      spawnFloatingHearts('hearts-bg-6');
      launchConfetti('confetti-container', 90);
      break;

    case 'letter':
      spawnFloatingHearts('hearts-bg-7');
      setTimeout(() => startLoveLetterTypewriter(), 600);
      break;

    case 'reasons':
      spawnFloatingHearts('hearts-bg-8');
      break;

    case 'emotional':
      spawnFloatingHearts('hearts-bg-9');
      // Reset emotional question screen
      const revealBox = $('emotional-reveal');
      const emotionalBtns = $('emotional-buttons');
      if (revealBox) revealBox.classList.add('hidden');
      if (emotionalBtns) emotionalBtns.classList.remove('hidden');
      break;

    case 'reveal':
      spawnFloatingHearts('hearts-bg-10');
      spawnPetals('petal-shower-reveal');
      startGrandReveal();
      break;

    case 'final':
      initFinalCanvas();
      spawnPetals('petal-shower-final');
      break;
  }
}

// ======================================================
// BACKGROUND AMBIENT PARTICLES (CANVAS)
// ======================================================
function initParticleCanvas() {
  particleCanvas = $('particle-canvas');
  if (!particleCanvas) return;
  particleCtx = particleCanvas.getContext('2d');
  resizeCanvas(particleCanvas);
  window.addEventListener('resize', () => resizeCanvas(particleCanvas));
  createParticles();
  animateParticles();
}

function resizeCanvas(c) {
  if (!c) return;
  c.width  = window.innerWidth;
  c.height = window.innerHeight;
}

function createParticles() {
  particles = [];
  const count = Math.min(85, Math.floor(window.innerWidth / 14));
  for (let i = 0; i < count; i++) {
    particles.push({
      x: rand(0, window.innerWidth),
      y: rand(0, window.innerHeight),
      r: rand(1, 3.8),
      vx: rand(-0.25, 0.25),
      vy: rand(-0.45, -0.1),
      alpha: rand(0.12, 0.5),
      color: pickParticleColor(),
    });
  }
}

function pickParticleColor() {
  const colors = [
    'rgba(224, 74, 115,',
    'rgba(184, 20, 68,',
    'rgba(244, 166, 194,',
    'rgba(92, 9, 38,',
    'rgba(255, 170, 195,',
  ];
  return colors[randInt(0, colors.length - 1)];
}

function animateParticles() {
  if (!particleCtx || !particleCanvas) return;
  particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

  particles.forEach(p => {
    particleCtx.beginPath();
    particleCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    particleCtx.fillStyle = p.color + p.alpha + ')';
    particleCtx.fill();

    p.x += p.vx;
    p.y += p.vy;
    p.alpha = 0.12 + 0.28 * Math.abs(Math.sin(Date.now() / 2200 + p.x));

    if (p.y < -10) p.y = window.innerHeight + 10;
    if (p.x < -10) p.x = window.innerWidth + 10;
    if (p.x > window.innerWidth + 10) p.x = -10;
  });

  requestAnimationFrame(animateParticles);
}

// ======================================================
// FLOATING HEARTS & PETALS
// ======================================================
function spawnFloatingHearts(containerId) {
  const container = $(containerId);
  if (!container) return;
  container.innerHTML = '';

  const emojis = ['❤️', '💕', '🌸', '💗', '💓', '🌷', '💖', '💝', '🌺', '✨'];
  const count = Math.min(22, randInt(14, 20));

  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.className = 'fheart';
    el.textContent = emojis[randInt(0, emojis.length - 1)];
    el.style.left = rand(0, 95) + 'vw';
    el.style.fontSize = rand(0.9, 1.9) + 'rem';
    el.style.animationDuration = rand(7, 14) + 's';
    el.style.animationDelay    = rand(0, 7) + 's';
    container.appendChild(el);
  }
}

function spawnPetals(containerId) {
  const container = $(containerId);
  if (!container) return;
  container.innerHTML = '';

  const petals = ['🌸', '🌷', '🌺', '🌹', '🪷', '💐'];
  const count = randInt(12, 18);

  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.className = 'petal';
    el.textContent = petals[randInt(0, petals.length - 1)];
    el.style.left = rand(0, 98) + 'vw';
    el.style.animationDuration = rand(6, 13) + 's';
    el.style.animationDelay    = rand(0, 9) + 's';
    el.style.fontSize = rand(0.8, 1.6) + 'rem';
    container.appendChild(el);
  }
}

// ======================================================
// NO BUTTON PLAYFUL ESCAPE (WITH TOUCH SUPPORT)
// ======================================================
function handleNoHover() {
  if (noClickCount < 4) {
    moveNoButtonPlayfully();
  }
}

function handleNo() {
  noClickCount++;

  const btn = $('btn-no');
  const noMsg = $('no-msg');

  if (noClickCount >= 4) {
    // After several attempts, show reassuring message and allow click
    if (noMsg) {
      noMsg.classList.remove('hidden');
      noMsg.style.opacity = '1';
    }
    resetNoButton();
    return;
  }

  moveNoButtonPlayfully();

  if (noClickCount === 2 && noMsg) {
    noMsg.style.opacity = '0.6';
    noMsg.classList.remove('hidden');
  } else if (noClickCount === 3 && noMsg) {
    noMsg.style.opacity = '1';
    noMsg.classList.remove('hidden');
  }
}

function moveNoButtonPlayfully() {
  const btn = $('btn-no');
  const container = $('proposal-buttons');
  if (!btn || !container) return;

  const rect = container.getBoundingClientRect();
  const maxX = Math.min(180, Math.floor(rect.width / 2.5));
  const maxY = 55;

  const newX = rand(-maxX, maxX);
  const newY = rand(-maxY, maxY);

  btn.style.position = 'absolute';
  btn.style.transition = 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)';
  btn.style.left = `calc(50% + ${newX}px)`;
  btn.style.top  = `${newY}px`;
  btn.style.transform = `scale(0.96) rotate(${rand(-10, 10)}deg)`;
}

function resetNoButton() {
  const btn = $('btn-no');
  if (!btn) return;
  btn.style.position = 'static';
  btn.style.left = '';
  btn.style.top  = '';
  btn.style.transform = '';
}

// ======================================================
// YES BUTTON HANDLER
// ======================================================
function handleYes() {
  goToScreen('yes');
}

// ======================================================
// CELEBRATION CONFETTI
// ======================================================
function launchConfetti(containerId, count = 80) {
  const container = $(containerId);
  if (!container) return;
  container.innerHTML = '';

  const colors = [
    '#e04a73', '#b81444', '#f4a6c2', '#5c0926',
    '#ff5e8c', '#fdecf2', '#dfad73', '#ffffff',
    '#ff1493', '#ff69b4',
  ];
  const emojis = ['❤️', '🌸', '💕', '🎉', '💗', '🌷', '🎊', '✨', '💖'];

  for (let i = 0; i < count; i++) {
    const isEmoji = Math.random() > 0.6;
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    el.style.left = rand(0, 100) + 'vw';
    el.style.animationDelay    = rand(0, 2.5) + 's';
    el.style.animationDuration = rand(2.2, 4.8) + 's';

    if (isEmoji) {
      el.textContent = emojis[randInt(0, emojis.length - 1)];
      el.style.fontSize = rand(1, 1.9) + 'rem';
      el.style.background = 'none';
    } else {
      el.style.background    = colors[randInt(0, colors.length - 1)];
      el.style.width  = rand(7, 14) + 'px';
      el.style.height = rand(7, 14) + 'px';
      el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    }

    container.appendChild(el);
  }
}

// ======================================================
// LOVE LETTER TYPEWRITER (CUSTOMIZABLE)
// ======================================================
// Edit this text freely to personalize the love letter
const LOVE_LETTER_PARAGRAPHS = [
  "I don't know exactly when you became so special to me, but somewhere along the way, you became someone I really care about.",
  "I just wanted you to know…",
  "I LOVE YOU 🤗❤️"
];

function startLoveLetterTypewriter() {
  if (letterTypewriterDone) return;
  const el = $('typewriter-text');
  const cursor = document.querySelector('.typewriter-cursor');
  const continueBtn = $('letter-continue-btn');
  if (!el) return;

  el.innerHTML = '';

  let paraIndex = 0;
  let charIndex = 0;
  let currentParaSpan = null;

  function nextParagraph() {
    if (paraIndex >= LOVE_LETTER_PARAGRAPHS.length) {
      letterTypewriterDone = true;
      if (cursor) cursor.style.display = 'none';
      if (continueBtn) {
        continueBtn.classList.remove('hidden-btn');
        continueBtn.classList.add('visible');
      }
      return;
    }

    currentParaSpan = document.createElement('p');
    currentParaSpan.style.marginBottom = '1.2rem';
    if (paraIndex === LOVE_LETTER_PARAGRAPHS.length - 1) {
      currentParaSpan.style.fontSize = '1.35em';
      currentParaSpan.style.fontWeight = 'bold';
      currentParaSpan.style.color = '#ff3366';
      currentParaSpan.style.marginTop = '0.5rem';
    }
    el.appendChild(currentParaSpan);
    charIndex = 0;
    typeChar();
  }

  function typeChar() {
    const text = LOVE_LETTER_PARAGRAPHS[paraIndex];
    if (charIndex < text.length) {
      currentParaSpan.textContent += text[charIndex];
      const ch = text[charIndex];
      charIndex++;
      const delay = (ch === '.' || ch === '!' || ch === '?') ? 70
                  : ch === ',' ? 45
                  : rand(18, 42);
      setTimeout(typeChar, delay);
    } else {
      paraIndex++;
      setTimeout(nextParagraph, 450);
    }
  }

  nextParagraph();
}

// ======================================================
// EMOTIONAL QUESTION HANDLER
// ======================================================
function handleEmotionalAnswer(choice) {
  const buttonsBox = $('emotional-buttons');
  const revealBox = $('emotional-reveal');

  if (buttonsBox) buttonsBox.classList.add('hidden');
  if (revealBox) {
    revealBox.classList.remove('hidden');
    // Launch a gentle heart burst
    launchConfetti('confetti-container', 35);
  }
}

// ======================================================
// GRAND “I LOVE YOU” REVEAL & SURPRISE ANIMATION
// ======================================================
function startGrandReveal() {
  const tease = $('reveal-tease');
  const main  = $('reveal-main');
  const loveText = $('reveal-love-text');
  const continueBtn = $('btn-reveal-continue');

  if (tease) tease.classList.remove('hidden');
  if (main)  main.classList.add('hidden');

  // Start surprise canvas: hundreds of floating upward hearts
  initSurpriseCanvas();

  // Trigger romantic surprise confetti
  launchConfetti('reveal-confetti-container', 110);

  // Transition from tease to main I LOVE YOU after 1.8s
  setTimeout(() => {
    if (tease) tease.classList.add('hidden');
    if (main) {
      main.classList.remove('hidden');
      if (loveText) {
        animateLoveText(loveText, 'I LOVE YOU ❤️🤗', () => {
          if (continueBtn) {
            continueBtn.classList.remove('hidden-btn');
            continueBtn.classList.add('visible');
          }
        });
      }
    }
  }, 1800);
}

function animateLoveText(element, text, callback) {
  element.textContent = '';
  let i = 0;

  function type() {
    if (i < text.length) {
      element.textContent += text[i];
      i++;
      setTimeout(type, 80);
    } else {
      if (callback) callback();
    }
  }

  type();
}

// ======================================================
// SURPRISE CANVAS: HUNDREDS OF TINY FLOATING HEARTS
// ======================================================
function initSurpriseCanvas() {
  surpriseCanvas = $('surprise-canvas');
  if (!surpriseCanvas) return;
  surpriseCtx = surpriseCanvas.getContext('2d');
  resizeCanvas(surpriseCanvas);

  surpriseHearts = [];
  const heartEmojis = ['❤️', '💕', '💖', '💗', '💓', '🌸', '✨'];
  const count = Math.min(120, Math.floor(window.innerWidth / 8));

  for (let i = 0; i < count; i++) {
    surpriseHearts.push({
      x: rand(0, window.innerWidth),
      y: rand(window.innerHeight, window.innerHeight + 800),
      vy: rand(-2.2, -0.9),
      vx: rand(-0.4, 0.4),
      size: rand(12, 26),
      emoji: heartEmojis[randInt(0, heartEmojis.length - 1)],
      alpha: rand(0.4, 0.95),
      oscSpeed: rand(0.02, 0.05),
      oscOffset: rand(0, Math.PI * 2),
    });
  }

  animateSurpriseCanvas();
}

function animateSurpriseCanvas() {
  if (!surpriseCtx || !surpriseCanvas || currentScreen !== 'reveal') return;
  surpriseCtx.clearRect(0, 0, surpriseCanvas.width, surpriseCanvas.height);

  const t = Date.now() * 0.002;

  surpriseHearts.forEach(h => {
    surpriseCtx.save();
    surpriseCtx.globalAlpha = h.alpha;
    surpriseCtx.font = `${h.size}px serif`;
    const waveX = h.x + Math.sin(t + h.oscOffset) * 15;
    surpriseCtx.fillText(h.emoji, waveX, h.y);
    surpriseCtx.restore();

    h.y += h.vy;
    h.x += h.vx;

    // Reset when floating past top
    if (h.y < -30) {
      h.y = window.innerHeight + rand(10, 80);
      h.x = rand(0, window.innerWidth);
    }
  });

  requestAnimationFrame(animateSurpriseCanvas);
}

// ======================================================
// FINAL CINEMATIC CANVAS (PETALS & GLOW)
// ======================================================
function initFinalCanvas() {
  finalCanvas = $('final-canvas');
  if (!finalCanvas) return;
  finalCtx = finalCanvas.getContext('2d');
  resizeCanvas(finalCanvas);

  finalParticles = [];
  const petalEmojis = ['🌸', '🌷', '🌺', '❤️', '💕', '🌹', '✨'];

  for (let i = 0; i < 35; i++) {
    finalParticles.push({
      x: rand(0, window.innerWidth),
      y: rand(-200, window.innerHeight),
      vy: rand(0.6, 1.6),
      vx: rand(-0.5, 0.5),
      emoji: petalEmojis[randInt(0, petalEmojis.length - 1)],
      size: rand(15, 28),
      rot: rand(0, 360),
      rotSpeed: rand(-1, 1),
      alpha: rand(0.5, 0.95),
    });
  }

  animateFinalCanvas();
}

function animateFinalCanvas() {
  if (!finalCtx || !finalCanvas || currentScreen !== 'final') return;
  finalCtx.clearRect(0, 0, finalCanvas.width, finalCanvas.height);

  finalParticles.forEach(p => {
    finalCtx.save();
    finalCtx.globalAlpha = p.alpha;
    finalCtx.font = `${p.size}px serif`;
    finalCtx.translate(p.x, p.y);
    finalCtx.rotate((p.rot * Math.PI) / 180);
    finalCtx.fillText(p.emoji, 0, 0);
    finalCtx.restore();

    p.x  += p.vx;
    p.y  += p.vy;
    p.rot += p.rotSpeed;

    if (p.y > window.innerHeight + 40) {
      p.y = -40;
      p.x = rand(0, window.innerWidth);
    }
  });

  requestAnimationFrame(animateFinalCanvas);
}

// ======================================================
// PHOTO UPLOAD HANDLER
// ======================================================
function handlePhotoUpload(input, index) {
  if (!input.files || !input.files[0]) return;
  const file  = input.files[0];
  const url   = URL.createObjectURL(file);
  const frame = document.getElementById('frame-' + index);
  if (!frame) return;

  let img = frame.querySelector('img');
  if (!img) {
    img = document.createElement('img');
    img.alt = 'Memory ' + (index + 1);
    frame.prepend(img);
  }
  img.src = url;
  img.style.display = 'block';
  frame.classList.add('has-photo');
}

// ======================================================
// MUSIC CONTROLS & ROMANTIC AUDIO ENGINE
// ======================================================
function setupMusicControls() {
  const btn = $('mute-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    if (musicPlaying) {
      pauseRomanticMusic();
    } else {
      playRomanticMusic();
    }
  });
}

function playRomanticMusic() {
  const audio = $('bg-music');
  const btn   = $('mute-btn');
  const label = $('mute-label');

  if (audio) {
    audio.volume = 0.24; // Gentle, comfortable volume
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise.then(() => {
        setMusicUIState(true);
      }).catch(() => {
        // Fallback to synthesized romantic ambient piano chords if external MP3 is blocked
        startRomanticSynth();
        setMusicUIState(true);
      });
    } else {
      startRomanticSynth();
      setMusicUIState(true);
    }
  } else {
    startRomanticSynth();
    setMusicUIState(true);
  }
}

function pauseRomanticMusic() {
  const audio = $('bg-music');
  if (audio) audio.pause();
  stopRomanticSynth();
  setMusicUIState(false);
}

function setMusicUIState(isPlaying) {
  musicPlaying = isPlaying;
  const btn   = $('mute-btn');
  const label = $('mute-label');
  if (btn) {
    if (isPlaying) {
      btn.classList.add('playing');
    } else {
      btn.classList.remove('playing');
    }
  }
  if (label) {
    label.textContent = isPlaying ? 'Music: ON' : 'Music: OFF';
  }
}

// Romantic Ambient Synthesizer (Web Audio API Fallback)
function startRomanticSynth() {
  if (synthInterval) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    if (!audioCtx) audioCtx = new AudioContext();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    // Romantic pentatonic chord frequencies (soft dreamlike harp/chime)
    const chords = [
      [261.63, 329.63, 392.00, 523.25], // C major
      [220.00, 261.63, 329.63, 440.00], // A minor
      [174.61, 220.00, 261.63, 349.23], // F major
      [196.00, 246.94, 293.66, 392.00], // G major
    ];
    let chordIdx = 0;

    synthInterval = setInterval(() => {
      if (!audioCtx) return;
      const notes = chords[chordIdx % chords.length];
      chordIdx++;
      notes.forEach((freq, i) => {
        setTimeout(() => playTone(freq), i * 380);
      });
    }, 2800);
  } catch (e) {
    console.log('Web Audio API not supported', e);
  }
}

function playTone(freq) {
  if (!audioCtx) return;
  try {
    const osc  = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.04, audioCtx.currentTime + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.8);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 1.8);
  } catch (e) {}
}

function stopRomanticSynth() {
  if (synthInterval) {
    clearInterval(synthInterval);
    synthInterval = null;
  }
}

// ======================================================
// REPLAY EXPERIENCE
// ======================================================
function replayExperience() {
  letterTypewriterDone = false;
  revealTypewriterDone = false;
  goToScreen('landing');
}

// ======================================================
// WINDOW RESIZE HANDLER
// ======================================================
window.addEventListener('resize', () => {
  resizeCanvas(particleCanvas);
  resizeCanvas(surpriseCanvas);
  resizeCanvas(finalCanvas);
});
