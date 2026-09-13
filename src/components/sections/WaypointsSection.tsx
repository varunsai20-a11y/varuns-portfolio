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

      <div className="max-w-4xl w-full">
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
      </div>
    </section>
  );
}
