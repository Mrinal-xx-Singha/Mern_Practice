"use client";

import React, { useEffect, useState } from "react";
import api from "../lib/axios";
import { Idata } from "../app/page";
import { Button } from "./ui/button";
import { BarChart3, RefreshCcw } from "lucide-react";
import toast from "react-hot-toast";

const AnalyticsCard = ({ urlData }: { urlData: Idata }) => {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<Idata>(urlData);

  const shortCode = stats?.shortCode;

  const fetchStats = async () => {
    if (!shortCode) return;

    try {
      setLoading(true);
      const res = await api.get(`/stats/${shortCode}`);
      setStats(res.data);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
      toast.error("Failed to fetch stats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [shortCode]);

  if (!stats) return null;

  const { clicks, createdAt, expiresAt } = stats;

  return (
    <div className="border border-slate-800 bg-slate-900/70 p-6 rounded-xl shadow-lg backdrop-blur-sm space-y-6 transition">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-indigo-400" />
          Analytics Overview
        </h3>
        <Button
          variant="secondary"
          onClick={fetchStats}
          disabled={loading}
          className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg flex items-center gap-2"
        >
          <RefreshCcw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          <span className="hidden sm:inline">
            {loading ? "Refreshing..." : "Refresh"}
          </span>
        </Button>
      </div>

      {/* Clicks Section */}
      <div className="bg-slate-800/40 border border-slate-700 rounded-xl px-5 py-4 flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm">Total Clicks</p>
          <p className="text-indigo-400 font-bold text-3xl mt-1">{clicks}</p>
        </div>
        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-indigo-600/20 border border-indigo-500/40">
          <BarChart3 className="text-indigo-400 h-6 w-6" />
        </div>
      </div>

      {/* Dates */}
      <div className="space-y-3">
        <div>
          <p className="text-slate-500 text-xs uppercase tracking-wide">
            Created At
          </p>
          <p className="text-slate-300 text-sm mt-1">
            {new Date(createdAt).toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-slate-500 text-xs uppercase tracking-wide">
            Expires At
          </p>
          <p className="text-slate-300 text-sm mt-1">
            {new Date(expiresAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCard;
