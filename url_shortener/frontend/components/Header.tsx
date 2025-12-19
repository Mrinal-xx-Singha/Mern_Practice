"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-900/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            width={32}
            height={32}
            alt="Shrinkly Logo"
            className="rounded-lg"
            priority
          />
          <span className="text-lg md:text-xl font-semibold tracking-tight text-slate-100">
            Shrinkly
          </span>
        </Link>

        {/* Center: Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link
            href="/"
            className="text-slate-300 hover:text-indigo-400 transition"
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            className="text-slate-300 hover:text-indigo-400 transition"
          >
            Dashboard
          </Link>
          <Link
            href="/about"
            className="text-slate-300 hover:text-indigo-400 transition"
          >
            About
          </Link>
        </nav>

        {/* Right: Auth / User */}
        <div className="flex items-center gap-3">
          {session?.user && (
            <Image
              src={session.user.image || "/avatar.png"}
              width={32}
              height={32}
              alt="User Avatar"
              className="rounded-full border border-slate-700"
            />
          )}

          {session ? (
            <Button
              onClick={() => signOut()}
              variant="secondary"
              className="border border-slate-700 text-gray-100 bg-slate-800 hover:bg-slate-700"
            >
              Sign out
            </Button>
          ) : (
            <Button
              onClick={() => signIn("google")}
              className="bg-indigo-600 hover:bg-indigo-500"
            >
              Sign in
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
