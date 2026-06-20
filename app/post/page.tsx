import { Suspense } from "react";
import { LivePostDetail } from "@/features/community/live-post-detail";

export default function PostPage() {
  return (
    <Suspense>
      <LivePostDetail />
    </Suspense>
  );
}
