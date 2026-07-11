"use client";

import {
  Building2,
  Globe,
  Landmark,
  Briefcase,
  Users,
} from "lucide-react";

import { useStock } from "@/context/StockContext";

export default function CompanyOverview() {
  const { stock } = useStock();

  return (
    <div className="rounded-2xl border border-white/10 bg-[#111827]/80 p-6 shadow-lg backdrop-blur-md">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Company Overview
      </h2>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

        <InfoCard
          icon={<Building2 className="text-blue-400" />}
          title="Company"
          value={stock?.company}
        />

        <InfoCard
          icon={<Landmark className="text-green-400" />}
          title="Symbol"
          value={stock?.symbol}
        />

        <InfoCard
          icon={<Building2 className="text-purple-400" />}
          title="Sector"
          value={stock?.sector}
        />

        <InfoCard
          icon={<Briefcase className="text-pink-400" />}
          title="Industry"
          value={stock?.industry}
        />

        <InfoCard
          icon={<Globe className="text-cyan-400" />}
          title="Country"
          value={stock?.country}
        />

        <InfoCard
          icon={<Users className="text-orange-400" />}
          title="Employees"
          value={
            stock?.employees
              ? stock.employees.toLocaleString()
              : "--"
          }
        />

        <InfoCard
          icon={<Landmark className="text-yellow-400" />}
          title="Exchange"
          value={stock?.exchange}
        />

        <div className="rounded-xl bg-[#0B1120] p-4">

          <p className="mb-2 text-sm text-gray-400">
            Website
          </p>

          {stock?.website ? (
            <a
              href={stock.website}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-400 hover:underline"
            >
              Visit Website
            </a>
          ) : (
            <p className="font-semibold text-white">
              --
            </p>
          )}

        </div>

      </div>

    </div>
  );
}

function InfoCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value?: string | number;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-[#0B1120] p-4">

      <div className="rounded-lg bg-white/5 p-3">
        {icon}
      </div>

      <div>

        <p className="text-sm text-gray-400">
          {title}
        </p>

        <p className="font-semibold text-white">
          {value ?? "--"}
        </p>

      </div>

    </div>
  );
}