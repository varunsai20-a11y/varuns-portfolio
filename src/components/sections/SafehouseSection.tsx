"use client";

import { useRef, useEffect, useState } from "react";
import { portfolioConfig } from "@/config/portfolioConfig";
import { Phone, Mail, MapPin, ExternalLink, Smartphone, Signal } from "lucide-react";

export default function SafehouseSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"call" | "text" | "mail">("call");
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

  const { personal } = portfolioConfig;

  const contactActions = [
    {
      icon: Phone,
      label: "CALL",
      value: personal.phone,
      href: `tel:${personal.phone}`,
      color: "text-gta-green",
    },
    {
      icon: Mail,
      label: "EMAIL",
      value: personal.email,
      href: `mailto:${personal.email}`,
      color: "text-gta-cyan",
    },
    {
      icon: ExternalLink,
      label: "GITHUB",
      value: "github.com/varunsai",
      href: personal.github,
      color: "text-gta-yellow",
    },
    {
      icon: ExternalLink,
      label: "LINKEDIN",
      value: "linkedin.com/in/varun-sai",
      href: personal.linkedin,
      color: "text-gta-blue",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="safehouse"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24"
    >
      {/* Section Title */}
      <div
        className={`text-center mb-16 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="font-hud text-xs text-gta-orange tracking-[0.4em] mb-2">SECURE LINE</p>
        <h2 className="section-title text-gta-yellow gta-glow">SAFEHOUSE</h2>
        <p className="font-body text-gray-400 mt-2 text-lg">
          Reach out via in-game communication
        </p>
      </div>

      {/* Phone Mockup */}
      <div
        className={`relative transition-all duration-700 delay-200 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      >
        <div className="phone-frame w-[320px] sm:w-[360px]">
          {/* Phone Notch */}
          <div className="w-32 h-6 bg-black rounded-b-2xl mx-auto relative z-10" />

          {/* Phone Screen */}
          <div className="bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] p-6 min-h-[500px]">
            {/* Status Bar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Signal size={12} className="text-gta-green" />
                <span className="font-hud text-[9px] text-gta-gray">LIFEINVADER</span>
              </div>
              <span className="font-hud text-[9px] text-gta-gray">92%</span>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              {(["call", "text", "mail"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 font-hud text-[10px] tracking-wider transition-all ${
                    activeTab === tab
                      ? "bg-gta-yellow text-black font-bold"
                      : "bg-gta-dark text-gta-gray border border-gta-yellow/20"
                  }`}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Contact List */}
            <div className="space-y-3">
              {contactActions.map((action, idx) => {
                const Icon = action.icon;
                return (
                  <a
                    key={action.label}
                    href={action.href}
                    target={action.href.startsWith("http") ? "_blank" : undefined}
                    rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={`block hud-panel p-4 hover:border-gta-yellow/50 transition-all duration-300 ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                    style={{ transitionDelay: `${idx * 100 + 500}ms` }}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center bg-gta-dark border border-gta-yellow/20`}
                      >
                        <Icon size={16} className={action.color} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-hud text-[9px] text-gta-gray tracking-widest">
                          {action.label}
                        </p>
                        <p className={`font-hud text-sm ${action.color} truncate`}>
                          {action.value}
                        </p>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Quick Action */}
            <div className="mt-8">
              <a
                href={`mailto:${personal.email}`}
                className="gta-btn w-full text-center block text-sm py-3"
              >
                <Smartphone size={14} className="inline mr-2" />
                SEND MESSAGE
              </a>
            </div>

            {/* Location */}
            <div className="mt-6 text-center">
              <div className="flex items-center justify-center gap-2">
                <MapPin size={12} className="text-gta-red" />
                <span className="font-hud text-[10px] text-gta-gray tracking-wider">
                  {personal.location}
                </span>
              </div>
            </div>
          </div>

          {/* Home button */}
          <div className="w-10 h-10 border-2 border-gray-600 rounded-full mx-auto mb-4 mt-2" />
        </div>
      </div>

      {/* Footer */}
      <div
        className={`mt-16 text-center transition-all duration-700 delay-700 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="h-px w-32 bg-gradient-to-r from-transparent via-gta-yellow to-transparent mx-auto mb-6" />
        <p className="font-gta text-2xl text-gta-yellow/50">GAME OVER</p>
        <p className="font-hud text-[10px] text-gta-gray tracking-[0.4em] mt-2">
          © 2026 {personal.name.toUpperCase()} — ALL RIGHTS RESERVED
        </p>
      </div>
    </section>
  );
}
