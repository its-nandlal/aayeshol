import { create } from "zustand"
import { AuthUser } from "@/../../packages/types/auth"

export type SessionUserType = {
    user: AuthUser
}

type AuthSate = {
    user : AuthUser | null
    setUser: (user: AuthUser | null) => void
}

export const useAuthStore = create<AuthSate>((set) => ({
    user: null,
    setUser: (user) => set({user})
}))