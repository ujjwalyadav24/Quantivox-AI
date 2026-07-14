"use client";

import usePortfolio from "@/hooks/usePortfolio";
import usePortfolioAnalytics from "@/hooks/usePortfolioAnalytics";

import {
  PackageOpen,
} from "lucide-react";

import PortfolioRow from "./PortfolioRow";

export default function PortfolioTable() {
  const {
    portfolio,
    removeHolding,
  } = usePortfolio();

  const {
    analytics,
    loading,
    getHolding,
  } = usePortfolioAnalytics();

  if (loading) {
    return (
      <div className="mt-8 rounded-2xl border border-white/10 bg-[#111827]/80 p-10 text-center shadow-lg">

        <h2 className="text-2xl font-bold text-white">
          Loading Portfolio...
        </h2>

      </div>
    );
  }

  if (portfolio.length === 0) {
    return (
      <div className="mt-8 rounded-2xl border border-white/10 bg-[#111827]/80 p-10 text-center shadow-lg">

        <PackageOpen
          size={60}
          className="mx-auto text-gray-500"
        />

        <h2 className="mt-5 text-2xl font-bold text-white">
          No Holdings Yet
        </h2>

        <p className="mt-2 text-gray-400">
          Add your first stock to start
          building your portfolio.
        </p>

      </div>
    );
  }

  return (
    <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10 bg-[#111827]/80 shadow-lg">

      <table className="min-w-full">

        <thead className="bg-[#0B1120]">

          <tr>

            <th className="px-6 py-4 text-left text-gray-400">
              Symbol
            </th>

            <th className="px-6 py-4 text-left text-gray-400">
              Company
            </th>

            <th className="px-6 py-4 text-center text-gray-400">
              Qty
            </th>

            <th className="px-6 py-4 text-center text-gray-400">
              Buy Price
            </th>

            <th className="px-6 py-4 text-center text-gray-400">
              Current Price
            </th>

            <th className="px-6 py-4 text-center text-gray-400">
              Investment
            </th>

            <th className="px-6 py-4 text-center text-gray-400">
              Current Value
            </th>

            <th className="px-6 py-4 text-center text-gray-400">
              Profit / Loss
            </th>

            <th className="px-6 py-4 text-center text-gray-400">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {portfolio.map((item) => {
            const holding =
              getHolding(item.symbol);

            if (!holding) return null;

            return (
              <PortfolioRow
                key={item.id}
                holding={{
                  ...holding,

                  company: item.company,

                  quantity: item.quantity,

                  buyPrice: item.buyPrice,
                }}
                onDelete={() =>
                  removeHolding(item.id)
                }
              />
            );
          })}

        </tbody>

      </table>

    </div>
  );
}