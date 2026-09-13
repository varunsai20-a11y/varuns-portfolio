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
  ChevronRight,
  FileText,
  Download,
  Flame,
  ExternalLink,
  MessageSquare,
} from "lucide-react";
import LeetCodeModal from "@/components/modals/LeetCodeModal";
import TechIcon from "@/components/ui/TechIcon";

const R3FCenterpiece = dynamic(() => import("@/components/three/R3FCenterpiece"), {
  ssr: false,
});

interface SlideContentManagerProps {
  currentSlideIndex: number;
  onNavigateSlide: (index: number) => void;
  onMenuHoverChange?: (hovered: boolean) => void;
}

// Cinematic slide entrance — content rises in from bottom-left
const sceneVariants = {
  initial: { opacity: 0, y: 18, filter: "blur(4px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -12,
    filter: "blur(3px)",
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

// ─── Skill level label ──────────────────────────────────────────────────
function skillLabel(level: number) {
  if (level >= 93) return "EXPERT";
  if (level >= 87) return "ADVANCED";
  if (level >= 80) return "PROFICIENT";
  return "SKILLED";
}

export default function SlideContentManager({
  currentSlideIndex,
  onNavigateSlide,
  onMenuHoverChange,
}: SlideContentManagerProps) {
  const [isLeetCodeOpen, setIsLeetCodeOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const slide = portfolioConfig.slides[currentSlideIndex];

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    // Outer fixed strip — no card, no border, just a positioned container
    <div className="fixed left-0 top-0 bottom-0 z-10 w-[92vw] sm:w-[52vw] max-w-[660px] flex items-center pointer-events-none select-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          variants={sceneVariants}
          initial="initial"
          animate="animate"
          exit="exit"
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
          className="pointer-events-auto w-full max-h-[100vh] overflow-y-auto gta-scrollbar pt-24 pb-20 pl-5 sm:pl-10 lg:pl-14 pr-4 sm:pr-8"
        >

          {/* ─── SLIDE 1: HERO / GTA PAUSE MENU ─── */}
          {slide.id === "hero" && (
            <div className="flex flex-col min-h-[calc(100vh-160px)] justify-center">

              {/* Character name + status line */}
              <div className="mb-1">
                <p className="font-hud text-[10px] text-gta-orange tracking-[0.35em] uppercase font-bold mb-2 gta-scene-text flex items-center gap-2">
                  <span className="inline-block w-4 h-px bg-gta-orange" />
                  MISSION PASSED +RESPECT
                </p>
                <h1
                  className="font-gta text-gta-yellow leading-none tracking-wide"
                  style={{
                    fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
                    textShadow:
                      "0 0 40px rgba(245,197,24,0.35), 2px 4px 0 rgba(0,0,0,0.9), 0 2px 30px rgba(0,0,0,0.8)",
                  }}
                >
                  {portfolioConfig.personal.name}
                </h1>
                <p
                  className="font-oswald mt-1 text-white/80 tracking-widest font-semibold"
                  style={{ fontSize: "clamp(0.85rem, 1.8vw, 1.1rem)" }}
                >
                  {portfolioConfig.personal.title}
                </p>
              </div>

              {/* 3D Centerpiece – floating beside name */}
              <div className="hidden sm:block mt-2 mb-4">
                <R3FCenterpiece />
              </div>

              {/* ── GTA Pause Menu Items ── */}
              <nav className="flex flex-col mt-2" aria-label="GTA portfolio navigation">
                {slide.menuOptions?.map((item) => {
                  const isHovered = hoveredMenu === item;
                  return (
                    <button
                      key={item}
                      onClick={() => onNavigateSlide(menuTargetIndex[item] ?? 1)}
                      onMouseEnter={() => { setHoveredMenu(item); onMenuHoverChange?.(true); }}
                      onMouseLeave={() => { setHoveredMenu(null); onMenuHoverChange?.(false); }}
                      className="group relative w-full text-left transition-all duration-150 cursor-pointer flex items-center gap-3 py-3 border-b border-white/8"
                      style={{
                        paddingLeft: isHovered ? "12px" : "0px",
                        borderLeft: isHovered ? "3px solid #F5C518" : "3px solid transparent",
                        transition: "padding-left 0.12s ease, border-left-color 0.12s ease",
                      }}
                    >
                      <ChevronRight
                        size={16}
                        className="text-gta-yellow shrink-0 transition-opacity duration-100"
                        style={{ opacity: isHovered ? 1 : 0 }}
                      />
                      <span
                        className="font-oswald tracking-[0.12em] font-bold uppercase transition-colors duration-100"
                        style={{
                          fontSize: "clamp(1rem, 2.2vw, 1.35rem)",
                          color: isHovered ? "#F5C518" : "rgba(255,255,255,0.92)",
                          textShadow: "1px 2px 8px rgba(0,0,0,0.95)",
                        }}
                      >
                        {item}
                      </span>
                    </button>
                  );
                })}
              </nav>

              {/* Social action links */}
              <div className="flex items-center gap-4 mt-6">
                <a
                  href={portfolioConfig.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gta-yellow hover:text-white transition-colors duration-150 group"
                >
                  <Github size={16} />
                  <span className="font-hud text-[11px] tracking-widest font-bold group-hover:underline">
                    GITHUB
                  </span>
                </a>
                <span className="w-px h-3 bg-white/20" />
                <a
                  href={portfolioConfig.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gta-cyan hover:text-white transition-colors duration-150 group"
                >
                  <Linkedin size={16} />
                  <span className="font-hud text-[11px] tracking-widest font-bold group-hover:underline">
                    LINKEDIN
                  </span>
                </a>
                <span className="w-px h-3 bg-white/20" />
                <a
                  href={portfolioConfig.personal.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-150 group"
                >
                  <FileText size={15} />
                  <span className="font-hud text-[11px] tracking-widest font-bold group-hover:underline">
                    RESUME
                  </span>
                </a>
              </div>
            </div>
          )}

          {/* ─── SLIDE 2: ABOUT ME ─── */}
          {slide.id === "about" && (
            <div className="flex flex-col">
              {/* Section title — large, cinematic */}
              <SceneTitle
                tagline={slide.tagline}
                title={slide.title}
              />

              {/* Bio — no card, just text over scene */}
              <p
                className="mt-5 font-body text-white/90 leading-relaxed max-w-md"
                style={{
                  fontSize: "clamp(0.88rem, 1.6vw, 1rem)",
                  textShadow: "0 1px 12px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.8)",
                }}
              >
                {slide.content?.bio}
              </p>

              {/* Stats — compact HUD chips, no grid card */}
              <div className="mt-6 flex flex-col gap-2">
                {slide.content?.stats?.map((stat) => (
                  <div key={stat.label} className="flex items-baseline gap-3">
                    <span className="font-hud text-[9px] text-gta-orange tracking-[0.25em] font-bold uppercase shrink-0 w-20">
                      {stat.label}
                    </span>
                    <span
                      className="font-hud text-xs text-white/90 font-bold"
                      style={{ textShadow: "0 1px 8px rgba(0,0,0,0.9)" }}
                    >
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action — text-style link */}
              <button
                onClick={() => onNavigateSlide(3)}
                className="mt-8 self-start flex items-center gap-2 text-gta-yellow hover:text-white transition-colors group cursor-pointer"
              >
                <ChevronRight size={18} className="text-gta-yellow group-hover:translate-x-1 transition-transform" />
                <span className="font-oswald text-sm tracking-widest font-bold uppercase">
                  {slide.content?.actionButton}
                </span>
              </button>
            </div>
          )}

          {/* ─── SLIDE 3: SKILLS ─── */}
          {slide.id === "skills" && (
            <div className="flex flex-col">
              <SceneTitle tagline={slide.tagline} title={slide.title} />

              <div className="mt-6 flex flex-col gap-5 max-w-sm">
                {slide.skillBars?.map((skill, idx) => (
                  <div key={skill.name} className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                      <span
                        className="font-hud text-[11px] text-white font-bold tracking-wider"
                        style={{ textShadow: "0 1px 8px rgba(0,0,0,0.95)" }}
                      >
                        {skill.name}
                      </span>
                      <span className="font-hud text-[10px] text-gta-orange font-bold tracking-wider">
                        {skillLabel(skill.level)}
                      </span>
                    </div>
                    {/* GTA-style bar: razor thin, no rounded container */}
                    <div className="w-full h-[5px] bg-white/10">
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.9, delay: 0.08 + idx * 0.07, ease: "easeOut" }}
                        className="h-full"
                        style={{
                          background: "linear-gradient(to right, #F5C518, #00D4FF)",
                          boxShadow: "0 0 8px rgba(245,197,24,0.6)",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── SLIDE 4: PROJECTS ─── */}
          {slide.id === "projects" && (
            <div className="flex flex-col">
              <SceneTitle
                tagline={slide.tagline}
                title={slide.title}
                trailing={
                  <span className="font-hud text-[10px] text-gta-green font-bold tracking-wider">
                    {slide.projectsList?.length || 4} HEISTS EXECUTED
                  </span>
                }
              />

              {/* Mission briefs — no cards, just structured rows */}
              <div className="mt-5 flex flex-col">
                {slide.projectsList?.map((proj, pIdx) => (
                  <div
                    key={proj.title}
                    className="py-5 border-b border-white/8 first:border-t first:border-white/8 group"
                  >
                    {/* Row 1: Index + Title + Tag */}
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-baseline gap-2.5">
                        <span
                          className="font-mono text-gta-yellow font-bold shrink-0"
                          style={{ fontSize: "11px" }}
                        >
                          0{pIdx + 1}
                        </span>
                        <h3
                          className="font-gta text-white group-hover:text-gta-yellow transition-colors"
                          style={{
                            fontSize: "clamp(1rem, 2.2vw, 1.4rem)",
                            textShadow: "1px 2px 12px rgba(0,0,0,0.95)",
                            lineHeight: 1.1,
                          }}
                        >
                          {proj.title}
                        </h3>
                      </div>
                      <span className="font-hud text-[9px] text-gta-pink font-bold tracking-wider shrink-0 mt-1 border border-gta-pink/40 px-1.5 py-0.5">
                        {proj.tag}
                      </span>
                    </div>

                    {/* Row 2: Description */}
                    <p
                      className="font-body text-white/75 leading-relaxed mb-3"
                      style={{
                        fontSize: "clamp(0.78rem, 1.4vw, 0.88rem)",
                        textShadow: "0 1px 8px rgba(0,0,0,0.9)",
                      }}
                    >
                      {proj.desc}
                    </p>

                    {/* Row 3: Tech stack */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {proj.tech.map((t) => (
                        <span
                          key={t}
                          className="inline-flex items-center gap-1 font-hud text-[9px] text-gta-cyan font-bold tracking-wider"
                          style={{ textShadow: "0 0 8px rgba(0,212,255,0.4)" }}
                        >
                          <TechIcon name={t} size={10} />
                          <span>[{t}]</span>
                        </span>
                      ))}
                    </div>

                    {/* Row 4: Actions — text links redirected to Safehouse / WhatsApp Appointment */}
                    <div className="flex items-center gap-5 flex-wrap">
                      <a
                        href={`https://wa.me/8660224417?text=Hi%20Varun,%20I'd%20like%20to%20request%20code%20access%20/%20schedule%20appointment%20for%20project:%20${encodeURIComponent(proj.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-gta-yellow hover:text-white transition-colors"
                      >
                        <MessageSquare size={13} />
                        <span className="font-hud text-[10px] tracking-widest font-bold">
                          ► REQUEST CODE (WHATSAPP / SAFEHOUSE)
                        </span>
                      </a>
                      <a
                        href={`https://wa.me/8660224417?text=Hi%20Varun,%20I'd%20like%20to%20schedule%20a%20live%20demo%20appointment%20for:%20${encodeURIComponent(proj.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-gta-cyan hover:text-white transition-colors"
                      >
                        <ExternalLink size={13} />
                        <span className="font-hud text-[10px] tracking-widest font-bold">
                          ► SCHEDULE LIVE DEMO
                        </span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── SLIDE 5: EXPERIENCE ─── */}
          {slide.id === "experience" && (
            <div className="flex flex-col">
              <SceneTitle tagline={slide.tagline} title={slide.title} />

              {/* Timeline — left border, no card backgrounds */}
              <div className="mt-7 relative ml-3">
                <div
                  className="absolute left-0 top-0 bottom-0 w-[2px]"
                  style={{ background: "linear-gradient(to bottom, #F5C518, rgba(245,197,24,0.15))" }}
                />

                <div className="pl-6 flex flex-col gap-8">
                  {slide.timeline?.map((item, i) => (
                    <div key={item.role} className="relative">
                      {/* Timeline node */}
                      <div
                        className="absolute -left-[26px] top-1 w-3 h-3 rounded-full bg-gta-yellow border border-black"
                        style={{ boxShadow: "0 0 10px rgba(245,197,24,0.8)" }}
                      />

                      <p
                        className="font-hud text-[10px] text-gta-cyan tracking-widest font-bold mb-1"
                        style={{ textShadow: "0 0 8px rgba(0,212,255,0.4)" }}
                      >
                        {item.period}
                      </p>
                      <h3
                        className="font-gta text-white mb-0.5"
                        style={{
                          fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)",
                          textShadow: "1px 2px 12px rgba(0,0,0,0.95)",
                        }}
                      >
                        {item.role}
                      </h3>
                      <p className="font-hud text-[10px] text-white/50 font-bold tracking-wider mb-2">
                        {item.org}
                      </p>
                      <p
                        className="font-body text-white/75 leading-relaxed"
                        style={{
                          fontSize: "clamp(0.78rem, 1.4vw, 0.9rem)",
                          textShadow: "0 1px 8px rgba(0,0,0,0.9)",
                        }}
                      >
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ─── SLIDE 6: ACHIEVEMENTS ─── */}
          {slide.id === "achievements" && (
            <div className="flex flex-col">
              <LeetCodeModal isOpen={isLeetCodeOpen} onClose={() => setIsLeetCodeOpen(false)} />
              <SceneTitle tagline={slide.tagline} title={slide.title} />

              <div className="mt-5 flex flex-col">
                {slide.trophies?.map((trophy: any) => {
                  const isLeetCode = trophy.category === "LeetCode" || trophy.isLeetCode;
                  return (
                    <div
                      key={trophy.title}
                      onClick={() => { if (isLeetCode) setIsLeetCodeOpen(true); }}
                      className={`py-4 border-b border-white/8 first:border-t first:border-white/8 ${isLeetCode ? "cursor-pointer" : ""} group`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-1.5">
                        <span
                          className="font-hud text-[9px] font-bold tracking-wider border px-1.5 py-0.5 shrink-0"
                          style={{
                            color: isLeetCode ? "#FF6B00" : "#F5C518",
                            borderColor: isLeetCode ? "rgba(255,107,0,0.5)" : "rgba(245,197,24,0.4)",
                          }}
                        >
                          [{trophy.badge}]
                        </span>
                        <span className="font-hud text-[9px] text-white/40 font-bold shrink-0">
                          {trophy.date}
                        </span>
                      </div>

                      <h4
                        className="font-hud text-sm font-bold mb-0.5 group-hover:text-gta-yellow transition-colors"
                        style={{
                          color: isLeetCode ? "#FF6B00" : "rgba(255,255,255,0.95)",
                          textShadow: "0 1px 8px rgba(0,0,0,0.9)",
                        }}
                      >
                        {trophy.title}
                      </h4>
                      <p className="font-hud text-[10px] text-gta-cyan font-semibold mb-1">
                        {trophy.org || trophy.organization}
                      </p>
                      <p
                        className="font-body text-white/65 leading-relaxed"
                        style={{
                          fontSize: "clamp(0.75rem, 1.3vw, 0.83rem)",
                          textShadow: "0 1px 6px rgba(0,0,0,0.9)",
                        }}
                      >
                        {trophy.details || trophy.desc}
                      </p>

                      {isLeetCode && (
                        <button
                          onClick={(e) => { e.stopPropagation(); setIsLeetCodeOpen(true); }}
                          className="mt-2 flex items-center gap-1.5 text-gta-orange hover:text-white transition-colors cursor-pointer"
                        >
                          <Flame size={12} className="animate-pulse" />
                          <span className="font-hud text-[10px] tracking-widest font-bold">
                            ► INSPECT LIVE LEETCODE STATS
                          </span>
                          <ExternalLink size={11} />
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
            <div className="flex flex-col">
              <div className="mb-2">
                <p className="font-hud text-[10px] text-gta-orange tracking-[0.3em] font-bold mb-1 flex items-center gap-2">
                  <span className="inline-block w-4 h-px bg-gta-orange" />
                  SECURE LINE
                </p>
                <h2
                  className="font-gta text-gta-yellow leading-none"
                  style={{
                    fontSize: "clamp(2.4rem, 5.5vw, 4rem)",
                    textShadow: "0 0 40px rgba(245,197,24,0.35), 2px 4px 0 rgba(0,0,0,0.9)",
                  }}
                >
                  SAFEHOUSE<br />TRANSMISSION
                </h2>
              </div>

              <p
                className="mt-4 font-body text-white/70 max-w-xs leading-relaxed"
                style={{
                  fontSize: "clamp(0.82rem, 1.5vw, 0.95rem)",
                  textShadow: "0 1px 10px rgba(0,0,0,0.9)",
                }}
              >
                Open a direct transmission for engineering roles, research tracks, or full-stack software development projects.
              </p>

              {/* Contact rows — no card wrapper */}
              <div className="mt-6 flex flex-col gap-4">
                {/* Email */}
                <button
                  onClick={() => handleCopyEmail(slide.contactInfo?.email || "varunsai.1028@gmail.com")}
                  className="flex items-center gap-3 group cursor-pointer w-fit"
                >
                  <Mail className="text-gta-cyan shrink-0" size={16} />
                  <div className="text-left">
                    <p className="font-hud text-[8px] text-white/40 font-bold tracking-wider">
                      EMAIL — CLICK TO COPY
                    </p>
                    <p
                      className="font-hud text-sm text-white group-hover:text-gta-cyan transition-colors font-bold"
                      style={{ textShadow: "0 1px 8px rgba(0,0,0,0.9)" }}
                    >
                      {slide.contactInfo?.email}
                    </p>
                  </div>
                  {copiedEmail && (
                    <span className="font-hud text-[9px] text-gta-green font-bold animate-bounce">
                      COPIED!
                    </span>
                  )}
                </button>

                {/* Phone */}
                <a
                  href={`tel:${slide.contactInfo?.phone}`}
                  className="flex items-center gap-3 group w-fit"
                >
                  <Phone className="text-gta-green shrink-0" size={16} />
                  <div>
                    <p className="font-hud text-[8px] text-white/40 font-bold tracking-wider">
                      DIRECT PHONE
                    </p>
                    <p
                      className="font-hud text-sm text-white group-hover:text-gta-green transition-colors font-bold"
                      style={{ textShadow: "0 1px 8px rgba(0,0,0,0.9)" }}
                    >
                      {slide.contactInfo?.phone}
                    </p>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-3">
                  <MapPin className="text-gta-red shrink-0" size={16} />
                  <div>
                    <p className="font-hud text-[8px] text-white/40 font-bold tracking-wider">
                      BASE LOCATION
                    </p>
                    <p
                      className="font-hud text-sm text-white font-bold"
                      style={{ textShadow: "0 1px 8px rgba(0,0,0,0.9)" }}
                    >
                      {slide.contactInfo?.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action links */}
              <div className="mt-7 flex flex-wrap gap-5">
                <a
                  href={slide.contactInfo?.resumeUrl || "/api/assets/B_Varun_Sai_Resume.pdf"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gta-yellow hover:text-white transition-colors"
                >
                  <Download size={14} />
                  <span className="font-hud text-[11px] tracking-widest font-bold">
                    ► DOWNLOAD RESUME
                  </span>
                </a>
                <a
                  href={slide.contactInfo?.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                >
                  <Github size={14} />
                  <span className="font-hud text-[11px] tracking-widest font-bold">
                    ► GITHUB
                  </span>
                </a>
                <a
                  href={slide.contactInfo?.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gta-cyan hover:text-white transition-colors"
                >
                  <Linkedin size={14} />
                  <span className="font-hud text-[11px] tracking-widest font-bold">
                    ► LINKEDIN
                  </span>
                </a>
              </div>
            </div>
          )}

        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── Scene Title — reusable cinematic section header ────────────────────
function SceneTitle({
  tagline,
  title,
  trailing,
}: {
  tagline?: string;
  title: string;
  trailing?: React.ReactNode;
}) {
  return (
    <div>
      {tagline && (
        <p className="font-hud text-[10px] text-gta-orange tracking-[0.35em] uppercase font-bold mb-2 flex items-center gap-2">
          <span className="inline-block w-4 h-px bg-gta-orange" />
          {tagline.toUpperCase()}
        </p>
      )}
      <div className="flex items-end gap-4 flex-wrap">
        <h2
          className="font-gta text-gta-yellow leading-none"
          style={{
            fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
            textShadow:
              "0 0 40px rgba(245,197,24,0.30), 2px 4px 0 rgba(0,0,0,0.95), 0 2px 30px rgba(0,0,0,0.8)",
          }}
        >
          {title}
        </h2>
        {trailing && <div className="mb-1">{trailing}</div>}
      </div>
    </div>
  );
}
