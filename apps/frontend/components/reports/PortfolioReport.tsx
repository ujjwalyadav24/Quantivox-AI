"use client";

import jsPDF from "jspdf";

import usePortfolio from "@/hooks/usePortfolio";
import usePortfolioAnalytics from "@/hooks/usePortfolioAnalytics";

import { formatCurrency } from "@/lib/formatters";

export default function PortfolioReport() {
  const { portfolio } = usePortfolio();

  const { analytics } =
    usePortfolioAnalytics();

  async function generatePortfolioReport() {
    if (!analytics) {
      alert("Portfolio is loading...");
      return;
    }

    const doc = new jsPDF();

    let y = 20;

    //----------------------------------------------------
    // Header
    //----------------------------------------------------

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);

    doc.text(
      "QUANTIVOX AI",
      105,
      y,
      {
        align: "center",
      }
    );

    y += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    doc.text(
      "AI Powered Stock Decision Support System",
      105,
      y,
      {
        align: "center",
      }
    );

    y += 10;

    doc.setDrawColor(180);

    doc.line(15, y, 195, y);

    y += 12;

    //----------------------------------------------------
    // Report Title
    //----------------------------------------------------

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);

    doc.text(
      "Portfolio Report",
      15,
      y
    );

    y += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    doc.text(
      `Generated : ${new Date().toLocaleString()}`,
      15,
      y
    );

    y += 12;

    //----------------------------------------------------
    // Summary
    //----------------------------------------------------

    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);

    doc.text(
      "Portfolio Summary",
      15,
      y
    );

    y += 10;

    const investment =
      formatCurrency(
        analytics.totalInvestment,
        "INR"
      ).primary.replace(/₹/g, "Rs.");

    const current =
      formatCurrency(
        analytics.totalCurrentValue,
        "INR"
      ).primary.replace(/₹/g, "Rs.");

    const pnl =
      formatCurrency(
        analytics.totalProfitLoss,
        "INR"
      ).primary.replace(/₹/g, "Rs.");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    doc.text(
      `Total Holdings : ${portfolio.length}`,
      20,
      y
    );

    y += 7;

    doc.text(
      `Investment : ${investment}`,
      20,
      y
    );

    y += 7;

    doc.text(
      `Current Value : ${current}`,
      20,
      y
    );

    y += 7;

    doc.text(
      `Profit / Loss : ${pnl}`,
      20,
      y
    );

    y += 12;

    doc.line(15, y, 195, y);

    y += 10;

    //----------------------------------------------------
    // Holdings
    //----------------------------------------------------

    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);

    doc.text(
      "Holdings",
      15,
      y
    );

    y += 10;

    analytics.holdings.forEach(
      (holding, index) => {
        if (y > 250) {
          doc.addPage();
          y = 20;
        }

        const buy =
          formatCurrency(
            holding.buyPrice,
            holding.currency
          ).primary.replace(/₹/g, "Rs.");

        const currentPrice =
          formatCurrency(
            holding.currentPrice,
            holding.currency
          ).primary.replace(/₹/g, "Rs.");

        const currentValue =
          formatCurrency(
            holding.currentValue,
            holding.currency
          ).primary.replace(/₹/g, "Rs.");

        const profit =
          formatCurrency(
            holding.profitLoss,
            holding.currency
          ).primary.replace(/₹/g, "Rs.");

        doc.setFont(
          "helvetica",
          "bold"
        );

        doc.text(
          `${index + 1}. ${holding.symbol}`,
          15,
          y
        );

        y += 7;

        doc.setFont(
          "helvetica",
          "normal"
        );

        doc.text(
          `Quantity : ${holding.quantity}`,
          20,
          y
        );

        y += 6;

        doc.text(
          `Buy Price : ${buy}`,
          20,
          y
        );

        y += 6;

        doc.text(
          `Current Price : ${currentPrice}`,
          20,
          y
        );

        y += 6;

        doc.text(
          `Current Value : ${currentValue}`,
          20,
          y
        );

        y += 6;

        doc.text(
          `Profit / Loss : ${profit}`,
          20,
          y
        );

        y += 10;

        doc.setDrawColor(220);

        doc.line(20, y, 190, y);

        y += 8;
      }
    );

    //----------------------------------------------------
    // Footer
    //----------------------------------------------------

    if (y > 260) {
      doc.addPage();
      y = 20;
    }

    doc.setDrawColor(180);

    doc.line(15, y, 195, y);

    y += 8;

    doc.setFontSize(10);

    doc.setTextColor(120);

    doc.text(
      "Disclaimer:",
      15,
      y
    );

    y += 5;

    doc.text(
      "This report is generated by Quantivox AI for educational purposes only.",
      15,
      y
    );

    doc.save(
      "Quantivox_Portfolio_Report.pdf"
    );
  }

  return (
    <button
      onClick={
        generatePortfolioReport
      }
      className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
    >
      Generate Portfolio Report
    </button>
  );
}