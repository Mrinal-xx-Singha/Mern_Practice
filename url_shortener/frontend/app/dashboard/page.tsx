"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/axios";
import Link from "next/link";
import { Eye, File, ExternalLink, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import QRModal from "@/components/QRModal";
import { Spinner } from "@/components/ui/spinner";

interface ILink {
  _id: string;
  originalUrl: string;
  shortUrl: string;
  clicks: number;
  createdAt: string;
  expiresAt: string;
}

const formatDate = (iso?: string) => {
  if (!iso) return "-";
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
};

const timeLeft = (iso?: string) => {
  if (!iso) return "-";
  const diff = new Date(iso).getTime() - Date.now();
  if (diff <= 0) return "Expired";
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  if (days > 0) return `${days}d ${hours}h`;
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  return `${hours}h ${mins}m`;
};

const Page: React.FC = () => {
  const [urls, setUrls] = useState<ILink[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [qrURL, setQRUrl] = useState<string | null>(null);
  const [openQR, setOpenQR] = useState<boolean>(false);

  const openQRModal = (url: string) => {
    setQRUrl(url);
    setOpenQR(true);
  };

  const closeQRModal = () => {
    setQRUrl(null);
    setOpenQR(false);
  };

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const res = await api.get("/urls");
        setUrls(res.data || []);
      } catch (error) {
        console.error("Error fetching URLs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLinks();
  }, []);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      console.debug("Copied to clipboard");
    } catch {
      console.debug("Copy failed");
    }
  };

  if (loading) {
    return (
      <div className="text-slate-400 text-center py-10">
        <Spinner className="size-10 text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-6 p-6 bg-slate-900/60 rounded-xl border border-slate-800 shadow-lg">
      <h2 className="text-2xl font-semibold text-slate-100 mb-6">
        All Shortened URLs
      </h2>

      {urls.length > 0 ? (
        <ul className="space-y-4">
          {urls.map((url) => (
            <li
              key={url._id}
              className="p-5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800/70 transition grid grid-cols-1 md:grid-cols-12 gap-6"
            >
              {/* LEFT SECTION */}
              <div className="md:col-span-8 space-y-4">
                {/* Original URL */}
                <div>
                  <p className="text-slate-400 text-xs uppercase tracking-wide">
                    Original URL
                  </p>
                  <p className="text-slate-300 break-words text-sm mt-1">
                    {url.originalUrl}
                  </p>
                </div>

                {/* Short URL & Actions */}
                <div>
                  <p className="text-slate-400 text-xs uppercase tracking-wide">
                    Short URL
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    {/* Short URL */}
                    <Link
                      href={url.shortUrl}
                      target="_blank"
                      className="text-indigo-400 hover:text-indigo-300 font-medium break-words text-sm"
                    >
                      {url.shortUrl}
                    </Link>

                    {/* Copy */}
                    <Button
                      size="sm"
                      onClick={() => handleCopy(url.shortUrl)}
                      className="bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-100 px-2"
                    >
                      <File size={14} />
                    </Button>

                    {/* Open */}
                    <Link
                      href={url.shortUrl}
                      target="_blank"
                      className="bg-indigo-600 hover:bg-indigo-500 text-white px-2 py-1 rounded-md flex items-center gap-1 text-sm"
                    >
                      <ExternalLink size={14} />
                    </Link>

                    {/* QR */}
                    <Button
                      size="sm"
                      onClick={() => openQRModal(url.shortUrl)}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-2 py-1 rounded-md flex items-center gap-1"
                    >
                      <QrCode size={14} />
                      <span className="hidden sm:inline text-xs">QR</span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* RIGHT SECTION */}
              <div className="md:col-span-4 flex flex-col justify-between md:items-end space-y-3">
                {/* Clicks */}
                <div className="inline-flex items-center gap-2 bg-slate-800/60 border border-slate-700 rounded-md px-3 py-2">
                  <Eye size={16} className="text-slate-200" />
                  <div className="text-right">
                    <p className="text-slate-400 text-xs">Clicks</p>
                    <p className="text-slate-200 font-medium">
                      {url.clicks ?? 0}
                    </p>
                  </div>
                </div>

                {/* Meta */}
                <div className="text-sm text-right">
                  <p className="text-slate-400 text-xs">Created</p>
                  <p className="text-slate-300">{formatDate(url.createdAt)}</p>

                  <p className="text-slate-400 text-xs mt-2">Expires</p>
                  <p
                    className={`mt-1 font-medium ${
                      new Date(url.expiresAt).getTime() <= Date.now()
                        ? "text-red-400"
                        : "text-amber-300"
                    }`}
                  >
                    {timeLeft(url.expiresAt)}
                  </p>
                </div>

                {/* QR Modal */}
                <QRModal
                  open={openQR}
                  onClose={closeQRModal}
                  shortUrl={qrURL}
                />
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
