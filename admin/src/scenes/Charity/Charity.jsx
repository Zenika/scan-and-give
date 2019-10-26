import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { List, Read, Edit } from './scenes'

const Charity = ({ match }) => (
  <Switch>
    <Route path={match.path + '/list'} component={List} />
    <Route path={match.path + '/new'} component={Edit} />
    <Route path={match.path + '/:id'} exact component={Read} />
    <Route path={match.path + '/:id/edit'} component={Edit} />
  </Switch>
)

export default Charity
