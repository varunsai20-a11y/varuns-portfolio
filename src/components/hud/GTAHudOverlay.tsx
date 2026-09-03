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

          <WantedStars initialStars={hud.wantedStars} />
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

      {/* ─── Bottom-Left Dynamic GTA V Objective Radar Minimap ─── */}
      <GTAObjectiveMinimap currentSlideIndex={currentSlideIndex} />

      {/* ─── Bottom-Center 7 Interactive Pagination Dots ─── */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 pointer-events-auto hidden md:flex items-center gap-2.5 bg-black/75 backdrop-blur-md px-4 py-2 rounded-full border border-gta-yellow/30 shadow-2xl z-20">
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

      {/* ─── Bottom-Right Keyboard Navigation Badges & Watermark Quote ─── */}
      <div className="absolute bottom-4 right-4 pointer-events-auto flex flex-col items-end gap-1.5 z-20">
        <div className="hidden sm:flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-gta-yellow/20 text-[10px] font-mono text-slate-300 shadow-lg">
          <span>NAV:</span>
          <span className="hud-keybadge">← / →</span>
          <span className="hud-keybadge">SCROLL</span>
          <span className="hud-keybadge">1-7</span>
        </div>

        <div className="hidden lg:block text-right">
          <p className="font-hud text-[11px] text-white/90 italic tracking-wider drop-shadow-md">
            "{personal.quote}"
          </p>
          <p className="font-hud text-[11px] text-gta-pink font-bold tracking-widest mt-0.5">
            — {personal.name}
          </p>
        </div>
      </div>
    </div>
  );
}

interface MinimapConfig {
  blipX: number;
  blipY: number;
  color: string;
  objectiveText: string;
}

const MINIMAP_SLIDES: MinimapConfig[] = [
  {
    blipX: 38,
    blipY: 14,
    color: "#F1B916",
    objectiveText: "BUILD NEXT LEVEL DIGITAL EXPERIENCES // LOS SANTOS EDITION",
  },
  {
    blipX: 14,
    blipY: 36,
    color: "#38BDF8",
    objectiveText: "INSPECT OPERATIVE DOSSIER // ACCESS BIOGRAPHY & STATS",
  },
  {
    blipX: 22,
    blipY: 10,
    color: "#22C55E",
    objectiveText: "UPGRADE TACTICAL WEAPON WHEEL // FULL STACK & AI LOADOUT",
  },
  {
    blipX: 42,
    blipY: 38,
    color: "#EF4444",
    objectiveText: "INSPECT PLANNING BOARD // EXECUTE HIGH IMPACT HEISTS",
  },
  {
    blipX: 38,
    blipY: 12,
    color: "#F1B916",
    objectiveText: "REVIEW FIELD OPERATIONS // LEADERSHIP & RESEARCH TIMELINE",
  },
  {
    blipX: 14,
    blipY: 38,
    color: "#A855F7",
    objectiveText: "COLLECT UNLOCKED TROPHIES // LEETCODE 200+ & DATATHONS",
  },
  {
    blipX: 42,
    blipY: 27,
    color: "#00E5FF",
    objectiveText: "TRANSMIT SECURE FREQUENCY // ESTABLISH DIRECT CONTACT",
  },
];

