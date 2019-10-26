import React, { useContext, useState, useEffect } from 'react'
import fx from 'money'

const RatesContext = React.createContext()

const RatesProvider = ({ children }) => {
  const [rates, setRates] = useState(null)

  useEffect(() => {
    fetch('https://api.exchangeratesapi.io/latest')
      .then(r => r.json())
      .then(({ base, rates }) => {
        fx.base = base
        fx.rates = rates
        setRates(rates)
      })
  }, [setRates])

  return <RatesContext.Provider value={rates}>{children}</RatesContext.Provider>
}

const useRates = () => useContext(RatesContext)

export { RatesProvider, useRates }
