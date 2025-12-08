"use client";
import React, { useEffect, useState } from "react";
import UrlForm from "./components/UrlForm";
import UrlCard from "./components/UrlCard";
import AnalyticsCard from "./components/AnalyticsCard";
export interface Idata {
  _id: string;
  originalUrl: string;
  shortUrl: string;
  clicks: number;
  createdAt: string;
  expiresAt: string;
}
const Home = () => {
  const [error, setError] = useState("");
  const [lastCreatedUrl, setLastCreatedUrl] = useState<Idata | null>(null);
  return (
    <main className="w-full max-w-2xl mx-auto p-4">
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8">
        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            URL Shortener
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Paste a long URL and get a short, trackable link with expiry.
          </p>
        </header>
        <UrlForm
          onSuccess={(data) => {
            setLastCreatedUrl(data);
            setError("");
          }}
          onError={(msg) => setError(msg)}
        />
        {error && (
          <p className="mt-4 text-sm text-red-400 bg-red-950/40 border border-red-900 px-3 py-2 rounded-md">
            {error}
          </p>
        )}
        {lastCreatedUrl && (
          <div className="mt-6 space-y-4">
            <UrlCard urlData={lastCreatedUrl} />
            <AnalyticsCard urlData={lastCreatedUrl} />
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
