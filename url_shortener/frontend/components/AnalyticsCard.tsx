"use client";
import React, { useEffect, useState } from "react";
import api from "../lib/axios";
import { Idata } from "../app/page";
import { Button } from "./ui/button";

const AnalyticsCard = ({ urlData }: { urlData: Idata }) => {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(urlData);
  const shortCode = stats?.shortCode;
  console.log("Short Code:", shortCode);

  const fetchStats = async () => {
    if (!shortCode) {
      return;
    }
    try {
      setLoading(true);
      const res = await api.get(`/shortened/${shortCode}`);
      console.log("Stats:", res.data);
      setStats(res.data);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [shortCode]);

  if (!stats) return null;

  const { clicks, createdAt, expiresAt } = stats;
  console.log(stats);
  return (
    <div className="border border-slate-700 p-4 rounded-xl bg-slate-900">
      <h3 className="text-sm font-semibold text-slate-200 mb-2">Analytics</h3>

      <p className="text-slate-400 text-sm">
        Clicks: <span className="text-indigo-400">{clicks}</span>
      </p>

      <p className="text-slate-400 text-sm">
        Created At:{" "}
        <span className="text-slate-300">
          {new Date(createdAt).toLocaleString()}
        </span>
      </p>

      <p className="text-slate-400 text-sm">
        Expires At:{" "}
        <span className="text-slate-300">
          {new Date(expiresAt).toLocaleString()}
        </span>
      </p>

      <Button
        onClick={fetchStats}
        disabled={loading}
        className="mt-3 px-3 py-1 bg-slate-700 rounded-lg"
      >
        {loading ? "Refreshing..." : "Refresh"}
      </Button>
    </div>
  );
};

export default AnalyticsCard;
