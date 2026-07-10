"use client";

import {
  TrendingUp,
  IndianRupee,
  Building2,
  Brain,
} from "lucide-react";

const cards = [
  {
    title: "Current Price",
    value: "₹2,456.80",
    icon: IndianRupee,
    color: "text-blue-400",
  },
  {
    title: "Today's Change",
    value: "+3.24%",
    icon: TrendingUp,
    color: "text-green-400",
  },
  {
    title: "Market Cap",
    value: "₹18.2T",
    icon: Building2,
    color: "text-purple-400",
  },
  {
    title: "AI Score",
    value: "94%",
    icon: Brain,
    color: "text-cyan-400",
  },
];

export default function OverviewCards() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-2xl border border-white/10 bg-[#111827]/80 p-6 shadow-lg backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-blue-500/40"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">
                  {card.title}
                </p>

                <h2 className="mt-3 text-3xl font-bold text-white">
                  {card.value}
                </h2>
              </div>

              <div
                className={`rounded-xl bg-white/5 p-4 ${card.color}`}
              >
                <Icon size={30} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}