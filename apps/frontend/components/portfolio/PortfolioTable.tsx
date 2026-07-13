"use client";

import usePortfolio from "@/hooks/usePortfolio";

import {
  Trash2,
  PackageOpen,
} from "lucide-react";

import { formatCurrency } from "@/lib/formatters";

export default function PortfolioTable() {
  const {
    portfolio,
    removeHolding,
  } = usePortfolio();

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
    <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-[#111827]/80 shadow-lg">

      <table className="w-full">

        <thead className="bg-[#0B1120]">

          <tr>

            <th className="px-6 py-4 text-left text-gray-400">
              Symbol
            </th>

            <th className="px-6 py-4 text-left text-gray-400">
              Company
            </th>

            <th className="px-6 py-4 text-center text-gray-400">
              Quantity
            </th>

            <th className="px-6 py-4 text-center text-gray-400">
              Buy Price
            </th>

            <th className="px-6 py-4 text-center text-gray-400">
              Investment
            </th>

            <th className="px-6 py-4 text-center text-gray-400">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {portfolio.map((item) => {
            const buyPrice = formatCurrency(
              item.buyPrice,
              "INR"
            );

            const investment =
              formatCurrency(
                item.buyPrice *
                  item.quantity,
                "INR"
              );

            return (
              <tr
                key={item.id}
                className="border-t border-white/10 hover:bg-white/5 transition"
              >

                <td className="px-6 py-5 font-bold text-white">
                  {item.symbol}
                </td>

                <td className="px-6 py-5 text-gray-300">
                  {item.company}
                </td>

                <td className="px-6 py-5 text-center text-white">
                  {item.quantity}
                </td>

                <td className="px-6 py-5 text-center">

                  <p className="font-semibold text-white">
                    {buyPrice.primary}
                  </p>

                  {buyPrice.secondary && (
                    <p className="text-xs text-gray-400">
                      {buyPrice.secondary}
                    </p>
                  )}

                </td>

                <td className="px-6 py-5 text-center">

                  <p className="font-semibold text-green-400">
                    {investment.primary}
                  </p>

                  {investment.secondary && (
                    <p className="text-xs text-gray-400">
                      {investment.secondary}
                    </p>
                  )}

                </td>

                <td className="px-6 py-5 text-center">

                  <button
                    onClick={() =>
                      removeHolding(item.id)
                    }
                    className="rounded-lg bg-red-500/20 p-3 text-red-400 transition hover:bg-red-500/30"
                  >

                    <Trash2 size={18} />

                  </button>

                </td>

              </tr>
            );
          })}

        </tbody>

      </table>

    </div>
  );
}