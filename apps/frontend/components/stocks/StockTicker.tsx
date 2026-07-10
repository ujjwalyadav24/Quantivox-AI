"use client";

import { motion } from "framer-motion";

const stocks = [
  { symbol: "AAPL", price: "+2.15%", up: true },
  { symbol: "TSLA", price: "-1.08%", up: false },
  { symbol: "NVDA", price: "+4.52%", up: true },
  { symbol: "GOOGL", price: "+0.86%", up: true },
  { symbol: "META", price: "-0.52%", up: false },
  { symbol: "AMZN", price: "+1.90%", up: true },
  { symbol: "MSFT", price: "+3.22%", up: true },
  { symbol: "NIFTY", price: "+1.20%", up: true },
  { symbol: "SENSEX", price: "+0.95%", up: true },
];

export default function StockTicker() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-[#070B18] py-5">

      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 25,
        }}
        className="flex w-max gap-12"
      >
        {[...stocks, ...stocks].map((stock, index) => (
          <div
            key={index}
            className="flex items-center gap-3 whitespace-nowrap text-lg"
          >
            <span className="font-bold text-white">
              {stock.symbol}
            </span>

            <span
              className={
                stock.up
                  ? "font-semibold text-green-400"
                  : "font-semibold text-red-400"
              }
            >
              {stock.up ? "▲" : "▼"} {stock.price}
            </span>
          </div>
        ))}
      </motion.div>

    </section>
  );
}