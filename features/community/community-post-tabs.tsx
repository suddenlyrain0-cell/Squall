"use client";

import Link from "next/link";
import { useState } from "react";
import { Lock, Pencil, Pin } from "lucide-react";
import { boardCategories } from "@/constants/navigation";
import { notices, posts } from "@/services/mock-data";

const tabs = [
  { label: "전체", value: "all" },
  { label: "인기", value: "popular" },
  { label: "공지", value: "notice" }
] as const;

type CommunityTab = (typeof tabs)[number]["value"];

const categoryLabel = {
  free: "자유게시판",
  guide: "공략",
  question: "질문",
  bug: "버그 제보",
  suggestion: "건의사항",
  fanart: "팬아트"
};

const noticeTypeLabel = {
  update: "업데이트",
  event: "이벤트",
  maintenance: "점검",
  general: "운영 공지사항"
};

export function CommunityPostTabs() {
  const [activeTab, setActiveTab] = useState<CommunityTab>("all");
  const visiblePosts = activeTab === "popular" ? posts.filter((post) => post.likes >= 80) : posts;

  return (
    <>
      <div className="flex min-w-0 items-end justify-between border-b border-zinc-200">
        <nav className="flex min-w-0" aria-label="커뮤니티 게시글 탭">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setActiveTab(tab.value)}
              className={
                activeTab === tab.value
                  ? "shrink-0 border-b-2 border-primary px-3 py-3 text-sm font-black text-[#111111] sm:px-4"
                  : "shrink-0 px-3 py-3 text-sm font-bold text-zinc-500 transition hover:text-[#111111] sm:px-4"
              }
            >
              {tab.label}
            </button>
          ))}
        </nav>
        <Link
          href="/community/write"
          className="mb-2 inline-flex h-7 shrink-0 items-center gap-1 rounded-md bg-[#F34818] px-2.5 text-xs font-semibold text-white transition hover:bg-[#ff5a2a] sm:h-8 sm:gap-1.5 sm:px-3"
        >
          <Pencil className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          글쓰기
        </Link>
      </div>

      <nav className="mb-4 flex gap-5 overflow-x-auto border-b border-zinc-100 px-3 py-2 md:hidden" aria-label="모바일 게시판 메뉴">
        {boardCategories.map((category, index) => (
          <Link
            key={category.value}
            href={`/community?board=${category.value}`}
            className={
              index === 0
                ? "shrink-0 text-xs font-semibold text-[#111111]"
                : "shrink-0 text-xs font-normal text-zinc-500"
            }
          >
            {category.label}
          </Link>
        ))}
      </nav>

      <div className="border-y border-zinc-200 bg-white md:hidden">
        {activeTab === "notice"
          ? notices.map((notice) => (
              <Link key={notice.id} href="/notice" className="block border-b border-zinc-200 px-3 py-3 transition hover:bg-zinc-50">
                <h3 className="flex items-center gap-1.5 text-base font-medium leading-snug text-zinc-900">
                  <Lock className="h-3.5 w-3.5 shrink-0 text-zinc-500" />
                  <Pin className="h-3.5 w-3.5 shrink-0 text-primary" />
                  <span className="line-clamp-2">{notice.title}</span>
                </h3>
                <p className="mt-1 text-xs text-zinc-500">
                  {noticeTypeLabel[notice.type]}
                  <span className="mx-1.5 text-zinc-300">|</span>
                  SQUALL
                  <span className="mx-1.5 text-zinc-300">|</span>
                  {notice.date}
                </p>
              </Link>
            ))
          : visiblePosts.map((post) => (
              <Link key={post.id} href={`/post/${post.id}`} className="block border-b border-zinc-200 px-3 py-3 transition hover:bg-zinc-50">
                <h3 className="line-clamp-2 text-base font-medium leading-snug text-zinc-900">{post.title}</h3>
                <p className="mt-1 text-xs text-zinc-500">
                  <span className="text-primary">{categoryLabel[post.category]}</span>
                  <span className="mx-1.5 text-zinc-300">|</span>
                  {post.author}
                  <span className="mx-1.5 text-zinc-300">|</span>
                  조회 {post.views.toLocaleString()}
                  <span className="mx-1.5 text-zinc-300">|</span>
                  댓글 {post.comments}
                  <span className="mx-1.5 text-zinc-300">|</span>
                  {post.date}
                </p>
              </Link>
            ))}
      </div>

      <div className="hidden overflow-x-auto border-y border-zinc-200 bg-white md:block">
        <table className="w-full table-fixed border-collapse">
          <colgroup>
            <col />
            <col className="w-16" />
            <col className="w-20" />
            <col className="w-20" />
          </colgroup>
          <thead>
            <tr className="border-b border-zinc-200 text-xs font-medium text-zinc-500">
              <th className="px-3 py-2 text-left">글</th>
              <th className="px-2 py-2 text-center">댓글</th>
              <th className="px-2 py-2 text-center">조회수</th>
              <th className="px-2 py-2 text-center">활동</th>
            </tr>
          </thead>
          <tbody>
            {activeTab === "notice"
              ? notices.map((notice) => (
                  <tr key={notice.id} className="border-b border-zinc-200 transition hover:bg-zinc-50">
                    <td className="min-w-0 px-3 py-2.5">
                      <Link href="/notice" className="block min-w-0">
                        <h3 className="flex items-center gap-1.5 truncate text-base font-medium text-zinc-900">
                          <Lock className="h-3.5 w-3.5 shrink-0 text-zinc-500" />
                          <Pin className="h-3.5 w-3.5 shrink-0 text-primary" />
                          {notice.title}
                        </h3>
                        <p className="mt-1 truncate text-xs font-normal text-zinc-500">
                          <span>{noticeTypeLabel[notice.type]}</span>
                          <span className="mx-2 text-zinc-300">/</span>
                          SQUALL
                        </p>
                      </Link>
                    </td>
                    <td className="px-2 py-2.5 text-center text-xs font-normal tabular-nums text-zinc-600">0</td>
                    <td className="px-2 py-2.5 text-center text-xs font-normal tabular-nums text-zinc-600">-</td>
                    <td className="whitespace-nowrap px-2 py-2.5 text-center text-xs font-normal text-zinc-600">{notice.date}</td>
                  </tr>
                ))
              : visiblePosts.map((post) => (
                  <tr key={post.id} className="border-b border-zinc-200 transition hover:bg-zinc-50">
                    <td className="min-w-0 px-3 py-2.5">
                      <Link href={`/post/${post.id}`} className="block min-w-0">
                        <h3 className="truncate text-base font-medium text-zinc-900">{post.title}</h3>
                        <p className="mt-1 truncate text-xs font-normal text-zinc-500">
                          <span className="text-primary">{categoryLabel[post.category]}</span>
                          <span className="mx-2 text-zinc-300">/</span>
                          {post.author}
                        </p>
                      </Link>
                    </td>
                    <td className="px-2 py-2.5 text-center text-xs font-normal tabular-nums text-zinc-600">{post.comments}</td>
                    <td className="px-2 py-2.5 text-center text-xs font-normal tabular-nums text-zinc-600">{post.views.toLocaleString()}</td>
                    <td className="whitespace-nowrap px-2 py-2.5 text-center text-xs font-normal text-zinc-600">{post.date}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
