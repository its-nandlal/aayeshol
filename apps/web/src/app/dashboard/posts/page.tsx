"use client";

import Header from "@/components/ui/header";
import Posts from "@/modules/posts/components/posts";
import PostCardSkeleton from "@/modules/posts/components/ui/post-card-skeleton";
import { usePosts } from "@/modules/posts/hooks/use-posts";
import { useRef, useEffect } from "react";

export default function PostsPage() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = usePosts();

  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold: 0.1,
      },
    );

    if (observerRef.current) observer.observe(observerRef.current);
  }, [fetchNextPage, hasNextPage]);

  if (isLoading)
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        Loading...
      </div>
    );
  if (isError)
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        Error fetching posts
      </div>
    );

  const allPosts = data?.pages.flatMap((page) => page.posts) ?? [];

  return (
    <section className="w-full h-screen overflow-y-auto max-md:pb-16">
      <Header heading="All Posts" />
      <div className="space-y-4 p-2">
        {allPosts.map((post) => (
          <Posts key={post.id} post={post} />
        ))}
      </div>

      <div ref={observerRef} className="h-10" />
      {isFetchingNextPage && (
          <div className="grid gap-4">
    {Array.from({ length: 6 }).map((_, i) => (
      <PostCardSkeleton key={i} />
    ))}
  </div>

      )}
      {!hasNextPage && (
        <p className="text-center text-gray-400">NO MORE POSTS..</p>
      )}
    </section>
  );
}
