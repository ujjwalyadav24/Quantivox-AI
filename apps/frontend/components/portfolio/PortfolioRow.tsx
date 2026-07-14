"use client";

import { Trash2 } from "lucide-react";

import { formatCurrency } from "@/lib/formatters";

type Props = {
  holding: {
    symbol: string;
    company: string;
    quantity: number;
    buyPrice: number;
    investment: number;
    currentPrice: number;
    currentValue: number;
    profitLoss: number;
    currency: string;
  };

  onDelete: () => void;
};

export default function PortfolioRow({
  holding,
  onDelete,
}: Props) {
  const buyPrice = formatCurrency(
    holding.buyPrice,
    holding.currency
  );

  const currentPrice = formatCurrency(
    holding.currentPrice,
    holding.currency
  );

  const investment = formatCurrency(
    holding.investment,
    holding.currency
  );

  const currentValue = formatCurrency(
    holding.currentValue,
    holding.currency
  );

  const profitLoss = formatCurrency(
    Math.abs(holding.profitLoss),
    holding.currency
  );

  const isProfit = holding.profitLoss >= 0;

  return (
    <tr className="border-t border-white/10 transition hover:bg-white/5">

      <td className="px-6 py-5 font-bold text-white">
        {holding.symbol}
      </td>

      <td className="px-6 py-5 text-gray-300">
        {holding.company}
      </td>

      <td className="px-6 py-5 text-center text-white">
        {holding.quantity}
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

        <p className="font-semibold text-cyan-400">
          {currentPrice.primary}
        </p>

        {currentPrice.secondary && (
          <p className="text-xs text-gray-400">
            {currentPrice.secondary}
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

        <p className="font-semibold text-blue-400">
          {currentValue.primary}
        </p>

        {currentValue.secondary && (
          <p className="text-xs text-gray-400">
            {currentValue.secondary}
          </p>
        )}

      </td>

      <td className="px-6 py-5 text-center">

        <p
          className={`font-bold ${
            isProfit
              ? "text-green-400"
              : "text-red-400"
          }`}
        >
          {isProfit ? "+" : "-"}
          {profitLoss.primary}
        </p>

        {profitLoss.secondary && (
          <p className="text-xs text-gray-400">
            {profitLoss.secondary}
          </p>
        )}

      </td>

      <td className="px-6 py-5 text-center">

        <button
          onClick={onDelete}
          className="rounded-lg bg-red-500/20 p-3 text-red-400 transition hover:bg-red-500/30"
        >
          <Trash2 size={18} />
        </button>

      </td>

    </tr>
  );
}