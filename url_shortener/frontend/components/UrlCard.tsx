"use client";

import Link from "next/link";
import { Idata } from "@/app/page";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

const UrlCard = ({ urlData }: { urlData: Idata }) => {
  if (!urlData) return null;

  const { shortUrl, originalUrl } = urlData;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      // Replace alert(...) with toast if added later:
      // toast.success("Copied!");
      toast("Copied to clipboard", {
        icon: "📋",
      });
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div className="border border-slate-800 bg-slate-900/80 p-5 rounded-xl space-y-4 shadow-md hover:bg-slate-800/70 transition">
      {/* Label */}
      <p className="text-xs font-semibold uppercase text-slate-400 tracking-wide">
        Short URL
      </p>

      {/* Short URL + Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* URL */}
        <p className="text-sm md:text-base font-mono text-indigo-300 break-all">
          {shortUrl}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            type="button"
            onClick={handleCopy}
            className="border border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800 px-3 py-1.5 text-xs font-medium rounded-md"
          >
            Copy
          </Button>

          <Link
            href={shortUrl}
            target="_blank"
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 text-xs font-medium rounded-md text-center transition"
          >
            Open
          </Link>
        </div>
      </div>

      {/* Original URL */}
      <div className="pt-2 border-t border-slate-800">
        <p className="text-xs text-slate-500">Original URL:</p>
        <p className="text-slate-300 break-all font-mono text-sm mt-1">
          {originalUrl}
        </p>
      </div>
    </div>
  );
};

export default UrlCard;
