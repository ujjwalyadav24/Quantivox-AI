"use client";

import { useCompare } from "@/context/CompareContext";

export default function CompareTable() {
  const { stock1, stock2 } = useCompare();

  if (!stock1 || !stock2) {
    return (
      <div className="rounded-2xl border border-white/10 bg-[#111827]/80 p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Comparison Result
        </h2>

        <p className="text-gray-400">
          Enter two stock symbols and click
          <span className="font-semibold text-blue-400">
            {" "}
            Compare Stocks
          </span>{" "}
          to view the comparison.
        </p>
      </div>
    );
  }

  const formatMarketCap = (value?: number) => {
    if (!value) return "-";

    if (value >= 1_000_000_000_000)
      return (value / 1_000_000_000_000).toFixed(2) + " T";

    if (value >= 1_000_000_000)
      return (value / 1_000_000_000).toFixed(2) + " B";

    if (value >= 1_000_000)
      return (value / 1_000_000).toFixed(2) + " M";

    return value.toString();
  };

  const rows = [
    {
      label: "Company",
      a: stock1.company,
      b: stock2.company,
    },
    {
      label: "Current Price",
      a: stock1.price,
      b: stock2.price,
    },
    {
      label: "Market Cap",
      a: formatMarketCap(stock1.marketCap),
      b: formatMarketCap(stock2.marketCap),
    },
    {
      label: "P/E Ratio",
      a: stock1.trailingPE,
      b: stock2.trailingPE,
    },
    {
      label: "EPS",
      a: stock1.trailingEps,
      b: stock2.trailingEps,
    },
    {
      label: "Volume",
      a: stock1.volume,
      b: stock2.volume,
    },
    {
      label: "52 Week High",
      a: stock1.fiftyTwoWeekHigh,
      b: stock2.fiftyTwoWeekHigh,
    },
    {
      label: "52 Week Low",
      a: stock1.fiftyTwoWeekLow,
      b: stock2.fiftyTwoWeekLow,
    },
    {
      label: "Beta",
      a: stock1.beta,
      b: stock2.beta,
    },
    {
      label: "Country",
      a: stock1.country,
      b: stock2.country,
    },
    {
      label: "Sector",
      a: stock1.sector,
      b: stock2.sector,
    },
  ];

  return (
    <div className="rounded-2xl border border-white/10 bg-[#111827]/80 p-6 shadow-lg">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Comparison Result
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b border-white/10">

              <th className="py-4 text-left text-gray-400">
                Metric
              </th>

              <th className="py-4 text-left text-white">
                {stock1.symbol}
              </th>

              <th className="py-4 text-left text-white">
                {stock2.symbol}
              </th>

            </tr>

          </thead>

          <tbody>

            {rows.map((row) => (
              <tr
                key={row.label}
                className="border-b border-white/10"
              >
                <td className="py-4 font-medium text-gray-300">
                  {row.label}
                </td>

                <td className="py-4 text-white">
                  {row.a ?? "-"}
                </td>

                <td className="py-4 text-white">
                  {row.b ?? "-"}
                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}