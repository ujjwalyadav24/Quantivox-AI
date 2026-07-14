"use client";

import { useState } from "react";

import { Loader2, Search } from "lucide-react";

import { searchStock } from "@/lib/api";
import { formatCurrency } from "@/lib/formatters";

type Props = {
  onSave: (
    symbol: string,
    company: string,
    quantity: number,
    buyPrice: number
  ) => void;

  onCancel: () => void;
};

export default function HoldingForm({
  onSave,
  onCancel,
}: Props) {
  const [symbol, setSymbol] = useState("");

  const [company, setCompany] = useState("");

  const [currency, setCurrency] =
    useState("");

  const [currentPrice, setCurrentPrice] =
    useState<number>();

  const [quantity, setQuantity] =
    useState("");

  const [buyPrice, setBuyPrice] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function fetchStock() {
    if (!symbol.trim()) return;

    setLoading(true);

    setError("");

    try {
      const stock = await searchStock(
        symbol.trim()
      );

      setCompany(stock.company);

      setCurrency(stock.currency);

      setCurrentPrice(stock.price);
    } catch {
      setCompany("");

      setCurrentPrice(undefined);

      setError(
        "Stock not found."
      );
    } finally {
      setLoading(false);
    }
  }

  const formattedPrice =
    formatCurrency(
      currentPrice,
      currency
    );

  function saveHolding() {
    if (
      !company ||
      !quantity ||
      !buyPrice
    ) {
      alert(
        "Complete all fields."
      );

      return;
    }

    onSave(
      symbol.toUpperCase(),
      company,
      Number(quantity),
      Number(buyPrice)
    );
  }

  return (
    <div className="space-y-5">

      <div>

        <label className="mb-2 block text-gray-300">
          Stock Symbol
        </label>

        <div className="flex gap-3">

          <input
            value={symbol}
            onChange={(e) =>
              setSymbol(
                e.target.value
              )
            }
            placeholder="AAPL or TCS.NS"
            className="flex-1 rounded-xl border border-white/10 bg-[#0B1120] px-4 py-3 text-white outline-none focus:border-blue-500"
          />

          <button
            onClick={fetchStock}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 text-white hover:bg-blue-700"
          >
            {loading ? (
              <Loader2
                className="animate-spin"
                size={18}
              />
            ) : (
              <Search size={18} />
            )}

            Fetch
          </button>

        </div>

        {error && (
          <p className="mt-2 text-red-400">
            {error}
          </p>
        )}

      </div>

      {company && (
        <>
          <div className="rounded-xl bg-[#0B1120] p-4">

            <p className="text-sm text-gray-400">
              Company
            </p>

            <h3 className="mt-2 text-lg font-bold text-white">
              {company}
            </h3>

          </div>

          <div className="rounded-xl bg-[#0B1120] p-4">

            <p className="text-sm text-gray-400">
              Current Price
            </p>

            <h3 className="mt-2 text-lg font-bold text-green-400">
              {formattedPrice.primary}
            </h3>

            {formattedPrice.secondary && (
              <p className="text-sm text-gray-400">
                {formattedPrice.secondary}
              </p>
            )}

          </div>
        </>
      )}

      <div className="grid grid-cols-2 gap-4">

        <div>

          <label className="mb-2 block text-gray-300">
            Quantity
          </label>

          <input
            type="number"
            value={quantity}
            onChange={(e) =>
              setQuantity(
                e.target.value
              )
            }
            className="w-full rounded-xl border border-white/10 bg-[#0B1120] px-4 py-3 text-white outline-none focus:border-blue-500"
          />

        </div>

        <div>

          <label className="mb-2 block text-gray-300">
            Buy Price
          </label>

          <input
            type="number"
            value={buyPrice}
            onChange={(e) =>
              setBuyPrice(
                e.target.value
              )
            }
            className="w-full rounded-xl border border-white/10 bg-[#0B1120] px-4 py-3 text-white outline-none focus:border-blue-500"
          />

        </div>

      </div>

      <div className="flex justify-end gap-4">

        <button
          onClick={onCancel}
          className="rounded-xl border border-white/10 px-5 py-3 text-gray-300 hover:bg-white/5"
        >
          Cancel
        </button>

        <button
          onClick={saveHolding}
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Save Holding
        </button>

      </div>

    </div>
  );
}