"use client";

import Logo from "../common/Logo";
import Button from "../ui/Button";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-black/20 backdrop-blur-xl">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">

        <Logo />

        <div className="hidden gap-8 text-gray-300 md:flex">

          <button className="transition hover:text-white">
            Home
          </button>

          <button className="transition hover:text-white">
            Features
          </button>

          <button className="transition hover:text-white">
            Dashboard
          </button>

          <button className="transition hover:text-white">
            About
          </button>

        </div>

        <Button text="Launch Workspace" />

      </div>

    </nav>
  );
}