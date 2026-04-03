import {
  Sparkles, Zap, Globe, Shield,
  BarChart3, Calendar, TrendingUp,
  Clock, Users, Wand2,
  Linkedin, Instagram, Twitter, Facebook,
} from "lucide-react";

// ── Feature cards ──────────────────────────────────────

export const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Content",
    description: "Generate engaging posts trained on viral content patterns across every platform",
    accent: "#6366f1",
  },
  {
    icon: Globe,
    title: "Multi-Platform",
    description: "Publish across LinkedIn, X, Threads and more from a single unified interface",
    accent: "#10b981",
  },
  {
    icon: Zap,
    title: "Instant Generation",
    description: "From idea to publish-ready post in under 10 seconds — no writer's block",
    accent: "#f59e0b",
  },
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "AI recommends optimal posting windows for maximum reach and engagement",
    accent: "#ec4899",
  },
  {
    icon: BarChart3,
    title: "Deep Analytics",
    description: "Understand what drives growth with platform-level performance insights",
    accent: "#06b6d4",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 compliant. Your data is encrypted end-to-end, always",
    accent: "#8b5cf6",
  },
];

// ── Stats ──────────────────────────────────────────────

export const stats = [
  { value: "10M+",  label: "Posts Generated"  },
  { value: "50K+",  label: "Active Users"      },
  { value: "99.9%", label: "Uptime SLA"        },
  { value: "4.9★",  label: "App Store Rating"  },
];

// ── Platforms ──────────────────────────────────────────

export const platforms = [
  { name: "LinkedIn",  icon: Linkedin,  status: "available" as const, color: "#0A66C2" },
  { name: "Instagram", icon: Instagram, status: "coming"    as const, color: "#E1306C" },
  { name: "Twitter/X", icon: Twitter,   status: "coming"    as const, color: "#1DA1F2" },
  { name: "Facebook",  icon: Facebook,  status: "coming"    as const, color: "#1877F2" },
];

// ── How it works ───────────────────────────────────────

export const howItWorks = [
  {
    step: "01",
    title: "Connect Accounts",
    description: "Link social accounts securely via OAuth in under 60 seconds",
    icon: Users,
  },
  {
    step: "02",
    title: "Generate Content",
    description: "Describe your goal — AI writes platform-optimised posts instantly",
    icon: Wand2,
  },
  {
    step: "03",
    title: "Schedule & Publish",
    description: "Post now or let AI pick the best time for peak engagement",
    icon: Clock,
  },
];

// ── Value prop bullets ─────────────────────────────────

export const valueBullets = [
  { icon: TrendingUp, text: "Increase engagement by up to 300%",         color: "#ec4899" },
  { icon: Clock,      text: "Save 10+ hours per week on content",         color: "#f59e0b" },
  { icon: Users,      text: "Maintain consistent brand voice everywhere",  color: "#6366f1" },
  { icon: Zap,        text: "Generate content ideas in under 10 seconds",  color: "#10b981" },
];

// ── Shared UI components ───────────────────────────────

export function SectionLabel({ text, color = "indigo" }: { text: string; color?: string }) {
  const colorMap: Record<string, string> = {
    indigo:  "text-indigo-400/70",
    violet:  "text-violet-400/70",
    emerald: "text-emerald-400/70",
    pink:    "text-pink-400/70",
  };
  return (
    <p className={`text-[11px] tracking-[0.2em] uppercase font-medium mb-4 ${colorMap[color] ?? colorMap.indigo}`}>
      {text}
    </p>
  );
}

export function SectionDivider() {
  return (
    <div className="max-w-7xl mx-auto px-8">
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
    </div>
  );
}

export function AppleWindow({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.7)]">
      <div className="flex items-center gap-2 px-4 py-3 bg-[#1c1c28] border-b border-white/[0.06]">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        {title && (
          <span className="flex-1 text-center text-[11px] text-white/30 font-medium tracking-wide">
            {title}
          </span>
        )}
      </div>
      <div className="bg-[#0a0a12]">{children}</div>
    </div>
  );
}