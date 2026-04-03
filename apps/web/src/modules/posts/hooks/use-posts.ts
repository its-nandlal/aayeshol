"use client";

import { useInfiniteQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { toast } from "sonner";

// ====== TYPES / INTERFACES ===========================

export interface Post {
  id: string;
  title: string;
  content: string;
  platform: string;
  publishedAt: Date;
  status: string;
  createdAt: Date;
}

interface PostsResponse {
  posts: Post[];
  perPage: number;
  pageNumber: number;
  totalPosts: number;
}

// ====== API CALLS ===========================

async function getPostAPI(page: number, perPage: number): Promise<PostsResponse> {
  const { data } = await api.get(
    `/posts?page=${page}&perPage=${perPage}`,
  );
  return data;
}

async function deletePostAPI(postId: string) {
  const { data } = await api.post(`/posts/delete`, { postId });
  return data;
}


// ====== HOOKS CREATE ===========================

export const usePosts = () => {
  return useInfiniteQuery({
    queryKey: ["social-posts"],
    queryFn: async ({ pageParam = 1 }) => {
      const data = await getPostAPI(pageParam, 10);
      return data;
    },
    getNextPageParam: (lastPage, allPages) => {
      const totalPages = Math.ceil(lastPage.totalPosts / lastPage.perPage);
      const currentPage = allPages.length

      if(currentPage < totalPages) {
        return currentPage + 1;
      } return undefined;
    },
    initialPageParam: 1,
  });
};


export const useDeletePost = () => {
    const qureyClient = useQueryClient();
    return useMutation({
        mutationFn: (postId: string) => deletePostAPI(postId),
        onSuccess: (data) => {
            qureyClient.invalidateQueries({ queryKey: ["social-posts"] });
            toast.success( data.message || "Post deleted successfully");
        }, onError: (err: unknown) => {
            const message = err instanceof Error ? err.message : "Failed to delete post";
            toast.error(message);
        }
    })
}