function GTAObjectiveMinimap({ currentSlideIndex }: { currentSlideIndex: number }) {
  const config = MINIMAP_SLIDES[currentSlideIndex] || MINIMAP_SLIDES[0];
  const playerX = 27;
  const playerY = 27;

  return (
    <div className="fixed bottom-4 left-4 z-30 pointer-events-auto flex items-center">
      {/* ─── Outer Objective Container ─── */}
      <div
        className="flex items-center gap-3.5 px-3.5 py-2.5 rounded-[4px] border border-[#F1B916] max-w-[92vw] sm:max-w-xl transition-all duration-300"
        style={{
          background: "rgba(10, 13, 18, 0.88)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 8px 24px rgba(0, 0, 0, 0.7)",
        }}
      >
        {/* ─── GTA V Radar Minimap (Left Side) ─── */}
        <div className="relative shrink-0 flex items-center gap-2.5">
          <div
            className="relative w-[54px] h-[54px] rounded-full border-2 border-white overflow-hidden shrink-0"
            style={{
              background: "radial-gradient(circle, #10212b 20%, #080f14 100%)",
              boxShadow: "0 0 10px rgba(0, 229, 255, 0.3)",
            }}
          >
            {/* Map Terrain / Faint Crosshatch Street Roads */}
            <svg className="absolute inset-0 w-full h-full opacity-35 pointer-events-none">
              <line x1="0" y1="27" x2="54" y2="27" stroke="#38BDF8" strokeWidth="1" />
              <line x1="27" y1="0" x2="27" y2="54" stroke="#38BDF8" strokeWidth="1" />
              <path d="M 0 12 Q 27 22 54 42" stroke="#64748B" strokeWidth="1.5" fill="none" />
              <path d="M 12 54 Q 32 27 52 0" stroke="#64748B" strokeWidth="1.5" fill="none" />
            </svg>

            {/* Dynamic Purple GPS Route Line */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              <line
                x1={playerX}
                y1={playerY}
                x2={config.blipX}
                y2={config.blipY}
                stroke="#8B5CF6"
                strokeWidth="3"
                strokeDasharray="4 2"
                className="animate-pulse"
              />
            </svg>

            {/* Dynamic Destination Blip */}
            <div
              className="absolute w-2.5 h-2.5 rounded-full border border-white z-10 transition-all duration-500 transform -translate-x-1/2 -translate-y-1/2 animate-bounce"
              style={{
                left: `${config.blipX}px`,
                top: `${config.blipY}px`,
                backgroundColor: config.color,
                boxShadow: `0 0 8px ${config.color}`,
              }}
            />

            {/* Player Blip (Center Cyan Dot) */}
            <div
              className="absolute w-2 h-2 bg-[#00E5FF] border border-white rounded-full z-20 transform -translate-x-1/2 -translate-y-1/2 shadow-[0_0_6px_#00E5FF]"
              style={{ left: `${playerX}px`, top: `${playerY}px` }}
            />

            {/* Compass Marker 'N' */}
            <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 text-[9px] font-mono font-bold text-[#22C55E] z-30 leading-none drop-shadow">
              N
            </span>
          </div>

          {/* Health & Armor Gauges Stacked Beside Circle */}
          <div className="hidden sm:flex flex-col justify-center gap-1.5 w-10 shrink-0 border-r border-white/10 pr-2">
            <div className="flex flex-col gap-0.5">
              <div className="flex justify-between items-center text-[7px] font-mono text-[#22C55E] font-bold leading-none">
                <span>HP</span>
                <span>100</span>
              </div>
              <div className="w-full h-1.5 bg-black/80 rounded-[1px] border border-white/20 p-[0.5px]">
                <div className="h-full bg-[#22C55E] rounded-[0.5px] shadow-[0_0_4px_#22C55E]" />
              </div>
            </div>

            <div className="flex flex-col gap-0.5">
              <div className="flex justify-between items-center text-[7px] font-mono text-[#38BDF8] font-bold leading-none">
                <span>ARM</span>
                <span>92</span>
              </div>
              <div className="w-full h-1.5 bg-black/80 rounded-[1px] border border-white/20 p-[0.5px]">
                <div className="h-full bg-[#38BDF8] w-[92%] rounded-[0.5px] shadow-[0_0_4px_#38BDF8]" />
              </div>
            </div>
          </div>
        </div>

        {/* ─── Objective Text Stack ─── */}
        <div className="min-w-0 flex flex-col justify-center pr-1">
          <p
            className="uppercase tracking-[2px] font-bold"
            style={{
              fontFamily: "'Chakra Petch', sans-serif",
              fontSize: "11px",
              color: "#EA580C",
            }}
          >
            CURRENT OBJECTIVE
          </p>
          <p
            className="uppercase tracking-[1.5px] font-bold truncate leading-tight mt-0.5"
            style={{
              fontFamily: "'Oswald', 'Bebas Neue', sans-serif",
              fontSize: "16px",
              color: "#FACC15",
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.9)",
            }}
          >
            {config.objectiveText}
          </p>
        </div>
      </div>
    </div>
  );
}

function WantedStars({ initialStars }: { initialStars: number }) {
  const [stars, setStars] = useState(initialStars);
  const [isFlashing, setIsFlashing] = useState(false);

  const handleStarClick = (index: number) => {
    setStars(index + 1 === stars ? 0 : index + 1);
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 500);
  };

  return (
    <div
      className={`hud-panel px-3.5 py-1 flex items-center gap-1 bg-black/75 backdrop-blur-md border rounded-xl shadow-xl transition-colors duration-300 ${
        isFlashing ? "border-gta-pink bg-gta-pink/20" : "border-gta-yellow/40"
      }`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          onClick={() => handleStarClick(i)}
          className={`cursor-pointer transition-all duration-200 hover:scale-125 ${
            i < stars
              ? "fill-gta-yellow text-gta-yellow drop-shadow-[0_0_8px_rgba(255,204,0,0.9)] animate-pulse"
              : "text-gray-600 hover:text-gta-yellow/60"
          }`}
        />
      ))}
    </div>
  );
}

