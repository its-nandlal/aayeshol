"use client";

import { TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  useDashboardStats,
  useDashboardChart,
  useDashboardActivity,
  type DashboardStats,
  type ChartDataPoint,
  type ActivityPost,
} from "@/modules/dashboard/hooks/use-dashboard";
import {
  StatCardSkeleton,
  ChartSkeleton,
  ActivitySkeleton,
} from "@/modules/dashboard/components/ui/dashboard-skeletons";
import Header from "@/components/ui/header";

// ── Chart configs ──────────────────────────────────────

const lineChartConfig = {
  linkedin: { label: "LinkedIn", color: "#3b82f6" },
  x: { label: "X", color: "#94a3b8" },
  threads: { label: "Threads", color: "#a855f7" },
} satisfies ChartConfig;

const barChartConfig = {
  linkedin: { label: "LinkedIn", color: "#3b82f6" },
  x: { label: "X", color: "#94a3b8" },
  threads: { label: "Threads", color: "#a855f7" },
} satisfies ChartConfig;

const PIE_COLORS = ["#3b82f6", "#94a3b8", "#a855f7"];

// ── Helpers ────────────────────────────────────────────

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  const diffH = Math.floor((Date.now() - new Date(iso).getTime()) / 3_600_000);
  const diffD = Math.floor(diffH / 24);
  if (diffH < 1) return "Just now";
  if (diffH < 24) return `${diffH} hour${diffH > 1 ? "s" : ""} ago`;
  if (diffD === 1) return "Yesterday";
  return `${diffD} days ago`;
}

function monthLabel(date: string): string {
  const [y, m] = date.split("-");
  return new Date(Number(y), Number(m) - 1).toLocaleString("en-US", {
    month: "short",
  });
}

// ── Platform badge ─────────────────────────────────────

const platformStyles: Record<string, string> = {
  LINKEDIN: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  X: "bg-slate-400/10 text-slate-300 border-slate-500/20",
  THREADS: "bg-purple-500/15 text-purple-400 border-purple-500/20",
};
const platformLabel: Record<string, string> = {
  LINKEDIN: "LinkedIn",
  X: "X",
  THREADS: "Threads",
};

function PlatformBadge({ platform }: { platform: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10.5px] font-semibold ${platformStyles[platform] ?? "bg-white/10 text-white/60 border-white/10"}`}
    >
      {platformLabel[platform] ?? platform}
    </span>
  );
}

// ── Status pill ────────────────────────────────────────

const statusStyles: Record<string, string> = {
  PUBLISHED: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  DRAFT: "bg-slate-500/10 text-slate-400 border-slate-500/20",
  FAILED: "bg-red-500/15 text-red-400 border-red-500/20",
};

function StatusPill({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium ${statusStyles[status] ?? "bg-white/10 text-white/60 border-white/10"}`}
    >
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
}

// ── Stat card ──────────────────────────────────────────

function StatCard({
  label,
  value,
  sub,
  subColor,
  trend,
}: {
  label: string;
  value: string | number;
  sub?: string;
  subColor?: "green" | "red" | "muted";
  trend?: "up";
}) {
  const subClass =
    subColor === "green"
      ? "text-emerald-400"
      : subColor === "red"
        ? "text-red-400"
        : "text-slate-500";

  return (
    <div className="rounded-xl bg-white/[0.03] p-5 border border-white/[0.05]">
      <p className="text-[12px] font-medium text-slate-400 mb-2">{label}</p>
      <p className="text-[26px] font-semibold text-slate-100 leading-none mb-2">
        {value}
      </p>
      {sub && (
        <p className={`text-[11.5px] flex items-center gap-1 ${subClass}`}>
          {trend === "up" && <TrendingUp size={11} />}
          {sub}
        </p>
      )}
    </div>
  );
}

// ── Line chart ─────────────────────────────────────────

function PostsLineChart({
  dataPoints,
}: {
  dataPoints: ChartDataPoint["data"]["dataPoints"];
}) {
  const data = dataPoints.map((d) => ({ ...d, month: monthLabel(d.date) }));

  return (
    <div className="rounded-xl bg-white/3 border border-white/5 p-5">
      <p className="text-[13px] font-medium text-slate-200 mb-4">
        Posts over time — by platform
      </p>
      <ChartContainer config={lineChartConfig} className="h-[220px] w-full">
        <AreaChart
          data={data}
          margin={{ top: 4, right: 4, left: -16, bottom: 0 }}
        >
          <defs>
            <linearGradient id="liGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="xGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.12} />
              <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="thGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a855f7" stopOpacity={0.12} />
              <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.05)"
          />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: "#64748b" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#64748b" }}
            axisLine={false}
            tickLine={false}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Area
            dataKey="linkedin"
            stroke="#3b82f6"
            strokeWidth={2}
            fill="url(#liGrad)"
            dot={{ r: 3, fill: "#3b82f6" }}
          />
          <Area
            dataKey="x"
            stroke="#94a3b8"
            strokeWidth={2}
            fill="url(#xGrad)"
            dot={{ r: 3, fill: "#94a3b8" }}
          />
          <Area
            dataKey="threads"
            stroke="#a855f7"
            strokeWidth={2}
            fill="url(#thGrad)"
            dot={{ r: 3, fill: "#a855f7" }}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}

