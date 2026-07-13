"use client";

import {
  Brain,
  TrendingUp,
  TrendingDown,
  Target,
} from "lucide-react";

import { useStock } from "@/context/StockContext";

import {
  formatCurrency,
  formatPercentage,
} from "@/lib/formatters";

export default function PredictionCard() {
  const { prediction, stock } = useStock();

  if (!prediction) {
    return (
      <div className="rounded-2xl border border-white/10 bg-[#111827]/80 p-6 shadow-lg backdrop-blur-md">
        <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-white">
          <Brain className="text-cyan-400" />
          AI Price Prediction
        </h2>

        <p className="text-gray-400">
          Search a stock to generate an AI prediction.
        </p>
      </div>
    );
  }

  const bullish = prediction.trend === "Bullish";

  const predictedPrice = formatCurrency(
    prediction.predictedPrice,
    stock?.currency
  );

  const currentPrice = formatCurrency(
    prediction.currentPrice,
    stock?.currency
  );

  return (
    <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-[#111827] via-[#0B1120] to-[#050816] p-6 shadow-xl">

      <div className="mb-8 flex items-center gap-3">

        <Brain
          size={34}
          className="text-cyan-400"
        />

        <div>

          <h2 className="text-2xl font-bold text-white">
            Tomorrow Prediction
          </h2>

          <p className="text-sm text-gray-400">
            Machine Learning Forecast
          </p>

        </div>

      </div>

      {/* Current Price */}

      <div className="mb-6 rounded-xl bg-white/5 p-5">

        <p className="text-sm text-gray-400">
          Current Price
        </p>

        <h2 className="mt-2 text-2xl font-bold text-white">
          {currentPrice.primary}
        </h2>

        {currentPrice.secondary && (
          <p className="mt-1 text-sm text-gray-400">
            {currentPrice.secondary}
          </p>
        )}

      </div>

      {/* Predicted Price */}

      <div className="mb-8">

        <p className="text-sm text-gray-400">
          Predicted Price
        </p>

        <h1 className="mt-2 text-5xl font-black text-white">
          {predictedPrice.primary}
        </h1>

        {predictedPrice.secondary && (
          <p className="mt-2 text-gray-400">
            {predictedPrice.secondary}
          </p>
        )}

      </div>

      <div className="grid grid-cols-2 gap-5">

        <div className="rounded-xl bg-white/5 p-5">

          <p className="text-sm text-gray-400">
            Expected Move
          </p>

          <div className="mt-3 flex items-center gap-2">

            {bullish ? (
              <TrendingUp className="text-green-400" />
            ) : (
              <TrendingDown className="text-red-400" />
            )}

            <span
              className={`text-2xl font-bold ${
                bullish
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {formatPercentage(
                prediction.expectedMove
              )}
            </span>

          </div>

        </div>

        <div className="rounded-xl bg-white/5 p-5">

          <p className="text-sm text-gray-400">
            Confidence
          </p>

          <div className="mt-3 flex items-center gap-2">

            <Target className="text-blue-400" />

            <span className="text-2xl font-bold text-white">
              {formatPercentage(
                prediction.confidence
              )}
            </span>

          </div>

        </div>

      </div>

      <div className="mt-8 rounded-xl bg-white/5 p-5">

        <p className="text-sm text-gray-400">
          Market Trend
        </p>

        <h2
          className={`mt-2 text-3xl font-black ${
            bullish
              ? "text-green-400"
              : "text-red-400"
          }`}
        >
          {prediction.trend}
        </h2>

      </div>

      <div className="mt-8 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-5">

        <h3 className="mb-3 text-lg font-semibold text-cyan-300">
          AI Insight
        </h3>

        <p className="leading-7 text-gray-300">

          Based on historical price movement,
          technical indicators and machine
          learning analysis, the model predicts a{" "}

          <span
            className={`font-bold ${
              bullish
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {prediction.trend}
          </span>{" "}

          market movement for the next
          trading session.

        </p>

      </div>

    </div>
  );
}