"use client";

import { motion } from "motion/react";
import { platforms, SectionLabel } from "./shared";

export default function Platforms() {
  return (
    <section className="py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <SectionLabel text="Platforms" color="emerald" />
          <h2
            className="text-4xl lg:text-5xl font-light text-white tracking-tight"
            style={{ fontFamily: "var(--font-funnel-display)" }}
          >
            Connect your{" "}
            <em className="text-emerald-300" style={{ fontStyle: "italic" }}>
              favourite platforms
            </em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {platforms.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ scale: p.status === "available" ? 1.04 : 1 }}
              className={`relative flex flex-col items-center gap-3 p-6 rounded-2xl border transition-all duration-300 ${
                p.status === "available"
                  ? "bg-white/[0.05] border-white/[0.12] hover:border-white/20 hover:bg-white/[0.07]"
                  : "bg-white/[0.02] border-white/[0.05] opacity-45"
              }`}
            >
              {p.status === "coming" && (
                <span
                  className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400/70 text-[9px] font-medium tracking-wide"
                  style={{ fontFamily: "var(--font-funnel-sans)" }}
                >
                  Soon
                </span>
              )}

              <p.icon
                className="w-9 h-9"
                style={{ color: p.status === "available" ? p.color : "rgba(255,255,255,0.2)" }}
              />
              <span
                className={`text-[13px] font-medium ${p.status === "available" ? "text-white/70" : "text-white/25"}`}
                style={{ fontFamily: "var(--font-funnel-sans)" }}
              >
                {p.name}
              </span>

              {p.status === "available" && (
                <span
                  className="flex items-center gap-1 text-[10px] text-emerald-400/70"
                  style={{ fontFamily: "var(--font-funnel-sans)" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Available
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}