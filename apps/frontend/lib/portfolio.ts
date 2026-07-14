import { searchStock } from "./api";

export type PortfolioStock = {
  symbol: string;
  company: string;
  price: number;
  currency: string;
};

export async function fetchPortfolioStock(
  symbol: string
): Promise<PortfolioStock> {
  const stock = await searchStock(symbol);

  if (!stock) {
    throw new Error("Stock not found.");
  }

  return {
    symbol: stock.symbol,
    company: stock.company,
    price: stock.price,
    currency: stock.currency,
  };
}