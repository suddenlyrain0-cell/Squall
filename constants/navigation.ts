import type { BoardCategory } from "@/types/community";

export const mainNav = [
  { label: "Community", href: "/community" },
  { label: "Game", href: "#game" },
  { label: "About Us", href: "#about-us" }
];

export const boardCategories: Array<{ label: string; value: BoardCategory }> = [
  { label: "Free Board", value: "free" },
  { label: "Guide", value: "guide" },
  { label: "Bug Report", value: "bug" }
];
