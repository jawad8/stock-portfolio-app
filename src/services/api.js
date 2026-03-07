const BASE_URL = "https://stock-market-api-k9vl.onrender.com/api";

export async function getStocksData() {
  const response = await fetch(`${BASE_URL}/stocksdata`);

  if (!response.ok) {
    throw new Error("Failed to fetch stock chart data");
  }

  return response.json();
}

export async function getStocksStatsData() {
  const response = await fetch(`${BASE_URL}/stocksstatsdata`);

  if (!response.ok) {
    throw new Error("Failed to fetch stock stats data");
  }

  return response.json();
}

export async function getProfileData() {
  const response = await fetch(`${BASE_URL}/profiledata`);

  if (!response.ok) {
    throw new Error("Failed to fetch stock profile data");
  }

  return response.json();
}