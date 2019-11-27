import React, { useEffect, useContext } from 'react'

import * as firebase from 'firebase/app'
import * as firebaseui from 'firebaseui'

import { UserContext } from 'services'

const Login = ({ history }) => {
  const { ready, user } = useContext(UserContext)

  useEffect(() => {
    if (!ready) return

    if (user) {
      history.push('/event/list')
    } else {
      if (!window.firebaseui_app) {
        window.firebaseui_app = new firebaseui.auth.AuthUI(firebase.auth())
      }

      window.firebaseui_app.start('#firebaseui-auth-container', {
        callbacks: {
          signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            // console.log(authResult, redirectUrl)
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return false
          },
          uiShown: function() {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none'
          }
        },
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: 'popup',
        signInSuccessUrl: '/event/list',
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ],
        // Terms of service url.
        tosUrl: '<your-tos-url>',
        // Privacy policy url.
        privacyPolicyUrl: '<your-privacy-policy-url>'
      })
    }
  }, [ready, user, history])

  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '100px'
      }}
    >
      <div id="firebaseui-auth-container"></div>
      <div id="loader">Loading...</div>
    </div>
  )
}

export default Login
