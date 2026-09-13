"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { portfolioConfig } from "@/config/portfolioConfig";
import {
  Github,
  Linkedin,
  Phone,
  Mail,
  MapPin,
  Trophy,
  Briefcase,
  ChevronRight,
  Cpu,
  Sparkles,
  FileText,
  Download,
  Flame,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";
import LeetCodeModal from "@/components/modals/LeetCodeModal";
import TechIcon from "@/components/ui/TechIcon";

// Lazy-load the Three.js Signature 3D Centerpiece
const R3FCenterpiece = dynamic(() => import("@/components/three/R3FCenterpiece"), {
  ssr: false,
});

interface SlideContentManagerProps {
  currentSlideIndex: number;
  onNavigateSlide: (index: number) => void;
  onMenuHoverChange?: (hovered: boolean) => void;
}

const slideVariants = {
  initial: { opacity: 0, x: 50, rotateY: -8, scale: 0.94 },
  animate: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    x: -50,
    rotateY: 8,
    scale: 0.94,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

const menuTargetIndex: Record<string, number> = {
  "ABOUT ME": 1,
  SKILLS: 2,
  PROJECTS: 3,
  EXPERIENCE: 4,
  ACHIEVEMENTS: 5,
  ACADEMY: 5,
  CONTACT: 6,
};

export default function SlideContentManager({
  currentSlideIndex,
  onNavigateSlide,
  onMenuHoverChange,
}: SlideContentManagerProps) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isLeetCodeOpen, setIsLeetCodeOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const slide = portfolioConfig.slides[currentSlideIndex];

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // Mouse 3D Card Tilt Math
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 8; // -4deg to 4deg
      const y = (e.clientY / window.innerHeight - 0.5) * -8; // -4deg to 4deg
      setTilt({ rotateX: y, rotateY: x });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="fixed left-3 sm:left-10 lg:left-16 top-28 bottom-16 z-10 w-[94vw] sm:w-[48vw] max-w-[680px] flex items-center justify-start overflow-hidden pointer-events-none select-none"
      style={{ perspective: "1200px" }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{
            rotateX: tilt.rotateX,
            rotateY: tilt.rotateY,
            background: "rgba(10, 14, 22, 0.88)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(245, 197, 24, 0.35)",
            boxShadow:
              "inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 25px 60px rgba(0, 0, 0, 0.85), 0 0 30px rgba(245, 197, 24, 0.1)",
            borderRadius: "4px",
          }}
          onWheel={(e) => {
            const container = e.currentTarget;
            const atTop = container.scrollTop <= 5 && e.deltaY < 0;
            const atBottom =
              container.scrollTop + container.clientHeight >= container.scrollHeight - 5 &&
              e.deltaY > 0;
            if (!atTop && !atBottom) {
              e.stopPropagation();
            }
          }}
          className="w-full pointer-events-auto max-h-[82vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gta-yellow/40 transition-transform duration-300 ease-out relative rounded-[4px]"
        >
          {/* ─── SLIDE 1: HERO / GTA V INTERACTION MENU ─── */}
          {slide.id === "hero" && (
            <div className="flex flex-col items-start justify-center w-full">
              {/* Top Header Bar */}
              <div className="w-full bg-[#090b10] px-6 py-4 border-b border-white/15 flex items-center justify-between shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[#F5B800] rounded-[1px] animate-pulse shadow-[0_0_8px_#F5B800]" />
                  <h2 className="font-gta text-2xl sm:text-3xl text-white tracking-widest leading-none uppercase">
                    {portfolioConfig.personal.name}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-[#000000] bg-[#85BB65] px-2.5 py-1 rounded-[2px] font-bold tracking-wider shadow-sm">
                    {portfolioConfig.hud.cashAmount}
                  </span>
                </div>
              </div>

              {/* Subtitle & R3F Centerpiece Banner */}
              <div className="w-full px-6 py-4 bg-black/40 border-b border-white/10 flex items-center justify-between">
                <div>
                  <p className="font-hud text-[10px] text-gta-orange tracking-[0.3em] uppercase flex items-center gap-1.5 font-bold">
                    <ShieldAlert size={12} className="text-gta-orange animate-pulse" />
                    <span>MISSION PASSED +RESPECT</span>
                  </p>
                  <p className="font-oswald text-base sm:text-lg text-gta-cyan tracking-wider font-semibold mt-0.5">
                    {portfolioConfig.personal.title}
                  </p>
                </div>

                {/* Signature R3F 3D Interactive Centerpiece */}
                <div className="hidden sm:block">
                  <R3FCenterpiece />
                </div>
              </div>

              {/* Menu Item Rows */}
              <div className="w-full flex flex-col">
                {slide.menuOptions?.map((item) => (
                  <button
                    key={item}
                    onClick={() => onNavigateSlide(menuTargetIndex[item] ?? 1)}
                    onMouseEnter={() => onMenuHoverChange?.(true)}
                    onMouseLeave={() => onMenuHoverChange?.(false)}
                    className="group relative w-full text-left font-oswald text-base sm:text-lg tracking-[0.08em] font-bold px-6 py-3.5 transition-all duration-150 flex items-center justify-between cursor-pointer border-b border-white/[0.06] bg-[rgba(15,19,26,0.7)] text-white hover:bg-white hover:text-black border-l-0 hover:border-l-[5px] hover:border-l-[#F5B800] rounded-none shadow-sm"
                  >
                    <span className="flex items-center gap-3 relative z-10 uppercase">
                      <ChevronRight
                        size={18}
                        className="text-[#F5B800] group-hover:text-black opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                      />
                      <span>{item}</span>
                    </span>
                    <span className="text-xs font-mono text-white/50 group-hover:text-black font-bold tracking-wider relative z-10">
                      [SELECT]
                    </span>
                  </button>
                ))}
              </div>

              {/* Social Quick Action Buttons */}
              <div className="p-4 bg-[#090b10]/90 border-t border-white/15 w-full flex flex-wrap items-center gap-3">
                <a
                  href={portfolioConfig.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-black/70 hover:bg-[#F5B800] hover:text-black text-[#F5B800] border border-[#F5B800]/40 rounded-[2px] font-oswald text-xs tracking-widest flex items-center gap-2 transition-all cursor-pointer shadow-md font-bold"
                >
                  <Github size={15} />
                  <span>GITHUB</span>
                </a>

                <a
                  href={portfolioConfig.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-black/70 hover:bg-gta-cyan hover:text-black text-gta-cyan border border-gta-cyan/40 rounded-[2px] font-oswald text-xs tracking-widest flex items-center gap-2 transition-all cursor-pointer shadow-md font-bold"
                >
                  <Linkedin size={15} />
                  <span>LINKEDIN</span>
                </a>
              </div>
            </div>
          )}

          {/* ─── SLIDE 2: ABOUT ME ─── */}
          {slide.id === "about" && (
            <div className="p-6 sm:p-7">
              <div className="flex items-center gap-3 mb-5 border-b border-white/10 pb-4">
                <Sparkles className="text-gta-yellow" size={24} />
                <div>
                  <p className="font-hud text-[10px] text-gta-orange tracking-widest font-bold">
                    {slide.tagline?.toUpperCase()}
                  </p>
                  <h2 className="font-gta text-2xl sm:text-4xl text-gta-yellow tracking-wider">
                    {slide.title}
                  </h2>
                </div>
              </div>

              <p className="font-body text-slate-200 text-sm sm:text-base leading-relaxed mb-6">
                {slide.content?.bio}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
                {slide.content?.stats?.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-black/70 border border-white/15 p-3.5 rounded-xl flex flex-col justify-between shadow-inner backdrop-blur-md"
                  >
                    <span className="font-hud text-[9px] text-gta-gray tracking-widest font-bold">
                      {stat.label}
                    </span>
                    <span className="font-hud text-xs sm:text-sm text-gta-cyan font-bold mt-1">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onNavigateSlide(3)}
                className="gta-btn px-6 py-3 text-xs font-hud tracking-wider flex items-center gap-2 cursor-pointer shadow-xl rounded-[2px]"
              >
                <span>{slide.content?.actionButton}</span>
                <ChevronRight size={16} />
              </button>
            </div>
          )}

          {/* ─── SLIDE 3: SKILLS ─── */}
          {slide.id === "skills" && (
            <div className="p-6 sm:p-7">
              <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                <Cpu className="text-gta-cyan" size={24} />
                <div>
                  <p className="font-hud text-[10px] text-gta-orange tracking-widest font-bold">
                    {slide.tagline?.toUpperCase()}
                  </p>
                  <h2 className="font-gta text-2xl sm:text-4xl text-gta-yellow tracking-wider">
                    {slide.title}
                  </h2>
                </div>
              </div>

              <div className="space-y-4">
                {slide.skillBars?.map((skill, idx) => (
                  <div key={skill.name} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-hud text-xs sm:text-sm text-white tracking-wider font-bold">
                        {skill.name}
                      </span>
                      <span className="font-hud text-xs text-gta-green font-bold">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full h-3 bg-black/80 rounded-full overflow-hidden border border-white/15 p-0.5 shadow-inner">
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.85, delay: 0.1 + idx * 0.08 }}
                        className="h-full bg-gradient-to-r from-gta-cyan via-gta-green to-gta-yellow rounded-full shadow-[0_0_10px_rgba(0,212,255,0.5)]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── SLIDE 4: PROJECTS (HEISTS) ─── */}
          {slide.id === "projects" && (
            <div className="p-6 sm:p-7 space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="font-hud text-[10px] text-gta-orange tracking-widest font-bold">
                    {slide.tagline?.toUpperCase()}
                  </p>
                  <h2 className="font-gta text-2xl sm:text-4xl text-gta-yellow tracking-wider">
                    {slide.title}
                  </h2>
                </div>
                <span className="font-hud text-[10px] text-gta-green border border-gta-green/40 bg-gta-green/10 px-3 py-1 rounded-full font-bold">
                  {slide.projectsList?.length || 4} HEISTS READY
                </span>
              </div>

              <div className="space-y-4">
                {slide.projectsList?.map((proj, pIdx) => (
                  <div
                    key={proj.title}
                    className="p-4 sm:p-5 bg-black/75 border border-white/15 hover:border-gta-yellow rounded-xl flex flex-col justify-between transition-all duration-300 shadow-md backdrop-blur-md group"
                  >
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-gta-yellow">
                            0{pIdx + 1}
                          </span>
                          <h3 className="font-gta text-lg text-white group-hover:text-gta-yellow transition-colors">
                            {proj.title}
                          </h3>
                        </div>
                        <span className="font-hud text-[9px] text-gta-pink font-bold border border-gta-pink/40 bg-gta-pink/10 px-2 py-0.5 rounded shrink-0">
                          {proj.tag}
                        </span>
                      </div>

                      <p className="font-body text-xs sm:text-sm text-slate-300 leading-relaxed my-2">
                        {proj.desc}
                      </p>

                      <div className="flex flex-wrap gap-1.5 my-3">
                        {proj.tech.map((t) => (
                          <span
                            key={t}
                            className="inline-flex items-center gap-1 bg-white/10 border border-white/15 text-gta-cyan font-hud text-[9px] px-2 py-0.5 rounded font-bold"
                          >
                            <TechIcon name={t} size={12} />
                            <span>{t}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mt-2 pt-2 border-t border-white/10">
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 bg-gta-yellow/15 hover:bg-gta-yellow hover:text-black border border-gta-yellow/50 text-gta-yellow text-center font-hud text-[11px] tracking-wider rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer font-bold shadow-md"
                      >
                        <Github size={14} />
                        <span>REQUEST CODE</span>
                      </a>

                      {proj.liveDemo && (
                        <a
                          href={proj.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2 bg-gta-cyan/15 hover:bg-gta-cyan hover:text-black border border-gta-cyan/50 text-gta-cyan text-center font-hud text-[11px] tracking-wider rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer font-bold shadow-md"
                        >
                          <ExternalLink size={14} />
                          <span>REQUEST LIVE DEMO</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── SLIDE 5: EXPERIENCE ─── */}
          {slide.id === "experience" && (
            <div className="p-6 sm:p-7">
              <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                <Briefcase className="text-gta-yellow" size={24} />
                <div>
                  <p className="font-hud text-[10px] text-gta-orange tracking-widest font-bold">
                    {slide.tagline?.toUpperCase()}
                  </p>
                  <h2 className="font-gta text-2xl sm:text-4xl text-gta-yellow tracking-wider">
                    {slide.title}
                  </h2>
                </div>
              </div>

              <div className="space-y-6 relative border-l-2 border-gta-yellow/40 pl-6 ml-2">
                {slide.timeline?.map((item) => (
                  <div key={item.role} className="relative space-y-1">
                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-gta-yellow border-2 border-black shadow-[0_0_10px_#F5B800]" />
                    <span className="font-hud text-xs text-gta-cyan tracking-wider font-bold">
                      {item.period}
                    </span>
                    <h3 className="font-gta text-xl text-white mt-0.5">{item.role}</h3>
                    <p className="font-hud text-xs text-gta-gray font-bold">{item.org}</p>
                    <p className="font-body text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── SLIDE 6: ACHIEVEMENTS ─── */}
          {slide.id === "achievements" && (
            <div className="p-6 sm:p-7 space-y-5">
              <LeetCodeModal isOpen={isLeetCodeOpen} onClose={() => setIsLeetCodeOpen(false)} />
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <Trophy className="text-gta-yellow" size={24} />
                <div>
                  <p className="font-hud text-[10px] text-gta-orange tracking-widest font-bold">
                    {slide.tagline?.toUpperCase()}
                  </p>
                  <h2 className="font-gta text-2xl sm:text-4xl text-gta-yellow tracking-wider">
                    {slide.title}
                  </h2>
                </div>
              </div>

              <div className="space-y-3.5">
                {slide.trophies?.map((trophy: any) => {
                  const isLeetCode = trophy.category === "LeetCode" || trophy.isLeetCode;
                  return (
                    <div
                      key={trophy.title}
                      onClick={() => {
                        if (isLeetCode) setIsLeetCodeOpen(true);
                      }}
                      className={`bg-black/75 border p-4 rounded-xl transition-all duration-300 backdrop-blur-md ${
                        isLeetCode
                          ? "border-gta-orange/60 hover:border-gta-orange bg-black/90 cursor-pointer shadow-lg hover:shadow-gta-orange/20"
                          : "border-white/15 hover:border-gta-yellow"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1.5">
                        <span
                          className={`font-hud text-[9px] px-2.5 py-0.5 rounded border font-bold ${
                            isLeetCode
                              ? "bg-gta-orange/20 text-gta-orange border-gta-orange/50"
                              : "bg-gta-yellow/20 text-gta-yellow border-gta-yellow/40"
                          }`}
                        >
                          🏆 {trophy.badge}
                        </span>
                        <span className="font-hud text-[10px] text-gta-gray font-bold">
                          {trophy.date}
                        </span>
                      </div>
                      <h4 className="font-hud text-sm text-white font-bold mb-0.5">
                        {trophy.title}
                      </h4>
                      <p className="font-hud text-xs text-gta-cyan mb-1 font-semibold">
                        {trophy.org || trophy.organization}
                      </p>
                      <p className="font-body text-xs sm:text-sm text-slate-300 leading-relaxed mb-2">
                        {trophy.details || trophy.desc}
                      </p>

                      {isLeetCode && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsLeetCodeOpen(true);
                          }}
                          className="w-full mt-2 py-2 px-3 bg-gta-orange/20 hover:bg-gta-orange hover:text-black border border-gta-orange/50 text-gta-orange font-hud text-[11px] tracking-wider rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer font-bold shadow-md"
                        >
                          <Flame size={14} className="animate-pulse" />
                          <span>INSPECT LIVE LEETCODE STATS</span>
                          <ExternalLink size={14} />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ─── SLIDE 7: CONTACT ─── */}
          {slide.id === "contact" && (
            <div className="p-6 sm:p-7 text-center">
              <p className="font-hud text-xs text-gta-orange tracking-[0.3em] font-bold mb-1">
                SECURE LINE
              </p>
              <h2 className="font-gta text-3xl sm:text-5xl text-gta-yellow gta-glow mb-4">
                SAFEHOUSE TRANSMISSION
              </h2>

              <p className="font-body text-slate-300 text-xs sm:text-sm mb-6 max-w-lg mx-auto">
                Open a direct transmission for engineering roles, research tracks, or full-stack software development projects.
              </p>

              <div className="space-y-3 mb-6 text-left">
                <button
                  onClick={() => handleCopyEmail(slide.contactInfo?.email || "varunsai.1028@gmail.com")}
                  className="w-full p-3.5 bg-black/75 border border-white/15 hover:border-gta-cyan rounded-xl flex items-center justify-between gap-3 transition-all cursor-pointer group text-left shadow-md backdrop-blur-md"
                >
                  <div className="flex items-center gap-3">
                    <Mail className="text-gta-cyan group-hover:scale-110 transition-transform" size={18} />
                    <div>
                      <p className="font-hud text-[8px] text-gta-gray font-bold">EMAIL TRANSMISSION (CLICK TO COPY)</p>
                      <p className="font-hud text-xs sm:text-sm text-white font-bold">
                        {slide.contactInfo?.email}
                      </p>
                    </div>
                  </div>
                  {copiedEmail ? (
                    <span className="font-hud text-[10px] text-gta-green font-bold bg-gta-green/20 border border-gta-green/40 px-2.5 py-1 rounded animate-bounce">
                      COPIED!
                    </span>
                  ) : (
                    <span className="font-hud text-[9px] text-gta-gray group-hover:text-gta-cyan transition-colors font-bold">
                      [COPY]
                    </span>
                  )}
                </button>

                <a
                  href={`tel:${slide.contactInfo?.phone}`}
                  className="p-3.5 bg-black/75 border border-white/15 hover:border-gta-green rounded-xl flex items-center gap-3 transition-all cursor-pointer block shadow-md backdrop-blur-md"
                >
                  <Phone className="text-gta-green" size={18} />
                  <div>
                    <p className="font-hud text-[8px] text-gta-gray font-bold">DIRECT PHONE</p>
                    <p className="font-hud text-xs sm:text-sm text-white font-bold">
                      {slide.contactInfo?.phone}
                    </p>
                  </div>
                </a>

                <a
                  href={slide.contactInfo?.resumeUrl || "/api/assets/B_Varun_Sai_Resume.pdf"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 bg-black/75 border border-gta-yellow/40 hover:border-gta-yellow hover:bg-gta-yellow/15 rounded-xl flex items-center gap-3 transition-all cursor-pointer block group shadow-lg backdrop-blur-md"
                >
                  <FileText className="text-gta-yellow group-hover:scale-110 transition-transform shrink-0" size={20} />
                  <div className="flex-1 flex items-center justify-between min-w-0">
                    <div>
                      <p className="font-hud text-[8px] text-gta-orange tracking-widest font-bold">DOSSIER / RESUME</p>
                      <p className="font-hud text-xs sm:text-sm text-gta-yellow font-bold truncate">
                        DOWNLOAD RESUME (PDF)
                      </p>
                    </div>
                    <Download size={16} className="text-gta-yellow group-hover:translate-y-0.5 transition-transform shrink-0 ml-2" />
                  </div>
                </a>

                <div className="p-3.5 bg-black/75 border border-white/15 rounded-xl flex items-center gap-3 shadow-md backdrop-blur-md">
                  <MapPin className="text-gta-red shrink-0" size={18} />
                  <div>
                    <p className="font-hud text-[8px] text-gta-gray font-bold">BASE LOCATION</p>
                    <p className="font-hud text-xs sm:text-sm text-white font-bold">
                      {slide.contactInfo?.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct Links */}
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href={slide.contactInfo?.resumeUrl || "/api/assets/B_Varun_Sai_Resume.pdf"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-gta-yellow/20 hover:bg-gta-yellow hover:text-black text-gta-yellow border border-gta-yellow/50 rounded-xl font-hud text-xs tracking-widest flex items-center gap-2 transition-all cursor-pointer shadow-lg font-bold"
                >
                  <Download size={15} />
                  <span>DOWNLOAD RESUME</span>
                </a>

                <a
                  href={slide.contactInfo?.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gta-btn px-5 py-2.5 text-xs font-hud tracking-widest flex items-center gap-2 cursor-pointer shadow-lg rounded-[2px]"
                >
                  <Github size={15} />
                  <span>GITHUB REPO</span>
                </a>

                <a
                  href={slide.contactInfo?.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-black/70 hover:bg-gta-cyan hover:text-black text-gta-cyan border border-gta-cyan/40 rounded-xl font-hud text-xs tracking-widest flex items-center gap-2 transition-all cursor-pointer shadow-lg font-bold"
                >
                  <Linkedin size={15} />
                  <span>LINKEDIN PROFILE</span>
                </a>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
