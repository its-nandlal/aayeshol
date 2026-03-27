import { create } from "zustand";

type AIState = {
    content: string | null
    setContent: (content: string | null) => void
}

export const useAIStore = create<AIState>((set) => ({
    content: null,
    setContent: (content) => set({content})
}))