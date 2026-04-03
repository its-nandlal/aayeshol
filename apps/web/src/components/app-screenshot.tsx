"use client";

import { motion } from "motion/react";
import { Sparkles, MessageSquare } from "lucide-react";
import { AppleWindow } from "./shared";

const mockPosts = [
  { title: "Product launch announcement 🚀", platform: "LinkedIn", time: "2h ago", status: "published" },
  { title: "Building in public: Day 45",     platform: "X",         time: "5h ago", status: "published" },
  { title: "Behind the scenes of our campaign", platform: "LinkedIn", time: "1d ago",  status: "draft"     },
];

const mockStats = [
  { label: "Published",  value: "142",   change: "+12 this week", color: "#6366f1" },
  { label: "Engagement", value: "89.2%", change: "+5.1%",         color: "#10b981" },
  { label: "Reach",      value: "45.2K", change: "+2.3K",         color: "#f59e0b" },
];

const barHeights = [30, 55, 40, 70, 50, 85, 60, 78, 45, 90, 65, 88];

export default function AppScreenshot() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8 }}
      className="relative pb-24"
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Glow */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-3/4 h-48 bg-indigo-600/12 blur-[80px] rounded-full pointer-events-none" />

        <AppleWindow title="Aayeshol — Dashboard">
          <div className="p-5 bg-[#0a0a12]">

            {/* Header */}
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-white" style={{ fontFamily: "var(--font-funnel-display)" }}>
                    Dashboard
                  </p>
                  <p className="text-[11px] text-white/30" style={{ fontFamily: "var(--font-funnel-sans)" }}>
                    Welcome back, Creator
                  </p>
                </div>
              </div>
              <div className="h-7 px-3 rounded-lg bg-indigo-500/15 border border-indigo-500/20 text-indigo-400 text-[11px] font-medium flex items-center cursor-pointer hover:bg-indigo-500/20 transition-colors">
                + New Post
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {mockStats.map((s, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                  <p className="text-[11px] text-white/35 mb-1.5" style={{ fontFamily: "var(--font-funnel-sans)" }}>
                    {s.label}
                  </p>
                  <p className="text-[18px] font-semibold text-white leading-none mb-1" style={{ fontFamily: "var(--font-funnel-display)" }}>
                    {s.value}
                  </p>
                  <p className="text-[10px]" style={{ color: s.color, fontFamily: "var(--font-funnel-sans)" }}>
                    {s.change}
                  </p>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.05] mb-3">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[12px] text-white/40" style={{ fontFamily: "var(--font-funnel-sans)" }}>
                  Post Performance
                </p>
                <div className="flex gap-2">
                  {["LinkedIn", "X"].map((p) => (
                    <span key={p} className="text-[10px] text-white/25 px-2 py-0.5 rounded bg-white/5">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-end gap-1.5 h-20">
                {barHeights.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.04 }}
                    className="flex-1 rounded-t-sm"
                    style={{ background: "linear-linear(to top, rgba(99,102,241,0.55), rgba(139,92,246,0.75))" }}
                  />
                ))}
              </div>
            </div>

            {/* Activity */}
            <div className="space-y-1">
              {mockPosts.map((p, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/[0.03] transition-colors">
                  <div className="w-7 h-7 rounded-lg bg-white/[0.05] flex items-center justify-center shrink-0">
                    <MessageSquare className="w-3.5 h-3.5 text-white/35" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] text-white/65 truncate" style={{ fontFamily: "var(--font-funnel-sans)" }}>
                      {p.title}
                    </p>
                    <p className="text-[10px] text-white/25" style={{ fontFamily: "var(--font-funnel-sans)" }}>
                      {p.platform} · {p.time}
                    </p>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full border ${
                      p.status === "published"
                        ? "border-emerald-500/20 text-emerald-400 bg-emerald-500/8"
                        : "border-white/10 text-white/25 bg-white/5"
                    }`}
                    style={{ fontFamily: "var(--font-funnel-sans)" }}
                  >
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </AppleWindow>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-white/25 text-[12px] mt-5 tracking-wide"
          style={{ fontFamily: "var(--font-funnel-sans)" }}
        >
          Powerful dashboard to manage all your social media content
        </motion.p>
      </div>
    </motion.div>
  );
}