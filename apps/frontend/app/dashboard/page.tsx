import Sidebar from "../../components/dashboard/sidebar/Sidebar";
import Header from "../../components/dashboard/header/Header";
import OverviewCards from "../../components/dashboard/cards/OverviewCards";
import StockChart from "../../components/dashboard/charts/StockChart";
import AIRecommendation from "../../components/dashboard/ai/AIRecommendation";
import CompanyOverview from "../../components/dashboard/company/CompanyOverview";
import MarketStats from "../../components/dashboard/market/MarketStats";

export default function DashboardPage() {
  return (
    <main className="flex min-h-screen bg-[#050816]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <section className="flex-1 overflow-y-auto">
        {/* Header */}
        <Header />

        {/* Dashboard Content */}
        <div className="p-10">
          {/* Welcome */}
          <div>
            <h1 className="text-5xl font-black text-white">
              Welcome to Quantivox AI
            </h1>

            <p className="mt-4 text-lg text-gray-400">
              AI Powered Stock Decision Support System
            </p>
          </div>

          {/* Overview Cards */}
          <div className="mt-10">
            <OverviewCards />
          </div>

          {/* Chart + AI Recommendation */}
          <div className="mt-10 grid grid-cols-1 gap-8 xl:grid-cols-3">
            {/* Chart */}
            <div className="xl:col-span-2">
              <StockChart />
            </div>

            {/* AI Recommendation */}
            <div>
              <AIRecommendation />
            </div>
          </div>

          {/* Company Overview + Market Statistics */}
          <div className="mt-10 grid grid-cols-1 gap-8 xl:grid-cols-2">
            <CompanyOverview />

            <MarketStats />
          </div>
        </div>
      </section>
    </main>
  );
}