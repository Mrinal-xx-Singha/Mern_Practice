"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Header = () => {
  return (
    <header className="w-full bg-slate-900/70 border-b border-slate-800 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo + Title */}
        <Link href="/" className="flex items-center gap-3">
          {/* Replace with your logo */}
          <Image
            src="/logo.png"
            width={20}
            height={20}
            alt="App Logo"
            className="drop-shadow-sm rounded-lg"
          />
          <span className="text-lg md:text-xl font-semibold tracking-tight text-slate-100">
            Shrinkly
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link
            href="/"
            className="text-slate-300 hover:text-indigo-400 transition-colors"
          >
            Home
          </Link>

          <Link
            href="/dashboard"
            className="text-slate-300 hover:text-indigo-400 transition-colors"
          >
            Dashboard
          </Link>

          <Link
            href="/about"
            className="text-slate-300 hover:text-indigo-400 transition-colors"
          >
            About
          </Link>
        </nav>

        {/* Action Button */}
        <Link href="/dashboard">
          <Button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg">
            Manage Links
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
