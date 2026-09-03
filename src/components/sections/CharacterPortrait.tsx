"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CharacterPortraitProps {
  isMenuHovered: boolean;
  currentSlideIndex: number;
}

export default function CharacterPortrait({
  isMenuHovered,
  currentSlideIndex,
}: CharacterPortraitProps) {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 12;
      setMouseOffset({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Only render on Slide 0 (Hero) to display the main character artwork portrait
  if (currentSlideIndex !== 0) return null;

  return (
    <div className="fixed right-4 bottom-4 top-16 w-full sm:w-[48vw] max-w-[650px] pointer-events-none z-10 overflow-hidden flex items-end justify-end select-none">
      <motion.div
        animate={{
          scale: isMenuHovered ? 1.04 : 1.0,
          filter: isMenuHovered
            ? "drop-shadow(0 0 30px rgba(245, 197, 24, 0.5)) brightness(1.08)"
            : "drop-shadow(0 0 20px rgba(0, 0, 0, 0.9)) brightness(1)",
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative w-full h-full flex items-end justify-end transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x * 0.5}px, ${mouseOffset.y * 0.5}px, 0)`,
        }}
      >
        <img
          src="/api/assets/gta-me-poster.jpg"
          alt="B Varun Sai GTA Character Artwork"
          className="h-full max-h-[85vh] w-auto object-contain rounded-3xl border-2 border-gta-yellow/40 shadow-2xl"
        />
        {/* Glow overlay for menu hover effect on Hero slide */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none rounded-3xl" />
      </motion.div>
    </div>
  );
}
