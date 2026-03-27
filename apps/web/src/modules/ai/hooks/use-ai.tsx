"use client"

import { api } from "@/lib/axios"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { toast } from "sonner";
import { useAIStore } from "../stores/ai.store";


export interface aiResponse {
    content: string;
}


// ======== API Functions ========

async function generateAIContent(formData: FormData): Promise<aiResponse> {
    const { data } = await api.post('/ai/content/generate', formData);
    return data;
}



// ======== Hooks ========

export const useGenerateAI = () => {
const { setContent } = useAIStore()
    const quresyClient = useQueryClient();

    return useMutation({
        mutationFn: generateAIContent,
        onSuccess: (data: aiResponse) => {
            quresyClient.invalidateQueries({queryKey: ['aigenerated-content']});
            setContent(data.content || '')
            toast.success("AI generate content 🤖")
        },
        onError: (err: unknown) => {
            toast.error(err.response?.data?.message || "AI generation failed!")
        }
    })
}