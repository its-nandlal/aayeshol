"use client";
import { useOutsideClick } from "@/hooks/use-outside-click";
import AbboutSettings from "@/modules/settings/components/abbout.settings";
import UserSettings from "@/modules/settings/components/user.settings";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

type TabKey = "profile" | "about";

const tabs: { key: TabKey; label: string }[] = [
  { key: "profile", label: "Profile" },
  { key: "about", label: "About" },
];

export default function Settings() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabKey>("profile");

  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  const ref = useOutsideClick(handleClose);

  return (
    <section className="fixed inset-0 flex items-center justify-center bg-black/40">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.98 }}
        transition={{ ease: "easeInOut", duration: 0.4 }}
        className="relative w-250 h-150 rounded-2xl"
      >
        {/* Background */}
        <div className="absolute inset-0 -z-1 bg-linear-to-b from-black/60 via-indigo-700/60 via-40% to-indigo-700/60 backdrop-blur-md border border-indigo-800/60 outline outline-slate-700/60 shadow-[inset_0px_0px_15px_10px] shadow-indigo-500/10 rounded-2xl" />

        {/* Heading */}
        <div className="w-full p-6 flex items-center justify-between border-b border-slate-700/70">
          <h3 className="text-lg">Setting</h3>
          <button
            onClick={handleClose}
            className="w-6 h-6 rounded-full hover:bg-red-700 cursor-pointer"
          >
            <X className="w-4.5 m-auto" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="p-2 flex items-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative px-8 py-2 rounded-full cursor-pointer text-sm font-medium border border-indigo-500/25 transition-colors duration-200
                ${
                  activeTab === tab.key
                    ? "text-white"
                    : "text-slate-300 hover:bg-indigo-600/20 hover:text-white"
                }`}
            >
              {/* Active pill background */}
              {activeTab === tab.key && (
                <motion.span
                  layoutId="active-tab-pill"
                  className="absolute inset-0 rounded-full bg-indigo-600/50 border border-indigo-500/40"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content with AnimatePresence */}
        <div className="overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
            >
              {activeTab === "profile" && <UserSettings />}
              {activeTab === "about" && <AbboutSettings />}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}