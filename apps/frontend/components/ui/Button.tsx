"use client";

interface ButtonProps {
  text: string;
}

export default function Button({ text }: ButtonProps) {
  return (
    <button
      className="
      rounded-2xl
      bg-gradient-to-r
      from-blue-600
      via-cyan-500
      to-purple-600
      px-8
      py-4
      text-lg
      font-bold
      text-white
      shadow-xl
      transition-all
      duration-300
      hover:scale-105
      hover:shadow-cyan-500/40
      "
    >
      {text}
    </button>
  );
}