"use client";

import Link from "next/link";

import Logo from "../common/Logo";
import Button from "../ui/Button";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-black/20 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
        <Logo />

        <div className="hidden items-center gap-8 text-gray-300 md:flex">
          <Link
            href="/"
            className="transition hover:text-white"
          >
            Home
          </Link>

          <a
            href="#features"
            className="transition hover:text-white"
          >
            Features
          </a>

          <Link
            href="/dashboard"
            className="transition hover:text-white"
          >
            Dashboard
          </Link>

          <a
            href="#about"
            className="transition hover:text-white"
          >
            About
          </a>
        </div>

        <Link href="/dashboard">
          <Button text="Launch Workspace" />
        </Link>
      </div>
    </nav>
  );
}