import { TrendingUp } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <TrendingUp
        size={34}
        className="text-blue-500"
      />

      <h1 className="text-2xl font-bold text-white">
        Quantivox AI
      </h1>
    </div>
  );
}