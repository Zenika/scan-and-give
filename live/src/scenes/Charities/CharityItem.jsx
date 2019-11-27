import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import { useIntl } from 'services'

const CharityItem = ({ match, charity: { id, name, image, description } }) => {
  const intl = useIntl(CharityItem)

  return (
    <div className="charity">
      <Link to={match.url + `/charity/${id}`}>
        <div className="image-wrapper">
          <img src={image} alt={`logo of ${name}`} />
        </div>
      </Link>
      <div className="content">
        <div className="name">{name}</div>
        <div className="description">{description.substr(0, 190)}...</div>
        <div className="actions">
          <Link to={match.url + `/charity/${id}`} style={{ backgroundColor: 'lightgray' }}>
            <span>
              {intl('more')}{' '}
              <span role="img" aria-label="thinking">
                🤔
              </span>
            </span>
          </Link>
          <Link to={match.url + `/charity/${id}/scan`} style={{ backgroundColor: 'lightgreen' }}>
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
  )
}

CharityItem.translations = {
  fr: {
    more: 'En savoir plus',
    chosen: "J'ai choisi!"
  },
  en: {
    more: 'Learn more',
    chosen: 'This one!'
  }
}

export default withRouter(CharityItem)