// ── Pie chart ──────────────────────────────────────────

function PlatformPieChart({
  dataPoints,
}: {
  dataPoints: ChartDataPoint["data"]["dataPoints"];
}) {
  const totals = dataPoints.reduce(
    (acc, d) => ({
      linkedin: acc.linkedin + d.linkedin,
      x: acc.x + d.x,
      threads: acc.threads + d.threads,
    }),
    { linkedin: 0, x: 0, threads: 0 },
  );

  const total = totals.linkedin + totals.x + totals.threads || 1;
  const pct = (n: number) => Math.round((n / total) * 100);

  const pieData = [
    { name: "LinkedIn", value: totals.linkedin },
    { name: "X", value: totals.x },
    { name: "Threads", value: totals.threads },
  ];

  const pieConfig = {
    linkedin: { label: "LinkedIn", color: "#3b82f6" },
    x: { label: "X", color: "#94a3b8" },
    threads: { label: "Threads", color: "#a855f7" },
  } satisfies ChartConfig;

  return (
    <div className="rounded-xl bg-white/[0.03] border border-white/[0.05] p-5">
      <p className="text-[13px] font-medium text-slate-200 mb-4">
        Platform breakdown
      </p>
      <ChartContainer config={pieConfig} className="h-[160px] w-full">
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={48}
            outerRadius={72}
            paddingAngle={2}
            dataKey="value"
          >
            {pieData.map((_, i) => (
              <Cell key={i} fill={PIE_COLORS[i]} strokeWidth={0} />
            ))}
          </Pie>
          <ChartTooltip
            content={<ChartTooltipContent hideLabel />}
            formatter={(value, name) => [`${value} posts`, name]}
          />
        </PieChart>
      </ChartContainer>
      {/* Progress bar */}
      <div className="flex h-1.5 rounded-full overflow-hidden mt-2 mb-2">
        <div
          style={{ width: `${pct(totals.linkedin)}%`, background: "#3b82f6" }}
        />
        <div style={{ width: `${pct(totals.x)}%`, background: "#94a3b8" }} />
        <div
          style={{ width: `${pct(totals.threads)}%`, background: "#a855f7" }}
        />
      </div>
      <div className="flex justify-between text-[11px] text-slate-400">
        <span>LinkedIn {pct(totals.linkedin)}%</span>
        <span>X {pct(totals.x)}%</span>
        <span>Threads {pct(totals.threads)}%</span>
      </div>
    </div>
  );
}

// ── Stacked bar chart ──────────────────────────────────

