"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function MobileCommunityRedirect() {
  const router = useRouter();

  useEffect(() => {
    if (window.matchMedia("(max-width: 767px)").matches) {
      router.replace("/community");
    }
  }, [router]);

  return null;
}
