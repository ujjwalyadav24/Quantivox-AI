"use client";

import { useState } from "react";

import {
  Plus,
  X,
} from "lucide-react";

import usePortfolio from "@/hooks/usePortfolio";

import HoldingForm from "./HoldingForm";

export default function AddHoldingModal() {
  const { addHolding } = usePortfolio();

  const [open, setOpen] = useState(false);

  function handleSave(
    symbol: string,
    company: string,
    quantity: number,
    buyPrice: number
  ) {
    addHolding(
      symbol,
      company,
      quantity,
      buyPrice
    );

    setOpen(false);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        <Plus size={20} />

        Add Holding
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

          <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-[#111827] p-8 shadow-2xl">

            <div className="mb-8 flex items-center justify-between">

              <div>

                <h2 className="text-3xl font-bold text-white">
                  Add Holding
                </h2>

                <p className="mt-2 text-gray-400">
                  Search a stock and add it to your portfolio.
                </p>

              </div>

              <button
                onClick={() => setOpen(false)}
                className="rounded-lg bg-white/5 p-2 transition hover:bg-white/10"
              >
                <X className="text-white" />
              </button>

            </div>

            <HoldingForm
              onSave={handleSave}
              onCancel={() => setOpen(false)}
            />

          </div>

        </div>
      )}

    </>
  );
}