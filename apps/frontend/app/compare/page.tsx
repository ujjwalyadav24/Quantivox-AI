"use client";

import Sidebar from "../../components/dashboard/sidebar/Sidebar";
import Header from "../../components/dashboard/header/Header";

import CompareSearch from "../../components/compare/CompareSearch";
import CompareTable from "../../components/compare/CompareTable";

import { CompareProvider } from "../../context/CompareContext";

export default function ComparePage() {
  return (
    <CompareProvider>
      <main className="flex min-h-screen bg-[#050816]">
        <Sidebar />

        <section className="flex-1 overflow-y-auto">
          <Header />

          <div className="p-10">
            <h1 className="text-5xl font-black text-white">
              Compare Stocks
            </h1>

            <p className="mt-4 text-lg text-gray-400">
              Compare two companies side by side using live market data.
            </p>

            <div className="mt-10">
              <CompareSearch />
            </div>

            <div className="mt-10">
              <CompareTable />
            </div>
          </div>
        </section>
      </main>
    </CompareProvider>
  );
}