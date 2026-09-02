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
      {/* Directional Camera Scale Transition & Ken Burns Pan */}
      <AnimatePresence mode="wait">
        <motion.div
          key={imageSrc}
          initial={{ scale: 1.15, opacity: 0, x: 20 }}
          animate={{
            scale: 1.05,
            opacity: 1,
            x: 0,
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
          }}
          exit={{
            scale: 0.98,
            opacity: 0,
            x: -20,
            transition: { duration: 0.4, ease: "easeIn" },
          }}
          className="absolute -inset-12 bg-cover bg-center animate-ken-burns"
          style={{
            backgroundImage: `url(${imageSrc})`,
            transform: `translate3d(${mouseOffset.x * 0.15}px, ${
              mouseOffset.y * 0.15 - scrollIndex * 10
            }px, 0)`,
          }}
        />
      </AnimatePresence>

      {/* Layered Vice City Neon Bloom Glow Overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-500 z-[1]"
        style={{
          background: `radial-gradient(circle at ${50 + mouseOffset.x * 0.5}% ${
            50 + mouseOffset.y * 0.5
          }%, rgba(255, 0, 128, 0.12) 0%, rgba(0, 255, 204, 0.08) 40%, rgba(0,0,0,0.85) 100%)`,
        }}
      />

      {/* GTA Ambient Vignette & Contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-transparent to-black/85 z-[1]" />
    </div>
  );
}
