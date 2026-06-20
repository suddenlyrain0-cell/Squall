import { Suspense } from "react";
import { LoginForm } from "@/features/auth/login-form";

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-7xl items-center justify-center px-5 py-12 lg:px-8">
      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  );
}
