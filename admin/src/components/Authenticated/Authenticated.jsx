import React, { useContext } from 'react'
import { withRouter } from 'react-router'
import { Redirect } from 'react-router-dom'

import { UserContext } from 'services'

const Authenticated = ({ location, reverse, redirect, children }) => {
  const { ready, user } = useContext(UserContext)
  const currentURL = location.pathname + location.search

  if (!ready) return null

  if ((user && !reverse) || (!user && reverse)) {
    return children
  }

  if (redirect) {
    return <Redirect to={{ pathname: redirect, state: { from: currentURL } }} />
  }

  return null
}

export default withRouter(Authenticated)
