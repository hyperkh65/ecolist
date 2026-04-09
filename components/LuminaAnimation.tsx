'use client';
import { useEffect, useRef, useState } from 'react';

// Remotion-inspired animation component using CSS animations + requestAnimationFrame
export function LuminaHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const frameRef = useRef(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    // Particle system
    const particles: { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number }[] = [];

    const addParticle = (cx: number, cy: number) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.3 + Math.random() * 0.8;
      particles.push({
        x: cx + (Math.random() - 0.5) * 60,
        y: cy + (Math.random() - 0.5) * 60,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.5,
        life: 0,
        maxLife: 80 + Math.random() * 120,
        size: 0.5 + Math.random() * 2,
      });
    };

    const draw = () => {
      frameRef.current++;
      const f = frameRef.current;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      // Animated light rays from top center
      const cx = w / 2;
      const baseY = -40;
      const t = f * 0.008;

      // Draw radiating beams
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI + Math.PI * 0.1 + Math.sin(t + i * 0.5) * 0.03;
        const len = h * 1.2;
        const opacity = 0.04 + Math.sin(t * 1.2 + i) * 0.02;
        const grad = ctx.createLinearGradient(cx, baseY, cx + Math.cos(angle) * len, baseY + Math.sin(angle) * len);
        grad.addColorStop(0, `rgba(255,255,255,${opacity + 0.05})`);
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.save();
        ctx.strokeStyle = grad;
        ctx.lineWidth = 40 + i * 8;
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.moveTo(cx, baseY);
        ctx.lineTo(cx + Math.cos(angle) * len, baseY + Math.sin(angle) * len);
        ctx.stroke();
        ctx.restore();
      }

      // Ring glow at center top
      const ringY = h * 0.28;
      const ringR = Math.min(w, h) * 0.12;
      const pulse = 1 + Math.sin(t * 2) * 0.03;
      for (let g = 3; g >= 0; g--) {
        const grad = ctx.createRadialGradient(cx, ringY, ringR * pulse * (0.8 - g * 0.1), cx, ringY, ringR * pulse * (1.5 + g * 0.5));
        grad.addColorStop(0, `rgba(255,255,255,${0.15 - g * 0.03})`);
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, ringY, ringR * (2 + g * 0.8), 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw the ring
      ctx.save();
      ctx.strokeStyle = 'rgba(255,255,255,0.85)';
      ctx.lineWidth = 3;
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#fff';
      ctx.beginPath();
      ctx.arc(cx, ringY, ringR * pulse, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Floor reflection circle
      const floorY = h * 0.82;
      const ellipseRx = ringR * 1.4;
      const ellipseRy = ringR * 0.3;
      const reflectGrad = ctx.createRadialGradient(cx, floorY, 0, cx, floorY, ellipseRx);
      reflectGrad.addColorStop(0, 'rgba(255,255,255,0.08)');
      reflectGrad.addColorStop(0.5, 'rgba(255,255,255,0.04)');
      reflectGrad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = reflectGrad;
      ctx.beginPath();
      ctx.ellipse(cx, floorY, ellipseRx * 1.5, ellipseRy * 2, 0, 0, Math.PI * 2);
      ctx.fill();

      // Particles
      if (f % 3 === 0) addParticle(cx, ringY);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy; p.life++;
        if (p.life > p.maxLife) { particles.splice(i, 1); continue; }
        const alpha = (1 - p.life / p.maxLife) * 0.6;
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 - p.life / p.maxLife), 0, Math.PI * 2);
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener('resize', resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: mounted ? 1 : 0, transition: 'opacity 1s ease' }} />
  );
}

// Counter animation
export function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 2000;
        const start = Date.now();
        const tick = () => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(target * ease));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

// Scroll reveal wrapper
export function ScrollReveal({ children, delay = 0, direction = 'up' }: { children: React.ReactNode; delay?: number; direction?: 'up' | 'left' | 'right' }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const transforms = { up: 'translateY(40px)', left: 'translateX(-40px)', right: 'translateX(40px)' };

  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : transforms[direction],
      transition: `opacity 0.8s ease ${delay}ms, transform 0.8s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}
