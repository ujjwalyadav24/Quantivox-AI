"use client";

import usePortfolio from "@/hooks/usePortfolio";

import {
  Briefcase,
  IndianRupee,
  TrendingUp,
  Wallet,
} from "lucide-react";

import { formatCurrency } from "@/lib/formatters";

function SummaryCard({
  title,
  value,
  secondary,
  icon,
  color,
}: {
  title: string;
  value: string;
  secondary?: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div className="rounded-xl bg-[#0B1120] p-5">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-gray-400">
            {title}
          </p>

          <h3 className="mt-3 text-3xl font-bold text-white">
            {value}
          </h3>

          {secondary && (
            <p className="mt-1 text-sm text-gray-400">
              {secondary}
            </p>
          )}

        </div>

        <div
          className={`rounded-xl p-3 ${color}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}

export default function PortfolioSummary() {
  const { portfolio } = usePortfolio();

  const totalHoldings = portfolio.length;

  const totalInvestment = portfolio.reduce(
    (sum, item) =>
      sum + item.buyPrice * item.quantity,
    0
  );

  const investment =
    formatCurrency(totalInvestment, "INR");

  return (
    <div className="rounded-2xl border border-white/10 bg-[#111827]/80 p-6 shadow-lg backdrop-blur-md">

      <h2 className="mb-8 text-3xl font-bold text-white">
        Portfolio Summary
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

        <SummaryCard
          title="Total Holdings"
          value={totalHoldings.toString()}
          icon={<Briefcase className="text-white" />}
          color="bg-blue-500/20"
        />

        <SummaryCard
          title="Total Investment"
          value={investment.primary}
          secondary={investment.secondary}
          icon={
            <IndianRupee className="text-white" />
          }
          color="bg-green-500/20"
        />

        <SummaryCard
          title="Current Value"
          value="Coming Soon"
          icon={<Wallet className="text-white" />}
          color="bg-cyan-500/20"
        />

        <SummaryCard
          title="Profit / Loss"
          value="Coming Soon"
          icon={
            <TrendingUp className="text-white" />
          }
          color="bg-yellow-500/20"
        />

      </div>

    </div>
  );
}