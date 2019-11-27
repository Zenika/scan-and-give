import React, { useState, useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import cn from 'classnames'

import { Authenticated } from 'components'
import { UserContext } from 'services'

import './Navbar.scss'

const Navbar = () => {
  const { ready, user } = useContext(UserContext)
  const [open, setOpen] = useState(false)

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <Link to={ready && user ? '/event/list' : '/'} className="navbar-item">
            <i className="logo fas fa-hand-holding-heart fa-2x has-text-success" />
            <span className="title is-4" style={{ marginRight: '20px' }}>
              Scan and Give
              <span className="version">alpha</span>
            </span>
          </Link>

          <div
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="main-navbar"
            onClick={() => setOpen(o => !o)}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </div>
        </div>

        <div id="main-navbar" className={cn('navbar-menu', { 'is-active': open })}>
          <div className="navbar-start">
            <Authenticated>
              <NavLink to="/event/list" className="navbar-item" activeClassName="is-active">
                Events
              </NavLink>
              <NavLink to="/charity/list" className="navbar-item" activeClassName="is-active">
                Charities
              </NavLink>
            </Authenticated>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <Authenticated>
                  <Link to="/auth/logout" className="button is-white">
                    Sign out
                  </Link>
                </Authenticated>
                <Authenticated reverse>
                  <Link to="/auth/login" className="button is-info">
                    <strong>Sign in</strong>
                  </Link>
                </Authenticated>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
