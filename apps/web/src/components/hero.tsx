"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Play, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import PrimaryButton from "./ui/primary-button";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y       = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);

  return (
    <motion.div ref={ref} style={{ y, opacity }} className="relative pt-36 pb-24 lg:pt-52 lg:pb-36">
      <div className="max-w-5xl mx-auto px-6 text-center">

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08 }}
          className="text-5xl sm:text-6xl lg:text-[80px] font-funnel-display leading-[1.07] tracking-tight text-white mb-6"
        >
          Create content that{" "}
          <em className="not-italic text-indigo-300" style={{ fontStyle: "italic" }}>
            actually
          </em>
          <br />
          <span className="font-semibold">resonates.</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="max-w-xl mx-auto text-[16px] text-white/38 leading-relaxed mb-10 font-light"
          style={{ fontFamily: "var(--font-funnel-sans)" }}
        >
          AI-powered social media posts that match your brand voice — generated in seconds, published across all platforms.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16"
        >
          <Link href="/auth">
            <PrimaryButton
              className="flex items-center gap-2 h-11 px-7 rounded-xl bg-white text-neutral-200 text-[14px] text-shadow-lg text-shadow-neutral-100/30 font-semibold hover:bg-white/90 transition-all shadow-[0_0_50px_rgba(255,255,255,0.13)] group"
            >
              Start for free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </PrimaryButton>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}