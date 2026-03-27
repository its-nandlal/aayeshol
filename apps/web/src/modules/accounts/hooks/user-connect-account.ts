"use client"

import api from "@/lib/axios"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react" // ✅ callback ke liye
import { toast } from "sonner"

// ======== Types ========
interface SocialAccountInfo {
  connected: false
}

interface SocialAccountConnected {
  connected: true
  name: string
  email: string
  image: string
  connectedAt: string
}

type SocialAccount = SocialAccountInfo | SocialAccountConnected

interface SocialAccounts {
  linkedin: SocialAccount
  instagram: SocialAccount
  facebook: SocialAccount
  twitter: SocialAccount
}

// ======== API Functions ========
function connectLinkedIn() {
  window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/social/linkedin`
}

async function getSocialAccounts(): Promise<SocialAccounts> {
  const { data } = await api.get('/social/accounts') // ✅ 'accounts' — typo fix
  return data
}

// ======== Hooks ========
export const useSocialAccounts = () => {
  return useQuery({
    queryKey: ['social-accounts'],
    queryFn: getSocialAccounts,
  })
}

export const useConnectLinkedIn = () => {
  const handleConnect = () => {
    try {
      connectLinkedIn()
    } catch {
      toast.error("Connection failed!")
    }
  }
  return { connect: handleConnect }
}

// ✅ Callback ke baad query refresh karo
export const useLinkedInCallback = () => {
  const queryClient = useQueryClient()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)

    if (params.get('linkedin') === 'connected') {
      toast.success("LinkedIn connected successfully!")
      void queryClient.invalidateQueries({ queryKey: ['social-accounts'] })
      window.history.replaceState({}, '', window.location.pathname)
    }

    if (params.get('error') === 'failed') {
      toast.error("LinkedIn connection failed!")
      window.history.replaceState({}, '', window.location.pathname)
    }
  }, [queryClient])
}