"use client";

import { FileText } from "lucide-react";

type Props = {
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
};

export default function ReportCard({
  title,
  description,
  buttonText,
  onClick,
}: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#111827]/80 p-8 shadow-lg backdrop-blur-md">

      <div className="flex items-start justify-between">

        <div>

          <h2 className="text-2xl font-bold text-white">
            {title}
          </h2>

          <p className="mt-3 leading-7 text-gray-400">
            {description}
          </p>

        </div>

        <div className="rounded-xl bg-blue-500/20 p-4">

          <FileText
            size={34}
            className="text-blue-400"
          />

        </div>

      </div>

      <button
        onClick={onClick}
        className="mt-8 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        {buttonText}
      </button>

    </div>
  );
}