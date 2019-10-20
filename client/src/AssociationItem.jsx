import React from 'react'
import { Link } from 'react-router-dom'

const AssociationItem = ({ association: { id, nom, image, description } }) => (
  <div className="association">
    <Link to={`/association/${id}`}>
      <div className="image-wrapper">
        <img src={image} alt={`logo of ${nom}`} />
      </div>
    </Link>
    <div className="content">
      <div className="name">{nom}</div>
      <div className="description">{description.substr(0, 190)}...</div>
      <div className="actions">
        <Link to={`/association/${id}`} style={{ backgroundColor: 'lightgray' }}>
          <span>
            En savoir plus{' '}
            <span role="img" aria-label="thinking">
              🤔
            </span>
          </span>
        </Link>
        <Link to={`/association/${id}/scan`} style={{ backgroundColor: 'lightgreen' }}>
          <span>
            J'ai choisi!{' '}
            <span role="img" aria-label="heart eyes">
              😍
            </span>
          </span>
        </Link>
      </div>
    </div>
  </div>
)

export default AssociationItem
