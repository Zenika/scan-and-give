import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import fromUnixTime from 'date-fns/fromUnixTime'
import compareDesc from 'date-fns/compareDesc'

import { useCachedFetch } from 'services'

import { NewItemCard, Loading } from 'components'

import { Event } from './components'

import './List.scss'

const List = () => {
  const [inProgress, setInProgress] = useState(0)
  const [loading, setLoading] = useState(true)
  const [events, setEvents] = useState([])

  const fetch = useCachedFetch()

  useEffect(() => {
    if (inProgress !== -1) {
      fetch('event/list').onData(({ error, events, registrationInProgress }, fromCache) => {
        if (error) return console.error(error)

        events.sort((a, b) =>
          compareDesc(fromUnixTime(a.date._seconds), fromUnixTime(b.date._seconds))
        )

        if (registrationInProgress) {
          if (!fromCache) {
            // Retry after 1s
            setTimeout(() => {
              setInProgress(p => p + 1)
            }, 3000)
          }
        } else {
          setInProgress(-1)
        }
        setEvents(events)
        setLoading(false)
      })
    }
  }, [fetch, setEvents, inProgress])

  if (loading) return <Loading />

  if (inProgress !== -1) return <Loading text="Creating your account..." />

  return (
    <div className="events">
      <p className="title is-3 has-text-centered">My events</p>
      <div className="item-list">
        <Link to="/event/new">
          <NewItemCard type="event" />
        </Link>
        {events.map(event => (
          <Link key={event.id} to={'/event/' + event.id}>
            <Event event={event} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default List
