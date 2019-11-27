export const formatMoney = (x, devise) =>
  x.toLocaleString(navigator.language, {
    style: 'currency',
    currency: devise || 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })
