"use client";
import React, { useEffect, useState } from "react";
import api from "../lib/axios";
import { Idata } from "../app/page";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

const AnalyticsCard = ({ urlData }: { urlData: Idata }) => {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<Idata>(urlData);

  const shortCode = stats?.shortCode;

  const fetchStats = async () => {
    if (!shortCode) {
      return;
    }
    try {
      setLoading(true);
      const res = await api.get(`/stats/${shortCode}`);

      setStats(res.data);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
      toast.error("Failed to fetch stats:");
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
    <div className="border border-slate-800 bg-slate-900/80 p-5 rounded-xl shadow-md space-y-5">
      <h3 className="text-lg font-semibold text-slate-100">Analytics</h3>

      {/* Clciks */}
      <div>
        <p className="text-slate-400 text-sm">Total Clicks:</p>
        <p className="text-indigo-400 font-semibold text-xl">{clicks}</p>
      </div>

      <p className="text-slate-400 text-sm">
        Created At:{" "}
        <span className="text-slate-300">
          {new Date(createdAt).toLocaleString()}
        </span>
      </p>
      <div>
        <p className="text-slate-400 text-sm">Expires At: </p>
        <p className="text-slate-300">{new Date(expiresAt).toLocaleString()}</p>
      </div>

      <Button
        onClick={fetchStats}
        disabled={loading}
        className="mt-3 px-4 py-2 bg-slate-700 text-slate-100 hover:bg-slate-600 rounded-lg"
      >
        {loading ? "Refreshing..." : "Refresh"}
      </Button>
    </div>
  );
};

export default AnalyticsCard;
