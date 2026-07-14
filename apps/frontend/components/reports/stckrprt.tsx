"use client";

import jsPDF from "jspdf";

import { useStock } from "@/context/StockContext";

import {
  getStockReport,
  getRecommendationText,
  getRecommendationConfidence,
  getRecommendationRisk,
  getRecommendationReasons,
  getNewsHeadline,
} from "@/lib/reportService";

import { formatCurrency } from "@/lib/formatters";

export default function StockReport() {
  const { stock } = useStock();

  async function generateReport() {
    if (!stock?.symbol) {
      alert("Please search a stock first.");
      return;
    }

    try {
      const report = await getStockReport(stock.symbol);

      const doc = new jsPDF();

      let y = 20;

      //-----------------------------------
      // Header
      //-----------------------------------

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

      doc.line(15, y, 195, y);

      y += 12;

      //-----------------------------------
      // Title
      //-----------------------------------

      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");

      doc.text(
        "Stock Analysis Report",
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

      y += 14;

      //-----------------------------------
      // Company
      //-----------------------------------

      doc.setFont("helvetica", "bold");
      doc.setFontSize(15);

      doc.text(
        "Company Overview",
        15,
        y
      );

      y += 9;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);

      doc.text(
        `Company : ${report.stock.company ?? "-"}`,
        20,
        y
      );

      y += 6;

      doc.text(
        `Symbol : ${report.stock.symbol ?? "-"}`,
        20,
        y
      );

      y += 6;

      doc.text(
        `Sector : ${report.stock.sector ?? "-"}`,
        20,
        y
      );

      y += 6;

      doc.text(
        `Industry : ${report.stock.industry ?? "-"}`,
        20,
        y
      );

      y += 6;

      doc.text(
        `Exchange : ${report.stock.exchange ?? "-"}`,
        20,
        y
      );

      y += 14;

      //-----------------------------------
      // Price
      //-----------------------------------

      const price = formatCurrency(
        report.stock.price,
        report.stock.currency
      )
        .primary
        .replace(/₹/g, "Rs.");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(15);

      doc.text(
        "Market Statistics",
        15,
        y
      );

      y += 9;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);

      doc.text(
        `Current Price : ${price}`,
        20,
        y
      );

      y += 6;

      doc.text(
        `Open : ${report.stock.open ?? "-"}`,
        20,
        y
      );

      y += 6;

      doc.text(
        `Previous Close : ${report.stock.previousClose ?? "-"}`,
        20,
        y
      );

      y += 6;

      doc.text(
        `52 Week High : ${report.stock.fiftyTwoWeekHigh ?? "-"}`,
        20,
        y
      );

      y += 6;

      doc.text(
        `52 Week Low : ${report.stock.fiftyTwoWeekLow ?? "-"}`,
        20,
        y
      );

      y += 14;

      //-----------------------------------
      // Technical
      //-----------------------------------

      doc.setFont("helvetica", "bold");
      doc.setFontSize(15);

      doc.text(
        "Technical Indicators",
        15,
        y
      );

      y += 9;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);

      doc.text(
        `RSI : ${report.technical?.rsi ?? "-"}`,
        20,
        y
      );

      y += 6;

      doc.text(
        `EMA20 : ${report.technical?.ema20 ?? "-"}`,
        20,
        y
      );

      y += 6;

      doc.text(
        `EMA50 : ${report.technical?.ema50 ?? "-"}`,
        20,
        y
      );

      y += 6;

      doc.text(
        `MACD : ${report.technical?.macd ?? "-"}`,
        20,
        y
      );

      y += 14;

      //-----------------------------------
      // Recommendation
      //-----------------------------------

      doc.setFont("helvetica", "bold");
      doc.setFontSize(15);

      doc.text(
        "AI Recommendation",
        15,
        y
      );

      y += 9;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);

      doc.text(
        `Recommendation : ${getRecommendationText(report)}`,
        20,
        y
      );

      y += 6;

      doc.text(
        `Confidence : ${getRecommendationConfidence(report)}%`,
        20,
        y
      );

      y += 6;

      doc.text(
        `Risk : ${getRecommendationRisk(report)}`,
        20,
        y
      );

      y += 10;

      doc.setFont("helvetica", "bold");

      doc.text(
        "Reasons",
        20,
        y
      );

      y += 7;

      doc.setFont("helvetica", "normal");

      const reasons =
        getRecommendationReasons(report);

      if (reasons.length === 0) {
        doc.text(
          "- No reasons available",
          25,
          y
        );
        y += 6;
      } else {
        reasons.forEach((reason) => {
          doc.text(
            `• ${reason}`,
            25,
            y
          );
          y += 6;
        });
      }

      //-----------------------------------
      // News
      //-----------------------------------

      if (y > 240) {
        doc.addPage();
        y = 20;
      }

      y += 6;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(15);

      doc.text(
        "Latest News",
        15,
        y
      );

      y += 9;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);

      if (report.news.length === 0) {
        doc.text(
          "No recent news available.",
          20,
          y
        );
      } else {
        report.news
          .slice(0, 5)
          .forEach((item: any) => {

            if (y > 270) {
              doc.addPage();
              y = 20;
            }

            doc.text(
              `• ${getNewsHeadline(item)}`,
              20,
              y
            );

            y += 7;
          });
      }

      //-----------------------------------
      // Footer
      //-----------------------------------

      if (y > 270) {
        doc.addPage();
        y = 20;
      }

      y += 10;

      doc.line(15, y, 195, y);

      y += 8;

      doc.setFontSize(10);
      doc.setTextColor(120);

      doc.text(
        "Disclaimer: This report is generated by Quantivox AI for educational purposes only.",
        15,
        y
      );

      doc.save(
        `${stock.symbol}_Stock_Report.pdf`
      );

    } catch (error) {
      console.error(error);
      alert("Failed to generate stock report.");
    }
  }

  return (
    <button
      onClick={generateReport}
      className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
    >
      Generate Stock Report
    </button>
  );
}