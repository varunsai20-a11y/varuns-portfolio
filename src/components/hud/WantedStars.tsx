"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";

interface WantedStarsProps {
  level: number;
  maxStars?: number;
}

export default function WantedStars({ level, maxStars = 5 }: WantedStarsProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxStars }, (_, i) => (
        <div
          key={i}
          className={`transition-all duration-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          }`}
          style={{ transitionDelay: `${i * 120}ms` }}
        >
          <Star
            size={20}
            className={`${
              i < level
                ? "fill-gta-yellow text-gta-yellow wanted-star"
                : "fill-none text-gray-700 wanted-star empty"
            }`}
            style={
              i < level
                ? {
                    filter: `drop-shadow(0 0 6px rgba(245, 197, 24, ${0.5 + i * 0.1}))`,
                  }
                : {}
            }
          />
        </div>
      ))}
    </div>
  );
}
