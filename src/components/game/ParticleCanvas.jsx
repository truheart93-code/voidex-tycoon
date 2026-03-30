import { useEffect, useRef } from 'react';

// Global particle system - renders on a fixed overlay canvas
let particles = [];
let animFrame = null;
let canvasEl = null;
let ctx = null;

function spawnParticles(x, y, color = '#22d3ee', count = 18) {
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
    const speed = 1.5 + Math.random() * 3.5;
    particles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 1.5,
      life: 1,
      decay: 0.025 + Math.random() * 0.03,
      size: 2 + Math.random() * 3,
      color,
    });
  }
}

function loop() {
  if (!canvasEl || !ctx) return;
  ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

  particles = particles.filter(p => p.life > 0);

  for (const p of particles) {
    ctx.save();
    ctx.globalAlpha = p.life;
    ctx.fillStyle = p.color;
    ctx.shadowBlur = 8;
    ctx.shadowColor = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.08; // gravity
    p.life -= p.decay;
    p.size *= 0.97;
  }

  animFrame = requestAnimationFrame(loop);
}

export function triggerParticles(x, y, color) {
  spawnParticles(x, y, color);
}

export default function ParticleCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    canvasEl = ref.current;
    ctx = canvasEl.getContext('2d');

    const resize = () => {
      canvasEl.width = window.innerWidth;
      canvasEl.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    animFrame = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', resize);
      if (animFrame) cancelAnimationFrame(animFrame);
      canvasEl = null;
      ctx = null;
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 z-40 pointer-events-none"
    />
  );
}