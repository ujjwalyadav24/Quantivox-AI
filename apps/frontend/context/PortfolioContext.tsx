"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export type PortfolioItem = {
  id: string;
  symbol: string;
  company: string;
  quantity: number;
  buyPrice: number;
};

type PortfolioContextType = {
  portfolio: PortfolioItem[];

  addHolding: (
    symbol: string,
    company: string,
    quantity: number,
    buyPrice: number
  ) => void;

  removeHolding: (id: string) => void;
};

const PortfolioContext =
  createContext<PortfolioContextType | null>(null);

const STORAGE_KEY = "quantivox-portfolio";

export function PortfolioProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [portfolio, setPortfolio] = useState<
    PortfolioItem[]
  >([]);

  useEffect(() => {
    const saved =
      localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        setPortfolio(JSON.parse(saved));
      } catch {
        setPortfolio([]);
      }
    }
  }, []);

  const save = (
    items: PortfolioItem[]
  ) => {
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

    save([
      ...portfolio,
      newHolding,
    ]);
  };

  const removeHolding = (
    id: string
  ) => {
    save(
      portfolio.filter(
        (item) => item.id !== id
      )
    );
  };

  return (
    <PortfolioContext.Provider
      value={{
        portfolio,
        addHolding,
        removeHolding,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolioContext() {
  const context =
    useContext(PortfolioContext);

  if (!context) {
    throw new Error(
      "usePortfolioContext must be used inside PortfolioProvider"
    );
  }

  return context;
}