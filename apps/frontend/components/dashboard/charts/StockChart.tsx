"use client";

import { useMemo } from "react";
import { useStock } from "@/context/StockContext";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function StockChart() {
  const { history, stock } = useStock();

  const chartData = useMemo(() => {
    return history.map((item) => ({
      day: item.date.slice(5), // MM-DD
      price: item.close,
    }));
  }, [history]);

  return (
    <div className="rounded-2xl border border-white/10 bg-[#111827]/80 p-6 shadow-lg backdrop-blur-md">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            {stock?.company ?? "Stock Performance"}
          </h2>

          <p className="text-gray-400">
            {stock?.symbol ?? "Search a stock"}
          </p>
        </div>

        <div className="rounded-lg bg-blue-600 px-3 py-1 text-sm text-white">
          1 Month
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient
                id="colorPrice"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#3B82F6"
                  stopOpacity={0.8}
                />
                <stop
                  offset="100%"
                  stopColor="#3B82F6"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#1F2937"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="day"
              stroke="#9CA3AF"
            />

            <YAxis
              stroke="#9CA3AF"
            />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="price"
              stroke="#3B82F6"
              strokeWidth={3}
              fill="url(#colorPrice)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}