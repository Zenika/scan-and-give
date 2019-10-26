import React from 'react'

import './NewItemCard.scss'

const NewItemCard = ({ type }) => (
  <div className="item-card new-item">
    <i className="fas fa-plus" />
    <span>New {type}</span>
  </div>
)

export default NewItemCard
