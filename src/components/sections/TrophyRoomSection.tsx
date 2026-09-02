"use client";

import { useRef, useEffect, useState } from "react";
import { portfolioConfig } from "@/config/portfolioConfig";
import { Trophy, Award, Medal, BookOpen, Cloud, Swords } from "lucide-react";

const CATEGORY_ICONS: Record<string, typeof Trophy> = {
  Leadership: Trophy,
  Academy: BookOpen,
  Hackathon: Swords,
  Datathon: Medal,
  Mentorship: Cloud,
};

const CATEGORY_COLORS: Record<string, string> = {
  Leadership: "text-gta-yellow",
  Academy: "text-gta-cyan",
  Hackathon: "text-gta-orange",
  Datathon: "text-gta-purple",
  Mentorship: "text-gta-blue",
};

export default function TrophyRoomSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
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

  const { achievements } = portfolioConfig;

  return (
    <section
      ref={sectionRef}
      id="trophies"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24"
    >
      {/* Section Title */}
      <div
        className={`text-center mb-16 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="font-hud text-xs text-gta-gold tracking-[0.4em] mb-2">100% COMPLETION</p>
        <h2 className="section-title text-gta-yellow gta-glow">TROPHY ROOM</h2>
        <p className="font-body text-gray-400 mt-2 text-lg">
          Accolades, certifications & leadership records
        </p>
      </div>

      {/* Trophy Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
        {achievements.map((achievement, idx) => {
          const Icon = CATEGORY_ICONS[achievement.category] || Award;
          const colorClass = CATEGORY_COLORS[achievement.category] || "text-gta-yellow";
          const isHovered = hoveredId === achievement.id;

          return (
            <div
              key={achievement.id}
              className={`trophy-badge rounded-lg overflow-hidden transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${idx * 120}ms` }}
              onMouseEnter={() => setHoveredId(achievement.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="p-6">
                {/* Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                        isHovered
                          ? "border-gta-yellow bg-gta-yellow/10"
                          : "border-gta-yellow/30 bg-transparent"
                      } transition-all duration-300`}
                    >
                      <Icon size={18} className={colorClass} />
                    </div>
                    <div>
                      <span
                        className={`font-hud text-[10px] ${colorClass} tracking-[0.3em] font-bold`}
                      >
                        {achievement.badge}
                      </span>
                      <p className="font-hud text-[9px] text-gta-gray tracking-wider">
                        {achievement.category.toUpperCase()}
                      </p>
                    </div>
                  </div>
                  <span className="font-hud text-[10px] text-gta-gray">{achievement.date}</span>
                </div>

                {/* Title */}
                <h3 className="font-hud text-sm text-white font-bold leading-snug mb-1">
                  {achievement.title}
                </h3>
                <p className="font-body text-xs text-gta-yellow/70 mb-2">{achievement.organization}</p>

                {achievement.tagline && (
                  <p className="font-hud text-[10px] text-gta-cyan tracking-wider mb-2">
                    {achievement.tagline}
                  </p>
                )}

                {/* Details */}
                <p className="font-body text-xs text-gray-400 leading-relaxed">
                  {achievement.details}
                </p>
              </div>

              {/* Bottom shimmer */}
              <div
                className={`h-px transition-all duration-500 ${
                  isHovered
                    ? "bg-gradient-to-r from-transparent via-gta-yellow to-transparent"
                    : "bg-gta-yellow/10"
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* Completion Stats */}
      <div
        className={`mt-16 gta-card rounded-lg p-6 max-w-3xl w-full transition-all duration-700 delay-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <span className="font-hud text-xs text-gta-gray tracking-widest">
            COMPLETION PROGRESS
          </span>
          <span className="font-hud text-xs text-gta-green">{achievements.length} / 10</span>
        </div>
        <div className="w-full h-3 bg-gta-dark rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-gta-yellow via-gta-orange to-gta-red rounded-full"
            style={{ width: `${(achievements.length / 10) * 100}%` }}
          />
        </div>
        <p className="font-hud text-[10px] text-gta-gray mt-2 tracking-wider">
          {achievements.length * 10}% TOTAL COMPLETION UNLOCKED
        </p>
      </div>
    </section>
  );
}
