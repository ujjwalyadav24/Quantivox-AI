"use client";

import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: "📈",
    title: "Historical Analysis",
    description:
      "Analyze years of stock market history with interactive charts.",
  },
  {
    icon: "🤖",
    title: "AI Prediction",
    description:
      "Generate intelligent forecasts using machine learning models.",
  },
  {
    icon: "📊",
    title: "Company Comparison",
    description:
      "Compare multiple companies with visual analytics.",
  },
  {
    icon: "⚠️",
    title: "Risk Assessment",
    description:
      "Identify investment risks before making decisions.",
  },
  {
    icon: "📉",
    title: "Trend Detection",
    description:
      "Detect bullish and bearish market movements automatically.",
  },
  {
    icon: "💡",
    title: "Smart Insights",
    description:
      "Receive AI-generated recommendations based on historical data.",
  },
];

export default function Features() {
  return (
    <section className="bg-[#050816] px-8 py-28">
      <h2 className="mb-16 text-center text-5xl font-black text-white">
        Platform Features
      </h2>

      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </section>
  );
}