import React from 'react'
import { Route } from 'react-router-dom'

import { EventProvider, UrlProvider } from 'services'

import { Charities, Charity, Scan, Stats } from 'scenes'

import Header from './Header'

const App = ({ match }) => {
  return (
    <UrlProvider baseUrl={match.url} params={match.params}>
      <EventProvider>
        <Header />
        <Route exact path={match.path + '/'} component={Charities} />
        <Route exact path={match.path + '/charity/:id'} component={Charity} />
        <Route exact path={match.path + '/charity/:id/scan'} component={Scan} />
        <Route exact path={match.path + '/stats'} component={Stats} />
      </EventProvider>
    </UrlProvider>
  )
}

export default App
