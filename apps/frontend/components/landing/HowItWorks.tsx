"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Choose a Stock",
    description: "Search any company listed on the stock market.",
  },
  {
    number: "02",
    title: "Analyze History",
    description: "View historical price trends and technical indicators.",
  },
  {
    number: "03",
    title: "Generate AI Insights",
    description: "Our AI predicts trends and highlights opportunities.",
  },
  {
    number: "04",
    title: "Make Better Decisions",
    description: "Use intelligent recommendations before investing.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-[#040714] py-28 px-8">
      <div className="mx-auto max-w-7xl">

        <h2 className="mb-16 text-center text-5xl font-black text-white">
          How Quantivox AI Works
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {steps.map((step) => (
            <motion.div
              key={step.number}
              whileHover={{ y: -8 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
            >
              <div className="mb-6 text-6xl font-black text-cyan-400">
                {step.number}
              </div>

              <h3 className="mb-4 text-2xl font-bold text-white">
                {step.title}
              </h3>

              <p className="leading-7 text-gray-400">
                {step.description}
              </p>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}