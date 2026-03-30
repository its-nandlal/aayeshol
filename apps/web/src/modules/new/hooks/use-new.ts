"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { toast } from "sonner";

async function postContentAPI(content: string, platform: string) {
  const { data } = await api.post("/social/post/publish", {
    content,
    platform,
  });
  return data;
}

async function saveToDraftAPI(content: string, platform: string) {
  const { data } = await api.post("/social/post/savedraft", {
    content,
    platform,
  });
  return data;
}

export const usePostContent = () => {
  const platform = "LINKEDIN";
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => {
      // ✅ Validation yahan karo
      if (!content) {
        toast.error("Content is empty! Please generate some content first.");
        return Promise.reject("Content is empty");
      }
      return postContentAPI(content, platform);
    },
    onSuccess: () => {
      toast.success("Post published successfully!");
      queryClient.invalidateQueries({ queryKey: ["social-posts"] });
    },
    onError: (err) => {
      console.error("Error publishing post:", err);
      toast.error("Failed to publish post. Please try again.");
    },
  });
};

export const useSaveDraft = () => {
  const platform = "LINKEDIN";
  const qureyClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => {
      if (!content) {
        toast.error("Content is empty! Please generate some content first.");
        return Promise.reject("Content is empty");
      }
      return saveToDraftAPI(content, platform);
    },
    onSuccess: (data) => {
      toast.success(data.message || "Draft saved successfully!");
      qureyClient.invalidateQueries({ queryKey: ["social-posts"] });
    },
    onError: (err) => {
      console.error("Error saving draft:", err);
      toast.error("Failed to save draft. Please try again.");
    },
  });
};
