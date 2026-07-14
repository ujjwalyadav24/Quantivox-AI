import Sidebar from "../../components/dashboard/sidebar/Sidebar";
import Header from "../../components/dashboard/header/Header";

import PortfolioSummary from "../../components/portfolio/PortfolioSummary";
import PortfolioTable from "../../components/portfolio/PortfolioTable";
import AddHoldingModal from "../../components/portfolio/AddHoldingModal";

export default function PortfolioPage() {
  return (
    <main className="flex min-h-screen bg-[#050816]">

      <Sidebar />

      <section className="flex-1 overflow-y-auto">

        <Header />

        <div className="p-10">

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div>

              <h1 className="text-5xl font-black text-white">
                Portfolio
              </h1>

              <p className="mt-3 text-lg text-gray-400">
                Track your investments and monitor your holdings.
              </p>

            </div>

            <AddHoldingModal />

          </div>

          <div className="mt-10">

            <PortfolioSummary />

          </div>

          <div className="mt-10">

            <PortfolioTable />

          </div>

        </div>

      </section>

    </main>
  );
}