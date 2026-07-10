"use client";

import { motion } from "framer-motion";

export default function Background() {
  return (
    <div className="absolute inset-0 overflow-hidden">

      <motion.div
        animate={{
          x: [0, 150, 0],
          y: [0, 80, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 18,
        }}
        className="absolute -left-20 top-20 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -150, 0],
          y: [0, -100, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
        }}
        className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl"
      />

    </div>
  );
}