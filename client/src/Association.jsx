import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import AssoContext from './AssoContext'

const Association = ({
  match: {
    params: { id }
  }
}) => {
  const associations = useContext(AssoContext)

  const association = associations.find(a => a.id === Number(id))

  if (!association) return null

  const { image, nom, description } = association

  return (
    <div id="association">
      <div className="wrapper">
        <div className="image-wrapper">
          <img src={image} alt={`logo of ${nom}`} />
        </div>
        <div className="content">
          <span className="title">{nom}</span>
          <div className="description">
            {description.split('\n').map((txt, i) => (
              <p key={i}>{txt}</p>
            ))}
          </div>
          <div className="actions">
            <Link to={`/`} style={{ backgroundColor: 'lightgray' }}>
              <span>
                Retour{' '}
                <span role="img" aria-label="finger pointing left">
                  👈
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
    </div>
  )
}

export default Association
