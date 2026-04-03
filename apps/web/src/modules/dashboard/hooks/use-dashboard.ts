"use client";
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

// ======= TYPES =======================================

interface posts {
  id: string;
  title: string | null;
  platform: "LINKEDIN" | "X" | "THREADS";
  status: "PUBLISHED" | "DRAFT" | "FAILED";
  publishedAt: string | null;
  createdAt: string;
}


export interface DashboardStats {
  success: boolean;
  data: {
    publishedPosts: number;
    draftPosts: number;
    failedPosts: number;
    connectedAccount: number;
    scheduledNext7Days: number;
    avgPostsPerDay: number;
    bestPlatform: "LINKEDIN" | "X" | "THREADS" | null;
  },
  message: string;
}

export interface ChartDataPoint {
  success: boolean;
  data: {
    dataPoints: [
      {
        date: string; // "2026-03"
        linkedin: number;
        x: number;
        threads: number;
      }
    ]
  };
  message: string;
}

export interface ActivityPost {
  success: true;
  data: {
    posts: posts[]
  },
  message: string;
}





// ======= API =======================================

async function fetchStats(): Promise<DashboardStats> {
  const { data } = await api.get("/dashboard/status");
  return data;
}

async function fetchChart(): Promise<ChartDataPoint> {
  const { data } = await api.get("/dashboard/chart");
  return data;
}

async function fetchActivity(): Promise<ActivityPost> {
  const { data } = await api.get("/dashboard/activity");
  return data;
}





// ======= HOOKS =======================================

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard', 'status'],
    queryFn: fetchStats,
    staleTime: 60 * 1000,
  })
}

export function useDashboardChart() {
  return useQuery({
    queryKey: ['dashboard', 'chart'],
    queryFn: fetchChart,
    staleTime: 5 * 60 * 1000,
  });
}

export function useDashboardActivity() {
  return useQuery({
    queryKey: ['dashboard', 'activity'],
    queryFn: fetchActivity,
    staleTime: 30 * 1000,
  });
}