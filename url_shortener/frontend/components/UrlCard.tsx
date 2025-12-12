"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Idata } from "@/app/page";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { QRCodeCanvas } from "qrcode.react";
import { Copy, ExternalLink, QrCode } from "lucide-react";

const UrlCard = ({ urlData }: { urlData: Idata }) => {
  const [showQR, setShowQR] = useState(false);
  const qrRef = useRef<HTMLCanvasElement | null>(null);

  if (!urlData) return null;

  const { shortUrl, originalUrl } = urlData;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);

      toast.success("Copied to clipboard", {
        style: { background: "#0f172a", color: "#fff" },
      });
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const downloadQR = () => {
    const canvas = qrRef.current;
    if (!canvas) return;

    const pngUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = pngUrl;
    link.download = "qrcode.png";
    link.click();
  };

  return (
    <div className="border border-slate-800 bg-slate-900/80 p-6 rounded-xl shadow-lg hover:bg-slate-900/60 transition space-y-6">
      {/* HEADER */}
      <div>
        <p className="text-xs font-medium uppercase text-slate-400 tracking-wider">
          Short URL
        </p>
        <p className="text-indigo-300 font-mono text-sm md:text-base break-all mt-1">
          {shortUrl}
        </p>
      </div>

      {/* ACTION BAR */}
      <div className="flex flex-wrap items-center gap-3">
        <Button
          onClick={handleCopy}
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-100 px-3 py-1.5 rounded-md text-xs"
        >
          <Copy size={14} />
          Copy
        </Button>

        <Link
          href={shortUrl}
          target="_blank"
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-md text-xs"
        >
          <ExternalLink size={14} />
          Open
        </Link>

        <Button
          onClick={() => setShowQR(!showQR)}
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-100 px-3 py-1.5 rounded-md text-xs"
        >
          <QrCode size={14} />
          {showQR ? "Hide QR" : "Show QR"}
        </Button>
      </div>

      {/* QR SECTION */}
      {showQR && (
        <div className="flex flex-col items-center space-y-4 border border-slate-800 rounded-lg bg-slate-900/50 p-4">
          <QRCodeCanvas
            value={shortUrl}
            size={180}
            bgColor="#ffffff"
            fgColor="#000000"
            marginSize={1}
            ref={qrRef}
          />

          <Button
            onClick={downloadQR}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-md text-sm"
          >
            Download QR
          </Button>
        </div>
      )}

      {/* ORIGINAL URL */}
      <div className="pt-4 border-t border-slate-800">
        <p className="text-xs text-slate-500 uppercase tracking-wide">
          Original URL
        </p>
        <p className="text-slate-300 font-mono break-all text-sm mt-1">
          {originalUrl}
        </p>
      </div>
    </div>
  );
};

export default UrlCard;
