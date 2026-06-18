import type { BoardCategory } from "@/types/community";

export const mainNav = [
  { label: "Community", href: "/community" },
  { label: "Game", href: "#game" },
  { label: "About Us", href: "#about-us" }
];

export const boardCategories: Array<{ label: string; value: BoardCategory }> = [
  { label: "자유게시판", value: "free" },
  { label: "가이드", value: "guide" },
  { label: "버그 제보", value: "bug" }
];
