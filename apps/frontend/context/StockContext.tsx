"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

import { searchStock, getHistory } from "@/lib/api";

type Stock = {
  symbol?: string;
  company?: string;
  price?: number;
  currency?: string;
  sector?: string;
  industry?: string;
  marketCap?: number;
  country?: string;
};

type HistoryPoint = {
  date: string;
  close: number;
};

type StockContextType = {
  stock: Stock | null;
  history: HistoryPoint[];
  loading: boolean;
  search: (symbol: string) => Promise<void>;
};

const StockContext = createContext<StockContextType | null>(null);

export function StockProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [stock, setStock] = useState<Stock | null>(null);
  const [history, setHistory] = useState<HistoryPoint[]>([]);
  const [loading, setLoading] = useState(false);

  const search = async (symbol: string) => {
    setLoading(true);

    try {
      const [stockData, historyData] = await Promise.all([
        searchStock(symbol),
        getHistory(symbol),
      ]);

      setStock(stockData);
      setHistory(historyData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StockContext.Provider
      value={{
        stock,
        history,
        loading,
        search,
      }}
    >
      {children}
    </StockContext.Provider>
  );
}

export function useStock() {
  const context = useContext(StockContext);

  if (!context) {
    throw new Error("useStock must be used inside StockProvider");
  }

  return context;
}