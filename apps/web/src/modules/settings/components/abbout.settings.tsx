import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

interface LinkRowProps {
  label: string;
  href: string;
  delay?: number;
}

function LinkRow({ label, href, delay = 0 }: LinkRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut", delay }}
    >
      <div
        className="flex items-center justify-between py-4 px-1"
      >
        <span className="text-sm text-slate-400">
          {label}
        </span>

        <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-2 text-sm border border-indigo-500/50 hover:bg-indigo-300/10 ease-in-out transition-colors duration-150 rounded-full"
        >
        View
        </Link>
        
      </div>
      <Separator className="bg-slate-700/40" />
    </motion.div>
  );
}

const links = [
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "About Us", href: "/about" },
  { label: "Contact Support", href: "/support" },
  { label: "Changelog", href: "/changelog" },
];

export default function AboutSettings() {
  return (
    <div className="px-6 pb-6">
      <div>
        {links.map((link, i) => (
          <LinkRow
            key={link.href}
            label={link.label}
            href={link.href}
            delay={0.05 + i * 0.05}
          />
        ))}
      </div>
    </div>
  );
}