"use client";

import { motion } from "motion/react";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

const navLinks = ["Features", "How it Works", "Pricing"];

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-4">
        <div className="flex items-center justify-between h-14 px-5 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.4 }}
              className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30"
            >
              <Sparkles className="w-4 h-4 text-white" />
            </motion.div>
            <span
              className="text-[15px] font-semibold tracking-tight text-white"
              style={{ fontFamily: "var(--font-funnel-display)" }}
            >
              Aayeshol
            </span>
          </Link>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 + 0.2 }}
                className="text-[13px] text-white/45 hover:text-white/90 transition-colors duration-200 tracking-wide"
                style={{ fontFamily: "var(--font-funnel-sans)" }}
              >
                {item}
              </motion.a>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Link href="/auth">
              <button
                className="flex items-center gap-1.5 h-8 px-4 rounded-lg bg-white text-[#06060f] text-[13px] font-semibold hover:bg-white/90 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] cursor-pointer"
              >
                Get started
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>

        </div>
      </div>
    </motion.nav>
  );
}