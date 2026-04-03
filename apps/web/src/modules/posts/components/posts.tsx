import {
  Linkedin,
  Twitter,
  Instagram,
  FileEdit,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Calendar,
  Trash2,
} from "lucide-react";
import { Post, useDeletePost } from "../hooks/use-posts";
import { toast } from "sonner";

const platformConfig: Record<
  string,
  {
    label: string;
    icon: React.ReactNode;
    badgeClass: string;
    glowClass: string;
  }
> = {
  linkedin: {
    label: "LinkedIn",
    icon: <Linkedin size={12} />,
    badgeClass: "bg-blue-500/10 text-blue-400 border-blue-500/25",
    glowClass: "hover:shadow-blue-500/5",
  },
  x: {
    label: "X",
    icon: <Twitter size={12} />,
    badgeClass: "bg-slate-400/10 text-slate-300 border-slate-400/20",
    glowClass: "hover:shadow-slate-400/5",
  },
  instagram: {
    label: "Instagram",
    icon: <Instagram size={12} />,
    badgeClass: "bg-pink-500/10 text-pink-400 border-pink-500/25",
    glowClass: "hover:shadow-pink-500/5",
  },
};

const statusConfig: Record<
  string,
  {
    label: string;
    icon: React.ReactNode;
    badgeClass: string;
    pulse?: boolean;
  }
> = {
  draft: {
    label: "Draft",
    icon: <FileEdit size={11} />,
    badgeClass: "bg-slate-500/10 text-slate-400 border-slate-500/20",
  },
  push: {
    label: "Published",
    icon: <CheckCircle2 size={11} />,
    badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    pulse: true,
  },
  failed: {
    label: "Failed",
    icon: <XCircle size={11} />,
    badgeClass: "bg-red-500/10 text-red-400 border-red-500/20",
  },
};

export default function PostCard({ post }: { post: Post }) {
  const platform = platformConfig[post.platform] ?? {
    label: post.platform,
    icon: null,
    badgeClass: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
    glowClass: "hover:shadow-indigo-500/5",
  };

  const status = statusConfig[post.status] ?? {
    label: post.status,
    icon: null,
    badgeClass: `${post.status === 'PUBLISHED' ? 'bg-green-500/50 text-white  border-red-500' : post.status === 'DRAFT' ? 'bg-slate-500/10' : post.status === 'FAILED' ? 'bg-red-500/10' : 'bg-slate-500/10'}   text-slate-400 border border-slate-500/20`,
  };

  const { mutate, isPending } = useDeletePost();

  const handleDelete = () => {
    if (!post.id) {
      toast.error("Action failed: Post ID is missing");
      return;
    }
    mutate(post.id);
  };

  return (
    <>
      <div
        className={`
        group relative w-full overflow-hidden rounded-2xl
        bg-gradient-to-br from-indigo-950/80 via-[#0d0d1f] to-black
        border border-indigo-500/15
        shadow-lg shadow-black/40
        transition-[border-color,box-shadow,transform] duration-200 ease-out
        hover:-translate-y-0.5 hover:border-indigo-500/30 hover:shadow-xl hover:shadow-black/60
        ${platform.glowClass}
      `}
      >
        {/* Top shimmer line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent" />

        {/* ── Header ── */}
        <div className="flex items-center justify-between border-b border-white/5 px-5 py-3.5">
          <div className="flex items-center gap-2">
            {/* Platform badge */}
            <span
              className={`
              flex items-center gap-1.5 rounded-full border px-2.5 py-0.75
              text-[11px] font-semibold tracking-wide select-none
              transition-transform duration-150 hover:scale-105
              ${platform.badgeClass}
            `}
            >
              {platform.icon}
              {platform.label}
            </span>

            {/* Status badge */}
            <span
              className={`
              flex items-center gap-1.5 rounded-full border px-2.5 py-0.75
              font-mono text-[10px] font-medium tracking-widest select-none
              ${status.badgeClass}
            `}
            >
              {status.pulse ? (
                <span className="relative flex h-1.5 w-1.5 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
              ) : (
                <span className="shrink-0">{status.icon}</span>
              )}
              {status.label}
            </span>
          </div>

          {/* Right: date + delete */}
          <div className="flex items-center gap-3">
            {/* Date */}
            <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-wide text-slate-400">
              <Calendar size={10} />
              {/* ({new Date(post.publishedAt).toLocaleDateString()})  */}

              {post.publishedAt ? (new Date(post.publishedAt).toLocaleDateString())
              : (new Date(post.createdAt).toLocaleDateString())}
            </span>

            {/* Delete button — visible on card hover */}
            <button
              onClick={handleDelete}
              disabled={isPending}
              className="
              opacity-0 group-hover:opacity-100
              transition-opacity duration-150
              flex items-center justify-center
              h-6 w-6 rounded-md
              text-slate-400 hover:text-red-400
              border border-slate-500/20
              hover:bg-red-500/10
              disabled:opacity-30
              cursor-pointer disabled:cursor-not-allowed
            "
              aria-label="Delete post"
            >
              {isPending ? (
                <span className="h-3 w-3 rounded-full border border-slate-500 border-t-transparent animate-spin" />
              ) : (
                <Trash2 size={12} />
              )}
            </button>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="px-5 py-4">
          <h2 className="mb-2.5 text-[14.5px] font-semibold leading-snug tracking-tight text-slate-100">
            {post.title}
          </h2>

          <div
            className="
            line-clamp-3 text-[12.5px] leading-relaxed text-slate-500
            [&_strong]:font-semibold [&_strong]:text-slate-300
            [&_em]:text-indigo-400/70
            [&_a]:text-indigo-400 [&_a]:no-underline hover:[&_a]:underline
            [&_p]:mb-1 [&_p:last-child]:mb-0
          "
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* ── Footer ── */}
        <div className="flex items-center justify-end px-5 pb-4 pt-0">
          <button className="group/btn flex items-center gap-1 font-mono text-[10.5px] font-medium tracking-wide text-indigo-500/40 transition-colors duration-150 hover:text-indigo-400 cursor-pointer">
            Read more
            <ArrowRight
              size={11}
              className="transition-transform duration-150 group-hover/btn:translate-x-0.5"
            />
          </button>
        </div>
      </div>

      {isPending && (
        <div className="fixed w-full h-screen bg-black/60 animate-pulse pointer-events-none" />
      )}
    </>
  );
}
