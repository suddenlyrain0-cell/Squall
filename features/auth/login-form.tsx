"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, LogIn, UserPlus } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useAuth } from "@/features/auth/auth-provider";

type AuthMode = "login" | "signup";

export function LoginForm() {
  const router = useRouter();
  const { user, loading, signIn, signUp, signInWithOAuth } = useAuth();
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [oauthProvider, setOauthProvider] = useState<"google" | "kakao" | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const redirectTo = "/";

  useEffect(() => {
    if (!loading && user) {
      router.replace(redirectTo);
    }
  }, [loading, redirectTo, router, user]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");
    setSubmitting(true);

    const result = mode === "login" ? await signIn(email, password) : await signUp(email, password);

    setSubmitting(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    if (result.needsEmailConfirmation) {
      setNotice("Check your email to confirm your account, then come back and log in.");
      return;
    }

    router.push(redirectTo);
  }

  async function handleOAuthLogin(provider: "google" | "kakao") {
    setError("");
    setNotice("");
    setOauthProvider(provider);

    const result = await signInWithOAuth(provider);

    if (result.error) {
      setError(result.error);
      setOauthProvider(null);
    }
  }

  return (
    <Card className="mx-auto w-full max-w-md p-6 md:p-8">
      <div className="mb-6">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-primary">SQUALL Account</p>
        <h1 className="mt-3 text-3xl font-black text-white">{mode === "login" ? "Login" : "Create account"}</h1>
      </div>

      <div className="mb-6 grid grid-cols-2 rounded-xl border border-white/10 bg-white/[0.04] p-1">
        <button
          type="button"
          className={cn(
            "h-10 rounded-lg text-sm font-black text-white/58 transition",
            mode === "login" && "bg-white text-[#111111]"
          )}
          onClick={() => setMode("login")}
        >
          Login
        </button>
        <button
          type="button"
          className={cn(
            "h-10 rounded-lg text-sm font-black text-white/58 transition",
            mode === "signup" && "bg-white text-[#111111]"
          )}
          onClick={() => setMode("signup")}
        >
          Sign up
        </button>
      </div>

      <form className="grid gap-4" onSubmit={handleSubmit}>
        <label className="grid gap-2">
          <span className="text-sm font-black text-white">Email</span>
          <input
            className="h-12 rounded-xl border border-white/10 bg-[#111111] px-4 text-white caret-white outline-none transition placeholder:text-white/40 focus:border-primary"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            required
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-black text-white">Password</span>
          <div className="relative">
            <input
              className="h-12 w-full rounded-xl border border-white/10 bg-[#111111] px-4 pr-12 text-white caret-white outline-none transition placeholder:text-white/40 focus:border-primary"
              type={passwordVisible ? "text" : "password"}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="At least 6 characters"
              minLength={6}
              required
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-white/58 transition hover:bg-white/10 hover:text-white"
              aria-label={passwordVisible ? "Hide password" : "Show password"}
              onClick={() => setPasswordVisible((visible) => !visible)}
            >
              {passwordVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </label>

        {error ? (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-200">{error}</p>
        ) : null}

        {notice ? (
          <p className="rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm font-bold text-primary">{notice}</p>
        ) : null}

        <Button type="submit" className="mt-2" disabled={submitting || loading}>
          {submitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : mode === "login" ? (
            <LogIn className="h-4 w-4" />
          ) : (
            <UserPlus className="h-4 w-4" />
          )}
          {mode === "login" ? "Login" : "Create account"}
        </Button>
      </form>

      <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <span className="h-px bg-white/10" />
        <span className="text-xs font-black uppercase tracking-[0.16em] text-white/45">or</span>
        <span className="h-px bg-white/10" />
      </div>

      <div className="grid gap-3">
        <Button
          type="button"
          variant="secondary"
          className="h-11 rounded-xl border-white/15 bg-white text-[#111111] hover:bg-zinc-100"
          disabled={Boolean(oauthProvider) || loading}
          onClick={() => void handleOAuthLogin("google")}
        >
          {oauthProvider === "google" ? <Loader2 className="h-4 w-4 animate-spin" /> : <span className="text-base font-black">G</span>}
          Continue with Google
        </Button>
        <Button
          type="button"
          variant="secondary"
          className="h-11 rounded-xl border-[#FEE500] bg-[#FEE500] text-[#191600] hover:bg-[#ffef33]"
          disabled={Boolean(oauthProvider) || loading}
          onClick={() => void handleOAuthLogin("kakao")}
        >
          {oauthProvider === "kakao" ? <Loader2 className="h-4 w-4 animate-spin" /> : <span className="text-base font-black">K</span>}
          Continue with Kakao
        </Button>
      </div>

      <Button asChild variant="ghost" className="mt-4 w-full">
        <Link href="/">Back to home</Link>
      </Button>
    </Card>
  );
}
