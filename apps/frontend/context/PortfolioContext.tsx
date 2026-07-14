"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { supabase } from "@/lib/supabase";
import { useAuthContext } from "./AuthContext";

export type PortfolioItem = {
  id: string;
  user_id: string;
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
  ) => Promise<void>;

  removeHolding: (
    id: string
  ) => Promise<void>;

  refreshPortfolio: () => Promise<void>;
};

const PortfolioContext =
  createContext<PortfolioContextType | null>(
    null
  );

export function PortfolioProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = useAuthContext();

  const [portfolio, setPortfolio] =
    useState<PortfolioItem[]>([]);

  async function refreshPortfolio() {
    if (!user) {
      setPortfolio([]);
      return;
    }

    const { data, error } =
      await supabase
        .from("portfolio")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: false,
        });

    if (error) {
      console.error(error);
      return;
    }

    const formatted =
      (data ?? []).map((item) => ({
        id: item.id,
        user_id: item.user_id,
        symbol: item.symbol,
        company: item.company,
        quantity: item.quantity,
        buyPrice: Number(item.buy_price),
      }));

    setPortfolio(formatted);
  }

  useEffect(() => {
    refreshPortfolio();
  }, [user]);

  async function addHolding(
    symbol: string,
    company: string,
    quantity: number,
    buyPrice: number
  ) {
    if (!user) return;

    const { error } =
      await supabase
        .from("portfolio")
        .insert({
          user_id: user.id,
          symbol,
          company,
          quantity,
          buy_price: buyPrice,
        });

    if (error) {
      console.error(error);
      return;
    }

    await refreshPortfolio();
  }

  async function removeHolding(
    id: string
  ) {
    const { error } =
      await supabase
        .from("portfolio")
        .delete()
        .eq("id", id);

    if (error) {
      console.error(error);
      return;
    }

    await refreshPortfolio();
  }

  return (
    <PortfolioContext.Provider
      value={{
        portfolio,
        addHolding,
        removeHolding,
        refreshPortfolio,
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