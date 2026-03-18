"use client"

import { useAuthStore } from "@/modules/auth/store/store.auth"

export default function Dashboard() {
  
  const {user} = useAuthStore()

  return (
    <div className="w-full h-screen bg-black">
      {user?.name}
    </div>
  )
}
