import type { BoardCategory } from "@/types/community";

export const mainNav = [
  { label: "Community", href: "/community" },
  { label: "Notice", href: "/notice" },
  { label: "Update", href: "/update" },
  { label: "Event", href: "/event" }
];

export const boardCategories: Array<{ label: string; value: BoardCategory }> = [
  { label: "자유게시판", value: "free" },
  { label: "공략", value: "guide" },
  { label: "질문", value: "question" },
  { label: "버그 제보", value: "bug" },
  { label: "건의사항", value: "suggestion" },
  { label: "팬아트", value: "fanart" }
];
