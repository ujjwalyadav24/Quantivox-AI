"use client";

import { motion } from "framer-motion";

const stats = [
  {
    value: "50+",
    label: "Companies Analysed",
  },
  {
    value: "10 Years",
    label: "Historical Data",
  },
  {
    value: "98%",
    label: "Prediction Accuracy",
  },
  {
    value: "24/7",
    label: "AI Analysis",
  },
];

export default function Stats() {
  return (
    <section className="bg-[#050816] py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-8 md:grid-cols-4">

        {stats.map((item) => (
          <motion.div
            key={item.label}
            whileHover={{ scale: 1.05 }}
            className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl"
          >
            <h2 className="text-5xl font-black text-cyan-400">
              {item.value}
            </h2>

            <p className="mt-3 text-lg text-gray-400">
              {item.label}
            </p>
          </motion.div>
        ))}

      </div>
    </section>
  );
}