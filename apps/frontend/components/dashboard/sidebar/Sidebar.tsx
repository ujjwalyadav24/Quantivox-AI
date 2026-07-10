"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Brain,
  BarChart3,
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
  return (
    <aside className="w-72 h-screen bg-[#070B18] border-r border-white/10 flex flex-col">

      <div className="p-8">

        <h1 className="text-3xl font-black text-white">
          Quantivox AI
        </h1>

        <p className="text-gray-400 mt-2">
          Decision Support System
        </p>

      </div>

      <nav className="flex-1 px-4">

        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-4 rounded-xl px-5 py-4 text-gray-300 hover:bg-blue-600/20 hover:text-white transition mb-2"
            >
              <Icon size={22} />

              {item.name}
            </Link>
          );
        })}

      </nav>

      <div className="p-6 border-t border-white/10">

        <button className="flex items-center gap-3 text-red-400 hover:text-red-300">

          <LogOut />

          Logout

        </button>

      </div>

    </aside>
  );
}