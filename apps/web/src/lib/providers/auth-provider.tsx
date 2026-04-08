"use client"

import { useEffect } from "react"
import { useSession } from "@/modules/auth/hooks/use-auth"
import { useAuthStore } from "@/modules/auth/store/store.auth"
import { useRouter, usePathname } from "next/navigation"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data, isPending } = useSession()
  const setUser = useAuthStore((s) => s.setUser)
  const user = useAuthStore((s) => s.user)

  const router = useRouter()
  const pathname = usePathname()

  // ✅ Sync session → Zustand
  useEffect(() => {
    if (data?.user) {
      setUser(data.user)
    } else {
      setUser(null)
    }
  }, [data])

  // ✅ Redirect logic
  useEffect(() => {
    if (isPending) return

    // Not logged in
    if (!user) {
      if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) {
        router.replace("/") // home
      }
      return
    }

    // Logged in user on public page
    if (pathname === "/" || pathname.startsWith("/auth")) {
      if (user.role === "ADMIN") {
        router.replace("/admin/dashboard")
      } else if (user.role === "USER" || user.role === "PREMIUM") {
        router.replace("/dashboard")
      }
      return
    }

    // Wrong role access
    if (pathname.startsWith("/admin") && user.role !== "ADMIN") {
      router.replace("/dashboard")
    }

    if (pathname.startsWith("/dashboard") && user.role === "ADMIN") {
      router.replace("/admin/dashboard")
    }

  }, [user, pathname, isPending])

  return children
}