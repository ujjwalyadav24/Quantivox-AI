"use client";

import { useEffect } from "react";
import {
  Brain,
  TrendingUp,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";

import { useAI } from "@/context/AIContext";
import { useStock } from "@/context/StockContext";

export default function AIRecommendation() {
  const { stock } = useStock();
  const { ai, loading, loadRecommendation } = useAI();

  useEffect(() => {
    if (stock?.symbol) {
      loadRecommendation(stock.symbol);
    }
  }, [stock?.symbol]);

  const recommendationColor =
    ai?.recommendation === "BUY"
      ? "text-green-400"
      : ai?.recommendation === "SELL"
      ? "text-red-400"
      : "text-yellow-400";

  const riskColor =
    ai?.risk === "LOW"
      ? "text-green-400"
      : ai?.risk === "MEDIUM"
      ? "text-yellow-400"
      : "text-red-400";

  return (
    <div className="rounded-2xl border border-white/10 bg-[#111827]/80 p-6 shadow-lg backdrop-blur-md">

      <div className="mb-6 flex items-center gap-3">
        <Brain className="text-cyan-400" size={30} />

        <h2 className="text-2xl font-bold text-white">
          AI Recommendation
        </h2>
      </div>

      {!stock && (
        <p className="text-gray-400">
          Search a stock to generate an AI recommendation.
        </p>
      )}

      {loading && (
        <p className="text-blue-400">
          Analyzing stock...
        </p>
      )}

      {!loading && ai && (
        <>
          <div className="mb-6">

            <p className="text-sm text-gray-400">
              Recommendation
            </p>

            <h1
              className={`mt-2 text-4xl font-black ${recommendationColor}`}
            >
              {ai.recommendation}
            </h1>

          </div>

          <div className="mb-6 flex items-center gap-3">
            <TrendingUp className="text-blue-400" />

            <div>
              <p className="text-sm text-gray-400">
                Confidence
              </p>

              <p className="text-xl font-bold text-white">
                {ai.confidence}%
              </p>
            </div>
          </div>

          <div className="mb-6 flex items-center gap-3">
            <ShieldCheck className={riskColor} />

            <div>
              <p className="text-sm text-gray-400">
                Risk
              </p>

              <p className={`text-xl font-bold ${riskColor}`}>
                {ai.risk}
              </p>
            </div>
          </div>

          <div>

            <p className="mb-3 text-sm text-gray-400">
              AI Reasons
            </p>

            <div className="space-y-3">

              {ai.reasons.map((reason, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-lg bg-[#0B1120] p-3"
                >
                  <CheckCircle
                    size={18}
                    className="mt-1 text-green-400"
                  />

                  <p className="text-gray-300">
                    {reason}
                  </p>

                </div>
              ))}

            </div>

          </div>
        </>
      )}
    </div>
  );
}