export function StatCardSkeleton() {
  return (
    <div className="rounded-xl bg-white/[0.03] p-5 animate-pulse">
      <div className="h-3 w-24 rounded bg-white/10 mb-3" />
      <div className="h-7 w-16 rounded bg-white/10 mb-2" />
      <div className="h-2.5 w-20 rounded bg-white/[0.07]" />
    </div>
  );
}

export function ChartSkeleton({ height = 220 }: { height?: number }) {
  return (
    <div
      className="w-full rounded-xl bg-white/[0.03] animate-pulse"
      style={{ height }}
    />
  );
}

export function ActivitySkeleton() {
  return (
    <div className="space-y-0 divide-y divide-white/[0.05]">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center justify-between py-4 animate-pulse">
          <div className="space-y-2">
            <div className="h-3 w-40 rounded bg-white/10" />
            <div className="h-2.5 w-24 rounded bg-white/[0.07]" />
          </div>
          <div className="h-6 w-20 rounded-full bg-white/10" />
        </div>
      ))}
    </div>
  );
}