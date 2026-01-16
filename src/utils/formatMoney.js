function trimTrailingZero(n) {
  const s = n.toFixed(1);
  return s.endsWith(".0") ? s.slice(0, -2) : s;
}

export function formatMoney(amount) {
  const sign = amount < 0 ? "-" : "";
  const value = Math.abs(amount);
  return `${sign}$${value.toLocaleString("en-US")}`;
}

export function formatMoneyShort(amount) {
  const sign = amount < 0 ? "-" : "";
  const value = Math.abs(amount);

  if (value < 1000) return `${sign}$${value.toLocaleString("en-US")}`;
  if (value < 1_000_000) return `${sign}$${trimTrailingZero(value / 1000)}k`;
  if (value < 1_000_000_000) return `${sign}$${trimTrailingZero(value / 1_000_000)}m`;
  if (value < 1_000_000_000_000) return `${sign}$${trimTrailingZero(value / 1_000_000_000)}b`;
  return `${sign}$${trimTrailingZero(value / 1_000_000_000_000)}t`;
}


