"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  TrendingUp,
  TrendingDown,
  BarChart3,
} from "lucide-react";

import { getTechnical } from "@/lib/api";
import { useStock } from "@/context/StockContext";

type TechnicalData = {
  rsi: number;
  ema20: number;
  ema50: number;
  sma50: number;
  sma200: number;
  macd: number;
  signal: number;
  histogram: number;
};

function IndicatorCard({
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
        <p className="text-sm text-gray-400">{title}</p>
        <p className="text-lg font-bold text-white">{value}</p>
      </div>
    </div>
  );
}

export default function TechnicalIndicators() {
  const { stock } = useStock();

  const [data, setData] = useState<TechnicalData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!stock?.symbol) {
      setData(null);
      return;
    }

    async function loadIndicators() {
      setLoading(true);

      try {
        const response = await getTechnical(stock.symbol);
        setData(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadIndicators();
  }, [stock?.symbol]);

  const trend =
    data && data.ema20 > data.ema50 ? "Bullish" : "Bearish";

  const trendColor =
    trend === "Bullish"
      ? "text-green-400"
      : "text-red-400";

  const rsiStatus = data
    ? data.rsi > 70
      ? "Overbought"
      : data.rsi < 30
      ? "Oversold"
      : "Neutral"
    : "--";

  return (
    <div className="rounded-2xl border border-white/10 bg-[#111827]/80 p-6 shadow-lg backdrop-blur-md">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Technical Indicators
      </h2>

      {!stock && (
        <p className="text-gray-400">
          Search a stock to view technical indicators.
        </p>
      )}

      {loading && (
        <p className="text-blue-400">
          Loading indicators...
        </p>
      )}

      {!loading && data && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          <IndicatorCard
            icon={<Activity className="text-blue-400" />}
            title={`RSI (${rsiStatus})`}
            value={data.rsi}
          />

          <IndicatorCard
            icon={<BarChart3 className="text-cyan-400" />}
            title="MACD"
            value={data.macd}
          />

          <IndicatorCard
            icon={<TrendingUp className="text-green-400" />}
            title="EMA 20"
            value={data.ema20}
          />

          <IndicatorCard
            icon={<TrendingUp className="text-emerald-400" />}
            title="EMA 50"
            value={data.ema50}
          />

          <IndicatorCard
            icon={<TrendingDown className="text-orange-400" />}
            title="SMA 50"
            value={data.sma50}
          />

          <IndicatorCard
            icon={<TrendingDown className="text-red-400" />}
            title="SMA 200"
            value={data.sma200}
          />

          <div className="rounded-xl bg-[#0B1120] p-4 md:col-span-2">
            <p className="text-sm text-gray-400">
              Market Trend
            </p>

            <p className={`mt-2 text-2xl font-bold ${trendColor}`}>
              {trend}
            </p>
          </div>

        </div>
      )}
    </div>
  );
}