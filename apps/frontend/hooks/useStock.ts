"use client";

import { useState } from "react";
import { searchStock } from "@/lib/api";

export default function useStock() {
  const [stock, setStock] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const search = async (symbol: string) => {
    setLoading(true);

    try {
      const data = await searchStock(symbol);
      setStock(data);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return {
    stock,
    loading,
    search,
  };
}