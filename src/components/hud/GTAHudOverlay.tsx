"use client";

import { useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Radio, DollarSign, Clock } from "lucide-react";
import { portfolioConfig } from "@/config/portfolioConfig";

interface GTAHudOverlayProps {
  currentSlideIndex: number;
  totalSlides: number;
  activeObjective: string;
  onNavigateSlide: (newIndex: number) => void;
}

export default function GTAHudOverlay({
  currentSlideIndex,
  totalSlides,
  activeObjective,
  onNavigateSlide,
}: GTAHudOverlayProps) {
  const [timeString, setTimeString] = useState("16:13");
  const { personal, hud } = portfolioConfig;

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const mins = String(now.getMinutes()).padStart(2, "0");
      setTimeString(`${hours}:${mins}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-20 select-none">
      {/* ─── Top HUD Bar ─── */}
      <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
        {/* Top-Left Logo Title */}
        <div
          className="pointer-events-auto cursor-pointer p-3 bg-black/70 backdrop-blur-md border border-gta-yellow/30 rounded-2xl shadow-xl hover:border-gta-yellow transition-all"
          onClick={() => onNavigateSlide(0)}
        >
          <h1 className="font-gta text-white tracking-wider text-xl sm:text-2xl flex items-baseline gap-2 leading-none">
            <span>{personal.logoTitle}</span>
            <span className="font-gta text-gta-pink text-lg italic lowercase">
              {personal.subtitle}
            </span>
          </h1>
          <p className="font-hud text-[9px] text-gta-yellow tracking-[0.25em] mt-1">
            {hud.radioChannel}
          </p>
        </div>

        {/* Top-Right Game Clock, Cash & Wanted Stars */}
        <div className="pointer-events-auto flex flex-col items-end gap-1.5">
          <div className="hud-panel px-3.5 py-1.5 flex items-center gap-3.5 bg-black/75 backdrop-blur-md border border-gta-yellow/40 rounded-xl shadow-xl">
            <div className="flex items-center gap-1.5 font-hud text-xs text-gta-cyan">
              <Clock size={13} className="text-gta-cyan" />
              <span>{timeString}</span>
            </div>

            <div className="h-3.5 w-px bg-white/20" />

            <div className="flex items-center gap-1 font-hud text-xs sm:text-sm font-bold text-gta-green">
              <DollarSign size={14} />
              <span>{hud.cashAmount}</span>
            </div>

            <div className="h-3.5 w-px bg-white/20" />

            <div className="flex items-center gap-1 text-[10px] font-hud text-gta-pink">
              <Radio size={12} className="animate-pulse" />
              <span className="hidden sm:inline">LIVE</span>
            </div>
          </div>

          <div className="hud-panel px-3.5 py-1 flex items-center gap-1 bg-black/75 backdrop-blur-md border border-gta-yellow/40 rounded-xl shadow-xl">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={13}
                className={
                  i < hud.wantedStars
                    ? "fill-gta-yellow text-gta-yellow drop-shadow-[0_0_8px_rgba(255,204,0,0.9)] animate-pulse"
                    : "text-gray-600"
                }
              />
            ))}
          </div>
        </div>
      </div>

      {/* ─── Floating Side Navigation Arrows ─── */}
      <button
        onClick={() => onNavigateSlide(Math.max(0, currentSlideIndex - 1))}
        disabled={currentSlideIndex === 0}
        aria-label="Previous Slide"
        className={`pointer-events-auto fixed left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 sm:w-11 h-10 sm:h-11 rounded-full bg-white text-black shadow-2xl flex items-center justify-center transition-all duration-300 z-30 ${
          currentSlideIndex === 0
            ? "opacity-30 cursor-not-allowed"
            : "hover:scale-110 hover:bg-gta-yellow hover:text-black cursor-pointer active:scale-95"
        }`}
      >
        <ChevronLeft size={24} strokeWidth={3} />
      </button>

      <button
        onClick={() => onNavigateSlide(Math.min(totalSlides - 1, currentSlideIndex + 1))}
        disabled={currentSlideIndex === totalSlides - 1}
        aria-label="Next Slide"
        className={`pointer-events-auto fixed right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 sm:w-11 h-10 sm:h-11 rounded-full bg-white text-black shadow-2xl flex items-center justify-center transition-all duration-300 z-30 ${
          currentSlideIndex === totalSlides - 1
            ? "opacity-30 cursor-not-allowed"
            : "hover:scale-110 hover:bg-gta-yellow hover:text-black cursor-pointer active:scale-95"
        }`}
      >
        <ChevronRight size={24} strokeWidth={3} />
      </button>

      {/* ─── Bottom-Left Objective Radar Minimap ─── */}
      <div className="absolute bottom-4 left-4 pointer-events-auto max-w-[260px] sm:max-w-xs z-20">
        <div className="hud-panel p-2.5 bg-black/85 backdrop-blur-md border border-gta-yellow/40 rounded-xl flex items-center gap-3 shadow-2xl">
          <div className="relative w-10 h-10 rounded-full border-2 border-gta-pink bg-black flex items-center justify-center shrink-0 overflow-hidden shadow-[0_0_10px_rgba(255,0,128,0.5)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,200,0.25)_0%,transparent_70%)]" />
            <div className="w-1.5 h-1.5 rounded-full bg-gta-cyan animate-ping" />
            <div className="w-1 h-1 rounded-full bg-gta-yellow absolute" />
            <div className="absolute bottom-0.5 text-[7px] font-hud text-gta-green font-bold">N</div>
          </div>

          <div className="min-w-0">
            <p className="font-hud text-[8px] text-gta-orange tracking-widest uppercase">
              CURRENT OBJECTIVE
            </p>
            <p className="font-hud text-xs text-gta-yellow font-bold tracking-wider leading-tight truncate">
              {activeObjective}
            </p>
          </div>
        </div>
      </div>

      {/* ─── Bottom-Center 7 Interactive Pagination Dots ─── */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 pointer-events-auto flex items-center gap-2.5 bg-black/75 backdrop-blur-md px-4 py-2 rounded-full border border-gta-yellow/30 shadow-2xl z-20">
        {Array.from({ length: totalSlides }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => onNavigateSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              currentSlideIndex === idx
                ? "w-7 h-2.5 bg-gta-yellow shadow-[0_0_10px_rgba(255,204,0,0.9)] scale-110"
                : "w-2.5 h-2.5 bg-white/40 hover:bg-white/90 hover:scale-125"
            }`}
          />
        ))}
      </div>

      {/* ─── Bottom-Right Watermark Quote ─── */}
      <div className="absolute bottom-4 right-4 pointer-events-auto hidden lg:block text-right z-20">
        <p className="font-hud text-[11px] text-white/90 italic tracking-wider drop-shadow-md">
          "{personal.quote}"
        </p>
        <p className="font-hud text-[11px] text-gta-pink font-bold tracking-widest mt-0.5">
          — {personal.name}
        </p>
      </div>
    </div>
  );
}
