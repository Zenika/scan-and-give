import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import { useEvent, useBaseUrl, useIntl } from 'services'
import { formatMoney } from 'utils'

import './Header.scss'

const Header = ({ location }) => {
  const { event } = useEvent()

  const baseUrl = useBaseUrl()

  const intl = useIntl(Header)

  if (!event) return null

  return (
    <>
      <Helmet>
        <style type="text/css">
          {`body, #stats .wrapper .charities .charity .bar-wrapper .bar {
          background-color: ${event.color};
          }`}
        </style>
        <style>{event.customCss}</style>
      </Helmet>
      <div id="header">
        <div className="main-header">
          <img
            src={event.image}
            className="zenikanard"
            alt="zenikanard-logo"
            onClick={() => {
              if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen()
              } else {
                document.exitFullscreen()
              }
            }}
          />
          <Link to={baseUrl} style={{ textDecoration: 'none' }}>
            <span className="title">Scan and Give</span>
          </Link>
          <Link to={baseUrl + (location.pathname === '/stats' ? '/' : '/stats')}>
            <div className="stats-btn">
              <i className="material-icons">assessment</i>
            </div>
          </Link>
        </div>
        <div className="explanations">
          <p>{intl('subtitle')(formatMoney(event.multiplier, event.devise))}</p>
        </div>
      </div>
    </>
  )
}

Header.translations = {
  fr: {
    subtitle: amount => `Choisi une association, scan ton badge et nous lui reversons ${amount} !`
  },
  en: {
    subtitle: amount => `Choose a charity, scan your badge and we will donate ${amount}!`
  }
}

export default withRouter(Header)
