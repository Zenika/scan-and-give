import React from 'react'
import { Route } from 'react-router-dom'

import { PrivateRoute } from 'components'

import { Login, Logout } from './scenes'

const Auth = ({ match }) => (
  <>
    <Route path={match.path + '/login'} component={Login} reverse />
    <PrivateRoute path={match.path + '/logout'} component={Logout} />
  </>
)

export default Auth
