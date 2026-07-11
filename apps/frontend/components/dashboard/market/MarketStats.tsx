"use client";

import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  Activity,
} from "lucide-react";

import { useStock } from "@/context/StockContext";

function StatCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-[#0B1120] p-4">
      <div className="rounded-lg bg-white/5 p-3">
        {icon}
      </div>

      <div>
        <p className="text-sm text-gray-400">
          {title}
        </p>

        <p className="text-lg font-bold text-white">
          {value}
        </p>
      </div>
    </div>
  );
}

export default function MarketStats() {
  const { stock } = useStock();

  return (
    <div className="rounded-2xl border border-white/10 bg-[#111827]/80 p-6 shadow-lg backdrop-blur-md">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Market Statistics
      </h2>

      <div className="grid grid-cols-1 gap-4">

        <StatCard
          icon={<TrendingUp className="text-green-400" />}
          title="Open"
          value={stock?.open ?? "--"}
        />

        <StatCard
          icon={<Activity className="text-blue-400" />}
          title="Previous Close"
          value={stock?.previousClose ?? "--"}
        />

        <StatCard
          icon={<TrendingUp className="text-green-500" />}
          title="Day High"
          value={stock?.dayHigh ?? "--"}
        />

        <StatCard
          icon={<TrendingDown className="text-red-500" />}
          title="Day Low"
          value={stock?.dayLow ?? "--"}
        />

        <StatCard
          icon={<TrendingUp className="text-emerald-400" />}
          title="52 Week High"
          value={stock?.fiftyTwoWeekHigh ?? "--"}
        />

        <StatCard
          icon={<TrendingDown className="text-orange-400" />}
          title="52 Week Low"
          value={stock?.fiftyTwoWeekLow ?? "--"}
        />

        <StatCard
          icon={<BarChart3 className="text-cyan-400" />}
          title="Volume"
          value={
            stock?.volume
              ? stock.volume.toLocaleString()
              : "--"
          }
        />

        <StatCard
          icon={<BarChart3 className="text-purple-400" />}
          title="Average Volume"
          value={
            stock?.averageVolume
              ? stock.averageVolume.toLocaleString()
              : "--"
          }
        />

      </div>

    </div>
  );
}