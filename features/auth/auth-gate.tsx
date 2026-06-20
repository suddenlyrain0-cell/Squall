"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/features/auth/auth-provider";

export function AuthGate({
  children
}: {
  children: React.ReactNode;
  redirectTo?: string;
}) {
  const router = useRouter();
  const { user, loading } = useAuth();
  const loginHref = "/login";

  useEffect(() => {
    if (!loading && !user) {
      router.replace(loginHref);
    }
  }, [loading, loginHref, router, user]);

  if (loading || !user) {
    return (
      <Card className="flex min-h-56 flex-col items-center justify-center gap-4 p-8 text-center">
        {loading ? (
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        ) : (
          <Lock className="h-8 w-8 text-primary" />
        )}
        <div>
          <h2 className="text-xl font-black text-white">{loading ? "Checking session" : "Login required"}</h2>
          <p className="mt-2 text-sm font-semibold text-white/54">
            {loading ? "Please wait a moment." : "Sign in to continue."}
          </p>
        </div>
        {!loading ? (
          <Button asChild>
            <Link href={loginHref}>Login</Link>
          </Button>
        ) : null}
      </Card>
    );
  }

  return <>{children}</>;
}
