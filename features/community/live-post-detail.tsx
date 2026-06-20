"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Flag, Loader2, MessageSquare, Share2, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { fetchCommunityPost } from "@/services/community-posts";
import type { Post } from "@/types/community";

export function LivePostDetail() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    if (!id) {
      setLoading(false);
      setError("Post id is missing.");
      return;
    }

    fetchCommunityPost(id)
      .then((item) => {
        if (mounted) {
          setPost(item);
          setError("");
        }
      })
      .catch((caughtError) => {
        if (mounted) {
          setError(caughtError instanceof Error ? caughtError.message : "Failed to load post.");
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <main className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-4xl items-center justify-center px-5 py-12 lg:px-8">
        <Card className="flex w-full items-center justify-center gap-3 p-8 text-white">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          Loading post...
        </Card>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="mx-auto max-w-4xl px-5 py-12 lg:px-8">
        <Card className="p-8">
          <h1 className="text-2xl font-black text-white">Post unavailable</h1>
          <p className="mt-3 text-sm font-semibold text-white/60">{error || "This post could not be found."}</p>
          <Button asChild className="mt-6">
            <Link href="/community">Back to community</Link>
          </Button>
        </Card>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-5 py-12 lg:px-8">
      <article>
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <Badge>{post.tag}</Badge>
          <span className="text-sm font-bold text-white/50">{post.date}</span>
          <span className="text-sm font-bold text-white/50">Views {post.views.toLocaleString()}</span>
        </div>

        <h1 className="text-4xl font-black leading-tight text-white md:text-6xl">{post.title}</h1>

        <div className="mt-7 flex flex-col gap-4 border-b border-white/10 pb-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary font-black text-[#111111]">{post.avatar}</span>
            <div>
              <p className="font-black text-white">{post.author}</p>
              <p className="text-sm text-white/50">Community Member</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button variant="ghost" size="sm">
              <Flag className="h-4 w-4" />
              Report
            </Button>
          </div>
        </div>

        <Card className="mt-8 p-6 md:p-8">
          <div className="whitespace-pre-wrap text-base leading-8 text-white/75">{post.content || post.excerpt}</div>
          <div className="mt-8 flex justify-center">
            <Button size="lg">
              <ThumbsUp className="h-5 w-5" />
              Like {post.likes}
            </Button>
          </div>
        </Card>
      </article>

      <section className="mt-10">
        <h2 className="mb-5 text-2xl font-black text-white">Replies {post.comments}</h2>
        <Card className="p-5">
          <div className="flex gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-black text-white">
              <MessageSquare className="h-4 w-4" />
            </span>
            <p className="leading-7 text-white/60">Replies are not connected yet.</p>
          </div>
        </Card>
      </section>

      <nav className="mt-10 border-t border-white/10 pt-8">
        <Link href="/community" className="inline-flex rounded-xl border border-white/10 bg-white/[0.05] px-5 py-3 font-bold text-white/70 transition hover:border-primary hover:text-white">
          Back to community
        </Link>
      </nav>
    </main>
  );
}
