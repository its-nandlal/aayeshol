"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutDashboard,
  Plug,
  Sparkles,
  CalendarClock,
  Cog,
  PanelRightClose,
  LucideIcon,
  ChevronRight,
  Bot,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "@/../public/logo.svg";
import UserInfo from "./user-info";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  exact?: boolean; // exact=true → sirf is route pe active, children pe nahi
  badge?: string; // optional pill — jaise "AI"
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    label: "Accounts",
    href: "/dashboard/accounts",
    icon: Plug,
    exact: false,
  },
  {
    label: "New Post",
    href: "/dashboard/new",
    icon: Sparkles,
    exact: true,
    badge: "AI",
  },
  {
    label: "All Posts",
    href: "/dashboard/posts",
    icon: CalendarClock,
    exact: false,
  },
];

// Shared spring config — tumhari tuned values rakhi hain
const SPRING = {
  type: "spring",
  stiffness: 220,
  damping: 30,
  mass: 1,
} as const;

export default function NavDesktop() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <motion.aside
      initial={false}
      animate={{ width: isExpanded ? 240 : 72 }}
      transition={SPRING}
      className={cn(
        // "relative z-30 h-screen bg-linear-to-b from-indigo-950/15 to-blue-900/5",
        "relative z-30 h-screen bg-linear-to-b from-black via-indigo-500/40   to-black",
        "border-r border-slate-800/60 text-white",
        "flex-col shadow-2xl shadow-black/30 hidden lg:flex",
      )}
    >
      {/* Toggle button — tumhari style rakhi, rotate SPRING se sync */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        animate={{ rotate: isExpanded ? 0 : 180 }}
        transition={SPRING}
        className={cn(
          "absolute -right-2.5 top-9 z-50",
          "w-fit h-10 rounded-full bg-slate-800 border border-slate-700",
          "text-slate-300 hover:text-white hover:bg-slate-700 hover:border-slate-600",
          "shadow-lg shadow-black/30 cursor-pointer",
        )}
      >
        <ChevronRight size={16} className="opacity-50" />
      </motion.button>

      {/* Header — tumhari border-b aur h-20 rakhi */}
      <div className="h-16 xl:h-20 flex items-center gap-1.5 xl:gap-3 px-5 py-8 min-w-0 border-b border-slate-800/60">
        <div className="shrink-0">
          <Image
            src={Logo}
            alt="Aayeshol Logo"
            width={44}
            height={44}
            className="rounded-xl shadow-lg shadow-indigo-500/20 max-xl:w-8 h-8 object-cover"
            priority
          />
        </div>

        <AnimatePresence mode="wait">
          {isExpanded && (
            <motion.h1
              key="logo-label"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
              className="text-xl xl:text-2xl font-bold tracking-tight flex items-center bg-linear-to-r from-indigo-500 via-purple-500 to-blue-500 bg-clip-text text-transparent whitespace-nowrap"
            >
              Aayeshol
            </motion.h1>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Links — tumhari space-y-2 rakhi */}
      <nav className="flex-1 flex flex-col py-2 space-y-2">
        {navItems.map((item) => {
          // exact flag se Dashboard aur New Post sirf apne exact route pe active rahenge
          const isActive = item.exact
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                className={cn(
                  "relative group flex items-center gap-3 py-3 rounded-xl",
                  isExpanded ? "px-4" : "justify-center px-0",
                  isActive ? "text-white font-medium" : "text-slate-400",
                )}
                whileHover={{
                  x: isExpanded ? 4 : 0,
                  backgroundColor: isActive
                    ? "transparent"
                    : "rgba(51,65,85,0.4)",
                }}
                transition={SPRING}
              >
                {/* Active Background Pill */}
                {isActive && (
                  <motion.div
                    layoutId="active-nav-pill"
                    className="absolute inset-0 bg-linear-to-r from-indigo-600/10 via-purple-600/10 to-transparent rounded-xl -z-10"
                    transition={SPRING}
                  />
                )}

                {/* Left Side Vertical Slider — color & animation UNCHANGED */}
                {isActive && (
                  <motion.div
                    layoutId="active-slider"
                    className="absolute left-0 top-0 bottom-0 w-1.5 bg-linear-to-t from-purple-600 via-indigo-400 to-blue-600 rounded-r-md shadow-[0_0_8px_1px_rgba(99,102,241,0.4)]"
                    initial={false}
                    transition={SPRING}
                  />
                )}

                <Icon icon={item.icon} isActive={isActive} />

                <AnimatePresence mode="wait">
                  {isExpanded && (
                    <motion.span
                      key={`label-${item.href}`}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -4 }}
                      transition={{ duration: 0.16, ease: [0.4, 0, 0.2, 1] }}
                      className="flex items-center gap-2 text-sm whitespace-nowrap"
                    >
                      {item.label}
                      {/* Badge — collapsed hone par hide ho jaata hai */}
                      {item.badge && (
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 leading-none">
                          {item.badge}
                        </span>
                      )}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* User Info Section */}
      <div className="px-4 pb-6 bg-indigo-900/20 border-t border-slate-800/60">
        <UserInfo panel={isExpanded} />
      </div>
    </motion.aside>
  );
}

// Icon — fixed size 20, hover micro-interaction
function Icon({
  icon: IconComponent,
  isActive,
}: {
  icon: LucideIcon;
  isActive: boolean;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.15, rotate: 5 }}
      transition={{ type: "spring", stiffness: 380, damping: 20 }}
      className="shrink-0"
    >
      <IconComponent
        size={20}
        className={cn(
          isActive
            ? "text-indigo-400"
            : "text-slate-400 group-hover:text-slate-200",
        )}
      />
    </motion.div>
  );
}
