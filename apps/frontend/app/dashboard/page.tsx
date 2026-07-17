"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

import Sidebar from "../../components/dashboard/sidebar/Sidebar";
import Header from "../../components/dashboard/header/Header";

import OverviewCards from "../../components/dashboard/cards/OverviewCards";
import StockChart from "../../components/dashboard/charts/StockChart";

import PredictionCard from "../../components/dashboard/prediction/PredictionCard";
import AIRecommendation from "../../components/dashboard/ai/AIRecommendation";
import Watchlist from "../../components/dashboard/watchlist/Watchlist";

import CompanyOverview from "../../components/dashboard/company/CompanyOverview";
import MarketStats from "../../components/dashboard/market/MarketStats";

import TechnicalIndicators from "../../components/dashboard/technical/TechnicalIndicators";
import LatestNews from "../../components/dashboard/news/LatestNews";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <main className="flex min-h-screen bg-[#050816]">
        <Sidebar />

        <section className="flex-1 overflow-y-auto">
          <Header />

          <div className="p-10">
            {/* Title */}

            <h1 className="text-5xl font-black text-white">
              Welcome to Quantivox AI
            </h1>

            <p className="mt-4 text-lg text-gray-400">
              AI Powered Stock Decision Support System
            </p>

            {/* Overview Cards */}

            <div className="mt-10">
              <OverviewCards />
            </div>

            {/* Chart + Prediction */}

            <div className="mt-10 grid grid-cols-1 gap-8 xl:grid-cols-2">
              <StockChart />
              <PredictionCard />
            </div>

            {/* Watchlist + AI Recommendation */}

            <div className="mt-10 grid grid-cols-1 gap-8 xl:grid-cols-2">
              <Watchlist />
              <AIRecommendation />
            </div>

            {/* Company + Market */}

            <div className="mt-10 grid grid-cols-1 gap-8 xl:grid-cols-2">
              <CompanyOverview />
              <MarketStats />
            </div>

            {/* Technical */}

            <div className="mt-10">
              <TechnicalIndicators />
            </div>

            {/* News */}

            <div className="mt-10">
              <LatestNews />
            </div>
          </div>
        </section>
      </main>
    </ProtectedRoute>
  );
}