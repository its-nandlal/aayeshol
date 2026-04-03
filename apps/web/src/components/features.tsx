"use client";

import { motion } from "motion/react";
import { features, SectionLabel } from "./shared";

export default function Features() {
  return (
    <section id="features" className="py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <SectionLabel text="Features" color="indigo" />
          <h2
            className="text-4xl lg:text-5xl font-light text-white tracking-tight leading-tight max-w-lg"
            style={{ fontFamily: "var(--font-funnel-display)" }}
          >
            Everything you need to{" "}
            <em className="text-indigo-300" style={{ fontStyle: "italic" }}>
              grow faster
            </em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:bg-white/[0.055] hover:border-white/[0.12] transition-all duration-300 cursor-default overflow-hidden"
            >
              {/* Accent shimmer top on hover */}
              <div
                className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${f.accent}55, transparent)` }}
              />

              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${f.accent}15`, border: `1px solid ${f.accent}22` }}
              >
                <f.icon className="w-5 h-5" style={{ color: f.accent }} />
              </div>

              <h3
                className="text-[15px] font-semibold text-white mb-2 tracking-tight"
                style={{ fontFamily: "var(--font-funnel-display)" }}
              >
                {f.title}
              </h3>
              <p
                className="text-[13px] text-white/38 leading-relaxed"
                style={{ fontFamily: "var(--font-funnel-sans)" }}
              >
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}