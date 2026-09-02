"use client";

import { useRef, useEffect, useState } from "react";
import { portfolioConfig } from "@/config/portfolioConfig";
import { MapPin, GraduationCap, Briefcase, CheckCircle } from "lucide-react";

export default function WaypointsSection() {
  const [isVisible, setIsVisible] = useState(false);
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

  const { experienceTimeline, certifications } = portfolioConfig;

  return (
    <section
      ref={sectionRef}
      id="waypoints"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24"
    >
      {/* Section Title */}
      <div
        className={`text-center mb-16 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="font-hud text-xs text-gta-green tracking-[0.4em] mb-2">GPS NAVIGATION</p>
        <h2 className="section-title text-gta-yellow gta-glow">WAYPOINTS</h2>
        <p className="font-body text-gray-400 mt-2 text-lg">
          Experience checkpoints & certification badges
        </p>
      </div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Timeline */}
        <div>
          <h3 className="font-hud text-sm text-gta-cyan tracking-[0.3em] mb-8 flex items-center gap-2">
            <Briefcase size={16} />
            CAREER WAYPOINTS
          </h3>

          <div className="relative pl-8">
            {/* Vertical line */}
            <div className="absolute left-3 top-0 bottom-0 w-0.5 timeline-line" />

            {experienceTimeline.map((exp, idx) => (
              <div
                key={idx}
                className={`relative mb-12 transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                }`}
                style={{ transitionDelay: `${idx * 200 + 300}ms` }}
              >
                {/* Node */}
                <div className="absolute -left-5 top-1 w-4 h-4 rounded-full bg-gta-yellow shadow-[0_0_12px_rgba(245,197,24,0.6)]" />

                <div className="gta-card rounded-lg p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-hud text-[10px] text-gta-red tracking-[0.2em]">
                      {exp.checkpoint.toUpperCase()}
                    </span>
                    <span className="font-hud text-[10px] text-gta-gray">{exp.period}</span>
                  </div>

                  <h4 className="font-hud text-base text-white font-bold">{exp.role}</h4>
                  <p className="font-body text-sm text-gta-yellow/70 mb-3">{exp.organization}</p>
                  <p className="font-body text-sm text-gray-400 leading-relaxed">{exp.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h3 className="font-hud text-sm text-gta-green tracking-[0.3em] mb-8 flex items-center gap-2">
            <GraduationCap size={16} />
            UNLOCKED BADGES
          </h3>

          <div className="space-y-4">
            {certifications.map((cert, idx) => (
              <div
                key={idx}
                className={`hud-panel p-4 flex items-center gap-4 hover:border-gta-green/60 transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
                style={{ transitionDelay: `${idx * 100 + 500}ms` }}
              >
                <div className="w-10 h-10 rounded-full bg-gta-green/10 border border-gta-green/30 flex items-center justify-center flex-shrink-0">
                  <CheckCircle size={18} className="text-gta-green" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-hud text-sm text-white font-bold truncate">{cert.title}</h4>
                  <p className="font-body text-xs text-gta-gray">{cert.issuer}</p>
                </div>
                <div className="flex-shrink-0">
                  <span className="font-hud text-[9px] text-gta-green tracking-wider px-2 py-1 border border-gta-green/30 rounded">
                    VERIFIED
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Map Pin decoration */}
          <div
            className={`mt-12 text-center transition-all duration-700 delay-700 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <MapPin size={32} className="text-gta-yellow mx-auto animate-bounce" />
            <p className="font-hud text-[10px] text-gta-gray tracking-[0.3em] mt-2">
              DESTINATION REACHED
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
