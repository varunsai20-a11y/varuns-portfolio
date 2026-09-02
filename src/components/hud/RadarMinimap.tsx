"use client";

import { useEffect, useState, useRef } from "react";
import { portfolioConfig } from "@/config/portfolioConfig";

interface RadarMinimapProps {
  scrollProgress: number;
  activeSection: string;
}

export default function RadarMinimap({ scrollProgress, activeSection }: RadarMinimapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { radarLocation } = portfolioConfig.hud;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 160;
    const center = size / 2;
    const radius = 60;

    canvas.width = size;
    canvas.height = size;

    let frame = 0;

    const draw = () => {
      ctx.clearRect(0, 0, size, size);

      // Background circle
      ctx.beginPath();
      ctx.arc(center, center, radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
      ctx.fill();
      ctx.strokeStyle = "rgba(245, 197, 24, 0.5)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Grid lines
      ctx.strokeStyle = "rgba(0, 212, 255, 0.15)";
      ctx.lineWidth = 0.5;
      for (let i = -radius; i <= radius; i += 15) {
        ctx.beginPath();
        ctx.moveTo(center + i, center - radius);
        ctx.lineTo(center + i, center + radius);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(center - radius, center + i);
        ctx.lineTo(center + radius, center + i);
        ctx.stroke();
      }

      // Cross lines
      ctx.strokeStyle = "rgba(0, 212, 255, 0.3)";
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(center - radius, center);
      ctx.lineTo(center + radius, center);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(center, center - radius);
      ctx.lineTo(center, center + radius);
      ctx.stroke();

      // Sweep line (rotating)
      const angle = (frame * 0.02) % (Math.PI * 2);
      const gradient = ctx.createConicGradient(angle, center, center);
      gradient.addColorStop(0, "rgba(0, 212, 255, 0.4)");
      gradient.addColorStop(0.15, "rgba(0, 212, 255, 0)");
      gradient.addColorStop(1, "rgba(0, 212, 255, 0)");

      ctx.beginPath();
      ctx.arc(center, center, radius - 1, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Progress dot (rotates with scroll)
      const dotAngle = scrollProgress * Math.PI * 2 - Math.PI / 2;
      const dotX = center + Math.cos(dotAngle) * (radius * 0.7);
      const dotY = center + Math.sin(dotAngle) * (radius * 0.7);

      ctx.beginPath();
      ctx.arc(dotX, dotY, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#F5C518";
      ctx.fill();
      ctx.strokeStyle = "rgba(245, 197, 24, 0.6)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Trail dots
      for (let i = 1; i <= 5; i++) {
        const trailAngle = dotAngle - i * 0.08;
        const tx = center + Math.cos(trailAngle) * (radius * 0.7);
        const ty = center + Math.sin(trailAngle) * (radius * 0.7);
        ctx.beginPath();
        ctx.arc(tx, ty, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 197, 24, ${0.5 - i * 0.1})`;
        ctx.fill();
      }

      // Center pulse
      const pulseRadius = 3 + Math.sin(frame * 0.05) * 1;
      ctx.beginPath();
      ctx.arc(center, center, pulseRadius, 0, Math.PI * 2);
      ctx.fillStyle = "#00D4FF";
      ctx.fill();

      frame++;
      requestAnimationFrame(draw);
    };

    const animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animId);
  }, [scrollProgress]);

  return (
    <div className="hud-panel p-2 flex flex-col items-center gap-1">
      <canvas ref={canvasRef} className="rounded-full" />
      <div className="text-center">
        <p className="text-[10px] font-hud text-gta-yellow tracking-widest uppercase">
          {radarLocation}
        </p>
        <p className="text-[9px] font-hud text-gta-cyan tracking-wider">
          {activeSection}
        </p>
      </div>
    </div>
  );
}
