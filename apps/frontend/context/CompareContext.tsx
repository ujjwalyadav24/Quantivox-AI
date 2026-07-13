"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

import { searchStock } from "@/lib/api";

type Stock = {
  symbol?: string;
  company?: string;

  price?: number;
  currency?: string;

  country?: string;
  sector?: string;
  industry?: string;

  marketCap?: number;

  open?: number;
  previousClose?: number;

  dayHigh?: number;
  dayLow?: number;

  fiftyTwoWeekHigh?: number;
  fiftyTwoWeekLow?: number;

  volume?: number;

  beta?: number;

  trailingPE?: number;
  trailingEps?: number;
};

type CompareContextType = {
  stock1: Stock | null;
  stock2: Stock | null;

  loading: boolean;

  compareStocks: (
    first: string,
    second: string
  ) => Promise<void>;
};

const CompareContext =
  createContext<CompareContextType | null>(null);

export function CompareProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [stock1, setStock1] =
    useState<Stock | null>(null);

  const [stock2, setStock2] =
    useState<Stock | null>(null);

  const [loading, setLoading] =
    useState(false);

  async function compareStocks(
    first: string,
    second: string
  ) {
    if (!first || !second) return;

    setLoading(true);

    try {
      const [a, b] = await Promise.all([
        searchStock(first),
        searchStock(second),
      ]);

      setStock1(a);
      setStock2(b);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <CompareContext.Provider
      value={{
        stock1,
        stock2,
        loading,
        compareStocks,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);

  if (!context) {
    throw new Error(
      "useCompare must be used inside CompareProvider"
    );
  }

  return context;
}