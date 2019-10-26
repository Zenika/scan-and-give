import React from 'react'

import { formatMoney, formatTimestamp } from 'utils'
import { ItemCard } from 'components'

const Event = ({ event }) => {
  const { date, charities = [], devise, multiplier = 1 } = event

  const count = charities.reduce((acc, c) => acc + c.count, 0)
  const total = formatMoney(count * multiplier, devise)

  return (
    <ItemCard item={event}>
      <span className="item-content-line">
        <span>
          <i className="fas fa-calendar-day has-text-info" />
        </span>
        <span>{formatTimestamp(date)}</span>
      </span>
      <span className="item-content-line">
        <span>
          <i className="fas fa-user-friends has-text-info" />
        </span>
        <span>
          {count} donation{count !== 1 && 's'}
        </span>
      </span>
      <span className="item-content-line">
        <span>
          <i className="fas fa-coins has-text-info" />
        </span>
        <span>{total}</span>
      </span>
    </ItemCard>
  )
}

export default Event
