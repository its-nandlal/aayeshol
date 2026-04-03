"use client";

import { motion } from "motion/react";
import { howItWorks, SectionLabel } from "./shared";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <SectionLabel text="How it works" color="violet" />
          <h2
            className="text-4xl lg:text-5xl font-light text-white tracking-tight"
            style={{ fontFamily: "var(--font-funnel-display)" }}
          >
            Three steps to{" "}
            <em className="text-violet-300" style={{ fontStyle: "italic" }}>
              social success
            </em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-[52px] left-[36%] right-[36%] h-px bg-gradient-to-r from-white/10 via-white/5 to-white/10" />

          {howItWorks.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative p-7 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-white/[0.12] hover:bg-white/[0.05] transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/15 flex items-center justify-center group-hover:scale-105 group-hover:bg-indigo-500/15 transition-all duration-300">
                  <step.icon className="w-5 h-5 text-indigo-400" />
                </div>
                <span
                  className="text-[11px] font-semibold text-white/18 tracking-widest tabular-nums"
                  style={{ fontFamily: "var(--font-funnel-sans)" }}
                >
                  {step.step}
                </span>
              </div>

              <h3
                className="text-[16px] font-semibold text-white mb-2.5 tracking-tight"
                style={{ fontFamily: "var(--font-funnel-display)" }}
              >
                {step.title}
              </h3>
              <p
                className="text-[13px] text-white/38 leading-relaxed"
                style={{ fontFamily: "var(--font-funnel-sans)" }}
              >
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}