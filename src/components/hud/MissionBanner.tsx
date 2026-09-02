"use client";

import { useEffect, useState } from "react";
import { Crosshair } from "lucide-react";

interface MissionBannerProps {
  activeSection: string;
}

const SECTION_LABELS: Record<string, string> = {
  hero: "MISSION BRIEFING",
  arsenal: "ARMORY — SELECT YOUR LOADOUT",
  heists: "PLANNING THE HEIST",
  trophies: "SAFEHOUSE — TROPHY ROOM",
  waypoints: "NAVIGATE WAYPOINTS",
  safehouse: "CONTACT — SECURE LINE",
};

export default function MissionBanner({ activeSection }: MissionBannerProps) {
  const [displayLabel, setDisplayLabel] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const label = SECTION_LABELS[activeSection] || activeSection.toUpperCase();
    setIsVisible(false);
    const timer = setTimeout(() => {
      setDisplayLabel(label);
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [activeSection]);

  return (
    <div
      className={`hud-panel px-4 py-2 flex items-center gap-2 transition-all duration-300 ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
      }`}
    >
      <Crosshair size={14} className="text-gta-red" />
      <div>
        <p className="text-[10px] font-hud text-gta-gray tracking-widest">OBJECTIVE</p>
        <p className="text-xs font-hud text-gta-yellow tracking-wider font-bold">
          {displayLabel}
        </p>
      </div>
    </div>
  );
}
