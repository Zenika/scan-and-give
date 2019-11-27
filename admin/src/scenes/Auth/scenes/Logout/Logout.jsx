import React, { useEffect } from 'react'

import * as firebase from 'firebase/app'

const Logout = ({ history }) => {
  useEffect(() => {
    firebase.auth().signOut()
  }, [history])

  return <div>Signing you out...</div>
}

export default Logout
