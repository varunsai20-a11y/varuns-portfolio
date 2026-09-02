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

  // Only render on Slide 0 (Hero) to prevent overlapping with other slide background images
  if (currentSlideIndex !== 0) return null;

  return (
    <div className="fixed right-0 bottom-0 top-0 w-full sm:w-[50vw] max-w-[720px] pointer-events-none z-5 overflow-hidden flex items-end justify-end select-none">
      <motion.div
        animate={{
          scale: isMenuHovered ? 1.03 : 1.0,
          filter: isMenuHovered
            ? "drop-shadow(0 0 25px rgba(255, 204, 0, 0.4)) brightness(1.06)"
            : "drop-shadow(0 0 15px rgba(0, 0, 0, 0.8)) brightness(1)",
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative w-full h-[85vh] sm:h-[92vh] flex items-end justify-end transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x * 0.5}px, ${mouseOffset.y * 0.5}px, 0)`,
        }}
      >
        {/* Glow overlay for menu hover effect on Hero slide */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
      </motion.div>
    </div>
  );
}
