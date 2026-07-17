"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import Logo from "../common/Logo";
import Button from "../ui/Button";

import { useAuthContext } from "@/context/AuthContext";

export default function Navbar() {
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

          <button
            onClick={openWorkspace}
            className="transition hover:text-white"
          >
            Dashboard
          </button>

          <a
            href="#about"
            className="transition hover:text-white"
          >
            About
          </a>
        </div>

        <Button
          text="Launch Workspace"
          onClick={openWorkspace}
        />
      </div>
    </nav>
  );
}