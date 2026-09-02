"use client";

import { useState, useRef, useEffect } from "react";
import { portfolioConfig } from "@/config/portfolioConfig";
import { Shield, Zap, Cpu } from "lucide-react";

const CATEGORY_ICONS = [Shield, Zap, Cpu];

export default function ArsenalSection() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const { skillsWheel } = portfolioConfig;

  return (
    <section
      ref={sectionRef}
      id="arsenal"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24"
    >
      {/* Section Title */}
      <div
        className={`text-center mb-16 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="font-hud text-xs text-gta-cyan tracking-[0.4em] mb-2">WEAPON WHEEL</p>
        <h2 className="section-title text-gta-yellow gta-glow">ARSENAL</h2>
        <p className="font-body text-gray-400 mt-2 text-lg">
          Select your tactical loadout
        </p>
      </div>

      {/* Weapon Wheel Layout */}
      <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl w-full">
        {/* Wheel Selector */}
        <div
          className={`relative transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
        >
          <svg width="320" height="320" viewBox="0 0 320 320" className="drop-shadow-2xl">
            {/* Outer ring */}
            <circle
              cx="160"
              cy="160"
              r="150"
              fill="none"
              stroke="rgba(245,197,24,0.3)"
              strokeWidth="2"
            />
            <circle
              cx="160"
              cy="160"
              r="120"
              fill="none"
              stroke="rgba(245,197,24,0.15)"
              strokeWidth="1"
            />

            {/* Sectors */}
            {skillsWheel.map((skill, i) => {
              const angle = (i * 120 - 90) * (Math.PI / 180);
              const nextAngle = ((i + 1) * 120 - 90) * (Math.PI / 180);
              const isActive = i === activeCategory;

              const x1 = 160 + 145 * Math.cos(angle);
              const y1 = 160 + 145 * Math.sin(angle);
              const x2 = 160 + 145 * Math.cos(nextAngle);
              const y2 = 160 + 145 * Math.sin(nextAngle);
              const ix1 = 160 + 50 * Math.cos(angle);
              const iy1 = 160 + 50 * Math.sin(angle);
              const ix2 = 160 + 50 * Math.cos(nextAngle);
              const iy2 = 160 + 50 * Math.sin(nextAngle);

              const midAngle = angle + (Math.PI * 120) / (2 * 180);
              const labelX = 160 + 95 * Math.cos(midAngle);
              const labelY = 160 + 95 * Math.sin(midAngle);
              const iconX = 160 + 70 * Math.cos(midAngle);
              const iconY = 160 + 70 * Math.sin(midAngle);

              const Icon = CATEGORY_ICONS[i];

              return (
                <g
                  key={skill.category}
                  className="weapon-sector"
                  onClick={() => setActiveCategory(i)}
                >
                  <path
                    d={`M ${ix1} ${iy1} L ${x1} ${y1} A 145 145 0 0 1 ${x2} ${y2} L ${ix2} ${iy2} A 50 50 0 0 0 ${ix1} ${iy1}`}
                    fill={
                      isActive
                        ? "rgba(245, 197, 24, 0.25)"
                        : "rgba(245, 197, 24, 0.05)"
                    }
                    stroke={isActive ? "#F5C518" : "rgba(245,197,24,0.3)"}
                    strokeWidth={isActive ? 2 : 1}
                  />
                  {/* Icon */}
                  <foreignObject
                    x={iconX - 10}
                    y={iconY - 10}
                    width="20"
                    height="20"
                    className="pointer-events-none"
                  >
                    <div className="text-gta-yellow flex items-center justify-center">
                      <Icon size={16} />
                    </div>
                  </foreignObject>
                  {/* Label */}
                  <text
                    x={labelX}
                    y={labelY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={isActive ? "#F5C518" : "#888"}
                    fontSize="8"
                    fontFamily="Chakra Petch, monospace"
                    className="pointer-events-none"
                  >
                    {skill.category.split(" (")[0]}
                  </text>
                </g>
              );
            })}

            {/* Center hub */}
            <circle cx="160" cy="160" r="48" fill="#111" stroke="#F5C518" strokeWidth="2" />
            <text
              x="160"
              y="156"
              textAnchor="middle"
              fill="#F5C518"
              fontSize="11"
              fontFamily="Pricedown, Impact"
            >
              SKILLS
            </text>
            <text
              x="160"
              y="172"
              textAnchor="middle"
              fill="#00D4FF"
              fontSize="8"
              fontFamily="Chakra Petch, monospace"
            >
              {activeCategory + 1}/{skillsWheel.length}
            </text>
          </svg>
        </div>

        {/* Active Skills Panel */}
        <div
          className={`flex-1 transition-all duration-700 delay-400 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
          }`}
        >
          <div className="gta-card p-8 rounded-lg">
            <div className="flex items-center gap-3 mb-6">
              {(() => {
                const Icon = CATEGORY_ICONS[activeCategory];
                return <Icon className="text-gta-yellow" size={24} />;
              })()}
              <div>
                <p className="font-hud text-[10px] text-gta-gray tracking-widest">
                  LOADOUT CATEGORY {activeCategory + 1}
                </p>
                <h3 className="font-hud text-lg text-gta-yellow font-bold tracking-wider">
                  {skillsWheel[activeCategory].category}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {skillsWheel[activeCategory].items.map((skill, idx) => (
                <div
                  key={skill}
                  className="hud-panel px-4 py-3 flex items-center gap-3 hover:border-gta-yellow/60 transition-all duration-200"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="w-2 h-2 bg-gta-green rounded-full" />
                  <span className="font-hud text-sm text-white tracking-wider">
                    {skill}
                  </span>
                </div>
              ))}
            </div>

            {/* Skill proficiency bar */}
            <div className="mt-6">
              <div className="flex justify-between mb-1">
                <span className="font-hud text-[10px] text-gta-gray tracking-widest">
                  PROFICIENCY
                </span>
                <span className="font-hud text-[10px] text-gta-green">
                  {Math.floor(85 + Math.random() * 15)}%
                </span>
              </div>
              <div className="w-full h-2 bg-gta-dark rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-gta-green to-gta-cyan rounded-full transition-all duration-1000"
                  style={{ width: "88%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
