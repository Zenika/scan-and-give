import { useMemo } from 'react'
import fx from 'money'

import { useRates } from 'services'

export const formatMoney = (x, devise) =>
  x.toLocaleString(navigator.language, {
    style: 'currency',
    currency: devise || 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })

export const useTotal = (tuples = []) => {
  const rates = useRates()

  return useMemo(() => {
    let count = 0
    let total = 0

    if (!rates) return [count, '---']

    for (let tuple of tuples) {
      count += tuple.count

      total += fx(tuple.count * tuple.multiplier)
        .from(tuple.devise)
        .to('EUR')
    }

    return [count, Math.round(total)]
  }, [tuples, rates])
}

export const mainDevises = ['EUR', 'USD', 'CAD', 'SGD']

export const devises = {
  EUR: '€', // Europe
  USD: '$', // USA
  CAD: '$', // Canada
  SGD: '$', // Singapore
  // ----
  AUD: '$', // Australian dollar
  BRL: 'R$', // Brazil
  BGN: 'Лв', // Bulgaria
  CNY: '¥', // China
  HRK: 'kn', // Croatia
  CZK: 'Kč', // Czech Republic
  DKK: 'kr', // Denmark
  HKD: '$', // Hong Kong
  HUF: 'Ft', // Hungary
  ISK: 'kr', // Iceland
  INR: '₹', // India
  IDR: 'Rp', // Indonesia
  ILS: '₪', // Israel
  JPY: '¥', // Japan
  MYR: 'RM', // Malaysia
  MXN: '$', // Mexico
  NOK: 'kr', // Norway
  NZD: '$', // New Zealand
  PHP: '₱', // Philippines
  PLN: 'zł', // Poland
  RON: 'lei', // Romania
  RUB: '₽', // Russia
  ZAR: 'R', // South Africa
  KRW: '₩', // South Korea
  SEK: 'kr', // Sweden
  CHF: 'Fr.', // Switzerland
  THB: '฿', // Thailand
  TRY: '₺', // Turkey
  GBP: '£' // United Kingdom
}
