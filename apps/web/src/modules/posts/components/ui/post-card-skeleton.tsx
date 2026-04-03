export default function PostCardSkeleton() {
  return (
    <div
      className="
      relative w-full overflow-hidden rounded-2xl
      bg-gradient-to-br from-indigo-950/60 via-[#0d0d1f] to-black
      border border-indigo-500/10
      animate-pulse
    "
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/5">
        <div className="flex gap-2">
          <div className="h-5 w-16 rounded-full bg-slate-700/40" />
          <div className="h-5 w-14 rounded-full bg-slate-700/40" />
        </div>

        <div className="flex items-center gap-3">
          <div className="h-3 w-20 bg-slate-700/40 rounded" />
          <div className="h-6 w-6 rounded-md bg-slate-700/40" />
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-4">
        <div className="h-4 w-3/4 bg-slate-700/40 rounded mb-3" />
        <div className="space-y-2">
          <div className="h-3 w-full bg-slate-700/30 rounded" />
          <div className="h-3 w-5/6 bg-slate-700/30 rounded" />
          <div className="h-3 w-2/3 bg-slate-700/30 rounded" />
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end px-5 pb-4">
        <div className="h-3 w-20 bg-slate-700/40 rounded" />
      </div>
    </div>
  );
}