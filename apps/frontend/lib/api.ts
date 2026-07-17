const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://quantivox-ai.onrender.com";

export async function searchStock(symbol: string) {
  const response = await fetch(`${API_BASE}/api/search?symbol=${symbol}`);

  if (!response.ok) {
    throw new Error("Failed to fetch stock");
  }

  return response.json();
}

export async function getHistory(symbol: string, period: string = "1mo") {
  const response = await fetch(
    `${API_BASE}/api/history?symbol=${symbol}&period=${period}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch history");
  }

  return response.json();
}

export async function getRecommendation(symbol: string) {
  const response = await fetch(
    `${API_BASE}/api/recommendation?symbol=${symbol}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch recommendation");
  }

  return response.json();
}

export async function getTechnical(symbol: string) {
  const response = await fetch(
    `${API_BASE}/api/technical?symbol=${symbol}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch technical indicators");
  }

  return response.json();
}

export async function getNews(symbol: string) {
  const response = await fetch(
    `${API_BASE}/api/news?symbol=${symbol}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }

  return response.json();
}

export async function getPrediction(symbol: string) {
  const response = await fetch(
    `${API_BASE}/api/prediction?symbol=${symbol}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch prediction");
  }

  return response.json();
}