"use client";

import { usePortfolioContext } from "@/context/PortfolioContext";

export default function usePortfolio() {
  return usePortfolioContext();
}