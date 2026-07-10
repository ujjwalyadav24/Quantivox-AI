"use client";

import { Bell, Search, UserCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b border-white/10 bg-[#0B1120] px-8 py-5">

      {/* Search */}

      <div className="relative w-[420px]">

        <Search
          className="absolute left-4 top-3.5 text-gray-500"
          size={20}
        />

        <input
          type="text"
          placeholder="Search stocks (AAPL, TSLA, INFY...)"
          className="w-full rounded-xl border border-white/10 bg-[#111827] py-3 pl-12 pr-4 text-white outline-none transition focus:border-blue-500"
        />

      </div>

      {/* Right */}

      <div className="flex items-center gap-6">

        <button className="rounded-full bg-[#111827] p-3 hover:bg-[#1F2937] transition">
          <Bell />
        </button>

        <div className="flex items-center gap-3">

          <UserCircle
            size={40}
            className="text-blue-400"
          />

          <div>

            <h3 className="font-semibold text-white">
              Ujjwal
            </h3>

            <p className="text-sm text-gray-400">
              AI Analyst
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}