"use client";

import { useRef, useEffect, useState } from "react";
import { portfolioConfig } from "@/config/portfolioConfig";
import { ExternalLink, Github, Target, AlertTriangle } from "lucide-react";

const DIFFICULTY_STARS: Record<string, number> = {
  "Five Stars": 5,
  "Four Stars": 4,
  "Three Stars": 3,
};

export default function HeistsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeMission, setActiveMission] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const { missions } = portfolioConfig;

  return (
    <section
      ref={sectionRef}
      id="heists"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24"
    >
      {/* Section Title */}
      <div
        className={`text-center mb-16 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="font-hud text-xs text-gta-red tracking-[0.4em] mb-2">PLANNING BOARD</p>
        <h2 className="section-title text-gta-yellow gta-glow">HEISTS</h2>
        <p className="font-body text-gray-400 mt-2 text-lg">
          Completed missions & operations
        </p>
      </div>

      {/* Mission Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl w-full">
        {missions.map((mission, idx) => {
          const stars = DIFFICULTY_STARS[mission.difficulty] || 3;
          const isActive = activeMission === idx;

          return (
            <div
              key={mission.id}
              className={`mission-card gta-card rounded-lg overflow-hidden cursor-pointer transition-all duration-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${idx * 200}ms` }}
              onMouseEnter={() => setActiveMission(idx)}
              onMouseLeave={() => setActiveMission(null)}
            >
              {/* Header */}
              <div className="relative bg-gradient-to-r from-gta-dark to-gta-panel p-6 border-b border-gta-yellow/20">
                {/* Difficulty badge */}
                <div className="absolute top-4 right-4 flex gap-0.5">
                  {Array.from({ length: 5 }, (_, i) => (
                    <AlertTriangle
                      key={i}
                      size={12}
                      className={i < stars ? "fill-gta-yellow text-gta-yellow" : "text-gray-700"}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <Target size={14} className="text-gta-red" />
                  <span className="font-hud text-[10px] text-gta-red tracking-[0.3em]">
                    {mission.category.toUpperCase()}
                  </span>
                </div>

                <h3 className="font-hud text-xl text-white font-bold leading-tight pr-20">
                  {mission.title}
                </h3>

                <p className="font-hud text-xs text-gta-cyan mt-2 tracking-wider">
                  {mission.tagline}
                </p>
              </div>

              {/* Body */}
              <div className="p-6">
                <p className="font-body text-gray-300 text-sm leading-relaxed mb-6">
                  {mission.description}
                </p>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {mission.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="hud-panel px-3 py-1 font-hud text-[10px] text-gta-green tracking-wider hover:bg-gta-green/10 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <a
                    href={mission.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gta-btn text-xs flex items-center gap-2 px-4 py-2"
                  >
                    <Github size={14} />
                    REPO
                  </a>
                  {mission.liveDemoUrl !== "#" && (
                    <a
                      href={mission.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-gta-cyan/40 text-gta-cyan px-4 py-2 font-hud text-xs tracking-wider hover:bg-gta-cyan/10 transition-colors flex items-center gap-2"
                    >
                      <ExternalLink size={14} />
                      LIVE DEMO
                    </a>
                  )}
                </div>
              </div>

              {/* Bottom accent line */}
              <div
                className={`h-1 transition-all duration-500 ${
                  isActive
                    ? "bg-gradient-to-r from-gta-yellow via-gta-orange to-gta-red"
                    : "bg-gta-yellow/20"
                }`}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
