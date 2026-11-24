import confetti from 'canvas-confetti';

export const fireRomanticConfetti = () => {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;

  const colors = ['#ff4d6d', '#ffb3c6', '#c9184a', '#ffffff', '#ffd700', '#ff758f'];

  const frame = () => {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: colors,
      zIndex: 9999,
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: colors,
      zIndex: 9999,
    });

    if (Date.now() < animationEnd) {
      requestAnimationFrame(frame);
    }
  };

  frame();
};

export const fireHeartBurst = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0.6 },
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#ff4d6d', '#ffb3c6']
  });
  fire(0.2, {
    spread: 60,
    colors: ['#c9184a', '#ffffff']
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ['#ffd700', '#ff758f']
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    colors: ['#ff4d6d', '#800f2e']
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: ['#ffffff', '#ffccd5']
  });
};
