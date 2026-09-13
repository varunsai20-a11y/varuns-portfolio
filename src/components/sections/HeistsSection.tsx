"use client";

import { useRef, useEffect, useState } from "react";
import { portfolioConfig } from "@/config/portfolioConfig";
import { ExternalLink, Github, Target, AlertTriangle, MessageSquare } from "lucide-react";

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
        <p className="font-hud text-xs text-gta-red tracking-[0.4em] mb-2">MISSION BOARD</p>
        <h2 className="section-title text-gta-yellow gta-glow">HEISTS</h2>
        <p className="font-body text-gray-400 mt-2 text-lg">
          High-impact software engineering projects
        </p>
      </div>

      {/* Missions Grid */}
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {missions.map((mission, idx) => {
          const starsCount = DIFFICULTY_STARS[mission.difficulty] || 3;
          const isActive = activeMission === idx;

          return (
            <div
              key={mission.id}
              className={`gta-card rounded-lg p-6 flex flex-col justify-between transition-all duration-700 hover:border-gta-yellow/60 group ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${idx * 150}ms` }}
              onMouseEnter={() => setActiveMission(idx)}
              onMouseLeave={() => setActiveMission(null)}
            >
              <div>
                {/* Mission Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="font-hud text-[10px] text-gta-pink tracking-[0.2em]">
                      {mission.category}
                    </span>
                    <h3 className="font-hud text-xl text-white font-bold group-hover:text-gta-yellow transition-colors">
                      {mission.title}
                    </h3>
                  </div>

                  {/* Difficulty stars */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: starsCount }).map((_, i) => (
                      <span key={i} className="text-gta-yellow text-xs">
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tagline */}
                <p className="font-hud text-xs text-gta-cyan tracking-wider mb-4">
                  {mission.tagline}
                </p>

                {/* Description */}
                <p className="font-body text-sm text-gray-300 leading-relaxed mb-6">
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
                <div className="flex gap-3 flex-wrap">
                  <a
                    href={`https://wa.me/8660224417?text=Hi%20Varun,%20I'd%20like%20to%20request%20code%20access%20/%20schedule%20appointment%20for%20project:%20${encodeURIComponent(mission.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gta-btn text-xs flex items-center gap-2 px-4 py-2"
                  >
                    <MessageSquare size={14} />
                    REQUEST CODE
                  </a>
                  <a
                    href={`https://wa.me/8660224417?text=Hi%20Varun,%20I'd%20like%20to%20schedule%20a%20live%20demo%20appointment%20for:%20${encodeURIComponent(mission.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-gta-cyan/40 text-gta-cyan px-4 py-2 font-hud text-xs tracking-wider hover:bg-gta-cyan/10 transition-colors flex items-center gap-2"
                  >
                    <ExternalLink size={14} />
                    SCHEDULE DEMO
                  </a>
                </div>
              </div>

              {/* Bottom accent line */}
              <div
                className={`h-1 mt-6 transition-all duration-500 ${
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
