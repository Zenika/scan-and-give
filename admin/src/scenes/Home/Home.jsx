import React from 'react'
import { Redirect } from 'react-router-dom'

const Home = () => {
  return <Redirect to="/auth/login" />
}

export default Home
