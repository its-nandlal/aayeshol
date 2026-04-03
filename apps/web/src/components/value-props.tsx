"use client";

import { motion } from "motion/react";
import { Sparkles, Wand2 } from "lucide-react";
import { valueBullets, SectionLabel, AppleWindow } from "./shared";

export default function ValueProp() {
  return (
    <section className="py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel text="Why Aayeshol" color="pink" />
            <h2
              className="text-4xl lg:text-5xl font-light text-white tracking-tight leading-tight mb-6"
              style={{ fontFamily: "var(--font-funnel-display)" }}
            >
              Save time.<br />
              <em className="text-pink-300" style={{ fontStyle: "italic" }}>
                Grow faster.
              </em>
            </h2>
            <p
              className="text-[15px] text-white/38 leading-relaxed mb-10 font-light"
              style={{ fontFamily: "var(--font-funnel-sans)" }}
            >
              Aayeshol understands your brand voice and generates posts that resonate — not just fill a calendar.
            </p>

            <div className="space-y-4">
              {valueBullets.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="flex items-center gap-3.5"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${item.color}12`, border: `1px solid ${item.color}22` }}
                  >
                    <item.icon className="w-4 h-4" style={{ color: item.color }} />
                  </div>
                  <span
                    className="text-[14px] text-white/60"
                    style={{ fontFamily: "var(--font-funnel-sans)" }}
                  >
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — AI generator mockup */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <AppleWindow title="AI Content Generator">
              <div className="p-5 bg-[#0a0a12] min-h-[320px]">

                {/* Prompt */}
                <div className="mb-4 p-4 rounded-xl bg-white/[0.04] border border-white/[0.07]">
                  <p
                    className="text-[11px] text-white/25 mb-2 uppercase tracking-wide"
                    style={{ fontFamily: "var(--font-funnel-sans)" }}
                  >
                    Prompt
                  </p>
                  <p
                    className="text-[13px] text-white/65 leading-relaxed"
                    style={{ fontFamily: "var(--font-funnel-sans)" }}
                  >
                    Share our new AI-powered marketing suite for small businesses
                  </p>
                </div>

                {/* Tone selector */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {["Professional", "Casual", "Witty"].map((tone, i) => (
                    <div
                      key={i}
                      className={`px-3 py-2 rounded-lg text-[12px] text-center border transition-colors cursor-pointer ${
                        i === 0
                          ? "bg-indigo-500/15 text-indigo-300 border-indigo-500/25"
                          : "bg-white/[0.03] text-white/28 border-white/[0.06] hover:border-white/[0.1]"
                      }`}
                      style={{ fontFamily: "var(--font-funnel-sans)" }}
                    >
                      {tone}
                    </div>
                  ))}
                </div>

                {/* Generate button */}
                <button
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-[13px] font-medium mb-5 flex items-center justify-center gap-2 hover:from-indigo-500 hover:to-violet-500 transition-all shadow-lg shadow-indigo-500/20"
                  style={{ fontFamily: "var(--font-funnel-sans)" }}
                >
                  <Wand2 className="w-4 h-4" />
                  Generate Content
                </button>

                {/* Output */}
                <div className="p-4 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/15">
                  <div className="flex items-center gap-2 mb-2.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span
                      className="text-[11px] text-emerald-400 font-medium tracking-wide"
                      style={{ fontFamily: "var(--font-funnel-sans)" }}
                    >
                      AI Generated
                    </span>
                  </div>
                  <p
                    className="text-[13px] text-white/60 leading-relaxed"
                    style={{ fontFamily: "var(--font-funnel-sans)" }}
                  >
                    🚀 Excited to announce our AI-powered marketing suite — built for small businesses ready to scale. Turn strategy into action, instantly. ✨
                  </p>
                </div>

              </div>
            </AppleWindow>
          </motion.div>

        </div>
      </div>
    </section>
  );
}