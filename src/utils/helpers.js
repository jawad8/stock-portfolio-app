export function formatDate(timestamp) {
  return new Date(timestamp * 1000).toLocaleDateString();
}

export function formatCurrency(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return "N/A";
  }
  return `$${Number(value).toFixed(2)}`;
}

export function formatPercent(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return "N/A";
  }
  return `${Number(value).toFixed(2)}%`;
}

export function getRangeMap(range) {
  const map = {
    "1month": "1mo",
    "3month": "3mo",
    "1year": "1y",
    "5year": "5y",
  };

  return map[range] || "1mo";
}

export function getProfitColorClass(value) {
  return Number(value) > 0 ? "profit-green" : "profit-red";
}

export function getMinMax(values = []) {
  if (!values.length) {
    return { min: null, max: null };
  }

  let min = values[0];
  let max = values[0];

  for (const value of values) {
    if (value < min) min = value;
    if (value > max) max = value;
  }

  return { min, max };
}