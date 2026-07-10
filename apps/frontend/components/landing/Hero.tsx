"use client";
import Stats from "./Stats";
import HowItWorks from "./HowItWorks";
import Features from "./Features";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Background from "./Background";
import Button from "../ui/Button";
import StockTicker from "../stocks/StockTicker";

export default function Hero() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">

      <Background />

      <Navbar />

      <section className="relative z-10 flex min-h-screen flex-col items-center pt-48 px-6 text-center">

        <motion.h1
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-black"
        >
          <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-500 bg-clip-text text-transparent">
            Quantivox AI
          </span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-2xl md:text-4xl font-semibold text-gray-200"
        >
          Historical AI Stock Intelligence Platform
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 max-w-4xl text-lg md:text-xl text-gray-400 leading-8"
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
          <Button text="Launch Workspace" />

          <button className="rounded-2xl border border-cyan-500 px-8 py-4 text-lg font-semibold transition hover:bg-cyan-500 hover:text-black">
            View Dashboard
          </button>
        </motion.div>

      </section>

      <>
  <StockTicker />
  <Features />
  <HowItWorks />
  <Stats />
</>

    </main>
  );
}