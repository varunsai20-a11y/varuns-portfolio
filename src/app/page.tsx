"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import GTAHudOverlay from "@/components/hud/GTAHudOverlay";
import SlideContentManager from "@/components/sections/SlideContentManager";
import CharacterPortrait from "@/components/sections/CharacterPortrait";
import { portfolioConfig } from "@/config/portfolioConfig";

const GTAStageCanvas = dynamic(() => import("@/components/three/GTAStageCanvas"), {
  ssr: false,
});

export default function Home() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const [showMissionFlash, setShowMissionFlash] = useState(false);
  const totalSlides = portfolioConfig.slides.length;
  const activeSlide = portfolioConfig.slides[currentSlideIndex];
  const isTransitioning = useRef(false);

  const navigateToSlide = useCallback(
    (newIndex: number) => {
      if (newIndex < 0 || newIndex >= totalSlides) return;
      setShowMissionFlash(true);
      setCurrentSlideIndex(newIndex);
      setTimeout(() => setShowMissionFlash(false), 400);
    },
    [totalSlides]
  );

  // Wheel, keyboard & touch navigation
  useEffect(() => {
    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning.current) return;

      // Inspect if wheel event occurred inside a scrollable container
      let target = e.target as HTMLElement | null;
      while (target && target !== document.body) {
        const style = window.getComputedStyle(target);
        const overflowY = style.overflowY;
        const isScrollable =
          (overflowY === "auto" || overflowY === "scroll") &&
          target.scrollHeight > target.clientHeight;

        if (isScrollable) {
          const delta = e.deltaY;
          const atTop = target.scrollTop <= 5 && delta < 0;
          const atBottom =
            target.scrollTop + target.clientHeight >= target.scrollHeight - 5 && delta > 0;

          // If not at the boundary edge, allow element internal scroll and cancel slide change
          if (!atTop && !atBottom) {
            return;
          }
        }
        target = target.parentElement;
      }

      if (Math.abs(e.deltaY) > 30) {
        isTransitioning.current = true;
        if (e.deltaY > 0) {
          navigateToSlide(Math.min(currentSlideIndex + 1, totalSlides - 1));
        } else {
          navigateToSlide(Math.max(currentSlideIndex - 1, 0));
        }
        setTimeout(() => {
          isTransitioning.current = false;
        }, 550);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        navigateToSlide(Math.min(currentSlideIndex + 1, totalSlides - 1));
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        navigateToSlide(Math.max(currentSlideIndex - 1, 0));
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          navigateToSlide(Math.min(currentSlideIndex + 1, totalSlides - 1));
        } else {
          navigateToSlide(Math.max(currentSlideIndex - 1, 0));
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [currentSlideIndex, totalSlides, navigateToSlide]);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-transparent select-none">
      {/* Quick Mission Pass Flash Overlay */}
      <div
        className={`fixed inset-0 z-50 pointer-events-none bg-gta-yellow/15 transition-opacity duration-300 ${
          showMissionFlash ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Layer 0: Master Fixed Background (z-index: 0) */}
      <GTAStageCanvas bgImage={activeSlide.bgImage} scrollIndex={currentSlideIndex} />

      {/* Layer 1: Pinned Character Portrait Cutout (z-index: 5) */}
      <CharacterPortrait
        isMenuHovered={isMenuHovered}
        currentSlideIndex={currentSlideIndex}
      />

      {/* Layer 2: Slide Container / Left Content Area (z-index: 10, width: 45vw) */}
      <SlideContentManager
        currentSlideIndex={currentSlideIndex}
        onNavigateSlide={navigateToSlide}
        onMenuHoverChange={setIsMenuHovered}
      />

      {/* Layer 3: Persistent Global GTA HUD & Overlays (z-index: 20) */}
      <GTAHudOverlay
        currentSlideIndex={currentSlideIndex}
        totalSlides={totalSlides}
        activeObjective={activeSlide.objective}
        onNavigateSlide={navigateToSlide}
      />
    </main>
  );
}
