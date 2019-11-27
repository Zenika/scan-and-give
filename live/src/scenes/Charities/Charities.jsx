import React from 'react'

import { useEvent } from 'services'

import CharityItem from './CharityItem'

import './Charities.scss'

const Charities = () => {
  const { event } = useEvent()

  if (!event) return null

  return (
    <div id="charities">
      {event.charities.map(charity => (
        <CharityItem key={charity.id} charity={charity} />
      ))}
    </div>
  )
}

export default Charities
