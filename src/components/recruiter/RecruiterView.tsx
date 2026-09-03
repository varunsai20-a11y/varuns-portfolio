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
  Check,
} from "lucide-react";
import TechIcon from "@/components/ui/TechIcon";
import { portfolioConfig } from "@/config/portfolioConfig";


interface RecruiterViewProps {
  onSwitchToGTA: () => void;
}

export default function RecruiterView({ onSwitchToGTA }: RecruiterViewProps) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  const { personal, missions, experienceTimeline, achievements } = portfolioConfig;

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

  // Structured skills categorization matching the latest resume
  const skillsCategories = [
    {
      title: "Languages",
      skills: ["Java", "Python", "SQL", "JavaScript"],
    },
    {
      title: "Frameworks & Libraries",
      skills: ["PyTorch", "TensorFlow", "Scikit-Learn", "OpenCV", "Pandas", "NumPy", "React.js", "Node.js", "Flask"],
    },
    {
      title: "Technologies",
      skills: ["REST APIs", "HTML5", "CSS3"],
    },
    {
      title: "OS & Tools",
      skills: ["Linux", "Git", "GitHub"],
    },
  ];

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-200 select-text ${
        isDark ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* ─── Sticky Minimal Header ─── */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors ${
          isDark
            ? "bg-slate-950/85 border-slate-800/80"
            : "bg-white/85 border-slate-200/80"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a
              href="#hero"
              className="font-bold text-lg tracking-tight hover:opacity-80 transition-opacity"
            >
              {personal.name}
            </a>
            <span
              className={`hidden sm:inline-block text-xs px-2.5 py-0.5 rounded-full font-medium ${
                isDark
                  ? "bg-blue-950 text-blue-300 border border-blue-800/50"
                  : "bg-blue-50 text-blue-700 border border-blue-200"
              }`}
            >
              Recruiter View
            </span>
          </div>

          <nav className="flex items-center gap-2 sm:gap-4" aria-label="Recruiter View Navigation">
            <div className="hidden md:flex items-center gap-6 text-sm font-medium">
              <a
                href="#skills"
                className={`hover:text-blue-500 transition-colors ${
                  isDark ? "text-slate-300" : "text-slate-600"
                }`}
              >
                Skills
              </a>
              <a
                href="#projects"
                className={`hover:text-blue-500 transition-colors ${
                  isDark ? "text-slate-300" : "text-slate-600"
                }`}
              >
                Projects
              </a>
              <a
                href="#experience"
                className={`hover:text-blue-500 transition-colors ${
                  isDark ? "text-slate-300" : "text-slate-600"
                }`}
              >
                Experience
              </a>
              <a
                href="#contact"
                className={`hover:text-blue-500 transition-colors ${
                  isDark ? "text-slate-300" : "text-slate-600"
                }`}
              >
                Contact
              </a>
            </div>

            {/* Sun / Moon Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
              className={`p-2 rounded-lg transition-colors border ${
                isDark
                  ? "bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800"
                  : "bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Mode Handoff Button to GTA */}
            <button
              onClick={onSwitchToGTA}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all shadow-sm ${
                isDark
                  ? "bg-slate-900 border-amber-500/40 text-amber-300 hover:bg-amber-500/10 hover:border-amber-400"
                  : "bg-slate-900 border-slate-900 text-white hover:bg-slate-800"
              }`}
            >
              <Gamepad2 size={15} className="text-amber-400" />
              <span>GTA Mode</span>
            </button>
          </nav>
        </div>
      </header>

      {/* ─── Main Content Container ─── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-16">
        {/* ─── Hero / Header Section ─── */}
        <motion.section
          id="hero"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6 pt-4"
        >
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  isDark
                    ? "bg-blue-950/80 text-blue-300 border border-blue-800/40"
                    : "bg-blue-100 text-blue-800 border border-blue-200"
                }`}
              >
                Available for Full-Time Roles
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <MapPin size={13} /> {personal.location}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              {personal.name}
            </h1>
            <p
              className={`text-xl sm:text-2xl font-medium ${
                isDark ? "text-blue-400" : "text-blue-600"
              }`}
            >
              {personal.title}
            </p>
          </div>

          <p
            className={`max-w-3xl text-base sm:text-lg leading-relaxed ${
              isDark ? "text-slate-300" : "text-slate-700"
            }`}
          >
            {personal.bio} Specializing in high-dimensional regression, machine learning pipelines,
            real-time prediction engines, and scalable web solutions. B.Tech Computer Science student
            at Jain University (CGPA: 8.41/10.0).
          </p>

          {/* Quick Metrics Bar */}
          <div
            className={`grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl border ${
              isDark
                ? "bg-slate-900/60 border-slate-800"
                : "bg-white border-slate-200 shadow-sm"
            }`}
          >
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Education</p>
              <p className="text-sm font-bold mt-0.5">B.Tech CSE (AI & Data)</p>
              <p className="text-xs text-blue-500 font-medium">CGPA: 8.41 / 10.0</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Leadership</p>
              <p className="text-sm font-bold mt-0.5">Research Lead</p>
              <p className="text-xs text-slate-400">DATA.AI Club (Jain Univ)</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Problem Solving</p>
              <p className="text-sm font-bold mt-0.5">LeetCode 200+</p>
              <p className="text-xs text-emerald-500 font-medium">Solved Challenges</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Key Hackathon</p>
              <p className="text-sm font-bold mt-0.5">Smart India (SIH '25)</p>
              <p className="text-xs text-slate-400">National Qualifier</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm ${
                isDark
                  ? "bg-blue-600 hover:bg-blue-500 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              <FileText size={16} />
              <span>Download Resume (PDF)</span>
            </a>

            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border transition-colors ${
                isDark
                  ? "bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800"
                  : "bg-white border-slate-300 text-slate-800 hover:bg-slate-100"
              }`}
            >
              <Github size={16} />
              <span>GitHub</span>
            </a>

            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border transition-colors ${
                isDark
                  ? "bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800"
                  : "bg-white border-slate-300 text-slate-800 hover:bg-slate-100"
              }`}
            >
              <Linkedin size={16} />
              <span>LinkedIn</span>
            </a>

            <a
              href={`mailto:${personal.email}`}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border transition-colors ${
                isDark
                  ? "bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800"
                  : "bg-white border-slate-300 text-slate-800 hover:bg-slate-100"
              }`}
            >
              <Mail size={16} />
              <span>Email</span>
            </a>
          </div>
        </motion.section>

        {/* ─── Skills Grid Section ─── */}
        <motion.section
          id="skills"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="space-y-6 pt-4 border-t border-slate-800/40"
        >
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Code2 size={22} className="text-blue-500" />
              <span>Technical Skills</span>
            </h2>
            <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
              Categorized breakdown of core languages, frameworks, and data systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillsCategories.map((cat, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-xl border transition-all ${
                  isDark
                    ? "bg-slate-900/50 border-slate-800/80 hover:border-slate-700"
                    : "bg-white border-slate-200 shadow-sm hover:border-slate-300"
                }`}
              >
                <h3 className="font-semibold text-base mb-3 text-blue-500">
                  {cat.title}
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {cat.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                        isDark
                          ? "bg-slate-900/90 border-slate-800 text-slate-200 hover:border-blue-500/50 hover:bg-slate-800"
                          : "bg-white border-slate-200 text-slate-800 shadow-sm hover:border-blue-400"
                      }`}
                    >
                      <TechIcon name={skill} size={16} />
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ─── Featured Projects Section ─── */}
        <motion.section
          id="projects"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="space-y-6 pt-4 border-t border-slate-800/40"
        >
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Sparkles size={22} className="text-blue-500" />
              <span>Featured Projects</span>
            </h2>
            <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
              Key machine learning, research, and full-stack software applications built by Varun.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {missions.map((project) => (
              <div
                key={project.id}
                className={`p-6 rounded-xl border flex flex-col justify-between transition-all ${
                  isDark
                    ? "bg-slate-900/50 border-slate-800 hover:border-slate-700"
                    : "bg-white border-slate-200 shadow-sm hover:border-slate-300"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-lg tracking-tight">
                      {project.title}
                    </h3>
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full shrink-0 ${
                        isDark
                          ? "bg-blue-950 text-blue-300 border border-blue-800/50"
                          : "bg-blue-50 text-blue-700 border border-blue-200"
                      }`}
                    >
                      {project.category}
                    </span>
                  </div>

                  <p
                    className={`text-sm leading-relaxed ${
                      isDark ? "text-slate-300" : "text-slate-600"
                    }`}
                  >
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-md ${
                          isDark
                            ? "bg-slate-800/90 text-slate-300 border border-slate-700/50"
                            : "bg-slate-100 text-slate-700 border border-slate-200"
                        }`}
                      >
                        <TechIcon name={tech} size={13} />
                        <span>{tech}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-5 mt-4 border-t border-slate-800/40">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-1.5 text-xs font-semibold hover:text-blue-500 transition-colors ${
                        isDark ? "text-slate-300" : "text-slate-700"
                      }`}
                    >
                      <Github size={14} />
                      <span>Code Repository</span>
                    </a>
                  )}

                  {project.liveDemoUrl && (
                    <a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-semibold text-blue-500 hover:underline ml-auto"
                    >
                      <span>Live App</span>
                      <ExternalLink size={13} />
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="space-y-6 pt-4 border-t border-slate-800/40"
        >
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Briefcase size={22} className="text-blue-500" />
              <span>Experience & Leadership</span>
            </h2>
            <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
              Professional internships, club leadership, and hackathon recognitions.
            </p>
          </div>

          <div className="space-y-4">
            {experienceTimeline.map((item, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-xl border ${
                  isDark
                    ? "bg-slate-900/50 border-slate-800"
                    : "bg-white border-slate-200 shadow-sm"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <h3 className="font-bold text-base">{item.role}</h3>
                  <span className="text-xs text-blue-500 font-semibold">{item.period}</span>
                </div>
                <p className={`text-xs font-medium mb-2 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                  {item.organization}
                </p>
                <p className={`text-sm ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                  {item.details}
                </p>
              </div>
            ))}
          </div>

          {/* Key Achievements Grid */}
          <div className="pt-4 space-y-3">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <Award size={18} className="text-blue-500" />
              <span>Achievements & Certifications</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {achievements.map((ach) => (
                <div
                  key={ach.id}
                  className={`p-4 rounded-xl border ${
                    isDark
                      ? "bg-slate-900/40 border-slate-800"
                      : "bg-white border-slate-200 shadow-sm"
                  }`}
                >
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                      isDark
                        ? "bg-blue-950 text-blue-400 border border-blue-800/40"
                        : "bg-blue-50 text-blue-700 border border-blue-200"
                    }`}
                  >
                    {ach.badge}
                  </span>
                  <h4 className="font-bold text-sm mt-2">{ach.title}</h4>
                  <p className={`text-xs mt-1 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                    {ach.organization} • {ach.date}
                  </p>
                  <p className={`text-xs mt-2 leading-relaxed ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                    {ach.details}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ─── Contact Section ─── */}
        <motion.section
          id="contact"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="space-y-6 pt-4 border-t border-slate-800/40"
        >
          <div
            className={`p-8 rounded-2xl border text-center space-y-4 ${
              isDark
                ? "bg-slate-900/60 border-slate-800"
                : "bg-white border-slate-200 shadow-sm"
            }`}
          >
            <h2 className="text-2xl font-bold tracking-tight">Let's Build Something Together</h2>
            <p
              className={`max-w-xl mx-auto text-sm sm:text-base ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              I am actively seeking software engineering, AI/ML development, and data engineering opportunities.
              Feel free to reach out directly via email or connect on LinkedIn.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href={`mailto:${personal.email}`}
                className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors shadow-sm"
              >
                Send Email ({personal.email})
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-5 py-2.5 rounded-lg font-semibold text-sm border transition-colors ${
                  isDark
                    ? "bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
                    : "bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200"
                }`}
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </motion.section>

        {/* ─── Footer CTA (Handoff back to GTA Mode) ─── */}
        <footer className="pt-8 pb-12 border-t border-slate-800/40 text-center space-y-4">
          <div
            className={`p-6 rounded-2xl border max-w-xl mx-auto ${
              isDark
                ? "bg-slate-900/40 border-amber-500/30"
                : "bg-slate-100 border-amber-400/40"
            }`}
          >
            <p className="text-xs uppercase font-semibold text-amber-500 tracking-wider">
              Interactive Showcase
            </p>
            <h3 className="text-lg font-bold mt-1 mb-3">Prefer the interactive version?</h3>
            <button
              onClick={onSwitchToGTA}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md ${
                isDark
                  ? "bg-amber-500 hover:bg-amber-400 text-slate-950"
                  : "bg-slate-900 hover:bg-slate-800 text-white"
              }`}
            >
              <Gamepad2 size={18} />
              <span>Launch GTA Mode →</span>
            </button>
          </div>

          <p className={`text-xs ${isDark ? "text-slate-500" : "text-slate-500"}`}>
            © {new Date().getFullYear()} B Varun Sai. Recruiter / Fast View.
          </p>
        </footer>
      </main>
    </div>
  );
}
