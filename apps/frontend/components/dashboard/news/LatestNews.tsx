"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Newspaper } from "lucide-react";

import { getNews } from "@/lib/api";
import { useStock } from "@/context/StockContext";

type NewsItem = {
  headline: string;
  summary: string;
  image: string;
  url: string;
  source: string;
  datetime: number;
};

export default function LatestNews() {
  const { stock } = useStock();

  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!stock?.symbol) {
      setNews([]);
      return;
    }

    async function loadNews() {
      setLoading(true);

      try {
        const data = await getNews(stock.symbol);
        setNews(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadNews();
  }, [stock?.symbol]);

  function sentiment(text: string) {
    const positiveWords = [
      "growth",
      "gain",
      "beat",
      "surge",
      "record",
      "strong",
      "profit",
      "bullish",
      "upgrade",
      "expansion",
      "positive",
    ];

    const negativeWords = [
      "loss",
      "drop",
      "fall",
      "lawsuit",
      "decline",
      "weak",
      "bearish",
      "downgrade",
      "negative",
      "crash",
    ];

    const lower = text.toLowerCase();

    if (positiveWords.some((w) => lower.includes(w))) {
      return {
        label: "Positive",
        color: "bg-green-600",
      };
    }

    if (negativeWords.some((w) => lower.includes(w))) {
      return {
        label: "Negative",
        color: "bg-red-600",
      };
    }

    return {
      label: "Neutral",
      color: "bg-yellow-600",
    };
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-[#111827]/80 p-6 shadow-lg backdrop-blur-md">

      <div className="mb-6 flex items-center gap-3">

        <Newspaper className="text-blue-400" />

        <h2 className="text-2xl font-bold text-white">
          Latest Financial News
        </h2>

      </div>

      {!stock && (
        <p className="text-gray-400">
          Search a stock to view news.
        </p>
      )}

      {loading && (
        <p className="text-blue-400">
          Loading latest news...
        </p>
      )}

      <div className="space-y-6">

        {news.map((item, index) => {
          const result = sentiment(
            item.headline + item.summary
          );

          return (
            <div
              key={index}
              className="overflow-hidden rounded-xl border border-white/10 bg-[#0B1120] transition hover:border-blue-500"
            >

              {item.image && (
                <img
                  src={item.image}
                  alt={item.headline}
                  className="h-56 w-full object-cover"
                />
              )}

              <div className="p-5">

                <div className="mb-3 flex items-center justify-between">

                  <span className="text-sm text-gray-400">
                    {item.source}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs text-white ${result.color}`}
                  >
                    {result.label}
                  </span>

                </div>

                <h3 className="text-xl font-bold text-white">
                  {item.headline}
                </h3>

                <p className="mt-3 line-clamp-3 text-gray-400">
                  {item.summary}
                </p>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
                >
                  Read Full Article

                  <ExternalLink size={16} />

                </a>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}