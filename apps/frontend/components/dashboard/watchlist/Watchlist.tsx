"use client";

import { Star, Trash2 } from "lucide-react";

import useWatchlist from "@/hooks/useWatchlist";
import { useStock } from "@/context/StockContext";

export default function Watchlist() {
  const { stock, search } = useStock();

  const {
    watchlist,
    addStock,
    removeStock,
    exists,
  } = useWatchlist();

  return (
    <div className="rounded-2xl border border-white/10 bg-[#111827]/80 p-6 shadow-lg backdrop-blur-md">

      <div className="mb-6 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <Star className="text-yellow-400" />

          <h2 className="text-2xl font-bold text-white">
            My Watchlist
          </h2>

        </div>

        {stock && (
          <button
            onClick={() =>
              addStock(
                stock.symbol ?? "",
                stock.company ?? stock.symbol ?? ""
              )
            }
            disabled={exists(stock.symbol ?? "")}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
              exists(stock.symbol ?? "")
                ? "cursor-not-allowed bg-gray-700 text-gray-400"
                : "bg-yellow-500 text-black hover:bg-yellow-400"
            }`}
          >
            {exists(stock.symbol ?? "")
              ? "Added"
              : "+ Add Current"}
          </button>
        )}

      </div>

      {watchlist.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/10 p-8 text-center">

          <Star
            size={40}
            className="mx-auto mb-4 text-gray-500"
          />

          <p className="text-lg font-semibold text-white">
            Your watchlist is empty
          </p>

          <p className="mt-2 text-gray-400">
            Search a stock and click
            <span className="mx-1 font-semibold text-yellow-400">
              + Add Current
            </span>
            to save it.
          </p>

        </div>
      ) : (
        <div className="space-y-4">

          {watchlist.map((item) => (
            <div
              key={item.symbol}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-[#0B1120] p-4 transition hover:border-blue-500"
            >

              <button
                onClick={() => search(item.symbol)}
                className="text-left"
              >

                <h3 className="text-lg font-bold text-white">
                  {item.symbol}
                </h3>

                <p className="text-sm text-gray-400">
                  {item.company}
                </p>

              </button>

              <button
                onClick={() =>
                  removeStock(item.symbol)
                }
                className="rounded-lg p-2 text-red-400 transition hover:bg-red-500/20"
              >

                <Trash2 size={18} />

              </button>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}