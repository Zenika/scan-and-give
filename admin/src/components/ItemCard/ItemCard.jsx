import React from 'react'
import cn from 'classnames'

import './ItemCard.scss'

const ItemCard = ({ item: { name, image }, children, className, ...props }) => (
  <div className={cn(className, 'item-card')} {...props}>
    <span className="item-title">{name}</span>
    <div className="item-wrapper">
      <div className="item-image">
        <img src={image} alt="Logo of item" />
      </div>
      <div className="item-content">{children}</div>
    </div>
  </div>
)

export default ItemCard
