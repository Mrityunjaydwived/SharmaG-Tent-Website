import React, { useEffect, useRef } from 'react';

interface ParticleBackgroundProps {
  intensity?: 'wedding' | 'corporate' | 'party' | 'religious' | 'default';
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ intensity = 'default' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Prompt Section 50: Particle system configuration based on mood
    // wedding: Soft gold particles
    // corporate: Minimal blue particles
    // party: Energetic particles
    // religious: Very subtle golden particles
    const particleCount =
      intensity === 'party'
        ? 50
        : intensity === 'wedding'
        ? 35
        : intensity === 'corporate'
        ? 20
        : intensity === 'religious'
        ? 25
        : 30;

    const colors =
      intensity === 'wedding' || intensity === 'religious'
        ? ['#F8D706', '#FFC928', '#F09120', '#FFFFFF']
        : intensity === 'party'
        ? ['#1F74BA', '#F8D706', '#F09120', '#287ED6']
        : ['#1F74BA', '#287ED6', '#CBD5E1'];

    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 0.8,
      speedX: (Math.random() - 0.5) * (intensity === 'party' ? 0.8 : 0.4),
      speedY: (Math.random() - 0.5) * (intensity === 'party' ? 0.8 : 0.3) - 0.15,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.45 + 0.15,
      pulseSpeed: Math.random() * 0.02 + 0.005,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        p.alpha += Math.sin(Date.now() * p.pulseSpeed) * 0.005;
        const currentAlpha = Math.max(0.1, Math.min(0.65, p.alpha));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentAlpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70"
    />
  );
};
