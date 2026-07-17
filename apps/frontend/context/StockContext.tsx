"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

import {
  searchStock,
  getHistory,
  getPrediction,
} from "@/lib/api";

type Stock = {
  symbol?: string;
  company?: string;
  price?: number;
  currency?: string;
  country?: string;
  sector?: string;
  industry?: string;
  website?: string;
  marketCap?: number;
  open?: number;
  previousClose?: number;
  dayHigh?: number;
  dayLow?: number;
  fiftyTwoWeekHigh?: number;
  fiftyTwoWeekLow?: number;
  volume?: number;
  averageVolume?: number;
  beta?: number;
  trailingPE?: number;
  forwardPE?: number;
  trailingEps?: number;
  dividendYield?: number;
  employees?: number;
  exchange?: string;
  timezone?: string;
};

type HistoryPoint = {
  date: string;
  close: number;
};

type Prediction = {
  currentPrice: number;
  predictedPrice: number;
  expectedMove: number;
  confidence: number;
  trend: string;
};

type StockContextType = {
  stock: Stock | null;
  history: HistoryPoint[];
  prediction: Prediction | null;
  loading: boolean;
  period: string;
  search: (symbol: string) => Promise<void>;
  loadHistory: (period: string) => Promise<void>;
};

const StockContext = createContext<StockContextType | null>(null);

export function StockProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [stock, setStock] = useState<Stock | null>(null);
  const [history, setHistory] = useState<HistoryPoint[]>([]);
  const [prediction, setPrediction] =
    useState<Prediction | null>(null);

  const [loading, setLoading] = useState(false);
  const [period, setPeriod] = useState("1mo");

  const search = async (symbol: string) => {
    setLoading(true);

    try {
      const [
        stockData,
        historyData,
        predictionData,
      ] = await Promise.all([
        searchStock(symbol),
        getHistory(symbol, period),
        getPrediction(symbol),
      ]);

      console.log("========== SEARCH RESULT ==========");
      console.log("Stock:", stockData);
      console.log("History:", historyData);
      console.log("Prediction:", predictionData);

      if (!stockData) {
        throw new Error("Stock data is empty");
      }

      setStock(stockData);
      setHistory(Array.isArray(historyData) ? historyData : []);
      setPrediction(predictionData ?? null);
    } catch (error) {
      console.error("StockContext search error:", error);

      setStock(null);
      setHistory([]);
      setPrediction(null);
    } finally {
      setLoading(false);
    }
  };

  const loadHistory = async (newPeriod: string) => {
    if (!stock?.symbol) return;

    setLoading(true);

    try {
      const historyData = await getHistory(
        stock.symbol,
        newPeriod
      );

      console.log("History Update:", historyData);

      setHistory(Array.isArray(historyData) ? historyData : []);
      setPeriod(newPeriod);
    } catch (error) {
      console.error("History error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StockContext.Provider
      value={{
        stock,
        history,
        prediction,
        loading,
        period,
        search,
        loadHistory,
      }}
    >
      {children}
    </StockContext.Provider>
  );
}

export function useStock() {
  const context = useContext(StockContext);

  if (!context) {
    throw new Error(
      "useStock must be used inside StockProvider"
    );
  }

  return context;
}