"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import { FileText, Gamepad2 } from "lucide-react";
import GTAHudOverlay from "@/components/hud/GTAHudOverlay";
import SlideContentManager from "@/components/sections/SlideContentManager";
import CharacterPortrait from "@/components/sections/CharacterPortrait";
import RecruiterView from "@/components/recruiter/RecruiterView";
import { portfolioConfig } from "@/config/portfolioConfig";

const GTAStageCanvas = dynamic(() => import("@/components/three/GTAStageCanvas"), {
  ssr: false,
});

export default function Home() {
  const [isRecruiterMode, setIsRecruiterMode] = useState(true);
  const [isTransitioningMode, setIsTransitioningMode] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const [showMissionFlash, setShowMissionFlash] = useState(false);
  const [mounted, setMounted] = useState(false);

  const totalSlides = portfolioConfig.slides.length;
  const activeSlide = portfolioConfig.slides[currentSlideIndex];
  const isTransitioning = useRef(false);

  // Read URL params on mount: default to Recruiter Mode unless ?mode=gta is specified
  useEffect(() => {
    setMounted(true);
    const params = new URLSearchParams(window.location.search);
    const modeParam = params.get("mode");

    if (modeParam === "gta") {
      setIsRecruiterMode(false);
    } else {
      setIsRecruiterMode(true);
    }
  }, []);

  // Helper to pause audio & animation when leaving GTA mode
  const pauseAudioAndCanvas = () => {
    if (typeof document !== "undefined") {
      const audioElements = document.querySelectorAll("audio");
      audioElements.forEach((audio) => {
        try {
          audio.pause();
        } catch (e) {
          // ignore
        }
      });
    }
  };

  // Mode Toggle Handler with URL synchronization & GTA entrance flourish
  const handleToggleMode = useCallback(
    (targetRecruiterMode: boolean) => {
      if (targetRecruiterMode === isRecruiterMode) return;

      if (!targetRecruiterMode) {
        // Launching GTA Mode -> show entrance flourish
        setIsTransitioningMode(true);
        setTimeout(() => {
          setIsRecruiterMode(false);
          setIsTransitioningMode(false);
        }, 600);
      } else {
        // Entering Recruiter Mode -> clean up audio/animations
        pauseAudioAndCanvas();
        setIsRecruiterMode(true);
      }

      // Update URL search parameters without triggering a full page reload
      const url = new URL(window.location.href);
      if (!targetRecruiterMode) {
        url.searchParams.set("mode", "gta");
      } else {
        url.searchParams.delete("mode");
      }
      window.history.replaceState({}, "", url.toString());
    },
    [isRecruiterMode]
  );

  const navigateToSlide = useCallback(
    (newIndex: number) => {
      if (newIndex < 0 || newIndex >= totalSlides) return;
      setShowMissionFlash(true);
      setCurrentSlideIndex(newIndex);
      setTimeout(() => setShowMissionFlash(false), 400);
    },
    [totalSlides]
  );

  // Wheel, keyboard & touch navigation (ONLY active in GTA Mode)
  useEffect(() => {
    if (isRecruiterMode) return;

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
  }, [isRecruiterMode, currentSlideIndex, totalSlides, navigateToSlide]);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen w-full">
      {/* ─── Persistent Floating Mode Switcher Button ─── */}
      {!isRecruiterMode ? (
        <button
          onClick={() => handleToggleMode(true)}
          aria-label="Switch to Recruiter View"
          className="fixed top-[84px] left-4 z-50 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/85 hover:bg-black backdrop-blur-md border border-gta-yellow/40 text-white font-hud text-xs font-bold shadow-2xl transition-all duration-300 hover:scale-105 hover:border-gta-yellow active:scale-95 cursor-pointer"
        >
          <FileText size={14} className="text-gta-yellow" />
          <span className="tracking-wider">📄 Recruiter / Clean View</span>
        </button>
      ) : (
        <button
          onClick={() => handleToggleMode(false)}
          aria-label="Launch GTA Interactive Mode"
          className="fixed top-4 right-4 z-50 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-900 backdrop-blur-md border border-amber-500/50 text-amber-300 font-sans text-xs sm:text-sm font-semibold shadow-2xl transition-all duration-300 hover:scale-105 hover:border-amber-400 active:scale-95 cursor-pointer"
        >
          <Gamepad2 size={16} className="text-amber-400" />
          <span className="tracking-wider">🎮 Launch GTA Mode</span>
        </button>
      )}

      {/* ─── Transition Flourish when Launching GTA Mode ─── */}
      {isTransitioningMode && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center text-center space-y-4 animate-fade-in">
          <div className="font-gta text-3xl sm:text-4xl text-gta-yellow tracking-widest animate-pulse">
            ENTERING GAME MODE
          </div>
          <div className="w-48 h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gta-yellow loading-bar" />
          </div>
          <p className="font-hud text-xs text-gta-cyan tracking-widest">
            LOS SANTOS / BENGALURU EDITION
          </p>
        </div>
      )}

      {/* ─── View Rendering ─── */}
      {isRecruiterMode ? (
        <RecruiterView onSwitchToGTA={() => handleToggleMode(false)} />
      ) : (
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
      )}
    </div>
  );
}

