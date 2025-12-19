"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const { data: session } = useSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl space-y-6 text-center">
        <h1 className="text-2xl font-semibold text-slate-100">
          Sign in to continue
        </h1>

        <Button
          onClick={() => signIn("google")}
          className="bg-indigo-600 hover:bg-indigo-500 w-full"
        >
          Continue with Google
        </Button>
      </div>
    </div>
  );
}
