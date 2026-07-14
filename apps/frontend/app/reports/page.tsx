"use client";

import Sidebar from "../../components/dashboard/sidebar/Sidebar";
import Header from "../../components/dashboard/header/Header";

import PortfolioReport from "../../components/reports/PortfolioReport";
import StockReport from "../../components/reports/stckrprt";

export default function ReportsPage() {
  return (
    <main className="flex min-h-screen bg-[#050816]">

      <Sidebar />

      <section className="flex-1 overflow-y-auto">

        <Header />

        <div className="p-10">

          <h1 className="text-5xl font-black text-white">
            Reports
          </h1>

          <p className="mt-4 text-lg text-gray-400">
            Generate professional PDF reports powered by
            Quantivox AI.
          </p>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">

            {/* Portfolio Report */}

            <div className="rounded-2xl border border-white/10 bg-[#111827]/80 p-8 shadow-lg">

              <h2 className="text-2xl font-bold text-white">
                Portfolio Report
              </h2>

              <p className="mt-4 leading-7 text-gray-400">
                Generate a complete report of your
                portfolio including holdings, investment,
                current value and profit/loss.
              </p>

              <div className="mt-8">
                <PortfolioReport />
              </div>

            </div>

            {/* Stock Report */}

            <div className="rounded-2xl border border-white/10 bg-[#111827]/80 p-8 shadow-lg">

              <h2 className="text-2xl font-bold text-white">
                Stock Analysis Report
              </h2>

              <p className="mt-4 leading-7 text-gray-400">
                Generate a professional AI-powered report
                containing company overview, technical
                indicators, AI prediction, recommendation
                and latest market news.
              </p>

              <div className="mt-8">
                <StockReport />
              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}