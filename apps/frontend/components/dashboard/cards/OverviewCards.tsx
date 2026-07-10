"use client";

import {
  TrendingUp,
  DollarSign,
  Building2,
  Brain,
} from "lucide-react";

import { useStock } from "@/context/StockContext";

export default function OverviewCards() {
  const { stock } = useStock();

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {/* Current Price */}
      <div className="rounded-2xl border border-white/10 bg-[#111827]/80 p-6 shadow-lg backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Current Price</p>

            <h2 className="mt-3 text-3xl font-bold text-white">
              {stock
                ? `${stock.currency} ${stock.price?.toFixed(2)}`
                : "--"}
            </h2>
          </div>

          <div className="rounded-xl bg-white/5 p-4 text-blue-400">
            <DollarSign size={30} />
          </div>
        </div>
      </div>

      {/* Company */}
      <div className="rounded-2xl border border-white/10 bg-[#111827]/80 p-6 shadow-lg backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Company</p>

            <h2 className="mt-3 text-2xl font-bold text-white">
              {stock?.company ?? "--"}
            </h2>
          </div>

          <div className="rounded-xl bg-white/5 p-4 text-green-400">
            <TrendingUp size={30} />
          </div>
        </div>
      </div>

      {/* Market Cap */}
      <div className="rounded-2xl border border-white/10 bg-[#111827]/80 p-6 shadow-lg backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Market Cap</p>

            <h2 className="mt-3 text-2xl font-bold text-white">
              {stock
                ? `$${(stock.marketCap! / 1_000_000_000_000).toFixed(2)} T`
                : "--"}
            </h2>
          </div>

          <div className="rounded-xl bg-white/5 p-4 text-purple-400">
            <Building2 size={30} />
          </div>
        </div>
      </div>

      {/* Sector */}
      <div className="rounded-2xl border border-white/10 bg-[#111827]/80 p-6 shadow-lg backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Sector</p>

            <h2 className="mt-3 text-2xl font-bold text-white">
              {stock?.sector ?? "--"}
            </h2>
          </div>

          <div className="rounded-xl bg-white/5 p-4 text-cyan-400">
            <Brain size={30} />
          </div>
        </div>
      </div>
    </div>
  );
}