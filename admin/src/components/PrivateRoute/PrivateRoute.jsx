import React from 'react'
import { Route } from 'react-router-dom'

import Authenticated from 'components/Authenticated'

const PrivateRoute = ({ component: Component, render, redirect, ...otherProps }) => (
  <Route
    {...otherProps}
    render={props => (
      <Authenticated {...props} redirect={redirect || '/'}>
        {Component ? <Component {...props} {...otherProps} /> : render(props)}
      </Authenticated>
    )}
  />
)

export default PrivateRoute
