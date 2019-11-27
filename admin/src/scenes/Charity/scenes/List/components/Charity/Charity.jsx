import React from 'react'

import { formatMoney, useTotal } from 'utils'
import { ItemCard } from 'components'

const Charity = ({ charity }) => {
  const { events = [] } = charity

  const [count, total] = useTotal(events)

  return (
    <ItemCard item={charity}>
      <span className="item-content-line">
        <span>
          <i className="far fa-calendar-alt has-text-info" />
        </span>
        <span>
          {events.length} event{events.length !== 1 && 's'}
        </span>
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
        <span>{formatMoney(total)}</span>
      </span>
    </ItemCard>
  )
}

export default Charity
