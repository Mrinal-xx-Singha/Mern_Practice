"use client";

import React, { useEffect, useState } from "react";
import api from "../lib/axios";
import Link from "next/link";

interface ILink {
  _id: string;
  originalUrl: string;
  shortUrl: string;
  clicks: number;
  createdAt: string;
  expiresAt: string;
}
const Page = () => {
  const [urls, setUrls] = useState<ILink[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchLinks = async () => {
    try {
      const res = await api.get("/shortenedUrls");
      console.log("Data", res.data);

      setUrls(res.data);
    } catch (error) {
      console.log("Error fetching URLs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  if (loading) {
    return (
      <div className="text-slate-400 text-center py-10">Loading URLs...</div>
    );
  }
  console.log("URLS", urls);

  return (
    <div className="w-full max-w-3xl mx-auto mt-6 p-6 bg-slate-900/60 rounded-xl border border-slate-800 shadow-lg">
      <h2 className="text-xl font-semibold text-slate-100 mb-4">
        All Shortened URLs
      </h2>

      {urls.length > 0 ? (
        <ul className="space-y-3">
          {urls.map((url) => (
            <li
              key={url._id}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 p-4 bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-800/80 transition"
            >
              <div className="flex flex-col">
                <div>
                  <p className="text-slate-400 text-sm">Original URL</p>
                  <p className="text-slate-300 break-all text-sm">
                    {url.originalUrl}
                  </p>
                </div>

                <div className="md:text-right">
                  <p className="text-slate-400 text-sm">Short URL</p>
                  <Link
                    href={`${url.shortUrl}`}
                    target="_blank"
                    className="text-indigo-400 hover:text-indigo-300 font-medium break-all"
                  >
                    {url.shortUrl}
                  </Link>
                </div>
              </div>

              <div className="md:text-right">
                <p className="text-slate-400 text-sm">Clicks</p>
                <p className="text-slate-300 text-sm">{url.clicks}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-slate-500 text-center py-6">
          No URLs found. Create one from the homepage.
        </p>
      )}
    </div>
  );
};

export default Page;
