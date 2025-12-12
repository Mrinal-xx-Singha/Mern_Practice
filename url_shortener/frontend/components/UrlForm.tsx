"use client";

import React, { useState } from "react";
import { Idata } from "@/app/page";
import api from "@/lib/axios";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { Loader2, Link2 } from "lucide-react";

interface FormProps {
  onSuccess?: (data: Idata) => void;
  onError?: (msg: string) => void;
}

const UrlForm = ({ onSuccess, onError }: FormProps) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidUrl = (url: string) => {
    try {
      const parsed = new URL(url);
      return ["http:", "https:"].includes(parsed.protocol);
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onError?.("");

    if (!url.trim()) {
      onError?.("Please enter a valid URL.");
      return;
    }
    if (!isValidUrl(url.trim())) {
      onError?.("URL must start with http:// or https://");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/shorten", {
        originalUrl: url.trim(),
      });

      onSuccess?.(res.data);
      toast.success("URL shortened successfully!", {
        position: "top-right",
      });

      setUrl("");
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(msg);
      onError?.(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-slate-900/50 p-5 rounded-xl border border-slate-800 shadow-md"
    >
      {/* Label */}
      <label className="block text-sm font-medium text-slate-300 flex items-center gap-1">
        <Link2 className="h-4 w-4 text-indigo-400" />
        Enter Long URL
      </label>

      {/* Input + Button */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          type="url"
          className="flex-1 rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-200 placeholder:text-slate-500"
          placeholder="https://example.com/very-long-url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={loading}
        />

        <Button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Shortening...
            </>
          ) : (
            "Shorten"
          )}
        </Button>
      </div>

      {/* Helper text */}
      <p className="text-xs text-slate-500">
        Link will expire automatically after{" "}
        <span className="text-slate-300">3 days</span>.
      </p>
    </form>
  );
};

export default UrlForm;
