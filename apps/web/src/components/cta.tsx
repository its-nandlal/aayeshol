"use client";

import { motion } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { SectionLabel } from "./shared";

const guarantees = ["No credit card required", "Free forever plan", "Cancel anytime"];

export default function CTA() {
  return (
    <section id="pricing" className="py-28 lg:py-36">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel text="Get started" color="indigo" />

          <h2
            className="text-5xl lg:text-6xl font-light text-white tracking-tight leading-tight mb-6"
            style={{ fontFamily: "var(--font-funnel-display)" }}
          >
            Ready to create content<br />
            <em className="text-indigo-300" style={{ fontStyle: "italic" }}>
              that converts?
            </em>
          </h2>

          <p
            className="text-[16px] text-white/38 max-w-xl mx-auto mb-10 font-light leading-relaxed"
            style={{ fontFamily: "var(--font-funnel-sans)" }}
          >
            Join thousands of creators using Aayeshol to grow their social media presence with AI.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
            <Link href="/auth">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 h-12 px-8 rounded-xl bg-white text-[#06060f] text-[14px] font-semibold hover:bg-white/90 transition-all shadow-[0_0_60px_rgba(255,255,255,0.14)] group"
                style={{ fontFamily: "var(--font-funnel-sans)" }}
              >
                Start for free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </motion.button>
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            {guarantees.map((t) => (
              <span
                key={t}
                className="flex items-center gap-1.5 text-[12px] text-white/28"
                style={{ fontFamily: "var(--font-funnel-sans)" }}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-white/18" />
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}