function PostsBarChart({
  dataPoints,
}: {
  dataPoints: ChartDataPoint["data"]["dataPoints"];
}) {
  const data = dataPoints.map((d) => ({ ...d, month: monthLabel(d.date) }));

  return (
    <div className="rounded-xl bg-white/3 border border-white/5 p-5">
      <p className="text-[13px] font-medium text-slate-200 mb-4">
        Post status breakdown — last 30 days
      </p>
      <ChartContainer config={barChartConfig} className="h-[160px] w-full hover:bg-indigo-900/40">
        <BarChart
          data={data}
          margin={{ top: 4, right: 4, left: -16, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.05)"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: "#64748b" }}
            axisLine={false}
            tickLine={false}
            
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#64748b" }}
            axisLine={false}
            tickLine={false}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey="linkedin"
            stackId="a"
            fill="#3b82f6"
            radius={[0, 0, 0, 0]}
          />
          <Bar dataKey="x" stackId="a" fill="#94a3b8" radius={[0, 0, 0, 0]}  />
          <Bar
            dataKey="threads"
            stackId="a"
            fill="#a855f7"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

// ── Activity feed ──────────────────────────────────────

function ActivityFeed({ posts }: { posts: ActivityPost["data"]["posts"] }) {
  return (
    <div className="rounded-xl bg-white/[0.03] border border-white/[0.05] p-5">
      <p className="text-[13px] font-medium text-slate-200 mb-1">
        Recent activity
      </p>
      <div className="divide-y divide-white/[0.05]">
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex items-center justify-between py-3.5"
          >
            <div>
              <p className="text-[13px] text-slate-200 mb-1.5">
                {post.title ?? "Untitled"}
              </p>
              <div className="flex items-center gap-2">
                <PlatformBadge platform={post.platform} />
                <span className="text-[11px] text-slate-600">·</span>
                <span className="text-[11px] text-slate-500">
                  {formatDate(post.publishedAt ?? post.createdAt)}
                </span>
              </div>
            </div>
            <StatusPill status={post.status} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Stats section ──────────────────────────────────────

function StatsSection({ stats }: { stats: DashboardStats["data"] }) {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
        <StatCard
          label="Published posts"
          value={stats.publishedPosts}
          sub="Total published"
          subColor="muted"
        />
        <StatCard
          label="Connected accounts"
          value={stats.connectedAccount}
          sub="LinkedIn · X · Threads"
          subColor="muted"
        />
        <StatCard
          label="Draft posts"
          value={stats.draftPosts}
          sub="Ready to publish"
          subColor="muted"
        />
        <StatCard
          label="Failed posts"
          value={stats.failedPosts}
          sub={stats.failedPosts > 0 ? "Needs attention" : "All good"}
          subColor={stats.failedPosts > 0 ? "red" : "muted"}
          trend={stats.failedPosts > 0 ? "up" : undefined}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        <StatCard
          label="Scheduled (next 7d)"
          value={stats.scheduledNext7Days}
          sub="Upcoming posts"
          subColor="muted"
        />
        <div className="rounded-xl bg-white/[0.03] p-5 border border-white/[0.05]">
          <p className="text-[12px] font-medium text-slate-400 mb-2">
            Best platform
          </p>
          <div className="mb-2">
            <PlatformBadge platform={stats.bestPlatform ?? ""} />
          </div>
          <p className="text-[11.5px] text-slate-500">Most published</p>
        </div>
        <StatCard
          label="Avg posts / day"
          value={stats.avgPostsPerDay}
          sub="Last 30 days"
          subColor="muted"
        />
      </div>
    </>
  );
}

// ── Main page ──────────────────────────────────────────

export default function DashboardPage() {
  const statsQuery = useDashboardStats();
  const chartQuery = useDashboardChart();
  const activityQuery = useDashboardActivity();

  // Nested data unwrap — hooks return full response {success, data, message}
  const stats = statsQuery.data?.data;
  const dataPoints = chartQuery.data?.data?.dataPoints;
  const posts = activityQuery.data?.data?.posts;

  const hasChartData = dataPoints && dataPoints.length > 0;

  return (
    <section className="h-screen  overflow-y-scroll ">
      <Header heading="Dashboard" />

      <div className="p-2 md:p-4">
        {/* ── Stats ── */}
        {statsQuery.isPending ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <StatCardSkeleton key={i} />
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <StatCardSkeleton key={i} />
              ))}
            </div>
          </>
        ) : stats ? (
          <StatsSection stats={stats} />
        ) : null}

        {/* ── Line + Pie ── */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-3 mb-3">
          {chartQuery.isPending ? (
            <>
              <ChartSkeleton height={300} />
              <ChartSkeleton height={300} />
            </>
          ) : hasChartData ? (
            <>
              <PostsLineChart dataPoints={dataPoints} />
              <PlatformPieChart dataPoints={dataPoints} />
            </>
          ) : (
            <div className="col-span-2 rounded-xl bg-white/[0.03] border border-white/[0.05] p-8 text-center text-slate-500 text-sm">
              No chart data yet — publish some posts first.
            </div>
          )}
        </div>

        {/* ── Stacked bar ── */}
        <div className="mb-3">
          {chartQuery.isPending ? (
            <ChartSkeleton height={220} />
          ) : hasChartData ? (
            <PostsBarChart dataPoints={dataPoints} />
          ) : null}
        </div>

        {/* ── Activity ── */}
        {activityQuery.isPending ? (
          <div className="rounded-xl bg-white/[0.03] border border-white/[0.05] p-5">
            <p className="text-[13px] font-medium text-slate-200 mb-4">
              Recent activity
            </p>
            <ActivitySkeleton />
          </div>
        ) : posts && posts.length > 0 ? (
          <ActivityFeed posts={posts} />
        ) : (
          <div className="rounded-xl bg-white/[0.03] border border-white/[0.05] p-8 text-center text-slate-500 text-sm">
            No activity yet.
          </div>
        )}
      </div>
    </section>
  );
}
