"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { boardCategories } from "@/constants/navigation";
import { createCommunityPost } from "@/services/community-posts";
import type { BoardCategory } from "@/types/community";

const draftKey = "squall-write-post-draft";

type Draft = {
  title: string;
  category: BoardCategory;
  content: string;
  tags: string;
};

const emptyDraft: Draft = {
  title: "",
  category: "free",
  content: "",
  tags: ""
};

function parseTags(value: string) {
  return value
    .split(/[,\s]+/)
    .map((tag) => tag.trim().replace(/^#/, ""))
    .filter(Boolean)
    .slice(0, 8);
}

export function WritePostForm() {
  const router = useRouter();
  const [form, setForm] = useState<Draft>(emptyDraft);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const parsedTags = useMemo(() => parseTags(form.tags), [form.tags]);

  useEffect(() => {
    const savedDraft = window.localStorage.getItem(draftKey);

    if (savedDraft) {
      setForm(JSON.parse(savedDraft) as Draft);
    }
  }, []);

  function updateForm<K extends keyof Draft>(key: K, value: Draft[K]) {
    setForm((current) => ({
      ...current,
      [key]: value
    }));
    setMessage("");
    setError("");
  }

  function saveDraft() {
    window.localStorage.setItem(draftKey, JSON.stringify(form));
    setMessage("Draft saved.");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");
    setError("");

    try {
      await createCommunityPost({
        title: form.title,
        category: form.category,
        content: form.content,
        tags: parsedTags
      });

      window.localStorage.removeItem(draftKey);
      router.push("/community");
      router.refresh();
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Failed to create post.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card className="p-5 md:p-8">
      <form className="grid gap-5" onSubmit={handleSubmit}>
        <label className="grid gap-2">
          <span className="text-sm font-black text-white">Title</span>
          <input
            className="h-12 rounded-xl border border-white/10 bg-[#111111] px-4 text-white caret-white outline-none transition placeholder:text-white/40 focus:border-primary"
            value={form.title}
            onChange={(event) => updateForm("title", event.target.value)}
            placeholder="Enter a title"
            minLength={2}
            maxLength={120}
            required
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-black text-white">Category</span>
          <select
            className="h-12 rounded-xl border border-white/10 bg-[#111111] px-4 text-white outline-none transition focus:border-primary"
            value={form.category}
            onChange={(event) => updateForm("category", event.target.value as BoardCategory)}
            required
          >
            {boardCategories.map((category) => (
              <option key={category.value} value={category.value} className="bg-[#111111] text-white">
                {category.label}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-black text-white">Content</span>
          <textarea
            className="min-h-80 rounded-xl border border-white/10 bg-[#111111] p-4 leading-7 text-white caret-white outline-none transition placeholder:text-white/40 focus:border-primary"
            value={form.content}
            onChange={(event) => updateForm("content", event.target.value)}
            placeholder="Share a question, guide, bug report, idea, or fan work."
            required
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-black text-white">Tags</span>
          <input
            className="h-12 rounded-xl border border-white/10 bg-[#111111] px-4 text-white caret-white outline-none transition placeholder:text-white/40 focus:border-primary"
            value={form.tags}
            onChange={(event) => updateForm("tags", event.target.value)}
            placeholder="#guide #feedback #bug"
          />
        </label>

        {parsedTags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {parsedTags.map((tag) => (
              <span key={tag} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-black text-primary">
                #{tag}
              </span>
            ))}
          </div>
        ) : null}

        {message ? (
          <p className="rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm font-bold text-primary">{message}</p>
        ) : null}

        {error ? (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-200">{error}</p>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button type="button" variant="secondary" onClick={saveDraft} disabled={submitting}>
            <Save className="h-4 w-4" />
            Save draft
          </Button>
          <Button type="submit" disabled={submitting}>
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            Publish
          </Button>
        </div>
      </form>
    </Card>
  );
}
