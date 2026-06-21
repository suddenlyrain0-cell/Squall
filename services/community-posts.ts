import type { BoardCategory, Post } from "@/types/community";
import { supabase } from "@/lib/supabase/client";

export type CommunityPostRow = {
  id: string;
  author_id: string;
  author_name: string;
  title: string;
  category: BoardCategory;
  content: string;
  tags: string[] | null;
  excerpt: string;
  views: number;
  comments_count: number;
  likes_count: number;
  created_at: string;
  updated_at: string;
};

export type CreateCommunityPostInput = {
  title: string;
  category: BoardCategory;
  content: string;
  tags: string[];
};

export type CommunityCommentRow = {
  id: string;
  post_id: string;
  author_id: string;
  author_name: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export type CommunityComment = {
  id: string;
  postId: string;
  author: string;
  avatar: string;
  content: string;
  date: string;
};

export type CreateCommunityCommentInput = {
  postId: string;
  content: string;
};

export type IncrementCommunityPostViewResult = {
  views: number;
};

const categoryTags: Record<BoardCategory, string> = {
  free: "Free",
  guide: "Guide",
  question: "Question",
  bug: "Bug",
  suggestion: "Suggestion",
  fanart: "Fan Art"
};

function getDisplayName(email?: string | null) {
  return email?.split("@")[0] || "Squaller";
}

function getInitials(name: string) {
  return name
    .split(/[\s._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .padEnd(2, "Q")
    .slice(0, 2);
}

function getExcerpt(content: string) {
  const normalized = content.replace(/\s+/g, " ").trim();
  return normalized.length > 140 ? `${normalized.slice(0, 140)}...` : normalized;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date(value));
}

export function mapCommunityPost(row: CommunityPostRow): Post {
  const firstTag = row.tags?.find(Boolean);

  return {
    id: row.id,
    title: row.title,
    category: row.category,
    tag: firstTag || categoryTags[row.category],
    author: row.author_name,
    avatar: getInitials(row.author_name),
    date: formatDate(row.created_at),
    views: row.views ?? 0,
    comments: row.comments_count ?? 0,
    likes: row.likes_count ?? 0,
    excerpt: row.excerpt || getExcerpt(row.content),
    content: row.content,
    href: `/post?id=${encodeURIComponent(row.id)}`,
    source: "supabase"
  };
}

export function mapCommunityComment(row: CommunityCommentRow): CommunityComment {
  return {
    id: row.id,
    postId: row.post_id,
    author: row.author_name,
    avatar: getInitials(row.author_name),
    content: row.content,
    date: formatDate(row.created_at)
  };
}

export async function fetchCommunityPosts() {
  const { data, error } = await supabase
    .from("community_posts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    throw new Error(error.message);
  }

  return (data as CommunityPostRow[]).map(mapCommunityPost);
}

export async function fetchCommunityPost(id: string) {
  const { data, error } = await supabase
    .from("community_posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapCommunityPost(data as CommunityPostRow);
}

export async function fetchCommunityComments(postId: string) {
  const { data, error } = await supabase
    .from("community_post_comments")
    .select("*")
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data as CommunityCommentRow[]).map(mapCommunityComment);
}

export async function incrementCommunityPostView(postId: string) {
  const { data, error } = await supabase.rpc("increment_community_post_view", {
    target_post_id: postId
  });

  if (error) {
    throw new Error(error.message);
  }

  return (data as IncrementCommunityPostViewResult[])[0]?.views;
}

export async function createCommunityPost(input: CreateCommunityPostInput) {
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError) {
    throw new Error(userError.message);
  }

  if (!user) {
    throw new Error("Login is required.");
  }

  const authorName = getDisplayName(user.email);
  const { data, error } = await supabase
    .from("community_posts")
    .insert({
      author_id: user.id,
      author_name: authorName,
      title: input.title.trim(),
      category: input.category,
      content: input.content.trim(),
      tags: input.tags,
      excerpt: getExcerpt(input.content)
    })
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapCommunityPost(data as CommunityPostRow);
}

export async function createCommunityComment(input: CreateCommunityCommentInput) {
  const content = input.content.trim();

  if (!content) {
    throw new Error("Reply cannot be empty.");
  }

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError) {
    throw new Error(userError.message);
  }

  if (!user) {
    throw new Error("Login is required.");
  }

  const authorName = getDisplayName(user.email);
  const { data, error } = await supabase
    .from("community_post_comments")
    .insert({
      post_id: input.postId,
      author_id: user.id,
      author_name: authorName,
      content
    })
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapCommunityComment(data as CommunityCommentRow);
}
