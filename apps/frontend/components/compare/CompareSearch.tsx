"use client";

import { useState } from "react";
import { Search } from "lucide-react";

import { useCompare } from "@/context/CompareContext";

export default function CompareSearch() {
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");

  const { compareStocks, loading } = useCompare();

  const handleCompare = async () => {
    if (!first.trim() || !second.trim()) {
      alert("Please enter both stock symbols.");
      return;
    }

    await compareStocks(
      first.trim().toUpperCase(),
      second.trim().toUpperCase()
    );
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#111827]/80 p-6 shadow-lg backdrop-blur-md">

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        <input
          type="text"
          value={first}
          onChange={(e) => setFirst(e.target.value)}
          placeholder="First Stock (AAPL)"
          className="rounded-xl border border-white/10 bg-[#0B1120] px-5 py-4 text-white outline-none transition focus:border-blue-500"
        />

        <input
          type="text"
          value={second}
          onChange={(e) => setSecond(e.target.value)}
          placeholder="Second Stock (MSFT)"
          className="rounded-xl border border-white/10 bg-[#0B1120] px-5 py-4 text-white outline-none transition focus:border-blue-500"
        />

        <button
          onClick={handleCompare}
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-gray-600"
        >
          <Search size={20} />

          {loading ? "Comparing..." : "Compare Stocks"}
        </button>

      </div>

    </div>
  );
}