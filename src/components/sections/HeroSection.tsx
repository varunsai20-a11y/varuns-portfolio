"use client";

import { useEffect, useRef, useState } from "react";
import { portfolioConfig } from "@/config/portfolioConfig";
import { Github, Linkedin } from "lucide-react";

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  const [showMission, setShowMission] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setLoaded(true), 300);
    const t2 = setTimeout(() => setShowMission(true), 1800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const { name, title, bio, location, status } = portfolioConfig.personal;

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Loading Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gta-dark">
        <div
          className={`h-full bg-gradient-to-r from-gta-yellow via-gta-orange to-gta-red ${
            loaded ? "loading-bar" : "w-0"
          }`}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl">
        {/* MISSION PASSED Banner */}
        <div
          className={`transition-all duration-1000 ease-out ${
            showMission
              ? "opacity-100 scale-100"
              : "opacity-0 scale-150"
          }`}
        >
          <h1
            className="font-gta text-gta-yellow gta-glow leading-none"
            style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}
          >
            MISSION PASSED
          </h1>
          <div className="flex items-center justify-center gap-4 mt-2">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gta-yellow" />
            <span className="text-gta-green font-hud text-sm tracking-[0.3em] gta-glow-green">
              +RESPECT +
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gta-yellow" />
          </div>
        </div>

        {/* Player Name */}
        <div
          className={`mt-12 transition-all duration-700 delay-500 ${
            showMission ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2
            className="font-gta text-white tracking-wider"
            style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)" }}
          >
            {name}
          </h2>
          <p className="font-hud text-gta-cyan text-lg tracking-[0.2em] mt-2 gta-glow-cyan">
            {title}
          </p>
        </div>

        {/* Bio */}
        <div
          className={`mt-8 max-w-2xl mx-auto transition-all duration-700 delay-700 ${
            showMission ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="font-body text-gray-300 text-lg leading-relaxed">{bio}</p>
        </div>

        {/* Status Bar */}
        <div
          className={`mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6 transition-all duration-700 delay-900 ${
            showMission ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="hud-panel px-4 py-2 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gta-green animate-pulse" />
            <span className="font-hud text-xs text-gta-green tracking-widest">{status}</span>
          </div>
          <div className="hud-panel px-4 py-2">
            <span className="font-hud text-xs text-gta-gray tracking-wider">
              📍 {location}
            </span>
          </div>
        </div>

        {/* Social Links */}
        <div
          className={`mt-6 flex flex-wrap items-center justify-center gap-4 transition-all duration-700 delay-1000 ${
            showMission ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <a
            href={portfolioConfig.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hud-panel px-5 py-2.5 flex items-center gap-2.5 border border-gta-yellow/40 hover:border-gta-yellow hover:bg-gta-yellow/10 transition-all duration-300 group cursor-pointer"
          >
            <Github size={16} className="text-gta-yellow group-hover:scale-110 transition-transform" />
            <span className="font-hud text-xs text-white tracking-widest group-hover:text-gta-yellow transition-colors">
              GITHUB
            </span>
          </a>

          <a
            href={portfolioConfig.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hud-panel px-5 py-2.5 flex items-center gap-2.5 border border-gta-cyan/40 hover:border-gta-cyan hover:bg-gta-cyan/10 transition-all duration-300 group cursor-pointer"
          >
            <Linkedin size={16} className="text-gta-cyan group-hover:scale-110 transition-transform" />
            <span className="font-hud text-xs text-white tracking-widest group-hover:text-gta-cyan transition-colors">
              LINKEDIN
            </span>
          </a>
        </div>

        {/* Scroll Indicator */}
        <div
          className={`mt-16 transition-all duration-700 delay-1000 ${
            showMission ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <span className="font-hud text-[10px] text-gta-yellow tracking-[0.3em]">
              SCROLL TO BEGIN
            </span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-gta-yellow"
            >
              <path
                d="M12 5v14M5 12l7 7 7-7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Decorative corner brackets */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-gta-yellow/30" />
      <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-gta-yellow/30" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-gta-yellow/30" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-gta-yellow/30" />
    </section>
  );
}
