export type NoticeType = "update" | "event" | "maintenance" | "general";

export type BoardCategory =
  | "free"
  | "guide"
  | "question"
  | "bug"
  | "suggestion"
  | "fanart";

export type Post = {
  id: string;
  title: string;
  category: BoardCategory;
  tag: string;
  author: string;
  avatar: string;
  date: string;
  views: number;
  comments: number;
  likes: number;
  excerpt: string;
};

export type Notice = {
  id: string;
  title: string;
  type: NoticeType;
  date: string;
  pinned?: boolean;
  excerpt: string;
};

export type UpdateNote = {
  version: string;
  date: string;
  summary: string;
  items: string[];
};

export type EventItem = {
  id: string;
  title: string;
  status: "ongoing" | "ended";
  period: string;
  description: string;
};
