import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import api from './api'

import AssoContext from './AssoContext'

import Header from './Header'
import AssociationList from './AssociationList'
import Association from './Association'
import Scan from './Scan'
import Stats from './Stats'

const App = () => {
  const [list, setList] = useState([])

  useEffect(() => {
    api.getAssociations().then(setList)
  }, [setList])

  return (
    <Router>
      <>
        <Header />
        <AssoContext.Provider value={list}>
          <Route exact path="/" component={AssociationList} />
          <Route exact path="/association/:id" component={Association} />
          <Route exact path="/association/:id/scan" component={Scan} />
          <Route exact path="/stats" component={Stats} />
        </AssoContext.Provider>
      </>
    </Router>
  )
}

export default App
