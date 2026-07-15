"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  color: string;
}

export default function MouseTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: 0, y: 0, lastX: 0, lastY: 0, active: false });
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Disable trail if user requests reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const spawnParticles = (x: number, y: number) => {
      // Spawn 3-5 particles per movement step
      const count = Math.floor(Math.random() * 3) + 3;
      // Get current accent color dynamically from root variables
      const isLightMode = document.documentElement.classList.contains("light");
      const baseHue = 160; // Emerald range
      const lightness = isLightMode ? "40%" : "60%";

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.5 + 0.5;
        particles.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1.0,
          size: Math.random() * 3.5 + 1.5,
          color: `hsla(${baseHue}, 80%, ${lightness}, `,
        });
      }
    };

    const updateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const activeParticles = particles.current;
      for (let i = activeParticles.length - 1; i >= 0; i--) {
        const p = activeParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        
        // Add light drag
        p.vx *= 0.98;
        p.vy *= 0.98;
        
        p.alpha -= 0.02; // Fade out rate
        p.size *= 0.97;  // Shrink rate

        if (p.alpha <= 0 || p.size <= 0.5) {
          activeParticles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        // Create glowing radial fill
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        gradient.addColorStop(0, `${p.color}${p.alpha})`);
        gradient.addColorStop(1, `${p.color}0)`);
        
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Keep animation running as long as there are active particles
      if (activeParticles.length > 0) {
        animationFrameId.current = requestAnimationFrame(updateParticles);
      } else {
        animationFrameId.current = null;
      }
    };

    const triggerUpdate = () => {
      if (animationFrameId.current === null) {
        animationFrameId.current = requestAnimationFrame(updateParticles);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      mouse.current.active = true;

      // Spawn if mouse moved sufficiently
      const dx = mouse.current.x - mouse.current.lastX;
      const dy = mouse.current.y - mouse.current.lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 3) {
        spawnParticles(e.clientX, e.clientY);
        mouse.current.lastX = e.clientX;
        mouse.current.lastY = e.clientY;
        triggerUpdate();
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const touch = e.touches[0];
      spawnParticles(touch.clientX, touch.clientY);
      triggerUpdate();
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 mix-blend-screen opacity-70"
    />
  );
}
