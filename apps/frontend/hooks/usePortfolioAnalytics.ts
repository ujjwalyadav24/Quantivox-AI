"use client";

import { useEffect, useState } from "react";

import usePortfolio from "./usePortfolio";

import {
  calculatePortfolio,
  HoldingCalculation,
} from "@/lib/portfolioCalculations";

type PortfolioAnalytics = {
  holdings: HoldingCalculation[];
  totalInvestment: number;
  totalCurrentValue: number;
  totalProfitLoss: number;
};

export default function usePortfolioAnalytics() {
  const { portfolio } = usePortfolio();

  const [analytics, setAnalytics] =
    useState<PortfolioAnalytics | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadPortfolio() {
      setLoading(true);

      try {
        if (portfolio.length === 0) {
          setAnalytics({
            holdings: [],
            totalInvestment: 0,
            totalCurrentValue: 0,
            totalProfitLoss: 0,
          });

          return;
        }

        const result =
          await calculatePortfolio(portfolio);

        setAnalytics(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadPortfolio();
  }, [portfolio]);

  function getHolding(symbol: string) {
    return analytics?.holdings.find(
      (holding) => holding.symbol === symbol
    );
  }

  return {
    analytics,
    loading,
    getHolding,
  };
}