import React, { useState, useEffect } from 'react'
import * as firebase from 'firebase/app'

import 'firebase/firestore'
import 'firebase/storage'

if (!process.env.REACT_APP_FIREBASE_API_KEY) {
  console.error('You forgot to configure Firebase env variables!')
}

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
})

const UserContext = React.createContext()

const Firebase = ({ children }) => {
  const [state, setState] = useState({ ready: false, user: null })

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setState({ ready: true, user })
    })
  }, [])

  return <UserContext.Provider value={state}>{children}</UserContext.Provider>
}

window.firestore = firebase.firestore()

export default Firebase
export { UserContext }
