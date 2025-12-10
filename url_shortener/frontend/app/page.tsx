"use client";

import React, { useState } from "react";
import UrlForm from "@/components/UrlForm";
import UrlCard from "@/components/UrlCard";
import AnalyticsCard from "@/components/AnalyticsCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export interface Idata {
  _id: string;
  originalUrl: string;
  shortUrl: string;
  shortCode: string;
  clicks: number;
  createdAt: string;
  expiresAt: string;
}

const Home = () => {
  const [error, setError] = useState("");
  const [lastCreatedUrl, setLastCreatedUrl] = useState<Idata | null>(null);

  return (
    <main className="w-full max-w-3xl mx-auto px-4 py-8">
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl shadow-xl p-6 md:p-10">
        {/* Top Action Row */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-100">
            URL Shortener
          </h1>

          <Link href="/dashboard">
            <Button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg shadow-sm">
              Dashboard
            </Button>
          </Link>
        </div>

        <p className="text-sm text-slate-400 mb-6">
          Paste a long URL and generate a secure, trackable shortened link with
          automatic expiration.
        </p>

        {/* URL FORM */}
        <UrlForm
          onSuccess={(data) => {
            setLastCreatedUrl(data);
            setError("");
          }}
          onError={(msg) => setError(msg)}
        />

        {/* ERROR MESSAGE */}
        {error && (
          <p className="mt-4 text-sm text-red-400 bg-red-950/40 border border-red-900 px-3 py-2 rounded-md">
            {error}
          </p>
        )}

        {/* RESULTS */}
        {lastCreatedUrl && (
          <div className="mt-8 space-y-6">
            <UrlCard urlData={lastCreatedUrl} />
            <AnalyticsCard urlData={lastCreatedUrl} />
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
