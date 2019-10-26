import React from 'react'
import { Link } from 'react-router-dom'

import { useEvent, useBaseUrl, useIntl } from 'services'

import './Charity.scss'

const Charity = ({
  match: {
    params: { id }
  }
}) => {
  const { event } = useEvent()

  const baseUrl = useBaseUrl()

  const intl = useIntl(Charity)

  if (!event) return null

  const charity = event.charities.find(c => c.id === id)

  if (!charity) return null

  const { image, name, description } = charity

  return (
    <div id="charity">
      <div className="wrapper">
        <div className="image-wrapper">
          <img src={image} alt={`logo of ${name}`} />
        </div>
        <div className="content">
          <span className="title">{name}</span>
          <div className="description">
            {description.split('\n\n').map((txt, i) => (
              <p key={i}>{txt}</p>
            ))}
          </div>
          <div className="actions">
            <Link to={baseUrl} style={{ backgroundColor: 'lightgray' }}>
              <span>
                {intl('back')}{' '}
                <span role="img" aria-label="finger pointing left">
                  👈
                </span>
              </span>
            </Link>
            <Link to={baseUrl + `/charity/${id}/scan`} style={{ backgroundColor: 'lightgreen' }}>
              <span>
                {intl('chosen')}{' '}
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

Charity.translations = {
  fr: {
    back: 'Retour',
    chosen: "J'ai choisi!"
  },
  en: {
    back: 'Back',
    chosen: 'This one!'
  }
}

export default Charity
