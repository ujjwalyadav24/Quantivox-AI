import {
  searchStock,
  getTechnical,
  getPrediction,
  getRecommendation,
  getNews,
} from "./api";

export type StockReportData = {
  stock: any;
  technical: any;
  prediction: any;
  recommendation: any;
  news: any[];
};

export async function getStockReport(
  symbol: string
): Promise<StockReportData> {
  const [
    stock,
    technical,
    prediction,
    recommendation,
    news,
  ] = await Promise.all([
    searchStock(symbol),
    getTechnical(symbol),
    getPrediction(symbol),
    getRecommendation(symbol),
    getNews(symbol),
  ]);

  return {
    stock,
    technical,
    prediction,
    recommendation,
    news: Array.isArray(news) ? news : [],
  };
}

/**
 * Safe helper methods
 */

export function getRecommendationText(report: StockReportData) {
  return (
    report.recommendation?.ai?.recommendation ??
    "Not Available"
  );
}

export function getRecommendationConfidence(
  report: StockReportData
) {
  return (
    report.recommendation?.ai?.confidence ??
    "-"
  );
}

export function getRecommendationRisk(
  report: StockReportData
) {
  return (
    report.recommendation?.ai?.risk ??
    "-"
  );
}

export function getRecommendationReasons(
  report: StockReportData
): string[] {
  return (
    report.recommendation?.ai?.reasons ??
    []
  );
}

export function getNewsHeadline(item: any) {
  return item?.headline ?? "";
}

export function getNewsSummary(item: any) {
  return item?.summary ?? "";
}