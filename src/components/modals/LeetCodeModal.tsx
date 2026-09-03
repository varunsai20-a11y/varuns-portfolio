"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, RefreshCw, Trophy, Flame, CheckCircle2, Award, Zap } from "lucide-react";

interface LeetCodeStats {
  status: string;
  username: string;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  acceptanceRate?: number;
  ranking?: number;
  profileUrl: string;
  lastUpdated?: string;
  isFallback?: boolean;
}

interface LeetCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  username?: string;
}

export default function LeetCodeModal({
  isOpen,
  onClose,
  username = "varun_s04",
}: LeetCodeModalProps) {
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(`/api/leetcode?username=${username}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error("Error fetching LeetCode stats:", err);
      setError(true);
      // Default initial state
      setStats({
        status: "success",
        username,
        totalSolved: 209,
        easySolved: 71,
        mediumSolved: 113,
        hardSolved: 25,
        acceptanceRate: 64.5,
        ranking: 806011,
        profileUrl: `https://leetcode.com/u/${username}/`,
        isFallback: true,
      });
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    if (isOpen) {
      fetchStats();
    }
  }, [isOpen, fetchStats]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const total = stats?.totalSolved ?? 209;
  const easy = stats?.easySolved ?? 71;
  const medium = stats?.mediumSolved ?? 113;
  const hard = stats?.hardSolved ?? 25;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-2xl bg-[#0d0f14]/95 border border-gta-yellow/40 border-t-4 border-t-gta-yellow rounded-2xl p-6 sm:p-8 shadow-2xl shadow-gta-yellow/10 text-white overflow-hidden max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gta-yellow/30"
        >
          {/* Glowing background ambient lights */}
          <div className="absolute -top-24 -right-24 w-60 h-60 bg-gta-orange/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-gta-yellow/15 rounded-full blur-3xl pointer-events-none" />

          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gta-orange/30 to-gta-yellow/20 border border-gta-yellow/40 flex items-center justify-center text-gta-yellow shadow-inner">
                <Flame size={26} className="text-gta-orange animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-hud text-[10px] text-gta-orange tracking-widest uppercase font-bold">
                    LEETCODE LIVE FEED
                  </span>
                  <span className="inline-flex items-center gap-1 font-mono text-[9px] bg-gta-green/20 text-gta-green px-2 py-0.5 rounded-full border border-gta-green/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-gta-green animate-ping" />
                    LIVE
                  </span>
                </div>
                <h3 className="font-gta text-2xl text-gta-yellow gta-glow leading-none mt-1">
                  @{username}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={fetchStats}
                disabled={loading}
                title="Refresh Live Data"
                className="p-2.5 rounded-xl bg-black/50 hover:bg-gta-yellow/20 text-gta-yellow border border-gta-yellow/30 transition-all cursor-pointer disabled:opacity-50"
              >
                <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              </button>
              <button
                onClick={onClose}
                title="Close"
                className="p-2.5 rounded-xl bg-black/50 hover:bg-gta-red/20 text-gray-400 hover:text-gta-red border border-white/15 hover:border-gta-red/40 transition-all cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Main Stat Banner */}
          <div className="bg-gradient-to-r from-black/80 via-black/60 to-black/80 border border-gta-yellow/30 rounded-xl p-5 mb-6 shadow-inner relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gta-yellow/10 border-2 border-gta-yellow flex flex-col items-center justify-center shrink-0 shadow-lg">
                <Trophy size={22} className="text-gta-yellow" />
                <span className="font-hud text-[9px] text-gta-yellow tracking-tighter mt-0.5">
                  RANK #{stats?.ranking ? stats.ranking.toLocaleString() : "806,011"}
                </span>
              </div>
              <div>
                <p className="font-hud text-xs text-gta-gray tracking-wider">TOTAL PROBLEMS SOLVED</p>
                <div className="flex items-baseline gap-2">
                  <span className="font-gta text-4xl sm:text-5xl text-white font-bold tracking-tight">
                    {total}
                  </span>
                  <span className="font-hud text-sm text-gta-yellow font-bold">/ 3,379+</span>
                </div>
              </div>
            </div>

            <a
              href={`https://leetcode.com/u/${username}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3 bg-gradient-to-r from-gta-yellow to-gta-orange hover:from-gta-orange hover:to-gta-yellow text-black font-hud text-xs tracking-wider rounded-xl font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-gta-yellow/20"
            >
              <span>LEETCODE PROFILE</span>
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Difficulty Cards */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {/* Easy */}
            <div className="bg-black/60 border border-gta-green/30 rounded-xl p-3.5 flex flex-col items-center text-center">
              <span className="font-hud text-[10px] text-gta-green tracking-widest font-bold">EASY</span>
              <span className="font-gta text-2xl text-gta-green mt-1">{easy}</span>
              <div className="w-full bg-black/80 h-1.5 rounded-full overflow-hidden mt-2 border border-gta-green/20">
                <div
                  className="bg-gta-green h-full rounded-full"
                  style={{ width: `${Math.min((easy / 150) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* Medium */}
            <div className="bg-black/60 border border-gta-yellow/30 rounded-xl p-3.5 flex flex-col items-center text-center">
              <span className="font-hud text-[10px] text-gta-yellow tracking-widest font-bold">MEDIUM</span>
              <span className="font-gta text-2xl text-gta-yellow mt-1">{medium}</span>
              <div className="w-full bg-black/80 h-1.5 rounded-full overflow-hidden mt-2 border border-gta-yellow/20">
                <div
                  className="bg-gta-yellow h-full rounded-full"
                  style={{ width: `${Math.min((medium / 200) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* Hard */}
            <div className="bg-black/60 border border-gta-red/30 rounded-xl p-3.5 flex flex-col items-center text-center">
              <span className="font-hud text-[10px] text-gta-red tracking-widest font-bold">HARD</span>
              <span className="font-gta text-2xl text-gta-red mt-1">{hard}</span>
              <div className="w-full bg-black/80 h-1.5 rounded-full overflow-hidden mt-2 border border-gta-red/20">
                <div
                  className="bg-gta-red h-full rounded-full"
                  style={{ width: `${Math.min((hard / 50) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Live Badge Image Preview Section */}
          <div className="bg-black/50 border border-white/10 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="font-hud text-xs text-gta-cyan tracking-wider flex items-center gap-1.5">
                <Award size={15} />
                LIVE AUTO-UPDATING STAT CARD
              </span>
              <span className="font-hud text-[9px] text-gta-gray">REALTIME BADGE</span>
            </div>

            <div className="flex justify-center items-center bg-black/80 p-3 rounded-lg border border-white/5 overflow-hidden">
              <img
                src={`https://leetcode-badge-showcase.vercel.app/api?username=${username}&theme=dark`}
                alt="LeetCode Live Stats Card"
                className="max-w-full h-auto rounded shadow-lg transition-all hover:scale-[1.02]"
                onError={(e) => {
                  // Fallback stats image generator if showcasing API service is unreachable
                  (e.target as HTMLImageElement).src = `https://leetcode-stats-badge.herokuapp.com/${username}`;
                }}
              />
            </div>
          </div>

          {/* Footer Info */}
          <div className="flex items-center justify-between text-[10px] font-hud text-gta-gray border-t border-white/10 pt-4">
            <span className="flex items-center gap-1">
              <CheckCircle2 size={13} className="text-gta-green" />
              VERIFIED LEETCODE TROPHY
            </span>
            <span>UPDATES AUTOMATICALLY WITH EACH SOLVED QUESTION</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
