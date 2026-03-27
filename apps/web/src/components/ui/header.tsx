"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  PlugZap, Sparkles, Plus, Filter,
  Download, Settings, RefreshCw,
  Trash2, Share2, Bell, LucideIcon,
} from "lucide-react";

// ── ICON_MAP ──────────────────────────────────────────────────────────────
// LucideIcon object Server → Client serialize nahi hota.
// icon ko STRING pass karo — yahan se component resolve hoga.
const ICON_MAP: Record<string, LucideIcon> = {
  PlugZap, Sparkles, Plus, Filter,
  Download, Settings, RefreshCw,
  Trash2, Share2, Bell,
};

export type IconName = keyof typeof ICON_MAP;

// ── Types ─────────────────────────────────────────────────────────────────

export interface HeaderAction {
  label: string;
  icon?: IconName;       // ✅ string — Server se safely pass hoga
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
}

interface HeaderProps {
  heading: string;
  actions?: HeaderAction[];
  className?: string;
  ClassNameH?: string;
}

// ── Component ─────────────────────────────────────────────────────────────

export default function Header({
  heading,
  actions = [],
  className,
  ClassNameH,
}: HeaderProps) {
  return (
    <div
      className={cn(
        "h-20 flex items-center justify-between gap-4 px-6 shrink-0",
        "border-b border-slate-800/60",
        className
      )}
    >
      {/* Left — heading */}
      <h2 className={cn("text-3xl font-medium text-white tracking-tight truncate", ClassNameH)}>
        {heading}
      </h2>

      {/* Right — buttons */}
      {actions.length > 0 && (
        <div className="flex items-center gap-2 shrink-0">
          {actions.map((action, i) => {
            const Icon = action.icon ? ICON_MAP[action.icon] : null;

            const cls = cn(
              "flex items-center gap-1",
              "bg-linear-to-l from-indigo-900/30 to-blue-950/20 text-slate-400 text-sm",
              "border border-slate-700/70",
              "shadow-[inset_0px_0px_15px_1px] shadow-indigo-900/60",
              "p-2 px-5 rounded-xl cursor-pointer",
              "hover:text-white/80 hover:shadow-indigo-900/90 hover:border-slate-700/90"
            );

            const inner = (
              <>
                {Icon && <Icon size={15} />}
                <span>{action.label}</span>
              </>
            );

            if (action.href) {
              return (
                <Link key={i} href={action.href} className={cls}>
                  {inner}
                </Link>
              );
            }

            return (
              <button key={i} onClick={action.onClick} className={cls}>
                {inner}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}