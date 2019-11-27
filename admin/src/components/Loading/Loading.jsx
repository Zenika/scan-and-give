import React from 'react'

import './Loading.scss'

const Loading = ({ text }) => (
  <div className="loading-wrapper">
    <div className="loading">Loading...</div>
    <p>{text || 'Loading...'}</p>
  </div>
)

export default Loading
