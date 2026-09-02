"use client";

import { motion, AnimatePresence } from "framer-motion";
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
} from "lucide-react";

interface SlideContentManagerProps {
  currentSlideIndex: number;
  onNavigateSlide: (index: number) => void;
  onMenuHoverChange?: (hovered: boolean) => void;
}

const slideVariants = {
  initial: { opacity: 0, x: 30 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    x: -30,
    transition: { duration: 0.25, ease: "easeIn" },
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
  const slide = portfolioConfig.slides[currentSlideIndex];

  return (
    <div className="fixed left-4 sm:left-12 lg:left-20 top-24 bottom-24 z-10 w-[92vw] sm:w-[45vw] max-w-[650px] flex items-center justify-start overflow-hidden pointer-events-none select-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full pointer-events-auto max-h-[80vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gta-yellow/30"
          style={{
            background: "rgba(13, 15, 20, 0.88)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 180, 0, 0.2)",
            borderLeft: "4px solid rgba(255, 180, 0, 0.9)",
            borderRadius: "16px",
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.6)",
            padding: "1.75rem",
          }}
        >
          {/* ─── SLIDE 1: HERO / START GAME MENU ─── */}
          {slide.id === "hero" && (
            <div className="flex flex-col items-start justify-center">
              <p className="font-hud text-xs text-gta-orange tracking-[0.3em] mb-1">
                MISSION PASSED +RESPECT
              </p>
              <h2 className="font-gta text-3xl sm:text-5xl text-gta-yellow gta-glow leading-none mb-2">
                {portfolioConfig.personal.name}
              </h2>
              <p className="font-hud text-gta-cyan text-xs sm:text-sm tracking-[0.2em] mb-5">
                {portfolioConfig.personal.title}
              </p>

              {/* Vertical Menu Tabs */}
              <div className="w-full space-y-2 border-t border-gta-yellow/20 pt-3">
                {slide.menuOptions?.map((item) => (
                  <button
                    key={item}
                    onClick={() => onNavigateSlide(menuTargetIndex[item] ?? 1)}
                    onMouseEnter={() => onMenuHoverChange?.(true)}
                    onMouseLeave={() => onMenuHoverChange?.(false)}
                    className="relative w-full text-left font-hud text-sm sm:text-lg text-white hover:text-gta-yellow px-4 py-2.5 rounded-xl transition-all duration-300 flex items-center justify-between group cursor-pointer overflow-hidden bg-black/40 hover:bg-gta-yellow/15 border border-transparent hover:border-gta-yellow/40"
                  >
                    <span className="absolute left-0 top-0 bottom-0 w-1 bg-gta-yellow opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <span className="tracking-wider flex items-center gap-2.5 relative z-10">
                      <ChevronRight
                        size={16}
                        className="text-gta-pink opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                      />
                      {item}
                    </span>
                    <span className="text-[10px] text-gta-gray font-mono group-hover:text-gta-yellow relative z-10">
                      [SELECT]
                    </span>
                  </button>
                ))}
              </div>

              {/* Social Quick Action Buttons */}
              <div className="mt-5 pt-3 border-t border-white/10 w-full flex flex-wrap items-center gap-3">
                <a
                  href={portfolioConfig.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-black/60 hover:bg-gta-yellow hover:text-black text-gta-yellow border border-gta-yellow/40 rounded-xl font-hud text-xs tracking-widest flex items-center gap-2 transition-all cursor-pointer shadow-lg"
                >
                  <Github size={15} />
                  <span>GITHUB</span>
                </a>

                <a
                  href={portfolioConfig.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-black/60 hover:bg-gta-cyan hover:text-black text-gta-cyan border border-gta-cyan/40 rounded-xl font-hud text-xs tracking-widest flex items-center gap-2 transition-all cursor-pointer shadow-lg"
                >
                  <Linkedin size={15} />
                  <span>LINKEDIN</span>
                </a>
              </div>
            </div>
          )}

          {/* ─── SLIDE 2: ABOUT ME ─── */}
          {slide.id === "about" && (
            <div>
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
                    className="bg-black/60 border border-white/15 p-3 rounded-xl flex flex-col justify-between"
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
            <div>
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
            <div className="space-y-4">
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

                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-1.5 bg-gta-yellow/10 hover:bg-gta-yellow hover:text-black border border-gta-yellow/40 text-gta-yellow text-center font-hud text-xs tracking-wider rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Github size={13} />
                      <span>INSPECT CODE</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── SLIDE 5: EXPERIENCE ─── */}
          {slide.id === "experience" && (
            <div>
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
            <div>
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
                {slide.trophies?.map((trophy) => (
                  <div
                    key={trophy.title}
                    className="bg-black/60 border border-white/15 hover:border-gta-yellow p-3.5 rounded-xl transition-all"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="bg-gta-yellow/20 text-gta-yellow font-hud text-[8px] px-2 py-0.5 rounded border border-gta-yellow/30 font-bold">
                        🏆 {trophy.badge}
                      </span>
                      <span className="font-hud text-[9px] text-gta-gray">{trophy.date}</span>
                    </div>
                    <h4 className="font-hud text-xs sm:text-sm text-white font-bold mb-0.5">
                      {trophy.title}
                    </h4>
                    <p className="font-hud text-[10px] text-gta-cyan mb-1">{trophy.org}</p>
                    <p className="font-body text-xs text-gray-300 leading-relaxed">
                      {trophy.details || trophy.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── SLIDE 7: CONTACT ─── */}
          {slide.id === "contact" && (
            <div className="text-center">
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
                <a
                  href={`mailto:${slide.contactInfo?.email}`}
                  className="p-3 bg-black/60 border border-white/15 hover:border-gta-cyan rounded-xl flex items-center gap-3 transition-all cursor-pointer block"
                >
                  <Mail className="text-gta-cyan" size={16} />
                  <div>
                    <p className="font-hud text-[8px] text-gta-gray">EMAIL TRANSMISSION</p>
                    <p className="font-hud text-xs sm:text-sm text-white">
                      {slide.contactInfo?.email}
                    </p>
                  </div>
                </a>

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
