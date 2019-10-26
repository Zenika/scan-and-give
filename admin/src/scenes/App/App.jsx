import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { PrivateRoute } from 'components'

import Home from 'scenes/Home'
import Auth from 'scenes/Auth'
import Event from 'scenes/Event'
import Charity from 'scenes/Charity'

import Navbar from './components/Navbar'

import './App.scss'

const App = () => (
  <>
    <Navbar />
    <div className="container main">
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/auth" component={Auth} />
        <PrivateRoute path="/event" component={Event} />
        <PrivateRoute path="/charity" component={Charity} />
        <Route path="/404" render={() => '404'} />
        <Route render={() => <Redirect to="/404" />} />
      </Switch>
    </div>
  </>
)

export default App
