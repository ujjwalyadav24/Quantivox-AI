"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { day: "Mon", price: 2410 },
  { day: "Tue", price: 2435 },
  { day: "Wed", price: 2422 },
  { day: "Thu", price: 2468 },
  { day: "Fri", price: 2457 },
  { day: "Sat", price: 2484 },
  { day: "Sun", price: 2478 },
];

export default function StockChart() {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#111827]/80 p-6 shadow-lg backdrop-blur-md">

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-2xl font-bold text-white">
            Stock Performance
          </h2>

          <p className="text-gray-400">
            Last 7 Days
          </p>
        </div>

        <div className="flex gap-2">
          <button className="rounded-lg bg-blue-600 px-3 py-1 text-sm text-white">
            1W
          </button>

          <button className="rounded-lg bg-[#1F2937] px-3 py-1 text-sm text-gray-300">
            1M
          </button>

          <button className="rounded-lg bg-[#1F2937] px-3 py-1 text-sm text-gray-300">
            1Y
          </button>
        </div>

      </div>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>

            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1F2937"
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
              fill="url(#colorPrice)"
              strokeWidth={3}
            />

          </AreaChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}