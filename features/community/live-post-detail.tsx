"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Flag, Loader2, MessageSquare, Share2, ThumbsUp } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  createCommunityComment,
  fetchCommunityComments,
  fetchCommunityPost,
  incrementCommunityPostView,
  type CommunityComment
} from "@/services/community-posts";
import { useAuth } from "@/features/auth/auth-provider";
import type { Post } from "@/types/community";

const viewCooldownMs = 6 * 60 * 60 * 1000;
const viewStoragePrefix = "squall-post-viewed-at";

function getViewStorageKey(postId: string) {
  return `${viewStoragePrefix}:${postId}`;
}

export function LivePostDetail() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { user } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<CommunityComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [comment, setComment] = useState("");
  const [commentSubmitting, setCommentSubmitting] = useState(false);
  const [commentError, setCommentError] = useState("");
  const [commentsError, setCommentsError] = useState("");
  const loadedPostId = post?.id;

  useEffect(() => {
    let mounted = true;

    if (!id) {
      setLoading(false);
      setError("Post id is missing.");
      return;
    }

    fetchCommunityPost(id)
      .then(async (item) => {
        if (mounted) {
          setPost(item);
          setError("");
        }

        try {
          const fetchedComments = await fetchCommunityComments(id);

          if (mounted) {
            setComments(fetchedComments);
            setCommentsError("");
          }
        } catch (caughtError) {
          if (mounted) {
            setComments([]);
            setCommentsError(caughtError instanceof Error ? caughtError.message : "Failed to load replies.");
          }
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

  useEffect(() => {
    let mounted = true;

    if (!id || !loadedPostId) {
      return;
    }

    const storageKey = getViewStorageKey(id);
    const lastViewedAt = Number(window.localStorage.getItem(storageKey) || 0);

    if (Number.isFinite(lastViewedAt) && Date.now() - lastViewedAt < viewCooldownMs) {
      return;
    }

    window.localStorage.setItem(storageKey, String(Date.now()));

    incrementCommunityPostView(id)
      .then((views) => {
        if (mounted && typeof views === "number") {
          setPost((current) => (current ? { ...current, views } : current));
        }
      })
      .catch(() => {
        window.localStorage.removeItem(storageKey);
      });

    return () => {
      mounted = false;
    };
  }, [id, loadedPostId]);

  async function handleCommentSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!id || !post) {
      return;
    }

    setCommentSubmitting(true);
    setCommentError("");

    try {
      const createdComment = await createCommunityComment({
        postId: id,
        content: comment
      });

      setComments((current) => [...current, createdComment]);
      setPost((current) =>
        current
          ? {
              ...current,
              comments: current.comments + 1
            }
          : current
      );
      setComment("");
      setCommentsError("");
    } catch (caughtError) {
      setCommentError(caughtError instanceof Error ? caughtError.message : "Failed to create reply.");
    } finally {
      setCommentSubmitting(false);
    }
  }

  if (loading) {
    return (
      <main className="bg-white text-[#111111]">
        <div className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-5xl items-center justify-center px-5 py-12 lg:px-8">
          <Card className="flex w-full items-center justify-center gap-3 rounded-xl border-zinc-200 bg-white p-8 text-zinc-700 shadow-sm">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            Loading post...
          </Card>
        </div>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="bg-white text-[#111111]">
        <div className="mx-auto max-w-5xl px-5 py-12 lg:px-8">
          <Card className="rounded-xl border-zinc-200 bg-white p-8 shadow-sm">
            <h1 className="text-2xl font-black text-zinc-950">Post unavailable</h1>
            <p className="mt-3 text-sm font-semibold text-zinc-500">{error || "This post could not be found."}</p>
            <Button asChild className="mt-6 rounded-md bg-[#F34818] text-white shadow-none hover:-translate-y-0 hover:bg-[#ff5a2a]">
              <Link href="/community">Back to community</Link>
            </Button>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white text-[#111111]">
      <div className="mx-auto max-w-5xl px-5 py-10 lg:px-8 lg:py-12">
        <article>
          <div className="mb-5 flex flex-wrap items-center gap-3 border-b border-zinc-200 pb-4">
            <Badge className="normal-case ring-primary/40">{post.tag}</Badge>
            <span className="text-sm font-semibold text-zinc-500">{post.date}</span>
            <span className="text-sm font-semibold text-zinc-500">Views {post.views.toLocaleString()}</span>
          </div>

          <h1 className="max-w-4xl text-4xl font-black leading-tight text-zinc-950 md:text-6xl">{post.title}</h1>

          <div className="mt-7 flex flex-col gap-4 border-b border-zinc-200 pb-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary font-black text-[#111111]">{post.avatar}</span>
              <div>
                <p className="font-black text-zinc-950">{post.author}</p>
                <p className="text-sm font-medium text-zinc-500">Community Member</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" className="rounded-md border-zinc-200 bg-white text-zinc-700 shadow-none hover:-translate-y-0 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-950">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button variant="ghost" size="sm" className="rounded-md text-zinc-500 shadow-none hover:bg-zinc-50 hover:text-zinc-950">
                <Flag className="h-4 w-4" />
                Report
              </Button>
            </div>
          </div>

          <Card className="mt-8 rounded-xl border-zinc-200 bg-white p-6 shadow-sm md:p-8">
            <div className="whitespace-pre-wrap text-base leading-8 text-zinc-700">{post.content || post.excerpt}</div>
            <div className="mt-8 flex justify-center">
              <Button size="lg" className="rounded-md bg-[#F34818] text-white shadow-none hover:-translate-y-0 hover:bg-[#ff5a2a]">
                <ThumbsUp className="h-5 w-5" />
                Like {post.likes}
              </Button>
            </div>
          </Card>
        </article>

      <section className="mt-10">
        <h2 className="mb-5 border-b border-zinc-200 pb-3 text-2xl font-black text-zinc-950">Replies {post.comments}</h2>

        <div className="grid gap-4">
          {commentsError ? (
            <Card className="rounded-xl border-zinc-200 bg-white p-5 shadow-sm">
              <div className="flex gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-sm font-black text-zinc-600">
                  <MessageSquare className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-black text-zinc-950">Replies are temporarily unavailable.</p>
                  <p className="mt-2 leading-7 text-zinc-500">{commentsError}</p>
                </div>
              </div>
            </Card>
          ) : comments.length > 0 ? (
            comments.map((item) => (
              <Card key={item.id} className="rounded-xl border-zinc-200 bg-white p-5 shadow-sm">
                <div className="flex gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-sm font-black text-zinc-700">
                    {item.avatar}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <p className="font-black text-zinc-950">{item.author}</p>
                      <span className="text-xs font-bold text-zinc-400">{item.date}</span>
                    </div>
                    <p className="mt-2 whitespace-pre-wrap leading-7 text-zinc-600">{item.content}</p>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card className="rounded-xl border-zinc-200 bg-white p-5 shadow-sm">
              <div className="flex gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-sm font-black text-zinc-600">
                  <MessageSquare className="h-4 w-4" />
                </span>
                <p className="leading-7 text-zinc-500">Be the first to reply.</p>
              </div>
            </Card>
          )}

          <Card className="rounded-xl border-zinc-200 bg-white p-5 shadow-sm">
            {user ? (
              <form className="grid gap-3" onSubmit={handleCommentSubmit}>
                <label className="grid gap-2">
                  <span className="text-sm font-black text-zinc-950">Write a reply</span>
                  <textarea
                    className="min-h-28 rounded-xl border border-zinc-200 bg-white p-4 leading-7 text-zinc-900 caret-primary outline-none transition placeholder:text-zinc-400 focus:border-primary"
                    value={comment}
                    onChange={(event) => {
                      setComment(event.target.value);
                      setCommentError("");
                    }}
                    placeholder="Add your thoughts."
                    maxLength={2000}
                    required
                  />
                </label>
                {commentError ? (
                  <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-200">{commentError}</p>
                ) : null}
                <div className="flex justify-end">
                  <Button type="submit" disabled={commentSubmitting || !comment.trim()} className="rounded-md bg-[#F34818] text-white shadow-none hover:-translate-y-0 hover:bg-[#ff5a2a]">
                    {commentSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <MessageSquare className="h-4 w-4" />}
                    Reply
                  </Button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-semibold text-zinc-500">Login to join the conversation.</p>
                <Button asChild className="rounded-md bg-[#F34818] text-white shadow-none hover:-translate-y-0 hover:bg-[#ff5a2a]">
                  <Link href="/login">Login</Link>
                </Button>
              </div>
            )}
          </Card>
        </div>
      </section>

      <nav className="mt-10 border-t border-zinc-200 pt-8">
        <Link href="/community" className="inline-flex rounded-md border border-zinc-200 bg-white px-5 py-3 font-bold text-zinc-600 transition hover:border-primary hover:text-zinc-950">
          Back to community
        </Link>
      </nav>
      </div>
    </main>
  );
}
