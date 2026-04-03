"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutDashboard,
  Plug,
  Sparkles,
  CalendarClock,
  BadgeCheck,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/modules/auth/store/store.auth";
import PrimaryButton from "@/components/ui/primary-button";
import { useCallback, useEffect, useRef, useState } from "react";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  exact?: boolean;
  badge?: string;
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
    label: "Posts",
    href: "/dashboard/posts",
    icon: CalendarClock,
    exact: false,
  },
];

const SPRING = {
  type: "spring",
  stiffness: 260,
  damping: 28,
  mass: 0.8,
} as const;

const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [callback]);
  return ref;
};

export default function NavMobile() {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const [userCardOpen, setUserCardOpen] = useState(false);
  const handleClose = useCallback(() => setUserCardOpen(false), []);
  const ref = useOutsideClick(handleClose);

  useEffect(() => {
    document.body.style.overflow = userCardOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [userCardOpen]);

  return (
    <>
      {/* User Card Popup — slides up from bottom */}
      <AnimatePresence>
        {userCardOpen && user && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={handleClose}
            />

            {/* Card */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={SPRING}
              className={cn(
                "fixed bottom-20 left-4 right-4 z-50 lg:hidden",
                "bg-linear-to-t from-indigo-950 to-black",
                "border border-indigo-800/60 rounded-2xl p-5",
                "shadow-xl shadow-indigo-900/30",
              )}
            >
              {/* Avatar + Name row */}
              <div className="flex items-center gap-4 mb-4">
                <motion.div
                  layoutId="mobile-user-img"
                  className="relative w-14 h-14 bg-indigo-700 flex items-center justify-center rounded-full ring-2 ring-indigo-500/30 shrink-0"
                >
                  {user.emailVerified && (
                    <BadgeCheck
                      className="absolute top-0 right-0 z-10 text-indigo-200 fill-blue-500 rounded-full"
                      size={18}
                    />
                  )}
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name}
                      width={56}
                      height={56}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <span className="font-medium text-lg select-none text-white">
                      {user.name[0]}
                      {user.lastname?.[0]}
                    </span>
                  )}
                </motion.div>

                <div>
                  <p className="text-white font-semibold text-sm">
                    {user.name} {user.lastname}
                  </p>
                  <p className="text-slate-400 text-xs mt-0.5">{user.email}</p>
                </div>
              </div>

              {/* Meta info + Settings */}
              <div className="border-t border-slate-700 pt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <p className="text-xs text-slate-400 uppercase">STATE |</p>
                    <p className="text-xs text-slate-500">
                      {user.role === "USER" ? "NORMAL" : "PLATINUM"}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <p className="text-xs text-slate-400 uppercase">
                      Verified |
                    </p>
                    <p className="text-xs text-slate-500">
                      {user.emailVerified ? "YES" : "NO"}
                    </p>
                  </div>
                </div>

                <Link href="/dashboard/settings">
                  <PrimaryButton
                    onClick={handleClose}
                    className="brightness-65 shadow-indigo-700 hover:via-5% hover:to-60% rounded-full"
                  >
                    Settings
                  </PrimaryButton>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bottom Nav Bar */}
      <nav
        className={cn(
          "fixed bottom-0 left-0 right-0 z-40 lg:hidden",
          "h-16 px-2",
          "bg-black/80 backdrop-blur-xl",
          "border-t border-slate-800/60",
          "flex items-center justify-around",
          "shadow-[0_-1px_0_0_rgba(99,102,241,0.15),0_-8px_32px_rgba(0,0,0,0.6)]",
        )}
      >
        {/* Nav Items */}
        {navItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

          const isNewPost = item.href === "/dashboard/new";

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex-1 flex justify-center"
            >
              <motion.div
                className="relative flex flex-col items-center justify-center gap-0.5 w-full py-1"
                whileTap={{ scale: 0.88 }}
                transition={SPRING}
              >
                {isNewPost ? (
                  /* Floating CTA button */
                  <motion.div
                    className={cn(
                      "relative flex items-center justify-center",
                      "w-11 h-11 rounded-2xl",
                      "bg-linear-to-br from-indigo-500 via-purple-500 to-blue-600",
                      "shadow-lg shadow-indigo-500/40",
                      "-mt-5",
                    )}
                    animate={
                      isActive
                        ? {
                            scale: 1.08,
                            boxShadow: "0 0 20px 4px rgba(99,102,241,0.5)",
                          }
                        : {
                            scale: 1,
                            boxShadow: "0 4px 16px rgba(99,102,241,0.3)",
                          }
                    }
                    transition={SPRING}
                  >
                    <item.icon size={20} className="text-white" />
                    {item.badge && (
                      <span className="absolute -top-1.5 -right-1.5 text-[8px] font-bold px-1 py-0.5 rounded-md bg-indigo-900 text-indigo-300 border border-indigo-500/50 leading-none">
                        {item.badge}
                      </span>
                    )}
                  </motion.div>
                ) : (
                  /* Regular icon */
                  <motion.div
                    className="relative flex items-center justify-center w-10 h-10 rounded-xl"
                    animate={
                      isActive
                        ? { backgroundColor: "rgba(99,102,241,0.15)" }
                        : { backgroundColor: "transparent" }
                    }
                    transition={SPRING}
                  >
                    <AnimatePresence>
                      {isActive && (
                        <motion.span
                          key="dot"
                          layoutId="mobile-active-dot"
                          className="absolute -top-0.5 w-1 h-1 rounded-full bg-indigo-400 shadow-[0_0_6px_2px_rgba(129,140,248,0.6)]"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={SPRING}
                        />
                      )}
                    </AnimatePresence>

                    <item.icon
                      size={20}
                      className={cn(
                        "transition-colors duration-150",
                        isActive ? "text-indigo-400" : "text-slate-500",
                      )}
                    />
                  </motion.div>
                )}

                <span
                  className={cn(
                    "text-[10px] font-medium transition-colors duration-150",
                    isNewPost && "-mt-1",
                    isActive && !isNewPost
                      ? "text-indigo-300"
                      : "text-slate-600",
                  )}
                >
                  {item.label}
                </span>
              </motion.div>
            </Link>
          );
        })}

        {/* User Avatar — 5th item */}
        <motion.button
          className="flex-1 flex flex-col items-center justify-center gap-0.5 py-1"
          whileTap={{ scale: 0.88 }}
          transition={SPRING}
          onClick={() => setUserCardOpen(true)}
        >
          <motion.div
            layoutId="mobile-user-img"
            className="relative w-8 h-8 bg-indigo-700 flex items-center justify-center rounded-full ring-2 ring-indigo-500/30 cursor-pointer"
            animate={
              userCardOpen
                ? { boxShadow: "0 0 0 3px rgba(99,102,241,0.5)" }
                : { boxShadow: "0 0 0 0px rgba(99,102,241,0)" }
            }
            transition={SPRING}
          >
            {user?.emailVerified && (
              <BadgeCheck
                className="absolute -top-1 -right-1 z-10 text-indigo-200 fill-blue-500 rounded-full"
                size={14}
              />
            )}
            {user?.image ? (
              <Image
                src={user.image}
                alt="User avatar"
                width={32}
                height={32}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <span className="text-[11px] font-medium select-none text-white">
                {user?.name?.[0]}
                {user?.lastname?.[0]}
              </span>
            )}
          </motion.div>

          <span className="text-[10px] font-medium text-slate-600">
            Profile
          </span>
        </motion.button>
      </nav>
    </>
  );
}