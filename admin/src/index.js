import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import App from 'scenes/App'
import { Firebase, RatesProvider } from 'services'

ReactDOM.render(
  <Router>
    <Firebase>
      <RatesProvider>
        <App />
      </RatesProvider>
    </Firebase>
  </Router>,
  document.getElementById('root')
)
