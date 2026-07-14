"use client";

import Sidebar from "../../components/dashboard/sidebar/Sidebar";
import Header from "../../components/dashboard/header/Header";

import ReportCard from "../../components/reports/ReportCard";

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
            Generate professional reports for your portfolio
            and stock analysis.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-8 xl:grid-cols-2">

            <ReportCard
              title="Portfolio Report"
              description="Generate a PDF report containing your holdings, total investment, current value and overall profit or loss."
              buttonText="Generate Portfolio Report"
              onClick={() =>
                alert(
                  "Portfolio Report feature will be connected next."
                )
              }
            />

            <ReportCard
              title="Stock Analysis Report"
              description="Generate a detailed PDF report for any searched stock including company overview, technical indicators, AI prediction and market statistics."
              buttonText="Generate Stock Report"
              onClick={() =>
                alert(
                  "Stock Report feature will be connected next."
                )
              }
            />

          </div>

        </div>

      </section>

    </main>
  );
}