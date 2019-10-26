import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useCachedFetch } from 'services'
import { NewItemCard, Loading } from 'components'

import { Charity } from './components'

import './List.scss'

const List = () => {
  const [loading, setLoading] = useState(true)
  const [charities, setCharities] = useState([])

  const fetch = useCachedFetch()

  useEffect(() => {
    fetch('charity/list').onData(({ error, charities }) => {
      if (error) return console.error(error)

      charities.sort((a, b) => b.donations_count - a.donations_count)

      setCharities(charities)
      setLoading(false)
    })
  }, [fetch])

  if (loading) return <Loading />

  return (
    <div className="charities">
      <p className="title is-3 has-text-centered">My charities</p>
      <div className="item-list">
        <Link to="/charity/new">
          <NewItemCard type="charity" />
        </Link>
        {charities.map(charity => (
          <Link key={charity.id} to={'/charity/' + charity.id}>
            <Charity charity={charity} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default List
