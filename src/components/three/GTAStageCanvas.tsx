"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GTAStageCanvasProps {
  bgImage: string;
  scrollIndex: number;
}

export default function GTAStageCanvas({ bgImage, scrollIndex }: GTAStageCanvasProps) {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 18;
      const y = (e.clientY / window.innerHeight - 0.5) * 18;
      setMouseOffset({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const imageSrc = bgImage || "/api/assets/slide-hero.jpg";

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black select-none">
      {/* Cinematic Background Image — Ken Burns + parallax */}
      <AnimatePresence mode="wait">
        <motion.div
          key={imageSrc}
          initial={{ scale: 1.04, opacity: 0 }}
          animate={{
            scale: 1.0,
            opacity: 1,
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
          }}
          exit={{
            scale: 0.97,
            opacity: 0,
            transition: { duration: 0.4, ease: "easeIn" },
          }}
          className="absolute inset-0 bg-cover bg-[position:65%_center] sm:bg-[position:70%_center] animate-ken-burns"
          style={{
            backgroundImage: `url(${imageSrc})`,
            transform: `translate3d(${mouseOffset.x * 0.08}px, ${
              mouseOffset.y * 0.08 - scrollIndex * 4
            }px, 0)`,
          }}
        />
      </AnimatePresence>

      {/* Left-edge text readability gradient — fades to transparent right */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.60) 28%, rgba(0,0,0,0.20) 52%, transparent 72%)",
        }}
      />

      {/* Top atmospheric darkness */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 30%, transparent 65%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      {/* Subtle Vice City atmospheric colour bloom */}
      <div
        className="absolute inset-0 transition-opacity duration-500 z-[1] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at ${60 + mouseOffset.x * 0.3}% ${
            45 + mouseOffset.y * 0.3
          }%, rgba(255, 20, 100, 0.07) 0%, rgba(0, 200, 255, 0.04) 45%, transparent 70%)`,
        }}
      />

      {/* Floating ambient particles */}
      <ParticleCanvas scrollIndex={scrollIndex} mouseOffset={mouseOffset} />
    </div>
  );
}

function ParticleCanvas({
  scrollIndex,
  mouseOffset,
}: {
  scrollIndex: number;
  mouseOffset: { x: number; y: number };
}) {
  useEffect(() => {
    const canvas = document.getElementById("gta-particle-canvas") as HTMLCanvasElement | null;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const particleCount = 40;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.35,
      speedY: -Math.random() * 0.4 - 0.15,
      opacity: Math.random() * 0.5 + 0.15,
      color: Math.random() > 0.45 ? "#F5C518" : "#00D4FF",
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX + mouseOffset.x * 0.015;
        p.y += p.speedY + mouseOffset.y * 0.015 - scrollIndex * 0.04;

        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, [scrollIndex, mouseOffset]);

  return (
    <canvas
      id="gta-particle-canvas"
      className="absolute inset-0 z-[2] pointer-events-none opacity-70"
    />
  );
}
