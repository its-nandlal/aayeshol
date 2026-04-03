import { Sparkles } from "lucide-react";
import Link from "next/link";

const socials: {lable: string, link: string}[] = [
    {lable: 'X', link: 'https://x.com/its__nandlal'},
    {lable: 'LinkedIN', link: 'https://www.linkedin.com/in/nick-d-jangir/'},
    {lable: 'GitHub', link: 'https://github.com/its-nandlal'},
]

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">

          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span
              className="text-[14px] font-semibold text-white/70"
              style={{ fontFamily: "var(--font-funnel-display)" }}
            >
              Aayeshol
            </span>
          </Link>

          <p
            className="text-[12px] text-white/22"
            style={{ fontFamily: "var(--font-funnel-sans)" }}
          >
            © 2026 Aayeshol. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {socials.map((social: {lable: string, link: string}) => (
              <Link
                key={social.lable}
                href={social.link}
                target="_blank"
                className="text-[12px] text-white/28 hover:text-white/65 transition-colors"
                style={{ fontFamily: "var(--font-funnel-sans)" }}
              >
                {social.lable}
              </Link>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
}