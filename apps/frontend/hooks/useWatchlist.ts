"use client";

import { useEffect, useState } from "react";

export type WatchlistItem = {
  symbol: string;
  company: string;
};

const STORAGE_KEY = "quantivox-watchlist";

export default function useWatchlist() {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        setWatchlist(JSON.parse(saved));
      } catch {
        setWatchlist([]);
      }
    }
  }, []);

  const save = (items: WatchlistItem[]) => {
    setWatchlist(items);
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(items)
    );
  };

  const addStock = (
    symbol: string,
    company: string
  ) => {
    if (
      watchlist.some(
        (item) => item.symbol === symbol
      )
    ) {
      return;
    }

    save([
      ...watchlist,
      {
        symbol,
        company,
      },
    ]);
  };

  const removeStock = (symbol: string) => {
    save(
      watchlist.filter(
        (item) => item.symbol !== symbol
      )
    );
  };

  const exists = (symbol: string) => {
    return watchlist.some(
      (item) => item.symbol === symbol
    );
  };

  return {
    watchlist,
    addStock,
    removeStock,
    exists,
  };
}