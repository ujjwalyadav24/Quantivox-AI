"use client";

import {
  TrendingUp,
  DollarSign,
  Building2,
  Brain,
} from "lucide-react";

import { useStock } from "@/context/StockContext";

import {
  formatCurrency,
  formatMarketCap,
} from "@/lib/formatters";

export default function OverviewCards() {
  const { stock } = useStock();

  const price = stock
    ? formatCurrency(stock.price, stock.currency)
    : null;

  const marketCap = stock
    ? formatMarketCap(stock.marketCap, stock.currency)
    : null;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

      {/* Current Price */}

      <div className="rounded-2xl border border-white/10 bg-[#111827]/80 p-6 shadow-lg backdrop-blur-md">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-gray-400">
              Current Price
            </p>

            {stock ? (
              <>
                <h2 className="mt-3 text-3xl font-bold text-white">
                  {price?.primary}
                </h2>

                {price?.secondary && (
                  <p className="mt-1 text-sm text-gray-400">
                    {price.secondary}
                  </p>
                )}
              </>
            ) : (
              <h2 className="mt-3 text-3xl font-bold text-white">
                --
              </h2>
            )}

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

            <p className="text-sm text-gray-400">
              Company
            </p>

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

            <p className="text-sm text-gray-400">
              Market Cap
            </p>

            {stock ? (
              <>
                <h2 className="mt-3 text-2xl font-bold text-white">
                  {marketCap?.primary}
                </h2>

                {marketCap?.secondary && (
                  <p className="mt-1 text-sm text-gray-400">
                    {marketCap.secondary}
                  </p>
                )}
              </>
            ) : (
              <h2 className="mt-3 text-2xl font-bold text-white">
                --
              </h2>
            )}

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

            <p className="text-sm text-gray-400">
              Sector
            </p>

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