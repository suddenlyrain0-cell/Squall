"use client";

import type { Provider, User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase/client";

type AuthResult = {
  error?: string;
  needsEmailConfirmation?: boolean;
};

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signUp: (email: string, password: string) => Promise<AuthResult>;
  signInWithOAuth: (provider: Extract<Provider, "google" | "kakao">) => Promise<AuthResult>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    supabase.auth
      .getUser()
      .then(({ data }) => {
        if (mounted) {
          setUser(data.user);
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      signIn: async (email, password) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
          return { error: error.message };
        }

        return {};
      },
      signUp: async (email, password) => {
        const { data, error } = await supabase.auth.signUp({ email, password });

        if (error) {
          return { error: error.message };
        }

        return { needsEmailConfirmation: !data.session };
      },
      signInWithOAuth: async (provider) => {
        const redirectTo = `${window.location.origin}/`;
        const { error } = await supabase.auth.signInWithOAuth({
          provider,
          options: {
            redirectTo
          }
        });

        if (error) {
          return { error: error.message };
        }

        return {};
      },
      signOut: async () => {
        await supabase.auth.signOut();
      }
    }),
    [loading, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}
