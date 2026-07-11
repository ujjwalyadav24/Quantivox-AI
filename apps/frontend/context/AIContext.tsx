"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

import { getRecommendation } from "@/lib/api";

type AIRecommendation = {
  recommendation: string;
  confidence: number;
  risk: string;
  reasons: string[];
};

type AIContextType = {
  ai: AIRecommendation | null;
  loading: boolean;
  loadRecommendation: (symbol: string) => Promise<void>;
};

const AIContext = createContext<AIContextType | null>(null);

export function AIProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [ai, setAI] = useState<AIRecommendation | null>(null);
  const [loading, setLoading] = useState(false);

  const loadRecommendation = async (symbol: string) => {
    setLoading(true);

    try {
      const data = await getRecommendation(symbol);
      setAI(data.ai);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AIContext.Provider
      value={{
        ai,
        loading,
        loadRecommendation,
      }}
    >
      {children}
    </AIContext.Provider>
  );
}

export function useAI() {
  const context = useContext(AIContext);

  if (!context) {
    throw new Error(
      "useAI must be used inside AIProvider"
    );
  }

  return context;
}