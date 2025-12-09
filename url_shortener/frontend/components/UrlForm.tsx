"use client";
import React, { useState } from "react";
import { Idata } from "@/app/page";
import api from "@/lib/axios";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

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
      return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
      return false;
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onError?.("");

    if (!url.trim()) {
      onError?.("Please enter a valid URL");
      return;
    }
    if (!isValidUrl(url.trim())) {
      onError?.("Please enter a valid URL starting with http:// or https://");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/shorten", {
        originalUrl: url.trim(),
      });
      console.log(res.data);
      onSuccess?.(res.data);
      setUrl("");
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        "Something went wrong. Please try again";
      onError?.(msg);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <label className="block text-sm font-medium text-slate-300">
        Long URL
      </label>
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          type="url"
          className="flex-1 rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:text-slate-500"
          placeholder="https://example.com/very/long/url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={loading}
        />
        <Button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2justify-center rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-600 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Shortening..." : "Shorten"}
        </Button>
      </div>
      <p className="text-sx text-slate-500">
        Your Link will expire after 3 days, based on backend TTL settings
      </p>
    </form>
  );
};

export default UrlForm;
