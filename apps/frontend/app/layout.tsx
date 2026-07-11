import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { StockProvider } from "@/context/StockContext";
import { AIProvider } from "@/context/AIContext";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quantivox AI",
  description: "AI Powered Stock Decision Support System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <StockProvider>
          <AIProvider>
            {children}
          </AIProvider>
        </StockProvider>
      </body>
    </html>
  );
}