import { searchStock } from "./api";

export type HoldingCalculation = {
  symbol: string;
  company: string;
  quantity: number;
  buyPrice: number;
  currentPrice: number;
  currentValue: number;
  investment: number;
  profitLoss: number;
  currency: string;
};

export async function calculateHolding(
  symbol: string,
  company: string,
  quantity: number,
  buyPrice: number
): Promise<HoldingCalculation> {
  const stock = await searchStock(symbol);

  const currentPrice = stock.price ?? 0;

  const investment = quantity * buyPrice;

  const currentValue = quantity * currentPrice;

  const profitLoss = currentValue - investment;

  return {
    symbol,
    company,
    quantity,
    buyPrice,
    currentPrice,
    currentValue,
    investment,
    profitLoss,
    currency: stock.currency ?? "USD",
  };
}

export async function calculatePortfolio(
  portfolio: {
    symbol: string;
    company: string;
    quantity: number;
    buyPrice: number;
  }[]
) {
  const holdings = await Promise.all(
    portfolio.map((item) =>
      calculateHolding(
        item.symbol,
        item.company,
        item.quantity,
        item.buyPrice
      )
    )
  );

  const totalInvestment = holdings.reduce(
    (sum, item) => sum + item.investment,
    0
  );

  const totalCurrentValue = holdings.reduce(
    (sum, item) => sum + item.currentValue,
    0
  );

  const totalProfitLoss =
    totalCurrentValue - totalInvestment;

  return {
    holdings,
    totalInvestment,
    totalCurrentValue,
    totalProfitLoss,
  };
}