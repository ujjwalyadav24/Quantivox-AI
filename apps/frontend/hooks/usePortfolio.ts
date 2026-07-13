"use client";

import { useEffect, useState } from "react";

export type PortfolioItem = {
  id: string;
  symbol: string;
  company: string;
  quantity: number;
  buyPrice: number;
};

const STORAGE_KEY = "quantivox-portfolio";

export default function usePortfolio() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        setPortfolio(JSON.parse(saved));
      } catch {
        setPortfolio([]);
      }
    }
  }, []);

  const save = (items: PortfolioItem[]) => {
    setPortfolio(items);
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(items)
    );
  };

  const addHolding = (
    symbol: string,
    company: string,
    quantity: number,
    buyPrice: number
  ) => {
    const newHolding: PortfolioItem = {
      id: Date.now().toString(),
      symbol,
      company,
      quantity,
      buyPrice,
    };

    save([...portfolio, newHolding]);
  };

  const removeHolding = (id: string) => {
    save(
      portfolio.filter(
        (item) => item.id !== id
      )
    );
  };

  return {
    portfolio,
    addHolding,
    removeHolding,
  };
}