"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Sun,
  Moon,
  Github,
  Linkedin,
  FileText,
  Mail,
  ExternalLink,
  Gamepad2,
  MapPin,
  Briefcase,
  Award,
  Code2,
  Sparkles,
  Phone,
  Terminal,
  Layers,
  Zap,
} from "lucide-react";
import TechIcon from "@/components/ui/TechIcon";
import { portfolioConfig } from "@/config/portfolioConfig";

interface RecruiterViewProps {
  onSwitchToGTA: () => void;
}

export default function RecruiterView({ onSwitchToGTA }: RecruiterViewProps) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  const { personal, missions, experienceTimeline, achievements, certifications, skillsWheel } =
    portfolioConfig;

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("recruiter-theme-preference") as "light" | "dark" | null;
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("recruiter-theme-preference", nextTheme);
  };

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-300 select-text relative overflow-hidden ${
        isDark ? "bg-[#030712] text-slate-100" : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* ─── Ambient Atmospheric Background Gradients & Grid Matrix ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Subtle Cyber Grid Line Layer */}
        <div
          className={`absolute inset-0 opacity-[0.15] ${
            isDark
              ? "bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)]"
              : "bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)]"
          } bg-[size:4rem_4rem]`}
        />

        {/* Ambient Radial Glow Lighting Spheres */}
        {isDark && (
          <>
            <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute top-[35%] -right-40 w-[650px] h-[650px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />
            <div className="absolute bottom-10 left-[20%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
          </>
        )}
      </div>

      {/* ─── Futuristic Translucent Glass Navigation ─── */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-colors duration-300 ${
          isDark
            ? "bg-[#030712]/80 border-slate-800/80 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-white/85 border-slate-200/80 shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a
              href="#hero"
              className="font-extrabold text-lg tracking-tight hover:opacity-80 transition-opacity flex items-center gap-2"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#22d3ee]" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 font-mono font-bold tracking-wider">
                {personal.name.toUpperCase()}
              </span>
            </a>
            <span
              className={`hidden sm:inline-flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-widest px-2.5 py-0.5 rounded-full font-semibold border ${
                isDark
                  ? "bg-cyan-950/60 text-cyan-400 border-cyan-800/50 shadow-[0_0_12px_rgba(6,182,212,0.2)]"
                  : "bg-blue-50 text-blue-700 border-blue-200"
              }`}
            >
              <Terminal size={11} className="text-cyan-400" />
              <span>Recruiter View</span>
            </span>
          </div>

          <nav className="flex items-center gap-3 sm:gap-6" aria-label="Portfolio Section Navigation">
            <div className="hidden md:flex items-center gap-7 text-xs font-mono tracking-wider font-medium">
              <a
                href="#skills"
                className={`hover:text-cyan-400 transition-colors flex items-center gap-1 ${
                  isDark ? "text-slate-300" : "text-slate-600"
                }`}
              >
                <span className="text-cyan-500 font-bold">01 //</span> SKILLS
              </a>
              <a
                href="#projects"
                className={`hover:text-cyan-400 transition-colors flex items-center gap-1 ${
                  isDark ? "text-slate-300" : "text-slate-600"
                }`}
              >
                <span className="text-cyan-500 font-bold">02 //</span> PROJECTS
              </a>
              <a
                href="#experience"
                className={`hover:text-cyan-400 transition-colors flex items-center gap-1 ${
                  isDark ? "text-slate-300" : "text-slate-600"
                }`}
              >
                <span className="text-cyan-500 font-bold">03 //</span> EXPERIENCE
              </a>
              <a
                href="#contact"
                className={`hover:text-cyan-400 transition-colors flex items-center gap-1 ${
                  isDark ? "text-slate-300" : "text-slate-600"
                }`}
              >
                <span className="text-cyan-500 font-bold">04 //</span> CONTACT
              </a>
            </div>

            {/* Sun / Moon Theme Switcher */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
              className={`p-2 rounded-lg transition-all duration-200 border ${
                isDark
                  ? "bg-slate-900/80 border-slate-800 text-amber-400 hover:bg-slate-800 hover:border-amber-500/40"
                  : "bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {/* Mode Launcher Trigger to GTA Interactive Mode */}
            <button
              onClick={onSwitchToGTA}
              className={`flex items-center gap-2 text-xs font-mono font-bold tracking-wider px-3.5 py-1.5 rounded-lg border transition-all duration-300 shadow-md ${
                isDark
                  ? "bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-amber-500/20 border-amber-500/50 text-amber-300 hover:border-amber-400 hover:shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:scale-105"
                  : "bg-slate-900 border-slate-900 text-white hover:bg-slate-800"
              }`}
            >
              <Gamepad2 size={16} className="text-amber-400 animate-pulse" />
              <span>GTA MODE</span>
            </button>
          </nav>
        </div>
      </header>

      {/* ─── Main Editorial Container ─── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-24 relative z-10">
        {/* ─── Hero Section ─── */}
        <motion.section
          id="hero"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8 pt-4 relative"
        >
          {/* Micro Header Metadata */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`text-[11px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${
                  isDark
                    ? "bg-cyan-950/60 text-cyan-400 border-cyan-800/50 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                    : "bg-blue-100 text-blue-800 border-blue-200"
                }`}
              >
                SYS // {personal.status}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-mono text-slate-400 border border-slate-800 px-3 py-1 rounded-full bg-slate-900/40">
                <MapPin size={13} className="text-cyan-400" />
                <span>{personal.location}</span>
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight uppercase leading-[1.05]">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
                {personal.name}
              </span>
            </h1>

            <p className="text-xl sm:text-2xl lg:text-3xl font-semibold font-mono text-cyan-400 tracking-wide flex items-center gap-2">
              <Zap size={22} className="text-cyan-400" />
              <span>{personal.title}</span>
            </p>
          </div>

          {/* Bio Copy (Immutable directly from portfolioConfig.personal.bio) */}
          <p
            className={`max-w-4xl text-base sm:text-lg lg:text-xl leading-relaxed font-sans ${
              isDark ? "text-slate-300" : "text-slate-700"
            }`}
          >
            {personal.bio}
          </p>

          {/* Hero Action Triggers (Resume PDF, GitHub, LinkedIn, Email) */}
          <div className="flex flex-wrap items-center gap-3.5 pt-3">
            <a
              href={personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-xl font-mono text-xs font-bold tracking-wider bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 transition-all duration-300 shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:scale-105 cursor-pointer"
            >
              <FileText size={16} />
              <span>DOWNLOAD RESUME (PDF)</span>
            </a>

            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-mono text-xs font-bold tracking-wider border transition-all duration-300 cursor-pointer ${
                isDark
                  ? "bg-slate-900/80 border-slate-800 text-slate-200 hover:bg-slate-800 hover:border-slate-700 hover:text-white"
                  : "bg-white border-slate-300 text-slate-800 hover:bg-slate-100"
              }`}
            >
              <Github size={16} className="text-cyan-400" />
              <span>GITHUB</span>
            </a>

            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-mono text-xs font-bold tracking-wider border transition-all duration-300 cursor-pointer ${
                isDark
                  ? "bg-slate-900/80 border-slate-800 text-slate-200 hover:bg-slate-800 hover:border-slate-700 hover:text-white"
                  : "bg-white border-slate-300 text-slate-800 hover:bg-slate-100"
              }`}
            >
              <Linkedin size={16} className="text-blue-400" />
              <span>LINKEDIN</span>
            </a>

            <a
              href={`mailto:${personal.email}`}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-mono text-xs font-bold tracking-wider border transition-all duration-300 cursor-pointer ${
                isDark
                  ? "bg-slate-900/80 border-slate-800 text-slate-200 hover:bg-slate-800 hover:border-slate-700 hover:text-white"
                  : "bg-white border-slate-300 text-slate-800 hover:bg-slate-100"
              }`}
            >
              <Mail size={16} className="text-purple-400" />
              <span>EMAIL</span>
            </a>
          </div>
        </motion.section>

        {/* ─── Technical Skills Matrix Section ─── */}
        <motion.section
          id="skills"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="space-y-8 pt-6 border-t border-slate-800/60"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold tracking-widest uppercase">
              <Code2 size={16} />
              <span>01 // TECHNICAL CAPABILITIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase">
              Skills Wheel & Tech Stack
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skillsWheel.map((cat, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden backdrop-blur-xl ${
                  isDark
                    ? "bg-slate-900/40 border-slate-800/80 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.12)]"
                    : "bg-white border-slate-200 shadow-sm hover:border-slate-300"
                }`}
              >
                {/* Decorative Category Watermark Header */}
                <div className="flex items-center justify-between mb-4 border-b border-slate-800/60 pb-3">
                  <h3 className="font-mono font-bold text-sm text-cyan-400 uppercase tracking-wider">
                    {cat.category}
                  </h3>
                  <span className="text-[10px] font-mono text-slate-500">
                    [{cat.items.length} ITEMS]
                  </span>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {cat.items.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className={`inline-flex items-center gap-2 text-xs font-mono font-semibold px-3 py-1.5 rounded-lg border transition-all duration-200 ${
                        isDark
                          ? "bg-slate-950/80 border-slate-800 text-slate-200 hover:border-cyan-500/60 hover:text-cyan-300 hover:bg-slate-900"
                          : "bg-white border-slate-200 text-slate-800 shadow-sm hover:border-blue-400"
                      }`}
                    >
                      <TechIcon name={skill} size={15} />
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ─── Featured Projects Showcase Section ─── */}
        <motion.section
          id="projects"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="space-y-8 pt-6 border-t border-slate-800/60"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold tracking-widest uppercase">
              <Sparkles size={16} />
              <span>02 // FEATURED PROJECTS & HEISTS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase">
              Engineering Case Studies
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {missions.map((project, index) => (
              <div
                key={project.id}
                className={`p-7 rounded-2xl border flex flex-col justify-between transition-all duration-300 relative overflow-hidden backdrop-blur-xl group ${
                  isDark
                    ? "bg-slate-900/40 border-slate-800/90 hover:border-cyan-500/50 hover:shadow-[0_0_35px_rgba(6,182,212,0.15)]"
                    : "bg-white border-slate-200 shadow-sm hover:border-slate-300"
                }`}
              >
                {/* Decorative Glow accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/15 transition-all duration-500 pointer-events-none" />

                <div className="space-y-4">
                  {/* Case Study Header Badge */}
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-2xl font-extrabold text-cyan-400 tracking-wider">
                      0{index + 1}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                        isDark
                          ? "bg-purple-950/60 text-purple-300 border-purple-800/50"
                          : "bg-blue-50 text-blue-700 border-blue-200"
                      }`}
                    >
                      {project.category}
                    </span>
                  </div>

                  {/* Project Title & Tagline */}
                  <div>
                    <h3 className="font-extrabold text-xl sm:text-2xl tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono text-slate-400 mt-1 uppercase tracking-wider">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Project Description Copy */}
                  <p
                    className={`text-sm leading-relaxed ${
                      isDark ? "text-slate-300" : "text-slate-600"
                    }`}
                  >
                    {project.description}
                  </p>

                  {/* Tech Stack List */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className={`inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold px-2.5 py-1 rounded-md border ${
                          isDark
                            ? "bg-slate-950/90 text-slate-300 border-slate-800"
                            : "bg-slate-100 text-slate-700 border-slate-200"
                        }`}
                      >
                        <TechIcon name={tech} size={13} />
                        <span>{tech}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Links Footer */}
                <div className="flex items-center justify-between gap-3 pt-6 mt-6 border-t border-slate-800/60">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs font-mono font-bold text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer"
                    >
                      <Github size={15} className="text-cyan-400" />
                      <span>Request Code / GitHub</span>
                    </a>
                  )}

                  {project.liveDemoUrl && (
                    <a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 transition-colors ml-auto cursor-pointer"
                    >
                      <span>Request Live Demo</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ─── Experience & Achievements Section ─── */}
        <motion.section
          id="experience"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="space-y-10 pt-6 border-t border-slate-800/60"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold tracking-widest uppercase">
              <Briefcase size={16} />
              <span>03 // EXPERIENCE & ACHIEVEMENTS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase">
              Career Timeline & Recognized Milestones
            </h2>
          </div>

          {/* Timeline Stack */}
          <div className="space-y-6 relative border-l-2 border-slate-800 ml-4 pl-6 sm:pl-8">
            {experienceTimeline.map((item, idx) => (
              <div key={idx} className="relative space-y-2">
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-cyan-400 border-4 border-[#030712] shadow-[0_0_12px_#22d3ee]" />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="font-extrabold text-lg sm:text-xl text-white">{item.role}</h3>
                  <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-800/50 px-3 py-0.5 rounded-full w-fit">
                    {item.period}
                  </span>
                </div>
                <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  {item.organization}
                </p>
                <p className={`text-sm leading-relaxed ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                  {item.details}
                </p>
              </div>
            ))}
          </div>

          {/* Achievements Matrix */}
          <div className="space-y-4 pt-4">
            <h3 className="font-mono font-bold text-sm text-cyan-400 uppercase tracking-wider flex items-center gap-2">
              <Award size={18} />
              <span>Recognized Trophies & Leadership</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {achievements.map((ach) => (
                <div
                  key={ach.id}
                  className={`p-5 rounded-xl border transition-all duration-300 backdrop-blur-xl ${
                    isDark
                      ? "bg-slate-900/40 border-slate-800/80 hover:border-purple-500/50 hover:shadow-[0_0_25px_rgba(168,85,247,0.12)]"
                      : "bg-white border-slate-200 shadow-sm"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded uppercase tracking-wider border ${
                        isDark
                          ? "bg-purple-950/60 text-purple-300 border-purple-800/50"
                          : "bg-blue-50 text-blue-700 border-blue-200"
                      }`}
                    >
                      🏆 {ach.badge}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">{ach.date}</span>
                  </div>

                  <h4 className="font-bold text-base text-white mt-2">{ach.title}</h4>
                  <p className="text-xs font-mono text-slate-400 mt-0.5">{ach.organization}</p>
                  <p className={`text-xs mt-2 leading-relaxed ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                    {ach.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications List */}
          {certifications && certifications.length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="font-mono font-bold text-sm text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                <Layers size={16} />
                <span>Verified Certifications</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {certifications.map((cert, cIdx) => (
                  <div
                    key={cIdx}
                    className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/30 font-mono text-xs space-y-1"
                  >
                    <p className="font-bold text-slate-200">{cert.title}</p>
                    <p className="text-cyan-400 text-[10px]">ISSUER: {cert.issuer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.section>

        {/* ─── Contact Section ─── */}
        <motion.section
          id="contact"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="space-y-8 pt-6 border-t border-slate-800/60"
        >
          <div
            className={`p-8 sm:p-12 rounded-3xl border text-center space-y-6 relative overflow-hidden backdrop-blur-2xl ${
              isDark
                ? "bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-950/80 border-slate-800 shadow-[0_0_50px_rgba(6,182,212,0.1)]"
                : "bg-white border-slate-200 shadow-sm"
            }`}
          >
            <div className="space-y-2 max-w-2xl mx-auto">
              <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-widest">
                04 // INITIATE TRANSMISSION
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase text-white">
                Let's Connect
              </h2>
              <p
                className={`text-sm sm:text-base leading-relaxed ${
                  isDark ? "text-slate-300" : "text-slate-600"
                }`}
              >
                Open for engineering roles, research leads, or technical collaborations. Reach out directly using the options below.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href={`mailto:${personal.email}`}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono text-xs font-bold tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-105 cursor-pointer flex items-center gap-2"
              >
                <Mail size={16} />
                <span>EMAIL ({personal.email})</span>
              </a>

              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-white font-mono text-xs font-bold tracking-wider transition-all duration-300 hover:scale-105 cursor-pointer flex items-center gap-2"
              >
                <Linkedin size={16} className="text-blue-400" />
                <span>LINKEDIN PROFILE</span>
              </a>

              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-white font-mono text-xs font-bold tracking-wider transition-all duration-300 hover:scale-105 cursor-pointer flex items-center gap-2"
              >
                <Github size={16} className="text-cyan-400" />
                <span>GITHUB REPO</span>
              </a>

              <a
                href={`tel:${personal.phone}`}
                className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-white font-mono text-xs font-bold tracking-wider transition-all duration-300 hover:scale-105 cursor-pointer flex items-center gap-2"
              >
                <Phone size={16} className="text-emerald-400" />
                <span>PHONE ({personal.phone})</span>
              </a>
            </div>
          </div>
        </motion.section>

        {/* ─── Footer with GTA Mode Handoff ─── */}
        <footer className="pt-8 pb-12 border-t border-slate-800/60 text-center space-y-6">
          <div
            className={`p-6 rounded-2xl border max-w-xl mx-auto backdrop-blur-xl ${
              isDark
                ? "bg-slate-900/40 border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.1)]"
                : "bg-slate-100 border-amber-400/40"
            }`}
          >
            <p className="text-[11px] uppercase font-mono font-bold text-amber-400 tracking-widest">
              INTERACTIVE GTA EXPERIENCE
            </p>
            <h3 className="text-lg font-extrabold text-white mt-1 mb-3">Prefer the interactive Vice City style?</h3>
            <button
              onClick={onSwitchToGTA}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-mono text-xs font-bold tracking-wider transition-all duration-300 bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:scale-105 cursor-pointer"
            >
              <Gamepad2 size={18} />
              <span>LAUNCH GTA MODE →</span>
            </button>
          </div>

          <p className="text-xs font-mono text-slate-500">
            © {new Date().getFullYear()} {personal.name} • {personal.title}
          </p>
        </footer>
      </main>
    </div>
  );
}
