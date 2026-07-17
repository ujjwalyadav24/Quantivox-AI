"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import Header from "@/components/dashboard/header/Header";

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <main className="flex min-h-screen bg-[#050816]">
        <Sidebar />

        <section className="flex-1 overflow-y-auto">
          <Header />

          <div className="p-10">
            <h1 className="text-5xl font-black text-white">
              Settings
            </h1>

            <p className="mt-4 text-lg text-gray-400">
              Settings module is under development.
            </p>
          </div>
        </section>
      </main>
    </ProtectedRoute>
  );
}