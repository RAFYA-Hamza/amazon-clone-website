export function formatCurrencey(priceCents) {
  return (priceCents / 100).toFixed(2);
}

export function formatEstimatedTax(totalBeforeTax) {
  return (Math.round(totalBeforeTax) / 10).toFixed(2);
}
