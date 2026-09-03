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
} from "lucide-react";
import LeetCodeModal from "@/components/modals/LeetCodeModal";

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
  initial: { opacity: 0, x: 45, rotateY: -6, scale: 0.95 },
  animate: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    x: -45,
    rotateY: 6,
    scale: 0.95,
    transition: { duration: 0.28, ease: "easeIn" },
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
      className="fixed left-4 sm:left-12 lg:left-20 top-32 bottom-20 z-10 w-[92vw] sm:w-[45vw] max-w-[650px] flex items-center justify-start overflow-hidden pointer-events-none select-none"
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
            background: "rgba(12, 16, 22, 0.8)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            boxShadow:
              "inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 20px 50px rgba(0, 0, 0, 0.8)",
            borderRadius: "3px",
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
          className="w-full pointer-events-auto max-h-[82vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gta-yellow/30 transition-transform duration-300 ease-out relative rounded-[3px]"
        >
          {/* ─── SLIDE 1: HERO / GTA V INTERACTION MENU ─── */}
          {slide.id === "hero" && (
            <div className="flex flex-col items-start justify-center w-full">
              {/* Solid Dark Header Bar */}
              <div className="w-full bg-[#0D0E12] px-5 py-3.5 border-b border-white/12 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 bg-[#F5B800] rounded-[1px] animate-pulse" />
                  <h2 className="font-gta text-2xl sm:text-3xl text-white tracking-widest leading-none uppercase">
                    {portfolioConfig.personal.name}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-[#000000] bg-[#85BB65] px-2.5 py-0.5 rounded-[2px] font-bold tracking-wider">
                    {portfolioConfig.hud.cashAmount}
                  </span>
                </div>
              </div>

              {/* Subtitle & R3F Centerpiece Banner */}
              <div className="w-full px-5 py-3.5 bg-black/30 border-b border-white/5 flex items-center justify-between">
                <div>
                  <p className="font-hud text-[10px] text-gta-orange tracking-[0.3em] uppercase">
                    MISSION PASSED +RESPECT
                  </p>
                  <p className="font-oswald text-sm sm:text-base text-gta-cyan tracking-wider font-semibold mt-0.5">
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
                    className="group relative w-full text-left font-oswald text-base sm:text-lg tracking-[0.05em] font-bold px-5 py-3 transition-all duration-150 flex items-center justify-between cursor-pointer border-b border-white/[0.05] bg-[rgba(20,24,30,0.55)] text-white hover:bg-white hover:text-black border-l-0 hover:border-l-[4px] hover:border-l-[#F5B800] rounded-none"
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
              <div className="p-4 bg-[#0D0E12]/80 border-t border-white/10 w-full flex flex-wrap items-center gap-3">
                <a
                  href={portfolioConfig.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-black/60 hover:bg-[#F5B800] hover:text-black text-[#F5B800] border border-[#F5B800]/40 rounded-[2px] font-oswald text-xs tracking-widest flex items-center gap-2 transition-all cursor-pointer shadow-md font-bold"
                >
                  <Github size={15} />
                  <span>GITHUB</span>
                </a>

                <a
                  href={portfolioConfig.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-black/60 hover:bg-gta-cyan hover:text-black text-gta-cyan border border-gta-cyan/40 rounded-[2px] font-oswald text-xs tracking-widest flex items-center gap-2 transition-all cursor-pointer shadow-md font-bold"
                >
                  <Linkedin size={15} />
                  <span>LINKEDIN</span>
                </a>
              </div>
            </div>
          )}

          {/* ─── SLIDE 2: ABOUT ME ─── */}
          {slide.id === "about" && (
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="text-gta-yellow" size={22} />
                <div>
                  <p className="font-hud text-[10px] text-gta-orange tracking-widest">
                    {slide.tagline?.toUpperCase()}
                  </p>
                  <h2 className="font-gta text-2xl sm:text-4xl text-gta-yellow">{slide.title}</h2>
                </div>
              </div>

              <p className="font-body text-gray-200 text-sm sm:text-base leading-relaxed mb-5">
                {slide.content?.bio}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                {slide.content?.stats?.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-black/60 border border-white/15 p-3 rounded-xl flex flex-col justify-between shadow-inner"
                  >
                    <span className="font-hud text-[9px] text-gta-gray tracking-widest">
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
                className="gta-btn px-5 py-2.5 text-xs font-hud tracking-wider flex items-center gap-2 cursor-pointer shadow-xl"
              >
                <span>{slide.content?.actionButton}</span>
                <ChevronRight size={15} />
              </button>
            </div>
          )}

          {/* ─── SLIDE 3: SKILLS ─── */}
          {slide.id === "skills" && (
            <div className="p-6">
              <div className="flex items-center gap-3 mb-5">
                <Cpu className="text-gta-cyan" size={22} />
                <div>
                  <p className="font-hud text-[10px] text-gta-orange tracking-widest">
                    {slide.tagline?.toUpperCase()}
                  </p>
                  <h2 className="font-gta text-2xl sm:text-4xl text-gta-yellow">{slide.title}</h2>
                </div>
              </div>

              <div className="space-y-3.5">
                {slide.skillBars?.map((skill, idx) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-hud text-xs text-white tracking-wider">
                        {skill.name}
                      </span>
                      <span className="font-hud text-xs text-gta-green font-bold">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-black/80 rounded-full overflow-hidden border border-white/10 p-0.5">
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.8, delay: 0.15 + idx * 0.08 }}
                        className="h-full bg-gradient-to-r from-gta-cyan via-gta-green to-gta-yellow rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── SLIDE 4: PROJECTS ─── */}
          {slide.id === "projects" && (
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                <div>
                  <p className="font-hud text-[10px] text-gta-orange tracking-widest">
                    {slide.tagline?.toUpperCase()}
                  </p>
                  <h2 className="font-gta text-2xl sm:text-4xl text-gta-yellow">{slide.title}</h2>
                </div>
                <span className="font-hud text-[10px] text-gta-green border border-gta-green/30 px-3 py-1 rounded-full">
                  {slide.projectsList?.length || 4} HEISTS READY
                </span>
              </div>

              <div className="space-y-3">
                {slide.projectsList?.map((proj) => (
                  <div
                    key={proj.title}
                    className="p-3.5 bg-black/60 border border-white/15 hover:border-gta-yellow rounded-xl flex flex-col justify-between transition-all"
                  >
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-gta text-base text-white">{proj.title}</h3>
                        <span className="font-hud text-[8px] text-gta-pink font-bold">
                          {proj.tag}
                        </span>
                      </div>
                      <p className="font-body text-xs text-gray-300 leading-relaxed my-1.5">
                        {proj.desc}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {proj.tech.map((t) => (
                          <span
                            key={t}
                            className="bg-white/10 text-gta-cyan font-hud text-[8px] px-1.5 py-0.5 rounded"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-1.5 bg-gta-yellow/10 hover:bg-gta-yellow hover:text-black border border-gta-yellow/40 text-gta-yellow text-center font-hud text-[11px] tracking-wider rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer font-bold"
                      >
                        <Github size={13} />
                        <span>INSPECT CODE</span>
                      </a>

                      {(proj as any).liveDemo && (
                        <a
                          href={(proj as any).liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-1.5 bg-gta-cyan/15 hover:bg-gta-cyan hover:text-black border border-gta-cyan/40 text-gta-cyan text-center font-hud text-[11px] tracking-wider rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer font-bold shadow-md hover:shadow-gta-cyan/20"
                        >
                          <ExternalLink size={13} />
                          <span>LIVE DEMO</span>
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
            <div className="p-6">
              <div className="flex items-center gap-3 mb-5">
                <Briefcase className="text-gta-yellow" size={22} />
                <div>
                  <p className="font-hud text-[10px] text-gta-orange tracking-widest">
                    {slide.tagline?.toUpperCase()}
                  </p>
                  <h2 className="font-gta text-2xl sm:text-4xl text-gta-yellow">{slide.title}</h2>
                </div>
              </div>

              <div className="space-y-5 relative border-l-2 border-gta-yellow/30 pl-5 ml-2">
                {slide.timeline?.map((item) => (
                  <div key={item.role} className="relative">
                    <div className="absolute -left-[27px] top-1 w-3.5 h-3.5 rounded-full bg-gta-yellow border-2 border-black" />
                    <span className="font-hud text-[10px] text-gta-cyan tracking-wider font-bold">
                      {item.period}
                    </span>
                    <h3 className="font-gta text-lg text-white mt-0.5">{item.role}</h3>
                    <p className="font-hud text-xs text-gta-gray mb-1.5">{item.org}</p>
                    <p className="font-body text-xs text-gray-300 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── SLIDE 6: ACHIEVEMENTS ─── */}
          {slide.id === "achievements" && (
            <div className="p-6">
              <LeetCodeModal isOpen={isLeetCodeOpen} onClose={() => setIsLeetCodeOpen(false)} />
              <div className="flex items-center gap-3 mb-5">
                <Trophy className="text-gta-yellow" size={22} />
                <div>
                  <p className="font-hud text-[10px] text-gta-orange tracking-widest">
                    {slide.tagline?.toUpperCase()}
                  </p>
                  <h2 className="font-gta text-2xl sm:text-4xl text-gta-yellow">{slide.title}</h2>
                </div>
              </div>

              <div className="space-y-3">
                {slide.trophies?.map((trophy: any) => {
                  const isLeetCode = trophy.category === "LeetCode" || trophy.isLeetCode;
                  return (
                    <div
                      key={trophy.title}
                      onClick={() => {
                        if (isLeetCode) setIsLeetCodeOpen(true);
                      }}
                      className={`bg-black/60 border p-3.5 rounded-xl transition-all ${
                        isLeetCode
                          ? "border-gta-orange/50 hover:border-gta-orange bg-black/80 cursor-pointer shadow-md hover:shadow-gta-orange/20"
                          : "border-white/15 hover:border-gta-yellow"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span
                          className={`font-hud text-[8px] px-2 py-0.5 rounded border font-bold ${
                            isLeetCode
                              ? "bg-gta-orange/20 text-gta-orange border-gta-orange/40"
                              : "bg-gta-yellow/20 text-gta-yellow border-gta-yellow/30"
                          }`}
                        >
                          🏆 {trophy.badge}
                        </span>
                        <span className="font-hud text-[9px] text-gta-gray">{trophy.date}</span>
                      </div>
                      <h4 className="font-hud text-xs sm:text-sm text-white font-bold mb-0.5">
                        {trophy.title}
                      </h4>
                      <p className="font-hud text-[10px] text-gta-cyan mb-1">{trophy.org || trophy.organization}</p>
                      <p className="font-body text-xs text-gray-300 leading-relaxed mb-2">
                        {trophy.details || trophy.desc}
                      </p>

                      {isLeetCode && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsLeetCodeOpen(true);
                          }}
                          className="w-full mt-2 py-1.5 px-3 bg-gta-orange/20 hover:bg-gta-orange hover:text-black border border-gta-orange/40 text-gta-orange font-hud text-[10px] tracking-wider rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer font-bold"
                        >
                          <Flame size={13} className="animate-pulse" />
                          <span>INSPECT LIVE STATS</span>
                          <ExternalLink size={13} />
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
            <div className="p-6 text-center">
              <p className="font-hud text-xs text-gta-orange tracking-[0.3em] mb-1">
                SECURE LINE
              </p>
              <h2 className="font-gta text-3xl sm:text-5xl text-gta-yellow gta-glow mb-3">
                SAFEHOUSE
              </h2>

              <p className="font-body text-gray-300 text-xs sm:text-sm mb-5">
                Open a direct transmission for missions, research lead tracks, or full-stack AI/Data engineering projects.
              </p>

              <div className="space-y-2.5 mb-5 text-left">
                <button
                  onClick={() => handleCopyEmail(slide.contactInfo?.email || "varunsai.b77@gmail.com")}
                  className="w-full p-3 bg-black/60 border border-white/15 hover:border-gta-cyan rounded-xl flex items-center justify-between gap-3 transition-all cursor-pointer group text-left"
                >
                  <div className="flex items-center gap-3">
                    <Mail className="text-gta-cyan group-hover:scale-110 transition-transform" size={16} />
                    <div>
                      <p className="font-hud text-[8px] text-gta-gray">EMAIL TRANSMISSION (CLICK TO COPY)</p>
                      <p className="font-hud text-xs sm:text-sm text-white">
                        {slide.contactInfo?.email}
                      </p>
                    </div>
                  </div>
                  {copiedEmail ? (
                    <span className="font-hud text-[10px] text-gta-green font-bold bg-gta-green/20 border border-gta-green/40 px-2 py-0.5 rounded animate-bounce">
                      COPIED!
                    </span>
                  ) : (
                    <span className="font-hud text-[9px] text-gta-gray group-hover:text-gta-cyan transition-colors">
                      [COPY]
                    </span>
                  )}
                </button>


                <a
                  href={`tel:${slide.contactInfo?.phone}`}
                  className="p-3 bg-black/60 border border-white/15 hover:border-gta-green rounded-xl flex items-center gap-3 transition-all cursor-pointer block"
                >
                  <Phone className="text-gta-green" size={16} />
                  <div>
                    <p className="font-hud text-[8px] text-gta-gray">PHONE / WHATSAPP</p>
                    <p className="font-hud text-xs sm:text-sm text-white">
                      {slide.contactInfo?.phone}
                    </p>
                  </div>
                </a>

                <a
                  href={slide.contactInfo?.resumeUrl || "/api/assets/B_Varun_Sai_Resume.pdf"}
                  download="B_Varun_Sai_Resume.pdf"
                  className="p-3 bg-black/60 border border-gta-yellow/40 hover:border-gta-yellow hover:bg-gta-yellow/15 rounded-xl flex items-center gap-3 transition-all cursor-pointer block group shadow-lg"
                >
                  <FileText className="text-gta-yellow group-hover:scale-110 transition-transform shrink-0" size={18} />
                  <div className="flex-1 flex items-center justify-between min-w-0">
                    <div>
                      <p className="font-hud text-[8px] text-gta-orange tracking-widest">DOSSIER / RESUME</p>
                      <p className="font-hud text-xs sm:text-sm text-gta-yellow font-bold truncate">
                        DOWNLOAD INTEL RESUME (PDF)
                      </p>
                    </div>
                    <Download size={15} className="text-gta-yellow group-hover:translate-y-0.5 transition-transform shrink-0 ml-2" />
                  </div>
                </a>

                <div className="p-3 bg-black/60 border border-white/15 rounded-xl flex items-center gap-3">
                  <MapPin className="text-gta-red shrink-0" size={16} />
                  <div>
                    <p className="font-hud text-[8px] text-gta-gray">BASE LOCATION</p>
                    <p className="font-hud text-xs sm:text-sm text-white">
                      {slide.contactInfo?.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct Links */}
              <div className="flex flex-wrap justify-center gap-2.5">
                <a
                  href={slide.contactInfo?.resumeUrl || "/api/assets/B_Varun_Sai_Resume.pdf"}
                  download="B_Varun_Sai_Resume.pdf"
                  className="px-4 py-2 bg-gta-yellow/20 hover:bg-gta-yellow hover:text-black text-gta-yellow border border-gta-yellow/50 rounded-xl font-hud text-xs tracking-widest flex items-center gap-2 transition-all cursor-pointer shadow-lg font-bold"
                >
                  <Download size={15} />
                  <span>DOWNLOAD RESUME</span>
                </a>

                <a
                  href={slide.contactInfo?.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gta-btn px-4 py-2 text-xs font-hud tracking-widest flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <Github size={15} />
                  <span>GITHUB REPO</span>
                </a>

                <a
                  href={slide.contactInfo?.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-black/60 hover:bg-gta-cyan hover:text-black text-gta-cyan border border-gta-cyan/40 rounded-xl font-hud text-xs tracking-widest flex items-center gap-2 transition-all cursor-pointer shadow-lg"
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
