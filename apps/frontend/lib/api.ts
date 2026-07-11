const API_BASE = "http://127.0.0.1:8000";

export async function searchStock(symbol: string) {
  const response = await fetch(
    `${API_BASE}/api/search?symbol=${symbol}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch stock");
  }

  return response.json();
}

export async function getHistory(
  symbol: string,
  period: string = "1mo"
) {
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
    throw new Error("Failed to fetch AI recommendation");
  }

  return response.json();
}