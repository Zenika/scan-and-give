import React from 'react'
import { withRouter, Link } from 'react-router-dom'

const Header = ({ location }) => (
  <div id="header">
    <div className="main-header">
      <img
        src="/zenikanard.png"
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
      <Link to="/" style={{ textDecoration: 'none' }}>
        <span className="title">Scan and Give</span>
      </Link>
      <Link to={location.pathname === '/stats' ? '/' : '/stats'}>
        <div className="stats-btn">
          <i className="material-icons">assessment</i>
        </div>
      </Link>
    </div>
    <div className="explanations">
      <p>Choisi une association, scan ton badge et Zenika lui reverse 1€ !</p>
    </div>
  </div>
)

export default withRouter(Header)
