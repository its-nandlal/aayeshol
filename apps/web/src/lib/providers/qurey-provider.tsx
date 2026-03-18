"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMemo } from "react";

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,      // 5 minutes
            gcTime: 1000 * 60 * 30,        // 30 minutes cache
            retry: 2,
            retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
            refetchOnWindowFocus: process.env.NODE_ENV === "production" ? false : "always",
            refetchOnReconnect: false,
            refetchOnMount: false,
          },
          mutations: {
            retry: 1,
          },
        },
      }),
    []
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}