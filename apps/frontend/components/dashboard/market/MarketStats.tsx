"use client";

import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  Activity,
} from "lucide-react";

import { useStock } from "@/context/StockContext";

import {
  formatCurrency,
  formatNumber,
} from "@/lib/formatters";

function StatCard({
  icon,
  title,
  primary,
  secondary,
}: {
  icon: React.ReactNode;
  title: string;
  primary: string;
  secondary?: string;
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

        <p className="mt-1 text-lg font-bold text-white">
          {primary}
        </p>

        {secondary && (
          <p className="text-sm text-gray-400">
            {secondary}
          </p>
        )}
      </div>
    </div>
  );
}

export default function MarketStats() {
  const { stock } = useStock();

  const open = formatCurrency(
    stock?.open,
    stock?.currency
  );

  const previousClose = formatCurrency(
    stock?.previousClose,
    stock?.currency
  );

  const dayHigh = formatCurrency(
    stock?.dayHigh,
    stock?.currency
  );

  const dayLow = formatCurrency(
    stock?.dayLow,
    stock?.currency
  );

  const weekHigh = formatCurrency(
    stock?.fiftyTwoWeekHigh,
    stock?.currency
  );

  const weekLow = formatCurrency(
    stock?.fiftyTwoWeekLow,
    stock?.currency
  );

  return (
    <div className="rounded-2xl border border-white/10 bg-[#111827]/80 p-6 shadow-lg backdrop-blur-md">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Market Statistics
      </h2>

      <div className="grid grid-cols-1 gap-4">

        <StatCard
          icon={<TrendingUp className="text-green-400" />}
          title="Open"
          primary={open.primary}
          secondary={open.secondary}
        />

        <StatCard
          icon={<Activity className="text-blue-400" />}
          title="Previous Close"
          primary={previousClose.primary}
          secondary={previousClose.secondary}
        />

        <StatCard
          icon={<TrendingUp className="text-green-500" />}
          title="Day High"
          primary={dayHigh.primary}
          secondary={dayHigh.secondary}
        />

        <StatCard
          icon={<TrendingDown className="text-red-500" />}
          title="Day Low"
          primary={dayLow.primary}
          secondary={dayLow.secondary}
        />

        <StatCard
          icon={<TrendingUp className="text-emerald-400" />}
          title="52 Week High"
          primary={weekHigh.primary}
          secondary={weekHigh.secondary}
        />

        <StatCard
          icon={<TrendingDown className="text-orange-400" />}
          title="52 Week Low"
          primary={weekLow.primary}
          secondary={weekLow.secondary}
        />

        <StatCard
          icon={<BarChart3 className="text-cyan-400" />}
          title="Volume"
          primary={formatNumber(stock?.volume)}
        />

        <StatCard
          icon={<BarChart3 className="text-purple-400" />}
          title="Average Volume"
          primary={formatNumber(stock?.averageVolume)}
        />

      </div>

    </div>
  );
}