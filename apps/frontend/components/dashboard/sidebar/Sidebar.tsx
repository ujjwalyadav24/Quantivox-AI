"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Brain,
  BarChart3,
  BriefcaseBusiness,
  FileText,
  Star,
  Settings,
  LogOut,
} from "lucide-react";

const menu = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    name: "AI Analyzer",
    icon: Brain,
    href: "/analyzer",
  },
  {
    name: "Compare",
    icon: BarChart3,
    href: "/compare",
  },
  {
    name: "Portfolio",
    icon: BriefcaseBusiness,
    href: "/portfolio",
  },
  {
    name: "Reports",
    icon: FileText,
    href: "/reports",
  },
  {
    name: "Watchlist",
    icon: Star,
    href: "/watchlist",
  },
  {
    name: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-white/10 bg-[#070B18]">
      <div className="p-8">
        <h1 className="text-3xl font-black text-white">
          Quantivox AI
        </h1>

        <p className="mt-2 text-gray-400">
          Decision Support System
        </p>
      </div>

      <nav className="flex-1 px-4">
        {menu.map((item) => {
          const Icon = item.icon;

          const active = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`mb-2 flex items-center gap-4 rounded-xl px-5 py-4 transition-all duration-200 ${
                active
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-300 hover:bg-blue-600/20 hover:text-white"
              }`}
            >
              <Icon size={22} />
              <span className="font-medium">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-6">
        <button className="flex items-center gap-3 text-red-400 transition hover:text-red-300">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}