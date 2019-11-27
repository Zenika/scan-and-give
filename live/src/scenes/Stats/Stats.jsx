import React, { useState, useEffect } from 'react'

import { useEvent } from 'services'
import { formatMoney } from 'utils'

import './Stats.scss'

const Stats = () => {
  const [loading, setLoading] = useState(false)
  const { event, sync } = useEvent()

  useEffect(() => {
    setLoading(false)
  }, [event])

  if (!event) return null

  const counts = event.donations.reduce((acc, { charity }) => {
    if (!acc[charity]) acc[charity] = 0

    acc[charity]++

    return acc
  }, {})

  const max = Math.max(...Object.values(counts))
  const total = Object.values(counts).reduce((a, b) => a + b, 0)

  return (
    <div id="stats">
      <div className="wrapper">
        <div className="charities">
          {event.charities.map(charity => {
            const count = counts[charity.id] || 0

            return (
              <div key={charity.id} className="charity">
                <div className="image-wrapper">
                  <img src={charity.image} alt={`Logo of ${charity.name}`} />
                </div>
                <div className="bar-wrapper">
                  <div className="bar" style={{ width: `${Math.ceil((count / max) * 97) + 3}%` }}>
                    <span className="count">{count}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="total">
          Grâce à vous, Zenika va reverser au total{' '}
          {formatMoney(total * event.multiplier, event.devise)}
        </div>
        <div
          className={'refresh ' + (loading ? 'loading' : '')}
          onClick={() => {
            if (!loading) {
              setLoading(true)
              sync()
            }
          }}
        >
          <i className="material-icons">sync</i>
        </div>
      </div>
    </div>
  )
}

export default Stats
