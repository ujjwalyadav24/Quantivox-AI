"use client";

import { Brain, TrendingUp, ShieldCheck } from "lucide-react";

export default function AIRecommendation() {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#111827]/80 p-6 shadow-lg backdrop-blur-md h-full">

      <div className="flex items-center gap-3">
        <Brain className="text-cyan-400" size={30} />
        <h2 className="text-2xl font-bold text-white">
          AI Recommendation
        </h2>
      </div>

      <div className="mt-8">

        <span className="rounded-full bg-green-500/20 px-4 py-2 text-green-400 font-semibold">
          BUY
        </span>

        <h3 className="mt-6 text-4xl font-black text-white">
          94%
        </h3>

        <p className="text-gray-400">
          Confidence Score
        </p>

      </div>

      <div className="mt-8 space-y-4">

        <div className="flex items-center gap-3 text-gray-300">
          <TrendingUp className="text-green-400" />
          RSI indicates bullish momentum
        </div>

        <div className="flex items-center gap-3 text-gray-300">
          <TrendingUp className="text-green-400" />
          MACD crossover confirmed
        </div>

        <div className="flex items-center gap-3 text-gray-300">
          <TrendingUp className="text-green-400" />
          Price above 50-Day EMA
        </div>

      </div>

      <div className="mt-10 rounded-xl bg-[#0B1120] p-4">

        <div className="flex items-center gap-2">

          <ShieldCheck className="text-green-400" />

          <span className="font-semibold text-white">
            Risk Level
          </span>

        </div>

        <h3 className="mt-2 text-2xl font-bold text-green-400">
          LOW
        </h3>

      </div>

    </div>
  );
}