import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

import App from './App'

import './index.scss'

ReactDOM.render(
  <Router>
    <HelmetProvider>
      <Route path="/:user_id/:event_id" component={App} />
    </HelmetProvider>
  </Router>,
  document.getElementById('root')
)

navigator.serviceWorker.register('/custom-worker.js')
