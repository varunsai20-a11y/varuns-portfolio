"use client";

import { useEffect, useState } from "react";

interface GTAStageCanvasProps {
  bgImage: string;
  scrollIndex: number;
}

export default function GTAStageCanvas({ bgImage, scrollIndex }: GTAStageCanvasProps) {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 15;
      const y = (e.clientY / window.innerHeight - 0.5) * 15;
      setMouseOffset({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const imageSrc = bgImage || "/api/assets/slide-hero.jpg";

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black select-none">
      {/* Layer 0: Base Parallax Background (0.2x Parallax Speed) */}
      <div
        className="absolute -inset-10 bg-cover bg-center transition-all duration-700 ease-out"
        style={{
          backgroundImage: `url(${imageSrc})`,
          transform: `translate3d(${mouseOffset.x * 0.2}px, ${
            mouseOffset.y * 0.2 - scrollIndex * 15
          }px, 0) scale(1.08)`,
        }}
      />

      {/* Layer 0 Dark Gradient & Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/85 z-[1]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(5,5,10,0.85)_100%)] z-[1]" />
    </div>
  );
}
