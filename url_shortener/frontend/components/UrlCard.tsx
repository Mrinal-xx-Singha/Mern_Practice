"use client";
import Link from "next/link";
import { Idata } from "@/app/page";
import { Button } from "./ui/button";

const UrlCard = ({ urlData }: { urlData: Idata }) => {
  if (!urlData) return null;

  const { shortUrl, originalUrl } = urlData;
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl || "");
      alert("URL copied to clipboard");
    } catch (err) {
      console.error("Failed to copy URL", err);
    }
  };
  return (
    <div className="border border-slate-800 bg-slate-900/80 p-4 rounded-lg space-y-2">
      <p className="text-xs font-semibold uppercase text-slate-400 tracking-wide">
        Short URL
      </p>
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-sm md:text-base font-mono text-indigo-300 break-all">
            {shortUrl}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            type="button"
            onClick={handleCopy}
            className="rounded-md border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-100 hover:bg-slate-800 transition-colors"
          >
            Copy
          </Button>
          {shortUrl && (
            <Link
              href={shortUrl}
              target="_blank"
              className="rounded-md bg-indigo-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-600 transition-colors text-center"
            >
              Open
            </Link>
          )}
        </div>
      </div>
      {/* Analytics */}
      <div className="mt-2">
        <p className="text-xs text-salte-500">
          Original:{" "}
          <span className="break-all text-slate-300 font-mono">
            {originalUrl}
          </span>
        </p>
      </div>
    </div>
  );
};

export default UrlCard;
