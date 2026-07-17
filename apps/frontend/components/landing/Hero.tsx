"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import Stats from "./Stats";
import HowItWorks from "./HowItWorks";
import Features from "./Features";
import Navbar from "./Navbar";
import Background from "./Background";
import Button from "../ui/Button";
import StockTicker from "../stocks/StockTicker";

import { useAuthContext } from "@/context/AuthContext";

export default function Hero() {
  const router = useRouter();

  const { user } = useAuthContext();

  const openWorkspace = () => {
    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      <Background />

      <Navbar />

      <section className="relative z-10 flex min-h-screen flex-col items-center px-6 pt-48 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl font-black md:text-8xl"
        >
          <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-500 bg-clip-text text-transparent">
            Quantivox AI
          </span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-2xl font-semibold text-gray-200 md:text-4xl"
        >
          Historical AI Stock Intelligence Platform
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 max-w-4xl text-lg leading-8 text-gray-400 md:text-xl"
        >
          Analyze historical market trends, compare companies,
          generate AI-powered insights and make smarter investment
          decisions using Machine Learning and Artificial Intelligence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 flex flex-wrap justify-center gap-6"
        >
          <Button
            text="Launch Workspace"
            onClick={openWorkspace}
          />

          <button
            onClick={openWorkspace}
            className="rounded-2xl border border-cyan-500 px-8 py-4 text-lg font-semibold transition hover:bg-cyan-500 hover:text-black"
          >
            View Dashboard
          </button>
        </motion.div>
      </section>

      <StockTicker />
      <Features />
      <HowItWorks />
      <Stats />
    </main>
  );
}