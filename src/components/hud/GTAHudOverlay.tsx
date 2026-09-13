"use client";

import { useEffect, useState } from "react";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Radio,
  DollarSign,
  Clock,
  Github,
  Linkedin,
  FileText,
  MapPin,
  X,
  ExternalLink,
  Maximize2,
  Compass,
  Navigation,
} from "lucide-react";
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
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
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

  // Keyboard shortcut 'M' to toggle Tactical Map
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "m" || e.key === "M") {
        setIsMapModalOpen((prev) => !prev);
      } else if (e.key === "Escape" && isMapModalOpen) {
        setIsMapModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMapModalOpen]);

  return (
    <div className="fixed inset-0 pointer-events-none z-20 select-none">
      {/* ─── Top HUD Bar ─── */}
      <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
        {/* Top-Left Logo Title */}
        <div
          className="pointer-events-auto cursor-pointer px-4 py-3 bg-black/80 backdrop-blur-md border border-gta-yellow/25 shadow-xl hover:border-gta-yellow transition-all"
          style={{ borderRadius: "2px" }}
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
      <GTAObjectiveMinimap
        currentSlideIndex={currentSlideIndex}
        onOpenMapModal={() => setIsMapModalOpen(true)}
      />

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
          <span className="hud-keybadge bg-gta-yellow/20 text-gta-yellow border-gta-yellow/40">M (MAP)</span>
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

      {/* ─── GTA Tactical Satellite Map Modal Overlay ─── */}
      {isMapModalOpen && (
        <GTATacticalMapModal
          currentSlideIndex={currentSlideIndex}
          onClose={() => setIsMapModalOpen(false)}
          onNavigateSlide={(index) => {
            onNavigateSlide(index);
            setIsMapModalOpen(false);
          }}
        />
      )}
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

function GTAObjectiveMinimap({
  currentSlideIndex,
  onOpenMapModal,
}: {
  currentSlideIndex: number;
  onOpenMapModal: () => void;
}) {
  const config = MINIMAP_SLIDES[currentSlideIndex] || MINIMAP_SLIDES[0];
  const playerX = 27;
  const playerY = 27;
  const { personal } = portfolioConfig;

  return (
    <div className="fixed bottom-4 left-4 z-30 pointer-events-auto flex flex-col gap-2">
      {/* ─── Outer Objective Container ─── */}
      <div
        className="flex items-center gap-3.5 px-3.5 py-2.5 rounded-[4px] border border-[#F1B916] max-w-[92vw] sm:max-w-xl transition-all duration-300"
        style={{
          background: "rgba(10, 13, 18, 0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 8px 24px rgba(0, 0, 0, 0.7)",
        }}
      >
        {/* ─── GTA V Radar Minimap (Left Side - Clickable to expand) ─── */}
        <div className="relative shrink-0 flex items-center gap-2.5">
          <button
            onClick={onOpenMapModal}
            title="Click to open Full Tactical Map (Key: M)"
            className="relative w-[54px] h-[54px] rounded-full border-2 border-white overflow-hidden shrink-0 cursor-pointer hover:border-gta-yellow hover:scale-105 transition-all group"
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

            {/* Hover overlay hint */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity z-40">
              <Maximize2 size={16} className="text-gta-yellow" />
            </div>
          </button>

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

        {/* ─── Objective Text Stack & Interactive Map Action Links ─── */}
        <div className="min-w-0 flex flex-col justify-center pr-1 gap-1">
          <div className="flex items-center justify-between gap-2">
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

            {/* Quick Action Badges */}
            <div className="flex items-center gap-1.5">
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub Profile"
                className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/60 border border-gta-yellow/40 hover:border-gta-yellow hover:bg-gta-yellow/20 text-gta-yellow text-[10px] font-mono transition-all"
              >
                <Github size={11} />
                <span className="hidden sm:inline font-bold">GITHUB</span>
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn Profile"
                className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/60 border border-gta-cyan/40 hover:border-gta-cyan hover:bg-gta-cyan/20 text-gta-cyan text-[10px] font-mono transition-all"
              >
                <Linkedin size={11} />
                <span className="hidden sm:inline font-bold">LINKEDIN</span>
              </a>
              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Download Resume"
                className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/60 border border-white/40 hover:border-white hover:bg-white/20 text-white text-[10px] font-mono transition-all"
              >
                <FileText size={11} />
                <span className="hidden sm:inline font-bold">RESUME</span>
              </a>
              <button
                onClick={onOpenMapModal}
                title="Open Full Tactical Map"
                className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-gta-yellow/20 border border-gta-yellow hover:bg-gta-yellow hover:text-black text-gta-yellow text-[10px] font-mono transition-all cursor-pointer"
              >
                <MapPin size={11} />
                <span className="font-bold">MAP</span>
              </button>
            </div>
          </div>

          <p
            className="uppercase tracking-[1.5px] font-bold truncate leading-tight"
            style={{
              fontFamily: "'Oswald', 'Bebas Neue', sans-serif",
              fontSize: "15px",
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

function GTATacticalMapModal({
  currentSlideIndex,
  onClose,
  onNavigateSlide,
}: {
  currentSlideIndex: number;
  onClose: () => void;
  onNavigateSlide: (index: number) => void;
}) {
  const { personal, hud } = portfolioConfig;

  const mapWaypoints = [
    {
      id: "github",
      label: "GITHUB REPOSITORY DOSSIER",
      type: "link",
      url: personal.github,
      x: 28,
      y: 35,
      icon: Github,
      color: "#F1B916",
      desc: personal.github,
    },
    {
      id: "linkedin",
      label: "LINKEDIN NETWORK FREQUENCY",
      type: "link",
      url: personal.linkedin,
      x: 68,
      y: 38,
      icon: Linkedin,
      color: "#38BDF8",
      desc: personal.linkedin,
    },
    {
      id: "resume",
      label: "DOWNLOAD OPERATIVE RESUME (PDF)",
      type: "link",
      url: personal.resumeUrl,
      x: 48,
      y: 65,
      icon: FileText,
      color: "#22C55E",
      desc: "B_Varun_Sai_Resume.pdf",
    },
    {
      id: "hero",
      label: "HQ — MAIN MENU & OVERVIEW",
      type: "slide",
      slideIndex: 0,
      x: 20,
      y: 20,
      icon: Compass,
      color: "#F1B916",
      desc: "Hero Section",
    },
    {
      id: "dossier",
      label: "WAYPOINT A — OPERATIVE DOSSIER",
      type: "slide",
      slideIndex: 1,
      x: 35,
      y: 48,
      icon: Navigation,
      color: "#38BDF8",
      desc: "About & Stats",
    },
    {
      id: "arsenal",
      label: "WAYPOINT B — TACTICAL ARSENAL",
      type: "slide",
      slideIndex: 2,
      x: 52,
      y: 25,
      icon: Navigation,
      color: "#22C55E",
      desc: "Tech Skills Wheel",
    },
    {
      id: "heists",
      label: "WAYPOINT C — HEISTS & MISSIONS",
      type: "slide",
      slideIndex: 3,
      x: 75,
      y: 60,
      icon: Navigation,
      color: "#EF4444",
      desc: "Projects Planning Board",
    },
    {
      id: "waypoints",
      label: "WAYPOINT D — FIELD OPERATIONS",
      type: "slide",
      slideIndex: 4,
      x: 82,
      y: 30,
      icon: Navigation,
      color: "#F1B916",
      desc: "Experience & Timeline",
    },
    {
      id: "trophies",
      label: "WAYPOINT E — TROPHY ROOM",
      type: "slide",
      slideIndex: 5,
      x: 30,
      y: 78,
      icon: Navigation,
      color: "#A855F7",
      desc: "Achievements & LeetCode",
    },
    {
      id: "safehouse",
      label: "WAYPOINT F — SAFEHOUSE CONTACT",
      type: "slide",
      slideIndex: 6,
      x: 60,
      y: 82,
      icon: Navigation,
      color: "#00E5FF",
      desc: "Direct Transmission",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 pointer-events-auto bg-black/92 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 animate-fadeIn">
      {/* ─── Top Header Bar (GTA Pause Menu Header Style) ─── */}
      <div className="flex items-center justify-between border-b-2 border-gta-yellow/50 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 bg-gta-yellow animate-pulse rounded-sm" />
          <div>
            <h2 className="font-gta text-white text-xl sm:text-2xl tracking-wider leading-none">
              TACTICAL SATELLITE MAP // {hud.radarLocation}
            </h2>
            <p className="font-hud text-[11px] text-gta-yellow tracking-[0.25em] mt-0.5">
              INTERACTIVE OPERATIVE LINKS & FAST-TRAVEL WAYPOINTS
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-gta-red hover:text-white text-white/80 border border-white/20 rounded transition-all cursor-pointer"
        >
          <X size={18} />
          <span className="font-hud text-xs tracking-widest font-bold">CLOSE (ESC)</span>
        </button>
      </div>

      {/* ─── Main Content Area: Map Canvas Grid + Sidebar ─── */}
      <div className="flex-1 my-4 grid grid-cols-1 lg:grid-cols-4 gap-4 overflow-hidden">
        {/* Interactive Satellite Radar Map Grid (3 Cols on Desktop) */}
        <div className="lg:col-span-3 relative bg-[#091118] rounded border border-gta-yellow/30 overflow-hidden flex items-center justify-center shadow-2xl group">
          {/* Tactical Crosshatch Street Roads Background */}
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                "linear-gradient(rgba(56, 189, 248, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.2) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Faint Radar Rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <div className="w-[300px] h-[300px] rounded-full border border-gta-cyan" />
            <div className="w-[600px] h-[600px] rounded-full border border-gta-cyan" />
          </div>

          {/* Compass Rose */}
          <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/60 px-3 py-1.5 rounded border border-white/10 text-gta-green font-mono text-xs z-10">
            <Compass size={16} className="animate-spin" style={{ animationDuration: "20s" }} />
            <span>N 12.9716° // E 77.5946°</span>
          </div>

          {/* Interactive Map Waypoints */}
          {mapWaypoints.map((wp) => {
            const IconComp = wp.icon;
            const isLink = wp.type === "link";
            const isCurrentSlide = wp.type === "slide" && wp.slideIndex === currentSlideIndex;

            return (
              <div
                key={wp.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group/wp z-20"
                style={{ left: `${wp.x}%`, top: `${wp.y}%` }}
              >
                {isLink ? (
                  <a
                    href={wp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1 cursor-pointer transition-all duration-200 hover:scale-125"
                  >
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center border-2 border-white shadow-[0_0_15px_rgba(241,185,22,0.8)] animate-pulse"
                      style={{ backgroundColor: wp.color, color: "#000" }}
                    >
                      <IconComp size={18} strokeWidth={2.5} />
                    </div>
                    <span className="bg-black/90 text-white font-hud text-[10px] px-2 py-0.5 rounded border border-white/20 whitespace-nowrap shadow-lg tracking-wider group-hover/wp:border-gta-yellow group-hover/wp:text-gta-yellow">
                      {wp.label} <ExternalLink size={10} className="inline ml-1" />
                    </span>
                  </a>
                ) : (
                  <button
                    onClick={() => wp.slideIndex !== undefined && onNavigateSlide(wp.slideIndex)}
                    className="flex flex-col items-center gap-1 cursor-pointer transition-all duration-200 hover:scale-125"
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center border-2 ${
                        isCurrentSlide
                          ? "border-white bg-gta-yellow text-black shadow-[0_0_20px_#F1B916] scale-110"
                          : "border-white/60 bg-black/80 text-white hover:border-gta-yellow"
                      }`}
                    >
                      <IconComp size={14} />
                    </div>
                    <span
                      className={`font-hud text-[9px] px-2 py-0.5 rounded border whitespace-nowrap shadow-lg tracking-wider ${
                        isCurrentSlide
                          ? "bg-gta-yellow text-black border-gta-yellow font-bold"
                          : "bg-black/90 text-slate-300 border-white/20 hover:text-white"
                      }`}
                    >
                      {wp.label}
                    </span>
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Sidebar Legend & Direct Action Links */}
        <div className="bg-[#0c141d] rounded border border-white/10 p-4 flex flex-col justify-between gap-4 overflow-y-auto">
          <div>
            <h3 className="font-gta text-gta-yellow text-lg tracking-wide border-b border-gta-yellow/30 pb-2 mb-3">
              PRIMARY TARGET LINKS
            </h3>

            <div className="flex flex-col gap-2.5">
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-black/60 hover:bg-gta-yellow/10 border border-gta-yellow/40 hover:border-gta-yellow rounded transition-all group"
              >
                <div className="flex items-center gap-2.5 text-gta-yellow">
                  <Github size={18} />
                  <div>
                    <p className="font-hud text-xs font-bold tracking-wider group-hover:underline">
                      GITHUB PROFILE
                    </p>
                    <p className="text-[10px] font-mono text-slate-400 truncate max-w-[170px]">
                      {personal.github}
                    </p>
                  </div>
                </div>
                <ExternalLink size={14} className="text-gta-yellow" />
              </a>

              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-black/60 hover:bg-gta-cyan/10 border border-gta-cyan/40 hover:border-gta-cyan rounded transition-all group"
              >
                <div className="flex items-center gap-2.5 text-gta-cyan">
                  <Linkedin size={18} />
                  <div>
                    <p className="font-hud text-xs font-bold tracking-wider group-hover:underline">
                      LINKEDIN NETWORK
                    </p>
                    <p className="text-[10px] font-mono text-slate-400 truncate max-w-[170px]">
                      {personal.linkedin}
                    </p>
                  </div>
                </div>
                <ExternalLink size={14} className="text-gta-cyan" />
              </a>

              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-black/60 hover:bg-white/10 border border-white/40 hover:border-white rounded transition-all group"
              >
                <div className="flex items-center gap-2.5 text-white">
                  <FileText size={18} />
                  <div>
                    <p className="font-hud text-xs font-bold tracking-wider group-hover:underline">
                      DOWNLOAD RESUME
                    </p>
                    <p className="text-[10px] font-mono text-slate-400">PDF DOSSIER</p>
                  </div>
                </div>
                <ExternalLink size={14} className="text-white" />
              </a>
            </div>
          </div>

          <div className="border-t border-white/10 pt-3">
            <p className="font-hud text-[10px] text-slate-400 tracking-wider">
              TIP: CLICK ANY WAYPOINT ON THE MAP TO TRAVEL DIRECTLY OR TRANSMIT INTEL.
            </p>
          </div>
        </div>
      </div>

      {/* ─── Bottom Status Bar ─── */}
      <div className="flex items-center justify-between border-t border-white/10 pt-2 text-[10px] font-mono text-slate-400">
        <span>OPERATIVE: {personal.name.toUpperCase()}</span>
        <span>STATUS: {personal.status}</span>
        <span>LOCATION: {personal.location.toUpperCase()}</span>
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


